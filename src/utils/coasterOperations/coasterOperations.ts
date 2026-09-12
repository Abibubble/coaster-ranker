import { Coaster, RankingMetadata, UploadedData } from "../../types/data";

/**
 * Whether a coaster collection has any ranking progress to show or sort by —
 * either a fully completed ranking, or a partial session with at least one
 * coaster that already has a rankPosition.
 */
export const hasAnyRanking = (
  coasters: Coaster[],
  rankingMetadata?: RankingMetadata,
): boolean => {
  if (rankingMetadata?.isRanked) return true;
  return coasters.some((coaster) => coaster.rankPosition !== undefined);
};

/**
 * Removes a coaster from the collection and updates rankings accordingly
 */
export const removeCoaster = (
  currentData: UploadedData,
  coasterId: string,
): UploadedData | null => {
  const coasterToRemove = currentData.coasters.find(
    (c: Coaster) => c.id === coasterId,
  );
  const removedCoasterRankPosition = coasterToRemove?.rankPosition;

  const updatedCoasters = currentData.coasters
    .filter((coaster) => coaster.id !== coasterId)
    .map((coaster) => {
      if (
        coaster.rankPosition !== undefined &&
        removedCoasterRankPosition !== undefined &&
        coaster.rankPosition > removedCoasterRankPosition
      ) {
        return {
          ...coaster,
          rankPosition: coaster.rankPosition - 1,
        };
      }
      return coaster;
    });

  let updatedRankingMetadata = currentData.rankingMetadata;
  if (updatedRankingMetadata && updatedRankingMetadata.rankedCoasters) {
    // Rebuild the rankedCoasters array based on the updated coaster rankings
    const newRankedCoasters = updatedCoasters
      .filter((coaster) => coaster.rankPosition !== undefined)
      .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0))
      .map((coaster) => coaster.id);

    updatedRankingMetadata = {
      ...updatedRankingMetadata,
      rankedCoasters: newRankedCoasters,
      isRanked:
        newRankedCoasters.length === updatedCoasters.length &&
        updatedCoasters.length > 0,
      completedComparisons: new Set(
        Array.from(updatedRankingMetadata.completedComparisons || []).filter(
          (comparison) =>
            !comparison.startsWith(`${coasterId}-`) &&
            !comparison.endsWith(`-${coasterId}`),
        ),
      ),
    };
  }

  if (updatedCoasters.length === 0) {
    return null;
  }

  return {
    ...currentData,
    coasters: updatedCoasters,
    rankingMetadata: updatedRankingMetadata,
  };
};

/**
 * Updates an existing coaster in the collection
 */
export const updateCoaster = (
  currentData: UploadedData,
  coasterId: string,
  updates: Partial<Coaster>,
): UploadedData => {
  const updatedCoasters = currentData.coasters.map((coaster) =>
    coaster.id === coasterId ? { ...coaster, ...updates } : coaster,
  );

  return {
    ...currentData,
    coasters: updatedCoasters,
  };
};

/** The current ranking order (best to worst) as an array of coaster ids,
 * derived from rankPosition - the source of truth - rather than trusting
 * rankingMetadata.rankedCoasters, which can go stale. */
const getRankedIdOrder = (coasters: Coaster[]): string[] =>
  coasters
    .filter((c) => c.rankPosition !== undefined)
    .sort((a, b) => (a.rankPosition ?? 0) - (b.rankPosition ?? 0))
    .map((c) => c.id);

/** Inserts a coaster's id back into a ranked-id order at the position it
 * held before it became Number 0 (clamped to the current length, in case
 * the collection has changed size since), or at the end if it never had
 * one - e.g. it was accepted as Number 0 before ever being ranked. */
const insertAtRememberedPosition = (
  rankedIds: string[],
  coasterToRestore: Coaster,
): string[] => {
  const restoreIndex =
    coasterToRestore.rankPositionBeforeNumberZero !== undefined
      ? Math.min(
          coasterToRestore.rankPositionBeforeNumberZero - 1,
          rankedIds.length,
        )
      : rankedIds.length;

  return [
    ...rankedIds.slice(0, restoreIndex),
    coasterToRestore.id,
    ...rankedIds.slice(restoreIndex),
  ];
};

const applyRankOrder = (
  currentData: UploadedData,
  rankedIds: string[],
  coasterUpdates: Record<string, Partial<Coaster>>,
): UploadedData => {
  // rankedIds is the complete, authoritative list of who should hold a rank
  // position after this operation - anyone not in it (the coaster just
  // becoming Number 0, or anyone who was never ranked) gets undefined, full
  // stop. No falling back to their old rankPosition: that's exactly the bug
  // that left a freshly-Number-0'd coaster still showing a rank.
  const positionById = new Map(rankedIds.map((id, index) => [id, index + 1]));

  const updatedCoasters = currentData.coasters.map((coaster) => {
    const explicitUpdate = coasterUpdates[coaster.id];
    const rankPosition = positionById.get(coaster.id);
    return explicitUpdate
      ? { ...coaster, ...explicitUpdate, rankPosition }
      : { ...coaster, rankPosition };
  });

  // A Number 0 swap can leave the ranking genuinely incomplete - e.g. a
  // coaster with no remembered position (accepted as Number 0 before ever
  // being ranked) still ends up in rankedIds via insertAtRememberedPosition,
  // but if a *different* future change ever leaves someone out of rankedIds
  // entirely, isRanked must reflect that rather than staying stuck at
  // whatever it was before this swap - otherwise the app treats a partial
  // ranking as finished and won't let the user re-rank the gap.
  const rankableCount = updatedCoasters.filter(
    (c) => !c.isPreRanked && !c.isNumberZero,
  ).length;

  const updatedRankingMetadata = currentData.rankingMetadata && {
    ...currentData.rankingMetadata,
    rankedCoasters: rankedIds,
    isRanked: rankableCount > 0 && rankedIds.length === rankableCount,
  };

  return {
    ...currentData,
    coasters: updatedCoasters,
    rankingMetadata: updatedRankingMetadata,
  };
};

/**
 * Marks a single coaster as a Number 0 - the enthusiast convention for a
 * ride too personally/emotionally significant to rank competitively - and
 * clears the flag from whichever coaster held it before (only one can hold
 * it at a time), restoring that coaster to the ranked position it held
 * before *it* became Number 0.
 */
export const markCoasterAsNumberZero = (
  currentData: UploadedData,
  coasterId: string,
): UploadedData => {
  const target = currentData.coasters.find((c) => c.id === coasterId);
  if (!target) return currentData;

  // Normally at most one other coaster can hold the flag, but stay
  // defensive against imported/merged data that already has more than one:
  // clear all of them, restoring only the first to its remembered position
  // (there's no principled way to restore more than one at once).
  const otherNumberZeros = currentData.coasters.filter(
    (c) => c.isNumberZero && c.id !== coasterId,
  );
  const [previousNumberZero, ...extraNumberZeros] = otherNumberZeros;

  let rankedIds = getRankedIdOrder(currentData.coasters).filter(
    (id) => id !== coasterId,
  );
  if (previousNumberZero) {
    rankedIds = insertAtRememberedPosition(rankedIds, previousNumberZero);
  }

  return applyRankOrder(currentData, rankedIds, {
    [coasterId]: {
      isNumberZero: true,
      rankPositionBeforeNumberZero: target.rankPosition,
    },
    ...(previousNumberZero && {
      [previousNumberZero.id]: {
        isNumberZero: false,
        rankPositionBeforeNumberZero: undefined,
      },
    }),
    ...Object.fromEntries(
      extraNumberZeros.map((c) => [c.id, { isNumberZero: false }]),
    ),
  });
};

/**
 * Clears a coaster's Number 0 status and restores it to the ranked position
 * it held immediately before it became Number 0 (or the end of the ranking
 * if it never had one).
 */
export const unmarkNumberZero = (
  currentData: UploadedData,
  coasterId: string,
): UploadedData => {
  const target = currentData.coasters.find((c) => c.id === coasterId);
  if (!target || !target.isNumberZero) return currentData;

  const rankedIds = insertAtRememberedPosition(
    getRankedIdOrder(currentData.coasters),
    target,
  );

  return applyRankOrder(currentData, rankedIds, {
    [coasterId]: {
      isNumberZero: false,
      rankPositionBeforeNumberZero: undefined,
    },
  });
};

/**
 * Ensures at most one coaster is marked as a Number 0, keeping the flag on
 * the first match (array order) and clearing any later ones. Guards against
 * an import/merge combining data that already has more than one.
 */
export const enforceSingleNumberZero = (coasters: Coaster[]): Coaster[] => {
  let seen = false;
  return coasters.map((coaster) => {
    if (!coaster.isNumberZero) return coaster;
    if (seen) return { ...coaster, isNumberZero: false };
    seen = true;
    return coaster;
  });
};

/**
 * Gets unique values for a specific field from all coasters
 */
export const getUniqueFieldValues = (
  coasters: Coaster[],
  field: keyof Coaster,
): string[] => {
  const values = coasters
    .map((coaster) => coaster[field])
    .filter(Boolean)
    .map(String);

  return [...new Set(values)].sort();
};

/**
 * Generates confirmation message for removing coasters
 */
export const getRemovalConfirmationMessage = (
  count: number,
  rideTypeLabel: string,
  ridePluralLabel: string,
): string => {
  const label =
    count === 1 ? rideTypeLabel.toLowerCase().slice(0, -1) : ridePluralLabel;
  return `Are you sure you want to remove ${count === 1 ? "this" : `all ${count}`} ${label} from your collection? This action cannot be undone.`;
};
