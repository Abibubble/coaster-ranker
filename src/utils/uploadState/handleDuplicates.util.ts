import { handleDuplicateResolution as utilHandleDuplicateResolution } from "../fileProcessing";
import { DuplicateMatch } from "../fileProcessing/duplicateDetection.util";
import type { DuplicateResolution } from "../../components/DuplicateResolver";
import { UploadStateActions } from "./useUploadState.util";
import { Coaster, UploadedData } from "../../types/data";
/**
 * Utility functions for handling duplicate coaster resolution workflows during file uploads.
 * Manages user decisions about duplicate coasters and completes the upload process.
 */
export interface HandleUploadDuplicateResolutionParams {
  resolutions: DuplicateResolution[];
  duplicates: DuplicateMatch[];
  pendingCoasters: Coaster[];
  pendingFilename: string;
  uploadedData: UploadedData | null;
  uploadStateActions: UploadStateActions;
  setUploadedData: (data: UploadedData) => void;
  successMessagePrefix?: string;
  onAdditionalCleanup?: () => void;
}

export interface HandleUploadDuplicateResolutionResult {
  success: boolean;
  addedCount: number;
  totalCount: number;
}

export function handleUploadDuplicateResolution(
  params: HandleUploadDuplicateResolutionParams,
): HandleUploadDuplicateResolutionResult {
  const {
    resolutions,
    duplicates,
    pendingCoasters,
    pendingFilename,
    uploadedData,
    uploadStateActions,
    setUploadedData,
    successMessagePrefix = "Successfully processed file!",
    onAdditionalCleanup,
  } = params;

  const {
    setShowDuplicateResolver,
    setDuplicates,
    setPendingCoasters,
    setPendingFilename,
    setSuccess,
  } = uploadStateActions;

  if (pendingCoasters.length === 0) {
    return { success: false, addedCount: 0, totalCount: 0 };
  }

  const isPreRanked = sessionStorage.getItem("pendingPreRanked") === "true";
  sessionStorage.removeItem("pendingPreRanked");

  const result = utilHandleDuplicateResolution({
    resolutions,
    duplicates,
    pendingCoasters,
    existingData: uploadedData,
    filename: pendingFilename,
    isPreRanked,
  });

  setUploadedData(result.combinedData);

  const rankingStatus = isPreRanked ? " (marked as pre-ranked)" : "";
  setSuccess(
    `${successMessagePrefix} Added ${result.addedCount} new coasters${rankingStatus}. You now have ${result.totalCount} coasters total.`,
  );

  setShowDuplicateResolver(false);
  setDuplicates([]);
  setPendingCoasters([]);
  setPendingFilename("");

  if (onAdditionalCleanup) {
    onAdditionalCleanup();
  }

  return {
    success: true,
    addedCount: result.addedCount,
    totalCount: result.totalCount,
  };
}

export interface HandleDuplicateCancelParams {
  uploadStateActions: UploadStateActions;
  onAdditionalCleanup?: () => void;
}

export function handleDuplicateCancel(
  params: HandleDuplicateCancelParams,
): void {
  const { uploadStateActions, onAdditionalCleanup } = params;

  const {
    setShowDuplicateResolver,
    setDuplicates,
    setPendingCoasters,
    setPendingFilename,
    setError,
  } = uploadStateActions;

  setShowDuplicateResolver(false);
  setDuplicates([]);
  setPendingCoasters([]);
  setPendingFilename("");
  setError("Upload cancelled due to potential duplicates.");

  if (onAdditionalCleanup) {
    onAdditionalCleanup();
  }
}
