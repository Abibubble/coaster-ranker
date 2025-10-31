import { useState, useEffect, useCallback } from 'react'
import {
  CoasterComparison,
  GroupRanking,
  MainContent,
  ProgressInfo,
  RankingComplete,
  RankingControls,
  Title,
} from '../../components'
import { useData } from '../../contexts/DataContext'
import { Coaster, UploadedData } from '../../types/data'
import {
  calculateInsertionPosition,
  determineOptimalRankingMode,
  formatCountry,
  generatePositionalComparisons,
  getComparisonKey,
  getCoastersWithPositions,
  initializePositionalRanking,
  insertCoasterIntoRanking,
  isCoasterReadyForInsertion,
  RankingMode,
  updateRankingPositions,
} from '../../utils/rankingUtils'
import { rankingLogger } from '../../utils/rankingLogger'
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
  const [totalComparisons, setTotalComparisons] = useState(0)
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

  const initializeIndividualRanking = useCallback(() => {
    if (!uploadedData) return

    const initialized = initializePositionalRanking(uploadedData.coasters)

    const coastersWithPositions = getCoastersWithPositions(
      initialized.coasters,
      initialized.rankedCoasters
    )

    // For sequential insertion with new coasters, start fresh with empty completed comparisons
    const hasNewCoasters = initialized.coasters.some(c => c.isCurrentlyRanking)
    const completedComparisons = hasNewCoasters
      ? new Set<string>()
      : uploadedData.rankingMetadata?.completedComparisons || new Set<string>()

    const comparisons = generatePositionalComparisons(
      coastersWithPositions,
      initialized.rankedCoasters,
      completedComparisons,
      comparisonResults
    )

    const totalPossibleComparisons = Math.floor(
      (uploadedData.coasters.length * (uploadedData.coasters.length - 1)) / 2
    )

    setRemainingComparisons(comparisons)
    setCurrentPair(comparisons[0] || null)
    setTotalComparisons(totalPossibleComparisons)
    setComparisonCount(0)
    setLastComparison(null)

    if (
      comparisons.length === 0 &&
      initialized.rankedCoasters.length === uploadedData.coasters.length
    ) {
      setIsRankingComplete(true)
      setRankedCoasters(coastersWithPositions)
    } else {
      setIsRankingComplete(false)
    }

    rankingLogger.logInitialization(
      'individual',
      uploadedData.coasters.length,
      uploadedData.coasters.filter(c => c.isPreRanked).length,
      uploadedData.coasters.filter(c => c.isNewCoaster).length,
      comparisons.length,
      initialized.rankedCoasters
    )

    const updatedData: UploadedData = {
      ...uploadedData,
      coasters: coastersWithPositions,
      rankingMetadata: {
        ...uploadedData.rankingMetadata,
        rankedCoasters: initialized.rankedCoasters,
        completedComparisons,
        isRanked: uploadedData.rankingMetadata?.isRanked || false,
      },
    }
    setUploadedData(updatedData)
  }, [uploadedData, setUploadedData, comparisonResults])

  const handleHierarchicalFallback = useCallback(
    (attemptedMode: 'park' | 'model') => {
      setHierarchicalResults({ attemptedMode, failed: true })
      setRankingMode('individual')
      setRankingPhase('individual-fallback')

      initializeIndividualRanking()
    },
    [initializeIndividualRanking]
  )

  const resetRanking = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all rankings? This will permanently delete all your ranking progress and you will need to start over from the beginning.'
    )

    if (confirmed) {
      setRankingPhase('auto-ranking')
      setIsRankingComplete(false)
      setCurrentPair(null)
      setRemainingComparisons([])
      setTotalComparisons(0)
      setRankedCoasters([])
      setLastComparison(null)
      setHierarchicalResults({ attemptedMode: null, failed: false })

      if (uploadedData) {
        setUploadedData({
          ...uploadedData,
          rankingMetadata: {
            completedComparisons: new Set<string>(),
            rankedCoasters: uploadedData.coasters.map(c => c.id),
            isRanked: false,
          },
        })
      }
    }
  }

  const undoLastChoice = () => {
    if (!lastComparison || !uploadedData) {
      return
    }

    const { pair, comparisonKey } = lastComparison

    setComparisonCount(Math.max(0, comparisonCount - 1))

    const currentCompletedComparisons =
      uploadedData.rankingMetadata?.completedComparisons || new Set<string>()
    const updatedCompletedComparisons = new Set(currentCompletedComparisons)
    updatedCompletedComparisons.delete(comparisonKey)

    const updatedRemainingComparisons = [pair, ...remainingComparisons]
    setRemainingComparisons(updatedRemainingComparisons)
    setCurrentPair(pair)

    const progressData = {
      ...uploadedData,
      rankingMetadata: {
        completedComparisons: updatedCompletedComparisons,
        rankedCoasters:
          uploadedData.rankingMetadata?.rankedCoasters ||
          uploadedData.coasters.map(c => c.id),
        isRanked: false,
      },
    }
    setUploadedData(progressData)

    setLastComparison(null)
  }

  useEffect(() => {
    if (
      uploadedData &&
      uploadedData.coasters.length >= 2 &&
      !isRankingComplete &&
      rankingPhase === 'auto-ranking'
    ) {
      const optimalMode = determineOptimalRankingMode(uploadedData.coasters)
      setRankingMode(optimalMode)

      if (optimalMode === 'individual') {
        setRankingPhase('individual-fallback')
        initializeIndividualRanking()
      }
    }
  }, [
    uploadedData,
    isRankingComplete,
    rankingPhase,
    initializeIndividualRanking,
  ])

  const handleCoasterChoice = (chosenCoaster: Coaster) => {
    if (!currentPair || !uploadedData) return

    const newComparisonCount = comparisonCount + 1
    setComparisonCount(newComparisonCount)

    const comparisonKey = getComparisonKey(currentPair[0], currentPair[1])

    setLastComparison({
      pair: currentPair,
      chosenCoaster,
      comparisonKey,
    })

    const winner = chosenCoaster
    const loser = currentPair.find(c => c.id !== chosenCoaster.id)!

    const updatedComparisonResults = new Map(comparisonResults)
    updatedComparisonResults.set(comparisonKey, winner.id)
    setComparisonResults(updatedComparisonResults)

    let newComparisons: [Coaster, Coaster][] | null = null

    rankingLogger.logComparison(
      newComparisonCount,
      currentPair[0],
      currentPair[1],
      winner,
      loser,
      comparisonKey
    )

    // Position-based ranking update
    if (uploadedData.rankingMetadata?.rankedCoasters) {
      const oldRankedCoasters = uploadedData.rankingMetadata.rankedCoasters
      const oldWinnerPosition = oldRankedCoasters.indexOf(winner.id) + 1

      const updatedRankedCoasters = updateRankingPositions(
        uploadedData.rankingMetadata.rankedCoasters,
        winner.id,
        loser.id
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
      let updatedCoasters = uploadedData.coasters
      let finalRankedCoasters = updatedRankedCoasters

      if (
        currentRankingCoaster &&
        (winner.id === currentRankingCoaster.id ||
          loser.id === currentRankingCoaster.id)
      ) {
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

          // Update coaster states
          const unrankedCoasters = uploadedData.coasters.filter(
            c =>
              !c.isPreRanked &&
              !finalRankedCoasters.includes(c.id) &&
              c.id !== currentRankingCoaster.id
          )

          updatedCoasters = uploadedData.coasters.map(coaster => {
            if (coaster.id === currentRankingCoaster.id) {
              return {
                ...coaster,
                isCurrentlyRanking: false,
                rankPosition: finalRankedCoasters.indexOf(coaster.id) + 1,
              }
            } else if (coaster.isCurrentlyRanking) {
              return { ...coaster, isCurrentlyRanking: false }
            } else if (
              unrankedCoasters.length > 0 &&
              coaster.id === unrankedCoasters[0].id
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
            setUploadedData(finalUploadedData)

            setRankedCoasters(sortedForDisplay)
            setIsRankingComplete(true)
            setCurrentPair(null)
            return
          }
        } else {
          newComparisons = generatePositionalComparisons(
            updatedCoasters,
            finalRankedCoasters,
            updatedCompletedComparisons,
            updatedComparisonResults
          )
        }
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
      setUploadedData(progressData)
    }

    // Continue with next comparison
    let nextComparisons: [Coaster, Coaster][]
    let nextPair: [Coaster, Coaster] | null = null

    // Use new comparisons from sequential insertion if available
    if (newComparisons && newComparisons.length > 0) {
      nextComparisons = newComparisons
      nextPair = nextComparisons[0] || null
      setRemainingComparisons(nextComparisons.slice(1))
    } else {
      nextComparisons = remainingComparisons.slice(1)
      nextPair = nextComparisons[0] || null
      setRemainingComparisons(nextComparisons)
    }

    if (nextPair) {
      setCurrentPair(nextPair)
    } else {
      // Ranking complete
      if (uploadedData.rankingMetadata?.rankedCoasters) {
        const finalRankedCoasters = getCoastersWithPositions(
          uploadedData.coasters,
          uploadedData.rankingMetadata.rankedCoasters
        )
        const sortedForDisplay = finalRankedCoasters.sort(
          (a, b) => (a.rankPosition || 0) - (b.rankPosition || 0)
        )

        setRankedCoasters(sortedForDisplay)
      }

      setCurrentPair(null)
      setIsRankingComplete(true)

      setTimeout(() => {
        if (uploadedData.rankingMetadata?.rankedCoasters) {
          const finalCoasters = getCoastersWithPositions(
            uploadedData.coasters,
            uploadedData.rankingMetadata.rankedCoasters
          )
          const sortedFinalCoasters = finalCoasters.sort(
            (a, b) => (a.rankPosition || 0) - (b.rankPosition || 0)
          )

          const updatedRankingMetadata = {
            completedComparisons: new Set<string>(),
            rankedCoasters: uploadedData.rankingMetadata.rankedCoasters,
            isRanked: true,
          }

          setUploadedData({
            ...uploadedData,
            coasters: sortedFinalCoasters,
            rankingMetadata: updatedRankingMetadata,
          })
        }
      }, 500) // Delay to ensure completion screen is visible
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
              <Styled.FallbackTitle>
                Switched to Individual Ranking
              </Styled.FallbackTitle>
              <Styled.FallbackDescription>
                {hierarchicalResults.attemptedMode === 'park'
                  ? 'Park-based'
                  : 'Manufacturer & Model-based'}{' '}
                ranking didn't work well for your collection, so we've switched
                to comparing each coaster individually for the most accurate
                results.
              </Styled.FallbackDescription>
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
                  remainingComparisons={remainingComparisons.length}
                  totalComparisons={totalComparisons}
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
                <p>Preparing comparisons...</p>
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
          <p>
            <Styled.BoldText>File:</Styled.BoldText> {filename}
          </p>
          <p>
            <Styled.BoldText>Uploaded:</Styled.BoldText>{' '}
            {uploadedAt.toLocaleDateString()} at{' '}
            {uploadedAt.toLocaleTimeString()}
          </p>
          <p>
            <Styled.BoldText>Total Coasters:</Styled.BoldText> {coasters.length}
          </p>
        </Styled.UploadSummary>

        <h3>Coasters Ready for Ranking</h3>
        <Styled.CoasterList role='region' aria-label='Coaster list'>
          <ul>
            {coasters.slice(0, 10).map((coaster, _index) => (
              <li key={coaster.id}>
                <Styled.BoldText>{coaster.name}</Styled.BoldText> at{' '}
                {coaster.park}
                {formatCountry(coaster.country)}
                <span
                  aria-label={`Manufacturer: ${coaster.manufacturer}, Model: ${coaster.model}, Type: ${coaster.type}`}
                >
                  {' '}
                  - {coaster.manufacturer} {coaster.model} ({coaster.type})
                </span>
              </li>
            ))}
            {coasters.length > 10 && (
              <li>
                <Styled.ItalicText>
                  ...and {coasters.length - 10} more coaster
                  {coasters.length - 10 === 1 ? '' : 's'}
                </Styled.ItalicText>
              </li>
            )}
          </ul>
        </Styled.CoasterList>

        {coasters.length > 0 && (
          <Styled.RankingInstructions>
            {coasters.length >= 2 ? (
              <p>
                <Styled.ItalicText>
                  Ranking functionality is available! You can start ranking your{' '}
                  {coasters.length} coasters.
                </Styled.ItalicText>
              </p>
            ) : (
              <p>
                <Styled.ItalicText>
                  Upload at least one more coaster to start ranking. You need a
                  minimum of 2 coasters to compare and rank.
                </Styled.ItalicText>
              </p>
            )}
          </Styled.RankingInstructions>
        )}
      </section>
    </MainContent>
  )
}

export default Rank
