import { describe, expect, it } from "vitest";
import {
  getStringSimilarity,
  isParkNameFuzzyMatch,
  isStringFuzzyMatch,
} from "./stringMatching.util";

describe("getStringSimilarity", () => {
  it("returns 1 for identical strings", () => {
    expect(getStringSimilarity("Steel Vengeance", "Steel Vengeance")).toBe(1);
  });

  it("is case-insensitive and trims whitespace when comparing", () => {
    expect(getStringSimilarity(" Steel Vengeance ", "steel vengeance")).toBe(
      1,
    );
  });

  it("returns 0 for completely different strings of equal length", () => {
    // distance 3 / maxLength 3 = 0 similarity
    expect(getStringSimilarity("abc", "xyz")).toBe(0);
  });

  it("returns a proportional score for a partial difference", () => {
    // "abcde" -> "abcdX": 1 substitution, maxLength 5 => 1 - 1/5 = 0.8
    expect(getStringSimilarity("abcde", "abcdX")).toBeCloseTo(0.8);
    // "abcde" -> "abcXX": 2 substitutions, maxLength 5 => 1 - 2/5 = 0.6
    expect(getStringSimilarity("abcde", "abcXX")).toBeCloseTo(0.6);
  });

  it("returns 0 when either string is empty (falsy-input short-circuit)", () => {
    expect(getStringSimilarity("", "anything")).toBe(0);
    expect(getStringSimilarity("anything", "")).toBe(0);
    // Note: even "" vs "" returns 0 here, not 1, because the function's
    // `if (!str1 || !str2) return 0` guard treats an empty string as falsy
    // before it ever gets to compare them for equality.
    expect(getStringSimilarity("", "")).toBe(0);
  });

  it("handles single-character strings", () => {
    expect(getStringSimilarity("a", "a")).toBe(1);
    expect(getStringSimilarity("a", "b")).toBe(0);
  });
});

describe("isStringFuzzyMatch", () => {
  it("matches identical strings", () => {
    expect(isStringFuzzyMatch("Bolliger & Mabillard", "Bolliger & Mabillard")).toBe(
      true,
    );
  });

  it("matches case-insensitively and ignores surrounding whitespace", () => {
    expect(isStringFuzzyMatch(" B&M ", "b&m")).toBe(true);
  });

  it("does not do deep normalization (unlike isParkNameFuzzyMatch) - differing suffixes still need to clear the distance threshold", () => {
    expect(isStringFuzzyMatch("Adventure Island", "Adventure")).toBe(false);
  });

  it("matches strings right at the default 0.8 threshold", () => {
    // "abcde" -> "abcdX": similarity exactly 0.8 (>= threshold passes)
    expect(isStringFuzzyMatch("abcde", "abcdX")).toBe(true);
  });

  it("does not match strings just below the default 0.8 threshold", () => {
    // "abcde" -> "abcXX": similarity 0.6 (< threshold fails)
    expect(isStringFuzzyMatch("abcde", "abcXX")).toBe(false);
  });

  it("respects a custom threshold", () => {
    // similarity 0.6 fails against default 0.8 but passes a lowered 0.5 threshold
    expect(isStringFuzzyMatch("abcde", "abcXX", 0.5)).toBe(true);
  });

  it("returns false when either string is empty", () => {
    expect(isStringFuzzyMatch("", "abc")).toBe(false);
    expect(isStringFuzzyMatch("abc", "")).toBe(false);
  });
});

describe("isParkNameFuzzyMatch", () => {
  it("matches identical names", () => {
    expect(isParkNameFuzzyMatch("Cedar Point", "Cedar Point")).toBe(true);
  });

  it("matches case-insensitively", () => {
    expect(isParkNameFuzzyMatch("Cedar Point", "cedar point")).toBe(true);
  });

  it("strips a trailing generic suffix like 'Park'", () => {
    expect(isParkNameFuzzyMatch("Thorpe Park", "Thorpe")).toBe(true);
  });

  it("strips other recognised generic suffixes (gardens/resort/world/land/studios/adventure/island)", () => {
    expect(isParkNameFuzzyMatch("Efteling Gardens", "Efteling")).toBe(true);
    expect(isParkNameFuzzyMatch("Universal Studios", "Universal")).toBe(true);
    expect(isParkNameFuzzyMatch("Adventure Island", "Adventure")).toBe(true);
  });

  it("strips a leading 'The'", () => {
    expect(
      isParkNameFuzzyMatch(
        "The Blackpool Pleasure Beach",
        "Blackpool Pleasure Beach",
      ),
    ).toBe(true);
  });

  it("removes apostrophes/quotes so they don't affect matching", () => {
    expect(isParkNameFuzzyMatch("Cobra's Curse Park", "Cobras Curse")).toBe(
      true,
    );
  });

  it("normalizes hyphens and repeated whitespace to a single space", () => {
    expect(
      isParkNameFuzzyMatch("Six Flags-Magic Mountain", "Six Flags Magic Mountain"),
    ).toBe(true);
  });

  it("does not match unrelated park names", () => {
    expect(isParkNameFuzzyMatch("Cedar Point", "Alton Towers")).toBe(false);
  });

  it("falls through to Levenshtein similarity for minor misspellings after normalization", () => {
    // "energylandia" vs "energilandia": 1 substitution, length 12 => similarity 1 - 1/12 ≈ 0.917 (>= 0.8)
    expect(isParkNameFuzzyMatch("Energylandia", "Energilandia")).toBe(true);
  });

  it("respects a custom threshold", () => {
    // Two very different normalized strings of equal length (distance 3 / length 3 = 0 similarity)
    // fail against any positive threshold, but pass a threshold of 0.
    expect(isParkNameFuzzyMatch("abc", "xyz", 0)).toBe(true);
    expect(isParkNameFuzzyMatch("abc", "xyz", 0.1)).toBe(false);
  });

  it("returns false when either name is empty", () => {
    expect(isParkNameFuzzyMatch("", "Cedar Point")).toBe(false);
    expect(isParkNameFuzzyMatch("Cedar Point", "")).toBe(false);
  });

  it("handles single-character names", () => {
    expect(isParkNameFuzzyMatch("A", "A")).toBe(true);
    expect(isParkNameFuzzyMatch("A", "B")).toBe(false);
  });
});
