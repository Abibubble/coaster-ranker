import { Coaster } from '../types/data'

export type RankingMode = 'individual' | 'park' | 'model'

/**
 * Generate comparisons intelligently - using binary search for new coasters when possible
 */
export const generateComparisons = (
  coasters: Coaster[],
  completedComparisons: Set<string>
): [Coaster, Coaster][] => {
  const pairs: [Coaster, Coaster][] = []
  const existingCoasters = coasters.filter(c => !c.isNewCoaster)
  const newCoasters = coasters.filter(c => c.isNewCoaster)

  // Helper function to create comparison key (ensure consistent ordering)
  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

  // Helper function to check if two coasters are both pre-ranked
  const areBothPreRanked = (c1: Coaster, c2: Coaster) => {
    return c1.isPreRanked && c2.isPreRanked
  }

  // If we have existing rankings, use optimized approach
  if (existingCoasters.length > 0 && newCoasters.length > 0) {
    // Check if existing coasters are already ranked (have wins)
    const hasExistingRankings = existingCoasters.some(c => (c.wins || 0) > 0)

    if (hasExistingRankings && existingCoasters.length >= 3) {
      // Use binary search approach for new non-pre-ranked coasters
      const binarySearchPairs = generateBinarySearchComparisons(
        coasters,
        completedComparisons
      )
      pairs.push(...binarySearchPairs)

      // Ensure minimum comparisons for accurate ranking by adding strategic traditional comparisons
      for (const newCoaster of newCoasters.filter(c => !c.isPreRanked)) {
        const existingComparisons = existingCoasters.filter(existingCoaster => {
          const comparisonKey = getComparisonKey(newCoaster, existingCoaster)
          return completedComparisons.has(comparisonKey)
        }).length

        // If a new coaster has too few comparisons, add some strategic ones
        const minComparisons = Math.min(
          5,
          Math.ceil(existingCoasters.length / 2)
        )
        if (existingComparisons < minComparisons) {
          // Add comparisons with bottom-tier and top-tier coasters for better positioning
          const sortedExisting = [...existingCoasters].sort((a, b) => {
            const winsA = a.wins || 0
            const winsB = b.wins || 0
            return winsB - winsA
          })

          // Add comparison with worst-performing coaster
          const worstCoaster = sortedExisting[sortedExisting.length - 1]
          const worstComparisonKey = getComparisonKey(newCoaster, worstCoaster)
          if (!completedComparisons.has(worstComparisonKey)) {
            pairs.push([newCoaster, worstCoaster])
          }

          // Add comparison with best-performing coaster if needed
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
      // Fall back to traditional approach for smaller lists or unranked existing coasters
      // New coasters vs existing coasters
      for (const newCoaster of newCoasters) {
        for (const existingCoaster of existingCoasters) {
          const comparisonKey = getComparisonKey(newCoaster, existingCoaster)
          if (!completedComparisons.has(comparisonKey)) {
            pairs.push([newCoaster, existingCoaster])
          }
        }
      }
    }

    // Always handle new coasters vs each other (but skip if both are pre-ranked)
    for (let i = 0; i < newCoasters.length - 1; i++) {
      for (let j = i + 1; j < newCoasters.length; j++) {
        const coaster1 = newCoasters[i]
        const coaster2 = newCoasters[j]

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
 * Initialize position-based ranking for coasters
 * Sets up initial ranking positions for all coasters
 */
export const initializePositionalRanking = (
  coasters: Coaster[]
): { coasters: Coaster[]; rankedCoasters: string[] } => {
  // Separate pre-ranked and new coasters
  const preRankedCoasters = coasters.filter(
    c => c.isPreRanked && c.originalRankPosition !== undefined
  )
  const nonPreRankedCoasters = coasters.filter(c => !c.isPreRanked)

  let rankedCoasters: string[] = []
  let updatedCoasters: Coaster[] = []

  // Handle pre-ranked coasters first - they maintain their order
  if (preRankedCoasters.length > 0) {
    const sortedPreRanked = [...preRankedCoasters].sort((a, b) => {
      const posA = a.originalRankPosition ?? 0
      const posB = b.originalRankPosition ?? 0
      return posA - posB
    })

    rankedCoasters = sortedPreRanked.map(c => c.id)
    updatedCoasters = sortedPreRanked.map((coaster, index) => ({
      ...coaster,
      rankPosition: index + 1,
    }))
  }

  // Add non-pre-ranked coasters at the end in random order (they'll be ranked through comparisons)
  const nonPreRankedWithPositions = nonPreRankedCoasters.map(
    (coaster, index) => ({
      ...coaster,
      rankPosition: rankedCoasters.length + index + 1,
    })
  )

  updatedCoasters.push(...nonPreRankedWithPositions)
  rankedCoasters.push(...nonPreRankedCoasters.map(c => c.id))

  return {
    coasters: updatedCoasters,
    rankedCoasters,
  }
}

/**
 * Update ranking positions after a comparison result
 * When winner beats loser, winner moves above loser in the ranking
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
 * Get coasters with updated rank positions based on current ranking order
 */
export const getCoastersWithPositions = (
  coasters: Coaster[],
  rankedCoasters: string[]
): Coaster[] => {
  return coasters.map(coaster => {
    const position = rankedCoasters.indexOf(coaster.id) + 1
    return {
      ...coaster,
      rankPosition: position > 0 ? position : coasters.length, // Fallback position
    }
  })
}

/**
 * Generate comparisons for position-based ranking
 * Focuses on establishing relative positions rather than win counts
 */
export const generatePositionalComparisons = (
  coasters: Coaster[],
  rankedCoasters: string[],
  completedComparisons: Set<string>
): [Coaster, Coaster][] => {
  const pairs: [Coaster, Coaster][] = []
  const newCoasters = coasters.filter(c => c.isNewCoaster && !c.isPreRanked)
  const existingCoasters = coasters.filter(
    c => !c.isNewCoaster || c.isPreRanked
  )

  // Helper function to create comparison key
  const getComparisonKey = (c1: Coaster, c2: Coaster) => {
    return c1.id < c2.id ? `${c1.id}-${c2.id}` : `${c2.id}-${c1.id}`
  }

  if (existingCoasters.length > 0 && newCoasters.length > 0) {
    // Use strategic comparisons for new coasters
    for (const newCoaster of newCoasters) {
      // Get strategic comparison targets based on current position
      const targets = getStrategicComparisonTargets(
        newCoaster,
        existingCoasters,
        rankedCoasters,
        completedComparisons
      )

      for (const target of targets) {
        const comparisonKey = getComparisonKey(newCoaster, target)
        if (!completedComparisons.has(comparisonKey)) {
          pairs.push([newCoaster, target])
        }
      }
    }

    // Handle new coasters vs each other
    for (let i = 0; i < newCoasters.length - 1; i++) {
      for (let j = i + 1; j < newCoasters.length; j++) {
        const comparisonKey = getComparisonKey(newCoasters[i], newCoasters[j])
        if (!completedComparisons.has(comparisonKey)) {
          pairs.push([newCoasters[i], newCoasters[j]])
        }
      }
    }
  } else {
    // Full ranking - compare all pairs
    for (let i = 0; i < coasters.length - 1; i++) {
      for (let j = i + 1; j < coasters.length; j++) {
        const comparisonKey = getComparisonKey(coasters[i], coasters[j])
        if (!completedComparisons.has(comparisonKey)) {
          pairs.push([coasters[i], coasters[j]])
        }
      }
    }
  }

  return pairs
}

/**
 * Get strategic comparison targets for a new coaster using binary search approach
 */
export const getStrategicComparisonTargets = (
  _newCoaster: Coaster,
  existingCoasters: Coaster[],
  rankedCoasters: string[],
  _completedComparisons: Set<string>
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

  // Start with middle coaster for binary search approach
  const middleIndex = Math.floor(sortedExisting.length / 2)
  const middleCoaster = sortedExisting[middleIndex]

  if (middleCoaster) {
    targets.push(middleCoaster)
  }

  // Add strategic additional targets for better positioning
  if (sortedExisting.length >= 3) {
    // Add best and worst for bounds checking
    const bestCoaster = sortedExisting[0]
    const worstCoaster = sortedExisting[sortedExisting.length - 1]

    if (bestCoaster && bestCoaster.id !== middleCoaster?.id) {
      targets.push(bestCoaster)
    }
    if (worstCoaster && worstCoaster.id !== middleCoaster?.id) {
      targets.push(worstCoaster)
    }
  }

  return targets
}

/**
 * Initialize wins for pre-ranked coasters based on their original positions
 * This ensures pre-ranked coasters maintain their relative order without comparisons
 */
export const initializePreRankedWins = (coasters: Coaster[]): Coaster[] => {
  // Get pre-ranked coasters only
  const preRankedCoasters = coasters.filter(
    c => c.isPreRanked && c.originalRankPosition !== undefined
  )

  if (preRankedCoasters.length === 0) {
    return coasters
  }

  // Sort pre-ranked coasters by their original position to determine relative wins
  const sortedPreRanked = [...preRankedCoasters].sort((a, b) => {
    const posA = a.originalRankPosition ?? 0
    const posB = b.originalRankPosition ?? 0
    return posA - posB
  })

  // Calculate wins based on total coaster count for better scaling
  // Use the total number of coasters to ensure pre-ranked wins are significant
  const totalCoasters = coasters.length
  const baseWins = Math.max(10, totalCoasters) // Minimum of 10, or total count if larger

  const updatedCoasters = coasters.map(coaster => {
    if (coaster.isPreRanked && coaster.originalRankPosition !== undefined) {
      // Calculate wins: better position (lower number) = more wins
      // Give significant win advantage to maintain position against new comparisons
      const positionFromBottom =
        sortedPreRanked.length - 1 - coaster.originalRankPosition
      const winsFromPosition = baseWins + positionFromBottom * 2
      return {
        ...coaster,
        wins: (coaster.wins || 0) + winsFromPosition,
      }
    }
    return coaster
  })

  return updatedCoasters
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

  // Sort existing coasters by wins (highest to lowest)
  const sortedExisting = [...existingCoasters].sort((a, b) => {
    const winsA = a.wins || 0
    const winsB = b.wins || 0
    return winsB - winsA
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
