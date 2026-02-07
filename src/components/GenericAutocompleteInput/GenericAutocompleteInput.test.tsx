import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import GenericAutocompleteInput, {
  AutocompleteConfig,
} from "./GenericAutocompleteInput";

interface TestItem {
  id: string;
  name: string;
  category: string;
}

const mockSuggestions: TestItem[] = [
  { id: "item-1", name: "Apple", category: "Fruit" },
  { id: "item-2", name: "Banana", category: "Fruit" },
];

const testConfig: AutocompleteConfig<
  TestItem,
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

describe("GenericAutocompleteInput", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    suggestions: [],
    config: testConfig,
    hasMinCharacters: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with basic props", () => {
    render(
      <GenericAutocompleteInput
        {...defaultProps}
        placeholder="Enter item..."
        label="Item"
      />,
    );

    expect(screen.getByLabelText("Item")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter item...")).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(
      <GenericAutocompleteInput {...defaultProps} label="Item" required />,
    );

    expect(screen.getByText("Item *")).toBeInTheDocument();
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const TestWrapper = () => {
      const [value, setValue] = useState("");
      const handleChange = (newValue: string) => {
        setValue(newValue);
        onChange(newValue);
      };

      return (
        <GenericAutocompleteInput
          {...defaultProps}
          value={value}
          onChange={handleChange}
          label="Item"
        />
      );
    };

    render(<TestWrapper />);

    const input = screen.getByLabelText("Item");
    await user.type(input, "App");

    expect(onChange).toHaveBeenCalledWith("App");
  });

  it("shows error message when provided", () => {
    render(
      <GenericAutocompleteInput
        {...defaultProps}
        label="Item"
        error="Failed to load items"
      />,
    );

    expect(screen.getByText("Failed to load items")).toBeInTheDocument();
  });
});
