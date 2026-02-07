import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import ManufacturerAutocompleteInput from "./ManufacturerAutocompleteInput";
import { mockManufacturerSuggestions } from "../../mocks";

describe("ManufacturerAutocompleteInput", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    suggestions: [],
    hasMinCharacters: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with basic props", () => {
    render(
      <ManufacturerAutocompleteInput
        {...defaultProps}
        placeholder="Enter manufacturer..."
        label="Manufacturer"
      />,
    );

    expect(screen.getByLabelText("Manufacturer")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter manufacturer..."),
    ).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(
      <ManufacturerAutocompleteInput
        {...defaultProps}
        label="Manufacturer"
        required
      />,
    );

    expect(screen.getByText("Manufacturer *")).toBeInTheDocument();
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
        <ManufacturerAutocompleteInput
          {...defaultProps}
          value={value}
          onChange={handleChange}
          label="Manufacturer"
        />
      );
    };

    render(<TestWrapper />);

    const input = screen.getByLabelText("Manufacturer");
    await user.type(input, "Int");

    expect(onChange).toHaveBeenCalledWith("Int");
  });

  it("shows error message when provided", () => {
    render(
      <ManufacturerAutocompleteInput
        {...defaultProps}
        label="Manufacturer"
        error="Failed to load manufacturers"
      />,
    );

    expect(
      screen.getByText("Failed to load manufacturers"),
    ).toBeInTheDocument();
  });
});
