import { Coaster } from '../types/data'

export type RankingMode = 'individual' | 'park' | 'model'

export const generateComparisons = (
  coasters: Coaster[],
  completedComparisons: Set<string>
): [Coaster, Coaster][] => {
  const pairs: [Coaster, Coaster][] = []
  const existingCoasters = coasters.filter(c => !c.isNewCoaster)
  const newCoasters = coasters.filter(c => c.isNewCoaster)

  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

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
 * Determine the best ranking mode automatically
 */
export const determineOptimalRankingMode = (
  coasters: Coaster[]
): RankingMode => {
  const hasNewCoasters = coasters.some(c => c.isNewCoaster)

  // If we have new coasters mixed with existing ones, always use individual ranking
  // for more precise integration
  if (hasNewCoasters) {
    return 'individual'
  }

  const parks = new Set(coasters.map(c => c.park))
  const manufacturerModels = new Set(
    coasters.map(c => `${c.manufacturer} ${c.model}`)
  )

  // If we have many coasters and distinct groups, try hierarchical approach
  if (coasters.length > 10) {
    if (parks.size >= 3 && parks.size <= coasters.length / 2) {
      return 'park'
    }
    if (
      manufacturerModels.size >= 3 &&
      manufacturerModels.size <= coasters.length / 2
    ) {
      return 'model'
    }
  }

  // Default to individual ranking
  return 'individual'
}

/**
 * Helper function to format country display
 */
export const formatCountry = (country?: string): string => {
  if (!country || country.trim() === '') {
    return ''
  }
  return ` (${country})`
}

/**
 * Create a consistent comparison key for two coasters
 */
export const getComparisonKey = (c1: Coaster, c2: Coaster): string => {
  return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
}

/**
 * Initialize position-based ranking for coasters using sequential insertion
 * This implements a true insertion sort approach where coasters are ranked one by one
 */
export const initializePositionalRanking = (
  coasters: Coaster[]
): { coasters: Coaster[]; rankedCoasters: string[] } => {
  // Separate already-ranked and new coasters
  // Coasters are considered "pre-ranked" if they have a rankPosition AND are NOT new coasters
  const preRankedCoasters = coasters.filter(
    c =>
      (c.isPreRanked && c.originalRankPosition !== undefined) ||
      (c.rankPosition !== undefined && !c.isNewCoaster)
  )
  const nonPreRankedCoasters = coasters.filter(
    c => (!c.isPreRanked && c.rankPosition === undefined) || c.isNewCoaster
  )

  let rankedCoasters: string[] = []
  let updatedCoasters: Coaster[] = []

  // Handle pre-ranked coasters first - they maintain their order
  if (preRankedCoasters.length > 0) {
    const sortedPreRanked = [...preRankedCoasters].sort((a, b) => {
      // Use rankPosition if available, otherwise originalRankPosition
      const posA = a.rankPosition ?? a.originalRankPosition ?? 0
      const posB = b.rankPosition ?? b.originalRankPosition ?? 0
      return posA - posB
    })

    rankedCoasters = sortedPreRanked.map(c => c.id)
    updatedCoasters = sortedPreRanked.map((coaster, index) => ({
      ...coaster,
      rankPosition: index + 1,
    }))
  }

  // For sequential insertion with fresh ranking: start with comparison between first two coasters
  if (nonPreRankedCoasters.length > 0) {
    if (rankedCoasters.length === 0) {
      // If no pre-ranked coasters and we have at least 2,
      // mark first two as needing initial comparison
      if (nonPreRankedCoasters.length >= 2) {
        // Don't rank any coasters yet - let the first comparison determine ranks 1 and 2
        const waitingCoasters = nonPreRankedCoasters.map(coaster => ({
          ...coaster,
          rankPosition: undefined, // Not yet ranked
          isCurrentlyRanking: false, // None are currently ranking yet
        }))

        updatedCoasters = waitingCoasters
        rankedCoasters = [] // Start with empty ranking
      } else if (nonPreRankedCoasters.length === 1) {
        // Only one coaster - it's automatically ranked first
        const onlyCoaster = nonPreRankedCoasters[0]
        rankedCoasters = [onlyCoaster.id]
        updatedCoasters = [
          {
            ...onlyCoaster,
            rankPosition: 1,
            isCurrentlyRanking: false,
          },
        ]
      }
    } else {
      // If we have pre-ranked coasters, start ranking the first new coaster against them
      const waitingCoasters = nonPreRankedCoasters.map((coaster, index) => ({
        ...coaster,
        rankPosition: undefined, // Not yet ranked
        isCurrentlyRanking: index === 0, // First waiting coaster is up next
      }))

      updatedCoasters.push(...waitingCoasters)
    }
  }

  return {
    coasters: updatedCoasters,
    rankedCoasters,
  }
}

/**
 * Update ranking positions after a comparison result for sequential insertion
 * This handles the binary search insertion process
 */
export const updateRankingPositions = (
  rankedCoasters: string[],
  winnerId: string,
  loserId: string
): string[] => {
  const newRanking = [...rankedCoasters]

  // Find current positions
  const winnerIndex = newRanking.indexOf(winnerId)
  const loserIndex = newRanking.indexOf(loserId)

  if (winnerIndex === -1 || loserIndex === -1) {
    return newRanking // Invalid IDs, return unchanged
  }

  // If winner is already ranked higher (lower index), no change needed
  if (winnerIndex < loserIndex) {
    return newRanking
  }

  // Move winner to just above loser
  // Remove winner from current position
  newRanking.splice(winnerIndex, 1)

  // Find new position of loser (it may have shifted due to removal)
  const newLoserIndex = newRanking.indexOf(loserId)

  // Insert winner just before loser
  newRanking.splice(newLoserIndex, 0, winnerId)

  return newRanking
}

/**
 * Insert a new coaster into the ranking at the correct position
 * This is used for sequential insertion when a coaster has completed all necessary comparisons
 */
export const insertCoasterIntoRanking = (
  rankedCoasters: string[],
  newCoasterId: string,
  insertPosition: number
): string[] => {
  const newRanking = [...rankedCoasters]

  // Ensure position is within bounds
  const actualPosition = Math.max(
    0,
    Math.min(insertPosition, newRanking.length)
  )

  // Insert the new coaster at the specified position
  newRanking.splice(actualPosition, 0, newCoasterId)

  return newRanking
}

/**
 * Calculate the insertion position for a new coaster using binary search
 * This will be used with real-time comparison results during ranking
 */
export const calculateInsertionPosition = (
  newCoaster: Coaster,
  rankedCoasters: Coaster[],
  comparisonResults: Map<string, string>
): number => {
  if (rankedCoasters.length === 0) {
    return 0 // First position
  }

  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

  // Binary search to find the correct insertion position
  let left = 0
  let right = rankedCoasters.length

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    const midCoaster = rankedCoasters[mid]
    const comparisonKey = getComparisonKey(newCoaster, midCoaster)
    const winner = comparisonResults.get(comparisonKey)

    if (winner === newCoaster.id) {
      // New coaster beat the mid coaster, insert in upper half
      right = mid
    } else if (winner === midCoaster.id) {
      // Mid coaster beat new coaster, insert in lower half
      left = mid + 1
    } else {
      // No comparison result yet - we need this comparison
      return -1 // Signal that we need more comparisons
    }
  }

  return left
}

/**
 * Determine if a coaster has enough comparison results to be inserted
 * For binary search, we need specific comparisons to determine position
 */
export const isCoasterReadyForInsertion = (
  newCoaster: Coaster,
  rankedCoasters: Coaster[],
  comparisonResults: Map<string, string>
): boolean => {
  if (rankedCoasters.length === 0) {
    return true // First coaster is always ready
  }

  // Try to calculate insertion position - if it returns -1, we need more comparisons
  const insertionPosition = calculateInsertionPosition(
    newCoaster,
    rankedCoasters,
    comparisonResults
  )
  return insertionPosition !== -1
}

/**
 * Get coasters with updated rank positions based on current ranking order
 */
export const getCoastersWithPositions = (
  coasters: Coaster[],
  rankedCoasters: string[]
): Coaster[] => {
  return coasters.map(coaster => {
    const position = rankedCoasters.indexOf(coaster.id) + 1
    return {
      ...coaster, // Preserve ALL existing properties including isCurrentlyRanking
      rankPosition: position > 0 ? position : coaster.rankPosition, // Only update rankPosition if coaster is in ranking
    }
  })
}

/**
 * Generate comparisons for position-based ranking using sequential insertion
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
      pairs.push([unrankedCoasters[0], unrankedCoasters[1]])
      return pairs
    }
  }

  // Find the coaster that is currently being ranked
  const currentRankingCoaster = coasters.find(c => c.isCurrentlyRanking)

  if (!currentRankingCoaster) {
    // No coaster is currently being ranked, check if we need to start ranking the next one
    const unrankedCoasters = coasters.filter(
      c =>
        !c.isPreRanked &&
        !rankedCoasters.includes(c.id) &&
        c.rankPosition === undefined
    )

    if (unrankedCoasters.length === 0) {
      return pairs // All coasters are ranked
    }

    // If we have ranked coasters but no one is currently ranking,
    // this means we need to start ranking the next coaster
    // This will be handled by the ranking component by updating the coaster states
    return pairs
  }

  // Get already ranked coasters in order
  const alreadyRanked = rankedCoasters
    .map(id => coasters.find(c => c.id === id))
    .filter(c => c !== undefined) as Coaster[]

  if (alreadyRanked.length === 0) {
    // This shouldn't happen with proper initialization, but handle it gracefully
    return pairs
  }

  // Generate binary search comparisons for the current coaster
  const nextTarget = getNextBinarySearchTarget(
    currentRankingCoaster,
    alreadyRanked,
    comparisonResults || new Map()
  )

  // Helper function to create comparison key
  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

  if (nextTarget) {
    const comparisonKey = getComparisonKey(currentRankingCoaster, nextTarget)
    if (!completedComparisons.has(comparisonKey)) {
      pairs.push([currentRankingCoaster, nextTarget])
    }
  }

  return pairs
}

/**
 * Get binary search targets for inserting a coaster into an existing ranking
 */
/**
 * Get the next comparison target for binary search insertion
 * This implements true binary search by simulating the algorithm and finding the next needed comparison
 */
export const getNextBinarySearchTarget = (
  newCoaster: Coaster,
  rankedCoasters: Coaster[],
  comparisonResults: Map<string, string>
): Coaster | null => {
  if (rankedCoasters.length === 0) {
    return null
  }

  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

  // Simulate binary search to find the next comparison needed
  let left = 0
  let right = rankedCoasters.length

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    const midCoaster = rankedCoasters[mid]
    const comparisonKey = getComparisonKey(newCoaster, midCoaster)
    const winner = comparisonResults.get(comparisonKey)

    if (winner === undefined) {
      // This is the comparison we need!
      return midCoaster
    }

    if (winner === newCoaster.id) {
      // New coaster beat the mid coaster, search upper half
      right = mid
    } else {
      // Mid coaster beat new coaster, search lower half
      left = mid + 1
    }
  }

  // All needed comparisons have been completed
  return null
}

export const getBinarySearchTargetsForInsertion = (
  newCoaster: Coaster,
  rankedCoasters: Coaster[],
  completedComparisons: Set<string>
): Coaster[] => {
  const targets: Coaster[] = []

  if (rankedCoasters.length === 0) {
    return targets
  }

  // Helper function to create comparison key
  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

  if (rankedCoasters.length === 1) {
    // Only one ranked coaster, compare against it
    const onlyCoaster = rankedCoasters[0]
    const comparisonKey = getComparisonKey(newCoaster, onlyCoaster)
    if (!completedComparisons.has(comparisonKey)) {
      targets.push(onlyCoaster)
    }
  } else {
    // Find all remaining targets and pick strategically
    const remainingTargets = rankedCoasters.filter(coaster => {
      const comparisonKey = getComparisonKey(newCoaster, coaster)
      return !completedComparisons.has(comparisonKey)
    })

    if (remainingTargets.length > 0) {
      // Return only the single next target needed for binary search
      if (remainingTargets.length === 1) {
        targets.push(remainingTargets[0])
      } else {
        // Pick the middle target for binary search - DO NOT add multiple targets
        const middleIndex = Math.floor(remainingTargets.length / 2)
        targets.push(remainingTargets[middleIndex])
      }
    }
  }

  return targets
}
/**
 * Get strategic comparison targets for a new coaster using improved binary search approach
 * This generates a sequence that works well with the position-based ranking system
 */
export const getStrategicComparisonTargets = (
  newCoaster: Coaster,
  existingCoasters: Coaster[],
  rankedCoasters: string[],
  completedComparisons: Set<string>
): Coaster[] => {
  const targets: Coaster[] = []

  // Find existing coasters sorted by their current rank position
  const sortedExisting = existingCoasters
    .filter(c => rankedCoasters.includes(c.id))
    .sort((a, b) => {
      const posA = rankedCoasters.indexOf(a.id)
      const posB = rankedCoasters.indexOf(b.id)
      return posA - posB
    })

  if (sortedExisting.length === 0) {
    return targets
  }

  // Helper function to create comparison key
  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

  // For binary search insertion to work properly with position updates,
  // we need to provide comparisons in a specific order that allows the
  // position update logic to gradually converge on the correct position

  // Count how many comparisons we've already done
  const completedCount = sortedExisting.filter(coaster => {
    const comparisonKey = getComparisonKey(newCoaster, coaster)
    return completedComparisons.has(comparisonKey)
  }).length

  // Use a more conservative approach: provide comparisons that help
  // establish the position through iterative refinement
  const n = sortedExisting.length
  const availableCoasters = sortedExisting.filter(coaster => {
    const comparisonKey = getComparisonKey(newCoaster, coaster)
    return !completedComparisons.has(comparisonKey)
  })

  if (availableCoasters.length === 0) {
    return targets
  }

  // For the first few comparisons, establish rough boundaries
  if (completedCount === 0) {
    // Start with a coaster from the middle-upper range
    const targetIndex = Math.floor(n * 0.4) // Around rank 40% from top
    const targetCoaster = sortedExisting[targetIndex]
    if (targetCoaster && availableCoasters.includes(targetCoaster)) {
      targets.push(targetCoaster)
    }
  } else if (completedCount === 1) {
    // Second comparison: try the top coaster to establish upper bound
    const topCoaster = sortedExisting[0]
    if (topCoaster && availableCoasters.includes(topCoaster)) {
      targets.push(topCoaster)
    }
  } else if (completedCount === 2) {
    // Third comparison: try a middle position
    const midIndex = Math.floor(n * 0.6)
    const midCoaster = sortedExisting[midIndex]
    if (midCoaster && availableCoasters.includes(midCoaster)) {
      targets.push(midCoaster)
    }
  } else {
    // For subsequent comparisons, fill in the gaps systematically
    // Target coasters that help narrow down the exact position
    const step = Math.max(1, Math.floor(availableCoasters.length / 3))
    for (let i = 0; i < Math.min(2, availableCoasters.length); i += step) {
      targets.push(availableCoasters[i])
    }
  }

  return targets
}

/**
 * Generate binary search comparisons for new coasters against existing ranked coasters
 * This dramatically reduces the number of comparisons needed by using a binary search approach
 */
export const generateBinarySearchComparisons = (
  coasters: Coaster[],
  completedComparisons: Set<string>
): [Coaster, Coaster][] => {
  const existingCoasters = coasters.filter(c => !c.isNewCoaster)
  const newCoasters = coasters.filter(c => c.isNewCoaster && !c.isPreRanked)

  if (existingCoasters.length === 0 || newCoasters.length === 0) {
    return []
  }

  // Sort existing coasters by position (lowest to highest)
  const sortedExisting = [...existingCoasters].sort((a, b) => {
    const posA = a.rankPosition || Number.MAX_SAFE_INTEGER
    const posB = b.rankPosition || Number.MAX_SAFE_INTEGER
    return posA - posB
  })

  const pairs: [Coaster, Coaster][] = []

  // For each new coaster, generate binary search comparisons
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
 * Generate binary search comparison pairs for a single new coaster
 */
export const generateBinarySearchPairsForCoaster = (
  newCoaster: Coaster,
  sortedExistingCoasters: Coaster[],
  completedComparisons: Set<string>
): [Coaster, Coaster][] => {
  const pairs: [Coaster, Coaster][] = []

  if (sortedExistingCoasters.length === 0) {
    return pairs
  }

  // Helper function to create comparison key
  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

  // Start with the middle coaster
  const middleIndex = Math.floor(sortedExistingCoasters.length / 2)
  const middleCoaster = sortedExistingCoasters[middleIndex]

  const comparisonKey = getComparisonKey(newCoaster, middleCoaster)
  if (!completedComparisons.has(comparisonKey)) {
    pairs.push([newCoaster, middleCoaster])
  }

  return pairs
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

  // Helper function to create comparison key
  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

  // Calculate how many comparisons this coaster has had
  const totalComparisons = sortedExistingCoasters.filter(existingCoaster => {
    const comparisonKey = getComparisonKey(newCoaster, existingCoaster)
    return completedComparisons.has(comparisonKey)
  }).length

  // Ensure minimum comparisons for accurate ranking
  const minComparisons = Math.min(
    Math.ceil(Math.log2(sortedExistingCoasters.length + 1)) + 1,
    Math.max(3, Math.ceil(sortedExistingCoasters.length / 3))
  )

  let nextIndex: number

  if (newCoasterWon) {
    // New coaster is better, so compare with a higher-ranked coaster (lower index)
    if (lastIndex === 0) {
      // At the top - if we haven't had enough comparisons, try some more strategic ones
      if (totalComparisons < minComparisons) {
        // Compare with some mid-tier coasters to establish position
        const midIndex = Math.floor(sortedExistingCoasters.length / 2)
        nextIndex = Math.min(
          midIndex,
          lastIndex + Math.floor(sortedExistingCoasters.length / 4)
        )
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
  // Helper function to create comparison key
  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

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
