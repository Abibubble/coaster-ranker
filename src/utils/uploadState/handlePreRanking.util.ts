import { handlePreRankingDecision as utilHandlePreRankingDecision } from "../fileProcessing";
import { UploadStateActions } from "./useUploadState.util";
import { Coaster, UploadedData } from "../../types/data";
/**
 * Utility functions for handling pre-ranking decision workflows during file uploads.
 * Manages the flow after users decide whether uploaded coasters are pre-ranked.
 */
export interface HandlePreRankingParams {
  isPreRanked: boolean;
  pendingCoasters: Coaster[];
  pendingFilename: string;
  uploadedData: UploadedData | null;
  uploadStateActions: UploadStateActions;
  setUploadedData: (data: UploadedData) => void;
  successMessagePrefix?: string;
  onAdditionalCleanup?: () => void;
}

export interface HandlePreRankingResult {
  success: boolean;
  needsDuplicateResolution: boolean;
}

export function handlePreRankingAnswer(
  params: HandlePreRankingParams,
): HandlePreRankingResult {
  const {
    isPreRanked,
    pendingCoasters,
    pendingFilename,
    uploadedData,
    uploadStateActions,
    setUploadedData,
    successMessagePrefix = "Successfully processed file!",
    onAdditionalCleanup,
  } = params;

  const {
    setShowPreRankingQuestion,
    setDuplicates,
    setShowDuplicateResolver,
    setSuccess,
    setPendingCoasters,
    setPendingFilename,
  } = uploadStateActions;

  setShowPreRankingQuestion(false);

  if (pendingCoasters.length === 0) {
    return { success: false, needsDuplicateResolution: false };
  }

  const result = utilHandlePreRankingDecision({
    coasters: pendingCoasters,
    filename: pendingFilename,
    existingData: uploadedData,
    isPreRanked,
  });

  if (result.needsDuplicateResolution) {
    setDuplicates(result.duplicates || []);
    setShowDuplicateResolver(true);
    sessionStorage.setItem("pendingPreRanked", isPreRanked.toString());

    return { success: true, needsDuplicateResolution: true };
  } else {
    setUploadedData(result.combinedData!);

    const rankingStatus = isPreRanked ? " (marked as pre-ranked)" : "";
    setSuccess(
      `${successMessagePrefix} Added ${result.newCoasterCount} new coasters${rankingStatus}. You now have ${result.totalCount} coasters total.`,
    );

    setPendingCoasters([]);
    setPendingFilename("");

    if (onAdditionalCleanup) {
      onAdditionalCleanup();
    }

    return { success: true, needsDuplicateResolution: false };
  }
}

export interface HandlePreRankingCancelParams {
  uploadStateActions: UploadStateActions;
  onAdditionalCleanup?: () => void;
}

export function handlePreRankingCancel(
  params: HandlePreRankingCancelParams,
): void {
  const { uploadStateActions, onAdditionalCleanup } = params;

  const {
    setShowPreRankingQuestion,
    setPendingCoasters,
    setPendingFilename,
    setError,
  } = uploadStateActions;

  setShowPreRankingQuestion(false);
  setPendingCoasters([]);
  setPendingFilename("");
  setError("Upload cancelled by user.");

  if (onAdditionalCleanup) {
    onAdditionalCleanup();
  }
}
