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
  const { uploadedData, markRankingComplete, resetRanking } = useData();
  const navigate = useNavigate();

  // Check if ranking is needed - should rank if there are any unranked coasters
  const hasUnrankedCoasters =
    uploadedData?.coasters?.some(
      (c) => !c.isPreRanked && c.rankPosition === undefined
    ) || false;

  // Only consider ranking complete if metadata says ranked AND no unranked coasters exist
  const isAlreadyRanked =
    uploadedData?.rankingMetadata?.isRanked && !hasUnrankedCoasters;

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

  // Mark ranking as complete when ranking finishes
  React.useEffect(() => {
    if (isComplete && finalRanking.length > 0 && !isAlreadyRanked) {
      markRankingComplete(finalRanking);
    }
  }, [isComplete, finalRanking, markRankingComplete, isAlreadyRanked]);

  // If already ranked, show completion screen with existing ranking
  if (isAlreadyRanked && uploadedData?.rankingMetadata?.rankedCoasters) {
    const rankedCoasters = uploadedData.rankingMetadata.rankedCoasters
      .map((id) => uploadedData.coasters.find((coaster) => coaster.id === id))
      .filter(Boolean) as Coaster[];

    return (
      <MainContent>
        <Title>Ranking Complete!</Title>
        <Styled.RankingContainer>
          <RankingComplete
            rankedCoasters={rankedCoasters}
            onRankAgain={() => {
              // Confirm before resetting rankings
              const confirmed = window.confirm(
                "Are you sure you want to rank again? This will erase all your current rankings and you'll start from scratch."
              );

              if (confirmed) {
                // Reset ranking state and reload
                resetRanking();
                window.location.reload();
              }
            }}
          />
        </Styled.RankingContainer>
      </MainContent>
    );
  }

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
            onRankAgain={() => {
              // Confirm before resetting rankings
              const confirmed = window.confirm(
                "Are you sure you want to rank again? This will erase all your current rankings and you'll start from scratch"
              );

              if (confirmed) {
                // Reset ranking state and reload
                resetRanking();
                window.location.reload();
              }
            }}
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
