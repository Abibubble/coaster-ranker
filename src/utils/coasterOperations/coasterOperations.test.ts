import { describe, expect, it } from "vitest";
import { Coaster, RankingMetadata, UploadedData } from "../../types/data";
import {
  getUniqueFieldValues,
  hasAnyRanking,
  removeCoaster,
  updateCoaster,
} from "./coasterOperations";

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster =>
  ({
    id: overrides.id ?? "id",
    name: "Coaster",
    park: "Park",
    country: "Country",
    manufacturer: "Manufacturer",
    ...overrides,
  }) as Coaster;

const makeUploadedData = (
  coasters: Coaster[],
  rankingMetadata?: RankingMetadata,
): UploadedData => ({
  coasters,
  uploadedAt: new Date(),
  filename: "test-data.json",
  rankingMetadata,
});

describe("removeCoaster", () => {
  it("shifts down the rankPosition of coasters ranked below the removed one, leaving those above untouched", () => {
    const currentData = makeUploadedData(
      [
        makeCoaster({ id: "a", rankPosition: 1 }),
        makeCoaster({ id: "b", rankPosition: 2 }),
        makeCoaster({ id: "c", rankPosition: 3 }),
        makeCoaster({ id: "d", rankPosition: 4 }),
      ],
      {
        completedComparisons: new Set(),
        rankedCoasters: ["a", "b", "c", "d"],
        isRanked: true,
      },
    );

    const result = removeCoaster(currentData, "b");

    expect(result).not.toBeNull();
    const byId = Object.fromEntries(
      result!.coasters.map((c) => [c.id, c.rankPosition]),
    );
    expect(byId.a).toBe(1); // above the removed coaster: untouched
    expect(byId.c).toBe(2); // was 3, shifts down by 1
    expect(byId.d).toBe(3); // was 4, shifts down by 1
    expect(result!.rankingMetadata!.rankedCoasters).toEqual(["a", "c", "d"]);
    expect(result!.rankingMetadata!.isRanked).toBe(true);
  });

  it("removing an unranked coaster leaves every rankPosition untouched and isRanked false if the collection isn't fully ranked", () => {
    const currentData = makeUploadedData(
      [
        makeCoaster({ id: "a", rankPosition: 1 }),
        makeCoaster({ id: "b", rankPosition: 2 }),
        makeCoaster({ id: "c" }), // unranked
        makeCoaster({ id: "d" }), // unranked
      ],
      {
        completedComparisons: new Set(),
        rankedCoasters: ["a", "b"],
        isRanked: false,
      },
    );

    const result = removeCoaster(currentData, "c");

    const byId = Object.fromEntries(
      result!.coasters.map((c) => [c.id, c.rankPosition]),
    );
    expect(byId.a).toBe(1);
    expect(byId.b).toBe(2);
    expect(byId.d).toBeUndefined();
    expect(result!.rankingMetadata!.rankedCoasters).toEqual(["a", "b"]);
    expect(result!.rankingMetadata!.isRanked).toBe(false);
  });

  it("returns null when removing the last remaining coaster", () => {
    const currentData = makeUploadedData([makeCoaster({ id: "only" })]);

    const result = removeCoaster(currentData, "only");

    expect(result).toBeNull();
  });

  it("leaves rankingMetadata untouched (undefined) when the collection has none", () => {
    const currentData = makeUploadedData([
      makeCoaster({ id: "a" }),
      makeCoaster({ id: "b" }),
    ]);

    const result = removeCoaster(currentData, "a");

    expect(result!.coasters.map((c) => c.id)).toEqual(["b"]);
    expect(result!.rankingMetadata).toBeUndefined();
  });

  it("filters out completedComparisons that exactly involve the removed coaster's id", () => {
    const currentData = makeUploadedData(
      [
        makeCoaster({ id: "1" }),
        makeCoaster({ id: "2" }),
        makeCoaster({ id: "3" }),
      ],
      {
        completedComparisons: new Set(["1-2", "2-3"]),
        rankedCoasters: [],
        isRanked: false,
      },
    );

    const result = removeCoaster(currentData, "1");

    expect(Array.from(result!.rankingMetadata!.completedComparisons)).toEqual(
      ["2-3"],
    );
  });

  it("only strips comparisons that actually involve the removed coaster, even when its id is a substring of another id", () => {
    const currentData = makeUploadedData(
      [
        makeCoaster({ id: "5" }),
        makeCoaster({ id: "15" }),
        makeCoaster({ id: "3" }),
        makeCoaster({ id: "8" }),
        makeCoaster({ id: "2" }),
      ],
      {
        // "5-3" genuinely involves coaster "5".
        // "15-3" involves coaster "15" and "3" only - NOT coaster "5", even
        // though the string "15-3" contains "5" as a substring (from "15").
        // "8-2" involves neither.
        completedComparisons: new Set(["5-3", "15-3", "8-2"]),
        rankedCoasters: [],
        isRanked: false,
      },
    );

    const result = removeCoaster(currentData, "5");
    const remaining = Array.from(result!.rankingMetadata!.completedComparisons);

    expect(remaining).not.toContain("5-3"); // genuinely involves coaster "5"
    expect(remaining).toContain("15-3"); // belongs to coaster "15", not "5"
    expect(remaining).toContain("8-2"); // unrelated comparison
  });

  it("works the same way for an all-dark-ride collection", () => {
    const currentData = makeUploadedData(
      [
        makeCoaster({ id: "a", type: "dark-ride", rankPosition: 1 }),
        makeCoaster({ id: "b", type: "dark-ride", rankPosition: 2 }),
        makeCoaster({ id: "c", type: "dark-ride", rankPosition: 3 }),
      ],
      {
        completedComparisons: new Set(),
        rankedCoasters: ["a", "b", "c"],
        isRanked: true,
      },
    );

    const result = removeCoaster(currentData, "a");

    expect(result!.coasters.every((c) => c.type === "dark-ride")).toBe(true);
    const byId = Object.fromEntries(
      result!.coasters.map((c) => [c.id, c.rankPosition]),
    );
    expect(byId.b).toBe(1);
    expect(byId.c).toBe(2);
    expect(result!.rankingMetadata!.isRanked).toBe(true);
  });
});

describe("updateCoaster", () => {
  it("updates only the targeted coaster, leaving all others unchanged", () => {
    const a = makeCoaster({ id: "a", name: "Original A" });
    const b = makeCoaster({ id: "b", name: "Original B" });
    const currentData = makeUploadedData([a, b]);

    const result = updateCoaster(currentData, "a", { name: "Updated A" });

    expect(result.coasters.find((c) => c.id === "a")!.name).toBe("Updated A");
    expect(result.coasters.find((c) => c.id === "b")).toEqual(b);
  });

  it("only touches the given fields, preserving everything else on the target coaster", () => {
    const coaster = makeCoaster({
      id: "a",
      name: "Name",
      park: "Original Park",
      manufacturer: "Original Manufacturer",
    });
    const currentData = makeUploadedData([coaster]);

    const result = updateCoaster(currentData, "a", { park: "New Park" });

    const updated = result.coasters[0];
    expect(updated.park).toBe("New Park");
    expect(updated.name).toBe("Name");
    expect(updated.manufacturer).toBe("Original Manufacturer");
  });

  it("is a no-op on the array contents when the id doesn't match any coaster", () => {
    const currentData = makeUploadedData([makeCoaster({ id: "a" })]);

    const result = updateCoaster(currentData, "missing", { name: "X" });

    expect(result.coasters).toEqual(currentData.coasters);
  });

  it("works the same way for a dark-ride entry", () => {
    const currentData = makeUploadedData([
      makeCoaster({ id: "a", type: "dark-ride", name: "Haunted Mansion" }),
    ]);

    const result = updateCoaster(currentData, "a", { name: "The Haunted Mansion" });

    expect(result.coasters[0].name).toBe("The Haunted Mansion");
    expect(result.coasters[0].type).toBe("dark-ride");
  });
});

describe("getUniqueFieldValues", () => {
  it("returns sorted unique values for a field", () => {
    const coasters = [
      makeCoaster({ manufacturer: "Zamperla" }),
      makeCoaster({ manufacturer: "B&M" }),
      makeCoaster({ manufacturer: "Vekoma" }),
      makeCoaster({ manufacturer: "B&M" }), // duplicate
    ];

    expect(getUniqueFieldValues(coasters, "manufacturer")).toEqual([
      "B&M",
      "Vekoma",
      "Zamperla",
    ]);
  });

  it("works for the park field", () => {
    const coasters = [
      makeCoaster({ park: "Cedar Point" }),
      makeCoaster({ park: "Alton Towers" }),
    ];

    expect(getUniqueFieldValues(coasters, "park")).toEqual([
      "Alton Towers",
      "Cedar Point",
    ]);
  });

  it("skips undefined/empty values and never produces a spurious 'undefined' entry (relevant since dark rides often lack a model)", () => {
    const coasters = [
      makeCoaster({ model: "Invert" }),
      makeCoaster({ type: "dark-ride" }), // no model field at all
      makeCoaster({ model: "" }), // empty string
      makeCoaster({ model: "Invert" }), // duplicate
    ];

    const result = getUniqueFieldValues(coasters, "model");

    expect(result).toEqual(["Invert"]);
    expect(result).not.toContain("undefined");
  });

  it("returns an empty array for an empty coasters array", () => {
    expect(getUniqueFieldValues([], "park")).toEqual([]);
  });
});

describe("hasAnyRanking", () => {
  it("returns true when rankingMetadata.isRanked is true, regardless of individual rankPositions", () => {
    const coasters = [makeCoaster({ id: "a" }), makeCoaster({ id: "b" })];
    const rankingMetadata: RankingMetadata = {
      completedComparisons: new Set(),
      rankedCoasters: [],
      isRanked: true,
    };

    expect(hasAnyRanking(coasters, rankingMetadata)).toBe(true);
  });

  it("returns true for a partial ranking (isRanked false/absent but at least one rankPosition set)", () => {
    const coasters = [
      makeCoaster({ id: "a", rankPosition: 1 }),
      makeCoaster({ id: "b" }),
    ];

    expect(
      hasAnyRanking(coasters, {
        completedComparisons: new Set(),
        rankedCoasters: ["a"],
        isRanked: false,
      }),
    ).toBe(true);
    expect(hasAnyRanking(coasters, undefined)).toBe(true);
  });

  it("returns false when there's no ranking metadata and no coaster has a rankPosition", () => {
    const coasters = [makeCoaster({ id: "a" }), makeCoaster({ id: "b" })];

    expect(hasAnyRanking(coasters)).toBe(false);
  });

  it("returns false for an empty coasters array with no metadata", () => {
    expect(hasAnyRanking([])).toBe(false);
  });

  it("is unaffected by the coasters' type field - true for a fully-ranked all-dark-ride collection", () => {
    const coasters = [
      makeCoaster({ id: "a", type: "dark-ride", rankPosition: 1 }),
      makeCoaster({ id: "b", type: "dark-ride", rankPosition: 2 }),
    ];

    expect(
      hasAnyRanking(coasters, {
        completedComparisons: new Set(),
        rankedCoasters: ["a", "b"],
        isRanked: true,
      }),
    ).toBe(true);
  });

  it("is unaffected by the coasters' type field - false for an unranked all-dark-ride collection", () => {
    const coasters = [
      makeCoaster({ id: "a", type: "dark-ride" }),
      makeCoaster({ id: "b", type: "dark-ride" }),
    ];

    expect(hasAnyRanking(coasters)).toBe(false);
  });
});
