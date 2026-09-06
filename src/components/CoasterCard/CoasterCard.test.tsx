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
};

interface RenderOptions {
  coaster?: Coaster;
  isEditing?: boolean;
  editForm?: EditableCoaster;
  isRanked?: boolean;
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
      onFieldClick={onFieldClick}
      onFormChange={vi.fn()}
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
