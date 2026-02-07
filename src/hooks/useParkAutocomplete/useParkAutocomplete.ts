/// <reference types="vite/client" />
import { useState, useEffect, useMemo } from "react";

const ABBREVIATIONS: Record<string, string> = {
  wdw: "walt disney world",
  dlp: "disneyland paris",
  ioa: "islands of adventure",
  ep: "europa-park",
  cp: "cedar point",
};

const BRAND_KEYWORDS: Record<string, string[]> = {
  "busch gardens": ["busch gardens"],
  "cedar fair": ["cedar point", "kings island", "carowinds", "knotts"],
  disney: ["disneyland", "disney", "walt disney"],
  merlin: ["alton towers", "thorpe park", "chessington", "legoland"],
  plopsa: ["plopsaland", "movie park germany"],
  seaworld: ["seaworld"],
  "six flags": ["six flags"],
  universal: ["universal"],
  walibi: ["walibi belgium", "walibi holland", "walibi rhone alpes"],
};

const COUNTRY_KEYWORDS: Record<string, string[]> = {
  america: ["united states"],
  australia: ["australia"],
  aussie: ["australia"],
  austria: ["austria"],
  belgium: ["belgium"],
  brazil: ["brazil"],
  canada: ["canada"],
  china: ["china"],
  denmark: ["denmark"],
  england: ["united kingdom"],
  finland: ["finland"],
  france: ["france"],
  germany: ["germany"],
  hk: ["hong kong"],
  holland: ["netherlands"],
  "hong kong": ["hong kong"],
  ireland: ["ireland"],
  italy: ["italy"],
  japan: ["japan"],
  korea: ["south korea"],
  mexico: ["mexico"],
  netherlands: ["netherlands"],
  norway: ["norway"],
  poland: ["poland"],
  singapore: ["singapore"],
  "south korea": ["south korea"],
  spain: ["spain"],
  sweden: ["sweden"],
  uk: ["united kingdom"],
  us: ["united states"],
  usa: ["united states"],
};

const normalizeForSearch = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const expandSearchTerms = (searchTerm: string): string => {
  const normalized = searchTerm.toLowerCase();

  for (const [keyword, countries] of Object.entries(COUNTRY_KEYWORDS)) {
    if (normalized.includes(keyword)) {
      const replacement = countries.join(" ");
      return normalized.replace(keyword, replacement);
    }
  }

  const words = normalized.split(/[\s-]+/);
  const expandedWords = words.map((word) => ABBREVIATIONS[word] || word);
  return expandedWords.join(" ");
};

export interface ParkData {
  name: string;
  country: string;
}

export interface ParkSuggestion extends ParkData {
  id: string;
}

interface UseParkAutocompleteOptions {
  minCharacters?: number;
  maxSuggestions?: number;
}

export default function useParkAutocomplete(
  value: string,
  options: UseParkAutocompleteOptions = {},
) {
  const { minCharacters = 2, maxSuggestions = 3 } = options;
  const [parks, setParks] = useState<ParkData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadParks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use import.meta.env.BASE_URL to get the base path from Vite config
        const basePath = import.meta.env.BASE_URL;
        const response = await fetch(`${basePath}data/parks.json`);
        if (!response.ok) {
          throw new Error("Failed to load parks data");
        }
        const data: ParkData[] = await response.json();
        setParks(data);
      } catch (err) {
        console.error("Failed to load parks:", err);
        setError("Failed to load parks data");
      } finally {
        setIsLoading(false);
      }
    };

    loadParks();
  }, []);

  const suggestions = useMemo(() => {
    if (!value || value.length < minCharacters || parks.length === 0) {
      return [];
    }

    const searchTerm = normalizeForSearch(value.trim());
    const expandedSearchTerm = expandSearchTerms(searchTerm);
    const searchWords = expandedSearchTerm
      .split(/[\s-]+/)
      .filter((word) => word.length > 0);

    const matches: ParkSuggestion[] = [];

    for (const park of parks) {
      const parkName = normalizeForSearch(park.name);
      const parkCountry = normalizeForSearch(park.country);
      const parkWords = parkName
        .split(/[\s-]+/)
        .filter((word) => word.length > 0);

      let isMatch = false;

      for (const [brand, keywords] of Object.entries(BRAND_KEYWORDS)) {
        if (
          searchWords.some((word) => normalizeForSearch(brand).includes(word))
        ) {
          if (
            keywords.some((keyword) =>
              parkName.includes(normalizeForSearch(keyword)),
            )
          ) {
            isMatch = true;
            break;
          }
        }
      }

      // Check for country keyword matches
      if (!isMatch) {
        for (const [countryKeyword, countries] of Object.entries(
          COUNTRY_KEYWORDS,
        )) {
          if (searchWords.some((word) => word === countryKeyword)) {
            if (
              countries.some((country) =>
                parkCountry.includes(normalizeForSearch(country)),
              )
            ) {
              isMatch = true;
              break;
            }
          }
        }
      }

      // Check if search term matches country name (whole word or starts with)
      if (!isMatch) {
        const countryWords = parkCountry
          .split(/[\s-]+/)
          .filter((word) => word.length > 0);
        isMatch = searchWords.some((searchWord) =>
          countryWords.some(
            (countryWord) =>
              countryWord.startsWith(searchWord) && searchWord.length >= 3,
          ),
        );
      }

      if (!isMatch && searchWords.length > 1) {
        const flexibleMatch = searchWords.every((searchWord) =>
          parkWords.some((parkWord) => parkWord.startsWith(searchWord)),
        );
        if (flexibleMatch) {
          isMatch = true;
        }
      }

      if (!isMatch) {
        if (searchWords.length === 1) {
          const singleSearchWord = searchWords[0];

          isMatch = parkWords.some((word) => word.startsWith(singleSearchWord));

          if (!isMatch) {
            for (let i = 0; i < parkWords.length; i++) {
              let searchIndex = 0;

              for (
                let j = i;
                j < parkWords.length && searchIndex < singleSearchWord.length;
                j++
              ) {
                const parkWord = parkWords[j];

                if (
                  singleSearchWord.substring(searchIndex).startsWith(parkWord)
                ) {
                  searchIndex += parkWord.length;

                  if (searchIndex === singleSearchWord.length) {
                    isMatch = true;
                    break;
                  }
                } else {
                  break; // This sequence doesn't work
                }
              }

              if (isMatch) break;
            }
          }
        } else {
          for (let i = 0; i <= parkWords.length - searchWords.length; i++) {
            const allMatch = searchWords.every(
              (searchWord, index) =>
                parkWords[i + index] &&
                parkWords[i + index].startsWith(searchWord),
            );
            if (allMatch) {
              isMatch = true;
              break;
            }
          }
        }
      }

      if (isMatch) {
        matches.push({
          ...park,
          id: `${park.name}-${park.country}`
            .replace(/[^a-zA-Z0-9]/g, "-")
            .toLowerCase(),
        });

        if (matches.length >= maxSuggestions) {
          break;
        }
      }
    }

    return matches;
  }, [value, parks, minCharacters, maxSuggestions]);

  const getCountryForPark = (parkName: string): string | null => {
    const park = parks.find(
      (p) => p.name.toLowerCase() === parkName.toLowerCase(),
    );
    return park?.country || null;
  };

  return {
    suggestions,
    isLoading,
    error,
    getCountryForPark,
    hasMinCharacters: value.length >= minCharacters,
  };
}
