import { Coaster, UploadedData } from "../../types/data";

/**
 * Utility functions for cleaning and preparing coaster data for export.
 * Removes sensitive fields, adds ranking information, and formats data for download.
 */

export interface CoasterWithRank extends Omit<
  Partial<Coaster>,
  "rankPosition" | "id"
> {
  rank?: number;
  name: string;
  park: string;
  country: string;
  manufacturer: string;
  model?: string;
  material?: string;
  thrillLevel?: string;
}

export function cleanCoasterData(coasters: Coaster[]): Partial<Coaster>[] {
  return coasters.map((coaster) => {
    const cleanCoaster: Partial<Coaster> = {
      name: coaster.name,
      park: coaster.park,
      country: coaster.country,
      manufacturer: coaster.manufacturer,
      model: coaster.model,
      material: coaster.material,
      thrillLevel: coaster.thrillLevel,
    };

    if (coaster.isCurrentlyRanking !== undefined) {
      cleanCoaster.isCurrentlyRanking = coaster.isCurrentlyRanking;
    }
    if (coaster.isNewCoaster !== undefined) {
      cleanCoaster.isNewCoaster = coaster.isNewCoaster;
    }
    if (coaster.isPreRanked !== undefined) {
      cleanCoaster.isPreRanked = coaster.isPreRanked;
    }
    if (coaster.originalRankPosition !== undefined) {
      cleanCoaster.originalRankPosition = coaster.originalRankPosition;
    }
    if (coaster.rankPosition !== undefined) {
      cleanCoaster.rankPosition = coaster.rankPosition;
    }

    return cleanCoaster;
  });
}

export function cleanCoasterDataForExport(
  coasters: Coaster[],
): Partial<Coaster>[] {
  return coasters.map((coaster) => ({
    name: coaster.name,
    park: coaster.park,
    country: coaster.country,
    manufacturer: coaster.manufacturer,
    model: coaster.model,
    material: coaster.material,
    thrillLevel: coaster.thrillLevel,
  }));
}

export function addRankingToCoasterData(
  coasters: Coaster[],
  rankingMetadata?: { rankedCoasters?: string[]; isRanked?: boolean },
): CoasterWithRank[] {
  return coasters.map((coaster) => {
    const baseCoaster: CoasterWithRank = {
      name: coaster.name,
      park: coaster.park,
      country: coaster.country,
      manufacturer: coaster.manufacturer,
      model: coaster.model,
      material: coaster.material,
      thrillLevel: coaster.thrillLevel,
    };

    if (coaster.rankPosition !== undefined && coaster.rankPosition > 0) {
      baseCoaster.rank = coaster.rankPosition;
    } else if (rankingMetadata?.isRanked && rankingMetadata?.rankedCoasters) {
      const position = rankingMetadata.rankedCoasters.indexOf(coaster.id);
      if (position >= 0) {
        baseCoaster.rank = position + 1;
      }
    }

    if (baseCoaster.rank !== undefined) {
      const { rank, ...rest } = baseCoaster;
      return { rank, ...rest };
    }

    return baseCoaster;
  });
}

export function hasRankingDataForExport(
  uploadedData: UploadedData | null,
): boolean {
  if (!uploadedData) {
    return false;
  }

  const hasCoasterRankings = uploadedData.coasters.some(
    (c) => c.rankPosition !== undefined && c.rankPosition > 0,
  );

  const hasRankingMetadata = uploadedData.rankingMetadata?.isRanked === true;

  return hasCoasterRankings || hasRankingMetadata;
}
