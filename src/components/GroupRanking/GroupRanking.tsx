import { useState, useEffect, useCallback } from 'react'
import { Coaster } from '../../types/data'
import { ProgressInfo } from '../../components'
import * as Styled from './GroupRanking.styled'

interface CoasterGroup {
  name: string
  coasters: Coaster[]
  isRanked: boolean
}

interface GroupComparison {
  higherGroup: string
  lowerGroup: string
  higherGroupLowest: Coaster
  lowerGroupHighest: Coaster
  description: string
}

interface GroupRankingProps {
  coasters: Coaster[]
  groupBy: 'park' | 'model'
  onRankingComplete: (rankedCoasters: Coaster[]) => void
  onHierarchicalFallback: (attemptedMode: 'park' | 'model') => void
}

export default function GroupRanking({
  coasters,
  groupBy,
  onRankingComplete,
  onHierarchicalFallback,
}: GroupRankingProps) {
  const [groups, setGroups] = useState<Map<string, CoasterGroup>>(new Map())
  const [currentGroupRanking, setCurrentGroupRanking] = useState<string | null>(
    null
  )
  const [currentComparison, setCurrentComparison] =
    useState<GroupComparison | null>(null)
  const [finalGroupOrder, setFinalGroupOrder] = useState<string[]>([])
  const [phase, setPhase] = useState<
    'group-ranking' | 'hierarchical-comparison' | 'complete'
  >('group-ranking')

  const finalizeRanking = useCallback(
    (groupOrder: string[], groupMap: Map<string, CoasterGroup>) => {
      const finalRankedCoasters: Coaster[] = []

      groupOrder.forEach(groupName => {
        const group = groupMap.get(groupName)!
        finalRankedCoasters.push(...group.coasters)
      })

      onRankingComplete(finalRankedCoasters)
    },
    [onRankingComplete]
  )

  // Initialize groups
  useEffect(() => {
    const groupMap = new Map<string, CoasterGroup>()

    coasters.forEach(coaster => {
      const groupKey =
        groupBy === 'park'
          ? coaster.park
          : `${coaster.manufacturer} ${coaster.model}`

      if (!groupMap.has(groupKey)) {
        groupMap.set(groupKey, {
          name: groupKey,
          coasters: [],
          isRanked: false,
        })
      }

      groupMap.get(groupKey)!.coasters.push(coaster)
    })

    setGroups(groupMap)

    // Set up the initial group order
    const groupNames = Array.from(groupMap.keys())
    setFinalGroupOrder(groupNames)

    // Start with first group that has multiple coasters
    const firstGroupToRank = Array.from(groupMap.entries()).find(
      ([_, group]) => group.coasters.length > 1
    )

    if (firstGroupToRank) {
      setCurrentGroupRanking(firstGroupToRank[0])
    } else {
      // All groups have single coasters, finalize immediately
      setPhase('complete')
      const finalRankedCoasters: Coaster[] = []
      groupNames.forEach(groupName => {
        const group = groupMap.get(groupName)!
        finalRankedCoasters.push(...group.coasters)
      })

      onRankingComplete(finalRankedCoasters)
    }
  }, [coasters, groupBy, onRankingComplete])

  const handleGroupRankingComplete = (
    groupName: string,
    rankedCoasters: Coaster[]
  ) => {
    const newGroups = new Map(groups)
    const group = newGroups.get(groupName)!

    group.isRanked = true
    group.coasters = rankedCoasters

    newGroups.set(groupName, group)
    setGroups(newGroups)

    // Find next group to rank
    const nextGroupToRank = Array.from(newGroups.entries()).find(
      ([_, group]) => !group.isRanked && group.coasters.length > 1
    )

    if (nextGroupToRank) {
      setCurrentGroupRanking(nextGroupToRank[0])
    } else {
      // All groups ranked, finalize the ranking directly
      setCurrentGroupRanking(null)
      setPhase('complete')

      // Create the final ranking by concatenating all groups in their current order
      const finalRankedCoasters: Coaster[] = []
      finalGroupOrder.forEach(groupName => {
        const group = newGroups.get(groupName)!
        if (group) {
          finalRankedCoasters.push(...group.coasters)
        }
      })

      onRankingComplete(finalRankedCoasters)
    }
  }

  const handleHierarchicalChoice = (chosenCoaster: Coaster) => {
    if (!currentComparison) return

    const { higherGroupLowest } = currentComparison

    // Clear the current comparison immediately
    setCurrentComparison(null)

    if (chosenCoaster.id === higherGroupLowest.id) {
      // Lower coaster from higher group wins - hierarchy is confirmed

      // Call validation after state updates
      setTimeout(() => {
        setPhase('complete')
        finalizeRanking(finalGroupOrder, groups)
      }, 10)
    } else {
      // Higher coaster from lower group wins - hierarchy fails, fallback to individual ranking

      // Call fallback after state updates
      setTimeout(() => {
        onHierarchicalFallback(groupBy)
      }, 10)
    }
  }

  if (phase === 'group-ranking' && currentGroupRanking) {
    const currentGroup = groups.get(currentGroupRanking)!

    // Calculate total remaining comparisons across all groups
    let totalRemainingComparisons = 0
    groups.forEach(group => {
      if (!group.isRanked && group.coasters.length > 1) {
        // Calculate comparisons needed for this group: n*(n-1)/2
        const n = group.coasters.length
        totalRemainingComparisons += (n * (n - 1)) / 2
      }
    })

    return (
      <div>
        <ProgressInfo remainingComparisons={totalRemainingComparisons} />
        <SimpleCoasterRanking
          coasters={currentGroup.coasters}
          onComplete={ranked =>
            handleGroupRankingComplete(currentGroupRanking, ranked)
          }
          hideProgress={true}
        />
      </div>
    )
  }

  if (phase === 'hierarchical-comparison' && currentComparison) {
    return (
      <div>
        <Styled.HierarchicalHeader>
          <h4>Which coaster do you prefer?</h4>
          <p>Finalizing your ranking...</p>
        </Styled.HierarchicalHeader>

        <Styled.ComparisonArea>
          <Styled.CoasterCard
            onClick={() =>
              handleHierarchicalChoice(currentComparison.higherGroupLowest)
            }
            aria-label={`Choose ${currentComparison.higherGroupLowest.name}`}
          >
            <Styled.CoasterName>
              {currentComparison.higherGroupLowest.name}
            </Styled.CoasterName>
            <Styled.CoasterPark>
              {currentComparison.higherGroupLowest.park}
              {currentComparison.higherGroupLowest.country &&
                currentComparison.higherGroupLowest.country.trim() !== '' &&
                ` (${currentComparison.higherGroupLowest.country})`}
            </Styled.CoasterPark>
            <Styled.CoasterDetails>
              <p>
                <Styled.BoldText>Manufacturer:</Styled.BoldText>{' '}
                {currentComparison.higherGroupLowest.manufacturer}
              </p>
              <p>
                <Styled.BoldText>Model:</Styled.BoldText>{' '}
                {currentComparison.higherGroupLowest.model}
              </p>
              <p>
                <Styled.BoldText>Type:</Styled.BoldText>{' '}
                {currentComparison.higherGroupLowest.type}
              </p>
              {currentComparison.higherGroupLowest.height && (
                <p>
                  <Styled.BoldText>Height:</Styled.BoldText>{' '}
                  {currentComparison.higherGroupLowest.height}m
                </p>
              )}
              {currentComparison.higherGroupLowest.speed && (
                <p>
                  <Styled.BoldText>Speed:</Styled.BoldText>{' '}
                  {currentComparison.higherGroupLowest.speed} km/h
                </p>
              )}
            </Styled.CoasterDetails>
          </Styled.CoasterCard>

          <Styled.VersusText>VS</Styled.VersusText>

          <Styled.CoasterCard
            onClick={() =>
              handleHierarchicalChoice(currentComparison.lowerGroupHighest)
            }
            aria-label={`Choose ${currentComparison.lowerGroupHighest.name}`}
          >
            <Styled.CoasterName>
              {currentComparison.lowerGroupHighest.name}
            </Styled.CoasterName>
            <Styled.CoasterPark>
              {currentComparison.lowerGroupHighest.park}
              {currentComparison.lowerGroupHighest.country &&
                currentComparison.lowerGroupHighest.country.trim() !== '' &&
                ` (${currentComparison.lowerGroupHighest.country})`}
            </Styled.CoasterPark>
            <Styled.CoasterDetails>
              <p>
                <Styled.BoldText>Manufacturer:</Styled.BoldText>{' '}
                {currentComparison.lowerGroupHighest.manufacturer}
              </p>
              <p>
                <Styled.BoldText>Model:</Styled.BoldText>{' '}
                {currentComparison.lowerGroupHighest.model}
              </p>
              <p>
                <Styled.BoldText>Type:</Styled.BoldText>{' '}
                {currentComparison.lowerGroupHighest.type}
              </p>
              {currentComparison.lowerGroupHighest.height && (
                <p>
                  <Styled.BoldText>Height:</Styled.BoldText>{' '}
                  {currentComparison.lowerGroupHighest.height}m
                </p>
              )}
              {currentComparison.lowerGroupHighest.speed && (
                <p>
                  <Styled.BoldText>Speed:</Styled.BoldText>{' '}
                  {currentComparison.lowerGroupHighest.speed} km/h
                </p>
              )}
            </Styled.CoasterDetails>
          </Styled.CoasterCard>
        </Styled.ComparisonArea>
      </div>
    )
  }

  if (phase === 'complete') {
    return (
      <div>
        <h3>Hierarchical Ranking Complete!</h3>
        <p>
          Your coasters have been ranked using the {groupBy}-based hierarchy.
        </p>
        <Styled.CompletionContainer>
          <h4>Group Order:</h4>
          <ol>
            {finalGroupOrder.map((groupName, _index) => (
              <Styled.GroupOrderItem key={groupName}>
                <Styled.BoldText>{groupName}</Styled.BoldText>
                <Styled.GroupCount>
                  ({groups.get(groupName)?.coasters.length || 0} coasters)
                </Styled.GroupCount>
              </Styled.GroupOrderItem>
            ))}
          </ol>
        </Styled.CompletionContainer>
      </div>
    )
  }

  return <div>Initializing hierarchical ranking...</div>
}

// Simple component for ranking coasters within a group
function SimpleCoasterRanking({
  coasters,
  onComplete,
  hideProgress = false,
}: {
  coasters: Coaster[]
  onComplete: (ranked: Coaster[]) => void
  hideProgress?: boolean
}) {
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

    const pairs: [Coaster, Coaster][] = []
    for (let i = 0; i < coasters.length - 1; i++) {
      for (let j = i + 1; j < coasters.length; j++) {
        pairs.push([coasters[i], coasters[j]])
      }
    }

    setRemainingComparisons(pairs)
    setTotalComparisons(pairs.length)
    setCurrentPair(pairs[0] || null)

    const initialRankings = new Map<string, number>()
    coasters.forEach(coaster => {
      initialRankings.set(coaster.id, 0)
    })
    setRankings(initialRankings)
  }, [coasters, onComplete])

  const handleChoice = (chosenCoaster: Coaster) => {
    if (!currentPair) return

    const newRankings = new Map(rankings)
    const currentWins = newRankings.get(chosenCoaster.id) || 0
    newRankings.set(chosenCoaster.id, currentWins + 1)
    setRankings(newRankings)

    const nextComparisons = remainingComparisons.slice(1)
    setRemainingComparisons(nextComparisons)

    if (nextComparisons.length > 0) {
      setCurrentPair(nextComparisons[0])
    } else {
      // Ranking complete
      const sortedCoasters = [...coasters].sort((a, b) => {
        const aWins = newRankings.get(a.id) || 0
        const bWins = newRankings.get(b.id) || 0

        if (aWins !== bWins) {
          return bWins - aWins
        }
        return a.id.localeCompare(b.id)
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
                  <Styled.ProgressBar progress={progress} />
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
            {currentPair[0].height && (
              <p>
                <Styled.BoldText>Height:</Styled.BoldText>{' '}
                {currentPair[0].height}m
              </p>
            )}
            {currentPair[0].speed && (
              <p>
                <Styled.BoldText>Speed:</Styled.BoldText> {currentPair[0].speed}{' '}
                km/h
              </p>
            )}
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
            {currentPair[1].height && (
              <p>
                <Styled.BoldText>Height:</Styled.BoldText>{' '}
                {currentPair[1].height}m
              </p>
            )}
            {currentPair[1].speed && (
              <p>
                <Styled.BoldText>Speed:</Styled.BoldText> {currentPair[1].speed}{' '}
                km/h
              </p>
            )}
          </Styled.CoasterDetails>
        </Styled.CoasterCard>
      </Styled.ComparisonArea>
    </div>
  )
}
