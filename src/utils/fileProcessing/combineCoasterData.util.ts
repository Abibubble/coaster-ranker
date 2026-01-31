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

  const markedNewCoasters = newCoasters.map((coaster, index) => ({
    ...coaster,
    isNewCoaster: true,
    ...(isPreRanked && {
      originalRankPosition: index,
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

  const combinedData: UploadedData = {
    coasters: coastersWithUniqueIds,
    uploadedAt: new Date(),
    filename: combinedFilename,
    rankingMetadata: {
      completedComparisons: existingRankingMetadata.completedComparisons,
      rankedCoasters: existingRankingMetadata.rankedCoasters,
      isRanked: false,
      hasPreRankedCoasters:
        existingRankingMetadata.hasPreRankedCoasters || false || isPreRanked,
      preRankedGroups: isPreRanked
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
