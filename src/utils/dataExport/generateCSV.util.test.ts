import { describe, expect, it } from "vitest";
import { Coaster } from "../../types/data";
import { generateCSV } from "./generateCSV.util";

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster =>
  ({
    id: overrides.id ?? overrides.name ?? "id",
    name: "Coaster",
    park: "Park",
    country: "Country",
    manufacturer: "Manufacturer",
    ...overrides,
  }) as Coaster;

describe("generateCSV", () => {
  it("returns an empty result for an empty coaster list, with no header row", () => {
    const result = generateCSV({ coasters: [] });

    expect(result).toEqual({ content: "", isEmpty: true, rowCount: 0 });
  });

  it("generates a header row and one data row per coaster, without a rank column by default", () => {
    const coasters = [
      makeCoaster({ name: "Steel Vengeance", park: "Cedar Point" }),
    ];

    const result = generateCSV({ coasters });

    expect(result.isEmpty).toBe(false);
    expect(result.rowCount).toBe(1);
    const [header, ...rows] = result.content.split("\n");
    expect(header).toBe(
      "name,park,country,manufacturer,model,material,thrillLevel",
    );
    expect(rows).toEqual([
      "Steel Vengeance,Cedar Point,Country,Manufacturer,,,",
    ]);
  });

  it("quotes and escapes values containing commas, quotes, or newlines", () => {
    const coasters = [
      makeCoaster({
        name: 'Six "Flags" Magic Mountain, Home of Coasters',
        park: "Park\nWith Newline",
      }),
    ];

    const result = generateCSV({ coasters });

    // Check against the full content string rather than a split-by-line piece,
    // since the embedded "\n" inside the quoted park field would otherwise
    // itself be split on by a naive line-split.
    expect(result.content).toContain(
      '"Six ""Flags"" Magic Mountain, Home of Coasters"',
    );
    expect(result.content).toContain('"Park\nWith Newline"');
  });

  it("leaves missing optional fields (model/material/thrillLevel) as empty cells, not the literal text undefined", () => {
    const coasters = [
      makeCoaster({ name: "Ghost Train", type: "dark-ride" }),
    ];

    const result = generateCSV({ coasters });
    const [, dataRow] = result.content.split("\n");

    expect(dataRow).not.toContain("undefined");
    expect(dataRow).not.toContain("null");
    expect(dataRow.endsWith(",,,")).toBe(true);
  });

  describe("includeRanking: true", () => {
    it("adds a leading rank column populated from rankPosition", () => {
      const coasters = [
        makeCoaster({ name: "Fury 325", rankPosition: 1 }),
        makeCoaster({ name: "Maverick", rankPosition: 2 }),
      ];

      const result = generateCSV({ coasters, includeRanking: true });
      const [header, row1, row2] = result.content.split("\n");

      expect(header).toBe(
        "rank,name,park,country,manufacturer,model,material,thrillLevel",
      );
      expect(row1.startsWith("1,Fury 325")).toBe(true);
      expect(row2.startsWith("2,Maverick")).toBe(true);
    });

    it("falls back to rankingMetadata.rankedCoasters order when a coaster has no rankPosition of its own", () => {
      const coasters = [
        makeCoaster({ id: "a", name: "Alpha" }),
        makeCoaster({ id: "b", name: "Bravo" }),
      ];

      const result = generateCSV({
        coasters,
        includeRanking: true,
        rankingMetadata: { isRanked: true, rankedCoasters: ["b", "a"] },
      });
      const rows = result.content.split("\n").slice(1);

      expect(rows[0].startsWith("1,Bravo")).toBe(true);
      expect(rows[1].startsWith("2,Alpha")).toBe(true);
    });
  });

  describe("includeRanking: false (default)", () => {
    it("strips internal tracking fields even if present on the source coasters", () => {
      const coasters = [
        makeCoaster({
          name: "Steel Vengeance",
          rankPosition: 1,
          isPreRanked: true,
          isNewCoaster: true,
          originalRankPosition: 3,
        }),
      ];

      const result = generateCSV({
        coasters,
        headers: [
          "name",
          "rankPosition",
          "isPreRanked",
          "isNewCoaster",
          "originalRankPosition",
        ],
      });
      const [, dataRow] = result.content.split("\n");

      // cleanCoasterDataForExport only keeps name/park/country/manufacturer/model/material/thrillLevel,
      // so every one of these extra columns comes back empty even though the header was requested.
      expect(dataRow).toBe("Steel Vengeance,,,,");
    });
  });

  it("respects a custom headers list, including columns that don't exist on the cleaned data", () => {
    const coasters = [makeCoaster({ name: "Nemesis", country: "UK" })];

    const result = generateCSV({ coasters, headers: ["country", "name"] });
    const [header, dataRow] = result.content.split("\n");

    expect(header).toBe("country,name");
    expect(dataRow).toBe("UK,Nemesis");
  });

  it("supports an all-dark-ride export", () => {
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

    const result = generateCSV({ coasters, includeRanking: true });

    expect(result.rowCount).toBe(2);
    expect(result.content).toContain("Haunted Mansion");
    expect(result.content).toContain("Ghost Train");
  });
});
