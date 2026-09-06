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
  country: string;
  type: RideType;
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
    country: "",
    type: "coaster",
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
  } = useManufacturerAutocomplete(formData.manufacturer);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Map generic field names back to form data properties
    const fieldNameMap: Record<string, string> = {
      coasterName: "name",
      themePark: "park",
      rideManufacturer: "manufacturer",
      rideModel: "model",
      trackMaterial: "material",
      intensityLevel: "thrillLevel",
      parkLocation: "country",
    };

    const formFieldName = fieldNameMap[name] || name;

    setFormData((prev) => ({
      ...prev,
      [formFieldName]: value,
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

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const addCoasterToCollection = (coasterToAdd: Coaster) => {
    const existingCoasters = currentData?.coasters || [];
    const updatedData = {
      coasters: [...existingCoasters, coasterToAdd],
      uploadedAt: currentData?.uploadedAt || new Date(),
      filename: currentData?.filename || "manual-entry",
      rankingMetadata: currentData?.rankingMetadata || {
        completedComparisons: new Set<string>(),
        rankedCoasters: [],
        isRanked: false,
      },
    };

    setCurrentData(updatedData);
    setSuccess(
      `Successfully added "${coasterToAdd.name}" to your ${rideType === "coaster" ? "coaster" : "dark ride"} collection!`,
    );

    setFormData({
      name: "",
      park: "",
      manufacturer: "",
      model: "",
      material: "",
      thrillLevel: "",
      country: "",
      type: rideType,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const requiredFields: (keyof CoasterFormData)[] = [
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
      country: formatString(
        formData.country.trim(),
        "space",
        "first-word",
        false,
      ),
      type: rideType as RideType,
      isNewCoaster: true,
    };

    const duplicateResult = handleDuplicateDetection({
      newCoasters: [newCoaster],
      existingData: currentData,
      filename: currentData?.filename || "manual-entry",
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

      setFormData({
        name: "",
        park: "",
        manufacturer: "",
        model: "",
        material: "",
        thrillLevel: "",
        country: "",
        type: rideType,
      });
    } else {
      addCoasterToCollection(newCoaster);
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

    setFormData({
      name: "",
      park: "",
      manufacturer: "",
      model: "",
      material: "",
      thrillLevel: "",
      country: "",
      type: rideType,
    });
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
                    name="coasterName"
                    value={formData.name || ""}
                    onChange={handleInputChange}
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
                    name="themePark"
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
                    name="rideManufacturer"
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
                      hasManufacturer
                        ? "e.g. Euro-Fighter"
                        : "Select manufacturer first"
                    }
                    label="Model"
                    id="ride-model"
                    name="rideModel"
                    autoComplete="off"
                    data-form-type="other"
                    isLoading={isLoadingModels}
                    error={modelError}
                    hasMinCharacters={hasMinCharactersModel}
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
                  name="parkLocation"
                  autoComplete="off"
                  data-form-type="other"
                  isLoading={isLoadingCountries}
                  error={countryError}
                  hasMinCharacters={hasMinCharactersCountry}
                />
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
