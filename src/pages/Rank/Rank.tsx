import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CoasterComparison,
  Link,
  MainContent,
  ProgressInfo,
  RankingComplete,
  RideTypeToggle,
  Text,
  Title,
  UndoLastChoice,
} from "../../components";
import { useData } from "../../contexts/DataContext";
import { useSimpleRanking } from "../../hooks/useSimpleRanking";
import {
  RankingComparison,
  ComparisonResult,
} from "../../utils/ranking/newRankingEngine.util";
import { Coaster, RideType } from "../../types/data";
import * as Styled from "./Rank.styled";

export const Rank: React.FC = () => {
  const { uploadedData, darkRideData, markRankingComplete, resetRanking } =
    useData();
  const navigate = useNavigate();
  const [rideType, setRideType] = React.useState<RideType>("coaster");

  // Get current data based on ride type
  const currentData = rideType === "coaster" ? uploadedData : darkRideData;
  const rideTypeLabel = rideType === "coaster" ? "Coasters" : "Dark Rides";
  const rideSingularLabel = rideType === "coaster" ? "coaster" : "dark ride";
  const ridePluralLabel = rideType === "coaster" ? "coasters" : "dark rides";

  const hasUnrankedCoasters =
    currentData?.coasters?.some(
      (c) => !c.isPreRanked && c.rankPosition === undefined,
    ) || false;

  const isAlreadyRanked =
    currentData?.rankingMetadata?.isRanked && !hasUnrankedCoasters;

  const {
    currentComparison,
    recordWinner,
    isComplete,
    finalRanking,
    rankedCoasterCount,
    progress,
    lastComparison,
    canUndo,
    undo,
  }: {
    currentComparison: RankingComparison | null;
    recordWinner: (winner: Coaster) => void;
    isComplete: boolean;
    finalRanking: Coaster[];
    rankedCoasterCount: number;
    progress: { totalComparisons: number; completedComparisons: number };
    lastComparison: ComparisonResult | null;
    canUndo: boolean;
    undo: () => void;
  } = useSimpleRanking(currentData?.coasters || []);

  React.useEffect(() => {
    if (isComplete && finalRanking.length > 0 && !isAlreadyRanked) {
      markRankingComplete(finalRanking, rideType);
    }
  }, [
    isComplete,
    finalRanking,
    markRankingComplete,
    isAlreadyRanked,
    rideType,
  ]);

  if (isAlreadyRanked && currentData?.rankingMetadata?.rankedCoasters) {
    const rankedCoasters = currentData.rankingMetadata.rankedCoasters
      .map((id) => currentData.coasters.find((coaster) => coaster.id === id))
      .filter(Boolean) as Coaster[];

    return (
      <MainContent>
        <Title>Rank Your {rideTypeLabel}</Title>
        <section style={{ marginBottom: "1.5rem" }}>
          <RideTypeToggle value={rideType} onChange={setRideType} />
        </section>
        <Styled.RankingContainer>
          <RankingComplete
            rankedCoasters={rankedCoasters}
            onRankAgain={() => {
              const confirmed = window.confirm(
                `Are you sure you want to rank again? This will erase all your current rankings and you'll start from scratch.`,
              );

              if (confirmed) {
                resetRanking(rideType);
                window.location.reload();
              }
            }}
          />
        </Styled.RankingContainer>
      </MainContent>
    );
  }

  if (!currentData || !currentData.coasters.length) {
    return (
      <MainContent>
        <Title>Rank Your {rideTypeLabel}</Title>
        <section style={{ marginBottom: "1.5rem" }}>
          <RideTypeToggle value={rideType} onChange={setRideType} />
        </section>
        <Styled.NoDataSection>
          <Text as="p">
            No {rideSingularLabel} data uploaded yet. Please visit the{" "}
            <Link href="/upload" dark>
              Upload page
            </Link>{" "}
            to upload your {rideSingularLabel} experiences. You'll need at least
            2 {ridePluralLabel}
            to start ranking.
          </Text>
        </Styled.NoDataSection>
      </MainContent>
    );
  }

  const { coasters, filename, uploadedAt } = currentData;

  if (coasters.length === 1) {
    return (
      <MainContent>
        <Title>Rank Your {rideTypeLabel}</Title>
        <section style={{ marginBottom: "1.5rem" }}>
          <RideTypeToggle value={rideType} onChange={setRideType} />
        </section>
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
              <Text bold>Total {rideTypeLabel}:</Text> {coasters.length}
            </Text>
          </Styled.UploadSummary>

          <Text as="p">
            You need at least 2 {ridePluralLabel} to start ranking. Please
            upload more
            {rideSingularLabel} data to begin the ranking process.
          </Text>
          <Button onClick={() => navigate("/upload")} variant="default">
            Upload More {rideTypeLabel}
          </Button>
        </section>
      </MainContent>
    );
  }

  if (isComplete && finalRanking.length > 0) {
    return (
      <MainContent>
        <Title>Rank Your {rideTypeLabel}</Title>
        <section style={{ marginBottom: "1.5rem" }}>
          <RideTypeToggle value={rideType} onChange={setRideType} />
        </section>
        <Styled.RankingContainer>
          <RankingComplete
            rankedCoasters={finalRanking}
            onRankAgain={() => {
              const confirmed = window.confirm(
                "Are you sure you want to rank again? This will erase all your current rankings and you'll start from scratch",
              );

              if (confirmed) {
                resetRanking(rideType);
                window.location.reload();
              }
            }}
          />
        </Styled.RankingContainer>
      </MainContent>
    );
  }

  if (currentComparison) {
    return (
      <MainContent>
        <Title>Rank Your {rideTypeLabel}</Title>
        <section style={{ marginBottom: "1.5rem" }}>
          <RideTypeToggle value={rideType} onChange={setRideType} />
        </section>
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

          <UndoLastChoice
            lastComparison={lastComparison}
            canUndo={canUndo}
            onUndo={undo}
          />
        </Styled.RankingContainer>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Title>Rank Your {rideTypeLabel}</Title>
      <section style={{ marginBottom: "1.5rem" }}>
        <RideTypeToggle value={rideType} onChange={setRideType} />
      </section>
      <Styled.RankingContainer>
        <Styled.PreparingContainer>
          <Text as="p">Preparing ranking...</Text>
        </Styled.PreparingContainer>
      </Styled.RankingContainer>
    </MainContent>
  );
};
