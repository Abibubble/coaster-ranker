import { useCallback, useEffect, useState } from 'react'
import { Coaster } from '../../types/data'
import {
  CoasterComparison,
  ProgressInfo,
  SimpleCoasterRanking,
  Text,
} from '../'
import {
  createCoasterGroups,
  finalizeGroupRanking,
  calculateGroupComparisons,
  type CoasterGroup,
  type GroupByType,
} from '../../utils/ranking/groupRankingUtils'
import * as Styled from './GroupRanking.styled'

interface GroupComparison {
  higherGroup: string
  lowerGroup: string
  higherGroupLowest: Coaster
  lowerGroupHighest: Coaster
  description: string
}

interface GroupRankingProps {
  coasters: Coaster[]
  groupBy: GroupByType
  onRankingComplete: (rankedCoasters: Coaster[]) => void
  onHierarchicalFallback: (attemptedMode: GroupByType) => void
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
      onRankingComplete(finalizeGroupRanking(groupOrder, groupMap))
    },
    [onRankingComplete]
  )

  // Initialize groups
  useEffect(() => {
    const result = createCoasterGroups({ coasters, groupBy })
    setGroups(result.groups)
    setFinalGroupOrder(result.groupNames)

    // Start with first group that has multiple coasters
    const firstGroupToRank = Array.from(result.groups.entries()).find(
      ([_, group]) => group.coasters.length > 1
    )

    if (firstGroupToRank) {
      setCurrentGroupRanking(firstGroupToRank[0])
    } else {
      // All groups have single coasters, finalize immediately
      setPhase('complete')
      onRankingComplete(finalizeGroupRanking(result.groupNames, result.groups))
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

      onRankingComplete(finalizeGroupRanking(finalGroupOrder, newGroups))
    }
  }

  const handleHierarchicalChoice = (chosenCoaster: Coaster) => {
    if (!currentComparison) return

    const { higherGroupLowest } = currentComparison

    // Clear the current comparison immediately
    setCurrentComparison(null)

    if (chosenCoaster.id === higherGroupLowest.id) {
      // Lower coaster from higher group is preferred - hierarchy is confirmed

      // Call validation after state updates
      setTimeout(() => {
        setPhase('complete')
        finalizeRanking(finalGroupOrder, groups)
      }, 10)
    } else {
      // Higher coaster from lower group is preferred - hierarchy fails, fallback to individual ranking

      // Call fallback after state updates
      setTimeout(() => {
        onHierarchicalFallback(groupBy)
      }, 10)
    }
  }

  if (phase === 'group-ranking' && currentGroupRanking) {
    const currentGroup = groups.get(currentGroupRanking)!

    // Calculate total remaining comparisons across all groups
    const totalRemainingComparisons = calculateGroupComparisons(groups)

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

        <CoasterComparison
          coaster1={currentComparison.higherGroupLowest}
          coaster2={currentComparison.lowerGroupHighest}
          onChoose1={() =>
            handleHierarchicalChoice(currentComparison.higherGroupLowest)
          }
          onChoose2={() =>
            handleHierarchicalChoice(currentComparison.lowerGroupHighest)
          }
        />
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
                <Text bold>{groupName}</Text>
                <Styled.GroupCount colour='mediumGrey' fontSize='small'>
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
