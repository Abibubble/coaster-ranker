import { useState, useEffect, useCallback } from 'react'
import {
  CoasterComparison,
  GroupRanking,
  MainContent,
  ProgressInfo,
  RankingComplete,
  RankingControls,
  Title,
  Text,
} from '../../components'
import { useData } from '../../contexts/DataContext'
import { Coaster } from '../../types/data'
import {
  determineOptimalRankingMode,
  formatCountry,
  RankingMode,
} from '../../utils/ranking/rankingUtils'
import { compareCoasters, resetRankings, undoLastComparison } from '../../utils'
import {
  initializeIndividualRanking,
  initializeRankingState,
} from '../../utils/rankingInitialization'
import * as Styled from './Rank.styled'

type RankingPhase = 'auto-ranking' | 'individual-fallback' | 'complete'

function Rank() {
  const { uploadedData, setUploadedData } = useData()
  const [rankingMode, setRankingMode] = useState<RankingMode>('individual')
  const [rankingPhase, setRankingPhase] = useState<RankingPhase>('auto-ranking')
  const [currentPair, setCurrentPair] = useState<[Coaster, Coaster] | null>(
    null
  )
  const [remainingComparisons, setRemainingComparisons] = useState<
    [Coaster, Coaster][]
  >([])
  const [isRankingComplete, setIsRankingComplete] = useState(false)
  const [rankedCoasters, setRankedCoasters] = useState<Coaster[]>([])
  const [comparisonCount, setComparisonCount] = useState(0)
  const [comparisonResults, setComparisonResults] = useState<
    Map<string, string>
  >(new Map())
  const [lastComparison, setLastComparison] = useState<{
    pair: [Coaster, Coaster]
    chosenCoaster: Coaster
    comparisonKey: string
  } | null>(null)
  const [hierarchicalResults, setHierarchicalResults] = useState<{
    attemptedMode: 'park' | 'model' | null
    failed: boolean
  }>({ attemptedMode: null, failed: false })

  const handleGroupRankingComplete = useCallback(
    (rankedCoasters: Coaster[]) => {
      if (!uploadedData) return

      const rerankedCoasters = rankedCoasters.map((coaster, index) => ({
        ...coaster,
        id: `${index + 1}`.padStart(3, '0'),
        isNewCoaster: false,
      }))

      const updatedRankingMetadata = {
        completedComparisons: new Set<string>(),
        rankedCoasters: rerankedCoasters.map(c => c.id),
        isRanked: true,
      }

      setUploadedData({
        ...uploadedData,
        coasters: rerankedCoasters,
        rankingMetadata: updatedRankingMetadata,
      })

      setIsRankingComplete(true)
      setRankedCoasters(rankedCoasters)
    },
    [uploadedData, setUploadedData]
  )

  const initializeIndividualRankingCallback = useCallback(() => {
    if (!uploadedData) return

    // Reset comparison results when starting a new ranking session
    const freshComparisonResults = new Map<string, string>()
    setComparisonResults(freshComparisonResults)

    // Also reset other state that might interfere
    setComparisonCount(0)
    setLastComparison(null)
    setRemainingComparisons([])

    const result = initializeIndividualRanking({
      uploadedData,
      comparisonResults: freshComparisonResults,
    })

    const stateUpdate = initializeRankingState({
      comparisons: result.comparisons,
      totalPossibleComparisons: result.totalPossibleComparisons,
      isRankingComplete: result.isRankingComplete,
      rankedCoasters: result.rankedCoasters,
    })

    // Apply all state updates
    setRemainingComparisons(stateUpdate.remainingComparisons)
    setCurrentPair(stateUpdate.currentPair)
    setComparisonCount(stateUpdate.comparisonCount)
    setLastComparison(stateUpdate.lastComparison)
    setIsRankingComplete(stateUpdate.isRankingComplete)
    setRankedCoasters(stateUpdate.rankedCoasters)
    setUploadedData(result.updatedData)
  }, [uploadedData, setUploadedData])

  const handleHierarchicalFallback = useCallback(
    (attemptedMode: 'park' | 'model') => {
      setHierarchicalResults({ attemptedMode, failed: true })
      setRankingMode('individual')
      setRankingPhase('individual-fallback')

      initializeIndividualRankingCallback()
    },
    [initializeIndividualRankingCallback]
  )

  const resetRanking = () => {
    const result = resetRankings({ uploadedData })

    if (result.confirmed) {
      setRankingPhase('auto-ranking')
      setIsRankingComplete(false)
      setCurrentPair(null)
      setRemainingComparisons([])
      setRankedCoasters([])
      setLastComparison(null)
      setComparisonResults(new Map()) // Clear stale comparison results
      setComparisonCount(0) // Reset comparison count
      setHierarchicalResults({ attemptedMode: null, failed: false })

      if (result.updatedData) {
        setUploadedData(result.updatedData)
      }
    }
  }

  // Add a global debug function for complete reset
  useEffect(() => {
    interface WindowWithDebug extends Window {
      debugResetCoasterRanker?: () => void
    }

    ;(window as WindowWithDebug).debugResetCoasterRanker = () => {
      localStorage.removeItem('coaster-ranker-data')
      setUploadedData(null)
      setComparisonResults(new Map())
      setComparisonCount(0)
      setCurrentPair(null)
      setRemainingComparisons([])
      setIsRankingComplete(false)
      setRankedCoasters([])
      setLastComparison(null)
      setRankingPhase('auto-ranking')
    }
  }, [setUploadedData])

  const undoLastChoice = () => {
    const result = undoLastComparison({
      lastComparison,
      uploadedData,
      comparisonCount,
      remainingComparisons,
    })

    if (result.success) {
      setComparisonCount(result.updatedComparisonCount)
      setRemainingComparisons(result.updatedRemainingComparisons)
      setCurrentPair(result.currentPair)

      if (result.updatedData) {
        setUploadedData(result.updatedData)
      }

      setLastComparison(null)
    }
  }

  useEffect(() => {
    if (
      uploadedData &&
      uploadedData.coasters.length >= 2 &&
      !isRankingComplete &&
      rankingPhase === 'auto-ranking'
    ) {
      // Check if ranking is already complete from saved state
      if (
        uploadedData.rankingMetadata?.isRanked &&
        uploadedData.rankingMetadata?.rankedCoasters
      ) {
        // Get coasters sorted by their rank positions
        const savedRankedCoasters = uploadedData.coasters
          .filter(coaster => coaster.rankPosition !== undefined)
          .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0))

        // If we have positioned coasters, use those; otherwise fall back to rankedCoasters array order
        const rankedCoasterList =
          savedRankedCoasters.length > 0
            ? savedRankedCoasters
            : (uploadedData.rankingMetadata.rankedCoasters
                .map(id => uploadedData.coasters.find(c => c.id === id))
                .filter(c => c !== undefined) as Coaster[])

        setIsRankingComplete(true)
        setRankedCoasters(rankedCoasterList)
        setRankingPhase('complete')

        return
      }

      const optimalMode = determineOptimalRankingMode(uploadedData.coasters)
      setRankingMode(optimalMode)

      if (optimalMode === 'individual') {
        setRankingPhase('individual-fallback')
        initializeIndividualRankingCallback()
      }
    }
  }, [
    uploadedData,
    isRankingComplete,
    rankingPhase,
    initializeIndividualRankingCallback,
  ])

  const handleCoasterChoice = (chosenCoaster: Coaster) => {
    if (!currentPair || !uploadedData) return

    const result = compareCoasters({
      coasterA: currentPair[0],
      coasterB: currentPair[1],
      chosenWinner: chosenCoaster,
      uploadedData,
      comparisonResults,
      remainingComparisons,
      comparisonCount,
    })

    // Update all state based on the comparison result
    setComparisonCount(comparisonCount + 1)
    setComparisonResults(result.updatedComparisonResults)
    setLastComparison(result.lastComparison)
    setUploadedData(result.updatedData)

    if (result.isRankingComplete) {
      setRankedCoasters(result.rankedCoasters)
      setIsRankingComplete(true)
      setCurrentPair(null)
      setRemainingComparisons([])
    } else if (result.nextComparisons && result.nextComparisons.length > 0) {
      setCurrentPair(result.nextComparisons[0] || null)
      setRemainingComparisons(result.nextComparisons.slice(1))
    } else {
      // No more comparisons available, ranking should be complete
      setCurrentPair(null)
      setRemainingComparisons([])
      setIsRankingComplete(true)
      setRankedCoasters(result.rankedCoasters)
    }
  }

  if (!uploadedData) {
    return (
      <MainContent>
        <Title>Rank Your Coasters</Title>
        <section>
          <p>
            No coaster data uploaded yet. Please visit the{' '}
            <a href='/upload' aria-label='Go to upload page'>
              Upload page
            </a>{' '}
            to upload your coaster experiences. You'll need at least 2 coasters
            to start ranking.
          </p>
        </section>
      </MainContent>
    )
  }

  const { coasters, filename, uploadedAt } = uploadedData

  // Show ranking interface if 2+ coasters
  if (coasters.length >= 2) {
    // Show GroupRanking for hierarchical modes
    if (
      (rankingMode === 'park' || rankingMode === 'model') &&
      rankingPhase === 'auto-ranking'
    ) {
      return (
        <MainContent>
          <Title>Rank Your Coasters</Title>

          <section>
            <GroupRanking
              coasters={coasters}
              groupBy={rankingMode}
              onRankingComplete={handleGroupRankingComplete}
              onHierarchicalFallback={handleHierarchicalFallback}
            />
          </section>
        </MainContent>
      )
    }

    // Show individual ranking interface (either as primary or fallback)
    return (
      <MainContent>
        <Title>Rank Your Coasters</Title>

        <section>
          {/* TODO: Revisit hierarchical ranking system - consider if it's still needed with the new binary search optimization for individual ranking */}
          {hierarchicalResults.failed && (
            <Styled.HierarchicalFallbackNotice>
              <Text as='p' bold colour='warningYellow' mb='tiny'>
                Switched to Individual Ranking
              </Text>
              <Text as='p' colour='warningYellow' fontSize='small'>
                {hierarchicalResults.attemptedMode === 'park'
                  ? 'Park-based'
                  : 'Manufacturer & Model-based'}{' '}
                ranking didn't work well for your collection, so we've switched
                to comparing each coaster individually for the most accurate
                results.
              </Text>
            </Styled.HierarchicalFallbackNotice>
          )}

          <Styled.RankingContainer>
            {isRankingComplete ? (
              <RankingComplete
                rankedCoasters={rankedCoasters}
                onRankAgain={resetRanking}
              />
            ) : currentPair ? (
              <>
                <ProgressInfo
                  totalCoasters={coasters.length}
                  rankedCoasters={rankedCoasters.length}
                  showCoastersLeft={true}
                  showProgressBar={true}
                />

                <CoasterComparison
                  coaster1={currentPair[0]}
                  coaster2={currentPair[1]}
                  onChoose1={() => handleCoasterChoice(currentPair[0])}
                  onChoose2={() => handleCoasterChoice(currentPair[1])}
                />

                <RankingControls
                  onUndo={undoLastChoice}
                  onReset={resetRanking}
                  canUndo={!!lastComparison}
                />
              </>
            ) : (
              <Styled.PreparingContainer>
                <Text as='p'>Preparing comparisons...</Text>
                <RankingControls onReset={resetRanking} />
              </Styled.PreparingContainer>
            )}
          </Styled.RankingContainer>
        </section>
      </MainContent>
    )
  }

  // Show coaster list if only 1 coaster
  return (
    <MainContent>
      <Title>Rank Your Coasters</Title>

      <section>
        <h2>Your Coaster Collection</h2>
        <Styled.UploadSummary aria-label='Upload summary'>
          <Text as='p'>
            <Text bold>File:</Text> {filename}
          </Text>
          <Text as='p'>
            <Text bold>Uploaded:</Text> {uploadedAt.toLocaleDateString()} at{' '}
            {uploadedAt.toLocaleTimeString()}
          </Text>
          <Text as='p'>
            <Text bold>Total Coasters:</Text> {coasters.length}
          </Text>
        </Styled.UploadSummary>

        <h3>Coasters Ready for Ranking</h3>
        <Styled.CoasterList role='region' aria-label='Coaster list'>
          <ul>
            {coasters.slice(0, 10).map((coaster, _index) => (
              <li key={coaster.id}>
                <Text bold>{coaster.name}</Text> at {coaster.park}
                {formatCountry(coaster.country)}
                <Text
                  as='span'
                  aria-label={`Manufacturer: ${coaster.manufacturer}, Model: ${coaster.model}, Material: ${coaster.material}`}
                >
                  {' '}
                  - {coaster.manufacturer} {coaster.model} ({coaster.material})
                </Text>
              </li>
            ))}
            {coasters.length > 10 && (
              <li>
                <Text italic>
                  ...and {coasters.length - 10} more coaster
                  {coasters.length - 10 === 1 ? '' : 's'}
                </Text>
              </li>
            )}
          </ul>
        </Styled.CoasterList>

        {coasters.length > 0 && (
          <Styled.RankingInstructions>
            {coasters.length >= 2 ? (
              <Text as='p' colour='mediumGrey' italic>
                Ranking functionality is available! You can start ranking your{' '}
                {coasters.length} coasters.
              </Text>
            ) : (
              <Text as='p' colour='mediumGrey' italic>
                Upload at least one more coaster to start ranking. You need a
                minimum of 2 coasters to compare and rank.
              </Text>
            )}
          </Styled.RankingInstructions>
        )}
      </section>
    </MainContent>
  )
}

export default Rank
