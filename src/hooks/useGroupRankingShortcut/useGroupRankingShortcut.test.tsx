import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Coaster } from "../../types/data";
import { useGroupRankingShortcut } from "./useGroupRankingShortcut";
import { MIN_GROUP_MATCHES_FOR_SHORTCUT } from "../../utils/ranking/findGroupMatches.util";

const makeCoaster = (overrides: Partial<Coaster> & { id: string }): Coaster => ({
  name: "Coaster",
  park: "Park",
  country: "Country",
  manufacturer: "Manufacturer",
  ...overrides,
});

const makeWingGroup = (count: number): Coaster[] =>
  Array.from({ length: count }, (_, i) =>
    makeCoaster({
      id: `wing-${i}`,
      name: `Wing ${i}`,
      model: "Wing Coaster",
      manufacturer: "B&M",
      rankPosition: i + 1,
    }),
  );

describe("useGroupRankingShortcut - offer", () => {
  it("offers the shortcut when 4+ already-ranked coasters share model+manufacturer", () => {
    const newCoaster = makeCoaster({
      id: "new",
      name: "New Wing",
      model: "Wing Coaster",
      manufacturer: "B&M",
    });
    const ranked = makeWingGroup(MIN_GROUP_MATCHES_FOR_SHORTCUT);

    const { result } = renderHook(() =>
      useGroupRankingShortcut(newCoaster, ranked, vi.fn()),
    );

    expect(result.current.offer).not.toBeNull();
    expect(result.current.offer?.newCoaster.id).toBe("new");
    expect(result.current.offer?.groupMatches).toHaveLength(
      MIN_GROUP_MATCHES_FOR_SHORTCUT,
    );
  });

  it("does not offer the shortcut with only 3 matches (not more than 3)", () => {
    const newCoaster = makeCoaster({
      id: "new",
      model: "Wing Coaster",
      manufacturer: "B&M",
    });
    const ranked = makeWingGroup(3);

    const { result } = renderHook(() =>
      useGroupRankingShortcut(newCoaster, ranked, vi.fn()),
    );

    expect(result.current.offer).toBeNull();
  });

  it("does not offer the shortcut when there is no next unranked coaster", () => {
    const ranked = makeWingGroup(5);

    const { result } = renderHook(() =>
      useGroupRankingShortcut(null, ranked, vi.fn()),
    );

    expect(result.current.offer).toBeNull();
  });
});

describe("useGroupRankingShortcut - decline", () => {
  it("stops offering the shortcut for this coaster once declined, without calling onComplete", () => {
    const newCoaster = makeCoaster({
      id: "new",
      model: "Wing Coaster",
      manufacturer: "B&M",
    });
    const ranked = makeWingGroup(5);
    const onComplete = vi.fn();

    const { result } = renderHook(() =>
      useGroupRankingShortcut(newCoaster, ranked, onComplete),
    );

    expect(result.current.offer).not.toBeNull();
    act(() => result.current.declineOffer());

    expect(result.current.offer).toBeNull();
    expect(result.current.isActive).toBe(false);
    expect(onComplete).not.toHaveBeenCalled();
  });
});

describe("useGroupRankingShortcut - accept and complete", () => {
  it("runs a mini-ranking among just the group, then reports the final order via onComplete", () => {
    const newCoaster = makeCoaster({
      id: "new",
      name: "New Wing",
      model: "Wing Coaster",
      manufacturer: "B&M",
    });
    const ranked = makeWingGroup(4); // wing-0 (best) .. wing-3 (worst)
    const onComplete = vi.fn();

    const { result } = renderHook(() =>
      useGroupRankingShortcut(newCoaster, ranked, onComplete),
    );

    act(() => result.current.acceptOffer());

    expect(result.current.isActive).toBe(true);
    expect(result.current.offer).toBeNull();
    expect(result.current.groupComparison).not.toBeNull();

    // Drive the mini-ranking to completion by always picking whichever side
    // isn't "new" - i.e. the new coaster loses every comparison, so it
    // should end up ranked last within the group.
    let safety = 0;
    while (result.current.isActive) {
      if (safety++ > 20) throw new Error("mini-ranking did not complete");
      const comparison = result.current.groupComparison!;
      const winner =
        comparison.coasterA.id === "new"
          ? comparison.coasterB
          : comparison.coasterA;
      act(() => result.current.recordGroupWinner(winner));
    }

    expect(onComplete).toHaveBeenCalledTimes(1);
    const finalOrder = onComplete.mock.calls[0][0] as Coaster[];
    expect(finalOrder.map((c) => c.id).slice(-1)).toEqual(["new"]);
    expect(finalOrder).toHaveLength(5);
  });

  it("stops offering the shortcut for the same coaster again after it completes", () => {
    const newCoaster = makeCoaster({
      id: "new",
      model: "Wing Coaster",
      manufacturer: "B&M",
    });
    const ranked = makeWingGroup(4);

    const { result } = renderHook(() =>
      useGroupRankingShortcut(newCoaster, ranked, vi.fn()),
    );

    act(() => result.current.acceptOffer());

    let safety = 0;
    while (result.current.isActive) {
      if (safety++ > 20) throw new Error("mini-ranking did not complete");
      const comparison = result.current.groupComparison!;
      act(() => result.current.recordGroupWinner(comparison.coasterA));
    }

    expect(result.current.offer).toBeNull();
  });
});

describe("useGroupRankingShortcut - cancel mid-comparison", () => {
  it("exits the mini-ranking without calling onComplete, and does not re-offer for this coaster", () => {
    const newCoaster = makeCoaster({
      id: "new",
      model: "Wing Coaster",
      manufacturer: "B&M",
    });
    const ranked = makeWingGroup(4);
    const onComplete = vi.fn();

    const { result } = renderHook(() =>
      useGroupRankingShortcut(newCoaster, ranked, onComplete),
    );

    act(() => result.current.acceptOffer());
    expect(result.current.isActive).toBe(true);

    act(() => result.current.cancelActiveComparison());

    expect(result.current.isActive).toBe(false);
    expect(result.current.offer).toBeNull();
    expect(onComplete).not.toHaveBeenCalled();
  });
});
