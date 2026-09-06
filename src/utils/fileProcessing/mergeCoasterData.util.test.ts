import { describe, expect, it } from "vitest";
import { Coaster } from "../../types/data";
import {
  getMergedFields,
  mergeCoasterData,
  shouldAutoMerge,
} from "./mergeCoasterData.util";

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster =>
  ({
    id: overrides.id ?? overrides.name ?? "id",
    name: "Coaster",
    park: "Park",
    country: "Country",
    manufacturer: "Manufacturer",
    ...overrides,
  }) as Coaster;

describe("mergeCoasterData", () => {
  it("fills in fields missing on the existing coaster from the new one", () => {
    const existing = makeCoaster({ model: undefined, material: undefined });
    const incoming = makeCoaster({
      id: "incoming",
      model: "Inverted",
      material: "Steel",
    });

    const merged = mergeCoasterData(existing, incoming);

    expect(merged.model).toBe("Inverted");
    expect(merged.material).toBe("Steel");
  });

  it("does not overwrite fields the existing coaster already has", () => {
    const existing = makeCoaster({
      manufacturer: "B&M",
      model: "Inverted",
    });
    const incoming = makeCoaster({
      id: "incoming",
      manufacturer: "Intamin",
      model: "Launch",
    });

    const merged = mergeCoasterData(existing, incoming);

    expect(merged.manufacturer).toBe("B&M");
    expect(merged.model).toBe("Inverted");
  });

  it("leaves fields empty when neither side has them", () => {
    const existing = makeCoaster({ thrillLevel: undefined });
    const incoming = makeCoaster({ id: "incoming", thrillLevel: undefined });

    const merged = mergeCoasterData(existing, incoming);

    expect(merged.thrillLevel).toBeUndefined();
  });

  it("merges dark-ride coasters the same way", () => {
    const existing = makeCoaster({ type: "dark-ride", model: undefined });
    const incoming = makeCoaster({
      id: "incoming",
      type: "dark-ride",
      model: "Trackless",
    });

    const merged = mergeCoasterData(existing, incoming);

    expect(merged.model).toBe("Trackless");
    expect(merged.type).toBe("dark-ride");
  });
});

describe("getMergedFields", () => {
  it("lists only the fields that would be filled in", () => {
    const existing = makeCoaster({ model: undefined, material: "Steel" });
    const incoming = makeCoaster({
      id: "incoming",
      model: "Inverted",
      material: "Wood",
      thrillLevel: "Thrill",
    });

    const fields = getMergedFields(existing, incoming);

    expect(fields).toEqual(expect.arrayContaining(["model", "thrillLevel"]));
    expect(fields).not.toContain("material");
  });

  it("returns an empty list when the existing coaster already has all fields", () => {
    const existing = makeCoaster({
      manufacturer: "B&M",
      model: "Inverted",
      material: "Steel",
      thrillLevel: "Thrill",
      country: "UK",
    });
    const incoming = makeCoaster({
      id: "incoming",
      manufacturer: "Intamin",
      model: "Launch",
      material: "Wood",
      thrillLevel: "Family",
      country: "USA",
    });

    expect(getMergedFields(existing, incoming)).toEqual([]);
  });

  it("returns an empty list when the new coaster has nothing to add", () => {
    const existing = makeCoaster({ model: undefined });
    const incoming = makeCoaster({ id: "incoming", model: undefined });

    expect(getMergedFields(existing, incoming)).toEqual([]);
  });
});

describe("shouldAutoMerge", () => {
  it("returns true when names match exactly and parks fuzzy-match", () => {
    const existing = makeCoaster({ name: "Nemesis", park: "Alton Towers" });
    const incoming = makeCoaster({
      id: "incoming",
      name: "Nemesis",
      park: "Alton Towers Resort",
    });

    expect(shouldAutoMerge(existing, incoming)).toBe(true);
  });

  it("returns false when names differ", () => {
    const existing = makeCoaster({ name: "Nemesis", park: "Alton Towers" });
    const incoming = makeCoaster({
      id: "incoming",
      name: "Nemesis Reborn",
      park: "Alton Towers",
    });

    expect(shouldAutoMerge(existing, incoming)).toBe(false);
  });

  it("returns false when parks don't fuzzy-match, even with the same name", () => {
    const existing = makeCoaster({ name: "Nemesis", park: "Alton Towers" });
    const incoming = makeCoaster({
      id: "incoming",
      name: "Nemesis",
      park: "Six Flags Magic Mountain",
    });

    expect(shouldAutoMerge(existing, incoming)).toBe(false);
  });
});
