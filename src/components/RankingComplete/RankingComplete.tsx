import React, { useState, useEffect } from "react";
import { Coaster, UploadedData, RideType } from "../../types/data";
import { useData } from "../../contexts/DataContext";
import { Button } from "../Button";
import { Link } from "../Link";
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

  useEffect(() => {
    setCoastersOrder([...rankedCoasters]);
  }, [rankedCoasters]);

  useEffect(() => {
    if (
      !isEditing &&
      dataToUse?.rankingMetadata?.isRanked &&
      dataToUse.coasters
    ) {
      const contextCoasters = dataToUse.coasters
        .filter((coaster) => coaster.rankPosition !== undefined)
        .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0));

      if (contextCoasters.length > 0) {
        setCoastersOrder([...contextCoasters]);
      }
    }
  }, [dataToUse?.rankingMetadata?.isRanked, dataToUse?.coasters, isEditing]);

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

  const handleKeyDown = (
    event: React.KeyboardEvent,
    coaster: Coaster,
    index: number,
  ) => {
    if (event.key === "ArrowUp" && index > 0) {
      event.preventDefault();
      moveCoaster(index, index - 1);
    } else if (event.key === "ArrowDown" && index < coastersOrder.length - 1) {
      event.preventDefault();
      moveCoaster(index, index + 1);
    }
  };

  const displayCoasters = isEditing ? coastersOrder : currentRankedCoasters;

  return (
    <Styled.RankingComplete>
      <Text as="h2" colour="successGreen" mb="small">
        Ranking Complete!
      </Text>
      <Text as="p" colour="successGreen" mb="small">
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
            Use the arrow buttons or arrow keys to reorder your coasters. Press
            Tab to navigate between items.
          </Styled.EditInstructions>
          <ol>
            {displayCoasters.slice(0, 10).map((coaster, index) => (
              <Styled.EditableItem
                key={coaster.id}
                tabIndex={0}
                onKeyDown={(event) => handleKeyDown(event, coaster, index)}
                role="listitem"
                aria-label={`${coaster.name} at ${coaster.park}, position ${
                  index + 1
                } of ${
                  displayCoasters.length
                }. Use arrow keys or buttons to reorder.`}
              >
                <Styled.Position bold colour="darkGrey">
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
            <Button variant="success" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button variant="disabled" onClick={handleCancelEdit}>
              Cancel
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
