import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CoasterComparison,
  Link,
  MainContent,
  ProgressInfo,
  RankingComplete,
  Text,
  Title,
} from "../../components";
import { useData } from "../../contexts/DataContext";
import { useSimpleRanking } from "../../hooks/useSimpleRanking";
import { RankingComparison } from "../../utils/ranking/newRankingEngine";
import { Coaster } from "../../types/data";
import * as Styled from "./Rank.styled";

export const Rank: React.FC = () => {
  const { uploadedData } = useData();
  const navigate = useNavigate();

  console.log("Rank page rendering, uploadedData:", uploadedData);

  const {
    currentComparison,
    recordWinner,
    isComplete,
    finalRanking,
    rankedCoasterCount,
    progress,
  }: {
    currentComparison: RankingComparison | null;
    recordWinner: (winner: Coaster) => void;
    isComplete: boolean;
    finalRanking: Coaster[];
    rankedCoasterCount: number;
    progress: { totalComparisons: number; completedComparisons: number };
  } = useSimpleRanking(uploadedData?.coasters || []);

  console.log("Rank page state:", {
    currentComparison,
    isComplete,
    finalRankingLength: finalRanking.length,
    rankedCoasterCount,
    progress,
  });

  // Redirect if no data
  if (!uploadedData || !uploadedData.coasters.length) {
    return (
      <MainContent>
        <Title>Rank Your Coasters</Title>
        <Styled.NoDataSection>
          <Text as="p">
            No coaster data uploaded yet. Please visit the{" "}
            <Link href="/upload" dark>
              Upload page
            </Link>{" "}
            to upload your coaster experiences. You'll need at least 2 coasters
            to start ranking.
          </Text>
        </Styled.NoDataSection>
      </MainContent>
    );
  }

  const { coasters, filename, uploadedAt } = uploadedData;

  // Show single coaster message if only 1 coaster
  if (coasters.length === 1) {
    return (
      <MainContent>
        <Title>Rank Your Coasters</Title>
        <section>
          <Styled.UploadSummary aria-label="Upload summary">
            <Text as="p">
              <Text bold>File:</Text> {filename}
            </Text>
            <Text as="p">
              <Text bold>Uploaded:</Text> {uploadedAt.toLocaleDateString()} at{" "}
              {uploadedAt.toLocaleTimeString()}
            </Text>
            <Text as="p">
              <Text bold>Total Coasters:</Text> {coasters.length}
            </Text>
          </Styled.UploadSummary>

          <Text as="p">
            You need at least 2 coasters to start ranking. Please upload more
            coaster data to begin the ranking process.
          </Text>
          <Button onClick={() => navigate("/upload")} variant="default">
            Upload More Coasters
          </Button>
        </section>
      </MainContent>
    );
  }

  // Show completion screen
  if (isComplete && finalRanking.length > 0) {
    return (
      <MainContent>
        <Title>Ranking Complete!</Title>
        <Styled.RankingContainer>
          <RankingComplete
            rankedCoasters={finalRanking}
            onRankAgain={() => window.location.reload()}
          />
        </Styled.RankingContainer>
      </MainContent>
    );
  }

  // Show current comparison
  if (currentComparison) {
    return (
      <MainContent>
        <Title>Rank Your Coasters</Title>
        <Styled.RankingContainer>
          <ProgressInfo
            totalCoasters={coasters.length}
            rankedCoasters={rankedCoasterCount}
            showCoastersLeft={true}
            showProgressBar={true}
            totalComparisons={progress.totalComparisons}
            remainingComparisons={
              progress.totalComparisons - progress.completedComparisons
            }
          />

          <CoasterComparison
            coaster1={currentComparison.coasterA}
            coaster2={currentComparison.coasterB}
            onChoose1={() => recordWinner(currentComparison.coasterA)}
            onChoose2={() => recordWinner(currentComparison.coasterB)}
          />
        </Styled.RankingContainer>
      </MainContent>
    );
  }

  // Show preparing screen
  return (
    <MainContent>
      <Title>Rank Your Coasters</Title>
      <Styled.RankingContainer>
        <Styled.PreparingContainer>
          <Text as="p">Preparing ranking...</Text>
        </Styled.PreparingContainer>
      </Styled.RankingContainer>
    </MainContent>
  );
};
