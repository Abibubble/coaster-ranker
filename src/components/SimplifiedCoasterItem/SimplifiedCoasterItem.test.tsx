import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { SimplifiedCoasterItem } from "./SimplifiedCoasterItem";
import { Coaster } from "../../types/data";

const coaster: Coaster = {
  id: "1",
  name: "Steel Vengeance",
  park: "Cedar Point",
  country: "United States",
  manufacturer: "Rocky Mountain Construction",
};

describe("SimplifiedCoasterItem", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <SimplifiedCoasterItem coaster={coaster} isRanked />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("shows the numeric rank badge when isRanked and rankPosition are set", () => {
    render(
      <SimplifiedCoasterItem
        coaster={{ ...coaster, rankPosition: 3 }}
        isRanked
      />,
    );
    expect(screen.getByText("#3")).toBeInTheDocument();
  });

  it("shows a dash when not ranked", () => {
    render(<SimplifiedCoasterItem coaster={coaster} isRanked={false} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("shows #0 for a Number 0 coaster instead of the numeric rank or dash", () => {
    render(
      <SimplifiedCoasterItem
        coaster={{ ...coaster, isNumberZero: true }}
        isRanked={false}
      />,
    );
    expect(screen.getByText("#0")).toBeInTheDocument();
    expect(screen.queryByText("—")).not.toBeInTheDocument();
  });

  it("shows #0 even when isRanked is true and a rankPosition is also (incorrectly) set", () => {
    render(
      <SimplifiedCoasterItem
        coaster={{ ...coaster, isNumberZero: true, rankPosition: 2 }}
        isRanked
      />,
    );
    expect(screen.getByText("#0")).toBeInTheDocument();
    expect(screen.queryByText("#2")).not.toBeInTheDocument();
  });

  it("renders the coaster's name and park", () => {
    render(<SimplifiedCoasterItem coaster={coaster} isRanked={false} />);
    expect(screen.getByText("Steel Vengeance")).toBeInTheDocument();
    expect(screen.getByText("Cedar Point")).toBeInTheDocument();
  });

  it("renders as a plain (non-interactive) row when onExpand is not provided", () => {
    render(<SimplifiedCoasterItem coaster={coaster} isRanked={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders as a focusable button and calls onExpand when clicked", async () => {
    const user = userEvent.setup();
    const onExpand = vi.fn();
    render(
      <SimplifiedCoasterItem
        coaster={coaster}
        isRanked={false}
        onExpand={onExpand}
      />,
    );

    const button = screen.getByRole("button", {
      name: "Show full details for Steel Vengeance at Cedar Point",
    });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(onExpand).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard activation when onExpand is provided", async () => {
    const user = userEvent.setup();
    const onExpand = vi.fn();
    render(
      <SimplifiedCoasterItem
        coaster={coaster}
        isRanked={false}
        onExpand={onExpand}
      />,
    );

    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onExpand).toHaveBeenCalledTimes(1);
  });
});
