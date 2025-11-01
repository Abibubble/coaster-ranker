import { Coaster } from '../../types/data'
import {
  cleanCoasterData,
  addRankingToCoasterData,
  CoasterWithRank,
} from './cleanCoasterData'

export interface GenerateJSONParams {
  coasters: Coaster[]
  includeMetadata?: boolean
  includeRanking?: boolean // New option to include rank field
  rankingMetadata?: { rankedCoasters?: string[]; isRanked?: boolean } // Ranking metadata for fallback
  customMetadata?: Record<string, unknown>
}

export interface GenerateJSONResult {
  content: string
  isEmpty: boolean
  dataSize: number
}

export interface JSONExportFormat {
  coasters: Coaster[] | CoasterWithRank[]
  exportedAt: string
  totalCount: number
  source: string
  [key: string]: unknown
}

/**
 * Generate JSON content from coaster data with optional metadata
 * Creates a structured JSON export with timestamps and metadata
 */
export function generateJSON(params: GenerateJSONParams): GenerateJSONResult {
  const {
    coasters,
    includeMetadata = true,
    includeRanking = false,
    rankingMetadata,
    customMetadata = {},
  } = params

  if (coasters.length === 0) {
    return {
      content: '{"coasters": [], "totalCount": 0}',
      isEmpty: true,
      dataSize: 0,
    }
  }

  // Clean the coaster data and optionally add ranking information
  let processedCoasters: Coaster[] | CoasterWithRank[]

  if (includeRanking) {
    processedCoasters = addRankingToCoasterData(coasters, rankingMetadata)
  } else {
    processedCoasters = cleanCoasterData(coasters)
  }

  let exportData: JSONExportFormat | (Coaster[] | CoasterWithRank[])

  if (includeMetadata) {
    exportData = {
      coasters: processedCoasters,
      exportedAt: new Date().toISOString(),
      totalCount: processedCoasters.length,
      source: 'Coaster Ranker',
      ...customMetadata,
    }
  } else {
    exportData = processedCoasters
  }

  const content = JSON.stringify(exportData, null, 2)

  return {
    content,
    isEmpty: false,
    dataSize: coasters.length,
  }
}
