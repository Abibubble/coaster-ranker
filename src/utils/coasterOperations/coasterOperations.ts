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

/**
 * Marks a single coaster as a Number 0 - the enthusiast convention for a
 * ride too personally/emotionally significant to rank competitively -
 * clearing the flag from every other coaster in the collection first, since
 * only one can hold it at a time.
 */
export const markCoasterAsNumberZero = (
  currentData: UploadedData,
  coasterId: string,
): UploadedData => {
  const target = currentData.coasters.find((c) => c.id === coasterId);
  const previousRankPosition = target?.rankPosition;

  const updatedCoasters = currentData.coasters.map((coaster) => {
    if (coaster.id === coasterId) {
      return { ...coaster, isNumberZero: true, rankPosition: undefined };
    }

    // If the coaster becoming Number 0 was already ranked, close the gap by
    // shifting everyone below it up by one - same renumbering removeCoaster
    // already does when a ranked coaster is deleted outright.
    const shifted =
      previousRankPosition !== undefined &&
      coaster.rankPosition !== undefined &&
      coaster.rankPosition > previousRankPosition
        ? { ...coaster, rankPosition: coaster.rankPosition - 1 }
        : coaster;

    return shifted.isNumberZero
      ? { ...shifted, isNumberZero: false }
      : shifted;
  });

  let updatedRankingMetadata = currentData.rankingMetadata;
  if (updatedRankingMetadata) {
    const newRankedCoasters = updatedCoasters
      .filter((coaster) => coaster.rankPosition !== undefined)
      .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0))
      .map((coaster) => coaster.id);

    updatedRankingMetadata = {
      ...updatedRankingMetadata,
      rankedCoasters: newRankedCoasters,
    };
  }

  return {
    ...currentData,
    coasters: updatedCoasters,
    rankingMetadata: updatedRankingMetadata,
  };
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
