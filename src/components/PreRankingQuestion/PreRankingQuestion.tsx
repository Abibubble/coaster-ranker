import * as Styled from './PreRankingQuestion.styled'

interface PreRankingQuestionProps {
  coasterCount: number
  onAnswer: (isPreRanked: boolean) => void
  onCancel: () => void
  filename?: string
}

export default function PreRankingQuestion({
  coasterCount,
  onAnswer,
  onCancel,
  filename,
}: PreRankingQuestionProps) {
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
