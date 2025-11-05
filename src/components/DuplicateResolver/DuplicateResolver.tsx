import React from 'react'
import {
  DuplicateMatch,
  formatMatchingFields,
} from '../../utils/fileProcessing/duplicateDetection'
import * as Styled from './DuplicateResolver.styled'
import { Text } from '../'
import { CoasterComparison } from '../CoasterComparison'

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
        <Text as='h3' colour='warningYellow' fontSize='large' mb='tiny'>
          Potential Duplicate Coasters Detected
        </Text>
        <Text as='p' colour='warningYellow' fontSize='small'>
          We found {duplicates.length} potential duplicate
          {duplicates.length !== 1 ? 's' : ''} in your upload. Please review
          each match and choose how to handle them.
        </Text>
      </Styled.DuplicateHeader>

      {duplicates.map((duplicate, index) => (
        <Styled.DuplicateItem key={index}>
          <Styled.MatchInfo as='p' fontSize='small' mb='small' mt='small'>
            <Text bold colour='darkerBlue'>
              Match {index + 1}:
            </Text>{' '}
            {formatMatchingFields(duplicate.matchingFields)} match (
            {duplicate.matchCount} of 4 fields)
          </Styled.MatchInfo>

          <CoasterComparison
            coaster1={duplicate.existingCoaster}
            coaster2={duplicate.newCoaster}
            clickable={false}
            coaster1Label='Existing Coaster'
            coaster2Label='New Coaster'
          />

          <Styled.ButtonGroup>
            <Styled.DuplicateButton
              onClick={() => handleResolution('keep-existing', index)}
              $isSelected={resolutions.get(index) === 'keep-existing'}
              variant='destructive'
            >
              Keep Existing Only
            </Styled.DuplicateButton>
            <Styled.DuplicateButton
              onClick={() => handleResolution('keep-new', index)}
              $isSelected={resolutions.get(index) === 'keep-new'}
              variant='success'
            >
              Keep New Only
            </Styled.DuplicateButton>
            <Styled.DuplicateButton
              onClick={() => handleResolution('keep-both', index)}
              $isSelected={resolutions.get(index) === 'keep-both'}
              variant='default'
            >
              Keep Both (Different Experiences)
            </Styled.DuplicateButton>
          </Styled.ButtonGroup>
        </Styled.DuplicateItem>
      ))}

      <Styled.ActionButtons>
        <Styled.DuplicateButton
          aria-describedby={!canConfirm ? 'confirm-help-text' : undefined}
          onClick={handleConfirm}
          variant='default'
        >
          {canConfirm ? 'Confirm Choices' : 'Confirm Choices'}
        </Styled.DuplicateButton>
        {!canConfirm && (
          <Styled.ProgressInfo id='confirm-help-text'>
            Please choose an action for {missingChoices} more duplicate
            {missingChoices !== 1 ? 's' : ''}
          </Styled.ProgressInfo>
        )}
        <Styled.DuplicateButton onClick={onCancel} variant='disabled'>
          Cancel Upload
        </Styled.DuplicateButton>
      </Styled.ActionButtons>
    </Styled.DuplicateContainer>
  )
}
