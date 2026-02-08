import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { testAxeCompliance, runBasicWCAG22Tests } from "../../utils/testing";
import RideTypeToggle from "./RideTypeToggle";
import { RideType } from "../../types/data";

describe("RideTypeToggle", () => {
  const mockOnChange = vi.fn();

  const defaultProps = {
    value: "coaster" as RideType,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<RideTypeToggle {...defaultProps} />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<RideTypeToggle {...defaultProps} />);
    await runBasicWCAG22Tests(container);
  });

  it("renders both tab options", () => {
    render(<RideTypeToggle {...defaultProps} />);

    expect(
      screen.getByRole("tab", { name: "Roller Coasters" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Dark Rides" })).toBeInTheDocument();
  });

  it("shows coaster tab as selected when value is 'coaster'", () => {
    render(<RideTypeToggle {...defaultProps} value="coaster" />);

    expect(
      screen.getByRole("tab", { name: "Roller Coasters" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Dark Rides" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("shows dark ride tab as selected when value is 'dark-ride'", () => {
    render(<RideTypeToggle {...defaultProps} value="dark-ride" />);

    expect(
      screen.getByRole("tab", { name: "Roller Coasters" }),
    ).toHaveAttribute("aria-selected", "false");
    expect(screen.getByRole("tab", { name: "Dark Rides" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("calls onChange with 'coaster' when coaster tab is clicked", async () => {
    const user = userEvent.setup();
    render(<RideTypeToggle {...defaultProps} value="dark-ride" />);

    await user.click(screen.getByRole("tab", { name: "Roller Coasters" }));

    expect(mockOnChange).toHaveBeenCalledWith("coaster");
  });

  it("calls onChange with 'dark-ride' when dark ride tab is clicked", async () => {
    const user = userEvent.setup();
    render(<RideTypeToggle {...defaultProps} value="coaster" />);

    await user.click(screen.getByRole("tab", { name: "Dark Rides" }));

    expect(mockOnChange).toHaveBeenCalledWith("dark-ride");
  });

  it("includes hidden input for form submission", () => {
    render(
      <RideTypeToggle
        {...defaultProps}
        value="coaster"
        name="ride-type-test"
      />,
    );

    const hiddenInput = screen.getByDisplayValue("coaster");
    expect(hiddenInput).toHaveAttribute("type", "hidden");
    expect(hiddenInput).toHaveAttribute("name", "ride-type-test");
  });

  it("uses default name attribute when none provided", () => {
    render(<RideTypeToggle {...defaultProps} value="dark-ride" />);

    const hiddenInput = screen.getByDisplayValue("dark-ride");
    expect(hiddenInput).toHaveAttribute("name", "ride-type");
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <RideTypeToggle {...defaultProps} className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<RideTypeToggle {...defaultProps} value="coaster" />);

    const coasterTab = screen.getByRole("tab", { name: "Roller Coasters" });
    const darkRideTab = screen.getByRole("tab", { name: "Dark Rides" });

    // Focus first tab
    await user.tab();
    expect(coasterTab).toHaveFocus();

    // Tab to second tab
    await user.tab();
    expect(darkRideTab).toHaveFocus();

    // Enter should trigger change
    await user.keyboard("{Enter}");
    expect(mockOnChange).toHaveBeenCalledWith("dark-ride");
  });

  it("supports space key activation", async () => {
    const user = userEvent.setup();
    render(<RideTypeToggle {...defaultProps} value="coaster" />);

    const darkRideTab = screen.getByRole("tab", { name: "Dark Rides" });
    darkRideTab.focus();

    await user.keyboard(" ");
    expect(mockOnChange).toHaveBeenCalledWith("dark-ride");
  });
});
