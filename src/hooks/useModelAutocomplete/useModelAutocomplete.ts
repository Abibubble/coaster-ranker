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
  models: string[];
  darkRideModels?: string[];
}

export interface ModelSuggestion {
  id: string;
  model: string;
  manufacturer: string;
}

interface UseModelAutocompleteOptions {
  minCharacters?: number;
  maxSuggestions?: number;
}

export type RideType = "coaster" | "dark-ride";

export default function useModelAutocomplete(
  value: string,
  selectedManufacturer: string,
  rideType: RideType = "coaster",
  options: UseModelAutocompleteOptions = {},
) {
  const { minCharacters = 1, maxSuggestions = 5 } = options;
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
    // If no manufacturer is selected, don't show any suggestions
    if (!selectedManufacturer.trim() || !value || manufacturers.length === 0) {
      return [];
    }

    const searchTerm = normalizeForSearch(value.trim());

    if (searchTerm.length < minCharacters) {
      return [];
    }

    // Normalize the selected manufacturer for comparison
    const normalizedManufacturer = normalizeForSearch(
      selectedManufacturer.trim(),
    );

    // Find the manufacturer that matches the selected one
    const manufacturerData = manufacturers.find((mfg) => {
      const normalizedMfgName = normalizeForSearch(mfg.manufacturer);
      return normalizedMfgName === normalizedManufacturer;
    });

    if (!manufacturerData) {
      return [];
    }

    // Get the appropriate models array based on ride type
    const modelsArray =
      rideType === "dark-ride"
        ? manufacturerData.darkRideModels || []
        : manufacturerData.models || [];

    if (modelsArray.length === 0) {
      return [];
    }

    const searchWords = searchTerm
      .split(/[\s-]+/)
      .filter((word) => word.length > 0);

    const matches: ModelSuggestion[] = [];

    for (const model of modelsArray) {
      const modelName = normalizeForSearch(model);
      const modelWords = modelName
        .split(/[\s-]+/)
        .filter((word) => word.length > 0);

      let isMatch = false;

      // Direct model matching: model name starts with or contains the search term
      if (modelName.includes(searchTerm)) {
        isMatch = true;
      }

      // Check if search term matches from start of any word
      if (!isMatch) {
        isMatch = modelWords.some((word) => word.startsWith(searchTerm));
      }

      // Multi-word matching: each search word matches start of consecutive model words
      if (!isMatch && searchWords.length > 1) {
        for (let i = 0; i <= modelWords.length - searchWords.length; i++) {
          const allMatch = searchWords.every(
            (searchWord, index) =>
              modelWords[i + index] &&
              modelWords[i + index].startsWith(searchWord),
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

        // Check if it could be initials (like 'bf' for 'Booster Bike')
        if (singleSearchWord.length <= modelWords.length) {
          let initialMatch = true;
          for (let i = 0; i < singleSearchWord.length; i++) {
            if (
              !modelWords[i] ||
              !modelWords[i].startsWith(singleSearchWord[i])
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
          isMatch = modelWords.some((word) =>
            word.startsWith(singleSearchWord),
          );
        }
      }

      if (isMatch) {
        matches.push({
          model,
          manufacturer: manufacturerData.manufacturer,
          id: model.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(),
        });

        if (matches.length >= maxSuggestions) {
          break;
        }
      }
    }

    // Sort matches to prioritize:
    // 1. Exact model starts with search term
    // 2. Any word starts with search term
    // 3. Contains search term
    return matches.sort((a, b) => {
      const aName = normalizeForSearch(a.model);
      const bName = normalizeForSearch(b.model);
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
      return a.model.localeCompare(b.model);
    });
  }, [
    value,
    selectedManufacturer,
    manufacturers,
    minCharacters,
    maxSuggestions,
    rideType,
  ]);

  const hasMinCharacters = value.length >= minCharacters;
  const hasManufacturer = selectedManufacturer.trim().length > 0;

  return {
    suggestions,
    isLoading,
    error,
    hasMinCharacters,
    hasManufacturer,
  };
}
