import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { screen } from "@testing-library/react";
import { vi } from "vitest";
import CoasterComparison from "./CoasterComparison";
import { comparisonCoasters } from "../../mocks";

const defaultProps = {
  coaster1: {
    ...comparisonCoasters.steelVengeance,
    country: "USA",
    material: "Steel",
  },
  coaster2: {
    ...comparisonCoasters.fury325,
    country: "USA",
    manufacturer: "Bolliger & Mabillard",
    model: "Giga Coaster",
    material: "Steel",
  },
  onChoose1: vi.fn(),
  onChoose2: vi.fn(),
};

describe("CoasterComparison", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CoasterComparison {...defaultProps} />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<CoasterComparison {...defaultProps} />);
    await runBasicWCAG22Tests(container);
  });

  it("displays coaster names as card titles when names are present", () => {
    render(<CoasterComparison {...defaultProps} />);

    expect(screen.getByText("Steel Vengeance")).toBeInTheDocument();
    expect(screen.getByText("Fury 325")).toBeInTheDocument();
  });

  it("shows fallback labels when coaster names are missing", () => {
    const propsWithoutNames = {
      ...defaultProps,
      coaster1: { ...defaultProps.coaster1, name: "" },
      coaster2: { ...defaultProps.coaster2, name: "" },
    };

    render(<CoasterComparison {...propsWithoutNames} />);

    expect(screen.getByText("Coaster 1")).toBeInTheDocument();
    expect(screen.getByText("Coaster 2")).toBeInTheDocument();
  });

  it("uses custom labels when provided", () => {
    render(
      <CoasterComparison
        {...defaultProps}
        coaster1Label="Existing Coaster"
        coaster2Label="New Coaster"
      />,
    );

    expect(screen.getByText("Existing Coaster")).toBeInTheDocument();
    expect(screen.getByText("New Coaster")).toBeInTheDocument();
  });

  it("only displays fields that have values", () => {
    const propsWithEmptyFields = {
      ...defaultProps,
      coaster1: {
        ...defaultProps.coaster1,
        model: "",
        thrillLevel: "",
      },
      coaster2: {
        ...defaultProps.coaster2,
        model: "Giga Coaster",
        material: "Steel",
      },
    };

    render(<CoasterComparison {...propsWithEmptyFields} />);

    expect(screen.getAllByText("Manufacturer:")).toHaveLength(2);
    expect(screen.getByText("Rocky Mountain Construction")).toBeInTheDocument();
    expect(screen.getByText("Bolliger & Mabillard")).toBeInTheDocument();

    expect(screen.getByText("Giga Coaster")).toBeInTheDocument();
    expect(screen.getAllByText("Steel")).toHaveLength(2);

    const modelLabels = screen.getAllByText("Model:");
    expect(modelLabels).toHaveLength(1);

    const materialLabels = screen.getAllByText("Material:");
    expect(materialLabels).toHaveLength(2);

    expect(screen.queryByText("Thrill Level:")).not.toBeInTheDocument();
  });
});
