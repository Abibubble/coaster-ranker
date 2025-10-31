export interface Coaster {
  id: string
  name: string
  park: string
  country: string
  manufacturer: string
  model: string
  type: string
  // Ranking metadata
  wins?: number // Legacy field, keeping for backward compatibility
  rankPosition?: number // Current position in ranking (1 = best, higher = worse)
  isNewCoaster?: boolean // Flag to track newly added coasters
  originalRankPosition?: number // Position in original upload order (for pre-ranked data)
  isPreRanked?: boolean // Whether this coaster came from pre-ranked data
}

export interface RankingMetadata {
  completedComparisons: Set<string> // Set of "id1-id2" strings representing completed comparisons
  totalWins: Map<string, number> // Legacy field for backward compatibility
  rankedCoasters: string[] // Array of coaster IDs in ranking order (best to worst)
  isRanked: boolean // Whether this dataset has been ranked
  hasPreRankedCoasters?: boolean // Whether any coasters in this dataset are pre-ranked
  preRankedGroups?: string[] // Array of upload IDs that were marked as pre-ranked
}

export interface UploadedData {
  coasters: Coaster[]
  uploadedAt: Date
  filename: string
  rankingMetadata?: RankingMetadata
}

export type DataContextType = {
  uploadedData: UploadedData | null
  setUploadedData: (data: UploadedData | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}
