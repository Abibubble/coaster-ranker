import { Coaster } from '../types/data'

export interface DuplicateMatch {
  existingCoaster: Coaster
  newCoaster: Coaster
  matchingFields: string[]
  matchCount: number
}

export interface DuplicateCheckResult {
  hasDuplicates: boolean
  duplicates: DuplicateMatch[]
}

/**
 * Checks if two coasters are potential duplicates based on matching fields
 * Returns the matching fields and count
 */
export function checkCoasterSimilarity(
  existing: Coaster,
  newCoaster: Coaster
): { matchingFields: string[]; matchCount: number } {
  const fieldsToCheck = ['name', 'park', 'manufacturer', 'model'] as const
  const matchingFields: string[] = []

  fieldsToCheck.forEach(field => {
    const existingValue = existing[field]?.toLowerCase().trim()
    const newValue = newCoaster[field]?.toLowerCase().trim()

    if (existingValue && newValue && existingValue === newValue) {
      matchingFields.push(field)
    }
  })

  return {
    matchingFields,
    matchCount: matchingFields.length,
  }
}

/**
 * Detects potential duplicate coasters in a list of new coasters
 * against existing coasters
 */
export function detectDuplicates(
  existingCoasters: Coaster[],
  newCoasters: Coaster[]
): DuplicateCheckResult {
  const duplicates: DuplicateMatch[] = []

  newCoasters.forEach(newCoaster => {
    existingCoasters.forEach(existingCoaster => {
      const similarity = checkCoasterSimilarity(existingCoaster, newCoaster)

      // Consider it a potential duplicate if at least 3 fields match
      if (similarity.matchCount >= 3) {
        duplicates.push({
          existingCoaster,
          newCoaster,
          matchingFields: similarity.matchingFields,
          matchCount: similarity.matchCount,
        })
      }
    })
  })

  return {
    hasDuplicates: duplicates.length > 0,
    duplicates,
  }
}

/**
 * Formats the matching fields for display
 */
export function formatMatchingFields(matchingFields: string[]): string {
  const formatted = matchingFields.map(field => {
    switch (field) {
      case 'name':
        return 'Name'
      case 'park':
        return 'Park'
      case 'manufacturer':
        return 'Manufacturer'
      case 'model':
        return 'Model'
      default:
        return field
    }
  })

  if (formatted.length === 1) {
    return formatted[0]
  } else if (formatted.length === 2) {
    return `${formatted[0]} and ${formatted[1]}`
  } else {
    return `${formatted.slice(0, -1).join(', ')}, and ${
      formatted[formatted.length - 1]
    }`
  }
}
