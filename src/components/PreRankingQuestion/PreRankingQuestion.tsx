import { Button } from '../Button'
import * as Styled from './PreRankingQuestion.styled'
import { Text } from '../'

interface PreRankingQuestionProps {
  coasterCount: number
  onAnswer: (isPreRanked: boolean) => void
  onCancel: () => void
  existingCoasterCount?: number
  filename?: string
  hasExistingRankedData?: boolean
}

export default function PreRankingQuestion({
  coasterCount,
  onAnswer,
  onCancel,
  existingCoasterCount = 0,
  filename,
  hasExistingRankedData = false,
}: PreRankingQuestionProps) {
  // If there's existing ranked data, show a warning instead of a question
  if (hasExistingRankedData) {
    return (
      <Styled.OverlayContainer>
        <Styled.QuestionCard>
          <Styled.QuestionHeader>
            <Text as='h2' bold colour='charcoal' fontSize='large' mb='tiny'>
              Adding to existing ranking
            </Text>
            <Text as='p' colour='mediumGrey' fontSize='small'>
              You're uploading {coasterCount} coasters
              {filename && ` from "${filename}"`}
            </Text>
          </Styled.QuestionHeader>

          <Styled.QuestionContent>
            <Text as='p' bold colour='charcoal' mb='medium'>
              You already have {existingCoasterCount} ranked coasters in your
              collection.
            </Text>

            <Styled.ExplanationText>
              <strong>New coasters will be ranked:</strong> Your new uploads
              will be compared against your existing rankings to find their
              proper position.
            </Styled.ExplanationText>

            <Styled.ExplanationText>
              This ensures your complete collection maintains accurate ranking
              order.
            </Styled.ExplanationText>
          </Styled.QuestionContent>

          <Styled.ButtonContainer>
            <Styled.ActionButton
              onClick={() => onAnswer(false)}
              variant='success'
              aria-label='Continue with upload'
            >
              Continue Upload
            </Styled.ActionButton>

            <Button
              variant='disabled'
              onClick={onCancel}
              aria-label='Cancel upload'
            >
              Cancel upload
            </Button>
          </Styled.ButtonContainer>
        </Styled.QuestionCard>
      </Styled.OverlayContainer>
    )
  }

  // Original question for when there's no existing ranked data
  return (
    <Styled.OverlayContainer>
      <Styled.QuestionCard>
        <Styled.QuestionHeader>
          <Text as='h2' bold colour='charcoal' fontSize='large' mb='tiny'>
            Ranking order question
          </Text>
          <Text as='p' colour='mediumGrey' fontSize='small'>
            You're uploading {coasterCount} coasters
            {filename && ` from "${filename}"`}
          </Text>
        </Styled.QuestionHeader>

        <Styled.QuestionContent>
          <Text as='p' bold colour='charcoal' mb='medium'>
            Are these coasters already ranked in your preferred order?
          </Text>

          <Styled.ExplanationText
            as='p'
            colour='mediumGrey'
            fontSize='small'
            mb='small'
          >
            <Text as='span' bold colour='charcoal'>
              If YES:
            </Text>{' '}
            The order in your file will be preserved, and new coasters will be
            ranked relative to this order.
          </Styled.ExplanationText>

          <Styled.ExplanationText>
            <strong>If NO:</strong> All coasters will be treated equally and
            you'll rank them through comparisons.
          </Styled.ExplanationText>
        </Styled.QuestionContent>

        <Styled.ButtonContainer>
          <Styled.ActionButton
            onClick={() => onAnswer(true)}
            variant='success'
            aria-label='Yes, these coasters are already ranked in order'
          >
            Yes, already ranked
          </Styled.ActionButton>

          <Styled.ActionButton
            onClick={() => onAnswer(false)}
            variant='default'
            aria-label='No, these coasters are not ranked'
          >
            No, not ranked
          </Styled.ActionButton>

          <Button
            variant='disabled'
            onClick={onCancel}
            aria-label='Cancel upload'
          >
            Cancel upload
          </Button>
        </Styled.ButtonContainer>
      </Styled.QuestionCard>
    </Styled.OverlayContainer>
  )
}
