import { useState } from 'react'
import { DuplicateMatch } from '../fileProcessing/duplicateDetection'
import { Coaster } from '../../types/data'

export interface UploadState {
  error: string | null
  success: string | null
  duplicates: DuplicateMatch[]
  pendingCoasters: Coaster[]
  pendingFilename: string
  showDuplicateResolver: boolean
  showPreRankingQuestion: boolean
}

export interface UploadStateActions {
  setError: (error: string | null) => void
  setSuccess: (success: string | null) => void
  setDuplicates: (duplicates: DuplicateMatch[]) => void
  setPendingCoasters: (coasters: Coaster[]) => void
  setPendingFilename: (filename: string) => void
  setShowDuplicateResolver: (show: boolean) => void
  setShowPreRankingQuestion: (show: boolean) => void
  resetUploadState: () => void
  clearPendingData: () => void
}

export interface UseUploadStateResult extends UploadState, UploadStateActions {}

/**
 * Custom hook for managing upload state across different upload components
 * Provides consistent state management for file uploads, errors, duplicates, and workflows
 */
export function useUploadState(): UseUploadStateResult {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [duplicates, setDuplicates] = useState<DuplicateMatch[]>([])
  const [pendingCoasters, setPendingCoasters] = useState<Coaster[]>([])
  const [pendingFilename, setPendingFilename] = useState<string>('')
  const [showDuplicateResolver, setShowDuplicateResolver] = useState(false)
  const [showPreRankingQuestion, setShowPreRankingQuestion] = useState(false)

  const resetUploadState = () => {
    setError(null)
    setSuccess(null)
    setDuplicates([])
    setPendingCoasters([])
    setPendingFilename('')
    setShowDuplicateResolver(false)
    setShowPreRankingQuestion(false)
  }

  const clearPendingData = () => {
    setDuplicates([])
    setPendingCoasters([])
    setPendingFilename('')
    setShowDuplicateResolver(false)
    setShowPreRankingQuestion(false)
  }

  return {
    // State
    error,
    success,
    duplicates,
    pendingCoasters,
    pendingFilename,
    showDuplicateResolver,
    showPreRankingQuestion,

    // Actions
    setError,
    setSuccess,
    setDuplicates,
    setPendingCoasters,
    setPendingFilename,
    setShowDuplicateResolver,
    setShowPreRankingQuestion,
    resetUploadState,
    clearPendingData,
  }
}
