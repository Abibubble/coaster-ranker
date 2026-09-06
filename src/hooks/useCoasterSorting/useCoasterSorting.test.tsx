import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Coaster, RankingMetadata, UploadedData } from "../../types/data";
import { useCoasterSorting } from "./useCoasterSorting";

const makeCoaster = (overrides: Partial<Coaster>): Coaster => ({
  id: overrides.id ?? overrides.name ?? "id",
  name: "Coaster",
  park: "Park",
  country: "Country",
  manufacturer: "Manufacturer",
  ...overrides,
});

const makeRankingMetadata = (
  overrides: Partial<RankingMetadata> = {},
): RankingMetadata => ({
  completedComparisons: new Set<string>(),
  rankedCoasters: [],
  isRanked: false,
  ...overrides,
});

const makeUploadedData = (
  coasters: Coaster[],
  rankingMetadata?: RankingMetadata,
): UploadedData => ({
  coasters,
  uploadedAt: new Date(),
  filename: "test.csv",
  rankingMetadata,
});

const steelVengeance = makeCoaster({
  id: "1",
  name: "Steel Vengeance",
  park: "Cedar Point",
  country: "United States",
  manufacturer: "Rocky Mountain Construction",
  model: "I-Box",
  material: "Hybrid",
  thrillLevel: "Thrill",
});

const fury325 = makeCoaster({
  id: "2",
  name: "Fury 325",
  park: "Carowinds",
  country: "United States",
  manufacturer: "Bolliger & Mabillard",
  model: "Giga",
  material: "Steel",
  thrillLevel: "Thrill",
});

const maverick = makeCoaster({
  id: "3",
  name: "Maverick",
  park: "Cedar Point",
  country: "United States",
  manufacturer: "Intamin",
  model: "Blitz",
  material: "Steel",
  thrillLevel: "Family Thrill",
});

const coasterCollection = [steelVengeance, fury325, maverick];

const hauntedMansion = makeCoaster({
  id: "4",
  name: "Haunted Mansion",
  park: "Magic Kingdom",
  country: "United States",
  manufacturer: "Disney",
  type: "dark-ride",
});

const pirates = makeCoaster({
  id: "5",
  name: "Pirates of the Caribbean",
  park: "Disneyland",
  country: "United States",
  manufacturer: "Disney",
  type: "dark-ride",
});

const darkRideCollection = [hauntedMansion, pirates];

describe("useCoasterSorting", () => {
  describe("explicit sort", () => {
    const stringFields: Array<keyof Coaster> = [
      "name",
      "park",
      "manufacturer",
      "country",
      "model",
      "material",
      "thrillLevel",
    ];

    it.each(stringFields)(
      "sorts ascending and descending by %s (case-insensitive)",
      (field) => {
        const mixedCase = coasterCollection.map((c) => ({ ...c }));
        const { result } = renderHook(() =>
          useCoasterSorting(mixedCase, null),
        );

        act(() =>
          result.current.handleSort(field as any, "asc"),
        );
        const asc = result.current.sortedCoasters.map((c) => c[field]);
        const ascSorted = [...asc].sort((a, b) =>
          String(a).toLowerCase().localeCompare(String(b).toLowerCase()),
        );
        expect(asc.map((v) => String(v).toLowerCase())).toEqual(
          ascSorted.map((v) => String(v).toLowerCase()),
        );

        act(() => result.current.handleSort(field as any, "desc"));
        const desc = result.current.sortedCoasters.map((c) => c[field]);
        expect(desc).toEqual([...asc].reverse());
      },
    );

    it("sorts by rankPosition ascending and descending", () => {
      const ranked = [
        { ...steelVengeance, rankPosition: 3 },
        { ...fury325, rankPosition: 1 },
        { ...maverick, rankPosition: 2 },
      ];
      const { result } = renderHook(() => useCoasterSorting(ranked, null));

      act(() => result.current.handleSort("rankPosition", "asc"));
      expect(result.current.sortedCoasters.map((c) => c.name)).toEqual([
        "Fury 325",
        "Maverick",
        "Steel Vengeance",
      ]);

      act(() => result.current.handleSort("rankPosition", "desc"));
      expect(result.current.sortedCoasters.map((c) => c.name)).toEqual([
        "Steel Vengeance",
        "Maverick",
        "Fury 325",
      ]);
    });

    it("sorts coasters without a rankPosition to the end (treated as MAX_SAFE_INTEGER)", () => {
      const partiallyRanked = [
        { ...steelVengeance, rankPosition: 1 },
        fury325, // no rankPosition
        maverick, // no rankPosition
      ];
      const { result } = renderHook(() =>
        useCoasterSorting(partiallyRanked, null),
      );

      act(() => result.current.handleSort("rankPosition", "asc"));

      expect(result.current.sortedCoasters[0].name).toBe("Steel Vengeance");
      expect(
        result.current.sortedCoasters.slice(1).map((c) => c.rankPosition),
      ).toEqual([undefined, undefined]);
    });
  });

  describe("default sort (no explicit currentSort)", () => {
    it("leaves input order unchanged when there is no ranking data at all", () => {
      const { result } = renderHook(() =>
        useCoasterSorting(coasterCollection, null),
      );

      expect(result.current.sortedCoasters.map((c) => c.name)).toEqual([
        "Steel Vengeance",
        "Fury 325",
        "Maverick",
      ]);
    });

    it("defaults to ascending rank order when rankingMetadata.isRanked is true", () => {
      const ranked = [
        { ...steelVengeance, rankPosition: 3 },
        { ...fury325, rankPosition: 1 },
        { ...maverick, rankPosition: 2 },
      ];
      const currentData = makeUploadedData(
        ranked,
        makeRankingMetadata({ isRanked: true, rankedCoasters: ["2", "3", "1"] }),
      );
      const { result } = renderHook(() =>
        useCoasterSorting(ranked, currentData),
      );

      expect(result.current.sortedCoasters.map((c) => c.name)).toEqual([
        "Fury 325",
        "Maverick",
        "Steel Vengeance",
      ]);
    });

    it("defaults to ascending rank order for a PARTIAL ranking (isRanked false, some rankPosition set) via hasAnyRanking", () => {
      const partiallyRanked = [
        { ...steelVengeance, rankPosition: 2 },
        fury325, // not yet ranked
        { ...maverick, rankPosition: 1 },
      ];
      const currentData = makeUploadedData(
        partiallyRanked,
        makeRankingMetadata({ isRanked: false }),
      );
      const { result } = renderHook(() =>
        useCoasterSorting(partiallyRanked, currentData),
      );

      // rank-based default sort: Maverick (1), Steel Vengeance (2), then
      // unranked Fury 325 sorts to the end (MAX_SAFE_INTEGER).
      expect(result.current.sortedCoasters.map((c) => c.name)).toEqual([
        "Maverick",
        "Steel Vengeance",
        "Fury 325",
      ]);
    });

    it("does not rank-sort when rankingMetadata exists but is not ranked and no coaster has a rankPosition", () => {
      const currentData = makeUploadedData(
        coasterCollection,
        makeRankingMetadata({ isRanked: false }),
      );
      const { result } = renderHook(() =>
        useCoasterSorting(coasterCollection, currentData),
      );

      expect(result.current.sortedCoasters.map((c) => c.name)).toEqual([
        "Steel Vengeance",
        "Fury 325",
        "Maverick",
      ]);
    });
  });

  describe("handleClearSort", () => {
    it("returns to the rank-based default (not a fixed unsorted state) once an explicit sort is cleared", () => {
      const ranked = [
        { ...steelVengeance, rankPosition: 3 },
        { ...fury325, rankPosition: 1 },
        { ...maverick, rankPosition: 2 },
      ];
      const currentData = makeUploadedData(
        ranked,
        makeRankingMetadata({ isRanked: true, rankedCoasters: ["2", "3", "1"] }),
      );
      const { result } = renderHook(() =>
        useCoasterSorting(ranked, currentData),
      );

      act(() => result.current.handleSort("name", "asc"));
      expect(result.current.currentSort).toEqual({
        field: "name",
        direction: "asc",
      });

      act(() => result.current.handleClearSort());

      expect(result.current.currentSort).toBeNull();
      expect(result.current.sortedCoasters.map((c) => c.name)).toEqual([
        "Fury 325",
        "Maverick",
        "Steel Vengeance",
      ]);
    });
  });

  describe("dark-ride collections (no model/material/thrillLevel)", () => {
    it("sorts by name/park/country/rankPosition without crashing", () => {
      const { result } = renderHook(() =>
        useCoasterSorting(darkRideCollection, null),
      );

      act(() => result.current.handleSort("name", "asc"));
      expect(result.current.sortedCoasters.map((c) => c.name)).toEqual([
        "Haunted Mansion",
        "Pirates of the Caribbean",
      ]);

      act(() => result.current.handleSort("park", "asc"));
      expect(result.current.sortedCoasters).toHaveLength(2);

      act(() => result.current.handleSort("rankPosition", "asc"));
      expect(result.current.sortedCoasters).toHaveLength(2);
    });

    it("sorting by model when every coaster lacks one does not crash and leaves them effectively equal", () => {
      const { result } = renderHook(() =>
        useCoasterSorting(darkRideCollection, null),
      );

      expect(() =>
        act(() => result.current.handleSort("model", "asc")),
      ).not.toThrow();
      expect(result.current.sortedCoasters).toHaveLength(2);
    });
  });
});
