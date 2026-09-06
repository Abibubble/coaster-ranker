import { describe, expect, it } from "vitest";
import { Coaster } from "../../types/data";
import {
  findGroupMatches,
  MIN_GROUP_MATCHES_FOR_SHORTCUT,
} from "./findGroupMatches.util";

const makeCoaster = (overrides: Partial<Coaster> & { id: string }): Coaster => ({
  name: "Coaster",
  park: "Park",
  country: "Country",
  manufacturer: "Manufacturer",
  ...overrides,
});

describe("findGroupMatches", () => {
  it("matches already-ranked coasters sharing the same model and manufacturer (case-insensitive)", () => {
    const newCoaster = makeCoaster({
      id: "new",
      model: "wing coaster",
      manufacturer: "B&M",
    });
    const rankedCoasters = [
      makeCoaster({ id: "1", model: "Wing Coaster", manufacturer: "b&m" }),
      makeCoaster({ id: "2", model: "Wing Coaster", manufacturer: "B&M" }),
      makeCoaster({ id: "3", model: "Inverted Coaster", manufacturer: "B&M" }),
      makeCoaster({ id: "4", model: "Wing Coaster", manufacturer: "Intamin" }),
    ];

    const matches = findGroupMatches(newCoaster, rankedCoasters);

    expect(matches.map((c) => c.id)).toEqual(["1", "2"]);
  });

  it("excludes the coaster itself even if it somehow appears in the ranked list", () => {
    const newCoaster = makeCoaster({
      id: "new",
      model: "Wing Coaster",
      manufacturer: "B&M",
    });
    const rankedCoasters = [newCoaster];

    expect(findGroupMatches(newCoaster, rankedCoasters)).toEqual([]);
  });

  it("returns no matches when the new coaster has no model (e.g. a dark ride)", () => {
    const newCoaster = makeCoaster({ id: "new", manufacturer: "Disney" });
    const rankedCoasters = [
      makeCoaster({ id: "1", model: "Dark Ride", manufacturer: "Disney" }),
    ];

    expect(findGroupMatches(newCoaster, rankedCoasters)).toEqual([]);
  });

  it("returns no matches when the new coaster has no manufacturer set", () => {
    const newCoaster = makeCoaster({
      id: "new",
      model: "Wing Coaster",
      manufacturer: "",
    });
    const rankedCoasters = [
      makeCoaster({ id: "1", model: "Wing Coaster", manufacturer: "" }),
    ];

    expect(findGroupMatches(newCoaster, rankedCoasters)).toEqual([]);
  });

  it("does not match a candidate missing a model, even with the same manufacturer", () => {
    const newCoaster = makeCoaster({
      id: "new",
      model: "Wing Coaster",
      manufacturer: "B&M",
    });
    const rankedCoasters = [makeCoaster({ id: "1", manufacturer: "B&M" })];

    expect(findGroupMatches(newCoaster, rankedCoasters)).toEqual([]);
  });

  it("MIN_GROUP_MATCHES_FOR_SHORTCUT is 4 (more than 3 already-ranked matches)", () => {
    expect(MIN_GROUP_MATCHES_FOR_SHORTCUT).toBe(4);
  });
});
