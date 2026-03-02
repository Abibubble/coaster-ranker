export interface Coaster {
  country: string;
  id: string;
  isCurrentlyRanking?: boolean; // Whether this coaster is currently being ranked (for sequential insertion)
  isNewCoaster?: boolean; // Flag to track newly added coasters
  isPreRanked?: boolean; // Whether this coaster came from pre-ranked data
  name: string;
  originalRankPosition?: number; // Position in original upload order (for pre-ranked data)
  park: string;
  rankPosition?: number; // Current position in ranking (1 = best, higher = worse)
  manufacturer: string;
  model?: string;
  material?: string;
  thrillLevel?: string;
  type?: "coaster" | "dark-ride"; // Type of ride - defaults to 'coaster' for backward compatibility
  // Ranking metadata
}

export interface RankingMetadata {
  completedComparisons: Set<string>; // Set of "id1-id2" strings representing completed comparisons
  rankedCoasters: string[]; // Array of coaster IDs in ranking order (best to worst)
  isRanked: boolean; // Whether this dataset has been ranked
  hasPreRankedCoasters?: boolean; // Whether any coasters in this dataset are pre-ranked
  preRankedGroups?: string[]; // Array of upload IDs that were marked as pre-ranked
  // Partial ranking state for persistence
  partialRankingState?: {
    rankedCoasterIds: string[];
    comparisonResults: [string, string][]; // Array of [key, value] pairs for Map serialization
    unrankedCoasterIds: string[];
    currentComparison?: {
      coasterAId: string;
      coasterBId: string;
    };
    lastComparison?: {
      winnerId: string;
      loserId: string;
      coasterAId: string;
      coasterBId: string;
    };
  };
}

export interface UploadedData {
  coasters: Coaster[];
  uploadedAt: Date;
  filename: string;
  rankingMetadata?: RankingMetadata;
}

export type RideType = "coaster" | "dark-ride";

export type DataContextType = {
  uploadedData: UploadedData | null;
  setUploadedData: (data: UploadedData | null) => void;
  darkRideData: UploadedData | null;
  setDarkRideData: (data: UploadedData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  markRankingComplete: (finalRanking: Coaster[], rideType: RideType) => void;
  resetRanking: (rideType: RideType) => void;
  savePartialRanking: (
    rankedCoasterIds: string[],
    comparisonResults: Map<string, string>,
    unrankedCoasterIds: string[],
    currentComparison: {
      coasterA: { id: string };
      coasterB: { id: string };
    } | null,
    lastComparison: {
      winner: { id: string };
      loser: { id: string };
      comparison: { coasterA: { id: string }; coasterB: { id: string } };
    } | null,
    rideType: RideType,
  ) => void;
};
