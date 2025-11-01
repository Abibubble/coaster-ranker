import { UploadedData } from '../../types/data'

export interface ResetRankingsParams {
  uploadedData: UploadedData | null
}

export interface ResetRankingsResult {
  updatedData: UploadedData | null
  confirmed: boolean
}

/**
 * Reset all rankings from the uploaded coasters, leaving them all in an un-ranked state
 * This function prompts the user for confirmation before proceeding with the reset
 */
export function resetRankings(
  params: ResetRankingsParams
): ResetRankingsResult {
  const { uploadedData } = params

  const confirmed = window.confirm(
    'Are you sure you want to reset all rankings? This will permanently delete all your ranking progress and you will need to start over from the beginning.'
  )

  if (!confirmed) {
    return {
      updatedData: uploadedData,
      confirmed: false,
    }
  }

  if (!uploadedData) {
    return {
      updatedData: null,
      confirmed: true,
    }
  }

  // Reset all ranking metadata and coaster states
  const resetData: UploadedData = {
    ...uploadedData,
    coasters: uploadedData.coasters.map(coaster => ({
      ...coaster,
      rankPosition: undefined,
      isCurrentlyRanking: false,
      isNewCoaster: true, // Mark as new so they need ranking
    })),
    rankingMetadata: {
      completedComparisons: new Set<string>(),
      rankedCoasters: [], // Start with empty ranking
      isRanked: false,
    },
  }

  return {
    updatedData: resetData,
    confirmed: true,
  }
}
