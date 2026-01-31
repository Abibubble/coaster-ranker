import * as Styled from "./ProgressInfo.styled";
import { Text } from "../Text";

interface ProgressInfoProps {
  remainingComparisons?: number;
  showProgressBar?: boolean;
  title?: string;
  totalComparisons?: number;
  totalCoasters?: number;
  rankedCoasters?: number;
  showCoastersLeft?: boolean;
}

/**
 * A component that displays progress information during the coaster ranking process with optional progress bar.
 *
 * @param remainingComparisons - Optional number of comparisons still needed
 * @param showProgressBar - Whether to display a visual progress bar. Defaults to false
 * @param title - The title text to display. Defaults to "Which coaster do you prefer?"
 * @param totalComparisons - Optional total number of comparisons needed for complete ranking
 * @param totalCoasters - Optional total number of coasters being ranked
 * @param rankedCoasters - Optional number of coasters already ranked
 * @param showCoastersLeft - Whether to show the count of remaining coasters. Defaults to false
 *
 * @returns A progress tracking component with optional visual progress bar and status information
 */

export default function ProgressInfo({
  remainingComparisons,
  showProgressBar = false,
  title = "Which coaster do you prefer?",
  totalComparisons,
  totalCoasters,
  rankedCoasters,
  showCoastersLeft = false,
}: ProgressInfoProps) {
  const progress =
    totalComparisons && remainingComparisons !== undefined
      ? Math.round(
          ((totalComparisons - remainingComparisons) / totalComparisons) * 100,
        )
      : 0;

  const coastersLeft =
    totalCoasters && rankedCoasters !== undefined
      ? totalCoasters - rankedCoasters
      : 0;

  return (
    <Styled.ProgressContainer>
      <Text as="h4" bold colour="slateGrey" fontSize="large" mb="small">
        {title}
      </Text>
      <Text as="p" colour="mutedGrey">
        {showCoastersLeft ? (
          <>
            <Text bold colour="blue" fontSize="large">
              {coastersLeft}
            </Text>{" "}
            coaster
            {coastersLeft !== 1 ? "s" : ""} left to rank
          </>
        ) : (
          <>
            <Text bold colour="blue" fontSize="large">
              {remainingComparisons || 0}
            </Text>{" "}
            comparisons remaining
          </>
        )}
      </Text>
      {showProgressBar &&
        totalComparisons &&
        remainingComparisons !== undefined && (
          <Styled.ProgressBarContainer>
            <Styled.ProgressBar $progress={progress} />
          </Styled.ProgressBarContainer>
        )}
    </Styled.ProgressContainer>
  );
}
