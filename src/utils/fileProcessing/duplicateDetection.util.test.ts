import { describe, expect, it } from "vitest";
import { Coaster } from "../../types/data";
import {
  checkCoasterSimilarity,
  detectDuplicates,
  formatMatchingFields,
} from "./duplicateDetection.util";

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster =>
  ({
    id: overrides.id ?? overrides.name ?? "id",
    name: "Coaster",
    park: "Park",
    country: "Country",
    manufacturer: "Manufacturer",
    ...overrides,
  }) as Coaster;

describe("checkCoasterSimilarity", () => {
  it("matches every field when all are identical", () => {
    const existing = makeCoaster({
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "B&M",
      model: "Inverted",
    });
    const incoming = makeCoaster({
      id: "other",
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "B&M",
      model: "Inverted",
    });

    const result = checkCoasterSimilarity(existing, incoming);

    expect(result.matchCount).toBe(4);
    expect(result.matchingFields).toEqual(
      expect.arrayContaining(["name", "park", "manufacturer", "model"]),
    );
  });

  it("uses fuzzy matching for park names but exact matching for other fields", () => {
    const existing = makeCoaster({ name: "Nemesis", park: "Cedar Point" });
    const incoming = makeCoaster({
      id: "other",
      name: "Nemesis",
      park: "Cedar Point Park",
    });

    const result = checkCoasterSimilarity(existing, incoming);

    expect(result.matchingFields).toContain("park");
  });

  it("reports no matching fields for entirely different coasters", () => {
    const existing = makeCoaster({
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "B&M",
    });
    const incoming = makeCoaster({
      id: "other",
      name: "Fury 325",
      park: "Carowinds",
      manufacturer: "Intamin",
    });

    const result = checkCoasterSimilarity(existing, incoming);

    expect(result.matchCount).toBe(0);
    expect(result.matchingFields).toEqual([]);
  });

  it("does not count a field as matching or mismatching when either side is missing it", () => {
    const existing = makeCoaster({
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "B&M",
    });
    const incoming = makeCoaster({
      id: "other",
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "Intamin",
      model: "Inverted",
    });

    const result = checkCoasterSimilarity(existing, incoming);

    expect(result.matchingFields).not.toContain("model");
    expect(result.matchCount).toBe(2);
  });
});

describe("detectDuplicates", () => {
  it("classifies a name+park match as an auto-merge, not a manual duplicate", () => {
    const existing = makeCoaster({
      id: "existing",
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "",
    });
    const incoming = makeCoaster({
      id: "incoming",
      name: "Nemesis",
      park: "Alton Towers Resort",
      manufacturer: "B&M",
    });

    const result = detectDuplicates([existing], [incoming]);

    expect(result.autoMerges).toHaveLength(1);
    expect(result.duplicates).toHaveLength(0);
    expect(result.hasDuplicates).toBe(false);
  });

  it("classifies a same-name, same-manufacturer, same-model match at a different park as a manual duplicate", () => {
    const existing = makeCoaster({
      id: "existing",
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "B&M",
      model: "Inverted",
    });
    const incoming = makeCoaster({
      id: "incoming",
      name: "Nemesis",
      park: "Thorpe Park",
      manufacturer: "B&M",
      model: "Inverted",
    });

    const result = detectDuplicates([existing], [incoming]);

    expect(result.autoMerges).toHaveLength(0);
    expect(result.duplicates).toHaveLength(1);
    expect(result.hasDuplicates).toBe(true);
    expect(result.duplicates[0].matchingFields).toEqual(
      expect.arrayContaining(["name", "manufacturer", "model"]),
    );
  });

  it("does not flag coasters with fewer than 3 matching fields as duplicates", () => {
    const existing = makeCoaster({
      id: "existing",
      name: "Nemesis",
      park: "Thorpe Park",
      manufacturer: "B&M",
    });
    const incoming = makeCoaster({
      id: "incoming",
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "Intamin",
    });

    const result = detectDuplicates([existing], [incoming]);

    expect(result.duplicates).toHaveLength(0);
    expect(result.autoMerges).toHaveLength(0);
  });

  it("produces one duplicate entry per matching existing coaster when one new coaster matches multiple", () => {
    // This is the exact scenario behind the UploadManual double-insertion bug:
    // a single new coaster can appear against 2+ different existing coasters.
    const existingA = makeCoaster({
      id: "existingA",
      name: "Nemesis",
      park: "Thorpe Park",
      manufacturer: "B&M",
      model: "Inverted",
    });
    const existingB = makeCoaster({
      id: "existingB",
      name: "Nemesis",
      park: "Six Flags Magic Mountain",
      manufacturer: "B&M",
      model: "Inverted",
    });
    const incoming = makeCoaster({
      id: "incoming",
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "B&M",
      model: "Inverted",
    });

    const result = detectDuplicates([existingA, existingB], [incoming]);

    expect(result.duplicates).toHaveLength(2);
    expect(result.duplicates.every((d) => d.newCoaster === incoming)).toBe(
      true,
    );
    expect(result.duplicates.map((d) => d.existingCoaster.id)).toEqual(
      expect.arrayContaining(["existingA", "existingB"]),
    );
  });

  it("returns empty duplicates and autoMerges when nothing matches", () => {
    const existing = makeCoaster({ name: "Nemesis", park: "Alton Towers" });
    const incoming = makeCoaster({
      id: "other",
      name: "Fury 325",
      park: "Carowinds",
    });

    const result = detectDuplicates([existing], [incoming]);

    expect(result.duplicates).toEqual([]);
    expect(result.autoMerges).toEqual([]);
    expect(result.hasDuplicates).toBe(false);
  });

  it("behaves identically for dark-ride coasters", () => {
    const existing = makeCoaster({
      id: "existing",
      name: "Haunted Mansion",
      park: "Disneyland",
      manufacturer: "Disney",
      model: "Dark Ride",
      type: "dark-ride",
    });
    const incoming = makeCoaster({
      id: "incoming",
      name: "Haunted Mansion",
      park: "Disneyland Park",
      manufacturer: "Disney",
      model: "Dark Ride",
      type: "dark-ride",
    });

    const result = detectDuplicates([existing], [incoming]);

    expect(result.autoMerges).toHaveLength(1);
  });
});

describe("formatMatchingFields", () => {
  it("formats a single field", () => {
    expect(formatMatchingFields(["name"])).toBe("Name");
  });

  it("formats two fields with 'and'", () => {
    expect(formatMatchingFields(["name", "park"])).toBe("Name and Park");
  });

  it("formats three or more fields with commas and a trailing 'and'", () => {
    expect(formatMatchingFields(["name", "park", "manufacturer"])).toBe(
      "Name, Park, and Manufacturer",
    );
  });
});
