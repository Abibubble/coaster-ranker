import React, { useState, useEffect } from "react";
import { Coaster, UploadedData, RideType } from "../../types/data";
import { useData } from "../../contexts/DataContext";
import { markCoasterAsNumberZero } from "../../utils/coasterOperations/coasterOperations";
import { Button } from "../Button";
import { Link } from "../Link";
import { Modal } from "../Modal";
import { Text } from "../Text";
import * as Styled from "./RankingComplete.styled";

interface RankingCompleteProps {
  rankedCoasters: Coaster[];
  onRankAgain: () => void;
  currentData?: UploadedData | null;
  rideType?: RideType;
}

/**
 * A component that displays the final ranking results with options to view, edit, or export the ranked coasters.
 *
 * @param rankedCoasters - Array of coasters in their final ranked order
 * @param onRankAgain - Callback function called when the user wants to start a new ranking
 *
 * @returns A comprehensive results view with ranked coaster list and action buttons for further operations
 */

export default function RankingComplete({
  rankedCoasters,
  onRankAgain,
  currentData,
  rideType: _rideType = "coaster",
}: RankingCompleteProps) {
  const { uploadedData, setUploadedData, darkRideData, setDarkRideData } =
    useData();
  const [isEditing, setIsEditing] = useState(false);
  const [coastersOrder, setCoastersOrder] = useState<Coaster[]>(rankedCoasters);
  const [isNumberZeroModalOpen, setIsNumberZeroModalOpen] = useState(false);

  // Use the passed currentData, fallback to uploadedData for backwards compatibility
  const dataToUse = currentData || uploadedData;
  const setDataToUse =
    currentData === darkRideData ? setDarkRideData : setUploadedData;

  const getCurrentRankedCoasters = (): Coaster[] => {
    if (
      !dataToUse?.rankingMetadata?.isRanked ||
      !dataToUse?.rankingMetadata?.rankedCoasters
    ) {
      return rankedCoasters;
    }

    const contextCoasters = dataToUse.coasters
      .filter((coaster) => coaster.rankPosition !== undefined)
      .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0));

    return contextCoasters.length > 0 ? contextCoasters : rankedCoasters;
  };

  const currentRankedCoasters = getCurrentRankedCoasters();

  // Only update on initial load or when ranking is completed
  useEffect(() => {
    if (rankedCoasters.length > 0 && coastersOrder.length === 0) {
      setCoastersOrder([...rankedCoasters]);
    }
  }, [rankedCoasters.length, coastersOrder.length, rankedCoasters]);

  // Separate effect for context data with better stability
  const contextDataHash = React.useMemo(() => {
    if (!dataToUse?.coasters || !dataToUse?.rankingMetadata?.isRanked)
      return "";
    const rankedCoasters = dataToUse.coasters
      .filter((c) => c.rankPosition !== undefined)
      .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0));
    return `${rankedCoasters.length}-${rankedCoasters.map((c) => `${c.id}:${c.rankPosition}`).join(",")}`;
  }, [dataToUse]);

  useEffect(() => {
    if (
      !isEditing &&
      dataToUse?.rankingMetadata?.isRanked &&
      contextDataHash &&
      coastersOrder.length === 0
    ) {
      const contextCoasters =
        dataToUse.coasters
          ?.filter((coaster) => coaster.rankPosition !== undefined)
          .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0)) || [];

      if (contextCoasters.length > 0) {
        setCoastersOrder([...contextCoasters]);
      }
    }
  }, [contextDataHash, isEditing, coastersOrder.length, dataToUse]);

  const handleEditClick = () => {
    setIsEditing(true);
    setCoastersOrder([...currentRankedCoasters]);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCoastersOrder([...currentRankedCoasters]);
  };

  const handleSaveChanges = () => {
    if (dataToUse) {
      const updatedCoasters = [...dataToUse.coasters];
      coastersOrder.forEach((coaster, index) => {
        const coasterIndex = updatedCoasters.findIndex(
          (c) => c.id === coaster.id,
        );
        if (coasterIndex !== -1) {
          updatedCoasters[coasterIndex] = {
            ...coaster,
            rankPosition: index + 1,
          };
        }
      });

      const updatedMetadata = dataToUse.rankingMetadata
        ? {
            ...dataToUse.rankingMetadata,
            rankedCoasters: coastersOrder.map((coaster) => coaster.id),
          }
        : undefined;

      const updatedData = {
        ...dataToUse,
        coasters: updatedCoasters,
        rankingMetadata: updatedMetadata,
      };

      setDataToUse(updatedData);
    }
    setIsEditing(false);
  };

  const moveCoaster = (fromIndex: number, toIndex: number) => {
    const newOrder = [...coastersOrder];
    const [movedCoaster] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedCoaster);
    setCoastersOrder(newOrder);
  };

  // An immediate action, not batched into "Save Changes" - warns about (and
  // only then applies) overwriting an existing Number 0, then removes this
  // coaster from the reorder buffer since it no longer belongs in the
  // numbered ranking at all.
  const handleSetAsNumberZero = (coaster: Coaster) => {
    if (!dataToUse) return;

    const existingNumberZero = dataToUse.coasters.find(
      (c) => c.isNumberZero && c.id !== coaster.id,
    );
    if (existingNumberZero) {
      const confirmed = window.confirm(
        `${existingNumberZero.name} is currently your Number 0. Continuing will replace it with ${coaster.name}. Continue?`,
      );
      if (!confirmed) return;
    }

    setDataToUse(markCoasterAsNumberZero(dataToUse, coaster.id));
    setCoastersOrder((prev) => prev.filter((c) => c.id !== coaster.id));
    setIsNumberZeroModalOpen(false);
  };

  const displayCoasters = isEditing ? coastersOrder : currentRankedCoasters;
  const numberZeroCoaster = dataToUse?.coasters.find((c) => c.isNumberZero);

  return (
    <Styled.RankingComplete>
      <Text as="h2" colour="charcoal" mb="small">
        Ranking Complete!
      </Text>
      <Text as="p" colour="charcoal" mb="small">
        Your coasters have been ranked based on your preferences!{" "}
        {displayCoasters.length > 10
          ? "Here's your top 10:"
          : "Here's your final ranking:"}
      </Text>

      {isEditing ? (
        <Styled.EditableList>
          <Styled.EditInstructions
            as="p"
            center
            colour="mediumGrey"
            fontSize="small"
            mb="medium"
          >
            Use the arrow buttons to reorder your coasters.
          </Styled.EditInstructions>
          <ol>
            {displayCoasters.slice(0, 10).map((coaster, index) => (
              <Styled.EditableItem
                key={coaster.id}
                role="listitem"
                aria-label={`${coaster.name} at ${coaster.park}, position ${
                  index + 1
                } of ${displayCoasters.length}`}
              >
                <Styled.Position bold colour="charcoal">
                  {index + 1}.
                </Styled.Position>
                <Styled.CoasterInfo>
                  <Text bold>{coaster.name}</Text> at {coaster.park}
                </Styled.CoasterInfo>
                <Styled.MoveButtons>
                  <Styled.MoveButton
                    onClick={() => {
                      if (index > 0) {
                        moveCoaster(index, index - 1);
                      }
                    }}
                    aria-label={`Move ${coaster.name} up one position`}
                    title={`Move ${coaster.name} up one position`}
                  >
                    ↑
                  </Styled.MoveButton>
                  <Styled.MoveButton
                    onClick={() => {
                      if (index < displayCoasters.length - 1) {
                        moveCoaster(index, index + 1);
                      }
                    }}
                    aria-label={`Move ${coaster.name} down one position`}
                    title={`Move ${coaster.name} down one position`}
                  >
                    ↓
                  </Styled.MoveButton>
                </Styled.MoveButtons>
              </Styled.EditableItem>
            ))}
          </ol>
          <Styled.ButtonContainer>
            <Button variant="default" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button variant="destructive" onClick={handleCancelEdit}>
              Discard changes
            </Button>
          </Styled.ButtonContainer>
        </Styled.EditableList>
      ) : (
        <Styled.ResultsList>
          <ol>
            {displayCoasters.slice(0, 10).map((coaster, _index) => (
              <li key={coaster.id}>
                <Text bold>{coaster.name}</Text> at {coaster.park}
              </li>
            ))}
          </ol>
          <Styled.ViewAllLink>
            <Link href="/view-coasters">
              {displayCoasters.length > 10
                ? `View all ${displayCoasters.length} ranked coasters`
                : `View ${displayCoasters.length} ranked coaster${
                    displayCoasters.length === 1 ? "" : "s"
                  }`}
            </Link>
          </Styled.ViewAllLink>
        </Styled.ResultsList>
      )}

      <Styled.NumberZeroSection>
        <Text as="h3" bold colour="charcoal" mb="tiny">
          Your Number 0
        </Text>
        <Text as="p" colour="mediumGrey" fontSize="small" mb="tiny">
          Too personally significant to rank against the rest.
        </Text>
        <Styled.NumberZeroRow>
          {numberZeroCoaster ? (
            <ul>
              <li>
                <Text bold>{numberZeroCoaster.name}</Text> at{" "}
                {numberZeroCoaster.park}
              </li>
            </ul>
          ) : (
            <Text colour="mediumGrey" fontSize="small">
              You haven't set one yet.
            </Text>
          )}
          <Button
            variant="default"
            onClick={() => setIsNumberZeroModalOpen(true)}
          >
            {numberZeroCoaster ? "Change" : "Set Number 0"}
          </Button>
        </Styled.NumberZeroRow>
      </Styled.NumberZeroSection>

      <Modal
        isOpen={isNumberZeroModalOpen}
        onClose={() => setIsNumberZeroModalOpen(false)}
        title="Choose your Number 0"
        ariaLabel="Choose which coaster is too personally significant to rank"
      >
        <Styled.NumberZeroOptions>
          {(dataToUse?.coasters ?? []).map((coaster) => (
            <Styled.NumberZeroOption
              key={coaster.id}
              $isActive={coaster.isNumberZero ?? false}
              onClick={() => handleSetAsNumberZero(coaster)}
              aria-pressed={coaster.isNumberZero ?? false}
            >
              <Styled.NumberZeroOptionLabel>
                {coaster.name} at {coaster.park}
              </Styled.NumberZeroOptionLabel>
              {coaster.isNumberZero && <Styled.CheckIcon />}
            </Styled.NumberZeroOption>
          ))}
        </Styled.NumberZeroOptions>
        <Styled.ModalActions>
          <Button
            variant="default"
            onClick={() => setIsNumberZeroModalOpen(false)}
          >
            Close
          </Button>
        </Styled.ModalActions>
      </Modal>

      <Text as="p" colour="mediumGrey" fontSize="small" mb="small">
        This ranking order will be used when you download your coaster
        collection.
      </Text>
      {!isEditing && (
        <Styled.ButtonContainer>
          <Button onClick={handleEditClick}>Adjust Rankings</Button>
          <Button as="a" href="/download">
            Download rankings
          </Button>
          <Button variant="destructive" onClick={onRankAgain}>
            Rank again
          </Button>
        </Styled.ButtonContainer>
      )}
    </Styled.RankingComplete>
  );
}
