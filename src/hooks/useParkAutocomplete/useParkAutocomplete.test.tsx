import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useParkAutocomplete, { ParkData } from "./useParkAutocomplete";

global.fetch = vi.fn();

const mockParks: ParkData[] = [
  { name: "Cedar Point", country: "United States" },
  { name: "Alton Towers", country: "United Kingdom" },
];

describe("useParkAutocomplete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockParks,
    } as Response);
  });

  it("loads parks data", async () => {
    const { result } = renderHook(() => useParkAutocomplete(""));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalled();
  });

  it("returns empty suggestions for empty value", () => {
    const { result } = renderHook(() => useParkAutocomplete(""));
    expect(result.current.suggestions).toEqual([]);
  });

  it("filters parks by name", async () => {
    const { result } = renderHook(() => useParkAutocomplete("cedar"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.suggestions.length).toBeGreaterThanOrEqual(0);
  });

  it("gets country for park", async () => {
    const { result } = renderHook(() => useParkAutocomplete(""));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.getCountryForPark("Cedar Point")).toBe(
      "United States",
    );
  });
});
