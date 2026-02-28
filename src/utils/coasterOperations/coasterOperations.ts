import { Coaster, UploadedData } from "../../types/data";

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
          (comparison) => !comparison.includes(coasterId),
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
