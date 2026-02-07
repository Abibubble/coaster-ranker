import React from "react";
import GenericAutocompleteInput from "../GenericAutocompleteInput";
import { AutocompleteConfig } from "../GenericAutocompleteInput/GenericAutocompleteInput";

export interface ParkSuggestion {
  id: string;
  name: string;
  country: string;
}

export interface CountrySuggestion {
  id: string;
  country: string;
}

export interface ManufacturerSuggestion {
  id: string;
  manufacturer: string;
}

export const parkConfig: AutocompleteConfig<
  ParkSuggestion,
  { name: string; country: string }
> = {
  primaryText: (item: ParkSuggestion) => item.name,
  secondaryText: (item: ParkSuggestion) => item.country,
  getValue: (item: ParkSuggestion) => item.name,
  getSelectionData: (item: ParkSuggestion) => ({
    name: item.name,
    country: item.country,
  }),
  getId: (item: ParkSuggestion) => item.id,
  ariaLabel: "Park suggestions",
  noResultsMessage: "No parks found. You can still enter a custom park name.",
};

export const countryConfig: AutocompleteConfig<
  CountrySuggestion,
  { country: string }
> = {
  primaryText: (item: CountrySuggestion) => item.country,
  getValue: (item: CountrySuggestion) => item.country,
  getSelectionData: (item: CountrySuggestion) => ({ country: item.country }),
  getId: (item: CountrySuggestion) => item.id,
  ariaLabel: "Country suggestions",
  noResultsMessage:
    "No countries found. You can still enter a custom country name.",
};

export const manufacturerConfig: AutocompleteConfig<
  ManufacturerSuggestion,
  { manufacturer: string }
> = {
  primaryText: (item: ManufacturerSuggestion) => item.manufacturer,
  getValue: (item: ManufacturerSuggestion) => item.manufacturer,
  getSelectionData: (item: ManufacturerSuggestion) => ({
    manufacturer: item.manufacturer,
  }),
  getId: (item: ManufacturerSuggestion) => item.id,
  ariaLabel: "Manufacturer suggestions",
  noResultsMessage:
    "No manufacturers found. You can still enter a custom manufacturer name.",
};

export interface ParkAutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect?: (suggestion: { name: string; country: string }) => void;
  suggestions: ParkSuggestion[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string;
  isLoading?: boolean;
  error?: string | null;
  hasMinCharacters?: boolean;
  "aria-label"?: string;
  "data-form-type"?: string;
}

export const ParkAutocompleteInput: React.FC<ParkAutocompleteInputProps> = (
  props,
) => {
  return <GenericAutocompleteInput {...props} config={parkConfig} />;
};

export interface CountryAutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect?: (suggestion: { country: string }) => void;
  suggestions: CountrySuggestion[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string;
  isLoading?: boolean;
  error?: string | null;
  hasMinCharacters?: boolean;
  "aria-label"?: string;
  "data-form-type"?: string;
}

export const CountryAutocompleteInput: React.FC<
  CountryAutocompleteInputProps
> = (props) => {
  return <GenericAutocompleteInput {...props} config={countryConfig} />;
};

export interface ManufacturerAutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect?: (suggestion: { manufacturer: string }) => void;
  suggestions: ManufacturerSuggestion[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string;
  isLoading?: boolean;
  error?: string | null;
  hasMinCharacters?: boolean;
  "aria-label"?: string;
  "data-form-type"?: string;
}

export const ManufacturerAutocompleteInput: React.FC<
  ManufacturerAutocompleteInputProps
> = (props) => {
  return <GenericAutocompleteInput {...props} config={manufacturerConfig} />;
};
