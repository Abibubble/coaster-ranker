import * as Styled from './ProgressInfo.styled'
import { Text } from '../Text'

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
      <Text as='h4' bold colour='slateGrey' fontSize='large' mb='small'>
        {title}
      </Text>
      <Text as='p' colour='mutedGrey'>
        {showCoastersLeft ? (
          <>
            <Text bold colour='blue' fontSize='large'>
              {coastersLeft}
            </Text>{' '}
            coaster
            {coastersLeft !== 1 ? 's' : ''} left to rank
          </>
        ) : (
          <>
            <Text bold colour='blue' fontSize='large'>
              {remainingComparisons || 0}
            </Text>{' '}
            comparisons remaining
          </>
        )}
      </Text>
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
