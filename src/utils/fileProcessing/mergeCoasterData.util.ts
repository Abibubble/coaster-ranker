import { Coaster } from "../../types/data";

/**
 * Utility functions for merging coaster data when duplicates are detected.
 * Handles automatic merging of coasters with matching names and parks, preserving the most complete data.
 */

export function mergeCoasterData(
  existingCoaster: Coaster,
  newCoaster: Coaster,
): Coaster {
  const mergedCoaster: Coaster = { ...existingCoaster };

  const mergeableFields: (keyof Coaster)[] = [
    "manufacturer",
    "model",
    "material",
    "thrillLevel",
    "country",
  ];

  mergeableFields.forEach((field) => {
    if (!mergedCoaster[field] && newCoaster[field]) {
      switch (field) {
        case "manufacturer":
          mergedCoaster.manufacturer = newCoaster.manufacturer;
          break;
        case "model":
          mergedCoaster.model = newCoaster.model;
          break;
        case "material":
          mergedCoaster.material = newCoaster.material;
          break;
        case "thrillLevel":
          mergedCoaster.thrillLevel = newCoaster.thrillLevel;
          break;
        case "country":
          mergedCoaster.country = newCoaster.country;
          break;
      }
    }
  });

  return mergedCoaster;
}

export function shouldAutoMerge(
  existingCoaster: Coaster,
  newCoaster: Coaster,
): boolean {
  const existingName = existingCoaster.name?.toLowerCase().trim();
  const newName = newCoaster.name?.toLowerCase().trim();
  const existingPark = existingCoaster.park?.toLowerCase().trim();
  const newPark = newCoaster.park?.toLowerCase().trim();

  return !!(
    existingName &&
    newName &&
    existingPark &&
    newPark &&
    existingName === newName &&
    existingPark === newPark
  );
}

export function getMergedFields(
  existingCoaster: Coaster,
  newCoaster: Coaster,
): string[] {
  const mergeableFields: (keyof Coaster)[] = [
    "manufacturer",
    "model",
    "material",
    "thrillLevel",
    "country",
  ];

  const mergedFields: string[] = [];

  mergeableFields.forEach((field) => {
    if (!existingCoaster[field] && newCoaster[field]) {
      mergedFields.push(field);
    }
  });

  return mergedFields;
}
