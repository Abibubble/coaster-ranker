import { useEffect, useState } from 'react'
import { Coaster } from '../../types/data'
import * as Styled from '../GroupRanking/GroupRanking.styled'

export interface SimpleCoasterRankingProps {
  coasters: Coaster[]
  onComplete: (ranked: Coaster[]) => void
  hideProgress?: boolean
}

/**
 * Simple coaster ranking component for ranking coasters within a group
 * Uses a round-robin comparison system where each coaster is compared against every other
 */
export default function SimpleCoasterRanking({
  coasters,
  onComplete,
  hideProgress = false,
}: SimpleCoasterRankingProps) {
  const [currentPair, setCurrentPair] = useState<[Coaster, Coaster] | null>(
    null
  )
  const [remainingComparisons, setRemainingComparisons] = useState<
    [Coaster, Coaster][]
  >([])
  const [rankings, setRankings] = useState<Map<string, number>>(new Map())
  const [totalComparisons, setTotalComparisons] = useState(0)

  useEffect(() => {
    if (coasters.length < 2) {
      onComplete(coasters)
      return
    }

    // Generate all possible pairs for comparison
    const pairs: [Coaster, Coaster][] = []
    for (let i = 0; i < coasters.length - 1; i++) {
      for (let j = i + 1; j < coasters.length; j++) {
        pairs.push([coasters[i], coasters[j]])
      }
    }

    setRemainingComparisons(pairs)
    setTotalComparisons(pairs.length)
    setCurrentPair(pairs[0] || null)

    // Initialize rankings with zero comparison scores for each coaster
    const initialRankings = new Map<string, number>()
    coasters.forEach(coaster => {
      initialRankings.set(coaster.id, 0)
    })
    setRankings(initialRankings)
  }, [coasters, onComplete])

  const handleChoice = (chosenCoaster: Coaster) => {
    if (!currentPair) return

    // Update comparison scores - chosen coaster gets a point
    const newRankings = new Map(rankings)
    const currentScore = newRankings.get(chosenCoaster.id) || 0
    newRankings.set(chosenCoaster.id, currentScore + 1)
    setRankings(newRankings)

    // Move to next comparison
    const nextComparisons = remainingComparisons.slice(1)
    setRemainingComparisons(nextComparisons)

    if (nextComparisons.length > 0) {
      setCurrentPair(nextComparisons[0])
    } else {
      // Ranking complete - sort by comparison score, with ties broken by ID
      const sortedCoasters = [...coasters].sort((a, b) => {
        const aScore = newRankings.get(a.id) || 0
        const bScore = newRankings.get(b.id) || 0

        if (aScore !== bScore) {
          return bScore - aScore // Higher score first
        }
        return a.id.localeCompare(b.id) // Stable tie-breaking
      })

      onComplete(sortedCoasters)
    }
  }

  if (!currentPair) {
    return <div>Completing ranking...</div>
  }

  return (
    <div>
      {!hideProgress && (
        <Styled.ComparisonProgress>
          <Styled.ProgressTitle>
            Which coaster do you prefer?
          </Styled.ProgressTitle>

          <Styled.ProgressStats>
            <Styled.ProgressStat>
              <Styled.ProgressNumber>
                {remainingComparisons.length}
              </Styled.ProgressNumber>
              <Styled.ProgressLabel>Comparisons Remaining</Styled.ProgressLabel>
            </Styled.ProgressStat>

            <Styled.ProgressStat>
              <Styled.ProgressNumber>
                {totalComparisons - remainingComparisons.length}
              </Styled.ProgressNumber>
              <Styled.ProgressLabel>Completed</Styled.ProgressLabel>
            </Styled.ProgressStat>
          </Styled.ProgressStats>

          {(() => {
            const progress = Math.round(
              ((totalComparisons - remainingComparisons.length) /
                totalComparisons) *
                100
            )
            return (
              <>
                <Styled.ProgressBarContainer>
                  <Styled.ProgressBar $progress={progress} />
                </Styled.ProgressBarContainer>
                <Styled.ProgressPercentage>
                  {progress}% Complete
                </Styled.ProgressPercentage>
              </>
            )
          })()}
        </Styled.ComparisonProgress>
      )}

      <Styled.ComparisonArea>
        <Styled.CoasterCard
          onClick={() => handleChoice(currentPair[0])}
          aria-label={`Choose ${currentPair[0].name}`}
        >
          <Styled.CoasterName>{currentPair[0].name}</Styled.CoasterName>
          <Styled.CoasterPark>
            {currentPair[0].park}
            {currentPair[0].country &&
              currentPair[0].country.trim() !== '' &&
              ` (${currentPair[0].country})`}
          </Styled.CoasterPark>
          <Styled.CoasterDetails>
            <p>
              <Styled.BoldText>Manufacturer:</Styled.BoldText>{' '}
              {currentPair[0].manufacturer}
            </p>
            <p>
              <Styled.BoldText>Model:</Styled.BoldText> {currentPair[0].model}
            </p>
            <p>
              <Styled.BoldText>Type:</Styled.BoldText> {currentPair[0].type}
            </p>
          </Styled.CoasterDetails>
        </Styled.CoasterCard>

        <Styled.VersusText>VS</Styled.VersusText>

        <Styled.CoasterCard
          onClick={() => handleChoice(currentPair[1])}
          aria-label={`Choose ${currentPair[1].name}`}
        >
          <Styled.CoasterName>{currentPair[1].name}</Styled.CoasterName>
          <Styled.CoasterPark>
            {currentPair[1].park}
            {currentPair[1].country &&
              currentPair[1].country.trim() !== '' &&
              ` (${currentPair[1].country})`}
          </Styled.CoasterPark>
          <Styled.CoasterDetails>
            <p>
              <Styled.BoldText>Manufacturer:</Styled.BoldText>{' '}
              {currentPair[1].manufacturer}
            </p>
            <p>
              <Styled.BoldText>Model:</Styled.BoldText> {currentPair[1].model}
            </p>
            <p>
              <Styled.BoldText>Type:</Styled.BoldText> {currentPair[1].type}
            </p>
          </Styled.CoasterDetails>
        </Styled.CoasterCard>
      </Styled.ComparisonArea>
    </div>
  )
}
