import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import CountryAutocompleteInput, {
  CountryAutocompleteInputProps,
} from "./CountryAutocompleteInput";
import { mockCountrySuggestions } from "../../mocks";

const meta: Meta<typeof CountryAutocompleteInput> = {
  title: "Components/CountryAutocompleteInput",
  component: CountryAutocompleteInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "text" },
    },
    placeholder: {
      control: { type: "text" },
    },
    label: {
      control: { type: "text" },
    },
    required: {
      control: { type: "boolean" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
    hasMinCharacters: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "text" },
    },
    onChange: { action: "changed" },
    onSuggestionSelect: { action: "suggestion-selected" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const CountryAutocompleteWrapper = (args: CountryAutocompleteInputProps) => {
  const [value, setValue] = useState(args.value || "");

  return (
    <CountryAutocompleteInput
      {...args}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        args.onChange?.(newValue);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <CountryAutocompleteWrapper {...args} />,
  args: {
    placeholder: "Enter country...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const WithLabel: Story = {
  render: (args) => <CountryAutocompleteWrapper {...args} />,
  args: {
    label: "Country",
    placeholder: "Enter country...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const WithSuggestions: Story = {
  render: (args) => <CountryAutocompleteWrapper {...args} />,
  args: {
    label: "Country",
    placeholder: "Enter country...",
    suggestions: mockCountrySuggestions,
    hasMinCharacters: true,
    value: "uni",
  },
};

export const Loading: Story = {
  render: (args) => <CountryAutocompleteWrapper {...args} />,
  args: {
    label: "Country",
    placeholder: "Enter country...",
    suggestions: [],
    isLoading: true,
    hasMinCharacters: true,
    value: "uni",
  },
};

export const WithError: Story = {
  render: (args) => <CountryAutocompleteWrapper {...args} />,
  args: {
    label: "Country",
    placeholder: "Enter country...",
    suggestions: [],
    error: "Failed to load countries",
    hasMinCharacters: true,
    value: "test",
  },
};

export const Required: Story = {
  render: (args) => <CountryAutocompleteWrapper {...args} />,
  args: {
    label: "Country",
    placeholder: "Enter country...",
    required: true,
    suggestions: [],
    hasMinCharacters: false,
  },
};
