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
      dataSize: 0,
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

  it("dataSize reflects the coaster count, not a byte size", () => {
    const coasters = [
      makeCoaster({ id: "1", name: "A" }),
      makeCoaster({ id: "2", name: "B" }),
      makeCoaster({ id: "3", name: "C" }),
    ];

    const result = generateJSON({ coasters });

    expect(result.dataSize).toBe(3);
    // dataSize is just coasters.length - it does not track the actual
    // serialized byte length of result.content, despite the name.
    expect(result.dataSize).not.toBe(result.content.length);
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

  describe("includeRanking: false (default) - cross-format field-stripping mismatch with CSV", () => {
    it("KEEPS internal tracking fields (isPreRanked, isNewCoaster, originalRankPosition, rankPosition) when they're present on the source coaster", () => {
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

      // Unlike generateCSV's default (includeRanking: false) path - which uses
      // cleanCoasterDataForExport and strips ALL of these - generateJSON's
      // default path uses cleanCoasterData, which preserves them whenever they
      // were set on the input. This is a real, current cross-format
      // inconsistency: the same "exclude ranking" request produces a
      // different set of retained fields depending on export format.
      expect(exported.isPreRanked).toBe(true);
      expect(exported.isNewCoaster).toBe(true);
      expect(exported.originalRankPosition).toBe(3);
      expect(exported.rankPosition).toBe(1);
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
