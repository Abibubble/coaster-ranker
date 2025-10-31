import { Coaster } from '../types/data'

export type RankingMode = 'individual' | 'park' | 'model'

/**
 * Generate comparisons intelligently - only new/incomplete comparisons needed
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

  // If we have existing rankings, only generate specific comparisons
  if (existingCoasters.length > 0 && newCoasters.length > 0) {
    // 1. New coasters vs each other
    for (let i = 0; i < newCoasters.length - 1; i++) {
      for (let j = i + 1; j < newCoasters.length; j++) {
        const comparisonKey = getComparisonKey(newCoasters[i], newCoasters[j])
        if (!completedComparisons.has(comparisonKey)) {
          pairs.push([newCoasters[i], newCoasters[j]])
        }
      }
    }

    // 2. New coasters vs existing coasters
    for (const newCoaster of newCoasters) {
      for (const existingCoaster of existingCoasters) {
        const comparisonKey = getComparisonKey(newCoaster, existingCoaster)
        if (!completedComparisons.has(comparisonKey)) {
          pairs.push([newCoaster, existingCoaster])
        }
      }
    }
  } else {
    // Full ranking - compare all coasters, excluding completed comparisons
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
