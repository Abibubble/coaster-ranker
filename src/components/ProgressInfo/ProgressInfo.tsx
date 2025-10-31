import React from 'react'
import * as Styled from './ProgressInfo.styled'

interface ProgressInfoProps {
  remainingComparisons: number
  totalComparisons?: number
  title?: string
  showProgressBar?: boolean
}

export default function ProgressInfo({
  remainingComparisons,
  totalComparisons,
  title = 'Which coaster do you prefer?',
  showProgressBar = false,
}: ProgressInfoProps) {
  const progress = totalComparisons
    ? Math.round(
        ((totalComparisons - remainingComparisons) / totalComparisons) * 100
      )
    : 0

  return (
    <Styled.ProgressContainer>
      <Styled.ProgressTitle>{title}</Styled.ProgressTitle>
      <Styled.ProgressText>
        <Styled.BoldText>{remainingComparisons}</Styled.BoldText> comparisons
        remaining
      </Styled.ProgressText>
      {showProgressBar && totalComparisons && (
        <Styled.ProgressBarContainer>
          <Styled.ProgressBar progress={progress} />
        </Styled.ProgressBarContainer>
      )}
    </Styled.ProgressContainer>
  )
}
