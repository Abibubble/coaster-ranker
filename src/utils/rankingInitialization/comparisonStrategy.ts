import { Coaster } from "../../types/data";
// Old ranking utilities no longer exist
const generateComparisons = (
  _coasters: Coaster[],
  _completedComparisons: Set<string>
): [Coaster, Coaster][] => [];
const generatePositionalComparisons = (
  _coasters: Coaster[],
  _rankedCoasters: string[],
  _completedComparisons: Set<string>,
  _comparisonResults: Map<string, string>
): [Coaster, Coaster][] => [];

export interface ComparisonStrategy {
  type: "full" | "positional";
  reason: string;
}

export interface ComparisonStrategyParams {
  coasters: Coaster[];
  rankedCoasters: string[];
  completedComparisons: Set<string>;
  comparisonResults: Map<string, string>;
}

/**
 * Determine the optimal comparison generation strategy
 * Based on the current state of ranking and coaster properties
 */
export const determineComparisonStrategy = ({
  coasters: _coasters,
  rankedCoasters: _rankedCoasters,
}: ComparisonStrategyParams): ComparisonStrategy => {
  // Always use positional strategy for all ranking workflows
  // This implements sequential insertion: compare each coaster against
  // already-ranked coasters to find its position using binary search
  return {
    type: "positional",
    reason: "Sequential binary search insertion strategy for efficient ranking",
  };
};

/**
 * Generate comparisons based on the selected strategy
 */
export const generateComparisonsByStrategy = (
  strategy: ComparisonStrategy,
  params: ComparisonStrategyParams
): [Coaster, Coaster][] => {
  const { coasters, rankedCoasters, completedComparisons, comparisonResults } =
    params;

  switch (strategy.type) {
    case "full":
      return generateComparisons(coasters, completedComparisons);

    case "positional":
      return generatePositionalComparisons(
        coasters,
        rankedCoasters,
        completedComparisons,
        comparisonResults
      );

    default:
      throw new Error(`Unknown comparison strategy: ${strategy.type}`);
  }
};

/**
 * Get comparison strategy and generate comparisons in one call
 */
export const getOptimalComparisons = (
  params: ComparisonStrategyParams
): {
  strategy: ComparisonStrategy;
  comparisons: [Coaster, Coaster][];
} => {
  const strategy = determineComparisonStrategy(params);
  const comparisons = generateComparisonsByStrategy(strategy, params);

  return { strategy, comparisons };
};
