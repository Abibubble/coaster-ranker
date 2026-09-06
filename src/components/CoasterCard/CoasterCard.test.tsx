import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import {
  testFocusNotObscured,
  testTargetSize,
  testNoDragRequired,
  testConsistentHelp,
  testAccessibleAuth,
} from "../../utils/testing";
import { CoasterCard } from "./CoasterCard";
import { EditableCoaster } from "../CoasterEditForm";
import { Coaster } from "../../types/data";
import * as Styled from "./CoasterCard.styled";

const coaster: Coaster = {
  id: "1",
  name: "Steel Vengeance",
  park: "Cedar Point",
  country: "United States",
  manufacturer: "Rocky Mountain Construction",
  model: "I-Box",
  material: "Hybrid",
  thrillLevel: "Thrill",
  openingYear: 2018,
};

const darkRideCoaster: Coaster = {
  id: "dr1",
  name: "Haunted Mansion",
  park: "Magic Kingdom",
  country: "United States",
  manufacturer: "WED Enterprises",
  type: "dark-ride",
};

const emptyAutocomplete = {
  park: { suggestions: [], isLoading: false, error: null, hasMinCharacters: false },
  country: {
    suggestions: [],
    isLoading: false,
    error: null,
    hasMinCharacters: false,
  },
  manufacturer: {
    suggestions: [],
    isLoading: false,
    error: null,
    hasMinCharacters: false,
  },
  model: {
    suggestions: [],
    isLoading: false,
    error: null,
    hasMinCharacters: false,
    hasManufacturer: false,
  },
};

const editForm: EditableCoaster = {
  name: "Steel Vengeance",
  park: "Cedar Point",
  manufacturer: "Rocky Mountain Construction",
  model: "I-Box",
  material: "Hybrid",
  thrillLevel: "Thrill",
  country: "United States",
  openingYear: "2018",
  isNumberZero: false,
};

interface RenderOptions {
  coaster?: Coaster;
  isEditing?: boolean;
  editForm?: EditableCoaster;
  isRanked?: boolean;
  onUnmarkNumberZero?: () => void;
}

const renderCard = (options: RenderOptions = {}) => {
  const onEdit = vi.fn();
  const onRemove = vi.fn();
  const onFieldClick = vi.fn();

  const utils = render(
    <CoasterCard
      coaster={options.coaster ?? coaster}
      rideType={(options.coaster ?? coaster).type === "dark-ride" ? "dark-ride" : "coaster"}
      isEditing={options.isEditing ?? false}
      editForm={options.editForm}
      isRanked={options.isRanked}
      onEdit={onEdit}
      onRemove={onRemove}
      onUnmarkNumberZero={options.onUnmarkNumberZero}
      onFieldClick={onFieldClick}
      onFormChange={vi.fn()}
      onToggleNumberZero={vi.fn()}
      onSaveEdit={vi.fn()}
      onCancelEdit={vi.fn()}
      onParkSelection={vi.fn()}
      onCountrySelection={vi.fn()}
      autocomplete={emptyAutocomplete}
    />,
  );

  return { ...utils, onEdit, onRemove, onFieldClick };
};

describe("CoasterCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("regression: has no label/select-name violations when editing (CoasterEditForm's labels are now associated)", async () => {
    // See CoasterEditForm.test.tsx - this used to be the same real
    // WCAG 2.2 4.1.2 violation surfacing here because CoasterCard renders
    // CoasterEditForm directly while isEditing.
    const { container } = renderCard({ isEditing: true, editForm });
    const results = await axe(container);

    const labelViolation = results.violations.find(
      (v: { id: string }) => v.id === "label",
    );
    const selectNameViolation = results.violations.find(
      (v: { id: string }) => v.id === "select-name",
    );

    expect(labelViolation).toBeUndefined();
    expect(selectNameViolation).toBeUndefined();
  });

  it("has no accessibility violations in the (non-editing) display view", async () => {
    const { container } = renderCard();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("meets the remaining WCAG 2.2 checks in the display view", () => {
    const { container } = renderCard();

    testFocusNotObscured(container);
    testTargetSize(container);
    testNoDragRequired(container);
    testConsistentHelp(container);
    testAccessibleAuth(container);
  });

  it("renders the coaster's details in the desktop layout when not editing", () => {
    renderCard();

    const desktop = document.querySelector(
      `.${Styled.DesktopLayout.styledComponentId}`,
    ) as HTMLElement;
    const desktopScope = within(desktop);

    expect(desktopScope.getByText("Steel Vengeance")).toBeInTheDocument();
    expect(desktopScope.getByText("Cedar Point")).toBeInTheDocument();
    expect(
      desktopScope.getByText("Rocky Mountain Construction"),
    ).toBeInTheDocument();
    expect(desktopScope.getByText("I-Box")).toBeInTheDocument();
    expect(desktopScope.getByText("Hybrid")).toBeInTheDocument();
    expect(desktopScope.getByText("Thrill")).toBeInTheDocument();
    expect(desktopScope.getByText("United States")).toBeInTheDocument();
  });

  it("regression: shows Opening Year in the desktop layout, but not mobile (issue #44)", () => {
    renderCard();

    const desktop = document.querySelector(
      `.${Styled.DesktopLayout.styledComponentId}`,
    ) as HTMLElement;
    expect(within(desktop).getByText("2018")).toBeInTheDocument();

    const mobile = document.querySelector(
      `.${Styled.MobileLayout.styledComponentId}`,
    ) as HTMLElement;
    expect(within(mobile).queryByText("2018")).not.toBeInTheDocument();
  });

  it("renders the coaster's details in the mobile layout when not editing", () => {
    renderCard();

    const mobile = document.querySelector(
      `.${Styled.MobileLayout.styledComponentId}`,
    ) as HTMLElement;
    const mobileScope = within(mobile);

    expect(mobileScope.getByText("Steel Vengeance")).toBeInTheDocument();
    expect(mobileScope.getByText("Cedar Point")).toBeInTheDocument();
    expect(
      mobileScope.getByText("Rocky Mountain Construction"),
    ).toBeInTheDocument();
    expect(mobileScope.getByText("I-Box")).toBeInTheDocument();
    expect(mobileScope.getByText("United States")).toBeInTheDocument();
  });

  it("renders CoasterEditForm instead of the display view when isEditing is true", () => {
    renderCard({ isEditing: true, editForm });

    expect(screen.getByText("Editing: Steel Vengeance")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
    // The display view's Edit/Remove buttons are not present in edit mode.
    expect(
      screen.queryByRole("button", { name: `Edit ${coaster.name}` }),
    ).not.toBeInTheDocument();
  });

  it("calls onFieldClick with the field name and value when a field is clicked", async () => {
    const user = userEvent.setup();
    const { onFieldClick } = renderCard();

    const desktop = document.querySelector(
      `.${Styled.DesktopLayout.styledComponentId}`,
    ) as HTMLElement;
    await user.click(within(desktop).getByText("Cedar Point"));
    expect(onFieldClick).toHaveBeenCalledWith("park", "Cedar Point");

    onFieldClick.mockClear();
    await user.click(
      within(desktop).getByText("Rocky Mountain Construction"),
    );
    expect(onFieldClick).toHaveBeenCalledWith(
      "manufacturer",
      "Rocky Mountain Construction",
    );
  });

  it("calls onEdit and onRemove when their buttons are clicked", async () => {
    const user = userEvent.setup();
    const { onEdit, onRemove } = renderCard();

    const desktop = document.querySelector(
      `.${Styled.DesktopLayout.styledComponentId}`,
    ) as HTMLElement;
    const desktopScope = within(desktop);

    await user.click(
      desktopScope.getByRole("button", { name: `Edit ${coaster.name}` }),
    );
    expect(onEdit).toHaveBeenCalledTimes(1);

    await user.click(
      desktopScope.getByRole("button", {
        name: `Remove ${coaster.name} from collection`,
      }),
    );
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("shows the rank badge only when isRanked is true and rankPosition is set", () => {
    const { rerender } = renderCard({ isRanked: false });
    expect(screen.queryByText(/^#\d+$/)).not.toBeInTheDocument();

    rerender(
      <CoasterCard
        coaster={{ ...coaster, rankPosition: 2 }}
        rideType="coaster"
        isEditing={false}
        isRanked={true}
        onEdit={vi.fn()}
        onRemove={vi.fn()}
        onFieldClick={vi.fn()}
        autocomplete={emptyAutocomplete}
      />,
    );

    expect(screen.getAllByText("#2").length).toBeGreaterThan(0);
  });

  it("does not show the rank badge when isRanked is true but rankPosition is unset", () => {
    renderCard({ isRanked: true, coaster: { ...coaster, rankPosition: undefined } });
    expect(screen.queryByText(/^#\d+$/)).not.toBeInTheDocument();
  });

  it("shows a Number 0 badge instead of the numeric rank badge, even when isRanked and rankPosition are both set", () => {
    renderCard({
      isRanked: true,
      coaster: { ...coaster, isNumberZero: true, rankPosition: 2 },
    });

    expect(screen.getAllByText("Number 0").length).toBeGreaterThan(0);
    expect(screen.queryByText("#2")).not.toBeInTheDocument();
  });

  it('shows a "Rank normally" button only when isNumberZero is true AND onUnmarkNumberZero is provided, and calls it on click', async () => {
    const user = userEvent.setup();
    const onUnmarkNumberZero = vi.fn();

    const { rerender } = renderCard({
      coaster: { ...coaster, isNumberZero: true },
      onUnmarkNumberZero,
    });

    const desktop = document.querySelector(
      `.${Styled.DesktopLayout.styledComponentId}`,
    ) as HTMLElement;
    const button = within(desktop).getByRole("button", {
      name: `Remove ${coaster.name}'s Number 0 status and rank it normally`,
    });
    await user.click(button);
    expect(onUnmarkNumberZero).toHaveBeenCalledTimes(1);

    // Not isNumberZero: button absent even with the handler provided.
    rerender(
      <CoasterCard
        coaster={coaster}
        rideType="coaster"
        isEditing={false}
        onEdit={vi.fn()}
        onRemove={vi.fn()}
        onUnmarkNumberZero={onUnmarkNumberZero}
        onFieldClick={vi.fn()}
        autocomplete={emptyAutocomplete}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /Rank normally|rank it normally/i }),
    ).not.toBeInTheDocument();

    // isNumberZero but no handler provided: button absent.
    rerender(
      <CoasterCard
        coaster={{ ...coaster, isNumberZero: true }}
        rideType="coaster"
        isEditing={false}
        onEdit={vi.fn()}
        onRemove={vi.fn()}
        onFieldClick={vi.fn()}
        autocomplete={emptyAutocomplete}
      />,
    );
    expect(
      screen.queryByText("Rank normally"),
    ).not.toBeInTheDocument();
  });

  it("has no accessibility violations when isNumberZero with the unmark action present", async () => {
    const { container } = renderCard({
      coaster: { ...coaster, isNumberZero: true },
      onUnmarkNumberZero: vi.fn(),
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a dark-ride coaster (no model/material/thrillLevel) without crashing, in both layouts", () => {
    renderCard({ coaster: darkRideCoaster });

    const desktop = document.querySelector(
      `.${Styled.DesktopLayout.styledComponentId}`,
    ) as HTMLElement;
    const mobile = document.querySelector(
      `.${Styled.MobileLayout.styledComponentId}`,
    ) as HTMLElement;

    expect(within(desktop).getByText("Haunted Mansion")).toBeInTheDocument();
    expect(within(desktop).queryByText("Material")).not.toBeInTheDocument();
    expect(within(desktop).queryByText("Thrill Level")).not.toBeInTheDocument();
    expect(within(mobile).getByText("Haunted Mansion")).toBeInTheDocument();
  });
});
