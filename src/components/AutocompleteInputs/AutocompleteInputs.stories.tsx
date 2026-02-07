import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  ParkAutocompleteInput,
  CountryAutocompleteInput,
  ManufacturerAutocompleteInput,
  ModelAutocompleteInput,
  type ParkSuggestion,
  type CountrySuggestion,
  type ManufacturerSuggestion,
  type ModelSuggestion,
} from "./AutocompleteInputs";
import {
  mockParkSuggestions,
  mockCountrySuggestions,
  mockManufacturerSuggestions,
  mockModelSuggestions,
} from "../../mocks";

const meta: Meta = {
  title: "Components/AutocompleteInputs",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Unified autocomplete input components for different data types.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

const ParkWrapper = (args: Record<string, unknown>) => {
  const [value, setValue] = useState((args.value as string) || "");
  return (
    <ParkAutocompleteInput
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        (args.onChange as (value: string) => void)?.(newValue);
      }}
      suggestions={(args.suggestions as ParkSuggestion[]) || []}
      placeholder={args.placeholder as string}
      label={args.label as string}
      required={args.required as boolean}
      id={args.id as string}
      name={args.name as string}
      autoComplete={args.autoComplete as string}
      isLoading={args.isLoading as boolean}
      error={args.error as string | null}
      hasMinCharacters={args.hasMinCharacters as boolean}
      aria-label={args["aria-label"] as string}
      data-form-type={args["data-form-type"] as string}
      onSuggestionSelect={
        args.onSuggestionSelect as
          | ((suggestion: { name: string; country: string }) => void)
          | undefined
      }
    />
  );
};

const CountryWrapper = (args: Record<string, unknown>) => {
  const [value, setValue] = useState((args.value as string) || "");
  return (
    <CountryAutocompleteInput
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        (args.onChange as (value: string) => void)?.(newValue);
      }}
      suggestions={(args.suggestions as CountrySuggestion[]) || []}
      placeholder={args.placeholder as string}
      label={args.label as string}
      required={args.required as boolean}
      id={args.id as string}
      name={args.name as string}
      autoComplete={args.autoComplete as string}
      isLoading={args.isLoading as boolean}
      error={args.error as string | null}
      hasMinCharacters={args.hasMinCharacters as boolean}
      aria-label={args["aria-label"] as string}
      data-form-type={args["data-form-type"] as string}
      onSuggestionSelect={
        args.onSuggestionSelect as
          | ((suggestion: { country: string }) => void)
          | undefined
      }
    />
  );
};

const ManufacturerWrapper = (args: Record<string, unknown>) => {
  const [value, setValue] = useState((args.value as string) || "");
  return (
    <ManufacturerAutocompleteInput
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        (args.onChange as (value: string) => void)?.(newValue);
      }}
      suggestions={(args.suggestions as ManufacturerSuggestion[]) || []}
      placeholder={args.placeholder as string}
      label={args.label as string}
      required={args.required as boolean}
      id={args.id as string}
      name={args.name as string}
      autoComplete={args.autoComplete as string}
      isLoading={args.isLoading as boolean}
      error={args.error as string | null}
      hasMinCharacters={args.hasMinCharacters as boolean}
      aria-label={args["aria-label"] as string}
      data-form-type={args["data-form-type"] as string}
      onSuggestionSelect={
        args.onSuggestionSelect as
          | ((suggestion: { manufacturer: string }) => void)
          | undefined
      }
    />
  );
};

const ModelWrapper = (args: Record<string, unknown>) => {
  const [value, setValue] = useState((args.value as string) || "");
  return (
    <ModelAutocompleteInput
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        (args.onChange as (value: string) => void)?.(newValue);
      }}
      suggestions={(args.suggestions as ModelSuggestion[]) || []}
      placeholder={args.placeholder as string}
      label={args.label as string}
      required={args.required as boolean}
      id={args.id as string}
      name={args.name as string}
      autoComplete={args.autoComplete as string}
      isLoading={args.isLoading as boolean}
      error={args.error as string | null}
      hasMinCharacters={args.hasMinCharacters as boolean}
      aria-label={args["aria-label"] as string}
      data-form-type={args["data-form-type"] as string}
      onSuggestionSelect={
        args.onSuggestionSelect as
          | ((suggestion: { model: string }) => void)
          | undefined
      }
    />
  );
};

type ParkStory = StoryObj<typeof ParkAutocompleteInput>;

export const ParkDefault: ParkStory = {
  render: (args) => <ParkWrapper {...args} />,
  name: "Park - Default",
  args: {
    placeholder: "Enter theme park name...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const ParkWithLabel: ParkStory = {
  render: (args) => <ParkWrapper {...args} />,
  name: "Park - With Label",
  args: {
    label: "Theme Park",
    placeholder: "Enter theme park name...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const ParkWithSuggestions: ParkStory = {
  render: (args) => <ParkWrapper {...args} />,
  name: "Park - With Suggestions",
  args: {
    label: "Theme Park",
    placeholder: "Enter theme park name...",
    value: "a",
    suggestions: mockParkSuggestions,
    hasMinCharacters: true,
  },
};

export const ParkRequired: ParkStory = {
  render: (args) => <ParkWrapper {...args} />,
  name: "Park - Required",
  args: {
    label: "Theme Park",
    placeholder: "Enter theme park name...",
    required: true,
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const ParkLoading: ParkStory = {
  render: (args) => <ParkWrapper {...args} />,
  name: "Park - Loading",
  args: {
    label: "Theme Park",
    placeholder: "Enter theme park name...",
    value: "test",
    suggestions: [],
    isLoading: true,
    hasMinCharacters: true,
  },
};

export const ParkWithError: ParkStory = {
  render: (args) => <ParkWrapper {...args} />,
  name: "Park - With Error",
  args: {
    label: "Theme Park",
    placeholder: "Enter theme park name...",
    value: "test",
    suggestions: [],
    error: "Failed to load park suggestions",
    hasMinCharacters: true,
  },
};

type CountryStory = StoryObj<typeof CountryAutocompleteInput>;

export const CountryDefault: CountryStory = {
  render: (args) => <CountryWrapper {...args} />,
  name: "Country - Default",
  args: {
    placeholder: "Enter country...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const CountryWithLabel: CountryStory = {
  render: (args) => <CountryWrapper {...args} />,
  name: "Country - With Label",
  args: {
    label: "Country",
    placeholder: "Enter country...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const CountryWithSuggestions: CountryStory = {
  render: (args) => <CountryWrapper {...args} />,
  name: "Country - With Suggestions",
  args: {
    label: "Country",
    placeholder: "Enter country...",
    value: "u",
    suggestions: mockCountrySuggestions,
    hasMinCharacters: true,
  },
};

export const CountryRequired: CountryStory = {
  render: (args) => <CountryWrapper {...args} />,
  name: "Country - Required",
  args: {
    label: "Country",
    placeholder: "Enter country...",
    required: true,
    suggestions: [],
    hasMinCharacters: false,
  },
};

type ManufacturerStory = StoryObj<typeof ManufacturerAutocompleteInput>;

export const ManufacturerDefault: ManufacturerStory = {
  render: (args) => <ManufacturerWrapper {...args} />,
  name: "Manufacturer - Default",
  args: {
    placeholder: "Enter manufacturer...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const ManufacturerWithLabel: ManufacturerStory = {
  render: (args) => <ManufacturerWrapper {...args} />,
  name: "Manufacturer - With Label",
  args: {
    label: "Manufacturer",
    placeholder: "Enter manufacturer...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const ManufacturerWithSuggestions: ManufacturerStory = {
  render: (args) => <ManufacturerWrapper {...args} />,
  name: "Manufacturer - With Suggestions",
  args: {
    label: "Manufacturer",
    placeholder: "Enter manufacturer...",
    value: "b",
    suggestions: mockManufacturerSuggestions,
    hasMinCharacters: true,
  },
};

export const ManufacturerRequired: ManufacturerStory = {
  render: (args) => <ManufacturerWrapper {...args} />,
  name: "Manufacturer - Required",
  args: {
    label: "Manufacturer",
    placeholder: "Enter manufacturer...",
    required: true,
    suggestions: [],
    hasMinCharacters: false,
  },
};

type ModelStory = StoryObj<typeof ModelAutocompleteInput>;

export const ModelDefault: ModelStory = {
  render: (args) => <ModelWrapper {...args} />,
  name: "Model - Default",
  args: {
    placeholder: "Enter model...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const ModelWithLabel: ModelStory = {
  render: (args) => <ModelWrapper {...args} />,
  name: "Model - With Label",
  args: {
    label: "Coaster Model",
    placeholder: "Enter model...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const ModelWithSuggestions: ModelStory = {
  render: (args) => <ModelWrapper {...args} />,
  name: "Model - With Suggestions",
  args: {
    label: "Coaster Model",
    placeholder: "Enter model...",
    value: "c",
    suggestions: mockModelSuggestions,
    hasMinCharacters: true,
  },
};

export const ModelRequired: ModelStory = {
  render: (args) => <ModelWrapper {...args} />,
  name: "Model - Required",
  args: {
    label: "Coaster Model",
    placeholder: "Enter model...",
    required: true,
    suggestions: [],
    hasMinCharacters: false,
  },
};
