import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, beforeEach, it, expect } from "vitest";
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

describe("ParkAutocompleteInput", () => {
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
      <ParkAutocompleteInput
        {...defaultProps}
        placeholder="Enter park name..."
        label="Theme Park"
      />,
    );

    expect(screen.getByLabelText("Theme Park")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter park name..."),
    ).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(
      <ParkAutocompleteInput {...defaultProps} label="Theme Park" required />,
    );

    expect(screen.getByText("Theme Park *")).toBeInTheDocument();
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
        <ParkAutocompleteInput
          {...defaultProps}
          value={value}
          onChange={handleChange}
          label="Theme Park"
        />
      );
    };

    render(<TestWrapper />);

    const input = screen.getByLabelText("Theme Park");
    await user.type(input, "Alton");

    expect(onChange).toHaveBeenCalledWith("Alton");
  });

  it("shows error message when provided", () => {
    render(
      <ParkAutocompleteInput
        {...defaultProps}
        label="Theme Park"
        error="Failed to load parks"
      />,
    );

    expect(screen.getByText("Failed to load parks")).toBeInTheDocument();
  });
});

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
    await user.type(input, "United");

    expect(onChange).toHaveBeenCalledWith("United");
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
    await user.type(input, "Bolliger");

    expect(onChange).toHaveBeenCalledWith("Bolliger");
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

describe("ModelAutocompleteInput", () => {
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
      <ModelAutocompleteInput
        {...defaultProps}
        placeholder="Enter model..."
        label="Model"
      />,
    );

    expect(screen.getByLabelText("Model")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter model...")).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(<ModelAutocompleteInput {...defaultProps} label="Model" required />);

    expect(screen.getByText("Model *")).toBeInTheDocument();
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
        <ModelAutocompleteInput
          {...defaultProps}
          value={value}
          onChange={handleChange}
          label="Model"
        />
      );
    };

    render(<TestWrapper />);

    const input = screen.getByLabelText("Model");
    await user.type(input, "Wing");

    expect(onChange).toHaveBeenCalledWith("Wing");
  });

  it("shows error message when provided", () => {
    render(
      <ModelAutocompleteInput
        {...defaultProps}
        label="Model"
        error="Failed to load models"
      />,
    );

    expect(screen.getByText("Failed to load models")).toBeInTheDocument();
  });
});
