import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import AutocompleteInput, { AutocompleteInputProps } from "./AutocompleteInput";

const meta: Meta<typeof AutocompleteInput> = {
  title: "Components/AutocompleteInput",
  component: AutocompleteInput,
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

const mockSuggestions = [
  {
    id: "disneyland-park-united-states",
    name: "Disneyland Park",
    country: "United States",
  },
  {
    id: "disney-california-adventure-united-states",
    name: "Disney California Adventure",
    country: "United States",
  },
  {
    id: "disneyland-paris-france",
    name: "Disneyland Paris",
    country: "France",
  },
];

const AutocompleteWrapper = (args: AutocompleteInputProps) => {
  const [value, setValue] = useState(args.value || "");

  return (
    <AutocompleteInput
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
  render: (args) => <AutocompleteWrapper {...args} />,
  args: {
    placeholder: "Enter park name...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const WithLabel: Story = {
  render: (args) => <AutocompleteWrapper {...args} />,
  args: {
    label: "Park Name",
    placeholder: "Enter park name...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const Required: Story = {
  render: (args) => <AutocompleteWrapper {...args} />,
  args: {
    label: "Park Name",
    placeholder: "Enter park name...",
    required: true,
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const WithSuggestions: Story = {
  render: (args) => <AutocompleteWrapper {...args} />,
  args: {
    label: "Park Name",
    placeholder: "Enter park name...",
    value: "disney",
    suggestions: mockSuggestions,
    hasMinCharacters: true,
  },
};

export const Loading: Story = {
  render: (args) => <AutocompleteWrapper {...args} />,
  args: {
    label: "Park Name",
    placeholder: "Enter park name...",
    value: "disney",
    suggestions: [],
    isLoading: true,
    hasMinCharacters: true,
  },
};

export const WithError: Story = {
  render: (args) => <AutocompleteWrapper {...args} />,
  args: {
    label: "Park Name",
    placeholder: "Enter park name...",
    value: "invalid park",
    suggestions: [],
    hasMinCharacters: true,
    error: "Failed to load park suggestions",
  },
};

export const NoMinCharacters: Story = {
  render: (args) => <AutocompleteWrapper {...args} />,
  args: {
    label: "Park Name",
    placeholder: "Enter park name...",
    value: "di",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const WithCustomId: Story = {
  render: (args) => <AutocompleteWrapper {...args} />,
  args: {
    label: "Park Name",
    placeholder: "Enter park name...",
    id: "custom-park-input",
    name: "parkName",
    suggestions: [],
    hasMinCharacters: false,
  },
};
