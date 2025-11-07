import { Coaster } from '../../types/data'
import {
  cleanCoasterDataForExport,
  addRankingToCoasterData,
  CoasterWithRank,
} from './cleanCoasterData'

export interface GenerateCSVParams {
  coasters: Coaster[]
  headers?: string[]
  includeRanking?: boolean // New option to include rank field
  rankingMetadata?: { rankedCoasters?: string[]; isRanked?: boolean } // Ranking metadata for fallback
}

export interface GenerateCSVResult {
  content: string
  isEmpty: boolean
  rowCount: number
}

/**
 * Generate CSV content from coaster data with proper escaping
 * Handles commas, quotes, and newlines in field values
 */
export function generateCSV(params: GenerateCSVParams): GenerateCSVResult {
  const { coasters, headers, includeRanking = false, rankingMetadata } = params

  if (coasters.length === 0) {
    return {
      content: '',
      isEmpty: true,
      rowCount: 0,
    }
  }

  // Clean the coaster data and optionally add ranking information
  let processedCoasters: Partial<Coaster>[] | CoasterWithRank[]

  if (includeRanking) {
    processedCoasters = addRankingToCoasterData(coasters, rankingMetadata)
  } else {
    processedCoasters = cleanCoasterDataForExport(coasters)
  }

  // Use provided headers or default coaster properties (include rank if needed)
  const csvHeaders =
    headers ||
    (includeRanking
      ? [
          'rank',
          'name',
          'park',
          'country',
          'manufacturer',
          'model',
          'material',
          'thrillLevel',
        ]
      : [
          'name',
          'park',
          'country',
          'manufacturer',
          'model',
          'material',
          'thrillLevel',
        ])

  // Create CSV content with proper escaping
  const csvHeaderRow = csvHeaders.join(',')
  const csvRows = processedCoasters.map(coaster => {
    return csvHeaders
      .map(header => {
        const value = coaster[header as keyof (Coaster | CoasterWithRank)]
        if (value === undefined || value === null) return ''

        // Escape commas, quotes, and newlines in values
        const stringValue = String(value)
        if (
          stringValue.includes(',') ||
          stringValue.includes('"') ||
          stringValue.includes('\n')
        ) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      })
      .join(',')
  })

  const content = [csvHeaderRow, ...csvRows].join('\n')

  return {
    content,
    isEmpty: false,
    rowCount: coasters.length,
  }
}
