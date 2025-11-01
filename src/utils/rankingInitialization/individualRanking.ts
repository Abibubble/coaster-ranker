import { Coaster, UploadedData } from '../../types/data'
import {
  getCoastersWithPositions,
  initializePositionalRanking,
} from '../ranking/rankingUtils'
import { rankingLogger } from '../ranking/rankingLogger'
import {
  getOptimalComparisons,
  ComparisonStrategyParams,
} from './comparisonStrategy'
import {
  calculateTotalComparisons,
  getRankingCompletionData,
  isRankingCompleteCheck,
} from './rankingState'

export interface IndividualRankingParams {
  uploadedData: UploadedData
  comparisonResults: Map<string, string>
}

export interface IndividualRankingResult {
  comparisons: [Coaster, Coaster][]
  coastersWithPositions: Coaster[]
  totalPossibleComparisons: number
  completedComparisons: Set<string>
  updatedData: UploadedData
  isRankingComplete: boolean
  rankedCoasters: Coaster[]
}

/**
 * Initialize individual ranking for coasters
 * This handles comparison strategy selection and state initialization
 */
export const initializeIndividualRanking = ({
  uploadedData,
  comparisonResults,
}: IndividualRankingParams): IndividualRankingResult => {
  const initialized = initializePositionalRanking(uploadedData.coasters)

  const coastersWithPositions = getCoastersWithPositions(
    initialized.coasters,
    initialized.rankedCoasters
  )

  // For sequential insertion with new coasters, start fresh with empty completed comparisons
  const hasNewCoasters = initialized.coasters.some(c => c.isCurrentlyRanking)
  const completedComparisons = hasNewCoasters
    ? new Set<string>()
    : uploadedData.rankingMetadata?.completedComparisons || new Set<string>()

  // Use strategy-based comparison generation
  const strategyParams: ComparisonStrategyParams = {
    coasters: coastersWithPositions,
    rankedCoasters: initialized.rankedCoasters,
    completedComparisons,
    comparisonResults,
  }

  const { comparisons } = getOptimalComparisons(strategyParams)

  const totalPossibleComparisons = calculateTotalComparisons(
    uploadedData.coasters.length
  )

  const isComplete = isRankingCompleteCheck(
    comparisons,
    initialized.rankedCoasters.length,
    uploadedData.coasters.length
  )

  const { isRankingComplete, rankedCoasters } = getRankingCompletionData(
    isComplete,
    coastersWithPositions
  )

  // Log initialization details
  rankingLogger.logInitialization(
    'individual',
    uploadedData.coasters.length,
    uploadedData.coasters.filter(c => c.isPreRanked).length,
    uploadedData.coasters.filter(c => c.isNewCoaster).length,
    comparisons.length,
    initialized.rankedCoasters
  )

  const updatedData: UploadedData = {
    ...uploadedData,
    coasters: coastersWithPositions,
    rankingMetadata: {
      ...uploadedData.rankingMetadata,
      rankedCoasters: initialized.rankedCoasters,
      completedComparisons,
      isRanked: uploadedData.rankingMetadata?.isRanked || false,
    },
  }

  return {
    comparisons,
    coastersWithPositions,
    totalPossibleComparisons,
    completedComparisons,
    updatedData,
    isRankingComplete,
    rankedCoasters,
  }
}
