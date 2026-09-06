import { describe, expect, it } from "vitest";
import { Coaster, UploadedData } from "../../types/data";
import { combineCoasterData } from "./combineCoasterData.util";

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster =>
  ({
    id: overrides.id ?? overrides.name ?? "id",
    name: "Coaster",
    park: "Park",
    country: "Country",
    manufacturer: "Manufacturer",
    ...overrides,
  }) as Coaster;

const makeUploadedData = (
  overrides: Partial<UploadedData> = {},
): UploadedData => ({
  coasters: [],
  uploadedAt: new Date("2024-01-01"),
  filename: "existing.csv",
  ...overrides,
});

describe("combineCoasterData", () => {
  it("creates a fresh dataset when there is no existing data", () => {
    const newCoasters = [
      makeCoaster({ id: "a", name: "Nemesis" }),
      makeCoaster({ id: "b", name: "Fury 325" }),
    ];

    const result = combineCoasterData({
      newCoasters,
      filename: "upload.csv",
      existingData: null,
    });

    expect(result.newCoasterCount).toBe(2);
    expect(result.totalCount).toBe(2);
    expect(result.combinedData.coasters).toHaveLength(2);
    expect(result.combinedData.filename).toBe("upload.csv");
    expect(result.combinedData.rankingMetadata?.isRanked).toBe(false);
    expect(result.combinedData.rankingMetadata?.rankedCoasters).toEqual([]);
    expect(result.combinedData.rankingMetadata?.hasPreRankedCoasters).toBe(
      false,
    );
  });

  it("appends new coasters to existing data and joins filenames", () => {
    const existingData = makeUploadedData({
      coasters: [makeCoaster({ id: "existing-1", name: "Steel Vengeance" })],
      filename: "existing.csv",
    });
    const newCoasters = [makeCoaster({ id: "new-1", name: "Fury 325" })];

    const result = combineCoasterData({
      newCoasters,
      filename: "new.csv",
      existingData,
    });

    expect(result.newCoasterCount).toBe(1);
    expect(result.totalCount).toBe(2);
    expect(result.combinedData.filename).toBe("existing.csv, new.csv");
    expect(result.combinedData.coasters.map((c) => c.id)).toEqual(
      expect.arrayContaining(["existing-1", "new-1"]),
    );
  });

  it("marks new coasters as pre-ranked with an original position when isPreRanked is true", () => {
    const newCoasters = [
      makeCoaster({ id: "a", name: "Nemesis" }),
      makeCoaster({ id: "b", name: "Fury 325" }),
    ];

    const result = combineCoasterData({
      newCoasters,
      filename: "upload.csv",
      existingData: null,
      isPreRanked: true,
    });

    const a = result.combinedData.coasters.find((c) => c.id === "a");
    const b = result.combinedData.coasters.find((c) => c.id === "b");

    expect(a?.isPreRanked).toBe(true);
    expect(a?.originalRankPosition).toBe(0);
    expect(b?.originalRankPosition).toBe(1);
    expect(result.combinedData.rankingMetadata?.hasPreRankedCoasters).toBe(
      true,
    );
    expect(result.combinedData.rankingMetadata?.preRankedGroups).toHaveLength(
      1,
    );
  });

  it("builds rankedCoasters from rankPosition data already present on the new coasters (e.g. from a CSV rank column)", () => {
    const newCoasters = [
      makeCoaster({ id: "a", name: "Nemesis", rankPosition: 2 }),
      makeCoaster({ id: "b", name: "Fury 325", rankPosition: 1 }),
    ];

    const result = combineCoasterData({
      newCoasters,
      filename: "upload.csv",
      existingData: null,
    });

    expect(result.combinedData.rankingMetadata?.isRanked).toBe(true);
    expect(result.combinedData.rankingMetadata?.rankedCoasters).toEqual([
      "b",
      "a",
    ]);
  });

  it("guarantees unique ids even when a new coaster collides with an existing one", () => {
    const existingData = makeUploadedData({
      coasters: [makeCoaster({ id: "005", name: "Steel Vengeance" })],
    });
    const newCoasters = [makeCoaster({ id: "005", name: "Fury 325" })];

    const result = combineCoasterData({
      newCoasters,
      filename: "new.csv",
      existingData,
    });

    const ids = result.combinedData.coasters.map((c) => c.id);
    expect(new Set(ids).size).toBe(result.combinedData.coasters.length);
  });

  it("combines dark-ride coasters the same way as coasters", () => {
    const newCoasters = [
      makeCoaster({ id: "a", name: "Haunted Mansion", type: "dark-ride" }),
      makeCoaster({ id: "b", name: "Pirates", type: "dark-ride" }),
    ];

    const result = combineCoasterData({
      newCoasters,
      filename: "dark-rides.csv",
      existingData: null,
    });

    expect(result.newCoasterCount).toBe(2);
    expect(result.totalCount).toBe(2);
    expect(
      result.combinedData.coasters.every((c) => c.type === "dark-ride"),
    ).toBe(true);
  });
});
