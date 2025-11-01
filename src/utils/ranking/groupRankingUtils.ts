import { Coaster } from '../../types/data'

export interface CoasterGroup {
  name: string
  coasters: Coaster[]
  isRanked: boolean
}

export type GroupByType = 'park' | 'model'

export interface CreateCoasterGroupsParams {
  coasters: Coaster[]
  groupBy: GroupByType
}

export interface CreateCoasterGroupsResult {
  groups: Map<string, CoasterGroup>
  groupNames: string[]
  hasMultipleCoasterGroups: boolean
}

/**
 * Create coaster groups based on grouping criteria (park or manufacturer/model)
 * Returns organized groups and metadata about the grouping
 */
export function createCoasterGroups(
  params: CreateCoasterGroupsParams
): CreateCoasterGroupsResult {
  const { coasters, groupBy } = params

  const groups = new Map<string, CoasterGroup>()

  coasters.forEach(coaster => {
    const groupKey =
      groupBy === 'park'
        ? coaster.park
        : `${coaster.manufacturer} ${coaster.model}`

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        name: groupKey,
        coasters: [],
        isRanked: false,
      })
    }

    groups.get(groupKey)!.coasters.push(coaster)
  })

  const groupNames = Array.from(groups.keys())

  // Check if any groups have multiple coasters (need ranking)
  const hasMultipleCoasterGroups = Array.from(groups.values()).some(
    group => group.coasters.length > 1
  )

  return {
    groups,
    groupNames,
    hasMultipleCoasterGroups,
  }
}

/**
 * Calculate total remaining comparisons across all unranked groups
 * Uses the formula n*(n-1)/2 for each group with multiple coasters
 */
export function calculateGroupComparisons(
  groups: Map<string, CoasterGroup>
): number {
  let totalComparisons = 0

  groups.forEach(group => {
    if (!group.isRanked && group.coasters.length > 1) {
      const n = group.coasters.length
      totalComparisons += (n * (n - 1)) / 2
    }
  })

  return totalComparisons
}

/**
 * Find the next group that needs ranking
 * Returns the first group that is not ranked and has multiple coasters
 */
export function findNextGroupToRank(
  groups: Map<string, CoasterGroup>
): string | null {
  for (const [groupName, group] of groups.entries()) {
    if (!group.isRanked && group.coasters.length > 1) {
      return groupName
    }
  }
  return null
}

/**
 * Mark a group as ranked and update its coasters
 */
export function markGroupAsRanked(
  groups: Map<string, CoasterGroup>,
  groupName: string,
  rankedCoasters: Coaster[]
): Map<string, CoasterGroup> {
  const newGroups = new Map(groups)
  const group = newGroups.get(groupName)

  if (group) {
    group.isRanked = true
    group.coasters = rankedCoasters
    newGroups.set(groupName, group)
  }

  return newGroups
}

/**
 * Create final ranking by concatenating all group coasters in order
 */
export function finalizeGroupRanking(
  groupOrder: string[],
  groups: Map<string, CoasterGroup>
): Coaster[] {
  const finalRankedCoasters: Coaster[] = []

  groupOrder.forEach(groupName => {
    const group = groups.get(groupName)
    if (group) {
      finalRankedCoasters.push(...group.coasters)
    }
  })

  return finalRankedCoasters
}
