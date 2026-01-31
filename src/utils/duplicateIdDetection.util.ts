import { Coaster } from "../types/data";

/**
 * Utility functions for detecting and fixing duplicate IDs in coaster data.
 * Ensures all coasters have unique identifiers to prevent comparison errors during ranking.
 */

export const detectAndFixDuplicateIds = (coasters: Coaster[]): Coaster[] => {
  const seenIds = new Set<string>();
  const duplicateGroups = new Map<string, Coaster[]>();

  coasters.forEach((coaster) => {
    if (seenIds.has(coaster.id)) {
      if (!duplicateGroups.has(coaster.id)) {
        const firstCoaster = coasters.find((c) => c.id === coaster.id);
        if (firstCoaster) {
          duplicateGroups.set(coaster.id, [firstCoaster]);
        }
      }
      duplicateGroups.get(coaster.id)?.push(coaster);
    } else {
      seenIds.add(coaster.id);
    }
  });

  if (duplicateGroups.size === 0) {
    return coasters;
  }

  console.warn(
    `Found ${duplicateGroups.size} duplicate ID groups:`,
    Array.from(duplicateGroups.entries())
      .map(
        ([id, dupes]) => `ID "${id}": ${dupes.map((c) => c.name).join(", ")}`,
      )
      .join("; "),
  );

  let nextAvailableId = 1;
  const fixedCoasters = coasters.map((coaster) => {
    const duplicateGroup = duplicateGroups.get(coaster.id);
    if (duplicateGroup && duplicateGroup.length > 1) {
      const duplicateIndex = duplicateGroup.findIndex(
        (c) =>
          c.name === coaster.name &&
          c.park === coaster.park &&
          c.manufacturer === coaster.manufacturer,
      );

      if (duplicateIndex > 0) {
        while (seenIds.has(nextAvailableId.toString().padStart(3, "0"))) {
          nextAvailableId++;
        }

        const newId = nextAvailableId.toString().padStart(3, "0");
        seenIds.add(newId);
        nextAvailableId++;

        console.warn(
          `Reassigning ID for duplicate coaster: "${coaster.name}" at ${coaster.park} from "${coaster.id}" to "${newId}"`,
        );

        return {
          ...coaster,
          id: newId,
        };
      }
    }

    return coaster;
  });

  return fixedCoasters;
};

export const validateUniqueIds = (coasters: Coaster[]): void => {
  const seenIds = new Set<string>();
  const duplicates: string[] = [];

  coasters.forEach((coaster) => {
    if (seenIds.has(coaster.id)) {
      duplicates.push(coaster.id);
    } else {
      seenIds.add(coaster.id);
    }
  });

  if (duplicates.length > 0) {
    throw new Error(`Duplicate coaster IDs found: ${duplicates.join(", ")}`);
  }
};
