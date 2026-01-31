import { Coaster } from "../../types/data";
import {
  cleanCoasterData,
  addRankingToCoasterData,
  CoasterWithRank,
} from "./cleanCoasterData.util";

/**
 * Utility functions for generating JSON exports from coaster ranking data.
 * Converts complete ranking data into downloadable JSON format preserving all metadata.
 */

export interface GenerateJSONParams {
  coasters: Coaster[];
  includeMetadata?: boolean;
  includeRanking?: boolean;
  rankingMetadata?: { rankedCoasters?: string[]; isRanked?: boolean };
  customMetadata?: Record<string, unknown>;
}

export interface GenerateJSONResult {
  content: string;
  isEmpty: boolean;
  dataSize: number;
}

export interface JSONExportFormat {
  coasters: Partial<Coaster>[] | CoasterWithRank[];
  exportedAt: string;
  totalCount: number;
  source: string;
  [key: string]: unknown;
}

export function generateJSON(params: GenerateJSONParams): GenerateJSONResult {
  const {
    coasters,
    includeMetadata = true,
    includeRanking = false,
    rankingMetadata,
    customMetadata = {},
  } = params;

  if (coasters.length === 0) {
    return {
      content: '{"coasters": [], "totalCount": 0}',
      isEmpty: true,
      dataSize: 0,
    };
  }

  let processedCoasters: Partial<Coaster>[] | CoasterWithRank[];

  if (includeRanking) {
    processedCoasters = addRankingToCoasterData(coasters, rankingMetadata);
  } else {
    processedCoasters = cleanCoasterData(coasters);
  }

  let exportData: JSONExportFormat | (Partial<Coaster>[] | CoasterWithRank[]);

  if (includeMetadata) {
    exportData = {
      coasters: processedCoasters,
      exportedAt: new Date().toISOString(),
      totalCount: processedCoasters.length,
      source: "Coaster Ranker",
      ...customMetadata,
    };
  } else {
    exportData = processedCoasters;
  }

  const content = JSON.stringify(exportData, null, 2);

  return {
    content,
    isEmpty: false,
    dataSize: coasters.length,
  };
}
