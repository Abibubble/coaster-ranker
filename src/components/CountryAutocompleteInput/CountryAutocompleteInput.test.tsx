import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import CountryAutocompleteInput from "./CountryAutocompleteInput";
import { mockCountrySuggestions } from "../../mocks";

describe("CountryAutocompleteInput", () => {
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
      <CountryAutocompleteInput
        {...defaultProps}
        placeholder="Enter country..."
        label="Country"
      />,
    );

    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter country...")).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(
      <CountryAutocompleteInput {...defaultProps} label="Country" required />,
    );

    expect(screen.getByText("Country *")).toBeInTheDocument();
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
        <CountryAutocompleteInput
          {...defaultProps}
          value={value}
          onChange={handleChange}
          label="Country"
        />
      );
    };

    render(<TestWrapper />);

    const input = screen.getByLabelText("Country");
    await user.type(input, "US");

    expect(onChange).toHaveBeenCalledWith("US");
  });

  it("shows error message when provided", () => {
    render(
      <CountryAutocompleteInput
        {...defaultProps}
        label="Country"
        error="Failed to load countries"
      />,
    );

    expect(screen.getByText("Failed to load countries")).toBeInTheDocument();
  });
});
