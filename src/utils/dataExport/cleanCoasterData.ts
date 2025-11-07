import { Coaster, UploadedData } from '../../types/data'

export interface CoasterWithRank
  extends Omit<Partial<Coaster>, 'rankPosition' | 'id'> {
  rank?: number // The exported rank position (1 = best) - first field
  name: string
  park: string
  country: string
  manufacturer: string
  model?: string
  material?: string
  thrillLevel?: string
}

/**
 * Removes obsolete fields from coaster data to ensure clean exports
 * This helps maintain data consistency and removes legacy fields
 * Excludes the id field for privacy and cleaner exports
 */
export function cleanCoasterData(coasters: Coaster[]): Partial<Coaster>[] {
  return coasters.map(coaster => {
    // Create a new object with only the valid Coaster fields (excluding id)
    const cleanCoaster: Partial<Coaster> = {
      name: coaster.name,
      park: coaster.park,
      country: coaster.country,
      manufacturer: coaster.manufacturer,
      model: coaster.model,
      material: coaster.material,
      thrillLevel: coaster.thrillLevel,
    }

    // Add optional fields if they exist (excluding id-related fields)
    if (coaster.isCurrentlyRanking !== undefined) {
      cleanCoaster.isCurrentlyRanking = coaster.isCurrentlyRanking
    }
    if (coaster.isNewCoaster !== undefined) {
      cleanCoaster.isNewCoaster = coaster.isNewCoaster
    }
    if (coaster.isPreRanked !== undefined) {
      cleanCoaster.isPreRanked = coaster.isPreRanked
    }
    if (coaster.originalRankPosition !== undefined) {
      cleanCoaster.originalRankPosition = coaster.originalRankPosition
    }
    if (coaster.rankPosition !== undefined) {
      cleanCoaster.rankPosition = coaster.rankPosition
    }

    // Note: This removes obsolete fields like 'location', 'id' and other legacy properties

    return cleanCoaster
  })
}

/**
 * Removes ranking-specific fields for export (keeps only core coaster data)
 * Useful for exporting clean coaster data without ranking metadata
 */
export function cleanCoasterDataForExport(
  coasters: Coaster[]
): Partial<Coaster>[] {
  return coasters.map(coaster => ({
    name: coaster.name,
    park: coaster.park,
    country: coaster.country,
    manufacturer: coaster.manufacturer,
    model: coaster.model,
    material: coaster.material,
    thrillLevel: coaster.thrillLevel,
  }))
}

/**
 * Adds ranking information to coaster data for export
 * Converts rankPosition to a user-friendly 'rank' field
 * If rankPosition is not available, uses ranking metadata to determine position
 */
export function addRankingToCoasterData(
  coasters: Coaster[],
  rankingMetadata?: { rankedCoasters?: string[]; isRanked?: boolean }
): CoasterWithRank[] {
  return coasters.map(coaster => {
    // Get base coaster data with rank first
    const baseCoaster: CoasterWithRank = {
      name: coaster.name,
      park: coaster.park,
      country: coaster.country,
      manufacturer: coaster.manufacturer,
      model: coaster.model,
      material: coaster.material,
      thrillLevel: coaster.thrillLevel,
    }

    // Add rank if the coaster has been ranked
    if (coaster.rankPosition !== undefined && coaster.rankPosition > 0) {
      baseCoaster.rank = coaster.rankPosition
    } else if (rankingMetadata?.isRanked && rankingMetadata?.rankedCoasters) {
      // Use ranking metadata if individual rankPosition is not available
      const position = rankingMetadata.rankedCoasters.indexOf(coaster.id)
      if (position >= 0) {
        baseCoaster.rank = position + 1 // Convert 0-based index to 1-based rank
      }
    }

    // Reorder to put rank first if it exists
    if (baseCoaster.rank !== undefined) {
      const { rank, ...rest } = baseCoaster
      return { rank, ...rest }
    }

    return baseCoaster
  })
}

/**
 * Check if uploaded data has ranking information available for export
 */
export function hasRankingDataForExport(
  uploadedData: UploadedData | null
): boolean {
  if (!uploadedData) {
    return false
  }

  // Check if any coasters have ranking positions
  const hasCoasterRankings = uploadedData.coasters.some(
    c => c.rankPosition !== undefined && c.rankPosition > 0
  )

  // Check if ranking metadata exists and indicates completion
  const hasRankingMetadata = uploadedData.rankingMetadata?.isRanked === true

  return hasCoasterRankings || hasRankingMetadata
}
