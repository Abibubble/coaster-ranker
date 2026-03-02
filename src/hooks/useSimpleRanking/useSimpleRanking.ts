import { useState, useCallback, useMemo, useEffect } from "react";
import { Coaster, RideType } from "../../types/data";
import { useData } from "../../contexts/DataContext";
import {
  RankingEngine,
  RankingComparison,
  ComparisonResult,
} from "../../utils/ranking/newRankingEngine.util";

export interface UseSimpleRankingReturn {
  currentComparison: RankingComparison | null;
  recordWinner: (winner: Coaster) => void;
  isComplete: boolean;
  finalRanking: Coaster[];
  rankedCoasterCount: number;
  progress: {
    totalComparisons: number;
    completedComparisons: number;
  };
  lastComparison: ComparisonResult | null;
  canUndo: boolean;
  undo: () => void;
  savePartialState: () => void;
}

export const useSimpleRanking = (
  coasters: Coaster[],
  rideType: RideType = "coaster",
): UseSimpleRankingReturn => {
  const { savePartialRanking } = useData();

  // Use state to store the ranking engine with stable initialization
  const [rankingEngine, setRankingEngine] = useState<RankingEngine | null>(
    null,
  );
  const [, setForceUpdate] = useState(0);

  // Track coasters to detect changes
  const [lastCoastersHash, setLastCoastersHash] = useState<string>("");

  // Create hash of coasters to detect meaningful changes
  const coastersHash = useMemo(() => {
    if (!coasters.length) return "";
    return coasters
      .map((c) => c.id)
      .sort()
      .join(",");
  }, [coasters]);

  // Initialize ranking engine only when coasters actually change
  useEffect(() => {
    if (coastersHash === lastCoastersHash) return;

    setLastCoastersHash(coastersHash);

    if (!coasters?.length) {
      setRankingEngine(null);
      return;
    }

    const filteredCoasters = coasters.filter((c) => !c.isPreRanked);
    if (filteredCoasters.length === 0) {
      setRankingEngine(null);
      return;
    }

    console.log("Initializing ranking engine...");

    // Check for existing partial state in localStorage
    const storageKey =
      rideType === "coaster"
        ? "partialRankingState"
        : "partialDarkRideRankingState";
    const savedState = localStorage.getItem(storageKey);

    let engine: RankingEngine;

    if (savedState) {
      try {
        console.log("Restoring ranking from partial state...");
        const partialState = JSON.parse(savedState);

        // Validate that ranking state isn't completely stale
        const currentCoasterIds = new Set(filteredCoasters.map((c) => c.id));
        const validRankedIds =
          partialState.rankedCoasterIds?.filter((id: string) =>
            currentCoasterIds.has(id),
          ) || [];

        // Clear stale data if no ranked coasters are valid
        if (
          partialState.rankedCoasterIds?.length > 0 &&
          validRankedIds.length === 0
        ) {
          console.warn(
            "No valid ranked coasters found in partial state, clearing...",
          );
          localStorage.removeItem(storageKey);
          throw new Error("Stale partial state - no valid ranked coasters");
        }

        // Let the engine handle adding any new coasters to unranked
        engine = RankingEngine.fromPartialState(filteredCoasters, partialState);
      } catch (error) {
        console.error("Failed to restore from partial state:", error);
        localStorage.removeItem(storageKey);
        engine = new RankingEngine(filteredCoasters);
      }
    } else {
      console.log("Creating new ranking engine...");
      engine = new RankingEngine(filteredCoasters);
    }

    setRankingEngine(engine);
  }, [coastersHash, rideType, lastCoastersHash, coasters]);

  const savePartialState = useCallback(() => {
    if (!rankingEngine) return;

    const state = rankingEngine.getState();

    // Only save if there's meaningful progress
    if (
      state.isComplete ||
      (state.rankedCoasterIds.length === 0 &&
        state.comparisonResults.size === 0)
    ) {
      return;
    }

    const unrankedCoasterIds = state.unrankedCoasters.map((c) => c.id);

    // Use a timeout to batch rapid saves and prevent infinite loops
    setTimeout(() => {
      savePartialRanking(
        state.rankedCoasterIds,
        state.comparisonResults,
        unrankedCoasterIds,
        state.currentComparison,
        state.lastComparison,
        rideType,
      );
    }, 10);
  }, [rankingEngine, rideType, savePartialRanking]);

  const recordWinner = useCallback(
    (winner: Coaster) => {
      if (!rankingEngine) {
        console.error("No ranking engine available");
        return;
      }

      try {
        console.log("Recording winner:", winner.name);
        rankingEngine.recordComparisonResult(winner);
        setForceUpdate((prev) => prev + 1);
      } catch (error) {
        console.error("Error recording comparison result:", error);
      }
    },
    [rankingEngine],
  );

  const currentComparison = rankingEngine?.getCurrentComparison() || null;
  const isComplete = rankingEngine?.getState().isComplete || false;
  const finalRanking = isComplete
    ? rankingEngine?.getFinalRanking() || []
    : rankingEngine?.getCurrentRanking() || [];
  const rankedCoasterCount =
    rankingEngine?.getState().rankedCoasterIds.length || 0;

  const progress = useMemo(() => {
    if (!rankingEngine) {
      return { totalComparisons: 0, completedComparisons: 0 };
    }

    const state = rankingEngine.getState();
    const completedComparisons = state.comparisonResults.size;

    const totalCoasters = coasters.filter((c) => !c.isPreRanked).length;
    const estimatedTotal = Math.max(
      1,
      Math.ceil(totalCoasters * Math.log2(totalCoasters + 1)),
    );

    return {
      totalComparisons: estimatedTotal,
      completedComparisons,
    };
  }, [rankingEngine, coasters]);

  const lastComparison = rankingEngine?.getLastComparison() || null;
  const canUndo = rankingEngine?.canUndo() || false;

  const undo = useCallback(() => {
    if (!rankingEngine) {
      console.error("No ranking engine available for undo");
      return;
    }

    try {
      console.log("Performing undo...");
      rankingEngine.undo();
      setForceUpdate((prev) => prev + 1);
    } catch (error) {
      console.error("Error undoing last comparison:", error);
    }
  }, [rankingEngine]);

  return {
    currentComparison,
    recordWinner,
    isComplete,
    finalRanking,
    rankedCoasterCount,
    progress,
    lastComparison,
    canUndo,
    undo,
    savePartialState,
  };
};
