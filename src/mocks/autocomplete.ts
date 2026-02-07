import {
  type ParkSuggestion,
  type CountrySuggestion,
  type ManufacturerSuggestion,
  type ModelSuggestion,
} from "../components/AutocompleteInputs";

export const mockParkSuggestions: ParkSuggestion[] = [
  { id: "alton-towers", name: "Alton Towers", country: "United Kingdom" },
  { id: "disneyland-park", name: "Disneyland Park", country: "United States" },
  { id: "europa-park", name: "Europa Park", country: "Germany" },
  { id: "cedar-point", name: "Cedar Point", country: "United States" },
  { id: "thorpe-park", name: "Thorpe Park", country: "United Kingdom" },
  {
    id: "six-flags-magic-mountain",
    name: "Six Flags Magic Mountain",
    country: "United States",
  },
];

export const mockCountrySuggestions: CountrySuggestion[] = [
  { id: "united-states", country: "United States" },
  { id: "united-kingdom", country: "United Kingdom" },
  { id: "germany", country: "Germany" },
  { id: "france", country: "France" },
  { id: "japan", country: "Japan" },
  { id: "netherlands", country: "Netherlands" },
];

export const mockManufacturerSuggestions: ManufacturerSuggestion[] = [
  { id: "bolliger-mabillard", manufacturer: "Bolliger & Mabillard" },
  { id: "intamin", manufacturer: "Intamin" },
  { id: "arrow-dynamics", manufacturer: "Arrow Dynamics" },
  { id: "vekoma", manufacturer: "Vekoma" },
  {
    id: "rocky-mountain-construction",
    manufacturer: "Rocky Mountain Construction",
  },
  { id: "premier-rides", manufacturer: "Premier Rides" },
];

export const mockModelSuggestions: ModelSuggestion[] = [
  {
    id: "inverted-coaster",
    model: "Inverted Coaster",
    manufacturer: "Bolliger & Mabillard",
  },
  {
    id: "wing-coaster",
    model: "Wing Coaster",
    manufacturer: "Bolliger & Mabillard",
  },
  {
    id: "accelerator-coaster",
    model: "Accelerator Coaster",
    manufacturer: "Intamin",
  },
  { id: "hyper-coaster", model: "Hyper Coaster", manufacturer: "Intamin" },
  { id: "i-box", model: "I-Box", manufacturer: "Rocky Mountain Construction" },
  {
    id: "sky-rocket-ii",
    model: "Sky Rocket II",
    manufacturer: "Premier Rides",
  },
];
