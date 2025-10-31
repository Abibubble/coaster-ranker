import * as Styled from './PreRankingQuestion.styled'

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
            <Styled.QuestionTitle>
              Adding to existing ranking
            </Styled.QuestionTitle>
            <Styled.QuestionSubtitle>
              You're uploading {coasterCount} coasters
              {filename && ` from "${filename}"`}
            </Styled.QuestionSubtitle>
          </Styled.QuestionHeader>

          <Styled.QuestionContent>
            <Styled.QuestionText>
              You already have {existingCoasterCount} ranked coasters in your
              collection.
            </Styled.QuestionText>

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
              $primary={true}
              aria-label='Continue with upload'
            >
              Continue Upload
            </Styled.ActionButton>

            <Styled.CancelButton onClick={onCancel} aria-label='Cancel upload'>
              Cancel upload
            </Styled.CancelButton>
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
          <Styled.QuestionTitle>Ranking order question</Styled.QuestionTitle>
          <Styled.QuestionSubtitle>
            You're uploading {coasterCount} coasters
            {filename && ` from "${filename}"`}
          </Styled.QuestionSubtitle>
        </Styled.QuestionHeader>

        <Styled.QuestionContent>
          <Styled.QuestionText>
            Are these coasters already ranked in your preferred order?
          </Styled.QuestionText>

          <Styled.ExplanationText>
            <strong>If YES:</strong> The order in your file will be preserved,
            and new coasters will be ranked relative to this order.
          </Styled.ExplanationText>

          <Styled.ExplanationText>
            <strong>If NO:</strong> All coasters will be treated equally and
            you'll rank them through comparisons.
          </Styled.ExplanationText>
        </Styled.QuestionContent>

        <Styled.ButtonContainer>
          <Styled.ActionButton
            onClick={() => onAnswer(true)}
            $primary={true}
            aria-label='Yes, these coasters are already ranked in order'
          >
            Yes, already ranked
          </Styled.ActionButton>

          <Styled.ActionButton
            onClick={() => onAnswer(false)}
            aria-label='No, these coasters are not ranked'
          >
            No, not ranked
          </Styled.ActionButton>

          <Styled.CancelButton onClick={onCancel} aria-label='Cancel upload'>
            Cancel upload
          </Styled.CancelButton>
        </Styled.ButtonContainer>
      </Styled.QuestionCard>
    </Styled.OverlayContainer>
  )
}
