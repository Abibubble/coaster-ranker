import { useState, useEffect, useMemo } from "react";

// Country codes and abbreviations mapping
const COUNTRY_CODES: Record<string, string[]> = {
  "united states": ["us", "usa", "america"],
  "united kingdom": ["uk", "gb", "britain", "england"],
  australia: ["au", "aus", "aussie"],
  canada: ["ca", "can"],
  germany: ["de", "ger", "deutschland"],
  france: ["fr", "fra"],
  italy: ["it", "ita"],
  spain: ["es", "esp"],
  netherlands: ["nl", "nld", "holland"],
  belgium: ["be", "bel"],
  switzerland: ["ch", "che", "sui"],
  austria: ["at", "aut"],
  sweden: ["se", "swe"],
  norway: ["no", "nor"],
  denmark: ["dk", "dnk"],
  finland: ["fi", "fin"],
  poland: ["pl", "pol"],
  "czech republic": ["cz", "cze"],
  slovakia: ["sk", "svk"],
  hungary: ["hu", "hun"],
  romania: ["ro", "rou"],
  bulgaria: ["bg", "bgr"],
  greece: ["gr", "grc"],
  portugal: ["pt", "prt"],
  ireland: ["ie", "irl"],
  croatia: ["hr", "hrv"],
  slovenia: ["si", "svn"],
  estonia: ["ee", "est"],
  latvia: ["lv", "lva"],
  lithuania: ["lt", "ltu"],
  russia: ["ru", "rus"],
  china: ["cn", "chn"],
  japan: ["jp", "jpn"],
  "south korea": ["kr", "kor"],
  india: ["in", "ind"],
  brazil: ["br", "bra"],
  argentina: ["ar", "arg"],
  chile: ["cl", "chl"],
  mexico: ["mx", "mex"],
  "south africa": ["za", "zaf"],
  egypt: ["eg", "egy"],
  israel: ["il", "isr"],
  turkey: ["tr", "tur"],
  thailand: ["th", "tha"],
  vietnam: ["vn", "vnm"],
  singapore: ["sg", "sgp"],
  malaysia: ["my", "mys"],
  indonesia: ["id", "idn"],
  philippines: ["ph", "phl"],
  "new zealand": ["nz", "nzl", "kiwi"],
  "united arab emirates": ["ae", "are", "uae"],
  "saudi arabia": ["sa", "sau"],
  qatar: ["qa", "qat"],
  kuwait: ["kw", "kwt"],
  bahrain: ["bh", "bhr"],
  oman: ["om", "omn"],
};

export interface CountryData {
  country: string;
}

export interface CountrySuggestion extends CountryData {
  id: string;
}

interface UseCountryAutocompleteOptions {
  minCharacters?: number;
  maxSuggestions?: number;
}

export default function useCountryAutocomplete(
  value: string,
  options: UseCountryAutocompleteOptions = {},
) {
  const { minCharacters = 2, maxSuggestions = 3 } = options;
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use import.meta.env.BASE_URL to get the base path from Vite config
        const basePath = import.meta.env.BASE_URL;
        const response = await fetch(`${basePath}data/countries.json`);
        if (!response.ok) {
          throw new Error("Failed to load countries data");
        }
        const data: CountryData[] = await response.json();
        setCountries(data);
      } catch (err) {
        console.error("Failed to load countries:", err);
        setError("Failed to load countries data");
      } finally {
        setIsLoading(false);
      }
    };

    loadCountries();
  }, []);

  const suggestions = useMemo(() => {
    if (!value || countries.length === 0) {
      return [];
    }

    const searchTerm = value.toLowerCase().trim();

    // Allow shorter searches for country codes (2+ chars) but longer for names (3+ chars)
    const isLikelyCountryCode =
      searchTerm.length <= 3 && /^[a-z]+$/i.test(searchTerm);
    const effectiveMinCharacters = isLikelyCountryCode ? 2 : minCharacters;

    if (searchTerm.length < effectiveMinCharacters) {
      return [];
    }

    const matches: CountrySuggestion[] = [];

    for (const countryData of countries) {
      const countryName = countryData.country.toLowerCase();
      let isMatch = false;

      // Direct name matching: country name starts with or contains the search term
      if (countryName.includes(searchTerm)) {
        isMatch = true;
      }

      // Country code/abbreviation matching
      if (!isMatch) {
        const codes = COUNTRY_CODES[countryName];
        if (codes) {
          isMatch = codes.some(
            (code) =>
              code.toLowerCase() === searchTerm ||
              code.toLowerCase().startsWith(searchTerm) ||
              searchTerm.startsWith(code.toLowerCase()),
          );
        }
      }

      if (isMatch) {
        matches.push({
          ...countryData,
          id: countryData.country.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(),
        });

        if (matches.length >= maxSuggestions) {
          break;
        }
      }
    }

    // Sort matches to prioritize:
    // 1. Countries that start with the search term
    // 2. Countries with exact code matches
    // 3. Other matches alphabetically
    return matches.sort((a, b) => {
      const aName = a.country.toLowerCase();
      const bName = b.country.toLowerCase();
      const aStartsWith = aName.startsWith(searchTerm);
      const bStartsWith = bName.startsWith(searchTerm);

      const aCodes = COUNTRY_CODES[aName];
      const bCodes = COUNTRY_CODES[bName];
      const aExactCode = aCodes?.includes(searchTerm) || false;
      const bExactCode = bCodes?.includes(searchTerm) || false;

      // Prioritize name starts with
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      // Then exact code matches
      if (aExactCode && !bExactCode) return -1;
      if (!aExactCode && bExactCode) return 1;

      // Finally alphabetical
      return a.country.localeCompare(b.country);
    });
  }, [value, countries, minCharacters, maxSuggestions]);

  // Calculate hasMinCharacters with the same logic as suggestions
  const trimmedValue = value.toLowerCase().trim();
  const isLikelyCountryCode =
    trimmedValue.length <= 3 && /^[a-z]+$/i.test(trimmedValue);
  const effectiveMinCharacters = isLikelyCountryCode ? 2 : minCharacters;
  const hasMinCharacters = trimmedValue.length >= effectiveMinCharacters;

  return {
    suggestions,
    isLoading,
    error,
    hasMinCharacters,
  };
}
