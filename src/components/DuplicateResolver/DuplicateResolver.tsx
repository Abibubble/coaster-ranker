import React from 'react'
import {
  DuplicateMatch,
  formatMatchingFields,
} from '../../utils/fileProcessing/duplicateDetection'
import * as Styled from './DuplicateResolver.styled'
import { Text } from '../Text'
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
        <Text as='h3' colour='darkGrey' fontSize='large' mb='tiny'>
          Potential Duplicate Coasters Detected
        </Text>
        <Text as='p' colour='mediumGrey' fontSize='body'>
          We found {duplicates.length} potential duplicate
          {duplicates.length !== 1 ? 's' : ''} in your upload. Please review
          each match and choose how to handle them.
        </Text>
      </Styled.DuplicateHeader>

      {duplicates.map((duplicate, index) => (
        <Styled.DuplicateItem key={index}>
          <Styled.MatchInfo>
            <Text bold colour='darkGrey' fontSize='body'>
              Match {index + 1}:{' '}
            </Text>
            <Text colour='mediumGrey' fontSize='body'>
              {formatMatchingFields(duplicate.matchingFields)} match (
              {duplicate.matchCount} of 4 fields)
            </Text>
          </Styled.MatchInfo>

          <Styled.ComparisonWrapper>
            <CoasterComparison
              coaster1={duplicate.existingCoaster}
              coaster2={duplicate.newCoaster}
              clickable={false}
              coaster1Label={`${
                duplicate.existingCoaster.name || 'Coaster 1'
              } (Existing)`}
              coaster2Label={`${
                duplicate.newCoaster.name || 'Coaster 2'
              } (New)`}
            />
          </Styled.ComparisonWrapper>

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
              Keep Both
            </Styled.DuplicateButton>
          </Styled.ButtonGroup>
        </Styled.DuplicateItem>
      ))}

      <Styled.ActionButtons>
        {!canConfirm && (
          <Styled.ProgressInfo id='confirm-help-text'>
            Please choose an action for {missingChoices} more duplicate
            {missingChoices !== 1 ? 's' : ''}
          </Styled.ProgressInfo>
        )}

        <Styled.ActionButtonsRow>
          <Styled.DuplicateButton
            aria-describedby={!canConfirm ? 'confirm-help-text' : undefined}
            onClick={handleConfirm}
            variant='default'
          >
            Confirm Choices
          </Styled.DuplicateButton>
          <Styled.DuplicateButton onClick={onCancel} variant='disabled'>
            Cancel Upload
          </Styled.DuplicateButton>
        </Styled.ActionButtonsRow>
      </Styled.ActionButtons>
    </Styled.DuplicateContainer>
  )
}
