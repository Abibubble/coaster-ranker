/**
 * Utility functions for fuzzy string matching, particularly useful for park names
 * that may have common spelling variations, apostrophes, or other differences.
 */

/**
 * Calculates Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1, // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Normalizes a string for fuzzy matching by removing common variations
 */
function normalizeStringForMatching(str: string): string {
  return (
    str
      .toLowerCase()
      .trim()
      // Remove apostrophes and quotes
      .replace(/['"`]/g, "")
      // Normalize spaces and hyphens
      .replace(/[-\s]+/g, " ")
      // Remove common suffixes like "park", "gardens", etc.
      .replace(
        /\s+(park|gardens?|resort|world|land|studios?|adventure|island)$/i,
        "",
      )
      // Remove "the" from the beginning
      .replace(/^the\s+/, "")
      .trim()
  );
}

/**
 * Checks if two park names are likely to be the same park using fuzzy matching
 */
export function isParkNameFuzzyMatch(
  name1: string,
  name2: string,
  threshold: number = 0.8,
): boolean {
  if (!name1 || !name2) return false;

  // First try exact match after basic normalization
  const normalized1 = name1.toLowerCase().trim();
  const normalized2 = name2.toLowerCase().trim();

  if (normalized1 === normalized2) return true;

  // Try deep normalization
  const deepNormalized1 = normalizeStringForMatching(name1);
  const deepNormalized2 = normalizeStringForMatching(name2);

  if (deepNormalized1 === deepNormalized2) return true;

  // Calculate similarity using Levenshtein distance
  const maxLength = Math.max(deepNormalized1.length, deepNormalized2.length);
  const distance = levenshteinDistance(deepNormalized1, deepNormalized2);
  const similarity = 1 - distance / maxLength;

  return similarity >= threshold;
}

/**
 * Checks if two strings are fuzzy matches (general purpose)
 */
export function isStringFuzzyMatch(
  str1: string,
  str2: string,
  threshold: number = 0.8,
): boolean {
  if (!str1 || !str2) return false;

  const normalized1 = str1.toLowerCase().trim();
  const normalized2 = str2.toLowerCase().trim();

  if (normalized1 === normalized2) return true;

  const maxLength = Math.max(normalized1.length, normalized2.length);
  const distance = levenshteinDistance(normalized1, normalized2);
  const similarity = 1 - distance / maxLength;

  return similarity >= threshold;
}

/**
 * Gets similarity score between two strings (0-1, where 1 is identical)
 */
export function getStringSimilarity(str1: string, str2: string): number {
  if (!str1 || !str2) return 0;

  const normalized1 = str1.toLowerCase().trim();
  const normalized2 = str2.toLowerCase().trim();

  if (normalized1 === normalized2) return 1;

  const maxLength = Math.max(normalized1.length, normalized2.length);
  const distance = levenshteinDistance(normalized1, normalized2);

  return 1 - distance / maxLength;
}
