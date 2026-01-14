import { Coaster, UploadedData } from "../../types/data";
interface InitializedRanking {
  coasters: Coaster[];
  rankedCoasters: string[];
}
// Old ranking utilities no longer exist
const getCoastersWithPositions = (
  _coasters: Coaster[],
  _rankedCoasters: string[]
): Coaster[] => [];
const initializePositionalRanking = (
  _coasters: Coaster[]
): InitializedRanking => ({
  coasters: [],
  rankedCoasters: [],
});
import {
  getOptimalComparisons,
  ComparisonStrategyParams,
} from "./comparisonStrategy";
import {
  calculateTotalComparisons,
  getRankingCompletionData,
  isRankingCompleteCheck,
} from "./rankingState";

export interface IndividualRankingParams {
  uploadedData: UploadedData;
  comparisonResults: Map<string, string>;
}

export interface IndividualRankingResult {
  comparisons: [Coaster, Coaster][];
  coastersWithPositions: Coaster[];
  totalPossibleComparisons: number;
  completedComparisons: Set<string>;
  updatedData: UploadedData;
  isRankingComplete: boolean;
  rankedCoasters: Coaster[];
}

/**
 * Initialize individual ranking for coasters
 * This handles comparison strategy selection and state initialization
 */
export const initializeIndividualRanking = ({
  uploadedData,
  comparisonResults,
}: IndividualRankingParams): IndividualRankingResult => {
  const initialized = initializePositionalRanking(uploadedData.coasters);

  const coastersWithPositions = getCoastersWithPositions(
    initialized.coasters,
    initialized.rankedCoasters
  );

  // For sequential insertion with new coasters, start fresh with empty completed comparisons
  const hasNewCoasters = initialized.coasters.some((c) => c.isCurrentlyRanking);
  const completedComparisons = hasNewCoasters
    ? new Set<string>()
    : uploadedData.rankingMetadata?.completedComparisons || new Set<string>();

  // Use strategy-based comparison generation
  const strategyParams: ComparisonStrategyParams = {
    coasters: coastersWithPositions,
    rankedCoasters: initialized.rankedCoasters,
    completedComparisons,
    comparisonResults,
  };

  const { comparisons } = getOptimalComparisons(strategyParams);

  const totalPossibleComparisons = calculateTotalComparisons(
    uploadedData.coasters.length
  );

  const isComplete = isRankingCompleteCheck(
    comparisons,
    initialized.rankedCoasters.length,
    uploadedData.coasters.length
  );

  const { isRankingComplete, rankedCoasters } = getRankingCompletionData(
    isComplete,
    coastersWithPositions
  );

  const updatedData: UploadedData = {
    ...uploadedData,
    coasters: coastersWithPositions,
    rankingMetadata: {
      ...uploadedData.rankingMetadata,
      rankedCoasters: initialized.rankedCoasters,
      completedComparisons,
      isRanked: uploadedData.rankingMetadata?.isRanked || false,
    },
  };

  return {
    comparisons,
    coastersWithPositions,
    totalPossibleComparisons,
    completedComparisons,
    updatedData,
    isRankingComplete,
    rankedCoasters,
  };
};
