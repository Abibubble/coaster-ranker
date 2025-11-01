import { Coaster } from '../../types/data'
import { getComparisonKey } from './coreUtils'

/**
 * Get the next comparison needed for true binary search insertion.
 * This implements proper binary search: start at middle, then halve the search space
 * until only one position remains. This function returns the next coaster that needs
 * to be compared to find the exact insertion position.
 */
export const getNextTrueBinarySearchComparison = (
  newCoaster: Coaster,
  rankedCoasters: Coaster[],
  comparisonResults: Map<string, string>
): Coaster | null => {
  if (rankedCoasters.length === 0) {
    return null
  }

  // True binary search: maintain search bounds and halve them each iteration
  let left = 0
  let right = rankedCoasters.length

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    const midCoaster = rankedCoasters[mid]
    const comparisonKey = getComparisonKey(newCoaster, midCoaster)
    const winner = comparisonResults.get(comparisonKey)

    if (winner === undefined) {
      // This is the comparison needed - this implements the halving logic
      return midCoaster
    }

    if (winner === newCoaster.id) {
      // New coaster won - search upper half (better positions)
      right = mid
    } else {
      // Mid coaster won - search lower half (worse positions)
      left = mid + 1
    }
  }

  return null
}

/**
 * Get binary search targets for inserting a coaster into an existing ranking
 * This function generates the sequence of comparisons needed for proper binary search insertion
 */
export const getBinarySearchTargetsForInsertion = (
  newCoaster: Coaster,
  rankedCoasters: Coaster[],
  comparisonResults: Map<string, string>
): Coaster[] => {
  const targets: Coaster[] = []

  // Start with true binary search
  const nextTarget = getNextTrueBinarySearchComparison(
    newCoaster,
    rankedCoasters,
    comparisonResults
  )

  if (nextTarget) {
    targets.push(nextTarget)
  }

  return targets
}

/**
 * Get the next binary search comparison for a coaster based on the previous result
 */
export const getNextBinarySearchComparison = (
  newCoaster: Coaster,
  lastComparedCoaster: Coaster,
  newCoasterWon: boolean,
  sortedExistingCoasters: Coaster[],
  completedComparisons: Set<string>
): [Coaster, Coaster] | null => {
  // Find the index of the last compared coaster
  const lastIndex = sortedExistingCoasters.findIndex(
    c => c.id === lastComparedCoaster.id
  )
  if (lastIndex === -1) return null

  // Calculate how many comparisons this coaster has had
  const totalComparisons = sortedExistingCoasters.filter(existingCoaster => {
    const comparisonKey = getComparisonKey(newCoaster, existingCoaster)
    return completedComparisons.has(comparisonKey)
  }).length

  // We want to ensure enough comparisons to confidently place the coaster
  const minComparisons = Math.max(
    2,
    Math.ceil(Math.log2(sortedExistingCoasters.length + 1))
  )

  let nextIndex: number

  if (newCoasterWon) {
    // New coaster is better, so compare with a higher-ranked coaster (lower index)
    if (lastIndex === 0) {
      // At the top - if we haven't had enough comparisons, try more to confirm position
      if (totalComparisons < minComparisons) {
        // Try comparing with some other top-tier coasters to confirm ranking
        const remainingIndices = []
        for (let i = 0; i < Math.min(3, sortedExistingCoasters.length); i++) {
          const coaster = sortedExistingCoasters[i]
          const compKey = getComparisonKey(newCoaster, coaster)
          if (!completedComparisons.has(compKey)) {
            remainingIndices.push(i)
          }
        }
        if (remainingIndices.length > 0) {
          nextIndex = remainingIndices[0]
        } else {
          return null
        }
      } else {
        return null
      }
    } else {
      nextIndex = Math.floor(lastIndex / 2)
    }
  } else {
    // New coaster is worse, so compare with a lower-ranked coaster (higher index)
    if (lastIndex === sortedExistingCoasters.length - 1) {
      // At the bottom - if we haven't had enough comparisons, try more to confirm position
      if (totalComparisons < minComparisons) {
        // Try comparing with some other bottom-tier coasters to confirm ranking
        const remainingIndices = []
        for (
          let i = Math.max(0, lastIndex - 2);
          i < sortedExistingCoasters.length;
          i++
        ) {
          const coaster = sortedExistingCoasters[i]
          const compKey = getComparisonKey(newCoaster, coaster)
          if (!completedComparisons.has(compKey)) {
            remainingIndices.push(i)
          }
        }
        if (remainingIndices.length > 0) {
          nextIndex = remainingIndices[0]
        } else {
          return null
        }
      } else {
        return null
      }
    } else {
      nextIndex = Math.floor((lastIndex + sortedExistingCoasters.length) / 2)
    }
  }

  // Ensure nextIndex is valid
  if (nextIndex < 0 || nextIndex >= sortedExistingCoasters.length) {
    return null
  }

  const nextCoaster = sortedExistingCoasters[nextIndex]
  const comparisonKey = getComparisonKey(newCoaster, nextCoaster)

  // Check if this comparison has already been completed
  if (completedComparisons.has(comparisonKey)) {
    return null
  }

  return [newCoaster, nextCoaster]
}

/**
 * Check if a new coaster has been fully positioned using binary search
 */
export const isBinarySearchComplete = (
  newCoaster: Coaster,
  sortedExistingCoasters: Coaster[],
  completedComparisons: Set<string>
): boolean => {
  // Check if we have enough comparisons to determine position
  const totalComparisons = sortedExistingCoasters.filter(existingCoaster => {
    const comparisonKey = getComparisonKey(newCoaster, existingCoaster)
    return completedComparisons.has(comparisonKey)
  }).length

  // Binary search typically needs log2(n) comparisons
  const requiredComparisons = Math.ceil(
    Math.log2(sortedExistingCoasters.length + 1)
  )

  return totalComparisons >= requiredComparisons
}
