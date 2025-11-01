import { Coaster } from '../../types/data'
import { updateRankingPositions } from './rankingUtils'

/**
 * Build a complete ranking from comparison results using a topological sort approach
 * This is used for "full" ranking strategy where all comparisons are made
 */
export const buildRankingFromComparisons = (
  coasters: Coaster[],
  comparisonResults: Map<string, string>
): string[] => {
  console.log('🔄 BUILDING FULL RANKING from comparison results...')

  // Create adjacency list representing "beats" relationships
  const beats = new Map<string, Set<string>>()
  const beaten = new Map<string, Set<string>>()

  // Initialize maps
  coasters.forEach(coaster => {
    beats.set(coaster.id, new Set())
    beaten.set(coaster.id, new Set())
  })

  // Process comparison results
  comparisonResults.forEach((winnerId, comparisonKey) => {
    const [id1, id2] = comparisonKey.split('-')
    const loserId = winnerId === id1 ? id2 : id1

    console.log(`  ${winnerId} beats ${loserId}`)

    beats.get(winnerId)?.add(loserId)
    beaten.get(loserId)?.add(winnerId)
  })

  // Count how many coasters each coaster beats
  const beatCounts = new Map<string, number>()
  coasters.forEach(coaster => {
    beatCounts.set(coaster.id, beats.get(coaster.id)?.size || 0)
  })

  console.log('Beat counts:', Object.fromEntries(beatCounts))

  // Sort by number of wins (descending), then by coaster name for consistency
  const ranking = coasters
    .slice()
    .sort((a, b) => {
      const aWins = beatCounts.get(a.id) || 0
      const bWins = beatCounts.get(b.id) || 0

      if (aWins !== bWins) {
        return bWins - aWins // More wins = higher rank (lower position number)
      }

      // Tie-breaker: alphabetical by name
      return a.name.localeCompare(b.name)
    })
    .map(coaster => coaster.id)

  console.log(
    'Final ranking order:',
    ranking.map(id => {
      const coaster = coasters.find(c => c.id === id)
      return `${coaster?.name} (${beatCounts.get(id)} wins)`
    })
  )

  return ranking
}

/**
 * Update ranking using the appropriate algorithm based on strategy
 */
export const updateRankingByStrategy = (
  strategy: 'full' | 'positional',
  currentRanking: string[],
  winnerId: string,
  loserId: string,
  coasters: Coaster[],
  comparisonResults: Map<string, string>
): string[] => {
  if (strategy === 'full') {
    // For full ranking, rebuild the entire ranking from all comparison results
    return buildRankingFromComparisons(coasters, comparisonResults)
  } else {
    // For positional ranking, use sequential insertion
    return updateRankingPositions(currentRanking, winnerId, loserId)
  }
}
