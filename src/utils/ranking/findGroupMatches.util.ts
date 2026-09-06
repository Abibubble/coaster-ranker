import { Coaster } from "../../types/data";

/**
 * The "compare within a group first" shortcut is only offered once a coaster
 * has more than this many already-ranked coasters sharing its model and
 * manufacturer (issue #3).
 */
export const MIN_GROUP_MATCHES_FOR_SHORTCUT = 4;

/**
 * Finds already-ranked coasters that share the same model and manufacturer
 * as the given coaster (e.g. other B&M Wing Coasters). Coasters missing
 * either field (dark rides never have a model) never match.
 */
export function findGroupMatches(
  coaster: Coaster,
  rankedCoasters: Coaster[],
): Coaster[] {
  const model = coaster.model?.toLowerCase().trim();
  const manufacturer = coaster.manufacturer?.toLowerCase().trim();

  if (!model || !manufacturer) {
    return [];
  }

  return rankedCoasters.filter(
    (candidate) =>
      candidate.id !== coaster.id &&
      candidate.model?.toLowerCase().trim() === model &&
      candidate.manufacturer.toLowerCase().trim() === manufacturer,
  );
}
