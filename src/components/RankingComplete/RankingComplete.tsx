import React, { useState, useEffect } from 'react'
import { Coaster } from '../../types/data'
import { useData } from '../../contexts/DataContext'
import * as Styled from '../../pages/Rank/Rank.styled'
import * as LocalStyled from './RankingComplete.styled'

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
      console.log('🔄 SAVING MANUAL RANKING ADJUSTMENTS')
      console.log(
        '📊 Original order:',
        currentRankedCoasters.map(c => c.name)
      )
      console.log(
        '📊 New order:',
        coastersOrder.map(c => c.name)
      )

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

      console.log('💾 Saving updated data to context')
      setUploadedData(updatedData)

      console.log('✅ Manual ranking adjustment saved successfully')
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
      <h2>Ranking Complete!</h2>
      <p>
        Your coasters have been ranked based on your preferences! Here's your
        final ranking:
      </p>

      {!isEditing && (
        <LocalStyled.ButtonContainer>
          <LocalStyled.AdjustButton onClick={handleEditClick}>
            Adjust Rankings
          </LocalStyled.AdjustButton>
        </LocalStyled.ButtonContainer>
      )}

      {isEditing ? (
        <LocalStyled.EditableList>
          <LocalStyled.EditInstructions>
            Use the arrow buttons or arrow keys to reorder your coasters. Press
            Tab to navigate between items.
          </LocalStyled.EditInstructions>
          <ol>
            {displayCoasters.slice(0, 10).map((coaster, index) => (
              <LocalStyled.EditableItem
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
                <LocalStyled.Position>{index + 1}.</LocalStyled.Position>
                <LocalStyled.CoasterInfo>
                  <LocalStyled.BoldText>{coaster.name}</LocalStyled.BoldText> at{' '}
                  {coaster.park}
                </LocalStyled.CoasterInfo>
                <LocalStyled.MoveButtons>
                  <LocalStyled.MoveButton
                    onClick={() => moveCoaster(index, Math.max(0, index - 1))}
                    disabled={index === 0}
                    aria-label={`Move ${coaster.name} up one position`}
                    title={`Move ${coaster.name} up one position`}
                  >
                    ↑
                  </LocalStyled.MoveButton>
                  <LocalStyled.MoveButton
                    onClick={() =>
                      moveCoaster(
                        index,
                        Math.min(displayCoasters.length - 1, index + 1)
                      )
                    }
                    disabled={index === displayCoasters.length - 1}
                    aria-label={`Move ${coaster.name} down one position`}
                    title={`Move ${coaster.name} down one position`}
                  >
                    ↓
                  </LocalStyled.MoveButton>
                </LocalStyled.MoveButtons>
              </LocalStyled.EditableItem>
            ))}
          </ol>
          <LocalStyled.ButtonContainer>
            <LocalStyled.SaveButton onClick={handleSaveChanges}>
              Save Changes
            </LocalStyled.SaveButton>
            <LocalStyled.CancelButton onClick={handleCancelEdit}>
              Cancel
            </LocalStyled.CancelButton>
          </LocalStyled.ButtonContainer>
        </LocalStyled.EditableList>
      ) : (
        <LocalStyled.ResultsList>
          <ol>
            {displayCoasters.slice(0, 10).map((coaster, _index) => (
              <li key={coaster.id}>
                <LocalStyled.BoldText>{coaster.name}</LocalStyled.BoldText> at{' '}
                {coaster.park}
              </li>
            ))}
            {displayCoasters.length > 10 && (
              <LocalStyled.MoreCoastersText>
                ...and {displayCoasters.length - 10} more
              </LocalStyled.MoreCoastersText>
            )}
          </ol>
        </LocalStyled.ResultsList>
      )}

      <LocalStyled.Instructions>
        This ranking order will be used when you download your coaster
        collection.
      </LocalStyled.Instructions>
      <Styled.RestartButton onClick={onRankAgain}>
        Rank Again
      </Styled.RestartButton>
    </Styled.RankingComplete>
  )
}
