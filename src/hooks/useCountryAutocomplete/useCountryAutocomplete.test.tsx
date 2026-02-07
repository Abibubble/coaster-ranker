import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useCountryAutocomplete, { CountryData } from "./useCountryAutocomplete";

global.fetch = vi.fn();

const mockCountries: CountryData[] = [
  { country: "United States" },
  { country: "United Kingdom" },
];

describe("useCountryAutocomplete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockCountries,
    } as Response);
  });

  it("loads countries data", async () => {
    const { result } = renderHook(() => useCountryAutocomplete(""));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalled();
  });

  it("returns empty suggestions for empty value", () => {
    const { result } = renderHook(() => useCountryAutocomplete(""));
    expect(result.current.suggestions).toEqual([]);
  });

  it("filters countries by name", async () => {
    const { result } = renderHook(() => useCountryAutocomplete("united"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.suggestions.length).toBeGreaterThan(0);
  });
});
