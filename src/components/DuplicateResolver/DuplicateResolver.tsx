import React from 'react'
import {
  DuplicateMatch,
  formatMatchingFields,
} from '../../utils/duplicateDetection'
import * as Styled from './DuplicateResolver.styled'

export interface DuplicateResolution {
  action: 'keep-existing' | 'keep-new' | 'keep-both'
  duplicateIndex: number
}

interface DuplicateResolverProps {
  duplicates: DuplicateMatch[]
  onResolve: (resolutions: DuplicateResolution[]) => void
  onCancel: () => void
}

export default function DuplicateResolver({
  duplicates,
  onResolve,
  onCancel,
}: DuplicateResolverProps) {
  const [resolutions, setResolutions] = React.useState<
    Map<number, DuplicateResolution['action']>
  >(new Map())

  const handleResolution = (
    action: DuplicateResolution['action'],
    duplicateIndex: number
  ) => {
    setResolutions(prev => new Map(prev.set(duplicateIndex, action)))
  }

  const handleConfirm = () => {
    if (!canConfirm) {
      // Provide feedback to user about what's missing
      const missingCount = duplicates.length - resolutions.size
      alert(
        `Please choose an action for ${missingCount} more duplicate${
          missingCount !== 1 ? 's' : ''
        } before confirming.`
      )
      return
    }

    const resolvedDuplicates = duplicates.map((_, index) => ({
      duplicateIndex: index,
      action: resolutions.get(index) || 'keep-both',
    }))
    onResolve(resolvedDuplicates)
  }

  const canConfirm = duplicates.every((_, index) => resolutions.has(index))
  const missingChoices = duplicates.length - resolutions.size

  return (
    <Styled.DuplicateContainer>
      <Styled.DuplicateHeader>
        <Styled.DuplicateTitle>
          Potential Duplicate Coasters Detected
        </Styled.DuplicateTitle>
        <Styled.DuplicateDescription>
          We found {duplicates.length} potential duplicate
          {duplicates.length !== 1 ? 's' : ''} in your upload. Please review
          each match and choose how to handle them.
        </Styled.DuplicateDescription>
      </Styled.DuplicateHeader>

      {duplicates.map((duplicate, index) => (
        <Styled.DuplicateItem key={index}>
          <Styled.MatchInfo>
            <Styled.BoldText>Match {index + 1}:</Styled.BoldText>{' '}
            {formatMatchingFields(duplicate.matchingFields)} match (
            {duplicate.matchCount} of 4 fields)
          </Styled.MatchInfo>

          <Styled.CoasterComparison>
            <Styled.CoasterCard>
              <Styled.CoasterTitle>Existing Coaster</Styled.CoasterTitle>
              <Styled.CoasterDetails>
                <p>
                  <Styled.BoldText>Name:</Styled.BoldText>{' '}
                  {duplicate.existingCoaster.name}
                </p>
                <p>
                  <Styled.BoldText>Park:</Styled.BoldText>{' '}
                  {duplicate.existingCoaster.park}
                </p>
                <p>
                  <Styled.BoldText>Manufacturer:</Styled.BoldText>{' '}
                  {duplicate.existingCoaster.manufacturer}
                </p>
                <p>
                  <Styled.BoldText>Model:</Styled.BoldText>{' '}
                  {duplicate.existingCoaster.model}
                </p>
                <p>
                  <Styled.BoldText>Country:</Styled.BoldText>{' '}
                  {duplicate.existingCoaster.country || 'Not specified'}
                </p>
                {duplicate.existingCoaster.year && (
                  <p>
                    <Styled.BoldText>Year:</Styled.BoldText>{' '}
                    {duplicate.existingCoaster.year}
                  </p>
                )}
              </Styled.CoasterDetails>
            </Styled.CoasterCard>

            <Styled.VersusText>VS</Styled.VersusText>

            <Styled.CoasterCard>
              <Styled.CoasterTitle>New Coaster</Styled.CoasterTitle>
              <Styled.CoasterDetails>
                <p>
                  <Styled.BoldText>Name:</Styled.BoldText>{' '}
                  {duplicate.newCoaster.name}
                </p>
                <p>
                  <Styled.BoldText>Park:</Styled.BoldText>{' '}
                  {duplicate.newCoaster.park}
                </p>
                <p>
                  <Styled.BoldText>Manufacturer:</Styled.BoldText>{' '}
                  {duplicate.newCoaster.manufacturer}
                </p>
                <p>
                  <Styled.BoldText>Model:</Styled.BoldText>{' '}
                  {duplicate.newCoaster.model}
                </p>
                <p>
                  <Styled.BoldText>Country:</Styled.BoldText>{' '}
                  {duplicate.newCoaster.country || 'Not specified'}
                </p>
                {duplicate.newCoaster.year && (
                  <p>
                    <Styled.BoldText>Year:</Styled.BoldText>{' '}
                    {duplicate.newCoaster.year}
                  </p>
                )}
              </Styled.CoasterDetails>
            </Styled.CoasterCard>
          </Styled.CoasterComparison>

          <Styled.ButtonGroup>
            <Styled.DuplicateButton
              onClick={() => handleResolution('keep-existing', index)}
              style={{
                opacity: resolutions.get(index) === 'keep-existing' ? 1 : 0.7,
                fontWeight:
                  resolutions.get(index) === 'keep-existing'
                    ? 'bold'
                    : 'normal',
              }}
              variant='existing'
            >
              Keep Existing Only
            </Styled.DuplicateButton>
            <Styled.DuplicateButton
              onClick={() => handleResolution('keep-new', index)}
              style={{
                opacity: resolutions.get(index) === 'keep-new' ? 1 : 0.7,
                fontWeight:
                  resolutions.get(index) === 'keep-new' ? 'bold' : 'normal',
              }}
              variant='new'
            >
              Keep New Only
            </Styled.DuplicateButton>
            <Styled.DuplicateButton
              onClick={() => handleResolution('keep-both', index)}
              style={{
                opacity: resolutions.get(index) === 'keep-both' ? 1 : 0.7,
                fontWeight:
                  resolutions.get(index) === 'keep-both' ? 'bold' : 'normal',
              }}
              variant='both'
            >
              Keep Both (Different Experiences)
            </Styled.DuplicateButton>
          </Styled.ButtonGroup>
        </Styled.DuplicateItem>
      ))}

      <Styled.ActionButtons>
        <Styled.ActionButton
          aria-describedby={!canConfirm ? 'confirm-help-text' : undefined}
          onClick={handleConfirm}
          primary
        >
          {canConfirm ? 'Confirm Choices' : 'Confirm Choices'}
        </Styled.ActionButton>
        {!canConfirm && (
          <Styled.ProgressInfo id='confirm-help-text'>
            Please choose an action for {missingChoices} more duplicate
            {missingChoices !== 1 ? 's' : ''}
          </Styled.ProgressInfo>
        )}
        <Styled.ActionButton onClick={onCancel}>
          Cancel Upload
        </Styled.ActionButton>
      </Styled.ActionButtons>
    </Styled.DuplicateContainer>
  )
}
