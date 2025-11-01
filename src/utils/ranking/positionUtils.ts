import { Coaster } from '../../types/data'
import { getComparisonKey } from './coreUtils'

/**
 * Update ranking positions after a comparison result for true binary search insertion
 * This replaces the old updateRankingPositions function with proper binary search logic
 */
export const updateRankingPositionsWithBinarySearch = (
  rankedCoasters: string[],
  winnerId: string,
  loserId: string,
  comparisonResults: Map<string, string>,
  allCoasters: Coaster[]
): string[] => {
  // Find which coaster is the new one being inserted
  const winnerInRanking = rankedCoasters.includes(winnerId)
  const loserInRanking = rankedCoasters.includes(loserId)

  // Case 1: Both are already ranked - just verify order is correct
  if (winnerInRanking && loserInRanking) {
    const winnerIndex = rankedCoasters.indexOf(winnerId)
    const loserIndex = rankedCoasters.indexOf(loserId)

    if (winnerIndex < loserIndex) {
      // Already in correct order
      return rankedCoasters
    } else {
      // Need to reorder - move winner before loser
      const newRanking = [...rankedCoasters]
      newRanking.splice(winnerIndex, 1) // Remove winner
      const newLoserIndex = newRanking.indexOf(loserId)
      newRanking.splice(newLoserIndex, 0, winnerId) // Insert winner before loser
      return newRanking
    }
  }

  // Case 2: Winner is new, use binary search to find insertion position
  if (!winnerInRanking && loserInRanking) {
    const winnerCoaster = allCoasters.find(c => c.id === winnerId)
    const rankedCoasterObjects = rankedCoasters
      .map(id => allCoasters.find(c => c.id === id))
      .filter(c => c !== undefined) as Coaster[]

    if (winnerCoaster) {
      const insertPosition = calculateTrueBinarySearchPosition(
        winnerCoaster,
        rankedCoasterObjects,
        comparisonResults
      )

      if (insertPosition === -1) {
        // Binary search not complete yet, DON'T change ranking - wait for more comparisons
        return rankedCoasters
      }

      const newRanking = [...rankedCoasters]
      newRanking.splice(insertPosition, 0, winnerId)
      return newRanking
    }
  }

  // Case 3: Loser is new, insert after winner using binary search
  if (winnerInRanking && !loserInRanking) {
    const loserCoaster = allCoasters.find(c => c.id === loserId)
    const rankedCoasterObjects = rankedCoasters
      .map(id => allCoasters.find(c => c.id === id))
      .filter(c => c !== undefined) as Coaster[]

    if (loserCoaster) {
      const insertPosition = calculateTrueBinarySearchPosition(
        loserCoaster,
        rankedCoasterObjects,
        comparisonResults
      )

      if (insertPosition === -1) {
        // Binary search not complete yet, DON'T change ranking - wait for more comparisons
        return rankedCoasters
      }

      // Since it lost, make sure it's at least after the winner
      const winnerIndex = rankedCoasters.indexOf(winnerId)
      const finalPosition = Math.max(insertPosition, winnerIndex + 1)

      const newRanking = [...rankedCoasters]
      newRanking.splice(finalPosition, 0, loserId)
      return newRanking
    }
  }

  // Case 4: Neither is ranked yet (first comparison)
  if (!winnerInRanking && !loserInRanking) {
    return [winnerId, loserId]
  }

  return rankedCoasters
}

/**
 * Insert a new coaster into the ranking at the correct position
 * This is used for sequential insertion when a coaster has completed all necessary comparisons
 */
export const insertCoasterIntoRanking = (
  coaster: Coaster,
  rankedCoasters: string[],
  comparisonResults: Map<string, string>,
  allCoasters: Coaster[]
): { newRanking: string[]; insertPosition: number } => {
  if (rankedCoasters.length === 0) {
    return { newRanking: [coaster.id], insertPosition: 0 }
  }

  const insertPosition = calculateInsertionPosition(
    coaster,
    rankedCoasters,
    comparisonResults,
    allCoasters
  )

  const newRanking = [...rankedCoasters]
  newRanking.splice(insertPosition, 0, coaster.id)

  return { newRanking, insertPosition }
}

/**
 * Calculate the insertion position for a new coaster using true binary search
 * This determines where in the ranking the coaster should be placed
 */
export const calculateInsertionPosition = (
  newCoaster: Coaster,
  rankedCoasters: string[],
  comparisonResults: Map<string, string>,
  allCoasters: Coaster[]
): number => {
  if (rankedCoasters.length === 0) return 0

  const rankedCoasterObjects = rankedCoasters
    .map(id => allCoasters.find(c => c.id === id))
    .filter(c => c !== undefined) as Coaster[]

  // Use the true binary search position calculation
  const position = calculateTrueBinarySearchPosition(
    newCoaster,
    rankedCoasterObjects,
    comparisonResults
  )

  return position === -1 ? rankedCoasters.length : position
}

/**
 * Determine if a coaster has enough comparison results to be inserted using true binary search
 * This checks if the binary search has enough data to make an accurate placement decision
 */
export const isCoasterReadyForInsertion = (
  newCoaster: Coaster,
  rankedCoasters: string[],
  comparisonResults: Map<string, string>,
  allCoasters: Coaster[]
): boolean => {
  if (rankedCoasters.length === 0) return true

  const rankedCoasterObjects = rankedCoasters
    .map(id => allCoasters.find(c => c.id === id))
    .filter(c => c !== undefined) as Coaster[]

  // Check if true binary search is complete
  return isTrueBinarySearchComplete(
    newCoaster,
    rankedCoasterObjects,
    comparisonResults
  )
}

/**
 * Get coasters with their ranking positions for display
 * This combines coaster data with their current ranking positions
 */
export const getCoastersWithPositions = (
  coasters: Coaster[],
  rankedCoasters: string[]
): Coaster[] => {
  return coasters.map(coaster => ({
    ...coaster,
    rankPosition: rankedCoasters.includes(coaster.id)
      ? rankedCoasters.indexOf(coaster.id) + 1
      : undefined,
  }))
}

/**
 * Calculate the insertion position for a new coaster using true binary search
 * Returns -1 if binary search is not complete yet
 */
export const calculateTrueBinarySearchPosition = (
  newCoaster: Coaster,
  rankedCoasters: Coaster[],
  comparisonResults: Map<string, string>
): number => {
  if (rankedCoasters.length === 0) return 0

  let left = 0
  let right = rankedCoasters.length

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    const midCoaster = rankedCoasters[mid]
    const comparisonKey = getComparisonKey(newCoaster, midCoaster)
    const winner = comparisonResults.get(comparisonKey)

    if (winner === undefined) {
      // This is the comparison we need - this implements the halving logic
      return -1 // Not ready yet, need more comparisons
    }

    if (winner === newCoaster.id) {
      // New coaster is better, search left half
      right = mid
    } else {
      // New coaster is worse, search right half
      left = mid + 1
    }
  }

  return left
}

/**
 * Determine if the binary search has enough comparisons to place the coaster accurately
 */
export const isTrueBinarySearchComplete = (
  newCoaster: Coaster,
  rankedCoasters: Coaster[],
  comparisonResults: Map<string, string>
): boolean => {
  if (rankedCoasters.length === 0) return true

  let left = 0
  let right = rankedCoasters.length

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    const midCoaster = rankedCoasters[mid]
    const comparisonKey = getComparisonKey(newCoaster, midCoaster)
    const winner = comparisonResults.get(comparisonKey)

    if (winner === undefined) {
      // Missing comparison - binary search not complete
      return false
    }

    if (winner === newCoaster.id) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return true
}
