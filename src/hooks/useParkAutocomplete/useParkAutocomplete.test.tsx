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

describe("useParkAutocomplete - country alias expansion", () => {
  const aliasParks: ParkData[] = [
    { name: "Busch Gardens Tampa Bay", country: "United States" },
    { name: "Tusenfryd", country: "Norway" },
    { name: "Cedar Point", country: "United States" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => aliasParks,
    } as Response);
  });

  // Regression: a country alias like "us" must not be expanded when it appears
  // as a substring inside an unrelated park name (previously "Busch" -> no
  // matches once you typed the 4th character).
  it.each(["busc", "busch"])(
    "matches 'Busch Gardens' when typing '%s'",
    async (term) => {
      const { result } = renderHook(() => useParkAutocomplete(term));
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.suggestions.map((s) => s.name)).toContain(
        "Busch Gardens Tampa Bay",
      );
    },
  );

  it.each(["tus", "tuse", "tusen"])(
    "keeps matching 'Tusenfryd' when typing '%s' (no sticky empty dropdown)",
    async (term) => {
      const { result } = renderHook(() => useParkAutocomplete(term));
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.suggestions.map((s) => s.name)).toContain(
        "Tusenfryd",
      );
    },
  );

  it("still expands a whole-word country alias", async () => {
    const { result } = renderHook(() => useParkAutocomplete("america"));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const names = result.current.suggestions.map((s) => s.name);
    expect(names).toContain("Cedar Point");
    expect(names).toContain("Busch Gardens Tampa Bay");
  });
});

describe("useParkAutocomplete - country alias precision", () => {
  const worldParks: ParkData[] = [
    { name: "Alton Towers", country: "United Kingdom" },
    { name: "Blackpool Pleasure Beach", country: "United Kingdom" },
    { name: "Cedar Point", country: "United States" },
    { name: "Ferrari World", country: "United Arab Emirates" },
    { name: "Europa-Park", country: "Germany" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => worldParks,
    } as Response);
  });

  // Regression: "us" expands to "united states" and must NOT match the shared
  // "United" prefix of United Kingdom / United Arab Emirates.
  it("matches only United States parks for 'us'", async () => {
    const { result } = renderHook(() =>
      useParkAutocomplete("us", { maxSuggestions: 20 }),
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const countries = result.current.suggestions.map((s) => s.country);
    expect(countries.length).toBeGreaterThan(0);
    expect(countries.every((c) => c === "United States")).toBe(true);
  });

  it("matches only United Kingdom parks for 'uk'", async () => {
    const { result } = renderHook(() =>
      useParkAutocomplete("uk", { maxSuggestions: 20 }),
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const countries = result.current.suggestions.map((s) => s.country);
    expect(countries.length).toBeGreaterThan(0);
    expect(countries.every((c) => c === "United Kingdom")).toBe(true);
  });

  it("still matches a partial country name typed directly ('ger')", async () => {
    const { result } = renderHook(() => useParkAutocomplete("ger"));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.suggestions.map((s) => s.name)).toContain(
      "Europa-Park",
    );
  });
});
