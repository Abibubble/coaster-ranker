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
import { useGroupRankingShortcut } from "../../hooks/useGroupRankingShortcut";
import { useNumberZeroOffer } from "../../hooks/useNumberZeroOffer";
import {
  RankingComparison,
  ComparisonResult,
} from "../../utils/ranking/newRankingEngine.util";
import { markCoasterAsNumberZero } from "../../utils/coasterOperations/coasterOperations";
import { Coaster, RideType, UploadedData } from "../../types/data";
import * as Styled from "./Rank.styled";

export const Rank: React.FC = () => {
  const {
    uploadedData,
    darkRideData,
    markRankingComplete,
    resetRanking,
    setUploadedData,
    setDarkRideData,
  } = useData();
  const navigate = useNavigate();
  const [rideType, setRideType] = React.useState<RideType>("coaster");

  // Get current data based on ride type
  const currentData = rideType === "coaster" ? uploadedData : darkRideData;
  const rideTypeLabel = rideType === "coaster" ? "Coasters" : "Dark Rides";
  const rideSingularLabel = rideType === "coaster" ? "coaster" : "dark ride";
  const ridePluralLabel = rideType === "coaster" ? "coasters" : "dark rides";

  // Generate a stable key based only on ride type
  const componentKey = React.useMemo(() => rideType, [rideType]);

  return (
    <RankingContent
      key={componentKey}
      currentData={currentData}
      rideType={rideType}
      rideTypeLabel={rideTypeLabel}
      rideSingularLabel={rideSingularLabel}
      ridePluralLabel={ridePluralLabel}
      setRideType={setRideType}
      markRankingComplete={markRankingComplete}
      resetRanking={resetRanking}
      navigate={navigate}
      setUploadedData={setUploadedData}
      setDarkRideData={setDarkRideData}
    />
  );
};

interface RankingContentProps {
  currentData: UploadedData | null;
  rideType: RideType;
  rideTypeLabel: string;
  rideSingularLabel: string;
  ridePluralLabel: string;
  setRideType: (rideType: RideType) => void;
  markRankingComplete: (ranking: Coaster[], rideType: RideType) => void;
  resetRanking: (rideType: RideType) => void;
  navigate: (path: string) => void;
  setUploadedData: (data: UploadedData | null) => void;
  setDarkRideData: (data: UploadedData | null) => void;
}

const RankingContent: React.FC<RankingContentProps> = ({
  currentData,
  rideType,
  rideTypeLabel,
  rideSingularLabel,
  ridePluralLabel,
  setRideType,
  markRankingComplete,
  resetRanking,
  navigate,
  setUploadedData,
  setDarkRideData,
}) => {
  const hasUnrankedCoasters =
    currentData?.coasters?.some(
      (c) => !c.isPreRanked && !c.isNumberZero && c.rankPosition === undefined,
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
    savePartialState,
    resetRankingEngine,
    rankedCoasters,
    nextUnrankedCoaster,
    applyGroupRankingResult,
    markAsNumberZero,
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
    savePartialState: () => void;
    resetRankingEngine: () => void;
    rankedCoasters: Coaster[];
    nextUnrankedCoaster: Coaster | null;
    applyGroupRankingResult: (orderedCoasters: Coaster[]) => void;
    markAsNumberZero: (coasterId: string) => void;
  } = useSimpleRanking(currentData?.coasters || [], rideType);

  const groupShortcut = useGroupRankingShortcut(
    nextUnrankedCoaster,
    rankedCoasters,
    applyGroupRankingResult,
  );

  const hasExistingNumberZero =
    currentData?.coasters?.some((c) => c.isNumberZero) || false;
  const numberZeroOffer = useNumberZeroOffer(
    nextUnrankedCoaster,
    hasExistingNumberZero,
  );

  const handleAcceptNumberZero = (coaster: Coaster) => {
    if (!currentData) return;
    const setData =
      rideType === "coaster" ? setUploadedData : setDarkRideData;
    setData(markCoasterAsNumberZero(currentData, coaster.id));
    markAsNumberZero(coaster.id);
  };

  // Mark ranking as complete when it's truly finished (with memoized check)
  const finalRankingLength = finalRanking.length;
  React.useEffect(() => {
    if (isComplete && finalRankingLength > 0 && !isAlreadyRanked) {
      console.log("Marking ranking as complete...");
      markRankingComplete(finalRanking, rideType);
    }
  }, [
    isComplete,
    finalRankingLength,
    isAlreadyRanked,
    rideType,
    finalRanking,
    markRankingComplete,
  ]);

  // Save partial ranking state when navigating away or closing tab
  React.useEffect(() => {
    let hasNavigated = false;
    let saveTimeout: ReturnType<typeof setTimeout>;

    const handleBeforeUnload = (_e: BeforeUnloadEvent) => {
      if (
        !isComplete &&
        !hasNavigated &&
        (currentComparison || rankedCoasterCount > 0)
      ) {
        savePartialState();
        hasNavigated = true;
      }
    };

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        !isComplete &&
        !hasNavigated &&
        (currentComparison || rankedCoasterCount > 0)
      ) {
        // Debounce the save to prevent rapid firing
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          if (!hasNavigated) {
            savePartialState();
            hasNavigated = true;
          }
        }, 100);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Return cleanup function
    return () => {
      clearTimeout(saveTimeout);
      if (
        !isComplete &&
        !hasNavigated &&
        (currentComparison || rankedCoasterCount > 0)
      ) {
        savePartialState();
      }
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [savePartialState, isComplete, currentComparison, rankedCoasterCount]); // Added missing dependencies

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
            currentData={currentData}
            rideType={rideType}
            onRankAgain={() => {
              const confirmed = window.confirm(
                `Are you sure you want to rank again? This will erase all your current rankings and you'll start from scratch.`,
              );

              if (confirmed) {
                resetRankingEngine();
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
            currentData={currentData}
            rideType={rideType}
            onRankAgain={() => {
              const confirmed = window.confirm(
                "Are you sure you want to rank again? This will erase all your current rankings and you'll start from scratch",
              );

              if (confirmed) {
                resetRankingEngine();
                resetRanking(rideType);
                window.location.reload();
              }
            }}
          />
        </Styled.RankingContainer>
      </MainContent>
    );
  }

  if (groupShortcut.isActive && groupShortcut.groupComparison) {
    const { coasterA, coasterB } = groupShortcut.groupComparison;

    return (
      <MainContent>
        <Title>Rank Your {rideTypeLabel}</Title>
        <section style={{ marginBottom: "1.5rem" }}>
          <RideTypeToggle value={rideType} onChange={setRideType} />
        </section>
        <Styled.RankingContainer>
          <Text as="p" mb="small">
            Quick comparison, just among your {coasterA.manufacturer}{" "}
            {coasterA.model} {ridePluralLabel}:
          </Text>

          <CoasterComparison
            coaster1={coasterA}
            coaster2={coasterB}
            onChoose1={() => groupShortcut.recordGroupWinner(coasterA)}
            onChoose2={() => groupShortcut.recordGroupWinner(coasterB)}
          />

          <Button
            variant="default"
            onClick={groupShortcut.cancelActiveComparison}
          >
            Cancel, rank normally instead
          </Button>
        </Styled.RankingContainer>
      </MainContent>
    );
  }

  if (numberZeroOffer.offer) {
    const numberZeroCoaster = numberZeroOffer.offer;

    return (
      <MainContent>
        <Title>Rank Your {rideTypeLabel}</Title>
        <section style={{ marginBottom: "1.5rem" }}>
          <RideTypeToggle value={rideType} onChange={setRideType} />
        </section>
        <Styled.RankingContainer>
          <Text as="p" mb="small">
            Some rides mean so much - nostalgia, a first-ever ride, pure
            sentimental value - that they don't belong in a competitive
            ranking at all. A Number 0 sits outside your ranked list
            entirely, instead of competing for position 1, 2, 3...
          </Text>
          <Text as="p" bold mb="small">
            Is {numberZeroCoaster.name} one of those for you?
          </Text>

          <Button
            variant="default"
            onClick={() => handleAcceptNumberZero(numberZeroCoaster)}
          >
            Yes, this is my Number 0
          </Button>
          <Button
            variant="default"
            onClick={numberZeroOffer.declineOffer}
          >
            No, rank it normally
          </Button>
        </Styled.RankingContainer>
      </MainContent>
    );
  }

  if (groupShortcut.offer) {
    const { newCoaster, groupMatches } = groupShortcut.offer;

    return (
      <MainContent>
        <Title>Rank Your {rideTypeLabel}</Title>
        <section style={{ marginBottom: "1.5rem" }}>
          <RideTypeToggle value={rideType} onChange={setRideType} />
        </section>
        <Styled.RankingContainer>
          <Text as="p" mb="small">
            You've already ranked {groupMatches.length} other{" "}
            {newCoaster.manufacturer} {newCoaster.model}{" "}
            {groupMatches.length === 1 ? rideSingularLabel : ridePluralLabel}.
            Compare {newCoaster.name} against just those first?
          </Text>

          <Button variant="default" onClick={groupShortcut.acceptOffer}>
            Yes, compare those first
          </Button>
          <Button variant="default" onClick={groupShortcut.declineOffer}>
            No, rank normally
          </Button>
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
