import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import {
  testFocusNotObscured,
  testTargetSize,
  testNoDragRequired,
  testConsistentHelp,
  testAccessibleAuth,
} from "../../utils/testing";
import { FilterSection } from "./FilterSection";
import { FilterOptions } from "../../hooks/useCoasterFilters";
import { Coaster, RideType } from "../../types/data";

const emptyFilters: FilterOptions = {
  park: "",
  manufacturer: "",
  model: "",
  material: "",
  thrillLevel: "",
  country: "",
  openingYear: "",
};

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster => ({
  id: overrides.id ?? overrides.name ?? "id",
  name: "Coaster",
  park: "Park",
  country: "Country",
  manufacturer: "Manufacturer",
  ...overrides,
});

const coasterCollection: Coaster[] = [
  makeCoaster({
    id: "1",
    name: "Steel Vengeance",
    park: "Cedar Point",
    manufacturer: "Rocky Mountain Construction",
    model: "I-Box",
    material: "Hybrid",
    thrillLevel: "Thrill",
    country: "United States",
    openingYear: 2018,
  }),
  makeCoaster({
    id: "2",
    name: "Fury 325",
    park: "Carowinds",
    manufacturer: "Bolliger & Mabillard",
    model: "Giga",
    material: "Steel",
    thrillLevel: "Thrill",
    country: "United States",
    openingYear: 2015,
  }),
];

const darkRideCollection: Coaster[] = [
  makeCoaster({
    id: "dr1",
    name: "Haunted Mansion",
    park: "Magic Kingdom",
    manufacturer: "WED Enterprises",
    country: "United States",
    type: "dark-ride",
  }),
];

// The <label> and <select> in this component are visually adjacent but not
// programmatically associated (no htmlFor/id, no wrapping) - getByLabelText
// can't find these selects, so we locate each by its sibling label text.
const getFilterSelect = (labelText: string): HTMLSelectElement => {
  const label = screen.getByText(labelText, { selector: "label" });
  const select = label.parentElement?.querySelector("select");
  if (!select) {
    throw new Error(`No select found alongside label "${labelText}"`);
  }
  return select as HTMLSelectElement;
};

const queryFilterSelect = (labelText: string): HTMLSelectElement | null => {
  const label = screen.queryByText(labelText, { selector: "label" });
  return (label?.parentElement?.querySelector("select") as HTMLSelectElement) ?? null;
};

interface RenderOptions {
  filters?: FilterOptions;
  isFiltersOpen?: boolean;
  hasActiveFilters?: boolean;
  rideType?: RideType;
  allCoasters?: Coaster[];
  manufacturerAliasMap?: Map<string, string>;
  onToggleFilters?: () => void;
  onFilterChange?: (field: keyof FilterOptions, value: string) => void;
  onClearAllFilters?: () => void;
}

const renderFilterSection = (options: RenderOptions = {}) => {
  const onToggleFilters = options.onToggleFilters ?? vi.fn();
  const onFilterChange = options.onFilterChange ?? vi.fn();
  const onClearAllFilters = options.onClearAllFilters ?? vi.fn();

  const utils = render(
    <FilterSection
      filters={options.filters ?? emptyFilters}
      isFiltersOpen={options.isFiltersOpen ?? true}
      hasActiveFilters={options.hasActiveFilters ?? false}
      rideType={options.rideType ?? "coaster"}
      ridePluralLabel={options.rideType === "dark-ride" ? "dark rides" : "coasters"}
      allCoasters={options.allCoasters ?? coasterCollection}
      manufacturerAliasMap={options.manufacturerAliasMap}
      onToggleFilters={onToggleFilters}
      onFilterChange={onFilterChange}
      onClearAllFilters={onClearAllFilters}
    />,
  );

  return { ...utils, onToggleFilters, onFilterChange, onClearAllFilters };
};

describe("FilterSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("regression: every filter <select> has an accessible name via a properly associated label", async () => {
    // Every Styled.FilterLabel is now paired with its Styled.FilterSelect via
    // matching htmlFor/id attributes - this used to be a real WCAG 2.2 4.1.2
    // (Name, Role, Value) violation (no accessible name on any filter
    // select). Confirms axe no longer flags select-name here.
    const { container } = renderFilterSection();
    const results = await axe(container);

    const selectNameViolation = results.violations.find(
      (v: { id: string }) => v.id === "select-name",
    );

    expect(selectNameViolation).toBeUndefined();
    expect(
      getFilterSelect("Park").labels?.[0]?.textContent,
    ).toContain("Park");
  });

  it("meets the remaining WCAG 2.2 checks", () => {
    const { container } = renderFilterSection();

    testFocusNotObscured(container);
    testTargetSize(container);
    testNoDragRequired(container);
    testConsistentHelp(container);
    testAccessibleAuth(container);
  });

  it("populates the Park select with unique, sorted values", () => {
    renderFilterSection();

    const options = Array.from(getFilterSelect("Park").options).map(
      (o) => o.value,
    );

    expect(options).toEqual(["", "Carowinds", "Cedar Point"]);
  });

  it("populates the Manufacturer select with unique, sorted values", () => {
    renderFilterSection();

    const options = Array.from(getFilterSelect("Manufacturer").options).map(
      (o) => o.value,
    );

    expect(options).toEqual([
      "",
      "Bolliger & Mabillard",
      "Rocky Mountain Construction",
    ]);
  });

  it("keeps each recorded manufacturer name as its own Manufacturer option, even when an alias map is provided - a ride is never displayed under a different name than what was entered for it", () => {
    const arrowDynamicsCoaster = makeCoaster({
      id: "arrow-1",
      name: "Viper",
      manufacturer: "Arrow Dynamics",
    });
    const arrowDevelopmentCoaster = makeCoaster({
      id: "arrow-2",
      name: "Corkscrew",
      manufacturer: "Arrow Development",
    });
    const manufacturerAliasMap = new Map([
      ["arrow dynamics", "Arrow Dynamics"],
      ["arrow development", "Arrow Dynamics"],
    ]);

    renderFilterSection({
      allCoasters: [arrowDynamicsCoaster, arrowDevelopmentCoaster],
      manufacturerAliasMap,
    });

    const options = Array.from(getFilterSelect("Manufacturer").options).map(
      (o) => o.value,
    );

    expect(options).toEqual(["", "Arrow Development", "Arrow Dynamics"]);
  });

  it("shows a note naming the other recorded names grouped in when a manufacturer with alternate names present is selected", () => {
    const arrowDynamicsCoaster = makeCoaster({
      id: "arrow-1",
      name: "Viper",
      manufacturer: "Arrow Dynamics",
    });
    const arrowDevelopmentCoaster = makeCoaster({
      id: "arrow-2",
      name: "Corkscrew",
      manufacturer: "Arrow Development",
    });
    const manufacturerAliasMap = new Map([
      ["arrow dynamics", "Arrow Dynamics"],
      ["arrow development", "Arrow Dynamics"],
    ]);

    renderFilterSection({
      filters: { ...emptyFilters, manufacturer: "Arrow Development" },
      allCoasters: [arrowDynamicsCoaster, arrowDevelopmentCoaster],
      manufacturerAliasMap,
    });

    const note = screen.getByText(/grouped together/i);
    expect(note).toBeInTheDocument();
    expect(note.textContent).toContain("Arrow Dynamics");
  });

  it("does not show a grouping note when no manufacturer filter is selected", () => {
    const manufacturerAliasMap = new Map([
      ["arrow dynamics", "Arrow Dynamics"],
      ["arrow development", "Arrow Dynamics"],
    ]);

    renderFilterSection({ manufacturerAliasMap });

    expect(screen.queryByText(/grouped together/i)).not.toBeInTheDocument();
  });

  it("does not show a grouping note when the selected manufacturer has no other recorded name present", () => {
    renderFilterSection({
      filters: { ...emptyFilters, manufacturer: "Bolliger & Mabillard" },
    });

    expect(screen.queryByText(/grouped together/i)).not.toBeInTheDocument();
  });

  it("populates the Country select with unique, sorted values", () => {
    renderFilterSection();

    const options = Array.from(getFilterSelect("Country").options).map(
      (o) => o.value,
    );

    expect(options).toEqual(["", "United States"]);
  });

  it("populates the Opening Year select with unique, sorted values (issue #44)", () => {
    renderFilterSection();

    const options = Array.from(getFilterSelect("Opening Year").options).map(
      (o) => o.value,
    );

    expect(options).toEqual(["", "2015", "2018"]);
  });

  it("regression: populates the Model select with real options, not just the empty placeholder", () => {
    // Previously this select rendered only <option value="">All models</option>
    // with no options ever added, regardless of the data passed in.
    renderFilterSection();

    const options = Array.from(getFilterSelect("Model").options).map(
      (o) => o.value,
    );

    expect(options).toEqual(["", "Giga", "I-Box"]);
  });

  it("populates the Material and Thrill Level selects for coasters", () => {
    renderFilterSection({ rideType: "coaster" });

    const materialOptions = Array.from(getFilterSelect("Material").options).map(
      (o) => o.value,
    );
    const thrillOptions = Array.from(
      getFilterSelect("Thrill Level").options,
    ).map((o) => o.value);

    expect(materialOptions).toEqual(["", "Hybrid", "Steel"]);
    expect(thrillOptions).toEqual(["", "Thrill"]);
  });

  it("hides Model, Material and Thrill Level for dark rides", () => {
    // hasModel is gated on rideType === "coaster", identically to
    // hasMaterial/hasThrillLevel - it is not shown for dark rides either.
    renderFilterSection({ rideType: "dark-ride", allCoasters: darkRideCollection });

    expect(queryFilterSelect("Model")).not.toBeInTheDocument();
    expect(queryFilterSelect("Material")).not.toBeInTheDocument();
    expect(queryFilterSelect("Thrill Level")).not.toBeInTheDocument();
  });

  it("calls onFilterChange with the field name and selected value", async () => {
    const user = userEvent.setup();
    const { onFilterChange } = renderFilterSection();

    await user.selectOptions(getFilterSelect("Park"), "Cedar Point");

    expect(onFilterChange).toHaveBeenCalledWith("park", "Cedar Point");
  });

  it("only shows the Clear all filters button when hasActiveFilters is true", () => {
    const { rerender } = renderFilterSection({ hasActiveFilters: false });

    expect(
      screen.queryByRole("button", { name: /clear all filters/i }),
    ).not.toBeInTheDocument();

    rerender(
      <FilterSection
        filters={emptyFilters}
        isFiltersOpen={true}
        hasActiveFilters={true}
        rideType="coaster"
        ridePluralLabel="coasters"
        allCoasters={coasterCollection}
        onToggleFilters={vi.fn()}
        onFilterChange={vi.fn()}
        onClearAllFilters={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /clear all filters/i }),
    ).toBeInTheDocument();
  });

  it("calls onClearAllFilters when the clear button is clicked", async () => {
    const user = userEvent.setup();
    const { onClearAllFilters } = renderFilterSection({ hasActiveFilters: true });

    await user.click(screen.getByRole("button", { name: /clear all filters/i }));

    expect(onClearAllFilters).toHaveBeenCalledTimes(1);
  });

  it("reflects isFiltersOpen via aria-expanded and the accessible label", () => {
    const { rerender } = renderFilterSection({ isFiltersOpen: false });

    const toggle = screen.getByLabelText("Show filter options");
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    rerender(
      <FilterSection
        filters={emptyFilters}
        isFiltersOpen={true}
        hasActiveFilters={false}
        rideType="coaster"
        ridePluralLabel="coasters"
        allCoasters={coasterCollection}
        onToggleFilters={vi.fn()}
        onFilterChange={vi.fn()}
        onClearAllFilters={vi.fn()}
      />,
    );

    const openToggle = screen.getByLabelText("Hide filter options");
    expect(openToggle).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggleFilters when the filter toggle is clicked", async () => {
    const user = userEvent.setup();
    const { onToggleFilters } = renderFilterSection();

    await user.click(screen.getByLabelText("Hide filter options"));

    expect(onToggleFilters).toHaveBeenCalledTimes(1);
  });
});
