import React, { useState, useEffect } from 'react'
import { Coaster } from '../../types/data'
import { useData } from '../../contexts/DataContext'
import { Button } from '../Button'
import { Link } from '../Link'
import { Text } from '../Text'
import * as Styled from './RankingComplete.styled'

interface RankingCompleteProps {
  rankedCoasters: Coaster[]
  onRankAgain: () => void
}

export default function RankingComplete({
  rankedCoasters,
  onRankAgain,
}: RankingCompleteProps) {
  const { uploadedData, setUploadedData } = useData()
  const [isEditing, setIsEditing] = useState(false)
  const [coastersOrder, setCoastersOrder] = useState<Coaster[]>(rankedCoasters)

  // Derive the current ranked coasters from context data if available
  const getCurrentRankedCoasters = (): Coaster[] => {
    if (
      !uploadedData?.rankingMetadata?.isRanked ||
      !uploadedData?.rankingMetadata?.rankedCoasters
    ) {
      return rankedCoasters
    }

    // Get coasters sorted by their rankPosition from context data
    const contextCoasters = uploadedData.coasters
      .filter(coaster => coaster.rankPosition !== undefined)
      .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0))

    return contextCoasters.length > 0 ? contextCoasters : rankedCoasters
  }

  const currentRankedCoasters = getCurrentRankedCoasters()

  // Initialize coastersOrder on mount only
  useEffect(() => {
    setCoastersOrder([...rankedCoasters])
  }, [rankedCoasters])

  // Update coastersOrder when we're not editing and the context data changes significantly
  useEffect(() => {
    if (
      !isEditing &&
      uploadedData?.rankingMetadata?.isRanked &&
      uploadedData.coasters
    ) {
      const contextCoasters = uploadedData.coasters
        .filter(coaster => coaster.rankPosition !== undefined)
        .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0))

      if (contextCoasters.length > 0) {
        setCoastersOrder([...contextCoasters])
      }
    }
  }, [
    uploadedData?.rankingMetadata?.isRanked,
    uploadedData?.coasters,
    isEditing,
  ])

  const handleEditClick = () => {
    setIsEditing(true)
    setCoastersOrder([...currentRankedCoasters])
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setCoastersOrder([...currentRankedCoasters])
  }

  const handleSaveChanges = () => {
    if (uploadedData) {
      // Update the coasters array in uploadedData with new ranking order
      const updatedCoasters = [...uploadedData.coasters]
      coastersOrder.forEach((coaster, index) => {
        const coasterIndex = updatedCoasters.findIndex(c => c.id === coaster.id)
        if (coasterIndex !== -1) {
          updatedCoasters[coasterIndex] = {
            ...coaster,
            rankPosition: index + 1,
          }
        }
      })

      // Also update the rankedCoasters in metadata to match new order
      const updatedMetadata = uploadedData.rankingMetadata
        ? {
            ...uploadedData.rankingMetadata,
            rankedCoasters: coastersOrder.map(coaster => coaster.id),
          }
        : undefined

      const updatedData = {
        ...uploadedData,
        coasters: updatedCoasters,
        rankingMetadata: updatedMetadata,
      }

      setUploadedData(updatedData)
    }
    setIsEditing(false)
  }

  const moveCoaster = (fromIndex: number, toIndex: number) => {
    const newOrder = [...coastersOrder]
    const [movedCoaster] = newOrder.splice(fromIndex, 1)
    newOrder.splice(toIndex, 0, movedCoaster)
    setCoastersOrder(newOrder)
  }

  const handleKeyDown = (
    event: React.KeyboardEvent,
    coaster: Coaster,
    index: number
  ) => {
    if (event.key === 'ArrowUp' && index > 0) {
      event.preventDefault()
      moveCoaster(index, index - 1)
    } else if (event.key === 'ArrowDown' && index < coastersOrder.length - 1) {
      event.preventDefault()
      moveCoaster(index, index + 1)
    }
  }

  const displayCoasters = isEditing ? coastersOrder : currentRankedCoasters

  return (
    <Styled.RankingComplete>
      <Text as='h2' colour='successGreen' mb='small'>
        Ranking Complete!
      </Text>
      <Text as='p' colour='successGreen' mb='small'>
        Your coasters have been ranked based on your preferences!{' '}
        {displayCoasters.length > 10
          ? "Here's your top 10:"
          : "Here's your final ranking:"}
      </Text>

      {isEditing ? (
        <Styled.EditableList>
          <Styled.EditInstructions
            as='p'
            center
            colour='mediumGrey'
            fontSize='small'
            mb='medium'
          >
            Use the arrow buttons or arrow keys to reorder your coasters. Press
            Tab to navigate between items.
          </Styled.EditInstructions>
          <ol>
            {displayCoasters.slice(0, 10).map((coaster, index) => (
              <Styled.EditableItem
                key={coaster.id}
                tabIndex={0}
                onKeyDown={event => handleKeyDown(event, coaster, index)}
                role='listitem'
                aria-label={`${coaster.name} at ${coaster.park}, position ${
                  index + 1
                } of ${
                  displayCoasters.length
                }. Use arrow keys or buttons to reorder.`}
              >
                <Styled.Position bold colour='darkGrey'>
                  {index + 1}.
                </Styled.Position>
                <Styled.CoasterInfo>
                  <Text bold>{coaster.name}</Text> at {coaster.park}
                </Styled.CoasterInfo>
                <Styled.MoveButtons>
                  <Styled.MoveButton
                    onClick={() => {
                      if (index > 0) {
                        moveCoaster(index, index - 1)
                      }
                    }}
                    aria-label={`Move ${coaster.name} up one position`}
                    title={`Move ${coaster.name} up one position`}
                  >
                    ↑
                  </Styled.MoveButton>
                  <Styled.MoveButton
                    onClick={() => {
                      if (index < displayCoasters.length - 1) {
                        moveCoaster(index, index + 1)
                      }
                    }}
                    aria-label={`Move ${coaster.name} down one position`}
                    title={`Move ${coaster.name} down one position`}
                  >
                    ↓
                  </Styled.MoveButton>
                </Styled.MoveButtons>
              </Styled.EditableItem>
            ))}
          </ol>
          <Styled.ButtonContainer>
            <Button variant='success' onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button variant='disabled' onClick={handleCancelEdit}>
              Cancel
            </Button>
          </Styled.ButtonContainer>
        </Styled.EditableList>
      ) : (
        <Styled.ResultsList>
          <ol>
            {displayCoasters.slice(0, 10).map((coaster, _index) => (
              <li key={coaster.id}>
                <Text bold>{coaster.name}</Text> at {coaster.park}
              </li>
            ))}
          </ol>
          <Styled.ViewAllLink>
            <Link href='/view-coasters'>
              {displayCoasters.length > 10
                ? `View all ${displayCoasters.length} ranked coasters`
                : `View ${displayCoasters.length} ranked coaster${
                    displayCoasters.length === 1 ? '' : 's'
                  }`}
            </Link>
          </Styled.ViewAllLink>
        </Styled.ResultsList>
      )}

      <Text as='p' colour='mediumGrey' fontSize='small' mb='small'>
        This ranking order will be used when you download your coaster
        collection.
      </Text>
      {!isEditing && (
        <Styled.ButtonContainer>
          <Button onClick={handleEditClick}>Adjust Rankings</Button>
          <Button as='a' href='/download'>
            Download rankings
          </Button>
          <Button variant='destructive' onClick={onRankAgain}>
            Rank again
          </Button>
        </Styled.ButtonContainer>
      )}
    </Styled.RankingComplete>
  )
}
