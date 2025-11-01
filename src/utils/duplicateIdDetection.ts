import { Coaster } from '../types/data'

/**
 * Detect and fix duplicate IDs in coaster data
 * This ensures all coasters have unique IDs to prevent comparison errors
 */
export const detectAndFixDuplicateIds = (coasters: Coaster[]): Coaster[] => {
  const seenIds = new Set<string>()
  const duplicateGroups = new Map<string, Coaster[]>()

  // First pass: identify duplicates
  coasters.forEach(coaster => {
    if (seenIds.has(coaster.id)) {
      if (!duplicateGroups.has(coaster.id)) {
        // Find the first coaster with this ID
        const firstCoaster = coasters.find(c => c.id === coaster.id)
        if (firstCoaster) {
          duplicateGroups.set(coaster.id, [firstCoaster])
        }
      }
      duplicateGroups.get(coaster.id)?.push(coaster)
    } else {
      seenIds.add(coaster.id)
    }
  })

  // If no duplicates found, return original data
  if (duplicateGroups.size === 0) {
    return coasters
  }

  console.warn(
    `Found ${duplicateGroups.size} duplicate ID groups:`,
    Array.from(duplicateGroups.entries())
      .map(([id, dupes]) => `ID "${id}": ${dupes.map(c => c.name).join(', ')}`)
      .join('; ')
  )

  // Second pass: fix duplicates by reassigning IDs
  let nextAvailableId = 1
  const fixedCoasters = coasters.map(coaster => {
    // Check if this coaster is part of a duplicate group
    const duplicateGroup = duplicateGroups.get(coaster.id)
    if (duplicateGroup && duplicateGroup.length > 1) {
      // Find this coaster's position in the duplicate group
      const duplicateIndex = duplicateGroup.findIndex(
        c =>
          c.name === coaster.name &&
          c.park === coaster.park &&
          c.manufacturer === coaster.manufacturer
      )

      // If this is not the first occurrence, assign a new ID
      if (duplicateIndex > 0) {
        // Find the next available ID
        while (seenIds.has(nextAvailableId.toString().padStart(3, '0'))) {
          nextAvailableId++
        }

        const newId = nextAvailableId.toString().padStart(3, '0')
        seenIds.add(newId)
        nextAvailableId++

        console.warn(
          `Reassigning ID for duplicate coaster: "${coaster.name}" at ${coaster.park} from "${coaster.id}" to "${newId}"`
        )

        return {
          ...coaster,
          id: newId,
        }
      }
    }

    return coaster
  })

  return fixedCoasters
}

/**
 * Validate that all coasters have unique IDs
 * Throws an error if duplicates are found
 */
export const validateUniqueIds = (coasters: Coaster[]): void => {
  const seenIds = new Set<string>()
  const duplicates: string[] = []

  coasters.forEach(coaster => {
    if (seenIds.has(coaster.id)) {
      duplicates.push(coaster.id)
    } else {
      seenIds.add(coaster.id)
    }
  })

  if (duplicates.length > 0) {
    throw new Error(`Duplicate coaster IDs found: ${duplicates.join(', ')}`)
  }
}
