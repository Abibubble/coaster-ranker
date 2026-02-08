import { processFileUpload, ProcessFileUploadResult } from "../fileProcessing";
import { UploadStateActions } from "./useUploadState.util";
import { UploadedData, RideType } from "../../types/data";

/**
 * Utility functions for processing file upload results and managing upload workflows.
 * Determines whether pre-ranking decisions, duplicate resolution, or direct completion is needed.
 */

export interface ProcessUploadResultParams {
  result: ProcessFileUploadResult;
  filename: string;
  uploadStateActions: UploadStateActions;
  setUploadedData: (data: UploadedData) => void;
  successMessagePrefix?: string;
  onAdditionalCleanup?: () => void;
}

export interface ProcessUploadResultResult {
  success: boolean;
  needsPreRankingDecision: boolean;
  needsDuplicateResolution: boolean;
}

export function processUploadResult(
  params: ProcessUploadResultParams,
): ProcessUploadResultResult {
  const {
    result,
    filename,
    uploadStateActions,
    setUploadedData,
    successMessagePrefix = "Successfully processed file!",
    onAdditionalCleanup,
  } = params;

  const {
    setError,
    setSuccess,
    setPendingCoasters,
    setPendingFilename,
    setShowPreRankingQuestion,
    setDuplicates,
    setShowDuplicateResolver,
  } = uploadStateActions;

  if (!result.success) {
    setError(result.error || "Failed to process file");
    return {
      success: false,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
    };
  }

  setPendingCoasters(result.parsedCoasters || []);
  setPendingFilename(filename);

  if (result.needsPreRankingDecision) {
    setShowPreRankingQuestion(true);
    return {
      success: true,
      needsPreRankingDecision: true,
      needsDuplicateResolution: false,
    };
  } else if (result.needsDuplicateResolution) {
    setDuplicates(result.duplicates || []);
    setShowDuplicateResolver(true);
    sessionStorage.setItem("pendingPreRanked", "false");

    if (result.autoMerged && result.autoMerged.count > 0) {
      const mergeCount = result.autoMerged.count;
      const coasterList = result.autoMerged.mergedCoasters.join(", ");
      setSuccess(
        `Auto-merged data for ${mergeCount} existing coaster${mergeCount === 1 ? "" : "s"}: ${coasterList}. Please resolve remaining duplicates below.`,
      );
    }

    return {
      success: true,
      needsPreRankingDecision: false,
      needsDuplicateResolution: true,
    };
  } else {
    setUploadedData(result.combinedData!);

    let successMessage = `${successMessagePrefix} Added ${result.newCoasterCount} new coasters. You now have ${result.totalCount} coasters total.`;

    if (result.autoMerged && result.autoMerged.count > 0) {
      const mergeCount = result.autoMerged.count;
      const coasterList = result.autoMerged.mergedCoasters.join(", ");
      successMessage += ` Auto-merged data for ${mergeCount} existing coaster${mergeCount === 1 ? "" : "s"}: ${coasterList}.`;
    }

    setSuccess(successMessage);

    setPendingCoasters([]);
    setPendingFilename("");

    if (onAdditionalCleanup) {
      onAdditionalCleanup();
    }

    return {
      success: true,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
    };
  }
}

export interface ProcessUploadWorkflowParams {
  fileContent: string;
  filename: string;
  uploadedData: UploadedData | null;
  uploadStateActions: UploadStateActions;
  setUploadedData: (data: UploadedData) => void;
  setIsLoading: (loading: boolean) => void;
  successMessagePrefix?: string;
  onAdditionalCleanup?: () => void;
  rideType?: RideType;
}

export async function processUploadWorkflow(
  params: ProcessUploadWorkflowParams,
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
    rideType = "coaster",
  } = params;

  const { setError, setSuccess } = uploadStateActions;

  setIsLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const result = await processFileUpload({
      fileContent,
      filename,
      existingData: uploadedData,
      rideType,
    });

    const processResult = processUploadResult({
      result,
      filename,
      uploadStateActions,
      setUploadedData,
      successMessagePrefix,
      onAdditionalCleanup,
    });

    return processResult;
  } catch (err) {
    setError(
      `Error processing file: ${
        err instanceof Error ? err.message : "Unknown error"
      }`,
    );
    return {
      success: false,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
    };
  } finally {
    setIsLoading(false);
  }
}
