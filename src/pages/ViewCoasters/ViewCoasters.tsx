import React, { useState, useMemo } from "react";
import { Button, MainContent, Title, Text, Link } from "../../components";
import { useData } from "../../contexts/DataContext";
import { Coaster } from "../../types/data";
import * as Styled from "./ViewCoasters.styled";

interface FilterOptions {
  park: string;
  manufacturer: string;
  model: string;
  material: string;
  thrillLevel: string;
  country: string;
}

interface EditableCoaster {
  name: string;
  park: string;
  manufacturer: string;
  model: string;
  material: string;
  thrillLevel: string;
  country: string;
}

export default function ViewCoasters() {
  const { uploadedData, setUploadedData } = useData();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [editingCoasterId, setEditingCoasterId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditableCoaster>({
    name: "",
    park: "",
    manufacturer: "",
    model: "",
    material: "",
    thrillLevel: "",
    country: "",
  });
  const [filters, setFilters] = useState<FilterOptions>({
    park: "",
    manufacturer: "",
    model: "",
    material: "",
    thrillLevel: "",
    country: "",
  });

  const allCoasters = useMemo(
    () => uploadedData?.coasters || [],
    [uploadedData?.coasters]
  );

  // Sort and filter coasters
  const coasters = useMemo(() => {
    let filteredCoasters = [...allCoasters];

    // Apply filters
    if (filters.park) {
      filteredCoasters = filteredCoasters.filter((coaster) =>
        coaster.park.toLowerCase().includes(filters.park.toLowerCase())
      );
    }
    if (filters.manufacturer) {
      filteredCoasters = filteredCoasters.filter((coaster) =>
        coaster.manufacturer
          .toLowerCase()
          .includes(filters.manufacturer.toLowerCase())
      );
    }
    if (filters.model) {
      filteredCoasters = filteredCoasters.filter((coaster) =>
        coaster.model?.toLowerCase().includes(filters.model.toLowerCase())
      );
    }
    if (filters.material) {
      filteredCoasters = filteredCoasters.filter((coaster) =>
        coaster.material?.toLowerCase().includes(filters.material.toLowerCase())
      );
    }
    if (filters.thrillLevel) {
      filteredCoasters = filteredCoasters.filter((coaster) =>
        coaster.thrillLevel
          ?.toLowerCase()
          .includes(filters.thrillLevel.toLowerCase())
      );
    }
    if (filters.country) {
      filteredCoasters = filteredCoasters.filter((coaster) =>
        coaster.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    // Sort by ranking if available, otherwise maintain original order
    const isRanked =
      uploadedData?.rankingMetadata?.isRanked &&
      uploadedData?.rankingMetadata?.rankedCoasters;

    if (isRanked) {
      // Sort by rank position (lower numbers = better rank)
      filteredCoasters.sort((a, b) => {
        const rankA = a.rankPosition || Number.MAX_SAFE_INTEGER;
        const rankB = b.rankPosition || Number.MAX_SAFE_INTEGER;
        return rankA - rankB;
      });
    }

    return filteredCoasters;
  }, [allCoasters, filters, uploadedData?.rankingMetadata]);

  // Get unique values for filter dropdowns
  const filterOptions = useMemo(() => {
    return {
      parks: [
        ...new Set(allCoasters.map((c) => c.park).filter(Boolean)),
      ].sort(),
      manufacturers: [
        ...new Set(allCoasters.map((c) => c.manufacturer).filter(Boolean)),
      ].sort(),
      models: [
        ...new Set(allCoasters.map((c) => c.model).filter(Boolean)),
      ].sort(),
      materials: [
        ...new Set(allCoasters.map((c) => c.material).filter(Boolean)),
      ].sort(),
      thrillLevels: [
        ...new Set(allCoasters.map((c) => c.thrillLevel).filter(Boolean)),
      ].sort(),
      countries: [
        ...new Set(allCoasters.map((c) => c.country).filter(Boolean)),
      ].sort(),
    };
  }, [allCoasters]);

  // Check if any coasters have values for optional fields (use allCoasters for this check)
  const hasModel = allCoasters.some(
    (coaster) => coaster.model && coaster.model.trim() !== ""
  );
  const hasMaterial = allCoasters.some(
    (coaster) => coaster.material && coaster.material.trim() !== ""
  );
  const hasThrillLevel = allCoasters.some(
    (coaster) => coaster.thrillLevel && coaster.thrillLevel.trim() !== ""
  );

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      park: "",
      manufacturer: "",
      model: "",
      material: "",
      thrillLevel: "",
      country: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter !== ""
  );

  const handleFieldClick = (field: keyof FilterOptions, value: string) => {
    // Only apply filter if the value exists and is not empty
    if (value && value.trim()) {
      // If clicking on the same value that's already filtered, clear all filters
      if (filters[field] === value) {
        setFilters({
          park: "",
          manufacturer: "",
          model: "",
          material: "",
          thrillLevel: "",
          country: "",
        });
      } else {
        // Clear all filters and set only the clicked field
        setFilters({
          park: "",
          manufacturer: "",
          model: "",
          material: "",
          thrillLevel: "",
          country: "",
          [field]: value,
        });
      }
    }
  };

  const handleRemoveCoaster = (coasterId: string) => {
    if (!uploadedData) return;

    const coasterToRemove = uploadedData.coasters.find(
      (c) => c.id === coasterId
    );
    const coasterName = coasterToRemove ? coasterToRemove.name : "this coaster";

    const confirmRemove = window.confirm(
      `Are you sure you want to remove "${coasterName}" from your collection? This action cannot be undone.`
    );
    if (!confirmRemove) return;

    const updatedCoasters = uploadedData.coasters.filter(
      (coaster) => coaster.id !== coasterId
    );

    // Update ranking metadata to remove references to the deleted coaster
    let updatedRankingMetadata = uploadedData.rankingMetadata;
    if (updatedRankingMetadata && updatedRankingMetadata.rankedCoasters) {
      // Remove the coaster from the ranked list and update positions
      const filteredRankedCoasters =
        updatedRankingMetadata.rankedCoasters.filter((id) => id !== coasterId);

      // If ranking exists and we removed a coaster, mark as incomplete
      updatedRankingMetadata = {
        ...updatedRankingMetadata,
        rankedCoasters: filteredRankedCoasters,
        isRanked:
          filteredRankedCoasters.length === updatedCoasters.length &&
          updatedCoasters.length > 0,
        // Clear completed comparisons that involved the removed coaster
        completedComparisons: new Set(
          Array.from(updatedRankingMetadata.completedComparisons || []).filter(
            (comparison) => !comparison.includes(coasterId)
          )
        ),
      };
    }

    setUploadedData({
      ...uploadedData,
      coasters: updatedCoasters,
      rankingMetadata: updatedRankingMetadata,
    });

    // Announce removal to screen readers
    setStatusMessage(`${coasterName} has been removed from your collection.`);
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleRemoveAllCoasters = () => {
    if (!uploadedData || allCoasters.length === 0) return;

    const coasterCount = allCoasters.length;
    const confirmRemove = window.confirm(
      `Are you sure you want to remove all ${coasterCount} coaster${
        coasterCount === 1 ? "" : "s"
      } from your collection? This action cannot be undone.`
    );

    if (!confirmRemove) return;

    // Completely clear all data from localStorage by setting to null
    setUploadedData(null);

    // Announce removal to screen readers
    setStatusMessage(
      `All ${coasterCount} coaster${
        coasterCount === 1 ? "" : "s"
      } have been removed from your collection.`
    );
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleEditCoaster = (coaster: Coaster) => {
    setEditingCoasterId(coaster.id);
    setEditForm({
      name: coaster.name,
      park: coaster.park,
      manufacturer: coaster.manufacturer,
      model: coaster.model || "",
      material: coaster.material || "",
      thrillLevel: coaster.thrillLevel || "",
      country: coaster.country,
    });
  };

  const handleSaveEdit = () => {
    if (!uploadedData || !editingCoasterId) return;

    // Validate required fields
    if (
      !editForm.name.trim() ||
      !editForm.park.trim() ||
      !editForm.manufacturer.trim()
    ) {
      alert("Please fill in all required fields (Name, Park, Manufacturer).");
      return;
    }

    const updatedCoasters = uploadedData.coasters.map((coaster) => {
      if (coaster.id === editingCoasterId) {
        return {
          ...coaster,
          name: editForm.name.trim(),
          park: editForm.park.trim(),
          manufacturer: editForm.manufacturer.trim(),
          model: editForm.model.trim() || undefined,
          material: editForm.material.trim() || undefined,
          thrillLevel: editForm.thrillLevel.trim() || undefined,
          country: editForm.country.trim(),
        };
      }
      return coaster;
    });

    setUploadedData({
      ...uploadedData,
      coasters: updatedCoasters,
    });

    // Reset edit state
    setEditingCoasterId(null);
    setEditForm({
      name: "",
      park: "",
      manufacturer: "",
      model: "",
      material: "",
      thrillLevel: "",
      country: "",
    });

    setStatusMessage("Coaster updated successfully.");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleCancelEdit = () => {
    setEditingCoasterId(null);
    setEditForm({
      name: "",
      park: "",
      manufacturer: "",
      model: "",
      material: "",
      thrillLevel: "",
      country: "",
    });
  };

  const handleEditFormChange = (
    field: keyof EditableCoaster,
    value: string
  ) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (allCoasters.length === 0) {
    return (
      <MainContent>
        <Title>Your Coasters</Title>
        <section>
          <Styled.EmptyState>
            <Text as="h2" center colour="darkGrey" mb="medium" fontSize="large">
              No coasters yet
            </Text>
            <Text as="p" center colour="mediumGrey" mb="large">
              You haven't uploaded any coasters yet. Use one of the upload
              methods to add some coasters to your collection.
            </Text>
            <Link href="/upload" variant="button">
              Go to upload page
            </Link>
          </Styled.EmptyState>
        </section>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Title>Your Coasters</Title>

      {statusMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "absolute",
            left: "-10000px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          {statusMessage}
        </div>
      )}

      <section>
        <Styled.CoastersSummary>
          <Text as="p" colour="mediumGrey" mb="small">
            You have <Text bold>{allCoasters.length}</Text> coaster
            {allCoasters.length === 1 ? "" : "s"} in your collection.
            {coasters.length !== allCoasters.length && (
              <Text colour="darkGrey">
                {" "}
                (Showing {coasters.length} after filtering)
              </Text>
            )}
          </Text>
          {uploadedData?.uploadedAt && (
            <Text as="p" colour="mutedGrey" fontSize="small" italic>
              Last updated: {uploadedData.uploadedAt.toLocaleDateString()}
            </Text>
          )}
        </Styled.CoastersSummary>

        <Styled.FiltersSection>
          <Styled.FilterHeading
            as={Text}
            colour="charcoal"
            fontSize="medium"
            mb="small"
          >
            Filter coasters
          </Styled.FilterHeading>
          <Styled.FilterToggle
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            aria-expanded={isFiltersOpen}
            aria-label={`${isFiltersOpen ? "Hide" : "Show"} filter options`}
          >
            Filter coasters
            <Styled.FilterIcon $isOpen={isFiltersOpen} />
          </Styled.FilterToggle>
          <Styled.FilterContent $isOpen={isFiltersOpen}>
            <Styled.FiltersGrid>
              <Styled.FilterGroup>
                <Styled.FilterLabel>Park</Styled.FilterLabel>
                <Styled.FilterSelect
                  value={filters.park}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleFilterChange("park", e.target.value)
                  }
                >
                  <option value="">All Parks</option>
                  {filterOptions.parks.map((park) => (
                    <option key={park} value={park}>
                      {park}
                    </option>
                  ))}
                </Styled.FilterSelect>
              </Styled.FilterGroup>

              <Styled.FilterGroup>
                <Styled.FilterLabel>Manufacturer</Styled.FilterLabel>
                <Styled.FilterSelect
                  value={filters.manufacturer}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleFilterChange("manufacturer", e.target.value)
                  }
                >
                  <option value="">All Manufacturers</option>
                  {filterOptions.manufacturers.map((manufacturer) => (
                    <option key={manufacturer} value={manufacturer}>
                      {manufacturer}
                    </option>
                  ))}
                </Styled.FilterSelect>
              </Styled.FilterGroup>

              <Styled.FilterGroup>
                <Styled.FilterLabel>Country</Styled.FilterLabel>
                <Styled.FilterSelect
                  value={filters.country}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleFilterChange("country", e.target.value)
                  }
                >
                  <option value="">All Countries</option>
                  {filterOptions.countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Styled.FilterSelect>
              </Styled.FilterGroup>

              {hasModel && (
                <Styled.FilterGroup>
                  <Styled.FilterLabel>Model</Styled.FilterLabel>
                  <Styled.FilterSelect
                    value={filters.model}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleFilterChange("model", e.target.value)
                    }
                  >
                    <option value="">All Models</option>
                    {filterOptions.models.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </Styled.FilterSelect>
                </Styled.FilterGroup>
              )}

              {hasMaterial && (
                <Styled.FilterGroup>
                  <Styled.FilterLabel>Material</Styled.FilterLabel>
                  <Styled.FilterSelect
                    value={filters.material}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleFilterChange("material", e.target.value)
                    }
                  >
                    <option value="">All Materials</option>
                    {filterOptions.materials.map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </Styled.FilterSelect>
                </Styled.FilterGroup>
              )}

              {hasThrillLevel && (
                <Styled.FilterGroup>
                  <Styled.FilterLabel>Thrill Level</Styled.FilterLabel>
                  <Styled.FilterSelect
                    value={filters.thrillLevel}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleFilterChange("thrillLevel", e.target.value)
                    }
                  >
                    <option value="">All Thrill Levels</option>
                    {filterOptions.thrillLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </Styled.FilterSelect>
                </Styled.FilterGroup>
              )}
            </Styled.FiltersGrid>

            {hasActiveFilters && (
              <Styled.FilterActions>
                <Button variant="default" onClick={clearAllFilters}>
                  Clear all filters
                </Button>
              </Styled.FilterActions>
            )}
          </Styled.FilterContent>
        </Styled.FiltersSection>

        <Styled.ActionsBar>
          <Button as="link" to="/upload">
            Add more coasters
          </Button>
          <Button as="link" to="/rank">
            Start ranking
          </Button>
          <Button
            variant="destructive"
            onClick={handleRemoveAllCoasters}
            aria-label={`Remove all ${coasters.length} coaster${
              coasters.length === 1 ? "" : "s"
            } from collection`}
          >
            Remove all coasters
          </Button>
        </Styled.ActionsBar>

        <Styled.TableHelpText>
          <Text as="p" colour="mediumGrey" fontSize="small" italic>
            Tip: Click on any park, manufacturer, model, material, or thrill
            level to filter by that value.
          </Text>
        </Styled.TableHelpText>

        <Styled.CoastersGrid>
          {coasters.map((coaster) => (
            <Styled.CoasterCard key={coaster.id}>
              {editingCoasterId === coaster.id ? (
                // Edit mode
                <>
                  {/* Desktop Edit Layout */}
                  <Styled.DesktopLayout>
                    <Styled.CoasterHeader>
                      <Styled.CoasterTitle>
                        <Text
                          as="h3"
                          fontSize="large"
                          colour="charcoal"
                          mb="tiny"
                        >
                          Editing: {coaster.name}
                        </Text>
                      </Styled.CoasterTitle>
                      {uploadedData?.rankingMetadata?.isRanked &&
                        coaster.rankPosition && (
                          <Styled.RankBadge>
                            #{coaster.rankPosition}
                          </Styled.RankBadge>
                        )}
                    </Styled.CoasterHeader>

                    <Styled.EditForm>
                      <Styled.FormField>
                        <Styled.FormLabel>Name *</Styled.FormLabel>
                        <Styled.FormInput
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            handleEditFormChange("name", e.target.value)
                          }
                          required
                        />
                      </Styled.FormField>

                      <Styled.FormField>
                        <Styled.FormLabel>Park *</Styled.FormLabel>
                        <Styled.FormInput
                          type="text"
                          value={editForm.park}
                          onChange={(e) =>
                            handleEditFormChange("park", e.target.value)
                          }
                          required
                        />
                      </Styled.FormField>

                      <Styled.FormField>
                        <Styled.FormLabel>Manufacturer *</Styled.FormLabel>
                        <Styled.FormInput
                          type="text"
                          value={editForm.manufacturer}
                          onChange={(e) =>
                            handleEditFormChange("manufacturer", e.target.value)
                          }
                          required
                        />
                      </Styled.FormField>

                      <Styled.FormField>
                        <Styled.FormLabel>Country</Styled.FormLabel>
                        <Styled.FormInput
                          type="text"
                          value={editForm.country}
                          onChange={(e) =>
                            handleEditFormChange("country", e.target.value)
                          }
                        />
                      </Styled.FormField>

                      {hasModel && (
                        <Styled.FormField>
                          <Styled.FormLabel>Model</Styled.FormLabel>
                          <Styled.FormInput
                            type="text"
                            value={editForm.model}
                            onChange={(e) =>
                              handleEditFormChange("model", e.target.value)
                            }
                          />
                        </Styled.FormField>
                      )}

                      {hasMaterial && (
                        <Styled.FormField>
                          <Styled.FormLabel>Material</Styled.FormLabel>
                          <Styled.FormInput
                            type="text"
                            value={editForm.material}
                            onChange={(e) =>
                              handleEditFormChange("material", e.target.value)
                            }
                          />
                        </Styled.FormField>
                      )}

                      {hasThrillLevel && (
                        <Styled.FormField>
                          <Styled.FormLabel>Thrill Level</Styled.FormLabel>
                          <Styled.FormInput
                            type="text"
                            value={editForm.thrillLevel}
                            onChange={(e) =>
                              handleEditFormChange(
                                "thrillLevel",
                                e.target.value
                              )
                            }
                          />
                        </Styled.FormField>
                      )}
                    </Styled.EditForm>

                    <Styled.FormActions>
                      <Button
                        variant="default"
                        onClick={handleCancelEdit}
                        aria-label="Cancel editing"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="default"
                        onClick={handleSaveEdit}
                        aria-label="Save changes"
                      >
                        Save
                      </Button>
                    </Styled.FormActions>
                  </Styled.DesktopLayout>

                  {/* Mobile Edit Layout */}
                  <Styled.MobileLayout>
                    {uploadedData?.rankingMetadata?.isRanked &&
                      coaster.rankPosition && (
                        <Styled.CoasterField>
                          <Styled.FieldLabel>Rank</Styled.FieldLabel>
                          <Styled.RankBadge>
                            #{coaster.rankPosition}
                          </Styled.RankBadge>
                        </Styled.CoasterField>
                      )}

                    <Styled.CoasterField>
                      <Styled.FieldLabel>Name *</Styled.FieldLabel>
                      <Styled.FormInput
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          handleEditFormChange("name", e.target.value)
                        }
                        required
                      />
                    </Styled.CoasterField>

                    <Styled.CoasterField>
                      <Styled.FieldLabel>Park *</Styled.FieldLabel>
                      <Styled.FormInput
                        type="text"
                        value={editForm.park}
                        onChange={(e) =>
                          handleEditFormChange("park", e.target.value)
                        }
                        required
                      />
                    </Styled.CoasterField>

                    <Styled.CoasterField>
                      <Styled.FieldLabel>Manufacturer *</Styled.FieldLabel>
                      <Styled.FormInput
                        type="text"
                        value={editForm.manufacturer}
                        onChange={(e) =>
                          handleEditFormChange("manufacturer", e.target.value)
                        }
                        required
                      />
                    </Styled.CoasterField>

                    <Styled.CoasterField>
                      <Styled.FieldLabel>Country</Styled.FieldLabel>
                      <Styled.FormInput
                        type="text"
                        value={editForm.country}
                        onChange={(e) =>
                          handleEditFormChange("country", e.target.value)
                        }
                      />
                    </Styled.CoasterField>

                    {hasModel && (
                      <Styled.CoasterField>
                        <Styled.FieldLabel>Model</Styled.FieldLabel>
                        <Styled.FormInput
                          type="text"
                          value={editForm.model}
                          onChange={(e) =>
                            handleEditFormChange("model", e.target.value)
                          }
                        />
                      </Styled.CoasterField>
                    )}

                    {hasMaterial && (
                      <Styled.CoasterField>
                        <Styled.FieldLabel>Material</Styled.FieldLabel>
                        <Styled.FormInput
                          type="text"
                          value={editForm.material}
                          onChange={(e) =>
                            handleEditFormChange("material", e.target.value)
                          }
                        />
                      </Styled.CoasterField>
                    )}

                    {hasThrillLevel && (
                      <Styled.CoasterField>
                        <Styled.FieldLabel>Thrill Level</Styled.FieldLabel>
                        <Styled.FormInput
                          type="text"
                          value={editForm.thrillLevel}
                          onChange={(e) =>
                            handleEditFormChange("thrillLevel", e.target.value)
                          }
                        />
                      </Styled.CoasterField>
                    )}

                    <Styled.CoasterField>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="default"
                          onClick={handleSaveEdit}
                          aria-label="Save changes"
                        >
                          Save
                        </Button>
                        <Button
                          variant="default"
                          onClick={handleCancelEdit}
                          aria-label="Cancel editing"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Styled.CoasterField>
                  </Styled.MobileLayout>
                </>
              ) : (
                // View mode
                <>
                  {/* Desktop View Layout */}
                  <Styled.DesktopLayout>
                    <Styled.CoasterHeader>
                      <Styled.CoasterTitle>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "4px",
                          }}
                        >
                          {uploadedData?.rankingMetadata?.isRanked &&
                            coaster.rankPosition && (
                              <Styled.RankBadge>
                                #{coaster.rankPosition}
                              </Styled.RankBadge>
                            )}
                          <Text as="h3" fontSize="large" colour="charcoal">
                            {coaster.name}
                          </Text>
                        </div>
                        <Text colour="mediumGrey" fontSize="small">
                          {coaster.park}
                        </Text>
                      </Styled.CoasterTitle>
                      <Styled.CoasterActions>
                        <Button
                          variant="default"
                          onClick={() => handleEditCoaster(coaster)}
                          aria-label={`Edit ${coaster.name}`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleRemoveCoaster(coaster.id)}
                          aria-label={`Remove ${coaster.name} from collection`}
                        >
                          Remove
                        </Button>
                      </Styled.CoasterActions>
                    </Styled.CoasterHeader>

                    <Styled.CoasterDetails>
                      <Styled.CoasterField>
                        <Styled.FieldLabel>Park</Styled.FieldLabel>
                        <Styled.ClickableFieldValue
                          onClick={() => handleFieldClick("park", coaster.park)}
                          title={`Filter by park: ${coaster.park}`}
                          aria-label={`Filter by park: ${coaster.park}`}
                        >
                          {coaster.park}
                        </Styled.ClickableFieldValue>
                      </Styled.CoasterField>

                      <Styled.CoasterField>
                        <Styled.FieldLabel>Manufacturer</Styled.FieldLabel>
                        <Styled.ClickableFieldValue
                          onClick={() =>
                            handleFieldClick(
                              "manufacturer",
                              coaster.manufacturer
                            )
                          }
                          title={`Filter by manufacturer: ${coaster.manufacturer}`}
                          aria-label={`Filter by manufacturer: ${coaster.manufacturer}`}
                        >
                          {coaster.manufacturer}
                        </Styled.ClickableFieldValue>
                      </Styled.CoasterField>

                      {coaster.country && (
                        <Styled.CoasterField>
                          <Styled.FieldLabel>Country</Styled.FieldLabel>
                          <Styled.ClickableFieldValue
                            onClick={() =>
                              handleFieldClick("country", coaster.country)
                            }
                            title={`Filter by country: ${coaster.country}`}
                            aria-label={`Filter by country: ${coaster.country}`}
                          >
                            {coaster.country}
                          </Styled.ClickableFieldValue>
                        </Styled.CoasterField>
                      )}

                      {hasModel && coaster.model && (
                        <Styled.CoasterField>
                          <Styled.FieldLabel>Model</Styled.FieldLabel>
                          <Styled.ClickableFieldValue
                            onClick={() =>
                              handleFieldClick("model", coaster.model!)
                            }
                            title={`Filter by model: ${coaster.model}`}
                            aria-label={`Filter by model: ${coaster.model}`}
                          >
                            {coaster.model}
                          </Styled.ClickableFieldValue>
                        </Styled.CoasterField>
                      )}

                      {hasMaterial && coaster.material && (
                        <Styled.CoasterField>
                          <Styled.FieldLabel>Material</Styled.FieldLabel>
                          <Styled.ClickableFieldValue
                            onClick={() =>
                              handleFieldClick("material", coaster.material!)
                            }
                            title={`Filter by material: ${coaster.material}`}
                            aria-label={`Filter by material: ${coaster.material}`}
                          >
                            {coaster.material}
                          </Styled.ClickableFieldValue>
                        </Styled.CoasterField>
                      )}

                      {hasThrillLevel && coaster.thrillLevel && (
                        <Styled.CoasterField>
                          <Styled.FieldLabel>Thrill Level</Styled.FieldLabel>
                          <Styled.ClickableFieldValue
                            onClick={() =>
                              handleFieldClick(
                                "thrillLevel",
                                coaster.thrillLevel!
                              )
                            }
                            title={`Filter by thrill level: ${coaster.thrillLevel}`}
                            aria-label={`Filter by thrill level: ${coaster.thrillLevel}`}
                          >
                            {coaster.thrillLevel}
                          </Styled.ClickableFieldValue>
                        </Styled.CoasterField>
                      )}
                    </Styled.CoasterDetails>
                  </Styled.DesktopLayout>

                  {/* Mobile View Layout */}
                  <Styled.MobileLayout>
                    <Styled.MobileHeader>
                      {uploadedData?.rankingMetadata?.isRanked &&
                        coaster.rankPosition && (
                          <Styled.MobileRank>
                            <Styled.RankBadge>
                              #{coaster.rankPosition}
                            </Styled.RankBadge>
                          </Styled.MobileRank>
                        )}
                      <Styled.MobileName>{coaster.name}</Styled.MobileName>
                    </Styled.MobileHeader>

                    <Styled.CoasterField>
                      <Styled.FieldLabel>Park</Styled.FieldLabel>
                      <Styled.ClickableFieldValue
                        onClick={() => handleFieldClick("park", coaster.park)}
                        title={`Filter by park: ${coaster.park}`}
                        aria-label={`Filter by park: ${coaster.park}`}
                      >
                        {coaster.park}
                      </Styled.ClickableFieldValue>
                    </Styled.CoasterField>

                    <Styled.CoasterField>
                      <Styled.FieldLabel>Manufacturer</Styled.FieldLabel>
                      <Styled.ClickableFieldValue
                        onClick={() =>
                          handleFieldClick("manufacturer", coaster.manufacturer)
                        }
                        title={`Filter by manufacturer: ${coaster.manufacturer}`}
                        aria-label={`Filter by manufacturer: ${coaster.manufacturer}`}
                      >
                        {coaster.manufacturer}
                      </Styled.ClickableFieldValue>
                    </Styled.CoasterField>

                    {coaster.country && (
                      <Styled.CoasterField>
                        <Styled.FieldLabel>Country</Styled.FieldLabel>
                        <Styled.ClickableFieldValue
                          onClick={() =>
                            handleFieldClick("country", coaster.country)
                          }
                          title={`Filter by country: ${coaster.country}`}
                          aria-label={`Filter by country: ${coaster.country}`}
                        >
                          {coaster.country}
                        </Styled.ClickableFieldValue>
                      </Styled.CoasterField>
                    )}

                    {hasModel && coaster.model && (
                      <Styled.CoasterField>
                        <Styled.FieldLabel>Model</Styled.FieldLabel>
                        <Styled.ClickableFieldValue
                          onClick={() =>
                            handleFieldClick("model", coaster.model!)
                          }
                          title={`Filter by model: ${coaster.model}`}
                          aria-label={`Filter by model: ${coaster.model}`}
                        >
                          {coaster.model}
                        </Styled.ClickableFieldValue>
                      </Styled.CoasterField>
                    )}

                    {hasMaterial && coaster.material && (
                      <Styled.CoasterField>
                        <Styled.FieldLabel>Material</Styled.FieldLabel>
                        <Styled.ClickableFieldValue
                          onClick={() =>
                            handleFieldClick("material", coaster.material!)
                          }
                          title={`Filter by material: ${coaster.material}`}
                          aria-label={`Filter by material: ${coaster.material}`}
                        >
                          {coaster.material}
                        </Styled.ClickableFieldValue>
                      </Styled.CoasterField>
                    )}

                    {hasThrillLevel && coaster.thrillLevel && (
                      <Styled.CoasterField>
                        <Styled.FieldLabel>Thrill Level</Styled.FieldLabel>
                        <Styled.ClickableFieldValue
                          onClick={() =>
                            handleFieldClick(
                              "thrillLevel",
                              coaster.thrillLevel!
                            )
                          }
                          title={`Filter by thrill level: ${coaster.thrillLevel}`}
                          aria-label={`Filter by thrill level: ${coaster.thrillLevel}`}
                        >
                          {coaster.thrillLevel}
                        </Styled.ClickableFieldValue>
                      </Styled.CoasterField>
                    )}

                    <Styled.CoasterField>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="default"
                          onClick={() => handleEditCoaster(coaster)}
                          aria-label={`Edit ${coaster.name}`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleRemoveCoaster(coaster.id)}
                          aria-label={`Remove ${coaster.name} from collection`}
                        >
                          Remove
                        </Button>
                      </div>
                    </Styled.CoasterField>
                  </Styled.MobileLayout>
                </>
              )}
            </Styled.CoasterCard>
          ))}
        </Styled.CoastersGrid>

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
            Showing {coasters.length} coaster{coasters.length === 1 ? "" : "s"}
          </Text>
        </div>
      </section>
    </MainContent>
  );
}
