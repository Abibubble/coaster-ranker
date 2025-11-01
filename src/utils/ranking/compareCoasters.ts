import { Coaster, UploadedData } from '../../types/data'
import {
  calculateInsertionPosition,
  generatePositionalComparisons,
  getComparisonKey,
  getCoastersWithPositions,
  insertCoasterIntoRanking,
  isCoasterReadyForInsertion,
} from './rankingUtils'
import { updateRankingByStrategy } from './fullRanking'
import { rankingLogger } from './rankingLogger'

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
    comparisonCount,
  } = params

  const currentPair: [Coaster, Coaster] = [coasterA, coasterB]
  const newComparisonCount = comparisonCount + 1
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

  rankingLogger.logComparison(
    newComparisonCount,
    coasterA,
    coasterB,
    winner,
    loser,
    comparisonKey
  )

  // Position-based ranking update
  if (uploadedData.rankingMetadata?.rankedCoasters) {
    const oldRankedCoasters = uploadedData.rankingMetadata.rankedCoasters
    const oldWinnerPosition = oldRankedCoasters.indexOf(winner.id) + 1

    // Always use positional strategy for normal ranking workflows
    // Full strategy should only be used for validation/reconstruction scenarios
    const strategy = 'positional'

    console.log(`🎯 Using ${strategy} ranking strategy for this comparison`)

    const updatedRankedCoasters = updateRankingByStrategy(
      strategy,
      uploadedData.rankingMetadata.rankedCoasters,
      winner.id,
      loser.id,
      uploadedData.coasters,
      updatedComparisonResults
    )

    const newWinnerPosition = updatedRankedCoasters.indexOf(winner.id) + 1

    const coasterNames: Record<string, string> = {}
    uploadedData.coasters.forEach(c => {
      coasterNames[c.id] = `${c.name} (${c.park})`
    })

    rankingLogger.logPositionUpdate(
      winner,
      loser,
      oldWinnerPosition,
      newWinnerPosition,
      updatedRankedCoasters.indexOf(loser.id) + 1,
      updatedRankedCoasters,
      coasterNames
    )

    const currentCompletedComparisons =
      uploadedData.rankingMetadata?.completedComparisons || new Set<string>()
    const updatedCompletedComparisons = new Set(currentCompletedComparisons)
    updatedCompletedComparisons.add(comparisonKey)

    // Sequential insertion logic: check if current coaster is ready for positioning
    const currentRankingCoaster = uploadedData.coasters.find(
      c => c.isCurrentlyRanking
    )

    console.log('🔍 CURRENT RANKING COASTER CHECK:')
    console.log(
      'currentRankingCoaster found:',
      currentRankingCoaster ? currentRankingCoaster.name : 'NONE'
    )
    console.log('finalRankedCoasters count:', updatedRankedCoasters.length)
    console.log('Total coasters:', uploadedData.coasters.length)

    let updatedCoasters = uploadedData.coasters
    let finalRankedCoasters = updatedRankedCoasters

    if (
      currentRankingCoaster &&
      (winner.id === currentRankingCoaster.id ||
        loser.id === currentRankingCoaster.id)
    ) {
      console.log('🎯 BRANCH: Current ranking coaster involved in comparison')

      const rankedCoasterObjects = updatedRankedCoasters
        .map(id => uploadedData.coasters.find(c => c.id === id))
        .filter(c => c !== undefined && !c.isCurrentlyRanking) as Coaster[]

      if (
        isCoasterReadyForInsertion(
          currentRankingCoaster,
          rankedCoasterObjects,
          updatedComparisonResults
        )
      ) {
        console.log('🎯 SUB-BRANCH: Coaster ready for insertion')

        const insertPosition = calculateInsertionPosition(
          currentRankingCoaster,
          rankedCoasterObjects,
          updatedComparisonResults
        )

        finalRankedCoasters = insertCoasterIntoRanking(
          updatedRankedCoasters.filter(id => id !== currentRankingCoaster.id),
          currentRankingCoaster.id,
          insertPosition
        )

        console.log('🔍 DEBUG BEFORE UNRANKED CALCULATION:')
        console.log('insertPosition:', insertPosition)
        console.log('finalRankedCoasters after insert:', finalRankedCoasters)
        console.log(
          'currentRankingCoaster before filter:',
          currentRankingCoaster
        )

        // Update coaster states
        const unrankedCoasters = uploadedData.coasters.filter(
          c =>
            !c.isPreRanked &&
            !finalRankedCoasters.includes(c.id) &&
            c.id !== currentRankingCoaster?.id
        )

        console.log('🔍 UNRANKED COASTERS CALCULATION:')
        console.log('Total coasters:', uploadedData.coasters.length)
        console.log('finalRankedCoasters:', finalRankedCoasters)
        console.log('currentRankingCoaster:', currentRankingCoaster?.id)
        console.log('unrankedCoasters found:', unrankedCoasters.length)
        console.log(
          'unrankedCoasters IDs:',
          unrankedCoasters.map(c => c.id)
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

        console.log(`🔍 BINARY SEARCH CHECK for ${currentRankingCoaster.name}:`)
        console.log(`  Already ranked coasters: ${alreadyRanked.length}`)
        console.log(`  Min comparisons needed: ${minComparisonsNeeded}`)
        console.log(`  Actual comparisons: ${actualComparisons}`)
        console.log(`  Has enough comparisons: ${hasEnoughComparisons}`)

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

        console.log('🎯 GENERATED NEW COMPARISONS:', newComparisons.length)
        console.log(
          '🎯 NEW COMPARISONS DETAILS:',
          newComparisons.map(pair => `${pair[0].name} vs ${pair[1].name}`)
        )

        console.log('🔍 CHECKING IF RANKING COMPLETE:')
        console.log('unrankedCoasters.length:', unrankedCoasters.length)
        console.log(
          'Condition (unrankedCoasters.length === 0):',
          unrankedCoasters.length === 0
        )

        if (unrankedCoasters.length === 0) {
          console.log('🏁 RANKING COMPLETED - All coasters ranked')
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
        console.log(
          '🎯 SUB-BRANCH: Coaster NOT ready for insertion, generating new comparisons'
        )

        newComparisons = generatePositionalComparisons(
          updatedCoasters,
          finalRankedCoasters,
          updatedCompletedComparisons,
          updatedComparisonResults
        )
      }
    } else {
      console.log('🎯 BRANCH: No current ranking coaster found')
      console.log(
        'Need to start ranking next coaster or generate next comparisons'
      )

      // No current ranking coaster, need to generate next comparisons
      newComparisons = generatePositionalComparisons(
        updatedCoasters,
        finalRankedCoasters,
        updatedCompletedComparisons,
        updatedComparisonResults
      )

      console.log('🎯 GENERATED NEW COMPARISONS:', newComparisons.length)
      console.log(
        '🎯 NEW COMPARISONS DETAILS:',
        newComparisons.map(pair => `${pair[0].name} vs ${pair[1].name}`)
      )
    }

    // Log current ranking state
    const currentRankingState = getCoastersWithPositions(
      updatedCoasters,
      finalRankedCoasters
    )
      .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0))
      .map(c => ({
        name: c.name,
        park: c.park,
        position: c.rankPosition || 0,
      }))
    rankingLogger.logRankingState(currentRankingState)

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
        console.log('🔍 FINAL RANKING DEBUG:')
        console.log(
          'rankedCoasters array order:',
          progressData.rankingMetadata.rankedCoasters
        )

        const finalRankedCoasters = getCoastersWithPositions(
          progressData.coasters,
          progressData.rankingMetadata.rankedCoasters
        )

        console.log(
          'Coasters with positions:',
          finalRankedCoasters.map(c => ({
            name: c.name,
            id: c.id,
            rankPosition: c.rankPosition,
          }))
        )

        const sortedForDisplay = finalRankedCoasters.sort(
          (a, b) => (a.rankPosition || 0) - (b.rankPosition || 0)
        )

        console.log(
          'Final sorted display order:',
          sortedForDisplay.map(c => ({
            name: c.name,
            rankPosition: c.rankPosition,
          }))
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
