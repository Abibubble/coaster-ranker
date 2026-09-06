import { useState, useCallback, useMemo } from "react";
import { Coaster } from "../../types/data";

export interface UseNumberZeroOfferReturn {
  // Set once there's a not-yet-ranked coaster to ask about, there isn't
  // already a Number 0 for this ride type, and the user hasn't already
  // declined for this particular coaster. Null otherwise.
  offer: Coaster | null;
  declineOffer: () => void;
}

/**
 * Offers to mark the coaster about to be ranked as a "Number 0" - the
 * enthusiast convention for a ride so personally/emotionally significant
 * (nostalgia, a first-ever ride, pure sentimental value) that it doesn't
 * belong in a competitive ranking at all. Only one coaster can hold this
 * designation per ride type (enforced by markCoasterAsNumberZero /
 * enforceSingleNumberZero), so the offer never appears once one already
 * exists - the only way to change it is to un-mark the existing one first.
 */
export const useNumberZeroOffer = (
  nextUnrankedCoaster: Coaster | null,
  hasExistingNumberZero: boolean,
): UseNumberZeroOfferReturn => {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const offer = useMemo(() => {
    if (!nextUnrankedCoaster || hasExistingNumberZero) return null;
    if (dismissedIds.has(nextUnrankedCoaster.id)) return null;
    return nextUnrankedCoaster;
  }, [nextUnrankedCoaster, hasExistingNumberZero, dismissedIds]);

  const declineOffer = useCallback(() => {
    if (!offer) return;
    setDismissedIds((prev) => new Set(prev).add(offer.id));
  }, [offer]);

  return { offer, declineOffer };
};
