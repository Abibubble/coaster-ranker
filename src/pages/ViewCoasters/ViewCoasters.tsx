import React, { useState, useMemo } from "react";
import {
  Button,
  MainContent,
  Title,
  Text,
  SortModal,
  RideTypeToggle,
  CurrentDataInfo,
  NoUploadsViewCoasters,
  StatusMessage,
  CoasterCard,
  FilterSection,
  SimplifiedCoasterItem,
} from "../../components";
import type { SortField, SortDirection } from "../../components";
import { useData } from "../../contexts/DataContext";
import {
  useParkAutocomplete,
  useCountryAutocomplete,
  useManufacturerAutocomplete,
  useModelAutocomplete,
  useCoasterFilters,
  useCoasterSorting,
  useCoasterEditing,
} from "../../hooks";
import { RideType } from "../../types/data";
import {
  removeCoaster,
  updateCoaster,
  markCoasterAsNumberZero,
  unmarkNumberZero,
  getRemovalConfirmationMessage,
  hasAnyRanking,
} from "../../utils";
import * as Styled from "./ViewCoasters.styled";

const SORT_FIELD_LABELS: Record<SortField, string> = {
  name: "Ride Name",
  park: "Park Name",
  manufacturer: "Manufacturer",
  model: "Model",
  country: "Country",
  material: "Material",
  thrillLevel: "Thrill Level",
  rankPosition: "Rankings",
};

const getSortBadgeText = (sort: {
  field: SortField;
  direction: SortDirection;
}): string => {
  const label = SORT_FIELD_LABELS[sort.field];

  if (sort.field === "rankPosition") {
    return `${label} (${sort.direction === "asc" ? "Top to Bottom" : "Bottom to Top"})`;
  }

  return `${label} (${sort.direction === "asc" ? "A-Z" : "Z-A"})`;
};

export default function ViewCoasters() {
  const { uploadedData, setUploadedData, darkRideData, setDarkRideData } =
    useData();
  const [rideType, setRideType] = useState<RideType>("coaster");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
  const [isInformationView, setIsInformationView] = useState<boolean>(false);
  const [expandedCoasterIds, setExpandedCoasterIds] = useState<Set<string>>(
    new Set(),
  );

  // Data setup
  const currentData = rideType === "coaster" ? uploadedData : darkRideData;
  const setCurrentData =
    rideType === "coaster" ? setUploadedData : setDarkRideData;
  const coasterCount = uploadedData?.coasters?.length || 0;
  const darkRideCount = darkRideData?.coasters?.length || 0;

  const rideTypeLabel = rideType === "coaster" ? "Coasters" : "Dark Rides";
  const rideSingularLabel = rideType === "coaster" ? "coaster" : "dark ride";
  const ridePluralLabel = rideType === "coaster" ? "coasters" : "dark rides";

  const allCoasters = useMemo(
    () => currentData?.coasters || [],
    [currentData?.coasters],
  );

  // Check if we should show rankings (complete ranking or partial rankings with positions)
  const shouldShowRankings = useMemo(
    () => hasAnyRanking(allCoasters, currentData?.rankingMetadata),
    [currentData?.rankingMetadata, allCoasters],
  );

  // Custom hooks for functionality
  const {
    editingCoasterId,
    editForm,
    isEditing,
    startEditing,
    cancelEditing,
    updateEditForm,
    setEditFormNumberZero,
  } = useCoasterEditing();

  // Autocomplete for editing
  const parkAutocomplete = useParkAutocomplete(editForm.park);
  const countryAutocomplete = useCountryAutocomplete(editForm.country);
  const manufacturerAutocomplete = useManufacturerAutocomplete(
    editForm.manufacturer,
    rideType,
  );
  const modelAutocomplete = useModelAutocomplete(
    editForm.model,
    editForm.manufacturer,
    rideType,
  );

  const {
    filters,
    filteredCoasters,
    hasActiveFilters,
    clearAllFilters,
    updateFilter,
  } = useCoasterFilters(allCoasters, manufacturerAutocomplete.manufacturerAliasMap);
  const { currentSort, sortedCoasters, handleSort, handleClearSort } =
    useCoasterSorting(filteredCoasters, currentData);

  // Event handlers
  const handleRemoveCoaster = (coasterId: string) => {
    if (!currentData) return;

    const coaster = currentData.coasters.find((c) => c.id === coasterId);
    const rideName = coaster?.name || `this ${rideSingularLabel}`;

    const confirmMessage = `Are you sure you want to remove "${rideName}" from your collection? This action cannot be undone.`;
    if (!window.confirm(confirmMessage)) return;

    const updatedData = removeCoaster(currentData, coasterId);
    setCurrentData(updatedData);
    setStatusMessage(`${rideName} has been removed from your collection.`);
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleRemoveAllCoasters = () => {
    if (!currentData || allCoasters.length === 0) return;

    const confirmMessage = getRemovalConfirmationMessage(
      allCoasters.length,
      rideTypeLabel,
      ridePluralLabel,
    );
    if (!window.confirm(confirmMessage)) return;

    setCurrentData(null);
    setStatusMessage(
      `All ${allCoasters.length} ${allCoasters.length === 1 ? rideSingularLabel : ridePluralLabel} have been removed from your collection.`,
    );
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleUnmarkNumberZero = (coasterId: string) => {
    if (!currentData) return;

    const coaster = currentData.coasters.find((c) => c.id === coasterId);
    const updatedData = unmarkNumberZero(currentData, coasterId);

    setCurrentData(updatedData);
    setStatusMessage(
      `${coaster?.name || "This ride"} will go back into the normal ranking.`,
    );
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleSaveEdit = () => {
    if (!currentData || !editingCoasterId) return;

    if (
      !editForm.name.trim() ||
      !editForm.park.trim() ||
      !editForm.manufacturer.trim() ||
      !editForm.country.trim()
    ) {
      alert(
        "Please fill in all required fields (Name, Park, Manufacturer, Country).",
      );
      return;
    }

    // Warn about (and only then apply) overwriting an existing Number 0 at
    // the actual point of saving, not when the checkbox was ticked, so
    // cancelling the edit afterward can never leave the old one cleared
    // with nothing to replace it.
    if (editForm.isNumberZero) {
      const existingNumberZero = currentData.coasters.find(
        (c) => c.isNumberZero && c.id !== editingCoasterId,
      );
      if (existingNumberZero) {
        const confirmed = window.confirm(
          `${existingNumberZero.name} is currently your Number 0. Continuing will replace it with ${editForm.name.trim()}. Continue?`,
        );
        if (!confirmed) return;
      }
    }

    const parsedOpeningYear = editForm.openingYear.trim()
      ? parseInt(editForm.openingYear.trim(), 10)
      : NaN;

    let updatedData = updateCoaster(currentData, editingCoasterId, {
      name: editForm.name.trim(),
      park: editForm.park.trim(),
      manufacturer: editForm.manufacturer.trim(),
      model: editForm.model.trim() || undefined,
      material: editForm.material.trim() || undefined,
      thrillLevel: editForm.thrillLevel || undefined,
      country: editForm.country.trim(),
      openingYear: isNaN(parsedOpeningYear) ? undefined : parsedOpeningYear,
    });

    updatedData = editForm.isNumberZero
      ? markCoasterAsNumberZero(updatedData, editingCoasterId)
      : unmarkNumberZero(updatedData, editingCoasterId);

    setCurrentData(updatedData);
    cancelEditing();
    setStatusMessage(`${editForm.name} has been updated.`);
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleFieldClick = (field: string, value: string) => {
    updateFilter(field as keyof typeof filters, value);
    setIsFiltersOpen(true);
  };

  const handleParkSelection = (suggestion: {
    name: string;
    country: string;
  }) => {
    updateEditForm("park", suggestion.name);
    updateEditForm("country", suggestion.country);
  };

  const handleCountrySelection = (suggestion: { country: string }) => {
    updateEditForm("country", suggestion.country);
  };

  const toggleExpanded = (coasterId: string) => {
    setExpandedCoasterIds((prev) => {
      const next = new Set(prev);
      if (next.has(coasterId)) {
        next.delete(coasterId);
      } else {
        next.add(coasterId);
      }
      return next;
    });
  };

  const renderCoasterCard = (
    coaster: (typeof sortedCoasters)[number],
    onCollapse?: () => void,
  ) => (
    <Styled.CoasterCardContainer key={coaster.id}>
      <CoasterCard
        coaster={coaster}
        rideType={rideType}
        isEditing={isEditing(coaster.id)}
        editForm={editForm}
        isRanked={shouldShowRankings}
        onEdit={() => startEditing(coaster)}
        onRemove={() => handleRemoveCoaster(coaster.id)}
        onCollapse={onCollapse}
        onUnmarkNumberZero={
          coaster.isNumberZero
            ? () => handleUnmarkNumberZero(coaster.id)
            : undefined
        }
        onFieldClick={handleFieldClick}
        onFormChange={updateEditForm}
        onToggleNumberZero={setEditFormNumberZero}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={cancelEditing}
        onParkSelection={handleParkSelection}
        onCountrySelection={handleCountrySelection}
        autocomplete={{
          park: {
            suggestions: parkAutocomplete.suggestions,
            isLoading: parkAutocomplete.isLoading,
            error: parkAutocomplete.error,
            hasMinCharacters: parkAutocomplete.hasMinCharacters,
          },
          country: {
            suggestions: countryAutocomplete.suggestions,
            isLoading: countryAutocomplete.isLoading,
            error: countryAutocomplete.error,
            hasMinCharacters: countryAutocomplete.hasMinCharacters,
          },
          manufacturer: {
            suggestions: manufacturerAutocomplete.suggestions,
            isLoading: manufacturerAutocomplete.isLoading,
            error: manufacturerAutocomplete.error,
            hasMinCharacters: manufacturerAutocomplete.hasMinCharacters,
          },
          model: {
            suggestions: modelAutocomplete.suggestions,
            isLoading: modelAutocomplete.isLoading,
            error: modelAutocomplete.error,
            hasMinCharacters: modelAutocomplete.hasMinCharacters,
            hasManufacturer: modelAutocomplete.hasManufacturer,
          },
        }}
      />
    </Styled.CoasterCardContainer>
  );

  // Render empty state if no coasters
  if (allCoasters.length === 0) {
    return (
      <NoUploadsViewCoasters
        rideTypeLabel={rideTypeLabel}
        ridePluralLabel={ridePluralLabel}
        rideType={rideType}
        onRideTypeChange={setRideType}
      />
    );
  }

  return (
    <MainContent>
      <Title>Your {rideTypeLabel}</Title>

      <RideTypeToggle
        value={rideType}
        onChange={(newRideType) => setRideType(newRideType)}
      />

      {statusMessage && <StatusMessage message={statusMessage} />}

      <section>
        {/* Summary */}
        <Styled.CoastersSummary>
          {(coasterCount > 0 || darkRideCount > 0) && (
            <CurrentDataInfo
              coasterCount={coasterCount}
              darkRideCount={darkRideCount}
              rideType={rideType}
              showButton={false}
            />
          )}
          {sortedCoasters.length !== allCoasters.length && (
            <Text as="p" colour="mediumGrey" mb="small">
              <Text colour="charcoal">
                (Showing {sortedCoasters.length} after filtering)
              </Text>
            </Text>
          )}
          {currentData?.uploadedAt && (
            <Text as="p" colour="mutedGrey" fontSize="small" italic>
              Last updated: {currentData.uploadedAt.toLocaleDateString()}
            </Text>
          )}
        </Styled.CoastersSummary>

        {/* Sort Section */}
        <Styled.SortSection>
          <Button
            variant="default"
            onClick={() => setIsSortModalOpen(true)}
            aria-label="Open sort options"
          >
            Sort by
            {currentSort && (
              <Styled.SortBadge>
                {getSortBadgeText(currentSort)}
              </Styled.SortBadge>
            )}
          </Button>
          {currentSort && (
            <Button
              variant="default"
              onClick={handleClearSort}
              aria-label="Clear sorting"
            >
              Clear sort
            </Button>
          )}
        </Styled.SortSection>

        {/* Filter Section */}
        <FilterSection
          filters={filters}
          isFiltersOpen={isFiltersOpen}
          hasActiveFilters={hasActiveFilters}
          rideType={rideType}
          ridePluralLabel={ridePluralLabel}
          allCoasters={allCoasters}
          manufacturerAliasMap={manufacturerAutocomplete.manufacturerAliasMap}
          onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
          onFilterChange={updateFilter}
          onClearAllFilters={clearAllFilters}
        />

        {/* Actions Bar */}
        <Styled.ActionsBar>
          <Button as="link" to="/upload">
            Add more {ridePluralLabel}
          </Button>
          <Button as="link" to="/rank">
            Start ranking
          </Button>
          <Button variant="destructive" onClick={handleRemoveAllCoasters}>
            Remove all {ridePluralLabel}
          </Button>
        </Styled.ActionsBar>

        {/* Help Text */}
        <Styled.HelpText>
          <Text as="p" colour="mediumGrey" fontSize="small" italic>
            Tip: Click on any park, manufacturer,{" "}
            {rideType === "coaster" ? "model, material, thrill level, " : ""}or
            country to filter by that value.
          </Text>
        </Styled.HelpText>

        {/* View Toggle */}
        <Styled.ViewToggle>
          <Styled.CheckboxLabel>
            <input
              type="checkbox"
              checked={isInformationView}
              onChange={(e) => setIsInformationView(e.target.checked)}
            />
            Information view
          </Styled.CheckboxLabel>
        </Styled.ViewToggle>

        {/* Coaster Grid */}
        {isInformationView ? (
          <Styled.CoastersGrid>
            {sortedCoasters.map((coaster) => renderCoasterCard(coaster))}
          </Styled.CoastersGrid>
        ) : (
          <Styled.SimplifiedGrid>
            {sortedCoasters.map((coaster) =>
              expandedCoasterIds.has(coaster.id) ? (
                renderCoasterCard(coaster, () => toggleExpanded(coaster.id))
              ) : (
                <SimplifiedCoasterItem
                  key={coaster.id}
                  coaster={coaster}
                  isRanked={shouldShowRankings}
                  onExpand={() => toggleExpanded(coaster.id)}
                />
              ),
            )}
          </Styled.SimplifiedGrid>
        )}

        <div>
          <Text
            as="div"
            center
            colour="mutedGrey"
            fontSize="small"
            italic
            mb="medium"
            mt="medium"
          >
            Showing {sortedCoasters.length}{" "}
            {sortedCoasters.length === 1 ? rideSingularLabel : ridePluralLabel}
          </Text>
        </div>
      </section>

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onSort={handleSort}
        currentSort={currentSort}
        hasRanking={shouldShowRankings}
        hasModel={rideType === "coaster"}
      />
    </MainContent>
  );
}
