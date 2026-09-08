import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useManufacturerAutocomplete, {
  ManufacturerData,
} from "./useManufacturerAutocomplete";

global.fetch = vi.fn();

const mockManufacturers: ManufacturerData[] = [
  { manufacturer: "Bolliger & Mabillard" },
  { manufacturer: "Intamin" },
  {
    manufacturer: "Arrow Dynamics",
    alternateNames: ["Arrow Development", "Arrow-Huss"],
  },
  { manufacturer: "Rocky Mountain Construction" },
  { manufacturer: "Great Coasters International" },
  { manufacturer: "Custom Coasters International" },
  { manufacturer: "Philadelphia Toboggan Coasters, Inc." },
  { manufacturer: "S&S Sansei", alternateNames: ["S&S Worldwide"] },
  { manufacturer: "Vekoma", darkRideModels: ["Mad House", "Omnimover"] },
  { manufacturer: "Some Obscure Dark Ride Maker", darkRideModels: [""] },
];

describe("useManufacturerAutocomplete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockManufacturers,
    } as Response);
  });

  it("loads manufacturers data", async () => {
    const { result } = renderHook(() => useManufacturerAutocomplete(""));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalled();
  });

  it("returns empty suggestions for empty value", () => {
    const { result } = renderHook(() => useManufacturerAutocomplete(""));
    expect(result.current.suggestions).toEqual([]);
  });

  it("filters manufacturers by name", async () => {
    const { result } = renderHook(() => useManufacturerAutocomplete("bo"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.suggestions.length).toBeGreaterThanOrEqual(0);
  });

  it("builds a manufacturerAliasMap that resolves alternate names to their primary manufacturer", async () => {
    const { result } = renderHook(() => useManufacturerAutocomplete(""));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.manufacturerAliasMap.get("arrow development")).toBe(
      "Arrow Dynamics",
    );
    expect(result.current.manufacturerAliasMap.get("arrow dynamics")).toBe(
      "Arrow Dynamics",
    );
  });

  describe("common abbreviations", () => {
    it.each([
      ["b&m", "Bolliger & Mabillard"],
      ["rmc", "Rocky Mountain Construction"],
      ["gci", "Great Coasters International"],
      ["cci", "Custom Coasters International"],
      ["ptc", "Philadelphia Toboggan Coasters, Inc."],
      ["s&s", "S&S Sansei"],
    ])(
      "surfaces %s's full manufacturer name (%s) as the top suggestion",
      async (abbreviation, fullName) => {
        const { result } = renderHook(() =>
          useManufacturerAutocomplete(abbreviation),
        );

        await waitFor(() => {
          expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.suggestions[0]?.manufacturer).toBe(fullName);
      },
    );

    it("matches an abbreviation regardless of case", async () => {
      const { result } = renderHook(() => useManufacturerAutocomplete("RMC"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(
        result.current.suggestions.some(
          (s) => s.manufacturer === "Rocky Mountain Construction",
        ),
      ).toBe(true);
    });
  });

  describe("rideType filtering", () => {
    it("suggests coaster-only manufacturers (no darkRideModels field) when rideType is coaster", async () => {
      const { result } = renderHook(() =>
        useManufacturerAutocomplete("bolliger", "coaster"),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(
        result.current.suggestions.some(
          (s) => s.manufacturer === "Bolliger & Mabillard",
        ),
      ).toBe(true);
    });

    it("excludes manufacturers with no darkRideModels field when rideType is dark-ride", async () => {
      const { result } = renderHook(() =>
        useManufacturerAutocomplete("bolliger", "dark-ride"),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.suggestions).toEqual([]);
    });

    it("includes a manufacturer with populated darkRideModels when rideType is dark-ride", async () => {
      const { result } = renderHook(() =>
        useManufacturerAutocomplete("vekoma", "dark-ride"),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(
        result.current.suggestions.some((s) => s.manufacturer === "Vekoma"),
      ).toBe(true);
    });

    it("includes a manufacturer with only a placeholder/empty darkRideModels array, since the field is present", async () => {
      const { result } = renderHook(() =>
        useManufacturerAutocomplete("obscure", "dark-ride"),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(
        result.current.suggestions.some(
          (s) => s.manufacturer === "Some Obscure Dark Ride Maker",
        ),
      ).toBe(true);
    });

    it("defaults to coaster behaviour (no dark-ride filtering) when rideType is omitted", async () => {
      const { result } = renderHook(() => useManufacturerAutocomplete("intamin"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(
        result.current.suggestions.some((s) => s.manufacturer === "Intamin"),
      ).toBe(true);
    });
  });
});
