import { processFileUpload, ProcessFileUploadResult } from '../fileProcessing'
import { UploadStateActions } from './useUploadState'
import { UploadedData } from '../../types/data'

export interface ProcessUploadResultParams {
  result: ProcessFileUploadResult
  filename: string
  uploadStateActions: UploadStateActions
  setUploadedData: (data: UploadedData) => void
  successMessagePrefix?: string
  onAdditionalCleanup?: () => void
}

export interface ProcessUploadResultResult {
  success: boolean
  needsPreRankingDecision: boolean
  needsDuplicateResolution: boolean
}

/**
 * Process the result of a file upload and handle the appropriate workflow
 * Determines whether pre-ranking decision, duplicate resolution, or direct completion is needed
 */
export function processUploadResult(
  params: ProcessUploadResultParams
): ProcessUploadResultResult {
  const {
    result,
    filename,
    uploadStateActions,
    setUploadedData,
    successMessagePrefix = 'Successfully processed file!',
    onAdditionalCleanup,
  } = params

  const {
    setError,
    setSuccess,
    setPendingCoasters,
    setPendingFilename,
    setShowPreRankingQuestion,
    setDuplicates,
    setShowDuplicateResolver,
  } = uploadStateActions

  if (!result.success) {
    setError(result.error || 'Failed to process file')
    return {
      success: false,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
    }
  }

  // Store pending coasters for use in other handlers
  setPendingCoasters(result.parsedCoasters || [])
  setPendingFilename(filename)

  if (result.needsPreRankingDecision) {
    setShowPreRankingQuestion(true)
    return {
      success: true,
      needsPreRankingDecision: true,
      needsDuplicateResolution: false,
    }
  } else if (result.needsDuplicateResolution) {
    setDuplicates(result.duplicates || [])
    setShowDuplicateResolver(true)
    // Single coaster uploads are never pre-ranked by default
    sessionStorage.setItem('pendingPreRanked', 'false')
    return {
      success: true,
      needsPreRankingDecision: false,
      needsDuplicateResolution: true,
    }
  } else {
    // Direct success - no additional workflows needed
    setUploadedData(result.combinedData!)
    setSuccess(
      `${successMessagePrefix} Added ${result.newCoasterCount} new coasters. You now have ${result.totalCount} coasters total.`
    )

    // Clear pending data
    setPendingCoasters([])
    setPendingFilename('')

    // Additional cleanup (e.g., clearing form inputs)
    if (onAdditionalCleanup) {
      onAdditionalCleanup()
    }

    return {
      success: true,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
    }
  }
}

export interface ProcessUploadWorkflowParams {
  fileContent: string
  filename: string
  uploadedData: UploadedData | null
  uploadStateActions: UploadStateActions
  setUploadedData: (data: UploadedData) => void
  setIsLoading: (loading: boolean) => void
  successMessagePrefix?: string
  onAdditionalCleanup?: () => void
}

/**
 * Complete file upload processing workflow
 * Handles the entire flow from file content to final state updates
 */
export async function processUploadWorkflow(
  params: ProcessUploadWorkflowParams
): Promise<ProcessUploadResultResult> {
  const {
    fileContent,
    filename,
    uploadedData,
    uploadStateActions,
    setUploadedData,
    setIsLoading,
    successMessagePrefix,
    onAdditionalCleanup,
  } = params

  const { setError, setSuccess } = uploadStateActions

  setIsLoading(true)
  setError(null)
  setSuccess(null)

  try {
    const result = await processFileUpload({
      fileContent,
      filename,
      existingData: uploadedData,
    })

    const processResult = processUploadResult({
      result,
      filename,
      uploadStateActions,
      setUploadedData,
      successMessagePrefix,
      onAdditionalCleanup,
    })

    return processResult
  } catch (err) {
    setError(
      `Error processing file: ${
        err instanceof Error ? err.message : 'Unknown error'
      }`
    )
    return {
      success: false,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
    }
  } finally {
    setIsLoading(false)
  }
}
