import { Coaster, UploadedData } from '../../types/data'
import { detectDuplicates, DuplicateMatch } from './duplicateDetection'
import type { DuplicateResolution } from '../../components/DuplicateResolver'
import { combineCoasterData } from './combineCoasterData'

export interface HandleDuplicateDetectionParams {
  newCoasters: Coaster[]
  existingData: UploadedData | null
  filename: string
}

export interface HandleDuplicateDetectionResult {
  hasDuplicates: boolean
  duplicates: DuplicateMatch[]
  // If no duplicates, return combined data immediately
  combinedData?: UploadedData
  newCoasterCount?: number
  totalCount?: number
}

export interface ProcessDuplicateResolutionParams {
  resolutions: DuplicateResolution[]
  duplicates: DuplicateMatch[]
  pendingCoasters: Coaster[]
  existingData: UploadedData | null
  filename: string
  isPreRanked: boolean
}

export interface ProcessDuplicateResolutionResult {
  combinedData: UploadedData
  addedCount: number
  totalCount: number
}

/**
 * Handle duplicate detection for new coasters against existing data
 * Returns either the combined data (if no duplicates) or duplicate information for resolution
 */
export function handleDuplicateDetection(
  params: HandleDuplicateDetectionParams
): HandleDuplicateDetectionResult {
  const { newCoasters, existingData, filename } = params

  const existingCoasters = existingData?.coasters || []

  if (existingCoasters.length === 0) {
    // No existing data, no duplicates possible
    const result = combineCoasterData({
      newCoasters,
      filename,
      existingData,
      isPreRanked: false, // This will be determined later in the flow
    })

    return {
      hasDuplicates: false,
      duplicates: [],
      combinedData: result.combinedData,
      newCoasterCount: result.newCoasterCount,
      totalCount: result.totalCount,
    }
  }

  const detectedDuplicates = detectDuplicates(existingCoasters, newCoasters)

  if (detectedDuplicates.duplicates.length === 0) {
    // No duplicates found, combine data immediately
    const result = combineCoasterData({
      newCoasters,
      filename,
      existingData,
      isPreRanked: false, // This will be determined later in the flow
    })

    return {
      hasDuplicates: false,
      duplicates: [],
      combinedData: result.combinedData,
      newCoasterCount: result.newCoasterCount,
      totalCount: result.totalCount,
    }
  }

  return {
    hasDuplicates: true,
    duplicates: detectedDuplicates.duplicates,
  }
}

/**
 * Process duplicate resolutions and combine data accordingly
 * Handles the logic for keeping existing, keeping new, or keeping both coasters
 */
export function processDuplicateResolution(
  params: ProcessDuplicateResolutionParams
): ProcessDuplicateResolutionResult {
  const {
    resolutions,
    duplicates,
    pendingCoasters,
    existingData,
    filename,
    isPreRanked,
  } = params

  const existingCoasters = existingData?.coasters || []
  let updatedExistingCoasters = [...existingCoasters]
  let coastersToAdd: Coaster[] = []

  // Build a set of coasters to process
  const coastersToProcess = new Set(pendingCoasters)

  // Process each resolution
  resolutions.forEach((resolution, index) => {
    const duplicate = duplicates[index]

    switch (resolution.action) {
      case 'keep-existing':
        // Remove the new coaster from processing
        coastersToProcess.delete(duplicate.newCoaster)
        break

      case 'keep-new':
        // Remove existing coaster and mark new one for addition
        updatedExistingCoasters = updatedExistingCoasters.filter(
          c => c.id !== duplicate.existingCoaster.id
        )
        if (coastersToProcess.has(duplicate.newCoaster)) {
          coastersToAdd.push(duplicate.newCoaster)
          coastersToProcess.delete(duplicate.newCoaster)
        }
        break

      case 'keep-both':
        // Mark new coaster for addition (existing stays)
        if (coastersToProcess.has(duplicate.newCoaster)) {
          coastersToAdd.push(duplicate.newCoaster)
          coastersToProcess.delete(duplicate.newCoaster)
        }
        break
    }
  })

  // Add any remaining coasters that weren't involved in duplicates
  coastersToAdd.push(...Array.from(coastersToProcess))

  // Create updated existing data structure
  const updatedExistingData: UploadedData | null = existingData
    ? {
        ...existingData,
        coasters: updatedExistingCoasters,
        rankingMetadata: {
          completedComparisons:
            existingData.rankingMetadata?.completedComparisons ||
            new Set<string>(),
          rankedCoasters:
            existingData.rankingMetadata?.rankedCoasters?.filter(id =>
              updatedExistingCoasters.some(c => c.id === id)
            ) || updatedExistingCoasters.map(c => c.id),
          isRanked: existingData.rankingMetadata?.isRanked || false,
          hasPreRankedCoasters:
            existingData.rankingMetadata?.hasPreRankedCoasters || false,
          preRankedGroups: existingData.rankingMetadata?.preRankedGroups || [],
        },
      }
    : null

  // Combine the final data
  const result = combineCoasterData({
    newCoasters: coastersToAdd,
    filename,
    existingData: updatedExistingData,
    isPreRanked,
  })

  return {
    combinedData: result.combinedData,
    addedCount: result.newCoasterCount,
    totalCount: result.totalCount,
  }
}
