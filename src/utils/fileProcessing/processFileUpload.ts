import { Coaster, UploadedData } from '../../types/data'
import { processUploadedFile } from './fileParser'
import {
  handleDuplicateDetection,
  processDuplicateResolution,
} from './handleDuplicateDetection'
import { combineCoasterData } from './combineCoasterData'
import { DuplicateMatch } from './duplicateDetection'
import type { DuplicateResolution } from '../../components/DuplicateResolver'

export interface ProcessFileUploadParams {
  fileContent: string
  filename: string
  existingData: UploadedData | null
}

export interface ProcessFileUploadResult {
  success: boolean
  needsPreRankingDecision: boolean
  needsDuplicateResolution: boolean
  parsedCoasters?: Coaster[]
  duplicates?: DuplicateMatch[]
  combinedData?: UploadedData
  newCoasterCount?: number
  totalCount?: number
  error?: string
}

export interface HandlePreRankingDecisionParams {
  coasters: Coaster[]
  filename: string
  existingData: UploadedData | null
  isPreRanked: boolean
}

export interface HandlePreRankingDecisionResult {
  needsDuplicateResolution: boolean
  duplicates?: DuplicateMatch[]
  combinedData?: UploadedData
  newCoasterCount?: number
  totalCount?: number
}

export interface HandleDuplicateResolutionParams {
  resolutions: DuplicateResolution[]
  duplicates: DuplicateMatch[]
  pendingCoasters: Coaster[]
  existingData: UploadedData | null
  filename: string
  isPreRanked: boolean
}

export interface HandleDuplicateResolutionResult {
  combinedData: UploadedData
  addedCount: number
  totalCount: number
}

/**
 * Process a file upload (CSV, JSON, etc.) and determine what actions are needed
 * This is the main entry point for file upload processing
 */
export async function processFileUpload(
  params: ProcessFileUploadParams
): Promise<ProcessFileUploadResult> {
  const { fileContent, filename, existingData } = params

  try {
    // Parse the file content
    const fakeFile = new File([fileContent], filename, {
      type: filename.toLowerCase().endsWith('.json')
        ? 'application/json'
        : 'text/csv',
    })

    const parseResult = await processUploadedFile(fakeFile, fileContent)

    // Single coaster uploads don't need pre-ranking decision
    if (parseResult.coasters.length === 1) {
      const duplicateResult = handleDuplicateDetection({
        newCoasters: parseResult.coasters,
        existingData,
        filename: parseResult.filename,
      })

      if (duplicateResult.hasDuplicates) {
        return {
          success: true,
          needsPreRankingDecision: false,
          needsDuplicateResolution: true,
          parsedCoasters: parseResult.coasters,
          duplicates: duplicateResult.duplicates,
        }
      } else {
        return {
          success: true,
          needsPreRankingDecision: false,
          needsDuplicateResolution: false,
          combinedData: duplicateResult.combinedData,
          newCoasterCount: duplicateResult.newCoasterCount,
          totalCount: duplicateResult.totalCount,
        }
      }
    }

    // Multiple coasters need pre-ranking decision first
    return {
      success: true,
      needsPreRankingDecision: true,
      needsDuplicateResolution: false,
      parsedCoasters: parseResult.coasters,
    }
  } catch (err) {
    return {
      success: false,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
      error: err instanceof Error ? err.message : 'Failed to process file',
    }
  }
}

/**
 * Handle the pre-ranking decision and proceed with duplicate detection
 */
export function handlePreRankingDecision(
  params: HandlePreRankingDecisionParams
): HandlePreRankingDecisionResult {
  const { coasters, filename, existingData, isPreRanked } = params

  const duplicateResult = handleDuplicateDetection({
    newCoasters: coasters,
    existingData,
    filename,
  })

  if (duplicateResult.hasDuplicates) {
    return {
      needsDuplicateResolution: true,
      duplicates: duplicateResult.duplicates,
    }
  } else {
    // No duplicates, combine data with pre-ranking information
    const result = combineCoasterData({
      newCoasters: coasters,
      filename,
      existingData,
      isPreRanked,
    })

    return {
      needsDuplicateResolution: false,
      combinedData: result.combinedData,
      newCoasterCount: result.newCoasterCount,
      totalCount: result.totalCount,
    }
  }
}

/**
 * Handle duplicate resolution (wrapper around the existing utility)
 */
export function handleDuplicateResolution(
  params: HandleDuplicateResolutionParams
): HandleDuplicateResolutionResult {
  return processDuplicateResolution(params)
}
