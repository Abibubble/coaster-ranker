export interface ManufacturerAliasEntry {
  manufacturer: string;
  alternateNames?: string[];
}

const normalizeManufacturerName = (name: string): string =>
  name.trim().toLowerCase();

/**
 * Builds a lookup from every known name (a manufacturer's primary name and
 * all of its alternateNames) to that manufacturer's primary name, so any of
 * those names can be resolved to the same group.
 */
export const buildManufacturerAliasMap = (
  manufacturers: ManufacturerAliasEntry[],
): Map<string, string> => {
  const aliasMap = new Map<string, string>();

  for (const entry of manufacturers) {
    const canonicalName = entry.manufacturer;
    aliasMap.set(normalizeManufacturerName(canonicalName), canonicalName);

    for (const alternateName of entry.alternateNames ?? []) {
      aliasMap.set(normalizeManufacturerName(alternateName), canonicalName);
    }
  }

  return aliasMap;
};

/**
 * Resolves a manufacturer name (primary or alternate) to its canonical
 * group name, so coasters recorded under an alternate name (e.g. "Arrow
 * Development") are grouped with others recorded under the primary name
 * (e.g. "Arrow Dynamics"). Falls back to the original name unchanged when
 * it isn't found in the alias map.
 */
export const resolveManufacturerGroup = (
  name: string,
  aliasMap: Map<string, string>,
): string => aliasMap.get(normalizeManufacturerName(name)) ?? name;

/**
 * Given the raw manufacturer names actually present in a person's data,
 * finds the other names (besides `selectedName` itself) that belong to the
 * same manufacturer group as `selectedName` - e.g. selecting "Arrow
 * Development" while the data also has coasters recorded as "Arrow
 * Dynamics" returns ["Arrow Dynamics"]. Used to let the UI explain why a
 * manufacturer filter surfaced rides recorded under a different name.
 */
export const getOtherNamesInManufacturerGroup = (
  rawManufacturerNames: string[],
  selectedName: string,
  aliasMap: Map<string, string>,
): string[] => {
  const selectedGroup = resolveManufacturerGroup(selectedName, aliasMap);
  const normalizedSelectedName = normalizeManufacturerName(selectedName);

  const otherNames = rawManufacturerNames.filter(
    (name) =>
      normalizeManufacturerName(name) !== normalizedSelectedName &&
      resolveManufacturerGroup(name, aliasMap) === selectedGroup,
  );

  return [...new Set(otherNames)].sort();
};
