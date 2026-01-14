import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Text } from "../../components/Text";
import { Title } from "../../components/Title";
import { MainContent } from "../../components/MainContent";
import { useData } from "../../contexts/DataContext";
import { useSimpleRanking } from "../../hooks/useSimpleRanking";
import { RankingComparison } from "../../utils/ranking/newRankingEngine";
import { Coaster } from "../../types/data";
import * as Styled from "./SimpleRank.styled.js";

export const SimpleRank: React.FC = () => {
  const { uploadedData } = useData();
  const navigate = useNavigate();

  const {
    currentComparison,
    recordWinner,
    isComplete,
    finalRanking,
    progress,
  }: {
    currentComparison: RankingComparison | null;
    recordWinner: (winner: Coaster) => void;
    isComplete: boolean;
    finalRanking: Coaster[];
    progress: { totalComparisons: number; completedComparisons: number };
  } = useSimpleRanking(uploadedData?.coasters || []);

  // Debug logging
  React.useEffect(() => {
    console.log("SimpleRank component state:", {
      hasData: !!uploadedData,
      coasterCount: uploadedData?.coasters?.length || 0,
      coasters: uploadedData?.coasters?.map((c) => c.name) || [],
      currentComparison: currentComparison
        ? `${(currentComparison as RankingComparison).coasterA.name} vs ${
            (currentComparison as RankingComparison).coasterB.name
          }`
        : null,
      isComplete,
      finalRankingCount: finalRanking.length,
    });
  }, [uploadedData, currentComparison, isComplete, finalRanking]);

  // Redirect if no data
  if (!uploadedData || !uploadedData.coasters.length) {
    return (
      <MainContent>
        <Title>No Data Available</Title>
        <Text>Please upload coaster data first.</Text>
        <Button onClick={() => navigate("/upload")}>Upload Data</Button>
      </MainContent>
    );
  }

  // Show completion screen
  if (isComplete) {
    return (
      <MainContent>
        <Title>Ranking Complete!</Title>
        <Text mb="large">Here are your ranked coasters:</Text>

        <Styled.RankingList>
          {finalRanking.map((coaster, index) => (
            <Styled.RankingItem key={coaster.id}>
              <Text bold>
                #{index + 1}. {coaster.name}
              </Text>
              <Text colour="mediumGrey"> at {coaster.park}</Text>
            </Styled.RankingItem>
          ))}
        </Styled.RankingList>

        <Styled.ButtonContainer>
          <Button onClick={() => navigate("/view-coasters")}>
            View All Coasters
          </Button>
          <Button variant="default" onClick={() => navigate("/")}>
            Start Over
          </Button>
        </Styled.ButtonContainer>
      </MainContent>
    );
  }

  // Show comparison screen
  if (currentComparison) {
    const { coasterA, coasterB } = currentComparison;

    return (
      <MainContent>
        <Title>Which coaster do you prefer?</Title>

        <Styled.ProgressContainer>
          <Text colour="mediumGrey">
            Comparison {progress.completedComparisons + 1} of ~
            {progress.totalComparisons}
          </Text>
          <Styled.ProgressBar>
            <Styled.ProgressFill
              $progress={
                (progress.completedComparisons / progress.totalComparisons) *
                100
              }
            />
          </Styled.ProgressBar>
        </Styled.ProgressContainer>

        <Styled.ComparisonContainer>
          <Styled.CoasterCard>
            <Card onClick={() => recordWinner(coasterA)}>
              <Text as="h3" bold mb="small">
                {coasterA.name}
              </Text>
              <Text colour="mediumGrey" mb="small">
                at {coasterA.park}
              </Text>
              {coasterA.manufacturer && (
                <Text colour="darkGrey"> by {coasterA.manufacturer}</Text>
              )}
            </Card>
          </Styled.CoasterCard>

          <Styled.VersusText>
            <Text as="h4" colour="charcoal">
              VS
            </Text>
          </Styled.VersusText>

          <Styled.CoasterCard>
            <Card onClick={() => recordWinner(coasterB)}>
              <Text as="h3" bold mb="small">
                {coasterB.name}
              </Text>
              <Text colour="mediumGrey" mb="small">
                at {coasterB.park}
              </Text>
              {coasterB.manufacturer && (
                <Text colour="darkGrey"> by {coasterB.manufacturer}</Text>
              )}
            </Card>
          </Styled.CoasterCard>
        </Styled.ComparisonContainer>

        <Styled.ButtonContainer>
          <Button variant="default" onClick={() => navigate("/")}>
            Cancel Ranking
          </Button>
        </Styled.ButtonContainer>
      </MainContent>
    );
  }

  // Loading state
  return (
    <MainContent>
      <Title>Preparing Ranking...</Title>
      <Text>Setting up your coaster comparison...</Text>
      <Text mb="small">Debug Info:</Text>
      <Text>Coasters available: {uploadedData?.coasters?.length || 0}</Text>
      <Text>
        Current comparison:{" "}
        {currentComparison
          ? `${(currentComparison as RankingComparison).coasterA.name} vs ${
              (currentComparison as RankingComparison).coasterB.name
            }`
          : "None"}
      </Text>
      <Text>Is complete: {isComplete ? "Yes" : "No"}</Text>
      <Text>Check browser console for more details</Text>
    </MainContent>
  );
};
