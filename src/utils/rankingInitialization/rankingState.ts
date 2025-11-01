import { Coaster } from '../../types/data'

export interface RankingStateUpdate {
  currentPair: [Coaster, Coaster] | null
  remainingComparisons: [Coaster, Coaster][]
  totalComparisons: number
  comparisonCount: number
  lastComparison: null
  isRankingComplete: boolean
  rankedCoasters: Coaster[]
}

export interface RankingStateParams {
  comparisons: [Coaster, Coaster][]
  totalPossibleComparisons: number
  isRankingComplete: boolean
  rankedCoasters: Coaster[]
}

/**
 * Initialize ranking state values from comparison results
 * This prepares all the state updates needed for the ranking component
 */
export const initializeRankingState = ({
  comparisons,
  totalPossibleComparisons,
  isRankingComplete,
  rankedCoasters,
}: RankingStateParams): RankingStateUpdate => {
  return {
    currentPair: comparisons[0] || null,
    remainingComparisons: comparisons,
    totalComparisons: totalPossibleComparisons,
    comparisonCount: 0,
    lastComparison: null,
    isRankingComplete,
    rankedCoasters: isRankingComplete ? rankedCoasters : [],
  }
}

/**
 * Calculate total possible comparisons for a set of coasters
 */
export const calculateTotalComparisons = (coastersCount: number): number => {
  return Math.floor((coastersCount * (coastersCount - 1)) / 2)
}

/**
 * Determine if ranking is complete based on comparisons and coaster count
 */
export const isRankingCompleteCheck = (
  comparisons: [Coaster, Coaster][],
  rankedCoastersCount: number,
  totalCoastersCount: number
): boolean => {
  return comparisons.length === 0 && rankedCoastersCount === totalCoastersCount
}

/**
 * Get completion status and ranked coasters based on completion state
 */
export const getRankingCompletionData = (
  isComplete: boolean,
  coastersWithPositions: Coaster[]
): {
  isRankingComplete: boolean
  rankedCoasters: Coaster[]
} => {
  return {
    isRankingComplete: isComplete,
    rankedCoasters: isComplete ? coastersWithPositions : [],
  }
}
