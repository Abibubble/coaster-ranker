import * as Styled from './ProgressInfo.styled'

interface ProgressInfoProps {
  remainingComparisons?: number
  showProgressBar?: boolean
  title?: string
  totalComparisons?: number
  totalCoasters?: number
  rankedCoasters?: number
  showCoastersLeft?: boolean
}

export default function ProgressInfo({
  remainingComparisons,
  showProgressBar = false,
  title = 'Which coaster do you prefer?',
  totalComparisons,
  totalCoasters,
  rankedCoasters,
  showCoastersLeft = false,
}: ProgressInfoProps) {
  const progress =
    totalComparisons && remainingComparisons !== undefined
      ? Math.round(
          ((totalComparisons - remainingComparisons) / totalComparisons) * 100
        )
      : 0

  const coastersLeft =
    totalCoasters && rankedCoasters !== undefined
      ? totalCoasters - rankedCoasters
      : 0

  return (
    <Styled.ProgressContainer>
      <Styled.ProgressTitle>{title}</Styled.ProgressTitle>
      <Styled.ProgressText>
        {showCoastersLeft ? (
          <>
            <Styled.BoldText>{coastersLeft}</Styled.BoldText> coaster
            {coastersLeft !== 1 ? 's' : ''} left to rank
          </>
        ) : (
          <>
            <Styled.BoldText>{remainingComparisons || 0}</Styled.BoldText>{' '}
            comparisons remaining
          </>
        )}
      </Styled.ProgressText>
      {showProgressBar &&
        totalComparisons &&
        remainingComparisons !== undefined && (
          <Styled.ProgressBarContainer>
            <Styled.ProgressBar progress={progress} />
          </Styled.ProgressBarContainer>
        )}
    </Styled.ProgressContainer>
  )
}
