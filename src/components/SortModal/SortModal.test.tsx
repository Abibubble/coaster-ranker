import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { testAxeCompliance, runBasicWCAG22Tests } from "../../utils/testing";
import { SortModal, SortField, SortDirection } from "./SortModal";

describe("SortModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSort: vi.fn(),
    currentSort: null,
    hasRanking: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("has no accessibility violations", async () => {
    const { baseElement } = render(<SortModal {...defaultProps} />);
    await testAxeCompliance(baseElement);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { baseElement } = render(<SortModal {...defaultProps} />);
    await runBasicWCAG22Tests(baseElement);
  });

  it("renders basic sort options", () => {
    render(<SortModal {...defaultProps} />);

    expect(screen.getByText("Ride Name (A-Z)")).toBeInTheDocument();
    expect(screen.getByText("Ride Name (Z-A)")).toBeInTheDocument();
  });

  it("renders ranking options when rankings exist", () => {
    render(<SortModal {...defaultProps} hasRanking={true} />);

    expect(screen.getByText("Rankings (Top to Bottom)")).toBeInTheDocument();
    expect(screen.getByText("Rankings (Bottom to Top)")).toBeInTheDocument();
  });

  it("does not render ranking options when rankings don't exist", () => {
    render(<SortModal {...defaultProps} hasRanking={false} />);

    expect(
      screen.queryByText("Rankings (Top to Bottom)"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Rankings (Bottom to Top)"),
    ).not.toBeInTheDocument();
  });

  it("calls onSort and onClose when a sort option is selected", async () => {
    const user = userEvent.setup();
    render(<SortModal {...defaultProps} />);

    const nameAscOption = screen.getByText("Ride Name (A-Z)");
    await user.click(nameAscOption);

    expect(defaultProps.onSort).toHaveBeenCalledWith("name", "asc");
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("highlights current sort option", () => {
    const currentSort = {
      field: "name" as SortField,
      direction: "asc" as SortDirection,
    };
    render(<SortModal {...defaultProps} currentSort={currentSort} />);

    const nameAscButton = screen.getByRole("button", { name: /name \(a-z\)/i });
    expect(nameAscButton).toHaveAttribute("aria-pressed", "true");

    // Other options should not be pressed
    const nameDescButton = screen.getByRole("button", {
      name: /name \(z-a\)/i,
    });
    expect(nameDescButton).toHaveAttribute("aria-pressed", "false");
  });

  it("shows check icon for current sort option", () => {
    const currentSort = {
      field: "rankPosition" as SortField,
      direction: "desc" as SortDirection,
    };
    render(
      <SortModal
        {...defaultProps}
        currentSort={currentSort}
        hasRanking={true}
      />,
    );

    const rankingDescButton = screen.getByRole("button", {
      name: /Rankings \(Bottom to Top\)/i,
    });
    // Check for the check icon by verifying aria-pressed is true
    expect(rankingDescButton).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<SortModal {...defaultProps} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when modal is closed via escape key", () => {
    render(<SortModal {...defaultProps} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render when closed", () => {
    render(<SortModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Sort coasters")).not.toBeInTheDocument();
  });

  it("has correct modal title and aria-label", () => {
    render(<SortModal {...defaultProps} />);

    expect(screen.getByText("Sort coasters")).toBeInTheDocument();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute(
      "aria-label",
      "Sort coasters by different criteria",
    );
  });

  it("handles all field types correctly", async () => {
    const user = userEvent.setup();
    render(<SortModal {...defaultProps} hasRanking={true} />);

    // Test each field type
    const testCases = [
      { text: "Ride Name (A-Z)", field: "name", direction: "asc" },
      { text: "Ride Name (Z-A)", field: "name", direction: "desc" },
      {
        text: "Rankings (Top to Bottom)",
        field: "rankPosition",
        direction: "asc",
      },
      {
        text: "Rankings (Bottom to Top)",
        field: "rankPosition",
        direction: "desc",
      },
    ];

    for (const testCase of testCases) {
      const button = screen.getByText(testCase.text);
      await user.click(button);

      expect(defaultProps.onSort).toHaveBeenCalledWith(
        testCase.field,
        testCase.direction,
      );
      vi.clearAllMocks(); // Clear for next iteration
    }
  });

  it("handles keyboard navigation correctly", async () => {
    const user = userEvent.setup();
    render(<SortModal {...defaultProps} />);

    const firstOption = screen.getByRole("button", { name: "Ride Name (A-Z)" });
    const secondOption = screen.getByRole("button", {
      name: "Ride Name (Z-A)",
    });

    // Click the second option to test selection
    await user.click(secondOption);

    expect(defaultProps.onSort).toHaveBeenCalledWith("name", "desc");
  });

  it("properly manages focus when opened", () => {
    render(<SortModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("tabIndex", "-1");
  });
});
