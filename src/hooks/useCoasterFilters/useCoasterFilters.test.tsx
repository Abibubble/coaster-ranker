import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Coaster } from "../../types/data";
import { useCoasterFilters } from "./useCoasterFilters";

const makeCoaster = (overrides: Partial<Coaster>): Coaster => ({
  id: overrides.id ?? overrides.name ?? "id",
  name: "Coaster",
  park: "Park",
  country: "Country",
  manufacturer: "Manufacturer",
  ...overrides,
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
  openingYear: 2018,
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
  openingYear: 2015,
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

// Dark rides realistically never have model/material/thrillLevel populated,
// since the UI only surfaces those fields for rideType === "coaster".
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

describe("useCoasterFilters", () => {
  describe("individual filters", () => {
    it("filters by park (case-insensitive substring)", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => result.current.updateFilter("park", "cedar"));

      expect(result.current.filteredCoasters.map((c) => c.name)).toEqual([
        "Steel Vengeance",
        "Maverick",
      ]);
    });

    it("filters by manufacturer (case-insensitive substring)", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => result.current.updateFilter("manufacturer", "intamin"));

      expect(result.current.filteredCoasters.map((c) => c.name)).toEqual([
        "Maverick",
      ]);
    });

    it("filters by country (case-insensitive substring)", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => result.current.updateFilter("country", "united"));

      expect(result.current.filteredCoasters).toHaveLength(3);
    });

    it("filters by material (case-insensitive substring)", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => result.current.updateFilter("material", "steel"));

      expect(result.current.filteredCoasters.map((c) => c.name)).toEqual([
        "Fury 325",
        "Maverick",
      ]);
    });

    it("filters by thrillLevel (case-insensitive substring)", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => result.current.updateFilter("thrillLevel", "family thrill"));

      expect(result.current.filteredCoasters.map((c) => c.name)).toEqual([
        "Maverick",
      ]);
    });

    it("filters by openingYear (exact match, issue #44)", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => result.current.updateFilter("openingYear", "2018"));

      expect(result.current.filteredCoasters.map((c) => c.name)).toEqual([
        "Steel Vengeance",
      ]);
    });

    it("excludes coasters with no openingYear when the filter is active", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => result.current.updateFilter("openingYear", "2015"));

      expect(
        result.current.filteredCoasters.some((c) => c.name === "Maverick"),
      ).toBe(false);
    });

    describe("model filter (exact-or-prefix, not general substring)", () => {
      it("matches an exact model (case-insensitive)", () => {
        const { result } = renderHook(() =>
          useCoasterFilters(coasterCollection),
        );

        act(() => result.current.updateFilter("model", "giga"));

        expect(result.current.filteredCoasters.map((c) => c.name)).toEqual([
          "Fury 325",
        ]);
      });

      it("matches a prefix of the model", () => {
        const { result } = renderHook(() =>
          useCoasterFilters(coasterCollection),
        );

        act(() => result.current.updateFilter("model", "gig"));

        expect(result.current.filteredCoasters.map((c) => c.name)).toEqual([
          "Fury 325",
        ]);
      });

      it("does NOT match a substring in the middle of the model", () => {
        const withMidMatch = [
          ...coasterCollection,
          makeCoaster({
            id: "6",
            name: "Mid Match Test",
            model: "Mega Giga Coaster",
          }),
        ];
        const { result } = renderHook(() => useCoasterFilters(withMidMatch));

        // "giga" is a substring of "Mega Giga Coaster" but not a prefix,
        // so the new coaster should be excluded while the exact "Giga" model still matches.
        act(() => result.current.updateFilter("model", "giga"));

        expect(result.current.filteredCoasters.map((c) => c.name)).toEqual([
          "Fury 325",
        ]);
      });
    });

    it("AND-combines multiple active filters", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => {
        result.current.updateFilter("park", "cedar");
        result.current.updateFilter("material", "hybrid");
      });

      expect(result.current.filteredCoasters.map((c) => c.name)).toEqual([
        "Steel Vengeance",
      ]);
    });
  });

  describe("dark-ride collections (no model/material/thrillLevel)", () => {
    it("returns the full collection when no filters are active", () => {
      const { result } = renderHook(() => useCoasterFilters(darkRideCollection));

      expect(result.current.filteredCoasters).toHaveLength(2);
    });

    it("excludes dark rides (not crashing) when model/material/thrillLevel filters are set", () => {
      const { result } = renderHook(() => useCoasterFilters(darkRideCollection));

      act(() => {
        result.current.updateFilter("model", "anything");
      });
      expect(result.current.filteredCoasters).toHaveLength(0);

      act(() => {
        result.current.updateFilter("model", "");
        result.current.updateFilter("material", "anything");
      });
      expect(result.current.filteredCoasters).toHaveLength(0);

      act(() => {
        result.current.updateFilter("material", "");
        result.current.updateFilter("thrillLevel", "anything");
      });
      expect(result.current.filteredCoasters).toHaveLength(0);
    });

    it("still filters by park/manufacturer/country correctly", () => {
      const { result } = renderHook(() => useCoasterFilters(darkRideCollection));

      act(() => result.current.updateFilter("manufacturer", "disney"));

      expect(result.current.filteredCoasters).toHaveLength(2);
    });
  });

  describe("hasActiveFilters", () => {
    it("is false when every filter is empty", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));
      expect(result.current.hasActiveFilters).toBe(false);
    });

    it("is true when any single filter is set", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => result.current.updateFilter("country", "united"));

      expect(result.current.hasActiveFilters).toBe(true);
    });
  });

  describe("clearAllFilters", () => {
    it("resets every filter field back to an empty string and restores the full list", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => {
        result.current.updateFilter("park", "cedar");
        result.current.updateFilter("manufacturer", "intamin");
      });
      expect(result.current.filteredCoasters.length).toBeLessThan(3);

      act(() => result.current.clearAllFilters());

      expect(result.current.filters).toEqual({
        park: "",
        manufacturer: "",
        model: "",
        material: "",
        thrillLevel: "",
        country: "",
        openingYear: "",
      });
      expect(result.current.filteredCoasters).toHaveLength(3);
      expect(result.current.hasActiveFilters).toBe(false);
    });
  });

  describe("updateFilter", () => {
    it("updates only the targeted field, leaving the others untouched", () => {
      const { result } = renderHook(() => useCoasterFilters(coasterCollection));

      act(() => result.current.updateFilter("park", "cedar"));
      act(() => result.current.updateFilter("manufacturer", "intamin"));

      expect(result.current.filters.park).toBe("cedar");
      expect(result.current.filters.manufacturer).toBe("intamin");
      expect(result.current.filters.country).toBe("");
    });
  });
});
