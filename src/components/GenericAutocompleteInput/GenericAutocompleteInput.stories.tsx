import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import GenericAutocompleteInput, {
  AutocompleteConfig,
} from "./GenericAutocompleteInput";

interface StoryItem {
  id: string;
  name: string;
  category: string;
}

const meta: Meta<typeof GenericAutocompleteInput> = {
  title: "Components/GenericAutocompleteInput",
  component: GenericAutocompleteInput,
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

const mockSuggestions: StoryItem[] = [
  { id: "item-1", name: "Apple", category: "Fruit" },
  { id: "item-2", name: "Banana", category: "Fruit" },
  { id: "item-3", name: "Carrot", category: "Vegetable" },
  { id: "item-4", name: "Broccoli", category: "Vegetable" },
];

const storyConfig: AutocompleteConfig<
  StoryItem,
  { name: string; category: string }
> = {
  primaryText: (item) => item.name,
  secondaryText: (item) => item.category,
  getValue: (item) => item.name,
  getSelectionData: (item) => ({ name: item.name, category: item.category }),
  getId: (item) => item.id,
  ariaLabel: "Search items",
  noResultsMessage: "No items found",
};

interface WrapperArgs {
  value?: string;
  onChange?: (value: string) => void;
  onSuggestionSelect?: (selectionData: {
    name: string;
    category: string;
  }) => void;
  suggestions?: StoryItem[];
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

const GenericAutocompleteWrapper = (args: WrapperArgs) => {
  const [value, setValue] = useState(args.value || "");

  return (
    <GenericAutocompleteInput<StoryItem, { name: string; category: string }>
      config={storyConfig}
      suggestions={args.suggestions || []}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        args.onChange?.(newValue);
      }}
      placeholder={args.placeholder}
      label={args.label}
      required={args.required}
      id={args.id}
      name={args.name}
      autoComplete={args.autoComplete}
      isLoading={args.isLoading}
      error={args.error}
      hasMinCharacters={args.hasMinCharacters}
      aria-label={args["aria-label"]}
      data-form-type={args["data-form-type"]}
      onSuggestionSelect={args.onSuggestionSelect}
    />
  );
};

export const Default: Story = {
  render: (args) => <GenericAutocompleteWrapper {...(args as WrapperArgs)} />,
  args: {
    placeholder: "Enter item name...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const WithLabel: Story = {
  render: (args) => <GenericAutocompleteWrapper {...(args as WrapperArgs)} />,
  args: {
    label: "Item",
    placeholder: "Enter item name...",
    suggestions: [],
    hasMinCharacters: false,
  },
};

export const WithSuggestions: Story = {
  render: (args) => (
    <GenericAutocompleteWrapper
      {...(args as WrapperArgs)}
      suggestions={mockSuggestions}
    />
  ),
  args: {
    label: "Item",
    placeholder: "Enter item name...",
    hasMinCharacters: true,
    value: "a",
  },
};

export const Loading: Story = {
  render: (args) => <GenericAutocompleteWrapper {...(args as WrapperArgs)} />,
  args: {
    label: "Item",
    placeholder: "Enter item name...",
    suggestions: [],
    isLoading: true,
    hasMinCharacters: true,
    value: "test",
  },
};

export const WithError: Story = {
  render: (args) => <GenericAutocompleteWrapper {...(args as WrapperArgs)} />,
  args: {
    label: "Item",
    placeholder: "Enter item name...",
    suggestions: [],
    error: "Failed to load items",
    hasMinCharacters: true,
    value: "test",
  },
};

export const Required: Story = {
  render: (args) => <GenericAutocompleteWrapper {...(args as WrapperArgs)} />,
  args: {
    label: "Item",
    placeholder: "Enter item name...",
    required: true,
    suggestions: [],
    hasMinCharacters: false,
  },
};
