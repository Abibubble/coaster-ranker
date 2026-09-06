import { describe, expect, it } from "vitest";
import { Coaster } from "../types/data";
import {
  detectAndFixDuplicateIds,
  validateUniqueIds,
} from "./duplicateIdDetection.util";

const makeCoaster = (overrides: Partial<Coaster> & { id: string }): Coaster => ({
  name: "Coaster",
  park: "Park",
  country: "Country",
  manufacturer: "Manufacturer",
  ...overrides,
});

describe("detectAndFixDuplicateIds", () => {
  it("returns the input unchanged when there are no duplicate ids", () => {
    const coasters = [
      makeCoaster({ id: "1", name: "Steel Vengeance" }),
      makeCoaster({ id: "2", name: "Fury 325", type: "dark-ride" }),
    ];

    const result = detectAndFixDuplicateIds(coasters);

    expect(result).toEqual(coasters);
    expect(result.map((c) => c.id)).toEqual(["1", "2"]);
  });

  it("reassigns the second occurrence of a simple duplicate, keeping the first as-is", () => {
    const coasters = [
      makeCoaster({ id: "1", name: "Steel Vengeance" }),
      makeCoaster({ id: "1", name: "Fury 325" }),
    ];

    const result = detectAndFixDuplicateIds(coasters);

    expect(result[0].id).toBe("1");
    expect(result[0].name).toBe("Steel Vengeance");
    expect(result[1].id).toMatch(/^\d{3}$/);
    expect(result[1].id).not.toBe("1");
    expect(result[1].name).toBe("Fury 325");
  });

  it("regression: reassigns a duplicate even when its content matches the very first (kept) entry", () => {
    // Previously, duplicates were matched by content (findIndex on
    // name/park/manufacturer) rather than by occurrence order. When a later
    // duplicate happened to have identical name/park/manufacturer to the
    // first (kept) entry, findIndex resolved to index 0, so it was treated
    // as "the original" and never reassigned — leaving two coasters sharing
    // the same id after the "fix" ran.
    const coasters = [
      makeCoaster({ id: "1", name: "Clone", park: "Park B" }),
      makeCoaster({ id: "1", name: "Clone", park: "Park B" }), // identical to the row above
      makeCoaster({ id: "1", name: "Different", park: "Park C" }),
    ];

    const result = detectAndFixDuplicateIds(coasters);

    const ids = result.map((c) => c.id);
    expect(new Set(ids).size).toBe(3);
    expect(ids[0]).toBe("1");
  });

  it("skips ids already present in the data when assigning new ones", () => {
    const coasters = [
      makeCoaster({ id: "1", name: "Original" }),
      makeCoaster({ id: "1", name: "Duplicate" }),
      makeCoaster({ id: "001", name: "Already using 001" }),
    ];

    const result = detectAndFixDuplicateIds(coasters);

    const duplicateEntry = result.find((c) => c.name === "Duplicate")!;
    expect(duplicateEntry.id).not.toBe("001");
    expect(new Set(result.map((c) => c.id)).size).toBe(3);
  });

  it("fixes multiple independent duplicate groups correctly", () => {
    const coasters = [
      makeCoaster({ id: "a", name: "A1" }),
      makeCoaster({ id: "a", name: "A2" }),
      makeCoaster({ id: "b", name: "B1", type: "dark-ride" }),
      makeCoaster({ id: "b", name: "B2", type: "dark-ride" }),
    ];

    const result = detectAndFixDuplicateIds(coasters);

    const ids = result.map((c) => c.id);
    expect(new Set(ids).size).toBe(4);
    expect(result[0].id).toBe("a");
    expect(result[2].id).toBe("b");
  });
});

describe("validateUniqueIds", () => {
  it("does not throw when all ids are unique", () => {
    const coasters = [
      makeCoaster({ id: "1" }),
      makeCoaster({ id: "2", type: "dark-ride" }),
    ];

    expect(() => validateUniqueIds(coasters)).not.toThrow();
  });

  it("throws listing duplicate ids when present", () => {
    const coasters = [
      makeCoaster({ id: "1" }),
      makeCoaster({ id: "1" }),
      makeCoaster({ id: "2" }),
    ];

    expect(() => validateUniqueIds(coasters)).toThrow(
      "Duplicate coaster IDs found: 1",
    );
  });
});
