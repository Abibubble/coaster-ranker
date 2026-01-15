import { useState, useCallback, useMemo } from "react";
import { Coaster } from "../../types/data";
import {
  RankingEngine,
  RankingComparison,
} from "../../utils/ranking/newRankingEngine";

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
}

/**
 * Hook to manage simple binary search ranking
 * Supports incremental ranking when coasters have existing rankPosition values
 */
export const useSimpleRanking = (
  coasters: Coaster[]
): UseSimpleRankingReturn => {
  // Initialize ranking engine
  const rankingEngine = useMemo(() => {
    if (coasters.length === 0) return null;
    try {
      console.log(
        "Creating ranking engine with",
        coasters.filter((c) => c.rankPosition !== undefined).length,
        "pre-ranked coasters"
      );
      const engine = new RankingEngine(coasters);
      console.log(
        "Initial comparison:",
        engine.getCurrentComparison()?.coasterA.name,
        "vs",
        engine.getCurrentComparison()?.coasterB.name
      );
      return engine;
    } catch (error) {
      console.error("Error creating ranking engine:", error);
      return null;
    }
  }, [coasters]);

  const [, setForceUpdate] = useState(0);

  const recordWinner = useCallback(
    (winner: Coaster) => {
      if (!rankingEngine) {
        console.error("No ranking engine available");
        return;
      }

      try {
        console.log("Recording winner:", winner.name);
        rankingEngine.recordComparisonResult(winner);
        setForceUpdate((prev) => prev + 1); // Force re-render
      } catch (error) {
        console.error("Error recording comparison result:", error);
      }
    },
    [rankingEngine]
  );

  // Force re-render to get current state
  const currentComparison = rankingEngine?.getCurrentComparison() || null;
  const isComplete = rankingEngine?.getState().isComplete || false;
  const finalRanking = isComplete
    ? rankingEngine?.getFinalRanking() || []
    : rankingEngine?.getCurrentRanking() || [];
  const rankedCoasterCount =
    rankingEngine?.getState().rankedCoasterIds.length || 0;

  // Calculate progress
  const progress = useMemo(() => {
    if (!rankingEngine) {
      return { totalComparisons: 0, completedComparisons: 0 };
    }

    const state = rankingEngine.getState();
    const completedComparisons = state.comparisonResults.size;

    // Estimate total comparisons needed for binary search ranking
    // For n coasters, we need approximately n * log2(n) comparisons
    const totalCoasters = coasters.filter((c) => !c.isPreRanked).length;
    const estimatedTotal = Math.max(
      1,
      Math.ceil(totalCoasters * Math.log2(totalCoasters + 1))
    );

    return {
      totalComparisons: estimatedTotal,
      completedComparisons,
    };
  }, [rankingEngine, coasters]);

  return {
    currentComparison,
    recordWinner,
    isComplete,
    finalRanking,
    rankedCoasterCount,
    progress,
  };
};
