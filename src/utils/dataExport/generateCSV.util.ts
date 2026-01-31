import { Coaster } from "../../types/data";
import {
  cleanCoasterDataForExport,
  addRankingToCoasterData,
  CoasterWithRank,
} from "./cleanCoasterData.util";

/**
 * Utility functions for generating CSV exports from coaster ranking data.
 * Converts ranked coaster data into downloadable CSV format with proper formatting.
 */

export interface GenerateCSVParams {
  coasters: Coaster[];
  headers?: string[];
  includeRanking?: boolean;
  rankingMetadata?: { rankedCoasters?: string[]; isRanked?: boolean };
}

export interface GenerateCSVResult {
  content: string;
  isEmpty: boolean;
  rowCount: number;
}

export function generateCSV(params: GenerateCSVParams): GenerateCSVResult {
  const { coasters, headers, includeRanking = false, rankingMetadata } = params;

  if (coasters.length === 0) {
    return {
      content: "",
      isEmpty: true,
      rowCount: 0,
    };
  }

  let processedCoasters: Partial<Coaster>[] | CoasterWithRank[];

  if (includeRanking) {
    processedCoasters = addRankingToCoasterData(coasters, rankingMetadata);
  } else {
    processedCoasters = cleanCoasterDataForExport(coasters);
  }

  const csvHeaders =
    headers ||
    (includeRanking
      ? [
          "rank",
          "name",
          "park",
          "country",
          "manufacturer",
          "model",
          "material",
          "thrillLevel",
        ]
      : [
          "name",
          "park",
          "country",
          "manufacturer",
          "model",
          "material",
          "thrillLevel",
        ]);

  const csvHeaderRow = csvHeaders.join(",");
  const csvRows = processedCoasters.map((coaster) => {
    return csvHeaders
      .map((header) => {
        const value = coaster[header as keyof (Coaster | CoasterWithRank)];
        if (value === undefined || value === null) return "";

        const stringValue = String(value);
        if (
          stringValue.includes(",") ||
          stringValue.includes('"') ||
          stringValue.includes("\n")
        ) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      })
      .join(",");
  });

  const content = [csvHeaderRow, ...csvRows].join("\n");

  return {
    content,
    isEmpty: false,
    rowCount: coasters.length,
  };
}
