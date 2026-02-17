import { useState, useCallback, useMemo } from "react";
import { Coaster } from "../../types/data";
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
}

export const useSimpleRanking = (
  coasters: Coaster[],
): UseSimpleRankingReturn => {
  const rankingEngine = useMemo(() => {
    if (coasters.length === 0) return null;
    try {
      const engine = new RankingEngine(coasters);
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
  };
};
