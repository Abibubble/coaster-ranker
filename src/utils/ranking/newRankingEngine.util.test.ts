import { describe, expect, it } from "vitest";
import { Coaster } from "../../types/data";
import { RankingEngine } from "./newRankingEngine.util";

const makeCoaster = (overrides: Partial<Coaster>): Coaster =>
  ({
    id: overrides.id ?? overrides.name ?? "id",
    name: "Coaster",
    park: "Park",
    country: "Country",
    manufacturer: "Manufacturer",
    ...overrides,
  }) as Coaster;

const getComparisonKey = (a: Coaster, b: Coaster): string =>
  a.id < b.id ? `${a.id}-${b.id}` : `${b.id}-${a.id}`;

/**
 * Drives an engine to completion by always picking whichever coaster comes
 * first in `targetOrderIds`, and reports the comparisons asked so tests can
 * assert on caching/dedup behaviour.
 */
function runFullRanking(engine: RankingEngine, targetOrderIds: string[]) {
  const askedPairs: string[] = [];
  let safetyCounter = 0;

  while (engine.getCurrentComparison()) {
    if (safetyCounter++ > 200) {
      throw new Error("Too many comparisons - possible infinite loop");
    }
    const { coasterA, coasterB } = engine.getCurrentComparison()!;
    askedPairs.push(getComparisonKey(coasterA, coasterB));

    const aIndex = targetOrderIds.indexOf(coasterA.id);
    const bIndex = targetOrderIds.indexOf(coasterB.id);
    const winner = aIndex < bIndex ? coasterA : coasterB;
    engine.recordComparisonResult(winner);
  }

  return { comparisonCount: askedPairs.length, askedPairs };
}

describe("RankingEngine - construction", () => {
  it("throws when given no coasters", () => {
    expect(() => new RankingEngine([])).toThrow(
      "No coasters available for ranking",
    );
  });

  it("throws when given a single unranked coaster (need at least 2)", () => {
    const a = makeCoaster({ id: "a", name: "Alpha" });
    expect(() => new RankingEngine([a])).toThrow(
      "Need at least 2 coasters to rank, got 1",
    );
  });

  it("throws when the only coaster is pre-ranked (excluded from both pools)", () => {
    const a = makeCoaster({
      id: "a",
      name: "Alpha",
      isPreRanked: true,
      rankPosition: 1,
    });
    expect(() => new RankingEngine([a])).toThrow(
      "No coasters available for ranking",
    );
  });

  it("is immediately complete when every coaster already has a rank position", () => {
    const a = makeCoaster({ id: "a", name: "Alpha", rankPosition: 2 });
    const b = makeCoaster({ id: "b", name: "Bravo", rankPosition: 1 });
    const c = makeCoaster({ id: "c", name: "Charlie", rankPosition: 3 });

    const engine = new RankingEngine([a, b, c]);

    expect(engine.getCurrentComparison()).toBeNull();
    expect(engine.getState().isComplete).toBe(true);
    expect(engine.getFinalRanking().map((coaster) => coaster.id)).toEqual([
      "b",
      "a",
      "c",
    ]);
  });

  it("generates the first comparison between an unranked coaster and an already-ranked one when mixing pre-existing ranks with new coasters", () => {
    const ranked = makeCoaster({ id: "r", name: "Ranked", rankPosition: 1 });
    const newOne = makeCoaster({ id: "n1", name: "NewOne" });
    const newTwo = makeCoaster({ id: "n2", name: "NewTwo" });

    const engine = new RankingEngine([ranked, newOne, newTwo]);

    expect(engine.getCurrentComparison()).toEqual({
      coasterA: newOne,
      coasterB: ranked,
    });
  });

  it("returns an empty final ranking before the session is complete", () => {
    const a = makeCoaster({ id: "a", name: "Alpha" });
    const b = makeCoaster({ id: "b", name: "Bravo" });
    const engine = new RankingEngine([a, b]);

    expect(engine.getFinalRanking()).toEqual([]);
  });
});

describe("RankingEngine - first comparison uses the real winner (regression)", () => {
  it("places the second (right-hand) coaster on top when the user picks it, instead of defaulting to the first", () => {
    const alpha = makeCoaster({ id: "a", name: "Alpha" });
    const bravo = makeCoaster({ id: "b", name: "Bravo" });

    const engine = new RankingEngine([alpha, bravo]);
    const comparison = engine.getCurrentComparison()!;
    expect(comparison.coasterA.id).toBe("a");
    expect(comparison.coasterB.id).toBe("b");

    // User clicks the RIGHT-hand coaster (bravo), not coasterA.
    engine.recordComparisonResult(bravo);

    const state = engine.getState();
    expect(state.rankedCoasterIds).toEqual(["b", "a"]);
    expect(state.isComplete).toBe(true);
    expect(engine.getFinalRanking().map((c) => c.id)).toEqual(["b", "a"]);
  });

  it("still places the first (left-hand) coaster on top when the user actually picks it", () => {
    const alpha = makeCoaster({ id: "a", name: "Alpha" });
    const bravo = makeCoaster({ id: "b", name: "Bravo" });

    const engine = new RankingEngine([alpha, bravo]);
    engine.recordComparisonResult(alpha);

    expect(engine.getState().rankedCoasterIds).toEqual(["a", "b"]);
  });
});

describe("RankingEngine - full binary-insertion ranking flow", () => {
  it("ranks a full set of coasters end to end in the expected order, never repeating a comparison, and asks fewer than the full pairwise total", () => {
    const names = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"];
    const coasters = names.map((name, index) =>
      makeCoaster({ id: `id-${index}`, name }),
    );
    // Target: alphabetical order is "best to worst".
    const targetOrderIds = coasters.map((c) => c.id);

    const engine = new RankingEngine(coasters);
    const { comparisonCount, askedPairs } = runFullRanking(
      engine,
      targetOrderIds,
    );

    expect(engine.getState().isComplete).toBe(true);
    expect(engine.getFinalRanking().map((c) => c.id)).toEqual(targetOrderIds);

    // This also exercises findInsertionPosition/getNextBinarySearchComparison
    // across many placements without ever hitting their "coaster id not
    // found in allCoasters" invariant-violation error path.
    expect(new Set(askedPairs).size).toBe(askedPairs.length);

    const maxPossiblePairs = (coasters.length * (coasters.length - 1)) / 2;
    expect(comparisonCount).toBeLessThan(maxPossiblePairs);
  });

  it("ranks a full set of dark-ride coasters end to end in the expected order", () => {
    const names = [
      "Haunted Mansion",
      "Space Mountain",
      "Pirates",
      "Small World",
    ];
    const coasters = names.map((name, index) =>
      makeCoaster({ id: `dr-${index}`, name, type: "dark-ride" }),
    );
    const targetOrderIds = coasters.map((c) => c.id);

    const engine = new RankingEngine(coasters);
    runFullRanking(engine, targetOrderIds);

    expect(engine.getState().isComplete).toBe(true);
    const finalRanking = engine.getFinalRanking();
    expect(finalRanking.map((c) => c.id)).toEqual(targetOrderIds);
    expect(finalRanking.every((c) => c.type === "dark-ride")).toBe(true);
  });

  it("treats coaster-typed and dark-ride-typed entries identically when mixed in one session", () => {
    const coasters = [
      makeCoaster({ id: "c1", name: "Steel Vengeance", type: "coaster" }),
      makeCoaster({ id: "d1", name: "Haunted Mansion", type: "dark-ride" }),
      makeCoaster({ id: "c2", name: "Fury 325", type: "coaster" }),
      makeCoaster({ id: "d2", name: "Space Mountain", type: "dark-ride" }),
    ];
    const targetOrderIds = ["d1", "c1", "d2", "c2"];

    const engine = new RankingEngine(coasters);
    runFullRanking(engine, targetOrderIds);

    expect(engine.getFinalRanking().map((c) => c.id)).toEqual(targetOrderIds);
  });
});

describe("RankingEngine - undo", () => {
  it("cannot undo before any comparison has been recorded", () => {
    const a = makeCoaster({ id: "a", name: "Alpha" });
    const b = makeCoaster({ id: "b", name: "Bravo" });
    const engine = new RankingEngine([a, b]);

    expect(engine.canUndo()).toBe(false);
    expect(() => engine.undo()).toThrow("No previous state to undo to");
  });

  it("reverts to the pre-comparison state after undo", () => {
    const a = makeCoaster({ id: "a", name: "Alpha" });
    const b = makeCoaster({ id: "b", name: "Bravo" });
    const engine = new RankingEngine([a, b]);
    const originalComparison = engine.getCurrentComparison()!;

    engine.recordComparisonResult(b);
    expect(engine.getState().rankedCoasterIds).toEqual(["b", "a"]);
    expect(engine.canUndo()).toBe(true);

    engine.undo();

    const state = engine.getState();
    expect(state.rankedCoasterIds).toEqual([]);
    expect(state.isComplete).toBe(false);
    expect(state.currentComparison?.coasterA.id).toBe(
      originalComparison.coasterA.id,
    );
    expect(state.currentComparison?.coasterB.id).toBe(
      originalComparison.coasterB.id,
    );
    expect(engine.canUndo()).toBe(false);
  });

  it("throws on a second undo once history is exhausted", () => {
    const a = makeCoaster({ id: "a", name: "Alpha" });
    const b = makeCoaster({ id: "b", name: "Bravo" });
    const engine = new RankingEngine([a, b]);

    engine.recordComparisonResult(b);
    engine.undo();

    expect(() => engine.undo()).toThrow("No previous state to undo to");
  });
});

describe("RankingEngine - recordComparisonResult guard", () => {
  it("throws if there is no active comparison to record", () => {
    const a = makeCoaster({ id: "a", name: "Alpha", rankPosition: 1 });
    const b = makeCoaster({ id: "b", name: "Bravo", rankPosition: 2 });
    // Already fully ranked via rankPosition, so no comparison is ever generated.
    const engine = new RankingEngine([a, b]);

    expect(engine.getCurrentComparison()).toBeNull();
    expect(() => engine.recordComparisonResult(a)).toThrow(
      "No active comparison to record",
    );
  });
});

describe("RankingEngine.fromPartialState", () => {
  const c1 = makeCoaster({ id: "c1", name: "Alpha" });
  const c2 = makeCoaster({ id: "c2", name: "Bravo" });
  const c3 = makeCoaster({ id: "c3", name: "Charlie" });
  const c4 = makeCoaster({ id: "c4", name: "Delta", type: "dark-ride" });

  it("resumes a partial session: ranked order preserved, unranked (explicit + newly added) still pending", () => {
    const engine = RankingEngine.fromPartialState([c1, c2, c3, c4], {
      rankedCoasterIds: ["c1", "c2"],
      comparisonResults: [["c1-c2", "c1"]],
      unrankedCoasterIds: ["c3"],
    });

    const state = engine.getState();
    expect(state.rankedCoasterIds).toEqual(["c1", "c2"]);
    expect(state.isComplete).toBe(false);

    const currentRanking = engine.getCurrentRanking();
    const unrankedIds = currentRanking.slice(2).map((c) => c.id);
    // c3 was explicitly unranked; c4 is "new" (not mentioned in the saved
    // state at all) and should also be picked up as unranked.
    expect(unrankedIds.sort()).toEqual(["c3", "c4"]);

    // Not complete, and no currentComparison was supplied, so one should
    // have been generated automatically.
    expect(engine.getCurrentComparison()).not.toBeNull();
  });

  it("silently drops a ranked id that no longer exists in the current coaster list, without crashing", () => {
    // Documents the existing contract (not necessarily ideal): a stale
    // rankedCoasterIds entry, e.g. from a coaster deleted after the partial
    // state was saved, is filtered out rather than throwing.
    const engine = RankingEngine.fromPartialState([c1, c2, c3], {
      rankedCoasterIds: ["c1", "ghost-id"],
      comparisonResults: [],
      unrankedCoasterIds: ["c2", "c3"],
    });

    expect(engine.getState().rankedCoasterIds).toEqual(["c1"]);
  });

  it("silently drops a stale unranked id that no longer exists in the current coaster list", () => {
    const engine = RankingEngine.fromPartialState([c1, c2], {
      rankedCoasterIds: [],
      comparisonResults: [],
      unrankedCoasterIds: ["c1", "ghost-id"],
    });

    const unrankedIds = engine.getCurrentRanking().map((c) => c.id);
    expect(unrankedIds.sort()).toEqual(["c1", "c2"]);
  });

  it("restores a valid currentComparison and lastComparison from the saved state", () => {
    const engine = RankingEngine.fromPartialState([c1, c2, c3], {
      rankedCoasterIds: ["c1"],
      comparisonResults: [],
      unrankedCoasterIds: ["c2", "c3"],
      currentComparison: { coasterAId: "c2", coasterBId: "c3" },
      lastComparison: {
        winnerId: "c1",
        loserId: "c2",
        coasterAId: "c1",
        coasterBId: "c2",
      },
    });

    expect(engine.getCurrentComparison()).toEqual({
      coasterA: c2,
      coasterB: c3,
    });
    expect(engine.getLastComparison()).toEqual({
      comparison: { coasterA: c1, coasterB: c2 },
      winner: c1,
      loser: c2,
    });
  });

  it("is complete when every rankable coaster is already accounted for in rankedCoasterIds", () => {
    const engine = RankingEngine.fromPartialState([c1, c2], {
      rankedCoasterIds: ["c1", "c2"],
      comparisonResults: [],
      unrankedCoasterIds: [],
    });

    expect(engine.getState().isComplete).toBe(true);
    expect(engine.getCurrentComparison()).toBeNull();
  });
});
