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
import { CoasterEditForm, EditableCoaster } from "./CoasterEditForm";
import { Coaster, RideType } from "../../types/data";

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

const editForm: EditableCoaster = {
  name: "Steel Vengeance",
  park: "Cedar Point",
  manufacturer: "Rocky Mountain Construction",
  model: "I-Box",
  material: "Hybrid",
  thrillLevel: "Thrill",
  country: "United States",
};

const blankEditForm: EditableCoaster = {
  name: "Haunted Mansion",
  park: "Magic Kingdom",
  manufacturer: "WED Enterprises",
  model: "",
  material: "",
  thrillLevel: "",
  country: "United States",
};

interface RenderOptions {
  coaster?: Coaster;
  editForm?: EditableCoaster;
  rideType?: RideType;
  onFormChange?: (field: keyof EditableCoaster, value: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const renderEditForm = (options: RenderOptions = {}) => {
  const onFormChange = options.onFormChange ?? vi.fn();
  const onSave = options.onSave ?? vi.fn();
  const onCancel = options.onCancel ?? vi.fn();

  const utils = render(
    <CoasterEditForm
      coaster={options.coaster ?? coaster}
      editForm={options.editForm ?? editForm}
      rideType={options.rideType ?? "coaster"}
      onFormChange={onFormChange}
      onSave={onSave}
      onCancel={onCancel}
      onParkSelection={vi.fn()}
      onCountrySelection={vi.fn()}
      autocomplete={emptyAutocomplete}
    />,
  );

  return { ...utils, onFormChange, onSave, onCancel };
};

describe("CoasterEditForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("regression: the Name/Material inputs and Thrill Level select all have an accessible name via a properly associated label", async () => {
    // Styled.FormLabel is now paired with its input/select via matching
    // htmlFor/id attributes - this used to be a real WCAG 2.2 4.1.2 (Name,
    // Role, Value) violation (Name + Material inputs failing axe's "label"
    // rule, Thrill Level select failing "select-name"). Confirms axe no
    // longer flags either here.
    const { container } = renderEditForm();
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

  it("meets the remaining WCAG 2.2 checks", () => {
    const { container } = renderEditForm();

    testFocusNotObscured(container);
    testTargetSize(container);
    testNoDragRequired(container);
    testConsistentHelp(container);
    testAccessibleAuth(container);
  });

  it("renders all fields pre-populated from editForm", () => {
    renderEditForm();

    expect(screen.getByDisplayValue("Steel Vengeance")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Cedar Point")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Rocky Mountain Construction"),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("I-Box")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Hybrid")).toBeInTheDocument();
    expect(screen.getByDisplayValue("United States")).toBeInTheDocument();
    // Thrill Level is a <select>, not a plain input - verify via its option.
    const thrillSelect = screen.getByDisplayValue(
      "Thrill",
    ) as HTMLSelectElement;
    expect(thrillSelect.tagName).toBe("SELECT");
  });

  it("shows Model, Material and Thrill Level fields for coasters", () => {
    renderEditForm({ rideType: "coaster" });

    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByText("Material")).toBeInTheDocument();
    expect(screen.getByText("Thrill Level")).toBeInTheDocument();
  });

  it("hides Model, Material and Thrill Level fields for dark rides, without crashing", () => {
    renderEditForm({
      rideType: "dark-ride",
      coaster: darkRideCoaster,
      editForm: blankEditForm,
    });

    expect(screen.queryByText("Model")).not.toBeInTheDocument();
    expect(screen.queryByText("Material")).not.toBeInTheDocument();
    expect(screen.queryByText("Thrill Level")).not.toBeInTheDocument();
    expect(screen.getByDisplayValue("Haunted Mansion")).toBeInTheDocument();
  });

  it("regression: renders the form fields with no mobile-hiding wrapper, so nothing is unconditionally hidden", () => {
    // Previously, everything below was wrapped in a DesktopLayout div that
    // set display:none below 768px with no mobile alternative ever built,
    // so the whole form vanished on small viewports. That wrapper was
    // removed - jsdom doesn't evaluate media queries, but we can at least
    // confirm there is exactly one render of the form (no separate
    // conditional "mobile" branch that could independently be empty) and
    // the save/cancel actions are present and reachable in the same pass.
    renderEditForm();

    expect(screen.getAllByDisplayValue("Steel Vengeance")).toHaveLength(1);
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancel editing" }),
    ).toBeInTheDocument();
  });

  it("calls onFormChange with the field name and new value when typing", async () => {
    const user = userEvent.setup();
    const { onFormChange } = renderEditForm();

    const nameInput = screen.getByDisplayValue("Steel Vengeance");
    await user.type(nameInput, "!");

    expect(onFormChange).toHaveBeenCalledWith("name", "Steel Vengeance!");
  });

  it("calls onFormChange for the Material field", async () => {
    const user = userEvent.setup();
    const { onFormChange } = renderEditForm();

    const materialInput = screen.getByDisplayValue("Hybrid");
    await user.type(materialInput, "!");

    expect(onFormChange).toHaveBeenCalledWith("material", "Hybrid!");
  });

  it("calls onSave when the Save button is clicked", async () => {
    const user = userEvent.setup();
    const { onSave } = renderEditForm();

    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when the Cancel button is clicked", async () => {
    const user = userEvent.setup();
    const { onCancel } = renderEditForm();

    await user.click(screen.getByRole("button", { name: "Cancel editing" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("shows the rank badge only when the coaster has a rankPosition", () => {
    const { rerender } = renderEditForm({
      coaster: { ...coaster, rankPosition: undefined },
    });

    expect(screen.queryByText(/^#\d+$/)).not.toBeInTheDocument();

    rerender(
      <CoasterEditForm
        coaster={{ ...coaster, rankPosition: 3 }}
        editForm={editForm}
        rideType="coaster"
        onFormChange={vi.fn()}
        onSave={vi.fn()}
        onCancel={vi.fn()}
        onParkSelection={vi.fn()}
        onCountrySelection={vi.fn()}
        autocomplete={emptyAutocomplete}
      />,
    );

    expect(screen.getByText("#3")).toBeInTheDocument();
  });
});
