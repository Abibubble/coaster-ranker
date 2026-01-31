import { useEffect, useState } from "react";
import { Coaster } from "../../types/data";
import { CoasterComparison } from "../CoasterComparison";
import { Text } from "../Text";
import * as Styled from "./SimpleCoasterRanking.styled";

export interface SimpleCoasterRankingProps {
  coasters: Coaster[];
  onComplete: (ranked: Coaster[]) => void;
  hideProgress?: boolean;
}

export default function SimpleCoasterRanking({
  coasters,
  onComplete,
  hideProgress = false,
}: SimpleCoasterRankingProps) {
  const [currentPair, setCurrentPair] = useState<[Coaster, Coaster] | null>(
    null,
  );
  const [remainingComparisons, setRemainingComparisons] = useState<
    [Coaster, Coaster][]
  >([]);
  const [rankings, setRankings] = useState<Map<string, number>>(new Map());
  const [totalComparisons, setTotalComparisons] = useState(0);

  useEffect(() => {
    if (coasters.length < 2) {
      onComplete(coasters);
      return;
    }

    const pairs: [Coaster, Coaster][] = [];
    for (let i = 0; i < coasters.length - 1; i++) {
      for (let j = i + 1; j < coasters.length; j++) {
        pairs.push([coasters[i], coasters[j]]);
      }
    }

    setRemainingComparisons(pairs);
    setTotalComparisons(pairs.length);
    setCurrentPair(pairs[0] || null);

    const initialRankings = new Map<string, number>();
    coasters.forEach((coaster) => {
      initialRankings.set(coaster.id, 0);
    });
    setRankings(initialRankings);
  }, [coasters, onComplete]);

  const handleChoice = (chosenCoaster: Coaster) => {
    if (!currentPair) return;

    const newRankings = new Map(rankings);
    const currentScore = newRankings.get(chosenCoaster.id) || 0;
    newRankings.set(chosenCoaster.id, currentScore + 1);
    setRankings(newRankings);

    const nextComparisons = remainingComparisons.slice(1);
    setRemainingComparisons(nextComparisons);

    if (nextComparisons.length > 0) {
      setCurrentPair(nextComparisons[0]);
    } else {
      const sortedCoasters = [...coasters].sort((a, b) => {
        const aScore = newRankings.get(a.id) || 0;
        const bScore = newRankings.get(b.id) || 0;

        if (aScore !== bScore) {
          return bScore - aScore;
        }
        return a.id.localeCompare(b.id);
      });

      onComplete(sortedCoasters);
    }
  };

  if (!currentPair) {
    return <div>Completing ranking...</div>;
  }

  return (
    <div>
      {!hideProgress && (
        <Styled.ComparisonProgress>
          <Text as="h4" bold colour="navyBlue" fontSize="large" mb="small">
            Which coaster do you prefer?
          </Text>

          <Styled.ProgressStats>
            <Styled.ProgressStat>
              <Styled.ProgressNumber bold colour="lightBlue" fontSize="large">
                {remainingComparisons.length}
              </Styled.ProgressNumber>
              <Styled.ProgressLabel
                colour="mutedGrey"
                fontSize="small"
                mt="fine"
              >
                Comparisons Remaining
              </Styled.ProgressLabel>
            </Styled.ProgressStat>

            <Styled.ProgressStat>
              <Styled.ProgressNumber bold colour="lightBlue" fontSize="large">
                {totalComparisons - remainingComparisons.length}
              </Styled.ProgressNumber>
              <Styled.ProgressLabel
                colour="mutedGrey"
                fontSize="small"
                mt="fine"
              >
                Completed
              </Styled.ProgressLabel>
            </Styled.ProgressStat>
          </Styled.ProgressStats>

          {(() => {
            const progress = Math.round(
              ((totalComparisons - remainingComparisons.length) /
                totalComparisons) *
                100,
            );
            return (
              <>
                <Styled.ProgressBarContainer>
                  <Styled.ProgressBar $progress={progress} />
                </Styled.ProgressBarContainer>
                <Text as="p" colour="slateGrey" fontSize="small" mt="tiny">
                  {progress}% Complete
                </Text>
              </>
            );
          })()}
        </Styled.ComparisonProgress>
      )}

      <CoasterComparison
        coaster1={currentPair[0]}
        coaster2={currentPair[1]}
        onChoose1={() => handleChoice(currentPair[0])}
        onChoose2={() => handleChoice(currentPair[1])}
      />
    </div>
  );
}
