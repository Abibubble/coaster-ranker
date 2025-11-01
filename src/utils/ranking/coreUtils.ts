import { Coaster } from '../../types/data'

export type RankingMode = 'individual' | 'park' | 'model'

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
  const newCoasters = coasters.filter(
    c => c.isNewCoaster || (!c.isPreRanked && c.rankPosition === undefined)
  )

  // Sort pre-ranked coasters by their position
  const sortedPreRanked = preRankedCoasters.sort((a, b) => {
    const posA = a.originalRankPosition || a.rankPosition || 0
    const posB = b.originalRankPosition || b.rankPosition || 0
    return posA - posB
  })

  // Create initial ranking array with pre-ranked coasters
  const initialRanking = sortedPreRanked.map(c => c.id)

  // Mark the first new coaster as currently ranking (if any)
  const coastersWithStatus = coasters.map(coaster => {
    if (newCoasters.includes(coaster) && newCoasters[0] === coaster) {
      return { ...coaster, isCurrentlyRanking: true }
    }
    return { ...coaster, isCurrentlyRanking: false }
  })

  return {
    coasters: coastersWithStatus,
    rankedCoasters: initialRanking,
  }
}

/**
 * Determine the optimal ranking mode based on coaster characteristics
 */
export const determineOptimalRankingMode = (
  coasters: Coaster[]
): RankingMode => {
  if (coasters.length === 0) return 'individual'

  // Group by park
  const parkGroups = new Map<string, Coaster[]>()
  coasters.forEach(coaster => {
    const park = coaster.park
    if (!parkGroups.has(park)) {
      parkGroups.set(park, [])
    }
    parkGroups.get(park)!.push(coaster)
  })

  // Group by model
  const modelGroups = new Map<string, Coaster[]>()
  coasters.forEach(coaster => {
    const model = coaster.model
    if (!modelGroups.has(model)) {
      modelGroups.set(model, [])
    }
    modelGroups.get(model)!.push(coaster)
  })

  const avgParkSize = coasters.length / parkGroups.size
  const avgModelSize = coasters.length / modelGroups.size

  // If many coasters per park and reasonable number of parks, suggest park mode
  if (parkGroups.size >= 3 && parkGroups.size <= 10 && avgParkSize >= 4) {
    return 'park'
  }

  // If many coasters per model and reasonable number of models, suggest model mode
  if (modelGroups.size >= 3 && modelGroups.size <= 15 && avgModelSize >= 3) {
    return 'model'
  }

  // Default to individual ranking
  return 'individual'
}
