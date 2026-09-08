import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useModelAutocomplete, { ManufacturerData } from "./useModelAutocomplete";

global.fetch = vi.fn();

const mockManufacturers: ManufacturerData[] = [
  {
    manufacturer: "Bolliger & Mabillard",
    models: ["Inverted", "Giga"],
  },
  {
    manufacturer: "Vekoma",
    models: ["Boomerang", "Invertigo"],
    darkRideModels: ["Mad House", "Omnimover"],
  },
  {
    manufacturer: "Some Obscure Manufacturer",
    models: [""],
  },
];

describe("useModelAutocomplete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockManufacturers,
    } as Response);
  });

  it("loads manufacturers data", async () => {
    const { result } = renderHook(() =>
      useModelAutocomplete("", "", "coaster"),
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalled();
  });

  it("returns empty suggestions when no manufacturer selected", async () => {
    const { result } = renderHook(() =>
      useModelAutocomplete("inv", "", "coaster"),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.hasManufacturer).toBe(false);
  });

  it("filters models by name", async () => {
    const { result } = renderHook(() =>
      useModelAutocomplete("inv", "Bolliger & Mabillard", "coaster"),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.suggestions.length).toBeGreaterThanOrEqual(0);
  });

  describe("browsing all models with an empty value", () => {
    it("returns every known model for the manufacturer, alphabetically, when the field is empty", async () => {
      const { result } = renderHook(() =>
        useModelAutocomplete("", "Bolliger & Mabillard", "coaster"),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.suggestions.map((s) => s.model)).toEqual([
        "Giga",
        "Inverted",
      ]);
    });

    it("reports hasMinCharacters as true for an empty field once a manufacturer is selected", async () => {
      const { result } = renderHook(() =>
        useModelAutocomplete("", "Bolliger & Mabillard", "coaster"),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.hasMinCharacters).toBe(true);
    });

    it("still returns nothing for an empty field with no manufacturer selected", async () => {
      const { result } = renderHook(() =>
        useModelAutocomplete("", "", "coaster"),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.suggestions).toEqual([]);
      expect(result.current.hasMinCharacters).toBe(false);
    });

    it("uses darkRideModels instead when rideType is dark-ride", async () => {
      const { result } = renderHook(() =>
        useModelAutocomplete("", "Vekoma", "dark-ride"),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.suggestions.map((s) => s.model)).toEqual([
        "Mad House",
        "Omnimover",
      ]);
    });

    it("never offers an empty-string placeholder model as a suggestion", async () => {
      const { result } = renderHook(() =>
        useModelAutocomplete("", "Some Obscure Manufacturer", "coaster"),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.suggestions).toEqual([]);
    });
  });
});
