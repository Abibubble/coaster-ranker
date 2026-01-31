import { Coaster, UploadedData } from "../../types/data";
import { detectDuplicates, DuplicateMatch } from "./duplicateDetection.util";
import { mergeCoasterData } from "./mergeCoasterData.util";
import type { DuplicateResolution } from "../../components/DuplicateResolver";
import { combineCoasterData } from "./combineCoasterData.util";

/**
 * Utility functions for handling duplicate detection and auto-merge logic.
 * Automatically merges coasters with matching names and parks, manages manual duplicate resolution.
 */

export interface HandleDuplicateDetectionParams {
  newCoasters: Coaster[];
  existingData: UploadedData | null;
  filename: string;
}

export interface HandleDuplicateDetectionResult {
  hasDuplicates: boolean;
  duplicates: DuplicateMatch[];
  autoMerged?: {
    count: number;
    mergedCoasters: string[];
  };
  combinedData?: UploadedData;
  newCoasterCount?: number;
  totalCount?: number;
}

export interface ProcessDuplicateResolutionParams {
  resolutions: DuplicateResolution[];
  duplicates: DuplicateMatch[];
  pendingCoasters: Coaster[];
  existingData: UploadedData | null;
  filename: string;
  isPreRanked: boolean;
}

export interface ProcessDuplicateResolutionResult {
  combinedData: UploadedData;
  addedCount: number;
  totalCount: number;
}

export function handleDuplicateDetection(
  params: HandleDuplicateDetectionParams,
): HandleDuplicateDetectionResult {
  const { newCoasters, existingData, filename } = params;

  const existingCoasters = existingData?.coasters || [];

  if (existingCoasters.length === 0) {
    const result = combineCoasterData({
      newCoasters,
      filename,
      existingData,
      isPreRanked: false,
    });

    return {
      hasDuplicates: false,
      duplicates: [],
      combinedData: result.combinedData,
      newCoasterCount: result.newCoasterCount,
      totalCount: result.totalCount,
    };
  }

  const detectedDuplicates = detectDuplicates(existingCoasters, newCoasters);

  let updatedExistingCoasters = [...existingCoasters];
  let remainingNewCoasters = [...newCoasters];
  const autoMergedCoasters: string[] = [];

  if (detectedDuplicates.autoMerges.length > 0) {
    detectedDuplicates.autoMerges.forEach((autoMerge: DuplicateMatch) => {
      const mergedCoaster = mergeCoasterData(
        autoMerge.existingCoaster,
        autoMerge.newCoaster,
      );

      const existingIndex = updatedExistingCoasters.findIndex(
        (c) => c.id === autoMerge.existingCoaster.id,
      );
      if (existingIndex !== -1) {
        updatedExistingCoasters[existingIndex] = mergedCoaster;
      }

      remainingNewCoasters = remainingNewCoasters.filter(
        (c) => c.id !== autoMerge.newCoaster.id,
      );

      autoMergedCoasters.push(autoMerge.existingCoaster.name);
    });
  }

  if (detectedDuplicates.duplicates.length > 0) {
    return {
      hasDuplicates: true,
      duplicates: detectedDuplicates.duplicates,
      autoMerged:
        autoMergedCoasters.length > 0
          ? {
              count: autoMergedCoasters.length,
              mergedCoasters: autoMergedCoasters,
            }
          : undefined,
    };
  }

  const updatedExistingData: UploadedData | null = existingData
    ? {
        ...existingData,
        coasters: updatedExistingCoasters,
      }
    : null;

  const result = combineCoasterData({
    newCoasters: remainingNewCoasters,
    filename,
    existingData: updatedExistingData,
    isPreRanked: false,
  });

  return {
    hasDuplicates: false,
    duplicates: [],
    autoMerged:
      autoMergedCoasters.length > 0
        ? {
            count: autoMergedCoasters.length,
            mergedCoasters: autoMergedCoasters,
          }
        : undefined,
    combinedData: result.combinedData,
    newCoasterCount: result.newCoasterCount,
    totalCount: result.totalCount,
  };
}

export function processDuplicateResolution(
  params: ProcessDuplicateResolutionParams,
): ProcessDuplicateResolutionResult {
  const {
    resolutions,
    duplicates,
    pendingCoasters,
    existingData,
    filename,
    isPreRanked,
  } = params;

  const existingCoasters = existingData?.coasters || [];
  let updatedExistingCoasters = [...existingCoasters];
  let coastersToAdd: Coaster[] = [];

  const coastersToProcess = new Set(pendingCoasters);

  resolutions.forEach((resolution, index) => {
    const duplicate = duplicates[index];

    switch (resolution.action) {
      case "keep-existing":
        coastersToProcess.delete(duplicate.newCoaster);
        break;

      case "keep-new":
        updatedExistingCoasters = updatedExistingCoasters.filter(
          (c) => c.id !== duplicate.existingCoaster.id,
        );
        if (coastersToProcess.has(duplicate.newCoaster)) {
          coastersToAdd.push(duplicate.newCoaster);
          coastersToProcess.delete(duplicate.newCoaster);
        }
        break;

      case "keep-both":
        if (coastersToProcess.has(duplicate.newCoaster)) {
          coastersToAdd.push(duplicate.newCoaster);
          coastersToProcess.delete(duplicate.newCoaster);
        }
        break;
    }
  });

  coastersToAdd.push(...Array.from(coastersToProcess));

  const updatedExistingData: UploadedData | null = existingData
    ? {
        ...existingData,
        coasters: updatedExistingCoasters,
        rankingMetadata: {
          completedComparisons:
            existingData.rankingMetadata?.completedComparisons ||
            new Set<string>(),
          rankedCoasters:
            existingData.rankingMetadata?.rankedCoasters?.filter((id) =>
              updatedExistingCoasters.some((c) => c.id === id),
            ) || updatedExistingCoasters.map((c) => c.id),
          isRanked: existingData.rankingMetadata?.isRanked || false,
          hasPreRankedCoasters:
            existingData.rankingMetadata?.hasPreRankedCoasters || false,
          preRankedGroups: existingData.rankingMetadata?.preRankedGroups || [],
        },
      }
    : null;

  const result = combineCoasterData({
    newCoasters: coastersToAdd,
    filename,
    existingData: updatedExistingData,
    isPreRanked,
  });

  return {
    combinedData: result.combinedData,
    addedCount: result.newCoasterCount,
    totalCount: result.totalCount,
  };
}
