import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
