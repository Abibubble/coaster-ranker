import { describe, expect, it } from "vitest";
import { formatString } from "./formatString.util";

describe("formatString - first-word casing", () => {
  it("keeps accents and does not capitalise the letter after them", () => {
    expect(formatString("Pégase Express", "space", "first-word", false)).toBe(
      "Pégase Express",
    );
  });

  it("lowercases accented input still capitalises only the first letter", () => {
    expect(formatString("pégase express", "space", "first-word", false)).toBe(
      "Pégase Express",
    );
  });

  it("does not capitalise the letter after an apostrophe", () => {
    expect(formatString("Cobra's Curse", "space", "first-word", false)).toBe(
      "Cobra's Curse",
    );
    expect(formatString("cobra's curse", "space", "first-word", false)).toBe(
      "Cobra's Curse",
    );
  });

  it("uppercases an accented first letter correctly", () => {
    expect(formatString("élan valley", "space", "first-word", false)).toBe(
      "Élan Valley",
    );
    expect(formatString("île mystérieuse", "space", "first-word", false)).toBe(
      "Île Mystérieuse",
    );
  });

  it("capitalises the first letter of each word", () => {
    expect(formatString("steel vengeance", "space", "first-word", false)).toBe(
      "Steel Vengeance",
    );
  });

  it("preserves mixed-case proper nouns and acronyms", () => {
    expect(formatString("VelociCoaster RMC", "space", "first-word", false)).toBe(
      "VelociCoaster RMC",
    );
  });
});
