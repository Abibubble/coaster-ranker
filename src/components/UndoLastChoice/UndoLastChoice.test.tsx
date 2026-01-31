import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import UndoLastChoice from "./UndoLastChoice";
import { Coaster } from "../../types/data";
import { ComparisonResult } from "../../utils/ranking/newRankingEngine";

// Mock data
const mockCoaster1: Coaster = {
  id: "1",
  name: "Steel Vengeance",
  park: "Cedar Point",
  country: "USA",
  manufacturer: "Rocky Mountain Construction",
  model: "I-Box Track",
  material: "Steel",
  thrillLevel: "Extreme",
};

const mockCoaster2: Coaster = {
  id: "2",
  name: "The Voyage",
  park: "Holiday World",
  country: "USA",
  manufacturer: "The Gravity Group",
  model: "Custom",
  material: "Wood",
  thrillLevel: "High",
};

const mockLastComparison: ComparisonResult = {
  comparison: {
    coasterA: mockCoaster1,
    coasterB: mockCoaster2,
  },
  winner: mockCoaster1,
  loser: mockCoaster2,
};

describe("UndoLastChoice", () => {
  it("renders null when lastComparison is null", () => {
    const { container } = render(
      <UndoLastChoice lastComparison={null} canUndo={false} onUndo={vi.fn()} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders null when canUndo is false", () => {
    const { container } = render(
      <UndoLastChoice
        lastComparison={mockLastComparison}
        canUndo={false}
        onUndo={vi.fn()}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders the undo component when lastComparison exists and canUndo is true", () => {
    render(
      <UndoLastChoice
        lastComparison={mockLastComparison}
        canUndo={true}
        onUndo={vi.fn()}
      />,
    );

    expect(screen.getByText(/was ranked above/)).toBeInTheDocument();
    expect(screen.getByText(/Steel Vengeance/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Undo your last choice/ }),
    ).toBeInTheDocument();
  });

  it("calls onUndo when the undo button is clicked", () => {
    const mockOnUndo = vi.fn();
    render(
      <UndoLastChoice
        lastComparison={mockLastComparison}
        canUndo={true}
        onUndo={mockOnUndo}
      />,
    );

    const undoButton = screen.getByRole("button", {
      name: /Undo your last choice/,
    });
    fireEvent.click(undoButton);

    expect(mockOnUndo).toHaveBeenCalledTimes(1);
  });

  it("has proper accessibility attributes", () => {
    render(
      <UndoLastChoice
        lastComparison={mockLastComparison}
        canUndo={true}
        onUndo={vi.fn()}
      />,
    );

    // Check for proper ARIA attributes
    expect(screen.getByRole("region")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-label");
    expect(screen.getByRole("button")).toHaveAttribute("aria-describedby");
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");

    // Check for proper heading structure
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();

    // Check for live region for dynamic content
    expect(screen.getByText(/was ranked above/)).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("displays coaster names for both winner and loser", () => {
    render(
      <UndoLastChoice
        lastComparison={mockLastComparison}
        canUndo={true}
        onUndo={vi.fn()}
      />,
    );

    // Check that both coaster names are mentioned
    expect(screen.getByText(/Steel Vengeance/)).toBeInTheDocument();
    expect(screen.getByText(/The Voyage/)).toBeInTheDocument();
  });
});
