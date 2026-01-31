import { Button } from "../Button";
import * as Styled from "./PreRankingQuestion.styled";
import { Text } from "../Text";

interface PreRankingQuestionProps {
  coasterCount: number;
  onAnswer: (isPreRanked: boolean) => void;
  onCancel: () => void;
  existingCoasterCount?: number;
  filename?: string;
  hasExistingRankedData?: boolean;
}

/**
 * A modal component that asks users whether their uploaded coaster data is already ranked or needs to be ranked.
 *
 * @param coasterCount - The number of coasters being uploaded
 * @param onAnswer - Callback function called with the user's answer about whether data is pre-ranked
 * @param onCancel - Callback function called when the user cancels the operation
 * @param existingCoasterCount - Optional count of coasters already in the user's collection
 * @param filename - Optional name of the file being uploaded
 * @param hasExistingRankedData - Whether the user already has ranked coaster data. Defaults to false
 *
 * @returns A modal interface for determining how to handle uploaded coaster data
 */

export default function PreRankingQuestion({
  coasterCount,
  onAnswer,
  onCancel,
  existingCoasterCount = 0,
  filename,
  hasExistingRankedData = false,
}: PreRankingQuestionProps) {
  if (hasExistingRankedData) {
    return (
      <Styled.OverlayContainer>
        <Styled.QuestionCard>
          <Styled.QuestionHeader>
            <Text as="h2" bold colour="charcoal" fontSize="large" mb="tiny">
              Adding to existing ranking
            </Text>
            <Text as="p" colour="mediumGrey" fontSize="small">
              You're uploading {coasterCount} coasters
              {filename && ` from "${filename}"`}
            </Text>
          </Styled.QuestionHeader>

          <Styled.QuestionContent>
            <Text as="p" bold colour="charcoal" mb="medium">
              You already have {existingCoasterCount} ranked coasters in your
              collection.
            </Text>

            <Styled.ExplanationText>
              <Text bold>New coasters will be ranked:</Text> Your new uploads
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
              variant="success"
              aria-label="Continue with upload"
            >
              Continue Upload
            </Styled.ActionButton>

            <Button
              variant="disabled"
              onClick={onCancel}
              aria-label="Cancel upload"
            >
              Cancel upload
            </Button>
          </Styled.ButtonContainer>
        </Styled.QuestionCard>
      </Styled.OverlayContainer>
    );
  }

  return (
    <Styled.OverlayContainer>
      <Styled.QuestionCard>
        <Styled.QuestionHeader>
          <Text as="h2" bold colour="charcoal" fontSize="large" mb="tiny">
            Ranking order question
          </Text>
          <Text as="p" colour="mediumGrey" fontSize="small">
            You're uploading {coasterCount} coasters
            {filename && ` from "${filename}"`}
          </Text>
        </Styled.QuestionHeader>

        <Styled.QuestionContent>
          <Text as="p" bold colour="charcoal" mb="medium">
            Are these coasters already ranked in your preferred order?
          </Text>

          <Styled.ExplanationText
            as="p"
            colour="mediumGrey"
            fontSize="small"
            mb="small"
          >
            <Text as="span" bold colour="charcoal">
              If YES:
            </Text>{" "}
            The order in your file will be preserved, and new coasters will be
            ranked relative to this order.
          </Styled.ExplanationText>

          <Styled.ExplanationText>
            <Text bold>If NO:</Text> All coasters will be treated equally and
            you'll rank them through comparisons.
          </Styled.ExplanationText>
        </Styled.QuestionContent>

        <Styled.ButtonContainer>
          <Styled.ActionButton
            onClick={() => onAnswer(true)}
            variant="success"
            aria-label="Yes, these coasters are already ranked in order"
          >
            Yes, already ranked
          </Styled.ActionButton>

          <Styled.ActionButton
            onClick={() => onAnswer(false)}
            variant="default"
            aria-label="No, these coasters are not ranked"
          >
            No, not ranked
          </Styled.ActionButton>

          <Button
            variant="disabled"
            onClick={onCancel}
            aria-label="Cancel upload"
          >
            Cancel upload
          </Button>
        </Styled.ButtonContainer>
      </Styled.QuestionCard>
    </Styled.OverlayContainer>
  );
}
