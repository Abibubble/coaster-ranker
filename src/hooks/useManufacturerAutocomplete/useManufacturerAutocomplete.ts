import { useState, useEffect, useMemo } from "react";
import { buildManufacturerAliasMap } from "../../utils/manufacturerGrouping";
import { RideType } from "../../types/data";

// Common short names/initialisms that don't naturally line up with the
// "initials of each word" heuristic below - typed as one word (e.g. "b&m",
// "rmc"), they expand to the full manufacturer name before matching, the
// same approach useParkAutocomplete uses for park abbreviations like "ioa".
const ABBREVIATIONS: Record<string, string> = {
  "b&m": "bolliger & mabillard",
  rmc: "rocky mountain construction",
  gci: "great coasters international",
  cci: "custom coasters international",
  ptc: "philadelphia toboggan coasters",
  "s&s": "s&s sansei",
};

const normalizeForSearch = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const expandSearchTerms = (searchTerm: string): string => {
  const words = searchTerm.split(/[\s-]+/);
  const expandedWords = words.map((word) => ABBREVIATIONS[word] || word);
  return expandedWords.join(" ");
};

export interface ManufacturerData {
  manufacturer: string;
  alternateNames?: string[];
  darkRideModels?: string[];
}

export interface ManufacturerSuggestion extends ManufacturerData {
  id: string;
}

interface UseManufacturerAutocompleteOptions {
  minCharacters?: number;
  maxSuggestions?: number;
}

export default function useManufacturerAutocomplete(
  value: string,
  rideType: RideType = "coaster",
  options: UseManufacturerAutocompleteOptions = {},
) {
  const { minCharacters = 2, maxSuggestions = 3 } = options;
  const [manufacturers, setManufacturers] = useState<ManufacturerData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadManufacturers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use import.meta.env.BASE_URL to get the base path from Vite config
        const basePath = import.meta.env.BASE_URL;
        const response = await fetch(`${basePath}data/manufacturers.json`);
        if (!response.ok) {
          throw new Error("Failed to load manufacturers data");
        }
        const data: ManufacturerData[] = await response.json();
        setManufacturers(data);
      } catch (err) {
        console.error("Failed to load manufacturers:", err);
        setError("Failed to load manufacturers data");
      } finally {
        setIsLoading(false);
      }
    };

    loadManufacturers();
  }, []);

  // Only manufacturers credited with at least one dark ride (i.e. the
  // manufacturers.json entry has a darkRideModels field at all, even an
  // empty/placeholder one) are relevant when adding/editing a dark ride -
  // coaster-only manufacturers are never suggested there, and vice versa.
  const rideTypeManufacturers = useMemo(
    () =>
      rideType === "dark-ride"
        ? manufacturers.filter((mfg) => "darkRideModels" in mfg)
        : manufacturers,
    [manufacturers, rideType],
  );

  const suggestions = useMemo(() => {
    if (!value || rideTypeManufacturers.length === 0) {
      return [];
    }

    const searchTerm = normalizeForSearch(value.trim());

    if (searchTerm.length < minCharacters) {
      return [];
    }

    // Expand recognised short names (e.g. "b&m" -> "bolliger & mabillard")
    // before matching, so typing a common abbreviation surfaces the full
    // manufacturer name.
    const expandedSearchTerm = expandSearchTerms(searchTerm);

    const searchWords = expandedSearchTerm
      .split(/[\s-]+/)
      .filter((word) => word.length > 0);

    const matches: ManufacturerSuggestion[] = [];

    for (const manufacturerData of rideTypeManufacturers) {
      const manufacturerName = normalizeForSearch(
        manufacturerData.manufacturer,
      );
      const manufacturerWords = manufacturerName
        .split(/[\s-]+/)
        .filter((word) => word.length > 0);

      let isMatch = false;

      // Direct name matching: manufacturer name starts with or contains the search term
      if (manufacturerName.includes(expandedSearchTerm)) {
        isMatch = true;
      }

      // Check if search term matches from start of any word
      if (!isMatch) {
        isMatch = manufacturerWords.some((word) =>
          word.startsWith(expandedSearchTerm),
        );
      }

      // Multi-word matching: each search word matches start of consecutive manufacturer words
      if (!isMatch && searchWords.length > 1) {
        for (
          let i = 0;
          i <= manufacturerWords.length - searchWords.length;
          i++
        ) {
          const allMatch = searchWords.every(
            (searchWord, index) =>
              manufacturerWords[i + index] &&
              manufacturerWords[i + index].startsWith(searchWord),
          );
          if (allMatch) {
            isMatch = true;
            break;
          }
        }
      }

      // Initial matching: check if search term could be initials
      if (!isMatch && searchWords.length === 1) {
        const singleSearchWord = searchWords[0];

        // Check if it could be initials (like 'rmc' for 'Rocky Mountain Construction')
        if (singleSearchWord.length <= manufacturerWords.length) {
          let initialMatch = true;
          for (let i = 0; i < singleSearchWord.length; i++) {
            if (
              !manufacturerWords[i] ||
              !manufacturerWords[i].startsWith(singleSearchWord[i])
            ) {
              initialMatch = false;
              break;
            }
          }
          if (initialMatch) {
            isMatch = true;
          }
        }

        // Single word start matching
        if (!isMatch) {
          isMatch = manufacturerWords.some((word) =>
            word.startsWith(singleSearchWord),
          );
        }
      }

      if (isMatch) {
        matches.push({
          ...manufacturerData,
          id: manufacturerData.manufacturer
            .replace(/[^a-zA-Z0-9]/g, "-")
            .toLowerCase(),
        });

        if (matches.length >= maxSuggestions) {
          break;
        }
      }
    }

    // Sort matches to prioritize:
    // 1. Exact name starts with search term
    // 2. Any word starts with search term
    // 3. Contains search term
    return matches.sort((a, b) => {
      const aName = normalizeForSearch(a.manufacturer);
      const bName = normalizeForSearch(b.manufacturer);
      const aWords = aName.split(/[\s-]+/);
      const bWords = bName.split(/[\s-]+/);

      const aExactStart = aName.startsWith(expandedSearchTerm);
      const bExactStart = bName.startsWith(expandedSearchTerm);
      const aWordStart = aWords.some((word) =>
        word.startsWith(expandedSearchTerm),
      );
      const bWordStart = bWords.some((word) =>
        word.startsWith(expandedSearchTerm),
      );

      // Prioritize exact name starts
      if (aExactStart && !bExactStart) return -1;
      if (!aExactStart && bExactStart) return 1;

      // Then word starts
      if (aWordStart && !bWordStart) return -1;
      if (!aWordStart && bWordStart) return 1;

      // Finally alphabetical
      return a.manufacturer.localeCompare(b.manufacturer);
    });
  }, [value, rideTypeManufacturers, minCharacters, maxSuggestions]);

  const hasMinCharacters = value.length >= minCharacters;

  const manufacturerAliasMap = useMemo(
    () => buildManufacturerAliasMap(manufacturers),
    [manufacturers],
  );

  return {
    suggestions,
    isLoading,
    error,
    hasMinCharacters,
    manufacturerAliasMap,
  };
}
