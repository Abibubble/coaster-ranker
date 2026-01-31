import { Coaster, UploadedData } from "../../types/data";
import { processUploadedFile } from "./fileParser.util";
import {
  handleDuplicateDetection,
  processDuplicateResolution,
} from "./handleDuplicateDetection.util";
import { combineCoasterData } from "./combineCoasterData.util";
import { DuplicateMatch } from "./duplicateDetection.util";
import type { DuplicateResolution } from "../../components/DuplicateResolver";

/**
 * Main entry point utility for processing file uploads.
 * Orchestrates the complete file upload workflow including parsing, duplicate detection, and data combination.
 */

export interface ProcessFileUploadParams {
  fileContent: string;
  filename: string;
  existingData: UploadedData | null;
}

export interface ProcessFileUploadResult {
  success: boolean;
  needsPreRankingDecision: boolean;
  needsDuplicateResolution: boolean;
  parsedCoasters?: Coaster[];
  duplicates?: DuplicateMatch[];
  autoMerged?: {
    count: number;
    mergedCoasters: string[];
  };
  combinedData?: UploadedData;
  newCoasterCount?: number;
  totalCount?: number;
  error?: string;
}

export interface HandlePreRankingDecisionParams {
  coasters: Coaster[];
  filename: string;
  existingData: UploadedData | null;
  isPreRanked: boolean;
}

export interface HandlePreRankingDecisionResult {
  needsDuplicateResolution: boolean;
  duplicates?: DuplicateMatch[];
  autoMerged?: {
    count: number;
    mergedCoasters: string[];
  };
  combinedData?: UploadedData;
  newCoasterCount?: number;
  totalCount?: number;
}

export interface HandleDuplicateResolutionParams {
  resolutions: DuplicateResolution[];
  duplicates: DuplicateMatch[];
  pendingCoasters: Coaster[];
  existingData: UploadedData | null;
  filename: string;
  isPreRanked: boolean;
}

export interface HandleDuplicateResolutionResult {
  combinedData: UploadedData;
  addedCount: number;
  totalCount: number;
}

export async function processFileUpload(
  params: ProcessFileUploadParams,
): Promise<ProcessFileUploadResult> {
  const { fileContent, filename, existingData } = params;

  try {
    const fakeFile = new File([fileContent], filename, {
      type: filename.toLowerCase().endsWith(".json")
        ? "application/json"
        : "text/csv",
    });

    const parseResult = await processUploadedFile(fakeFile, fileContent);

    if (parseResult.coasters.length === 1) {
      const duplicateResult = handleDuplicateDetection({
        newCoasters: parseResult.coasters,
        existingData,
        filename: parseResult.filename,
      });

      if (duplicateResult.hasDuplicates) {
        return {
          success: true,
          needsPreRankingDecision: false,
          needsDuplicateResolution: true,
          parsedCoasters: parseResult.coasters,
          duplicates: duplicateResult.duplicates,
          autoMerged: duplicateResult.autoMerged,
        };
      } else {
        return {
          success: true,
          needsPreRankingDecision: false,
          needsDuplicateResolution: false,
          combinedData: duplicateResult.combinedData,
          newCoasterCount: duplicateResult.newCoasterCount,
          totalCount: duplicateResult.totalCount,
          autoMerged: duplicateResult.autoMerged,
        };
      }
    }

    return {
      success: true,
      needsPreRankingDecision: true,
      needsDuplicateResolution: false,
      parsedCoasters: parseResult.coasters,
    };
  } catch (err) {
    return {
      success: false,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
      error: err instanceof Error ? err.message : "Failed to process file",
    };
  }
}

export function handlePreRankingDecision(
  params: HandlePreRankingDecisionParams,
): HandlePreRankingDecisionResult {
  const { coasters, filename, existingData, isPreRanked } = params;

  const duplicateResult = handleDuplicateDetection({
    newCoasters: coasters,
    existingData,
    filename,
  });

  if (duplicateResult.hasDuplicates) {
    return {
      needsDuplicateResolution: true,
      duplicates: duplicateResult.duplicates,
      autoMerged: duplicateResult.autoMerged,
    };
  } else {
    const result = combineCoasterData({
      newCoasters: coasters,
      filename,
      existingData,
      isPreRanked,
    });

    return {
      needsDuplicateResolution: false,
      combinedData: result.combinedData,
      newCoasterCount: result.newCoasterCount,
      totalCount: result.totalCount,
      autoMerged: duplicateResult.autoMerged,
    };
  }
}

export function handleDuplicateResolution(
  params: HandleDuplicateResolutionParams,
): HandleDuplicateResolutionResult {
  return processDuplicateResolution(params);
}
