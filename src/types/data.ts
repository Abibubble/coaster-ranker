export interface Coaster {
  id: string
  name: string
  park: string
  country?: string
  manufacturer: string
  model: string
  type: string
  location?: string
  height?: number
  speed?: number
  inversions?: number
  year?: number
  // Ranking metadata
  wins?: number
  isNewCoaster?: boolean // Flag to track newly added coasters
}

export interface RankingMetadata {
  completedComparisons: Set<string> // Set of "id1-id2" strings representing completed comparisons
  totalWins: Map<string, number> // Map of coaster ID to total wins
  isRanked: boolean // Whether this dataset has been ranked
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
