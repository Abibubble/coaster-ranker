import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useSimpleRanking } from "./useSimpleRanking";
import { Coaster } from "../../types/data";

// Mock the useData hook
vi.mock("../../contexts/DataContext", () => ({
  useData: () => ({
    savePartialRanking: vi.fn(),
  }),
}));

// Mock the ranking engine
vi.mock("../../utils/ranking/newRankingEngine.util", () => {
  class MockRankingEngine {
    constructor(coasters: Coaster[]) {
      if (!coasters || coasters.length === 0) {
        throw new Error("No coasters provided");
      }
    }

    getCurrentComparison() {
      return null;
    }

    recordComparisonResult() {}

    getState() {
      return {
        isComplete: false,
        comparisonResults: new Map(),
        rankedCoasterIds: [],
      };
    }

    getFinalRanking() {
      return [];
    }

    getCurrentRanking() {
      return [];
    }

    getLastComparison() {
      return null;
    }

    canUndo() {
      return false;
    }

    undo() {}
  }

  return {
    RankingEngine: MockRankingEngine,
  };
});

const mockCoasters: Coaster[] = [
  {
    id: "1",
    name: "Steel Vengeance",
    park: "Cedar Point",
    country: "United States",
    manufacturer: "Rocky Mountain Construction",
    model: "I-Box",
    material: "Hybrid",
  },
];

describe("useSimpleRanking", () => {
  it("initializes with empty coasters array", () => {
    const { result } = renderHook(() => useSimpleRanking([]));

    expect(result.current.currentComparison).toBe(null);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.finalRanking).toEqual([]);
    expect(result.current.rankedCoasterCount).toBe(0);
  });

  it("provides hook interface", () => {
    const { result } = renderHook(() => useSimpleRanking(mockCoasters));

    expect(result.current).toBeDefined();
    expect(typeof result.current.recordWinner).toBe("function");
    expect(typeof result.current.undo).toBe("function");
    expect(result.current.progress).toBeDefined();
  });

  it("can call recordWinner", () => {
    const { result } = renderHook(() => useSimpleRanking(mockCoasters));

    act(() => {
      result.current.recordWinner(mockCoasters[0]);
    });

    // Should not throw
    expect(typeof result.current.isComplete).toBe("boolean");
  });
});
