import { describe, expect, it } from "vitest";
import { Coaster, UploadedData } from "../../types/data";
import {
  addRankingToCoasterData,
  hasRankingDataForExport,
} from "./cleanCoasterData.util";

const makeCoaster = (overrides: Partial<Coaster>): Coaster =>
  ({
    id: overrides.id ?? overrides.name ?? "id",
    name: "Coaster",
    park: "Park",
    country: "Country",
    manufacturer: "Manufacturer",
    ...overrides,
  }) as Coaster;

describe("addRankingToCoasterData - rank ordering", () => {
  it("sorts by rankPosition ascending regardless of input order", () => {
    const coasters = [
      makeCoaster({ name: "Third", rankPosition: 3 }),
      makeCoaster({ name: "First", rankPosition: 1 }),
      makeCoaster({ name: "Second", rankPosition: 2 }),
    ];

    const result = addRankingToCoasterData(coasters);

    expect(result.map((c) => c.name)).toEqual(["First", "Second", "Third"]);
    expect(result.map((c) => c.rank)).toEqual([1, 2, 3]);
  });

  it("orders by rankedCoasters metadata when rankPosition is absent", () => {
    const coasters = [
      makeCoaster({ id: "c", name: "Charlie" }),
      makeCoaster({ id: "a", name: "Alpha" }),
      makeCoaster({ id: "b", name: "Bravo" }),
    ];

    const result = addRankingToCoasterData(coasters, {
      isRanked: true,
      rankedCoasters: ["a", "b", "c"],
    });

    expect(result.map((c) => c.name)).toEqual(["Alpha", "Bravo", "Charlie"]);
    expect(result.map((c) => c.rank)).toEqual([1, 2, 3]);
  });

  it("places unranked coasters after ranked ones, preserving their order", () => {
    const coasters = [
      makeCoaster({ name: "Unranked A" }),
      makeCoaster({ name: "Ranked 2", rankPosition: 2 }),
      makeCoaster({ name: "Unranked B" }),
      makeCoaster({ name: "Ranked 1", rankPosition: 1 }),
    ];

    const result = addRankingToCoasterData(coasters);

    expect(result.map((c) => c.name)).toEqual([
      "Ranked 1",
      "Ranked 2",
      "Unranked A",
      "Unranked B",
    ]);
  });
});

describe("addRankingToCoasterData - Number 0", () => {
  it("exports a Number 0 coaster as rank 0, sorted before rank 1", () => {
    const coasters = [
      makeCoaster({ name: "First", rankPosition: 1 }),
      makeCoaster({ name: "Zero", isNumberZero: true }),
      makeCoaster({ name: "Second", rankPosition: 2 }),
    ];

    const result = addRankingToCoasterData(coasters);

    expect(result.map((c) => c.name)).toEqual(["Zero", "First", "Second"]);
    expect(result.map((c) => c.rank)).toEqual([0, 1, 2]);
  });

  it("takes priority over any rankPosition/rankedCoasters fallback on the same coaster", () => {
    const coasters = [
      makeCoaster({
        id: "z",
        name: "Zero",
        isNumberZero: true,
        rankPosition: undefined,
      }),
    ];

    const result = addRankingToCoasterData(coasters, {
      isRanked: true,
      rankedCoasters: ["z"],
    });

    expect(result[0].rank).toBe(0);
  });
});

describe("hasRankingDataForExport", () => {
  const makeUploadedData = (
    overrides: Partial<UploadedData> = {},
  ): UploadedData => ({
    coasters: [],
    uploadedAt: new Date("2024-01-01"),
    filename: "test.csv",
    ...overrides,
  });

  it("returns true when a Number 0 coaster exists, even with no other ranking signal at all", () => {
    const uploadedData = makeUploadedData({
      coasters: [
        makeCoaster({ id: "z", name: "Zero", isNumberZero: true }),
        makeCoaster({ id: "u", name: "Unranked" }),
      ],
    });

    expect(hasRankingDataForExport(uploadedData)).toBe(true);
  });

  it("returns true for a normal completed ranking (regression)", () => {
    const uploadedData = makeUploadedData({
      coasters: [makeCoaster({ id: "a", rankPosition: 1 })],
      rankingMetadata: {
        completedComparisons: new Set(),
        rankedCoasters: ["a"],
        isRanked: true,
      },
    });

    expect(hasRankingDataForExport(uploadedData)).toBe(true);
  });

  it("returns false when there is no ranking data and no Number 0", () => {
    const uploadedData = makeUploadedData({
      coasters: [makeCoaster({ id: "a" }), makeCoaster({ id: "b" })],
    });

    expect(hasRankingDataForExport(uploadedData)).toBe(false);
  });

  it("returns false for null uploadedData", () => {
    expect(hasRankingDataForExport(null)).toBe(false);
  });
});
