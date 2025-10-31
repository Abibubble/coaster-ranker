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
  determineOptimalRankingMode,
  formatCountry,
  generatePositionalComparisons,
  getComparisonKey,
  getCoastersWithPositions,
  initializePositionalRanking,
  updateRankingPositions,
  RankingMode,
} from '../../utils/rankingUtils'
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
  const [rankings, setRankings] = useState<Map<string, number>>(new Map())
  const [rankedCoasters, setRankedCoasters] = useState<Coaster[]>([])
  const [lastComparison, setLastComparison] = useState<{
    pair: [Coaster, Coaster]
    chosenCoaster: Coaster
    comparisonKey: string
  } | null>(null)
  const [hierarchicalResults, setHierarchicalResults] = useState<{
    attemptedMode: 'park' | 'model' | null
    failed: boolean
  }>({ attemptedMode: null, failed: false })

  // Handle group ranking completion
  const handleGroupRankingComplete = useCallback(
    (rankedCoasters: Coaster[]) => {
      if (!uploadedData) return

      // Update the data context with new sequential IDs
      const rerankedCoasters = rankedCoasters.map((coaster, index) => ({
        ...coaster,
        id: `${index + 1}`.padStart(3, '0'), // 001, 002, 003, etc.
        isNewCoaster: false, // Mark all coasters as no longer new
      }))

      // Create updated ranking metadata
      const updatedRankingMetadata = {
        completedComparisons: new Set<string>(),
        totalWins: new Map<string, number>(),
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

  // Initialize individual ranking
  const initializeIndividualRanking = useCallback(() => {
    if (!uploadedData) return

    // Initialize position-based ranking
    const initialized = initializePositionalRanking(uploadedData.coasters)

    // Get coasters with position information
    const coastersWithPositions = getCoastersWithPositions(
      uploadedData.coasters,
      initialized.rankedCoasters
    )

    // Get completed comparisons from ranking metadata
    const completedComparisons =
      uploadedData.rankingMetadata?.completedComparisons || new Set<string>()
    const comparisons = generatePositionalComparisons(
      coastersWithPositions,
      initialized.rankedCoasters,
      completedComparisons
    )

    // Calculate total possible comparisons for progress tracking
    const totalPossibleComparisons = Math.floor(
      (uploadedData.coasters.length * (uploadedData.coasters.length - 1)) / 2
    )

    setRemainingComparisons(comparisons)
    setCurrentPair(comparisons[0] || null)
    setTotalComparisons(totalPossibleComparisons)
    setLastComparison(null) // Clear any previous undo state

    // Initialize rankings map (keeping for backward compatibility)
    const initialRankings = new Map<string, number>()
    coastersWithPositions.forEach(coaster => {
      const existingWins =
        coaster.wins ||
        uploadedData.rankingMetadata?.totalWins.get(coaster.id) ||
        0
      initialRankings.set(coaster.id, existingWins)
    })
    setRankings(initialRankings)

    // Update the uploaded data with position-based ranking
    const updatedData: UploadedData = {
      ...uploadedData,
      coasters: coastersWithPositions,
      rankingMetadata: {
        ...uploadedData.rankingMetadata,
        rankedCoasters: initialized.rankedCoasters,
        completedComparisons,
        totalWins: uploadedData.rankingMetadata?.totalWins || new Map(),
        isRanked: uploadedData.rankingMetadata?.isRanked || false,
      },
    }
    setUploadedData(updatedData)
  }, [uploadedData, setUploadedData])

  // Handle hierarchical ranking failure - fallback to individual ranking
  const handleHierarchicalFallback = useCallback(
    (attemptedMode: 'park' | 'model') => {
      setHierarchicalResults({ attemptedMode, failed: true })
      setRankingMode('individual')
      setRankingPhase('individual-fallback')

      // Initialize individual ranking
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
      setRankings(new Map())
      setRankedCoasters([])
      setLastComparison(null)
      setHierarchicalResults({ attemptedMode: null, failed: false })

      // Clear ranking metadata from uploaded data
      if (uploadedData) {
        setUploadedData({
          ...uploadedData,
          rankingMetadata: {
            completedComparisons: new Set<string>(),
            totalWins: new Map<string, number>(),
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

    // Restore the previous comparison state
    const { pair, chosenCoaster, comparisonKey } = lastComparison

    // Decrement wins for the previously chosen coaster
    const newRankings = new Map(rankings)
    const currentWins = newRankings.get(chosenCoaster.id) || 0
    newRankings.set(chosenCoaster.id, Math.max(0, currentWins - 1))
    setRankings(newRankings)

    // Remove the comparison from completed comparisons
    const currentCompletedComparisons =
      uploadedData.rankingMetadata?.completedComparisons || new Set<string>()
    const updatedCompletedComparisons = new Set(currentCompletedComparisons)
    updatedCompletedComparisons.delete(comparisonKey)

    // Add the pair back to remaining comparisons at the beginning
    const updatedRemainingComparisons = [pair, ...remainingComparisons]
    setRemainingComparisons(updatedRemainingComparisons)
    setCurrentPair(pair)

    // Update the data context
    const progressData = {
      ...uploadedData,
      rankingMetadata: {
        completedComparisons: updatedCompletedComparisons,
        totalWins: new Map(newRankings),
        rankedCoasters:
          uploadedData.rankingMetadata?.rankedCoasters ||
          uploadedData.coasters.map(c => c.id),
        isRanked: false,
      },
    }
    setUploadedData(progressData)

    // Clear the last comparison since we've undone it
    setLastComparison(null)
  }

  // Initialize ranking when coasters are available
  useEffect(() => {
    if (
      uploadedData &&
      uploadedData.coasters.length >= 2 &&
      !isRankingComplete &&
      rankingPhase === 'auto-ranking'
    ) {
      // Automatically determine the best ranking mode
      const optimalMode = determineOptimalRankingMode(uploadedData.coasters)
      setRankingMode(optimalMode)

      if (optimalMode === 'individual') {
        // Start individual ranking immediately
        setRankingPhase('individual-fallback')
        initializeIndividualRanking()
      }
      // For park/model modes, the GroupRanking component will handle initialization
    }
  }, [
    uploadedData,
    isRankingComplete,
    rankingPhase,
    initializeIndividualRanking,
  ])

  // Handle coaster selection (user picks their favorite)
  const handleCoasterChoice = (chosenCoaster: Coaster) => {
    if (!currentPair || !uploadedData) return

    // Create comparison key (ensure consistent ordering)
    const comparisonKey = getComparisonKey(currentPair[0], currentPair[1])

    // Store the last comparison for undo functionality
    setLastComparison({
      pair: currentPair,
      chosenCoaster,
      comparisonKey,
    })

    // Determine which coaster won and which lost
    const winner = chosenCoaster
    const loser = currentPair.find(c => c.id !== chosenCoaster.id)!

    // Update position-based ranking using the new approach
    if (uploadedData.rankingMetadata?.rankedCoasters) {
      const updatedRankedCoasters = updateRankingPositions(
        uploadedData.rankingMetadata.rankedCoasters,
        winner.id,
        loser.id
      )

      // Update completed comparisons
      const currentCompletedComparisons =
        uploadedData.rankingMetadata?.completedComparisons || new Set<string>()
      const updatedCompletedComparisons = new Set(currentCompletedComparisons)
      updatedCompletedComparisons.add(comparisonKey)

      // Update win count for backward compatibility
      const newRankings = new Map(rankings)
      const currentWins = newRankings.get(chosenCoaster.id) || 0
      newRankings.set(chosenCoaster.id, currentWins + 1)
      setRankings(newRankings)

      // Save progress immediately to localStorage
      const progressData = {
        ...uploadedData,
        rankingMetadata: {
          ...uploadedData.rankingMetadata,
          completedComparisons: updatedCompletedComparisons,
          totalWins: new Map(newRankings),
          rankedCoasters: updatedRankedCoasters,
          isRanked: false, // Still in progress
        },
      }
      setUploadedData(progressData)
    }

    // Continue with next comparison
    const nextComparisons = remainingComparisons.slice(1)
    setRemainingComparisons(nextComparisons)
    const nextPair = nextComparisons[0] || null

    if (nextPair) {
      setCurrentPair(nextPair)
    } else {
      // Ranking complete - use position-based final ranking
      if (uploadedData.rankingMetadata?.rankedCoasters) {
        const finalRankedCoasters = getCoastersWithPositions(
          uploadedData.coasters,
          uploadedData.rankingMetadata.rankedCoasters
        )
        setRankedCoasters(finalRankedCoasters)
      }

      // Set completion state
      setCurrentPair(null)
      setIsRankingComplete(true)

      // Update the data context with final ranking after a delay
      setTimeout(() => {
        if (uploadedData.rankingMetadata?.rankedCoasters) {
          const finalCoasters = getCoastersWithPositions(
            uploadedData.coasters,
            uploadedData.rankingMetadata.rankedCoasters
          )

          // Create final ranking metadata
          const updatedRankingMetadata = {
            completedComparisons: new Set<string>(), // Reset for next time
            totalWins: new Map<string, number>(), // Clear old win counts
            rankedCoasters: uploadedData.rankingMetadata.rankedCoasters,
            isRanked: true,
          }

          setUploadedData({
            ...uploadedData,
            coasters: finalCoasters,
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
