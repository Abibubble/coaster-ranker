import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { testAxeCompliance, runBasicWCAG22Tests } from "../../utils/testing";
import AutocompleteInput from "./AutocompleteInput";
import { mockParkSuggestions } from "../../mocks";

describe("AutocompleteInput", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    suggestions: [],
    hasMinCharacters: false,
    id: "test-autocomplete",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AutocompleteInput {...defaultProps} aria-label="Search parks" />,
    );
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(
      <AutocompleteInput
        {...defaultProps}
        label="Park Name"
        autoComplete="off"
      />,
    );
    await runBasicWCAG22Tests(container);
  });

  it("renders with basic props", () => {
    render(
      <AutocompleteInput
        {...defaultProps}
        placeholder="Enter park name..."
        label="Park Name"
      />,
    );

    expect(screen.getByLabelText("Park Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter park name..."),
    ).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(<AutocompleteInput {...defaultProps} label="Park Name" required />);

    expect(screen.getByText("Park Name *")).toBeInTheDocument();
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    // Create a wrapper component that manages the value state
    const TestWrapper = () => {
      const [value, setValue] = useState("");
      const handleChange = (newValue: string) => {
        setValue(newValue);
        onChange(newValue);
      };

      return (
        <AutocompleteInput
          {...defaultProps}
          value={value}
          onChange={handleChange}
          label="Park Name"
        />
      );
    };

    render(<TestWrapper />);

    const input = screen.getByLabelText("Park Name");
    await user.type(input, "disney");

    // Check that onChange was called for each character
    expect(onChange).toHaveBeenCalledTimes(6); // d, i, s, n, e, y
    expect(onChange).toHaveBeenNthCalledWith(1, "d");
    expect(onChange).toHaveBeenNthCalledWith(2, "di");
    expect(onChange).toHaveBeenNthCalledWith(3, "dis");
    expect(onChange).toHaveBeenNthCalledWith(4, "disn");
    expect(onChange).toHaveBeenNthCalledWith(5, "disne");
    expect(onChange).toHaveBeenNthCalledWith(6, "disney");
  });

  it("displays suggestions when hasMinCharacters is true and suggestions exist", async () => {
    render(
      <AutocompleteInput
        {...defaultProps}
        value="disney"
        suggestions={mockParkSuggestions}
        hasMinCharacters={true}
        label="Park Name"
      />,
    );

    // Click input to open dropdown
    const input = screen.getByLabelText("Park Name");
    await userEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText("Disneyland Park")).toBeInTheDocument();
    });
    expect(screen.getByText("Alton Towers")).toBeInTheDocument();
    expect(screen.getByText("Europa Park")).toBeInTheDocument();
  });

  it("does not display suggestions when hasMinCharacters is false", () => {
    render(
      <AutocompleteInput
        {...defaultProps}
        value="disney"
        suggestions={mockParkSuggestions}
        hasMinCharacters={false}
        label="Park Name"
      />,
    );

    expect(screen.queryByText("Disneyland Park")).not.toBeInTheDocument();
  });

  it("calls onSuggestionSelect when suggestion is clicked", async () => {
    const user = userEvent.setup();
    const onSuggestionSelect = vi.fn();

    render(
      <AutocompleteInput
        {...defaultProps}
        value="disney"
        suggestions={mockParkSuggestions}
        hasMinCharacters={true}
        onSuggestionSelect={onSuggestionSelect}
        label="Park Name"
      />,
    );

    // Click input to open dropdown
    const input = screen.getByLabelText("Park Name");
    await user.click(input);

    const suggestion = await screen.findByText("Disneyland Park");
    await user.click(suggestion);

    expect(onSuggestionSelect).toHaveBeenCalledWith({
      id: "disneyland-park",
      name: "Disneyland Park",
      country: "United States",
    });
  });

  it("navigates suggestions with keyboard", async () => {
    const user = userEvent.setup();

    render(
      <AutocompleteInput
        {...defaultProps}
        value="disney"
        suggestions={mockParkSuggestions}
        hasMinCharacters={true}
        label="Park Name"
      />,
    );

    const input = screen.getByLabelText("Park Name");
    await user.click(input); // Open dropdown first

    await waitFor(() => {
      expect(screen.getByText("Disneyland Park")).toBeInTheDocument();
    });

    await user.keyboard("{ArrowDown}");

    expect(input).toHaveAttribute("aria-activedescendant", "suggestion-0");
  });

  it("selects suggestion with Enter key", async () => {
    const user = userEvent.setup();
    const onSuggestionSelect = vi.fn();

    render(
      <AutocompleteInput
        {...defaultProps}
        value="disney"
        suggestions={mockParkSuggestions}
        hasMinCharacters={true}
        onSuggestionSelect={onSuggestionSelect}
        label="Park Name"
      />,
    );

    const input = screen.getByLabelText("Park Name");
    await user.click(input);
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(onSuggestionSelect).toHaveBeenCalledWith(mockParkSuggestions[0]);
  });

  it("closes suggestions with Escape key", async () => {
    const user = userEvent.setup();

    render(
      <AutocompleteInput
        {...defaultProps}
        value="disney"
        suggestions={mockParkSuggestions}
        hasMinCharacters={true}
        label="Park Name"
      />,
    );

    const input = screen.getByLabelText("Park Name");
    await user.click(input);

    expect(screen.getByText("Disneyland Park")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByText("Disneyland Park")).not.toBeInTheDocument();
    });
  });

  it("shows loading indicator when isLoading is true", () => {
    render(
      <AutocompleteInput
        {...defaultProps}
        isLoading={true}
        label="Park Name"
      />,
    );

    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("displays error message when error is provided", () => {
    render(
      <AutocompleteInput
        {...defaultProps}
        error="Failed to load suggestions"
        hasMinCharacters={true}
        label="Park Name"
      />,
    );

    expect(screen.getByText("Failed to load suggestions")).toBeInTheDocument();
  });

  it('shows "No results found" when no suggestions and not loading', async () => {
    render(
      <AutocompleteInput
        {...defaultProps}
        value="xyz"
        suggestions={[]}
        hasMinCharacters={true}
        isLoading={false}
        label="Park Name"
      />,
    );

    // Focus input to open dropdown
    const input = screen.getByLabelText("Park Name");
    input.focus();

    await waitFor(() => {
      expect(screen.getByText(/No parks found/)).toBeInTheDocument();
    });
  });

  it("has proper ARIA attributes", async () => {
    render(
      <AutocompleteInput
        {...defaultProps}
        value="disney"
        suggestions={mockParkSuggestions}
        hasMinCharacters={true}
        label="Park Name"
      />,
    );

    const input = screen.getByLabelText("Park Name");

    // Check basic ARIA attributes
    expect(input).toHaveAttribute("role", "combobox");
    expect(input).toHaveAttribute("aria-haspopup", "listbox");
    expect(input).toHaveAttribute("aria-autocomplete", "list");

    // Click to open dropdown
    await userEvent.click(input);

    // After opening, should have expanded=true
    await waitFor(() => {
      expect(input).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("closes suggestions when clicking outside", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <AutocompleteInput
          {...defaultProps}
          value="disney"
          suggestions={mockParkSuggestions}
          hasMinCharacters={true}
          label="Park Name"
        />
        <button>Outside button</button>
      </div>,
    );

    const input = screen.getByLabelText("Park Name");
    await user.click(input);

    expect(screen.getByText("Disneyland Park")).toBeInTheDocument();

    const outsideButton = screen.getByText("Outside button");
    await user.click(outsideButton);

    await waitFor(() => {
      expect(screen.queryByText("Disneyland Park")).not.toBeInTheDocument();
    });
  });
});
