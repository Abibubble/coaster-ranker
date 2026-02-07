import { useState, useEffect, useMemo } from "react";

const normalizeForSearch = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export interface ManufacturerData {
  manufacturer: string;
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

  const suggestions = useMemo(() => {
    if (!value || manufacturers.length === 0) {
      return [];
    }

    const searchTerm = normalizeForSearch(value.trim());

    if (searchTerm.length < minCharacters) {
      return [];
    }

    const searchWords = searchTerm
      .split(/[\s-]+/)
      .filter((word) => word.length > 0);

    const matches: ManufacturerSuggestion[] = [];

    for (const manufacturerData of manufacturers) {
      const manufacturerName = normalizeForSearch(
        manufacturerData.manufacturer,
      );
      const manufacturerWords = manufacturerName
        .split(/[\s-]+/)
        .filter((word) => word.length > 0);

      let isMatch = false;

      // Direct name matching: manufacturer name starts with or contains the search term
      if (manufacturerName.includes(searchTerm)) {
        isMatch = true;
      }

      // Check if search term matches from start of any word
      if (!isMatch) {
        isMatch = manufacturerWords.some((word) => word.startsWith(searchTerm));
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

      const aExactStart = aName.startsWith(searchTerm);
      const bExactStart = bName.startsWith(searchTerm);
      const aWordStart = aWords.some((word) => word.startsWith(searchTerm));
      const bWordStart = bWords.some((word) => word.startsWith(searchTerm));

      // Prioritize exact name starts
      if (aExactStart && !bExactStart) return -1;
      if (!aExactStart && bExactStart) return 1;

      // Then word starts
      if (aWordStart && !bWordStart) return -1;
      if (!aWordStart && bWordStart) return 1;

      // Finally alphabetical
      return a.manufacturer.localeCompare(b.manufacturer);
    });
  }, [value, manufacturers, minCharacters, maxSuggestions]);

  const hasMinCharacters = value.length >= minCharacters;

  return {
    suggestions,
    isLoading,
    error,
    hasMinCharacters,
  };
}
