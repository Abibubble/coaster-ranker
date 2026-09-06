import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Coaster } from "../../types/data";
import { useCoasterEditing } from "./useCoasterEditing";

const makeCoaster = (overrides: Partial<Coaster>): Coaster => ({
  id: overrides.id ?? overrides.name ?? "id",
  name: "Coaster",
  park: "Park",
  country: "Country",
  manufacturer: "Manufacturer",
  ...overrides,
});

const steelVengeance = makeCoaster({
  id: "1",
  name: "Steel Vengeance",
  park: "Cedar Point",
  country: "United States",
  manufacturer: "Rocky Mountain Construction",
  model: "I-Box",
  material: "Hybrid",
  thrillLevel: "Thrill",
});

const fury325 = makeCoaster({
  id: "2",
  name: "Fury 325",
  park: "Carowinds",
  country: "United States",
  manufacturer: "Bolliger & Mabillard",
  model: "Giga",
  material: "Steel",
  thrillLevel: "Thrill",
});

// Dark rides realistically never have model/material/thrillLevel populated.
const hauntedMansion = makeCoaster({
  id: "3",
  name: "Haunted Mansion",
  park: "Magic Kingdom",
  country: "United States",
  manufacturer: "Disney",
  type: "dark-ride",
});

const blankEditForm = {
  name: "",
  park: "",
  manufacturer: "",
  model: "",
  material: "",
  thrillLevel: "",
  country: "",
  openingYear: "",
};

describe("useCoasterEditing", () => {
  it("starts with no coaster being edited and a blank form", () => {
    const { result } = renderHook(() => useCoasterEditing());

    expect(result.current.editingCoasterId).toBeNull();
    expect(result.current.editForm).toEqual(blankEditForm);
  });

  describe("startEditing", () => {
    it("populates editForm from the coaster's own fields", () => {
      const { result } = renderHook(() => useCoasterEditing());

      act(() => result.current.startEditing(steelVengeance));

      expect(result.current.editingCoasterId).toBe("1");
      expect(result.current.editForm).toEqual({
        name: "Steel Vengeance",
        park: "Cedar Point",
        manufacturer: "Rocky Mountain Construction",
        model: "I-Box",
        material: "Hybrid",
        thrillLevel: "Thrill",
        country: "United States",
        openingYear: "",
      });
    });

    it("defaults model/material/thrillLevel to empty strings (not undefined) for a dark-ride-shaped coaster", () => {
      const { result } = renderHook(() => useCoasterEditing());

      act(() => result.current.startEditing(hauntedMansion));

      expect(result.current.editForm).toEqual({
        name: "Haunted Mansion",
        park: "Magic Kingdom",
        manufacturer: "Disney",
        model: "",
        material: "",
        thrillLevel: "",
        country: "United States",
        openingYear: "",
      });
    });

    it("replaces both editingCoasterId and editForm with no leftover state when switching to a second coaster mid-edit", () => {
      const { result } = renderHook(() => useCoasterEditing());

      act(() => result.current.startEditing(steelVengeance));
      act(() => result.current.updateEditForm("name", "Unsaved Draft Name"));

      act(() => result.current.startEditing(fury325));

      expect(result.current.editingCoasterId).toBe("2");
      expect(result.current.editForm).toEqual({
        name: "Fury 325",
        park: "Carowinds",
        manufacturer: "Bolliger & Mabillard",
        model: "Giga",
        material: "Steel",
        thrillLevel: "Thrill",
        country: "United States",
        openingYear: "",
      });
    });
  });

  describe("isEditing", () => {
    it("is true only for the currently-editing coaster's id", () => {
      const { result } = renderHook(() => useCoasterEditing());

      act(() => result.current.startEditing(steelVengeance));

      expect(result.current.isEditing("1")).toBe(true);
      expect(result.current.isEditing("2")).toBe(false);
    });

    it("is false for every id when nothing is being edited", () => {
      const { result } = renderHook(() => useCoasterEditing());

      expect(result.current.isEditing("1")).toBe(false);
      expect(result.current.isEditing("")).toBe(false);
    });
  });

  describe("cancelEditing", () => {
    it("clears editingCoasterId back to null and resets editForm to blank", () => {
      const { result } = renderHook(() => useCoasterEditing());

      act(() => result.current.startEditing(steelVengeance));
      act(() => result.current.cancelEditing());

      expect(result.current.editingCoasterId).toBeNull();
      expect(result.current.editForm).toEqual(blankEditForm);
    });
  });

  describe("updateEditForm", () => {
    it("updates only the targeted field, leaving the rest untouched", () => {
      const { result } = renderHook(() => useCoasterEditing());

      act(() => result.current.startEditing(steelVengeance));
      act(() => result.current.updateEditForm("name", "New Name"));

      expect(result.current.editForm.name).toBe("New Name");
      expect(result.current.editForm.park).toBe("Cedar Point");
      expect(result.current.editForm.manufacturer).toBe(
        "Rocky Mountain Construction",
      );
    });
  });

  describe("resetEditForm", () => {
    it("resets editForm to blank WITHOUT clearing editingCoasterId", () => {
      const { result } = renderHook(() => useCoasterEditing());

      act(() => result.current.startEditing(steelVengeance));
      act(() => result.current.updateEditForm("name", "Changed"));
      act(() => result.current.resetEditForm());

      expect(result.current.editForm).toEqual(blankEditForm);
      // Unlike cancelEditing, resetEditForm leaves the editing session active.
      expect(result.current.editingCoasterId).toBe("1");
      expect(result.current.isEditing("1")).toBe(true);
    });
  });
});
