import { describe, expect, it } from "vitest";
import { Coaster } from "../../types/data";
import { generateJSON } from "./generateJSON.util";

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster =>
  ({
    id: overrides.id ?? overrides.name ?? "id",
    name: "Coaster",
    park: "Park",
    country: "Country",
    manufacturer: "Manufacturer",
    ...overrides,
  }) as Coaster;

describe("generateJSON", () => {
  it("returns a fixed empty payload for an empty coaster list", () => {
    const result = generateJSON({ coasters: [] });

    expect(result).toEqual({
      content: '{"coasters": [], "totalCount": 0}',
      isEmpty: true,
      itemCount: 0,
    });
  });

  it("produces valid, parseable JSON containing the coaster data plus metadata by default", () => {
    const coasters = [makeCoaster({ name: "Steel Vengeance" })];

    const result = generateJSON({ coasters });
    const parsed = JSON.parse(result.content);

    expect(result.isEmpty).toBe(false);
    expect(parsed.coasters).toHaveLength(1);
    expect(parsed.coasters[0].name).toBe("Steel Vengeance");
    expect(parsed.totalCount).toBe(1);
    expect(parsed.source).toBe("Coaster Ranker");
    expect(typeof parsed.exportedAt).toBe("string");
  });

  it("includes openingYear when present on the source coaster (issue #44)", () => {
    const coasters = [makeCoaster({ name: "Nemesis", openingYear: 1994 })];

    const result = generateJSON({ coasters });
    const parsed = JSON.parse(result.content);

    expect(parsed.coasters[0].openingYear).toBe(1994);
  });

  it("itemCount reflects the number of coasters exported", () => {
    const coasters = [
      makeCoaster({ id: "1", name: "A" }),
      makeCoaster({ id: "2", name: "B" }),
      makeCoaster({ id: "3", name: "C" }),
    ];

    const result = generateJSON({ coasters });

    expect(result.itemCount).toBe(3);
  });

  it("omits the metadata wrapper when includeMetadata is false, returning a bare array", () => {
    const coasters = [makeCoaster({ name: "Nemesis" })];

    const result = generateJSON({ coasters, includeMetadata: false });
    const parsed = JSON.parse(result.content);

    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0].name).toBe("Nemesis");
  });

  it("merges customMetadata into the wrapper alongside the standard fields", () => {
    const coasters = [makeCoaster({ name: "Nemesis" })];

    const result = generateJSON({
      coasters,
      customMetadata: { rideType: "coaster" },
    });
    const parsed = JSON.parse(result.content);

    expect(parsed.rideType).toBe("coaster");
    expect(parsed.source).toBe("Coaster Ranker");
  });

  describe("includeRanking: true", () => {
    it("adds a rank field derived from rankPosition and sorts by it", () => {
      const coasters = [
        makeCoaster({ id: "a", name: "Alpha", rankPosition: 2 }),
        makeCoaster({ id: "b", name: "Bravo", rankPosition: 1 }),
      ];

      const result = generateJSON({ coasters, includeRanking: true });
      const parsed = JSON.parse(result.content);

      expect(parsed.coasters.map((c: { name: string }) => c.name)).toEqual([
        "Bravo",
        "Alpha",
      ]);
      expect(parsed.coasters[0].rank).toBe(1);
      expect(parsed.coasters[1].rank).toBe(2);
    });
  });

  describe("includeRanking: false (default) - parity with CSV's field-stripping", () => {
    it("strips internal tracking fields (isPreRanked, isNewCoaster, originalRankPosition, rankPosition) even when present on the source coaster", () => {
      // Regression: generateJSON used to use a different cleaner
      // (cleanCoasterData) than generateCSV's equivalent default path
      // (cleanCoasterDataForExport), so the same "exclude ranking" request
      // produced a different set of retained fields depending on export
      // format. Both now use cleanCoasterDataForExport, so this must strip
      // exactly like the CSV export does.
      const coasters = [
        makeCoaster({
          name: "Steel Vengeance",
          rankPosition: 1,
          isPreRanked: true,
          isNewCoaster: true,
          originalRankPosition: 3,
        }),
      ];

      const result = generateJSON({ coasters });
      const parsed = JSON.parse(result.content);
      const exported = parsed.coasters[0];

      expect(exported).not.toHaveProperty("isPreRanked");
      expect(exported).not.toHaveProperty("isNewCoaster");
      expect(exported).not.toHaveProperty("originalRankPosition");
      expect(exported).not.toHaveProperty("rankPosition");
    });

    it("does not add tracking fields that were absent on the source coaster", () => {
      const coasters = [makeCoaster({ name: "Plain Coaster" })];

      const result = generateJSON({ coasters });
      const parsed = JSON.parse(result.content);
      const exported = parsed.coasters[0];

      expect(exported).not.toHaveProperty("isPreRanked");
      expect(exported).not.toHaveProperty("isNewCoaster");
      expect(exported).not.toHaveProperty("originalRankPosition");
      expect(exported).not.toHaveProperty("rankPosition");
    });
  });

  it("supports an all-dark-ride export, including dark rides with no model/material/thrillLevel", () => {
    const coasters = [
      makeCoaster({
        id: "dr1",
        name: "Haunted Mansion",
        park: "Magic Kingdom",
        type: "dark-ride",
      }),
      makeCoaster({
        id: "dr2",
        name: "Ghost Train",
        park: "Blackpool",
        type: "dark-ride",
        rankPosition: 1,
      }),
    ];

    const result = generateJSON({ coasters, includeRanking: true });
    const parsed = JSON.parse(result.content);

    expect(parsed.totalCount).toBe(2);
    expect(
      parsed.coasters.some((c: { name: string }) => c.name === "Haunted Mansion"),
    ).toBe(true);
    expect(
      parsed.coasters.some((c: { name: string }) => c.name === "Ghost Train"),
    ).toBe(true);
  });
});
