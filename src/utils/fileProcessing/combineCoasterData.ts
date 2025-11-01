import { Coaster, UploadedData } from '../../types/data'

export interface CombineCoasterDataParams {
  newCoasters: Coaster[]
  filename: string
  existingData: UploadedData | null
  isPreRanked?: boolean
}

export interface CombineCoasterDataResult {
  combinedData: UploadedData
  newCoasterCount: number
  totalCount: number
}

/**
 * Combine new coasters with existing coaster data
 * Handles pre-ranking flags, metadata updates, and data merging
 */
export function combineCoasterData(
  params: CombineCoasterDataParams
): CombineCoasterDataResult {
  const { newCoasters, filename, existingData, isPreRanked = false } = params

  const existingCoasters = existingData?.coasters || []
  const uploadId = Date.now().toString()

  // Mark new coasters with appropriate flags
  const markedNewCoasters = newCoasters.map((coaster, index) => ({
    ...coaster,
    isNewCoaster: true,
    ...(isPreRanked && {
      originalRankPosition: index,
      isPreRanked: true,
    }),
  }))

  // Build existing ranking metadata with defaults
  const existingRankingMetadata = existingData?.rankingMetadata || {
    completedComparisons: new Set<string>(),
    rankedCoasters: [],
    isRanked: false,
  }

  // Combine filename
  const combinedFilename = existingData?.filename
    ? `${existingData.filename}, ${filename}`
    : filename

  // Build combined data
  const allCoasters = [...existingCoasters, ...markedNewCoasters]

  const combinedData: UploadedData = {
    coasters: allCoasters,
    uploadedAt: new Date(),
    filename: combinedFilename,
    rankingMetadata: {
      completedComparisons: existingRankingMetadata.completedComparisons,
      rankedCoasters: existingRankingMetadata.rankedCoasters,
      isRanked: existingRankingMetadata.isRanked,
      hasPreRankedCoasters:
        existingRankingMetadata.hasPreRankedCoasters || false || isPreRanked,
      preRankedGroups: isPreRanked
        ? [...(existingRankingMetadata.preRankedGroups || []), uploadId]
        : existingRankingMetadata.preRankedGroups || [],
    },
  }

  return {
    combinedData,
    newCoasterCount: newCoasters.length,
    totalCount: allCoasters.length,
  }
}
