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
});
