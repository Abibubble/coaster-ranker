import { Coaster, UploadedData } from '../../types/data'

export interface UndoLastComparisonParams {
  lastComparison: {
    pair: [Coaster, Coaster]
    chosenCoaster: Coaster
    comparisonKey: string
  } | null
  uploadedData: UploadedData | null
  comparisonCount: number
  remainingComparisons: [Coaster, Coaster][]
}

export interface UndoLastComparisonResult {
  updatedData: UploadedData | null
  updatedComparisonCount: number
  updatedRemainingComparisons: [Coaster, Coaster][]
  currentPair: [Coaster, Coaster] | null
  success: boolean
}

/**
 * Undo the previous comparison by removing it from completed comparisons
 * and restoring the comparison pair to the remaining comparisons list
 */
export function undoLastComparison(
  params: UndoLastComparisonParams
): UndoLastComparisonResult {
  const {
    lastComparison,
    uploadedData,
    comparisonCount,
    remainingComparisons,
  } = params

  if (!lastComparison || !uploadedData) {
    return {
      updatedData: uploadedData,
      updatedComparisonCount: comparisonCount,
      updatedRemainingComparisons: remainingComparisons,
      currentPair: remainingComparisons[0] || null,
      success: false,
    }
  }

  const { pair, comparisonKey } = lastComparison

  const updatedComparisonCount = Math.max(0, comparisonCount - 1)

  const currentCompletedComparisons =
    uploadedData.rankingMetadata?.completedComparisons || new Set<string>()
  const updatedCompletedComparisons = new Set(currentCompletedComparisons)
  updatedCompletedComparisons.delete(comparisonKey)

  const updatedRemainingComparisons = [pair, ...remainingComparisons]
  const currentPair = pair

  const progressData = {
    ...uploadedData,
    rankingMetadata: {
      completedComparisons: updatedCompletedComparisons,
      rankedCoasters:
        uploadedData.rankingMetadata?.rankedCoasters ||
        uploadedData.coasters.map(c => c.id),
      isRanked: false,
    },
  }

  return {
    updatedData: progressData,
    updatedComparisonCount,
    updatedRemainingComparisons,
    currentPair,
    success: true,
  }
}
