import { Coaster } from "../../types/data";

/**
 * Simple ranking implementation using binary search insertion
 * This replaces the complex existing ranking logic with a straightforward approach
 */

export interface RankingState {
  rankedCoasters: string[]; // IDs in rank order (index 0 = #1, index 1 = #2, etc.)
  comparisonResults: Map<string, string>; // key: "coasterA-coasterB", value: winnerId
}

/**
 * Initialize ranking with the first two coasters
 */
export const initializeRanking = (
  coasterA: Coaster,
  coasterB: Coaster,
  winner: Coaster
): RankingState => {
  const comparisonKey = getComparisonKey(coasterA, coasterB);
  const loser = winner.id === coasterA.id ? coasterB : coasterA;

  return {
    rankedCoasters: [winner.id, loser.id],
    comparisonResults: new Map([[comparisonKey, winner.id]]),
  };
};

/**
 * Add a new coaster to the ranking using binary search insertion
 */
export const insertCoasterWithBinarySearch = (
  newCoaster: Coaster,
  currentState: RankingState,
  allCoasters: Coaster[]
): {
  nextComparison: [Coaster, Coaster] | null;
  updatedState: RankingState | null;
} => {
  const { rankedCoasters, comparisonResults } = currentState;

  // If no coasters ranked yet, this shouldn't happen with our algorithm
  if (rankedCoasters.length === 0) {
    throw new Error("Cannot insert coaster into empty ranking");
  }

  // Find the correct insertion position using binary search
  const insertionResult = findInsertionPosition(
    newCoaster,
    rankedCoasters,
    comparisonResults,
    allCoasters
  );

  if (insertionResult.needsComparison) {
    // Need more comparisons to determine position
    return {
      nextComparison: insertionResult.nextComparison!,
      updatedState: null,
    };
  } else {
    // We have enough information to place the coaster
    const newRankedCoasters = [...rankedCoasters];
    newRankedCoasters.splice(insertionResult.insertPosition!, 0, newCoaster.id);

    return {
      nextComparison: null,
      updatedState: {
        rankedCoasters: newRankedCoasters,
        comparisonResults: new Map(comparisonResults),
      },
    };
  }
};

/**
 * Record a comparison result and update the state
 */
export const recordComparison = (
  coasterA: Coaster,
  coasterB: Coaster,
  winner: Coaster,
  currentState: RankingState
): RankingState => {
  const comparisonKey = getComparisonKey(coasterA, coasterB);
  const newComparisonResults = new Map(currentState.comparisonResults);
  newComparisonResults.set(comparisonKey, winner.id);

  return {
    ...currentState,
    comparisonResults: newComparisonResults,
  };
};

/**
 * Find where to insert a new coaster using binary search logic
 */
const findInsertionPosition = (
  newCoaster: Coaster,
  rankedCoasters: string[],
  comparisonResults: Map<string, string>,
  allCoasters: Coaster[]
): {
  needsComparison: boolean;
  nextComparison?: [Coaster, Coaster];
  insertPosition?: number;
} => {
  let left = 0;
  let right = rankedCoasters.length;

  // Binary search to find insertion point
  while (left < right) {
    const mid = Math.ceil((left + right) / 2); // Using Math.ceil as requested
    const midCoasterId = rankedCoasters[mid - 1]; // -1 because we're finding insertion point
    const midCoaster = allCoasters.find((c) => c.id === midCoasterId)!;

    const comparisonKey = getComparisonKey(newCoaster, midCoaster);
    const comparisonResult = comparisonResults.get(comparisonKey);

    if (!comparisonResult) {
      // Need this comparison to continue binary search
      return {
        needsComparison: true,
        nextComparison: [newCoaster, midCoaster],
      };
    }

    if (comparisonResult === newCoaster.id) {
      // New coaster wins, search in upper half (better positions)
      right = mid - 1;
    } else {
      // Mid coaster wins, search in lower half (worse positions)
      left = mid;
    }
  }

  // Found insertion position
  return {
    needsComparison: false,
    insertPosition: left,
  };
};

/**
 * Check if we know the result of comparing two coasters
 */
export const getComparisonResult = (
  coasterA: Coaster,
  coasterB: Coaster,
  comparisonResults: Map<string, string>
): string | null => {
  const comparisonKey = getComparisonKey(coasterA, coasterB);
  return comparisonResults.get(comparisonKey) || null;
};

/**
 * Generate comparison key for two coasters (consistent ordering)
 */
const getComparisonKey = (coasterA: Coaster, coasterB: Coaster): string => {
  return coasterA.id < coasterB.id
    ? `${coasterA.id}-${coasterB.id}`
    : `${coasterB.id}-${coasterA.id}`;
};

/**
 * Get the next coaster that needs to be ranked
 */
export const getNextUnrankedCoaster = (
  allCoasters: Coaster[],
  rankedCoasters: string[]
): Coaster | null => {
  return (
    allCoasters.find((c) => !rankedCoasters.includes(c.id) && !c.isPreRanked) ||
    null
  );
};

/**
 * Check if ranking is complete
 */
export const isRankingComplete = (
  allCoasters: Coaster[],
  rankedCoasters: string[]
): boolean => {
  const unrankedCount = allCoasters.filter(
    (c) => !rankedCoasters.includes(c.id) && !c.isPreRanked
  ).length;

  return unrankedCount === 0;
};
