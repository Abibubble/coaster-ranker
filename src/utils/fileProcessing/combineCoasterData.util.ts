import { Coaster, UploadedData } from "../../types/data";
import { detectAndFixDuplicateIds } from "../duplicateIdDetection.util";
/**
 * Utility functions for combining new coaster data with existing coaster data.
 * Handles pre-ranking flags, metadata updates, and data merging operations.
 */
export interface CombineCoasterDataParams {
  newCoasters: Coaster[];
  filename: string;
  existingData: UploadedData | null;
  isPreRanked?: boolean;
}

export interface CombineCoasterDataResult {
  combinedData: UploadedData;
  newCoasterCount: number;
  totalCount: number;
}

export function combineCoasterData(
  params: CombineCoasterDataParams,
): CombineCoasterDataResult {
  const { newCoasters, filename, existingData, isPreRanked = false } = params;

  const existingCoasters = existingData?.coasters || [];
  const uploadId = Date.now().toString();

  // Check if any of the new coasters have ranking data from CSV
  const hasCoastersWithRankingData = newCoasters.some(
    (coaster) => coaster.rankPosition !== undefined || coaster.isPreRanked,
  );

  const markedNewCoasters = newCoasters.map((coaster, index) => ({
    ...coaster,
    isNewCoaster: true,
    // Only set ranking data if not already present from CSV
    ...(isPreRanked &&
      !coaster.originalRankPosition && {
        originalRankPosition: index,
        isPreRanked: true,
      }),
    // Preserve existing ranking data from CSV
    ...(coaster.isPreRanked && {
      isPreRanked: true,
    }),
  }));

  const preservedExistingCoasters = existingCoasters.map((coaster) => ({
    ...coaster,
    isNewCoaster: false,
  }));

  const existingRankingMetadata = existingData?.rankingMetadata || {
    completedComparisons: new Set<string>(),
    rankedCoasters: [],
    isRanked: false,
  };

  const combinedFilename = existingData?.filename
    ? `${existingData.filename}, ${filename}`
    : filename;

  const allCoasters = [...preservedExistingCoasters, ...markedNewCoasters];

  const coastersWithUniqueIds = detectAndFixDuplicateIds(allCoasters);

  const hasAnyPreRankedData = isPreRanked || hasCoastersWithRankingData;

  // If coasters have ranking data, create ranked coasters array
  let rankedCoasters = existingRankingMetadata.rankedCoasters;
  if (hasCoastersWithRankingData) {
    // Get all coasters with ranking data and sort by rank position
    const coastersWithRanks = coastersWithUniqueIds
      .filter((coaster) => coaster.rankPosition !== undefined)
      .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0));

    // If we have ranked coasters from CSV, use them as the ranked order
    if (coastersWithRanks.length > 0) {
      rankedCoasters = coastersWithRanks.map((coaster) => coaster.id);
    }
  }

  const combinedData: UploadedData = {
    coasters: coastersWithUniqueIds,
    uploadedAt: new Date(),
    filename: combinedFilename,
    rankingMetadata: {
      completedComparisons: existingRankingMetadata.completedComparisons,
      rankedCoasters,
      isRanked: existingRankingMetadata.isRanked || hasCoastersWithRankingData,
      hasPreRankedCoasters:
        existingRankingMetadata.hasPreRankedCoasters || hasAnyPreRankedData,
      preRankedGroups: hasAnyPreRankedData
        ? [...(existingRankingMetadata.preRankedGroups || []), uploadId]
        : existingRankingMetadata.preRankedGroups || [],
    },
  };

  return {
    combinedData,
    newCoasterCount: newCoasters.length,
    totalCount: coastersWithUniqueIds.length,
  };
}
