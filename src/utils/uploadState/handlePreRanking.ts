import { handlePreRankingDecision as utilHandlePreRankingDecision } from '../fileProcessing'
import { UploadStateActions } from './useUploadState'
import { Coaster, UploadedData } from '../../types/data'

export interface HandlePreRankingParams {
  isPreRanked: boolean
  pendingCoasters: Coaster[]
  pendingFilename: string
  uploadedData: UploadedData | null
  uploadStateActions: UploadStateActions
  setUploadedData: (data: UploadedData) => void
  successMessagePrefix?: string
  onAdditionalCleanup?: () => void
}

export interface HandlePreRankingResult {
  success: boolean
  needsDuplicateResolution: boolean
}

/**
 * Handle pre-ranking decision workflow for file uploads
 * Manages the flow after user decides whether coasters are pre-ranked
 */
export function handlePreRankingAnswer(
  params: HandlePreRankingParams
): HandlePreRankingResult {
  const {
    isPreRanked,
    pendingCoasters,
    pendingFilename,
    uploadedData,
    uploadStateActions,
    setUploadedData,
    successMessagePrefix = 'Successfully processed file!',
    onAdditionalCleanup,
  } = params

  const {
    setShowPreRankingQuestion,
    setDuplicates,
    setShowDuplicateResolver,
    setSuccess,
    setPendingCoasters,
    setPendingFilename,
  } = uploadStateActions

  setShowPreRankingQuestion(false)

  if (pendingCoasters.length === 0) {
    return { success: false, needsDuplicateResolution: false }
  }

  const result = utilHandlePreRankingDecision({
    coasters: pendingCoasters,
    filename: pendingFilename,
    existingData: uploadedData,
    isPreRanked,
  })

  if (result.needsDuplicateResolution) {
    setDuplicates(result.duplicates || [])
    setShowDuplicateResolver(true)
    // Store the pre-ranking decision for later use in duplicate resolution
    sessionStorage.setItem('pendingPreRanked', isPreRanked.toString())

    return { success: true, needsDuplicateResolution: true }
  } else {
    // No duplicates, complete the upload
    setUploadedData(result.combinedData!)

    const rankingStatus = isPreRanked ? ' (marked as pre-ranked)' : ''
    setSuccess(
      `${successMessagePrefix} Added ${result.newCoasterCount} new coasters${rankingStatus}. You now have ${result.totalCount} coasters total.`
    )

    // Clear pending data
    setPendingCoasters([])
    setPendingFilename('')

    // Additional cleanup (e.g., clearing form inputs)
    if (onAdditionalCleanup) {
      onAdditionalCleanup()
    }

    return { success: true, needsDuplicateResolution: false }
  }
}

export interface HandlePreRankingCancelParams {
  uploadStateActions: UploadStateActions
  onAdditionalCleanup?: () => void
}

/**
 * Handle cancellation of pre-ranking decision
 */
export function handlePreRankingCancel(
  params: HandlePreRankingCancelParams
): void {
  const { uploadStateActions, onAdditionalCleanup } = params

  const {
    setShowPreRankingQuestion,
    setPendingCoasters,
    setPendingFilename,
    setError,
  } = uploadStateActions

  setShowPreRankingQuestion(false)
  setPendingCoasters([])
  setPendingFilename('')
  setError('Upload cancelled by user.')

  if (onAdditionalCleanup) {
    onAdditionalCleanup()
  }
}
