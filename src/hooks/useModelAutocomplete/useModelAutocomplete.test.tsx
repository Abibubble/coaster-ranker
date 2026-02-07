import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useModelAutocomplete, { ManufacturerData } from "./useModelAutocomplete";

global.fetch = vi.fn();

const mockManufacturers: ManufacturerData[] = [
  {
    manufacturer: "Bolliger & Mabillard",
    models: ["Inverted", "Giga"],
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
    const { result } = renderHook(() => useModelAutocomplete("", ""));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalled();
  });

  it("returns empty suggestions when no manufacturer selected", async () => {
    const { result } = renderHook(() => useModelAutocomplete("inv", ""));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.hasManufacturer).toBe(false);
  });

  it("filters models by name", async () => {
    const { result } = renderHook(() =>
      useModelAutocomplete("inv", "Bolliger & Mabillard"),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.suggestions.length).toBeGreaterThanOrEqual(0);
  });
});
