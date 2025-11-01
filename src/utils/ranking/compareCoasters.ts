import { Coaster, UploadedData } from '../../types/data'
import {
  generatePositionalComparisons,
  getComparisonKey,
  getCoastersWithPositions,
  insertCoasterIntoRanking,
  isCoasterReadyForInsertion,
} from './rankingUtils'
import { updateRankingByStrategy } from './fullRanking'

export interface CompareCoastersParams {
  coasterA: Coaster
  coasterB: Coaster
  chosenWinner: Coaster
  uploadedData: UploadedData
  comparisonResults: Map<string, string>
  remainingComparisons: [Coaster, Coaster][]
  comparisonCount: number
}

export interface CompareCoastersResult {
  updatedData: UploadedData
  updatedComparisonResults: Map<string, string>
  nextComparisons: [Coaster, Coaster][] | null
  isRankingComplete: boolean
  rankedCoasters: Coaster[]
  lastComparison: {
    pair: [Coaster, Coaster]
    chosenCoaster: Coaster
    comparisonKey: string
  }
}

/**
 * Compare two coasters and return the winner along with updated ranking state
 * This function handles the core comparison logic including position updates,
 * sequential insertion, and ranking completion detection
 */
export function compareCoasters(
  params: CompareCoastersParams
): CompareCoastersResult {
  const {
    coasterA,
    coasterB,
    chosenWinner,
    uploadedData,
    comparisonResults,
    remainingComparisons,
  } = params

  const currentPair: [Coaster, Coaster] = [coasterA, coasterB]
  const comparisonKey = getComparisonKey(coasterA, coasterB)

  const lastComparison = {
    pair: currentPair,
    chosenCoaster: chosenWinner,
    comparisonKey,
  }

  const winner = chosenWinner
  const loser = currentPair.find(c => c.id !== chosenWinner.id)!

  const updatedComparisonResults = new Map(comparisonResults)
  updatedComparisonResults.set(comparisonKey, winner.id)

  let newComparisons: [Coaster, Coaster][] | null = null
  let rankedCoasters: Coaster[] = []

  // Position-based ranking update
  if (uploadedData.rankingMetadata?.rankedCoasters) {
    // Always use positional strategy for normal ranking workflows
    // Full strategy should only be used for validation/reconstruction scenarios
    const strategy = 'positional'

    const updatedRankedCoasters = updateRankingByStrategy(
      strategy,
      uploadedData.rankingMetadata.rankedCoasters,
      winner.id,
      loser.id,
      uploadedData.coasters,
      updatedComparisonResults
    )

    const coasterNames: Record<string, string> = {}
    uploadedData.coasters.forEach(c => {
      coasterNames[c.id] = `${c.name} (${c.park})`
    })

    const currentCompletedComparisons =
      uploadedData.rankingMetadata?.completedComparisons || new Set<string>()
    const updatedCompletedComparisons = new Set(currentCompletedComparisons)
    updatedCompletedComparisons.add(comparisonKey)

    // Sequential insertion logic: check if current coaster is ready for positioning
    const currentRankingCoaster = uploadedData.coasters.find(
      c => c.isCurrentlyRanking
    )

    let finalRankedCoasters = updatedRankedCoasters
    let updatedCoasters = uploadedData.coasters

    if (
      currentRankingCoaster &&
      (winner.id === currentRankingCoaster.id ||
        loser.id === currentRankingCoaster.id)
    ) {
      if (
        isCoasterReadyForInsertion(
          currentRankingCoaster,
          updatedRankedCoasters,
          updatedComparisonResults,
          updatedCoasters
        )
      ) {
        const insertResult = insertCoasterIntoRanking(
          currentRankingCoaster,
          updatedRankedCoasters,
          updatedComparisonResults,
          updatedCoasters
        )

        finalRankedCoasters = insertResult.newRanking

        // Update coaster states
        const unrankedCoasters = uploadedData.coasters.filter(
          c =>
            !c.isPreRanked &&
            !finalRankedCoasters.includes(c.id) &&
            c.id !== currentRankingCoaster.id
        )

        // Only move to next coaster when current coaster has been properly positioned
        // Check if current coaster needs more comparisons for proper binary search
        const alreadyRanked = finalRankedCoasters
          .map(id => uploadedData.coasters.find(c => c.id === id))
          .filter(c => c !== undefined) as Coaster[]

        // Simple check: has this coaster been compared to enough ranked coasters?
        // For true binary search, we need log2(n) comparisons where n is number of ranked coasters
        const minComparisonsNeeded =
          alreadyRanked.length > 0
            ? Math.ceil(Math.log2(alreadyRanked.length + 1))
            : 0
        const actualComparisons = alreadyRanked.filter(rankedCoaster => {
          const comparisonKey =
            currentRankingCoaster.id < rankedCoaster.id
              ? `${currentRankingCoaster.id}-${rankedCoaster.id}`
              : `${rankedCoaster.id}-${currentRankingCoaster.id}`
          return updatedComparisonResults.has(comparisonKey)
        }).length

        const hasEnoughComparisons =
          actualComparisons >= minComparisonsNeeded ||
          alreadyRanked.length === 0

        updatedCoasters = uploadedData.coasters.map(coaster => {
          if (coaster.id === currentRankingCoaster.id) {
            // Only complete ranking if we have enough comparisons
            return {
              ...coaster,
              isCurrentlyRanking: !hasEnoughComparisons,
              rankPosition: hasEnoughComparisons
                ? finalRankedCoasters.indexOf(coaster.id) + 1
                : undefined,
            }
          } else if (coaster.isCurrentlyRanking) {
            return { ...coaster, isCurrentlyRanking: false }
          } else if (
            hasEnoughComparisons && // Only start next coaster if current one is done
            unrankedCoasters.length > 0 &&
            coaster.id === unrankedCoasters[0].id &&
            !finalRankedCoasters.includes(coaster.id) // Don't mark as ranking if already ranked
          ) {
            return { ...coaster, isCurrentlyRanking: true }
          } else if (finalRankedCoasters.includes(coaster.id)) {
            return {
              ...coaster,
              rankPosition: finalRankedCoasters.indexOf(coaster.id) + 1,
            }
          }
          return coaster
        })

        newComparisons = generatePositionalComparisons(
          updatedCoasters,
          finalRankedCoasters,
          updatedCompletedComparisons,
          updatedComparisonResults
        )

        if (unrankedCoasters.length === 0) {
          // All coasters ranked - complete the ranking
          const sortedForDisplay = updatedCoasters.sort(
            (a, b) => (a.rankPosition || 0) - (b.rankPosition || 0)
          )

          const finalUploadedData = {
            ...uploadedData,
            coasters: updatedCoasters.map(coaster => ({
              ...coaster,
              isCurrentlyRanking: false,
              isNewCoaster: false,
            })),
            rankingMetadata: {
              ...uploadedData.rankingMetadata,
              completedComparisons: updatedCompletedComparisons,
              rankedCoasters: finalRankedCoasters,
              isRanked: true,
            },
          }

          return {
            updatedData: finalUploadedData,
            updatedComparisonResults,
            nextComparisons: [],
            isRankingComplete: true,
            rankedCoasters: sortedForDisplay,
            lastComparison,
          }
        }
      } else {
        // Coaster not ready for insertion, need more comparisons
        newComparisons = generatePositionalComparisons(
          updatedCoasters,
          finalRankedCoasters,
          updatedCompletedComparisons,
          updatedComparisonResults
        )
      }
    } else {
      // No current ranking coaster, need to generate next comparisons
      newComparisons = generatePositionalComparisons(
        updatedCoasters,
        finalRankedCoasters,
        updatedCompletedComparisons,
        updatedComparisonResults
      )
    }

    const progressData = {
      ...uploadedData,
      coasters: updatedCoasters,
      rankingMetadata: {
        ...uploadedData.rankingMetadata,
        completedComparisons: updatedCompletedComparisons,
        rankedCoasters: finalRankedCoasters,
        isRanked: false,
      },
    }

    // Determine next comparisons
    let nextComparisons: [Coaster, Coaster][]

    // Use new comparisons from sequential insertion if available
    if (newComparisons && newComparisons.length > 0) {
      nextComparisons = newComparisons
    } else {
      nextComparisons = remainingComparisons.slice(1)
    }

    if (nextComparisons.length === 0) {
      // Ranking complete
      if (progressData.rankingMetadata?.rankedCoasters) {
        const finalRankedCoasters = getCoastersWithPositions(
          progressData.coasters,
          progressData.rankingMetadata.rankedCoasters
        )

        const sortedForDisplay = finalRankedCoasters.sort(
          (a, b) => (a.rankPosition || 0) - (b.rankPosition || 0)
        )

        rankedCoasters = sortedForDisplay
      }

      // Set final completion data
      const finalCoasters = getCoastersWithPositions(
        uploadedData.coasters,
        uploadedData.rankingMetadata?.rankedCoasters || []
      )
      const sortedFinalCoasters = finalCoasters.sort(
        (a, b) => (a.rankPosition || 0) - (b.rankPosition || 0)
      )

      const finalRankingMetadata = {
        completedComparisons: new Set<string>(),
        rankedCoasters: uploadedData.rankingMetadata?.rankedCoasters || [],
        isRanked: true,
      }

      const finalData = {
        ...uploadedData,
        coasters: sortedFinalCoasters,
        rankingMetadata: finalRankingMetadata,
      }

      return {
        updatedData: finalData,
        updatedComparisonResults,
        nextComparisons: [],
        isRankingComplete: true,
        rankedCoasters,
        lastComparison,
      }
    }

    return {
      updatedData: progressData,
      updatedComparisonResults,
      nextComparisons,
      isRankingComplete: false,
      rankedCoasters: [],
      lastComparison,
    }
  }

  // Fallback if no ranking metadata (shouldn't happen in normal flow)
  return {
    updatedData: uploadedData,
    updatedComparisonResults,
    nextComparisons: remainingComparisons.slice(1),
    isRankingComplete: false,
    rankedCoasters: [],
    lastComparison,
  }
}
