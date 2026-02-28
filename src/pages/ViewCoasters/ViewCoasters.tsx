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
  getRemovalConfirmationMessage,
} from "../../utils";
import * as Styled from "./ViewCoasters.styled";

export default function ViewCoasters() {
  const { uploadedData, setUploadedData, darkRideData, setDarkRideData } =
    useData();
  const [rideType, setRideType] = useState<RideType>("coaster");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
  const [isSimplifiedView, setIsSimplifiedView] = useState<boolean>(false);

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

  // Custom hooks for functionality
  const {
    filters,
    filteredCoasters,
    hasActiveFilters,
    clearAllFilters,
    updateFilter,
  } = useCoasterFilters(allCoasters);
  const { currentSort, sortedCoasters, handleSort, handleClearSort } =
    useCoasterSorting(filteredCoasters, currentData);
  const {
    editingCoasterId,
    editForm,
    isEditing,
    startEditing,
    cancelEditing,
    updateEditForm,
  } = useCoasterEditing();

  // Autocomplete for editing
  const parkAutocomplete = useParkAutocomplete(editForm.park);
  const countryAutocomplete = useCountryAutocomplete(editForm.country);
  const manufacturerAutocomplete = useManufacturerAutocomplete(
    editForm.manufacturer,
  );
  const modelAutocomplete = useModelAutocomplete(
    editForm.model,
    editForm.manufacturer,
    rideType,
  );

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

    const updatedData = updateCoaster(currentData, editingCoasterId, {
      name: editForm.name.trim(),
      park: editForm.park.trim(),
      manufacturer: editForm.manufacturer.trim(),
      model: editForm.model.trim() || undefined,
      material: editForm.material.trim() || undefined,
      thrillLevel: editForm.thrillLevel || undefined,
      country: editForm.country.trim(),
    });

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

  // Render empty state if no coasters
  if (allCoasters.length === 0) {
    return (
      <NoUploadsViewCoasters
        rideTypeLabel={rideTypeLabel}
        ridePluralLabel={ridePluralLabel}
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
              <Text colour="darkGrey">
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
                {currentSort.field === "rankPosition"
                  ? `Rankings (${currentSort.direction === "asc" ? "Top to Bottom" : "Bottom to Top"})`
                  : `Ride Name (${currentSort.direction === "asc" ? "A-Z" : "Z-A"})`}
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
              checked={isSimplifiedView}
              onChange={(e) => setIsSimplifiedView(e.target.checked)}
            />
            Simple view
          </Styled.CheckboxLabel>
        </Styled.ViewToggle>

        {/* Coaster Grid */}
        {isSimplifiedView ? (
          <Styled.SimplifiedGrid>
            {sortedCoasters.map((coaster) => (
              <SimplifiedCoasterItem
                key={coaster.id}
                coaster={coaster}
                isRanked={Boolean(currentData?.rankingMetadata?.isRanked)}
              />
            ))}
          </Styled.SimplifiedGrid>
        ) : (
          <Styled.CoastersGrid>
            {sortedCoasters.map((coaster) => (
              <Styled.CoasterCardContainer key={coaster.id}>
                <CoasterCard
                  coaster={coaster}
                  rideType={rideType}
                  isEditing={isEditing(coaster.id)}
                  editForm={editForm}
                  isRanked={Boolean(currentData?.rankingMetadata?.isRanked)}
                  onEdit={() => startEditing(coaster)}
                  onRemove={() => handleRemoveCoaster(coaster.id)}
                  onFieldClick={handleFieldClick}
                  onFormChange={updateEditForm}
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
                      hasMinCharacters:
                        manufacturerAutocomplete.hasMinCharacters,
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
            ))}
          </Styled.CoastersGrid>
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
        hasRanking={Boolean(
          currentData?.rankingMetadata?.isRanked &&
          currentData?.rankingMetadata?.rankedCoasters,
        )}
      />
    </MainContent>
  );
}
