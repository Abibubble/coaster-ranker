import React, { useState, useEffect } from "react";
import { useBlocker } from "react-router-dom";
import {
  Announcements,
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

// The number of extra rows revealed by "Show more": the first click reveals up
// to 100 rows, every click after that reveals up to 100 more.
const SHOW_MORE_CHUNK = 100;

const getNextVisibleCount = (currentCount: number, total: number) => {
  if (currentCount < SHOW_MORE_CHUNK) {
    return Math.min(SHOW_MORE_CHUNK, total);
  }
  return Math.min(currentCount + SHOW_MORE_CHUNK, total);
};

const sameCoasterOrder = (a: Coaster[], b: Coaster[]) =>
  a.length === b.length && a.every((coaster, index) => coaster.id === b[index]?.id);

interface SortableEditableItemProps {
  coaster: Coaster;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function SortableEditableItem({
  coaster,
  index,
  total,
  onMoveUp,
  onMoveDown,
}: SortableEditableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: coaster.id });

  // 2.3.3 Animation from Interactions is AAA, not AA, but skipping the slide
  // animation for reduced-motion users is a cheap courtesy while we're here.
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: prefersReducedMotion ? undefined : transition,
  };

  return (
    <Styled.EditableItem
      ref={setNodeRef}
      style={style}
      $isDragging={isDragging}
      role="listitem"
      aria-label={`${coaster.name} at ${coaster.park}, position ${
        index + 1
      } of ${total}`}
    >
      <Styled.DragHandle
        {...attributes}
        {...listeners}
        type="button"
        aria-label={`Drag to reorder ${coaster.name}`}
        title={`Drag to reorder ${coaster.name}`}
      >
        ⠿
      </Styled.DragHandle>
      <Styled.Position bold colour="charcoal">
        {index + 1}.
      </Styled.Position>
      <Styled.CoasterInfo>
        <Text bold>{coaster.name}</Text> at {coaster.park}
      </Styled.CoasterInfo>
      <Styled.MoveButtons>
        <Styled.MoveButton
          onClick={onMoveUp}
          aria-label={`Move ${coaster.name} up one position`}
          title={`Move ${coaster.name} up one position`}
        >
          ↑
        </Styled.MoveButton>
        <Styled.MoveButton
          onClick={onMoveDown}
          aria-label={`Move ${coaster.name} down one position`}
          title={`Move ${coaster.name} down one position`}
        >
          ↓
        </Styled.MoveButton>
      </Styled.MoveButtons>
    </Styled.EditableItem>
  );
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
  const [visibleCount, setVisibleCount] = useState(10);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

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

  const hasUnsavedChanges =
    isEditing && !sameCoasterOrder(coastersOrder, currentRankedCoasters);

  // Blocks in-app navigation (e.g. clicking a header link) while there are
  // unsaved ranking changes; a real browser navigation away (tab close,
  // refresh, typing a URL) isn't covered by this and needs beforeunload below.
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (!hasUnsavedChanges) return undefined;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleEditClick = () => {
    setIsEditing(true);
    setCoastersOrder([...currentRankedCoasters]);
    setVisibleCount(10);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCoastersOrder([...currentRankedCoasters]);
    setVisibleCount(10);
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
    setVisibleCount(10);
  };

  const moveCoaster = (fromIndex: number, toIndex: number) => {
    const newOrder = [...coastersOrder];
    const [movedCoaster] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedCoaster);
    setCoastersOrder(newOrder);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = coastersOrder.findIndex((c) => c.id === active.id);
    const newIndex = coastersOrder.findIndex((c) => c.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    moveCoaster(oldIndex, newIndex);
  };

  const announcements: Announcements = {
    onDragStart({ active }) {
      const coaster = coastersOrder.find((c) => c.id === active.id);
      return `Picked up ${coaster?.name ?? "coaster"}. Use the arrow keys to move it, space bar to drop it in its new position, or escape to cancel.`;
    },
    onDragOver({ active, over }) {
      if (!over) return undefined;
      const coaster = coastersOrder.find((c) => c.id === active.id);
      const overIndex = coastersOrder.findIndex((c) => c.id === over.id);
      return `${coaster?.name ?? "Coaster"} is now in position ${overIndex + 1} of ${coastersOrder.length}.`;
    },
    onDragEnd({ active, over }) {
      const coaster = coastersOrder.find((c) => c.id === active.id);
      if (!over) {
        return `${coaster?.name ?? "Coaster"} was dropped.`;
      }
      const overIndex = coastersOrder.findIndex((c) => c.id === over.id);
      return `${coaster?.name ?? "Coaster"} was moved to position ${overIndex + 1} of ${coastersOrder.length}.`;
    },
    onDragCancel({ active }) {
      const coaster = coastersOrder.find((c) => c.id === active.id);
      return `Reordering ${coaster?.name ?? "coaster"} was cancelled.`;
    },
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
  const visibleCoasters = displayCoasters.slice(0, visibleCount);
  const visibleIds = visibleCoasters.map((coaster) => coaster.id);
  const nextVisibleCount = getNextVisibleCount(
    visibleCount,
    coastersOrder.length,
  );
  const showMoreCount = nextVisibleCount - visibleCount;

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
            Drag a coaster using its handle, or use the arrow buttons, to
            reorder your coasters.
          </Styled.EditInstructions>
          <DndContext
            id="ranking-reorder"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            accessibility={{ announcements }}
          >
            <SortableContext
              items={visibleIds}
              strategy={verticalListSortingStrategy}
            >
              <ol>
                {visibleCoasters.map((coaster, index) => (
                  <SortableEditableItem
                    key={coaster.id}
                    coaster={coaster}
                    index={index}
                    total={displayCoasters.length}
                    onMoveUp={() => {
                      if (index > 0) {
                        moveCoaster(index, index - 1);
                      }
                    }}
                    onMoveDown={() => {
                      if (index < visibleCoasters.length - 1) {
                        moveCoaster(index, index + 1);
                      }
                    }}
                  />
                ))}
              </ol>
            </SortableContext>
          </DndContext>
          {visibleCount < coastersOrder.length && (
            <Styled.ButtonContainer>
              <Button
                variant="default"
                onClick={() => setVisibleCount(nextVisibleCount)}
              >
                Show {showMoreCount} more ({visibleCount} of{" "}
                {coastersOrder.length})
              </Button>
            </Styled.ButtonContainer>
          )}
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

      <Modal
        isOpen={blocker.state === "blocked"}
        onClose={() => {
          if (blocker.state === "blocked") blocker.reset();
        }}
        title="Unsaved ranking changes"
        ariaLabel="You have unsaved ranking changes. Save or discard them before leaving this page."
      >
        <Text as="p" mb="medium">
          You have unsaved changes to your ranking order. Save or discard them
          before leaving this page.
        </Text>
        <Styled.ButtonContainer>
          <Button
            variant="default"
            onClick={() => {
              handleSaveChanges();
              if (blocker.state === "blocked") blocker.proceed();
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleCancelEdit();
              if (blocker.state === "blocked") blocker.proceed();
            }}
          >
            Discard changes
          </Button>
          <Button
            variant="default"
            onClick={() => {
              if (blocker.state === "blocked") blocker.reset();
            }}
          >
            Keep editing
          </Button>
        </Styled.ButtonContainer>
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
