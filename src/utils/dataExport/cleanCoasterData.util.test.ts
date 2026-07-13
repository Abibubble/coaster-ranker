import { describe, expect, it } from "vitest";
import { Coaster } from "../../types/data";
import { addRankingToCoasterData } from "./cleanCoasterData.util";

const makeCoaster = (overrides: Partial<Coaster>): Coaster =>
  ({
    id: overrides.id ?? overrides.name ?? "id",
    name: "Coaster",
    park: "Park",
    country: "Country",
    manufacturer: "Manufacturer",
    ...overrides,
  }) as Coaster;

describe("addRankingToCoasterData - rank ordering", () => {
  it("sorts by rankPosition ascending regardless of input order", () => {
    const coasters = [
      makeCoaster({ name: "Third", rankPosition: 3 }),
      makeCoaster({ name: "First", rankPosition: 1 }),
      makeCoaster({ name: "Second", rankPosition: 2 }),
    ];

    const result = addRankingToCoasterData(coasters);

    expect(result.map((c) => c.name)).toEqual(["First", "Second", "Third"]);
    expect(result.map((c) => c.rank)).toEqual([1, 2, 3]);
  });

  it("orders by rankedCoasters metadata when rankPosition is absent", () => {
    const coasters = [
      makeCoaster({ id: "c", name: "Charlie" }),
      makeCoaster({ id: "a", name: "Alpha" }),
      makeCoaster({ id: "b", name: "Bravo" }),
    ];

    const result = addRankingToCoasterData(coasters, {
      isRanked: true,
      rankedCoasters: ["a", "b", "c"],
    });

    expect(result.map((c) => c.name)).toEqual(["Alpha", "Bravo", "Charlie"]);
    expect(result.map((c) => c.rank)).toEqual([1, 2, 3]);
  });

  it("places unranked coasters after ranked ones, preserving their order", () => {
    const coasters = [
      makeCoaster({ name: "Unranked A" }),
      makeCoaster({ name: "Ranked 2", rankPosition: 2 }),
      makeCoaster({ name: "Unranked B" }),
      makeCoaster({ name: "Ranked 1", rankPosition: 1 }),
    ];

    const result = addRankingToCoasterData(coasters);

    expect(result.map((c) => c.name)).toEqual([
      "Ranked 1",
      "Ranked 2",
      "Unranked A",
      "Unranked B",
    ]);
  });
});
