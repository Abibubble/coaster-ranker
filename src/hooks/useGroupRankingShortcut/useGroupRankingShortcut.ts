import { useState, useCallback, useMemo } from "react";
import { Coaster } from "../../types/data";
import {
  RankingEngine,
  RankingComparison,
} from "../../utils/ranking/newRankingEngine.util";
import {
  findGroupMatches,
  MIN_GROUP_MATCHES_FOR_SHORTCUT,
} from "../../utils/ranking/findGroupMatches.util";

export interface GroupShortcutOffer {
  newCoaster: Coaster;
  groupMatches: Coaster[];
}

export interface UseGroupRankingShortcutReturn {
  // Set once a not-yet-ranked coaster shares a model+manufacturer with
  // enough already-ranked coasters to offer the shortcut. Null otherwise,
  // or once the user has accepted/declined for this particular coaster.
  offer: GroupShortcutOffer | null;
  acceptOffer: () => void;
  declineOffer: () => void;
  // True while a quick round of group-only comparisons is in progress.
  isActive: boolean;
  groupComparison: RankingComparison | null;
  recordGroupWinner: (winner: Coaster) => void;
  cancelActiveComparison: () => void;
}

/**
 * Offers a shortcut (issue #3): if the coaster about to be ranked shares a
 * model+manufacturer with several already-ranked coasters (e.g. several
 * other B&M Wing Coasters), run a small, separate round of comparisons
 * among just that group first. The result feeds back into the main ranking
 * engine's existing comparison cache (see useSimpleRanking's
 * applyGroupRankingResult / RankingEngine.seedComparisonResults), so its
 * normal binary search can skip questions it would otherwise need to ask -
 * without any change to that search/placement logic itself.
 */
export const useGroupRankingShortcut = (
  nextUnrankedCoaster: Coaster | null,
  rankedCoasters: Coaster[],
  onComplete: (orderedCoasters: Coaster[]) => void,
): UseGroupRankingShortcutReturn => {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [activeOffer, setActiveOffer] = useState<GroupShortcutOffer | null>(
    null,
  );
  const [miniEngine, setMiniEngine] = useState<RankingEngine | null>(null);
  const [, setForceUpdate] = useState(0);

  const offer = useMemo(() => {
    if (!nextUnrankedCoaster || activeOffer) return null;
    if (dismissedIds.has(nextUnrankedCoaster.id)) return null;

    const groupMatches = findGroupMatches(nextUnrankedCoaster, rankedCoasters);
    if (groupMatches.length < MIN_GROUP_MATCHES_FOR_SHORTCUT) return null;

    return { newCoaster: nextUnrankedCoaster, groupMatches };
  }, [nextUnrankedCoaster, rankedCoasters, dismissedIds, activeOffer]);

  const declineOffer = useCallback(() => {
    if (!offer) return;
    setDismissedIds((prev) => new Set(prev).add(offer.newCoaster.id));
  }, [offer]);

  const acceptOffer = useCallback(() => {
    if (!offer) return;
    setActiveOffer(offer);
    setMiniEngine(
      new RankingEngine([offer.newCoaster, ...offer.groupMatches]),
    );
  }, [offer]);

  const cancelActiveComparison = useCallback(() => {
    if (!activeOffer) return;
    setDismissedIds((prev) => new Set(prev).add(activeOffer.newCoaster.id));
    setMiniEngine(null);
    setActiveOffer(null);
  }, [activeOffer]);

  const recordGroupWinner = useCallback(
    (winner: Coaster) => {
      if (!miniEngine || !activeOffer) return;

      miniEngine.recordComparisonResult(winner);

      if (miniEngine.getState().isComplete) {
        const finalOrder = miniEngine.getFinalRanking();
        setDismissedIds((prev) => new Set(prev).add(activeOffer.newCoaster.id));
        setMiniEngine(null);
        setActiveOffer(null);
        onComplete(finalOrder);
      } else {
        setForceUpdate((prev) => prev + 1);
      }
    },
    [miniEngine, activeOffer, onComplete],
  );

  return {
    offer,
    acceptOffer,
    declineOffer,
    isActive: miniEngine !== null,
    groupComparison: miniEngine?.getCurrentComparison() || null,
    recordGroupWinner,
    cancelActiveComparison,
  };
};
