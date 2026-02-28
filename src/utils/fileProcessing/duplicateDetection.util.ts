import { Coaster } from "../../types/data";
import { shouldAutoMerge, getMergedFields } from "./mergeCoasterData.util";
import { isParkNameFuzzyMatch } from "../stringMatching.util";

/**
 * Utility functions for detecting duplicate coasters and potential matches.
 * Separates auto-merge candidates from manual duplicates based on matching criteria.
 */

export interface DuplicateMatch {
  existingCoaster: Coaster;
  newCoaster: Coaster;
  matchingFields: string[];
  matchCount: number;
  shouldAutoMerge?: boolean;
  mergedFields?: string[];
}

export interface DuplicateCheckResult {
  hasDuplicates: boolean;
  duplicates: DuplicateMatch[];
  autoMerges: DuplicateMatch[];
}

export function checkCoasterSimilarity(
  existing: Coaster,
  newCoaster: Coaster,
): { matchingFields: string[]; matchCount: number } {
  const fieldsToCheck = ["name", "park", "manufacturer", "model"] as const;
  const matchingFields: string[] = [];

  fieldsToCheck.forEach((field) => {
    const existingValue = existing[field];
    const newValue = newCoaster[field];

    if (existingValue && newValue) {
      let isMatch = false;

      if (field === "park") {
        // Use fuzzy matching for park names to handle common misspellings
        isMatch = isParkNameFuzzyMatch(existingValue, newValue);
      } else {
        // Use exact matching for other fields (with normalization)
        const normalizedExisting = existingValue.toLowerCase().trim();
        const normalizedNew = newValue.toLowerCase().trim();
        isMatch = normalizedExisting === normalizedNew;
      }

      if (isMatch) {
        matchingFields.push(field);
      }
    }
  });

  return {
    matchingFields,
    matchCount: matchingFields.length,
  };
}

export function detectDuplicates(
  existingCoasters: Coaster[],
  newCoasters: Coaster[],
): DuplicateCheckResult {
  const duplicates: DuplicateMatch[] = [];
  const autoMerges: DuplicateMatch[] = [];

  newCoasters.forEach((newCoaster) => {
    existingCoasters.forEach((existingCoaster) => {
      if (shouldAutoMerge(existingCoaster, newCoaster)) {
        const mergedFields = getMergedFields(existingCoaster, newCoaster);
        autoMerges.push({
          existingCoaster,
          newCoaster,
          matchingFields: ["name", "park"],
          matchCount: 2,
          shouldAutoMerge: true,
          mergedFields,
        });
        return;
      }

      const similarity = checkCoasterSimilarity(existingCoaster, newCoaster);
      // Only flag as duplicate if name matches AND there are 3+ total matches
      if (
        similarity.matchCount >= 3 &&
        similarity.matchingFields.includes("name")
      ) {
        duplicates.push({
          existingCoaster,
          newCoaster,
          matchingFields: similarity.matchingFields,
          matchCount: similarity.matchCount,
          shouldAutoMerge: false,
        });
      }
    });
  });

  return {
    hasDuplicates: duplicates.length > 0,
    duplicates,
    autoMerges,
  };
}

export function formatMatchingFields(matchingFields: string[]): string {
  const formatted = matchingFields.map((field) => {
    switch (field) {
      case "name":
        return "Name";
      case "park":
        return "Park";
      case "manufacturer":
        return "Manufacturer";
      case "model":
        return "Model";
      default:
        return field;
    }
  });

  if (formatted.length === 1) {
    return formatted[0];
  } else if (formatted.length === 2) {
    return `${formatted[0]} and ${formatted[1]}`;
  } else {
    return `${formatted.slice(0, -1).join(", ")}, and ${
      formatted[formatted.length - 1]
    }`;
  }
}
