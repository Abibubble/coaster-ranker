import React, { useState } from "react";
import {
  ParkAutocompleteInput,
  CountryAutocompleteInput,
  ManufacturerAutocompleteInput,
  Button,
  CurrentDataInfo,
  DuplicateResolver,
  InfoMessage,
  MainContent,
  ScreenReaderOnly,
  Title,
  Text,
} from "../../components";
import { useData } from "../../contexts/DataContext";
import {
  useParkAutocomplete,
  useCountryAutocomplete,
  useManufacturerAutocomplete,
} from "../../hooks";
import { Coaster } from "../../types/data";
import {
  detectDuplicates,
  DuplicateMatch,
  formatString,
  mergeCoasterData,
  getMergedFields,
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
}

export default function UploadManual() {
  const { uploadedData, setUploadedData } = useData();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [duplicates, setDuplicates] = useState<DuplicateMatch[]>([]);
  const [pendingCoaster, setPendingCoaster] = useState<Coaster | null>(null);
  const [showDuplicateResolver, setShowDuplicateResolver] = useState(false);

  const [formData, setFormData] = useState<CoasterFormData>({
    name: "",
    park: "",
    manufacturer: "",
    model: "",
    material: "",
    thrillLevel: "",
    country: "",
  });

  // Park autocomplete functionality
  const {
    suggestions,
    isLoading: isLoadingParks,
    error: parkError,
    hasMinCharacters,
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
    setFormData((prev) => ({
      ...prev,
      park: parkName,
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
    }));
  };

  const handleManufacturerSelection = (suggestion: {
    manufacturer: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      manufacturer: suggestion.manufacturer,
    }));
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const addCoasterToCollection = (coasterToAdd: Coaster) => {
    const existingCoasters = uploadedData?.coasters || [];
    const updatedData = {
      coasters: [...existingCoasters, coasterToAdd],
      uploadedAt: uploadedData?.uploadedAt || new Date(),
      filename: uploadedData?.filename || "manual-entry",
      rankingMetadata: uploadedData?.rankingMetadata || {
        completedComparisons: new Set<string>(),
        rankedCoasters: [],
        isRanked: false,
      },
    };

    setUploadedData(updatedData);
    setSuccess(`Successfully added "${coasterToAdd.name}" to your collection!`);

    setFormData({
      name: "",
      park: "",
      manufacturer: "",
      model: "",
      material: "",
      thrillLevel: "",
      country: "",
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
      isNewCoaster: true,
    };

    const existingCoasters = uploadedData?.coasters || [];
    const duplicateCheck = detectDuplicates(existingCoasters, [newCoaster]);

    if (duplicateCheck.autoMerges.length > 0) {
      const autoMerge = duplicateCheck.autoMerges[0];
      const mergedCoaster = mergeCoasterData(
        autoMerge.existingCoaster,
        newCoaster,
      );
      const mergedFields = getMergedFields(
        autoMerge.existingCoaster,
        newCoaster,
      );

      const updatedCoasters = existingCoasters.map((coaster) =>
        coaster.id === autoMerge.existingCoaster.id ? mergedCoaster : coaster,
      );

      const updatedData = {
        coasters: updatedCoasters,
        uploadedAt: uploadedData?.uploadedAt || new Date(),
        filename: uploadedData?.filename || "manual-entry",
        rankingMetadata: uploadedData?.rankingMetadata || {
          completedComparisons: new Set<string>(),
          rankedCoasters: [],
          isRanked: false,
        },
      };

      setUploadedData(updatedData);

      if (mergedFields.length > 0) {
        setSuccess(
          `Successfully merged "${newCoaster.name}" with existing data! Added: ${mergedFields.join(", ")}.`,
        );
      } else {
        setSuccess(
          `"${newCoaster.name}" already exists with all the same data. No changes made.`,
        );
      }

      setFormData({
        name: "",
        park: "",
        manufacturer: "",
        model: "",
        material: "",
        thrillLevel: "",
        country: "",
      });

      return;
    }

    if (duplicateCheck.hasDuplicates) {
      setDuplicates(duplicateCheck.duplicates);
      setPendingCoaster(newCoaster);
      setShowDuplicateResolver(true);
    } else {
      addCoasterToCollection(newCoaster);
    }
  };

  const handleDuplicateResolution = (resolutions: DuplicateResolution[]) => {
    if (!pendingCoaster) return;

    const existingCoasters = uploadedData?.coasters || [];
    let updatedCoasters = [...existingCoasters];

    resolutions.forEach((resolution, index) => {
      const duplicate = duplicates[index];

      switch (resolution.action) {
        case "keep-new":
          updatedCoasters = updatedCoasters.filter(
            (c) => c.id !== duplicate.existingCoaster.id,
          );
          updatedCoasters.push(pendingCoaster);
          break;
        case "keep-both":
          updatedCoasters.push(pendingCoaster);
          break;
      }
    });

    const updatedData = {
      coasters: updatedCoasters,
      uploadedAt: uploadedData?.uploadedAt || new Date(),
      filename: uploadedData?.filename || "manual-entry",
      rankingMetadata: uploadedData?.rankingMetadata || {
        completedComparisons: new Set<string>(),
        rankedCoasters: [],
        isRanked: false,
      },
    };

    setUploadedData(updatedData);
    setSuccess(`Successfully processed coaster: "${pendingCoaster.name}"!`);

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
    });
  };

  const handleDuplicateCancel = () => {
    setShowDuplicateResolver(false);
    setDuplicates([]);
    setPendingCoaster(null);
    setError("Upload cancelled due to potential duplicates.");
  };

  const coasterCount = uploadedData?.coasters?.length || 0;

  return (
    <MainContent>
      <Title>Add Coaster Manually</Title>

      <section>
        {coasterCount > 0 && (
          <>
            <CurrentDataInfo coasterCount={coasterCount} />
            <Text as="h2" colour="charcoal" fontSize="medium" mb="small">
              Enter Coaster Details
            </Text>
          </>
        )}
        {coasterCount === 0 && (
          <ScreenReaderOnly as="h2">Enter Coaster Details</ScreenReaderOnly>
        )}
        <Text as="p" colour="mediumGrey" mb="small">
          Add a single coaster to your collection by filling out the form below.
          You can add multiple coasters by submitting the form multiple times.
        </Text>

        <section>
          <Styled.Form onSubmit={handleSubmit}>
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
                  <Text
                    as="label"
                    bold
                    colour="charcoal"
                    fontSize="small"
                    htmlFor="ride-model"
                  >
                    Model
                  </Text>
                  <Styled.Input
                    type="text"
                    id="ride-model"
                    name="rideModel"
                    value={formData.model || ""}
                    onChange={handleInputChange}
                    placeholder="e.g. Euro-Fighter"
                    autoComplete="off"
                    data-form-type="other"
                  />
                </Styled.FormGroup>
              </Styled.FormRow>

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

            <Button type="submit">Add Coaster to Collection</Button>
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
