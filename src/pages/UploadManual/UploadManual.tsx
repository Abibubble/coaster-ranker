import React, { useState } from "react";
import {
  ParkAutocompleteInput,
  CountryAutocompleteInput,
  ManufacturerAutocompleteInput,
  ModelAutocompleteInput,
  Button,
  CurrentDataInfo,
  DuplicateResolver,
  InfoMessage,
  MainContent,
  RideTypeToggle,
  ScreenReaderOnly,
  Title,
  Text,
} from "../../components";
import { useData } from "../../contexts/DataContext";
import {
  useParkAutocomplete,
  useCountryAutocomplete,
  useManufacturerAutocomplete,
  useModelAutocomplete,
} from "../../hooks";
import { Coaster, RideType } from "../../types/data";
import {
  DuplicateMatch,
  formatString,
  handleDuplicateDetection,
  processDuplicateResolution,
  updateCoaster,
} from "../../utils";
import type { DuplicateResolution } from "../../components/DuplicateResolver";
import * as Styled from "./UploadManual.styled";

interface CoasterFormData {
  name: string;
  park: string;
  manufacturer: string;
  model?: string;
  material?: string;
  thrillLevel?: string;
  openingYear?: string;
  country: string;
  type: RideType;
  isNumberZero: boolean;
}

export default function UploadManual() {
  const { uploadedData, setUploadedData, darkRideData, setDarkRideData } =
    useData();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [duplicates, setDuplicates] = useState<DuplicateMatch[]>([]);
  const [pendingCoaster, setPendingCoaster] = useState<Coaster | null>(null);
  const [showDuplicateResolver, setShowDuplicateResolver] = useState(false);
  const [rideType, setRideType] = useState<RideType>("coaster");

  const [formData, setFormData] = useState<CoasterFormData>({
    name: "",
    park: "",
    manufacturer: "",
    model: "",
    material: "",
    thrillLevel: "",
    openingYear: "",
    country: "",
    type: "coaster",
    isNumberZero: false,
  });

  // Get current data based on ride type
  const currentData = rideType === "coaster" ? uploadedData : darkRideData;
  const setCurrentData =
    rideType === "coaster" ? setUploadedData : setDarkRideData;

  // Park autocomplete functionality
  const {
    suggestions,
    isLoading: isLoadingParks,
    error: parkError,
    hasMinCharacters,
    getCountryForPark,
  } = useParkAutocomplete(formData.park);

  // Country autocomplete functionality
  const {
    suggestions: countrySuggestions,
    isLoading: isLoadingCountries,
    error: countryError,
    hasMinCharacters: hasMinCharactersCountry,
  } = useCountryAutocomplete(formData.country);

  // Manufacturer autocomplete functionality
  const {
    suggestions: manufacturerSuggestions,
    isLoading: isLoadingManufacturers,
    error: manufacturerError,
    hasMinCharacters: hasMinCharactersManufacturer,
  } = useManufacturerAutocomplete(formData.manufacturer, rideType);

  // Model autocomplete functionality
  const {
    suggestions: modelSuggestions,
    isLoading: isLoadingModels,
    error: modelError,
    hasMinCharacters: hasMinCharactersModel,
    hasManufacturer,
  } = useModelAutocomplete(
    formData.model || "",
    formData.manufacturer,
    rideType,
  );

  // Material and Thrill Level are plain, native form controls (not backed by
  // an autocomplete component with its own value-based onChange), so they
  // still route through their `name` attribute here. Park/Manufacturer/
  // Model/Country and Name have their own dedicated handlers below and no
  // longer carry a `name` attribute at all (see GenericAutocompleteInput.tsx
  // for why).
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    const fieldNameMap: Record<string, string> = {
      trackMaterial: "material",
      intensityLevel: "thrillLevel",
    };

    const formFieldName = fieldNameMap[name] || name;

    setFormData((prev) => ({
      ...prev,
      [formFieldName]: value,
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleParkChange = (parkName: string) => {
    const matchingCountry = getCountryForPark(parkName);

    setFormData((prev) => ({
      ...prev,
      park: parkName,
      // Auto-fill country if we find a matching park and current country is empty
      country:
        matchingCountry && !prev.country ? matchingCountry : prev.country,
    }));
  };

  const handleParkSelection = (suggestion: {
    name: string;
    country: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      park: suggestion.name,
      country: suggestion.country,
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
    }));
  };

  const handleCountrySelection = (suggestion: { country: string }) => {
    setFormData((prev) => ({
      ...prev,
      country: suggestion.country,
    }));
  };

  const handleManufacturerChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      manufacturer: value,
      // Clear model when manufacturer changes
      model: "",
    }));
  };

  const handleManufacturerSelection = (suggestion: {
    manufacturer: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      manufacturer: suggestion.manufacturer,
      // Clear model when manufacturer changes
      model: "",
    }));
  };

  const handleModelChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      model: value,
    }));
  };

  const handleModelSelection = (suggestion: { model: string }) => {
    setFormData((prev) => ({
      ...prev,
      model: suggestion.model,
    }));
  };

  // Just local form state - no side effects here. The warning and the
  // actual overwrite both happen at submit time (handleSubmit), not here,
  // so that unchecking the box or abandoning the form afterward can never
  // leave an existing Number 0 cleared with nothing to replace it.
  const handleToggleNumberZero = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isNumberZero: checked }));
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Clears the ride-specific fields after a successful add, but keeps the
  // park/country the user just entered - they're very often adding several
  // rides from the same park in a row, and re-typing/re-selecting it every
  // time is exactly what this form is meant to avoid.
  const resetFormAfterAdd = () => {
    setFormData((prev) => ({
      name: "",
      park: prev.park,
      manufacturer: "",
      model: "",
      material: "",
      thrillLevel: "",
      openingYear: "",
      country: prev.country,
      type: rideType,
      isNumberZero: false,
    }));
  };

  const addCoasterToCollection = (
    coasterToAdd: Coaster,
    baseData: typeof currentData = currentData,
  ) => {
    const existingCoasters = baseData?.coasters || [];
    const updatedData = {
      coasters: [...existingCoasters, coasterToAdd],
      uploadedAt: baseData?.uploadedAt || new Date(),
      filename: baseData?.filename || "manual-entry",
      rankingMetadata: baseData?.rankingMetadata || {
        completedComparisons: new Set<string>(),
        rankedCoasters: [],
        isRanked: false,
      },
    };

    setCurrentData(updatedData);
    setSuccess(
      `Successfully added "${coasterToAdd.name}" to your ${rideType === "coaster" ? "coaster" : "dark ride"} collection!`,
    );

    resetFormAfterAdd();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const requiredFields: Array<"name" | "park" | "manufacturer"> = [
      "name",
      "park",
      "manufacturer",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field]?.trim(),
    );

    if (missingFields.length > 0) {
      setError(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
      );
      return;
    }

    // If this ride is being marked as the Number 0, warn about (and then
    // apply) overwriting any existing one now, at the actual point of
    // submission - not when the checkbox was ticked, so cancelling out of
    // the form afterward can never leave the old one cleared with nothing
    // to replace it.
    let baseData = currentData;
    if (formData.isNumberZero) {
      const existingNumberZero = currentData?.coasters.find(
        (c) => c.isNumberZero,
      );
      if (existingNumberZero) {
        const confirmed = window.confirm(
          `${existingNumberZero.name} is currently your Number 0. Continuing will replace it with the ride you're adding now. Continue?`,
        );
        if (!confirmed) return;

        baseData = updateCoaster(currentData!, existingNumberZero.id, {
          isNumberZero: false,
        });
        setCurrentData(baseData);
      }
    }

    const parsedOpeningYear = formData.openingYear?.trim()
      ? parseInt(formData.openingYear.trim(), 10)
      : NaN;

    const newCoaster: Coaster = {
      id: generateId(),
      name: formatString(formData.name.trim(), "space", "first-word", false),
      park: formatString(formData.park.trim(), "space", "first-word", false),
      manufacturer: formatString(
        formData.manufacturer.trim(),
        "space",
        "first-word",
        false,
      ),
      ...(formData.model?.trim() && {
        model: formatString(
          formData.model.trim(),
          "space",
          "first-word",
          false,
        ),
      }),
      ...(formData.material?.trim() && {
        material: formatString(
          formData.material.trim(),
          "space",
          "first-word",
          false,
        ),
      }),
      ...(formData.thrillLevel?.trim() && {
        thrillLevel: formatString(
          formData.thrillLevel.trim(),
          "space",
          "first-word",
          false,
        ),
      }),
      ...(!isNaN(parsedOpeningYear) && { openingYear: parsedOpeningYear }),
      country: formatString(
        formData.country.trim(),
        "space",
        "first-word",
        false,
      ),
      type: rideType as RideType,
      isNewCoaster: true,
      ...(formData.isNumberZero && { isNumberZero: true }),
    };

    const duplicateResult = handleDuplicateDetection({
      newCoasters: [newCoaster],
      existingData: baseData,
      filename: baseData?.filename || "manual-entry",
    });

    if (duplicateResult.hasDuplicates) {
      // An auto-merge may have happened alongside this still-unresolved
      // duplicate - persist it immediately so it isn't lost if the user
      // cancels or never completes the resolution.
      if (duplicateResult.updatedExistingData) {
        setCurrentData(duplicateResult.updatedExistingData);
      }

      setPendingCoaster(newCoaster);
      setDuplicates(duplicateResult.duplicates);
      setShowDuplicateResolver(true);

      if (duplicateResult.autoMerged) {
        const { count, mergedCoasters } = duplicateResult.autoMerged;
        setSuccess(
          `Auto-merged data for ${count} existing coaster${count === 1 ? "" : "s"}: ${mergedCoasters.join(", ")}. Please resolve the remaining duplicate below.`,
        );
      }
    } else if (duplicateResult.autoMerged) {
      setCurrentData(duplicateResult.combinedData!);

      const { count, mergedCoasters } = duplicateResult.autoMerged;
      setSuccess(
        `Successfully merged "${newCoaster.name}" with existing data! Auto-merged data for ${count} existing coaster${count === 1 ? "" : "s"}: ${mergedCoasters.join(", ")}.`,
      );

      resetFormAfterAdd();
    } else {
      addCoasterToCollection(newCoaster, baseData);
    }
  };

  const handleDuplicateResolution = (resolutions: DuplicateResolution[]) => {
    if (!pendingCoaster) return;

    const result = processDuplicateResolution({
      resolutions,
      duplicates,
      pendingCoasters: [pendingCoaster],
      existingData: currentData,
      filename: currentData?.filename || "manual-entry",
      isPreRanked: false,
    });

    setCurrentData(result.combinedData);
    setSuccess(
      `Successfully processed ${rideType === "coaster" ? "coaster" : "dark ride"}: "${pendingCoaster.name}"!`,
    );

    setShowDuplicateResolver(false);
    setDuplicates([]);
    setPendingCoaster(null);

    resetFormAfterAdd();
  };

  const handleDuplicateCancel = () => {
    setShowDuplicateResolver(false);
    setDuplicates([]);
    setPendingCoaster(null);
    setError("Upload cancelled due to potential duplicates.");
  };

  const coasterCount = uploadedData?.coasters?.length || 0;
  const darkRideCount = darkRideData?.coasters?.length || 0;

  return (
    <MainContent>
      <Title>Add Coaster Manually</Title>

      <section>
        {(coasterCount > 0 || darkRideCount > 0) && (
          <>
            <CurrentDataInfo
              coasterCount={coasterCount}
              darkRideCount={darkRideCount}
              rideType={rideType}
            />
            <Text as="h2" colour="charcoal" fontSize="medium" mb="small">
              Enter {rideType === "coaster" ? "Coaster" : "Dark Ride"} Details
            </Text>
          </>
        )}
        {coasterCount === 0 && darkRideCount === 0 && (
          <ScreenReaderOnly as="h2">
            Enter {rideType === "coaster" ? "Coaster" : "Dark Ride"} Details
          </ScreenReaderOnly>
        )}
        <Text as="p" colour="mediumGrey" mb="small">
          Add a single {rideType === "coaster" ? "coaster" : "dark ride"} to
          your collection by filling out the form below. You can add multiple{" "}
          {rideType === "coaster" ? "coasters" : "dark rides"} by submitting the
          form multiple times.
        </Text>

        <section>
          <Styled.Form onSubmit={handleSubmit}>
            {/* Ride Type Toggle */}
            <RideTypeToggle
              value={rideType}
              onChange={(newRideType) => {
                setRideType(newRideType);
                setFormData((prev) => ({
                  ...prev,
                  type: newRideType,
                }));
              }}
            />
            <div>
              <Styled.FormRow>
                <Styled.FormGroup>
                  <Text
                    as="label"
                    bold
                    colour="charcoal"
                    fontSize="small"
                    htmlFor="coaster-name"
                  >
                    Name *
                  </Text>
                  <Styled.Input
                    type="text"
                    id="coaster-name"
                    value={formData.name || ""}
                    onChange={handleNameChange}
                    placeholder="e.g. The Smiler"
                    autoComplete="off"
                    data-form-type="other"
                    required
                  />
                </Styled.FormGroup>

                <Styled.FormGroup>
                  <ParkAutocompleteInput
                    value={formData.park}
                    onChange={handleParkChange}
                    onSuggestionSelect={handleParkSelection}
                    suggestions={suggestions}
                    placeholder="e.g. Alton Towers"
                    label="Theme Park"
                    required
                    id="theme-park"
                    autoComplete="off"
                    data-form-type="other"
                    isLoading={isLoadingParks}
                    error={parkError}
                    hasMinCharacters={hasMinCharacters}
                  />
                </Styled.FormGroup>
              </Styled.FormRow>

              <Styled.FormRow>
                <Styled.FormGroup>
                  <ManufacturerAutocompleteInput
                    value={formData.manufacturer}
                    onChange={handleManufacturerChange}
                    onSuggestionSelect={handleManufacturerSelection}
                    suggestions={manufacturerSuggestions}
                    placeholder="e.g. Steel Company"
                    label="Manufacturer"
                    required
                    id="ride-manufacturer"
                    autoComplete="off"
                    data-form-type="other"
                    isLoading={isLoadingManufacturers}
                    error={manufacturerError}
                    hasMinCharacters={hasMinCharactersManufacturer}
                  />
                </Styled.FormGroup>

                <Styled.FormGroup>
                  <ModelAutocompleteInput
                    value={formData.model || ""}
                    onChange={handleModelChange}
                    onSuggestionSelect={handleModelSelection}
                    suggestions={modelSuggestions}
                    placeholder={
                      !hasManufacturer
                        ? "Select manufacturer first"
                        : rideType === "dark-ride"
                          ? "e.g. Omnimover"
                          : "e.g. Euro-Fighter"
                    }
                    label="Model"
                    id="ride-model"
                    autoComplete="off"
                    data-form-type="other"
                    isLoading={isLoadingModels}
                    error={modelError}
                    hasMinCharacters={hasMinCharactersModel}
                    showAllOnFocusWhenEmpty
                  />
                </Styled.FormGroup>
              </Styled.FormRow>

              {/* Material - only for coasters */}
              {rideType === "coaster" && (
                <Styled.FormGroup>
                  <Text
                    as="label"
                    bold
                    colour="charcoal"
                    fontSize="small"
                    htmlFor="track-material"
                  >
                    Material
                  </Text>
                  <Styled.Select
                    id="track-material"
                    name="trackMaterial"
                    value={formData.material || ""}
                    onChange={handleInputChange}
                    autoComplete="off"
                  >
                    <option value="">Select material...</option>
                    <option value="Steel">Steel</option>
                    <option value="Wood">Wood</option>
                    <option value="Hybrid">Hybrid</option>
                  </Styled.Select>
                </Styled.FormGroup>
              )}

              {/* Thrill Level - only for coasters */}
              {rideType === "coaster" && (
                <Styled.FormGroup>
                  <Text
                    as="label"
                    bold
                    colour="charcoal"
                    fontSize="small"
                    htmlFor="intensity-level"
                  >
                    Thrill Level
                  </Text>
                  <Styled.Select
                    id="intensity-level"
                    name="intensityLevel"
                    value={formData.thrillLevel || ""}
                    onChange={handleInputChange}
                    autoComplete="off"
                  >
                    <option value="">Select thrill level...</option>
                    <option value="Kiddie">Kiddie</option>
                    <option value="Family">Family</option>
                    <option value="Family Thrill">Family Thrill</option>
                    <option value="Thrill">Thrill</option>
                  </Styled.Select>
                </Styled.FormGroup>
              )}

              <Styled.FormGroup>
                <CountryAutocompleteInput
                  value={formData.country}
                  onChange={handleCountryChange}
                  onSuggestionSelect={handleCountrySelection}
                  suggestions={countrySuggestions}
                  placeholder="e.g. Europe"
                  label="Location"
                  id="park-location"
                  autoComplete="off"
                  data-form-type="other"
                  isLoading={isLoadingCountries}
                  error={countryError}
                  hasMinCharacters={hasMinCharactersCountry}
                />
              </Styled.FormGroup>

              <Styled.FormGroup>
                <Text
                  as="label"
                  bold
                  colour="charcoal"
                  fontSize="small"
                  htmlFor="opening-year"
                >
                  Opening Year
                </Text>
                <Styled.Input
                  type="number"
                  inputMode="numeric"
                  id="opening-year"
                  name="openingYear"
                  min={1800}
                  max={new Date().getFullYear() + 2}
                  value={formData.openingYear || ""}
                  onChange={handleInputChange}
                  placeholder="e.g. 2015"
                  autoComplete="off"
                />
              </Styled.FormGroup>

              <Styled.FormGroup>
                <Styled.CheckboxLabel htmlFor="mark-number-zero">
                  <input
                    type="checkbox"
                    id="mark-number-zero"
                    checked={formData.isNumberZero}
                    onChange={(e) =>
                      handleToggleNumberZero(e.target.checked)
                    }
                  />
                  This is my Number 0 (too personally significant to rank)
                </Styled.CheckboxLabel>
              </Styled.FormGroup>
            </div>

            <Button type="submit">
              Add {rideType === "coaster" ? "Coaster" : "Dark Ride"} to
              Collection
            </Button>
          </Styled.Form>

          {showDuplicateResolver && duplicates.length > 0 && (
            <DuplicateResolver
              duplicates={duplicates}
              onResolve={handleDuplicateResolution}
              onCancel={handleDuplicateCancel}
            />
          )}

          {error && (
            <InfoMessage variant="error" role="alert" aria-live="assertive">
              <Text as="span" bold colour="errorText" fontSize="small">
                ERROR:
              </Text>
              <Text as="span" colour="errorText" fontSize="small">
                {error}
              </Text>
            </InfoMessage>
          )}

          {success && (
            <InfoMessage variant="success" role="status" aria-live="polite">
              <Text as="span" bold colour="successGreen" fontSize="small">
                SUCCESS:
              </Text>
              <Text as="span" colour="successGreen" fontSize="small">
                {success}
              </Text>
            </InfoMessage>
          )}
        </section>
      </section>
    </MainContent>
  );
}
