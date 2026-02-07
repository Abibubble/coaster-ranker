import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ManufacturerAutocompleteInput, {
  ManufacturerAutocompleteInputProps,
} from "./ManufacturerAutocompleteInput";
import { mockManufacturerSuggestions } from "../../mocks";

const meta: Meta<typeof ManufacturerAutocompleteInput> = {
  title: "Components/ManufacturerAutocompleteInput",
  component: ManufacturerAutocompleteInput,
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

const ManufacturerAutocompleteWrapper = (
  args: ManufacturerAutocompleteInputProps,
) => {
  const [value, setValue] = useState(args.value || "");

  return (
    <ManufacturerAutocompleteInput
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
  render: (args) => <ManufacturerAutocompleteWrapper {...args} />,
  args: {
    placeholder: "Enter manufacturer...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const WithLabel: Story = {
  render: (args) => <ManufacturerAutocompleteWrapper {...args} />,
  args: {
    label: "Manufacturer",
    placeholder: "Enter manufacturer...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const WithSuggestions: Story = {
  render: (args) => <ManufacturerAutocompleteWrapper {...args} />,
  args: {
    label: "Manufacturer",
    placeholder: "Enter manufacturer...",
    suggestions: mockManufacturerSuggestions,
    hasMinCharacters: true,
    value: "b",
  },
};

export const Loading: Story = {
  render: (args) => <ManufacturerAutocompleteWrapper {...args} />,
  args: {
    label: "Manufacturer",
    placeholder: "Enter manufacturer...",
    suggestions: [],
    isLoading: true,
    hasMinCharacters: true,
    value: "int",
  },
};

export const WithError: Story = {
  render: (args) => <ManufacturerAutocompleteWrapper {...args} />,
  args: {
    label: "Manufacturer",
    placeholder: "Enter manufacturer...",
    suggestions: [],
    error: "Failed to load manufacturers",
    hasMinCharacters: true,
    value: "test",
  },
};

export const Required: Story = {
  render: (args) => <ManufacturerAutocompleteWrapper {...args} />,
  args: {
    label: "Manufacturer",
    placeholder: "Enter manufacturer...",
    required: true,
    suggestions: [],
    hasMinCharacters: false,
  },
};
