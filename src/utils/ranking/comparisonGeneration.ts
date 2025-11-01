import { Coaster } from '../../types/data'
import { getComparisonKey } from './coreUtils'
import { getNextTrueBinarySearchComparison } from './binarySearchUtils'

/**
 * Generate comparisons for coasters based on their status (new vs existing)
 */
export const generateComparisons = (
  coasters: Coaster[],
  completedComparisons: Set<string>
): [Coaster, Coaster][] => {
  const pairs: [Coaster, Coaster][] = []
  const existingCoasters = coasters.filter(c => !c.isNewCoaster)
  const newCoasters = coasters.filter(c => c.isNewCoaster)

  const areBothPreRanked = (c1: Coaster, c2: Coaster) => {
    return c1.isPreRanked && c2.isPreRanked
  }

  if (existingCoasters.length > 0 && newCoasters.length > 0) {
    const hasExistingRankings = existingCoasters.some(
      c => c.rankPosition !== undefined
    )

    if (hasExistingRankings && existingCoasters.length >= 3) {
      const binarySearchPairs = generateBinarySearchComparisons(
        coasters,
        completedComparisons
      )
      pairs.push(...binarySearchPairs)

      // Ensure minimum comparisons for accurate ranking
      for (const newCoaster of newCoasters.filter(c => !c.isPreRanked)) {
        const existingComparisons = existingCoasters.filter(existingCoaster => {
          const comparisonKey = getComparisonKey(newCoaster, existingCoaster)
          return completedComparisons.has(comparisonKey)
        }).length

        const minComparisons = Math.min(
          5,
          Math.ceil(existingCoasters.length / 2)
        )
        if (existingComparisons < minComparisons) {
          const sortedExisting = [...existingCoasters].sort((a, b) => {
            const posA = a.rankPosition || Number.MAX_SAFE_INTEGER
            const posB = b.rankPosition || Number.MAX_SAFE_INTEGER
            return posA - posB
          })

          const worstCoaster = sortedExisting[sortedExisting.length - 1]
          const worstComparisonKey = getComparisonKey(newCoaster, worstCoaster)
          if (!completedComparisons.has(worstComparisonKey)) {
            pairs.push([newCoaster, worstCoaster])
          }

          if (existingComparisons < 2) {
            const bestCoaster = sortedExisting[0]
            const bestComparisonKey = getComparisonKey(newCoaster, bestCoaster)
            if (!completedComparisons.has(bestComparisonKey)) {
              pairs.push([newCoaster, bestCoaster])
            }
          }
        }
      }
    } else {
      for (const newCoaster of newCoasters) {
        for (const existingCoaster of existingCoasters) {
          const comparisonKey = getComparisonKey(newCoaster, existingCoaster)
          if (!completedComparisons.has(comparisonKey)) {
            pairs.push([newCoaster, existingCoaster])
          }
        }
      }
    }

    // Handle new coasters vs each other (skip if both are pre-ranked)
    for (let i = 0; i < newCoasters.length - 1; i++) {
      for (let j = i + 1; j < newCoasters.length; j++) {
        const coaster1 = newCoasters[i]
        const coaster2 = newCoasters[j]

        if (areBothPreRanked(coaster1, coaster2)) {
          continue
        }

        const comparisonKey = getComparisonKey(coaster1, coaster2)
        if (!completedComparisons.has(comparisonKey)) {
          pairs.push([coaster1, coaster2])
        }
      }
    }
  } else {
    // Full ranking - compare all coasters, excluding completed comparisons and pre-ranked pairs
    for (let i = 0; i < coasters.length - 1; i++) {
      for (let j = i + 1; j < coasters.length; j++) {
        const coaster1 = coasters[i]
        const coaster2 = coasters[j]

        // Skip comparison if both coasters are pre-ranked
        if (areBothPreRanked(coaster1, coaster2)) {
          continue
        }

        const comparisonKey = getComparisonKey(coaster1, coaster2)
        if (!completedComparisons.has(comparisonKey)) {
          pairs.push([coaster1, coaster2])
        }
      }
    }
  }

  return pairs
}

/**
 * Generate positional comparisons for coasters using binary search insertion
 * Each coaster is inserted into the ranking one at a time using binary search
 */
export const generatePositionalComparisons = (
  coasters: Coaster[],
  rankedCoasters: string[],
  completedComparisons: Set<string>,
  comparisonResults?: Map<string, string>
): [Coaster, Coaster][] => {
  const pairs: [Coaster, Coaster][] = []

  // Special case: if no coasters are ranked yet, start with first comparison
  if (rankedCoasters.length === 0 && coasters.length >= 2) {
    const unrankedCoasters = coasters.filter(
      c => !c.isPreRanked && c.rankPosition === undefined
    )
    if (unrankedCoasters.length >= 2) {
      // For positional insertion, we start with the first comparison between two coasters
      pairs.push([unrankedCoasters[0], unrankedCoasters[1]])

      // If we have a third coaster, also prepare comparisons for it
      // This helps establish more of the initial ranking structure
      if (unrankedCoasters.length >= 3) {
        const thirdCoaster = unrankedCoasters[2]
        pairs.push([thirdCoaster, unrankedCoasters[0]])
        pairs.push([thirdCoaster, unrankedCoasters[1]])
      }
    }
    return pairs
  }

  // Find coasters that are currently ranking or ready to be ranked
  const allRankedIds = new Set(rankedCoasters)
  const unrankedCoasters = coasters.filter(
    c =>
      !c.isPreRanked && !allRankedIds.has(c.id) && c.rankPosition === undefined
  )

  if (unrankedCoasters.length === 0) {
    // All coasters are ranked - validate critical comparisons
    const criticalComparisons = validateAndGenerateCriticalComparisons(
      coasters,
      rankedCoasters,
      completedComparisons
    )
    return criticalComparisons
  }

  // If we have unranked coasters but no one is currently ranking,
  // mark the first unranked coaster as currently ranking
  const currentRankingCoaster = coasters.find(c => c.isCurrentlyRanking)
  let targetCoaster = currentRankingCoaster

  if (!targetCoaster && unrankedCoasters.length > 0) {
    targetCoaster = unrankedCoasters[0]
  }

  if (!targetCoaster) {
    return pairs
  }

  // Get existing ranked coasters as objects, excluding the target coaster
  const rankedCoasterObjects = rankedCoasters
    .map(id => coasters.find(c => c.id === id))
    .filter(c => c !== undefined && c.id !== targetCoaster.id) as Coaster[]

  if (rankedCoasterObjects.length === 0) {
    return pairs
  }

  // Generate binary search comparisons for the current coaster
  const nextTarget = getNextTrueBinarySearchComparison(
    targetCoaster,
    rankedCoasterObjects,
    comparisonResults || new Map()
  )

  if (nextTarget && nextTarget.id !== targetCoaster.id) {
    const comparisonKey = getComparisonKey(targetCoaster, nextTarget)

    if (!completedComparisons.has(comparisonKey)) {
      pairs.push([targetCoaster, nextTarget])
    }
  }

  return pairs
}

/**
 * Generate binary search comparisons for new coasters against existing ranked coasters
 * This dramatically reduces the number of comparisons needed by using a binary search approach
 */
export const generateBinarySearchComparisons = (
  coasters: Coaster[],
  completedComparisons: Set<string>
): [Coaster, Coaster][] => {
  const pairs: [Coaster, Coaster][] = []
  const newCoasters = coasters.filter(c => c.isNewCoaster && !c.isPreRanked)
  const existingRankedCoasters = coasters.filter(
    c => !c.isNewCoaster && c.rankPosition !== undefined
  )

  if (newCoasters.length === 0 || existingRankedCoasters.length === 0) {
    return pairs
  }

  // Sort existing coasters by rank position
  const sortedExisting = existingRankedCoasters.sort((a, b) => {
    const posA = a.rankPosition || Number.MAX_SAFE_INTEGER
    const posB = b.rankPosition || Number.MAX_SAFE_INTEGER
    return posA - posB
  })

  for (const newCoaster of newCoasters) {
    const binarySearchPairs = generateBinarySearchPairsForCoaster(
      newCoaster,
      sortedExisting,
      completedComparisons
    )
    pairs.push(...binarySearchPairs)
  }

  return pairs
}

/**
 * Generate binary search pairs for a specific new coaster
 */
export const generateBinarySearchPairsForCoaster = (
  newCoaster: Coaster,
  sortedExistingCoasters: Coaster[],
  completedComparisons: Set<string>
): [Coaster, Coaster][] => {
  const pairs: [Coaster, Coaster][] = []

  // Use binary search strategy to find insertion point
  let left = 0
  let right = sortedExistingCoasters.length

  while (left < right && pairs.length < 3) {
    // Limit comparisons for efficiency
    const mid = Math.floor((left + right) / 2)
    const midCoaster = sortedExistingCoasters[mid]
    const comparisonKey = getComparisonKey(newCoaster, midCoaster)

    if (!completedComparisons.has(comparisonKey)) {
      pairs.push([newCoaster, midCoaster])
    }

    // For now, just add this comparison - the actual binary search logic
    // will be handled when the comparison result is processed
    break
  }

  return pairs
}

/**
 * Validate existing ranking and generate critical comparisons to verify consistency
 */
export const validateAndGenerateCriticalComparisons = (
  coasters: Coaster[],
  rankedCoasters: string[],
  completedComparisons: Set<string>
): [Coaster, Coaster][] => {
  const pairs: [Coaster, Coaster][] = []

  // Get ranked coaster objects
  const rankedCoasterObjects = rankedCoasters
    .map(id => coasters.find(c => c.id === id))
    .filter(c => c !== undefined) as Coaster[]

  if (rankedCoasterObjects.length < 2) {
    return pairs
  }

  // Validate adjacent rankings (spot check)
  for (let i = 0; i < Math.min(rankedCoasterObjects.length - 1, 3); i++) {
    const coaster1 = rankedCoasterObjects[i]
    const coaster2 = rankedCoasterObjects[i + 1]

    const comparisonKey = getComparisonKey(coaster1, coaster2)
    if (!completedComparisons.has(comparisonKey)) {
      pairs.push([coaster1, coaster2])
    }
  }

  return pairs
}
