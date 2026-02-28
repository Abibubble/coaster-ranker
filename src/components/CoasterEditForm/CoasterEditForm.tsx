import React from "react";
import {
  Button,
  ParkAutocompleteInput,
  CountryAutocompleteInput,
  ManufacturerAutocompleteInput,
  ModelAutocompleteInput,
  Text,
} from "../index";
import { Coaster, RideType } from "../../types/data";
import {
  ParkSuggestion,
  CountrySuggestion,
  ManufacturerSuggestion,
  ModelSuggestion,
} from "../../hooks";
import * as Styled from "./CoasterEditForm.styled";
import { FilterSelect } from "../FilterSection/FilterSection.styled";

export interface EditableCoaster {
  name: string;
  park: string;
  manufacturer: string;
  model: string;
  material: string;
  thrillLevel: string;
  country: string;
}

interface CoasterEditFormProps {
  coaster: Coaster;
  editForm: EditableCoaster;
  rideType: RideType;
  onFormChange: (field: keyof EditableCoaster, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onParkSelection: (suggestion: { name: string; country: string }) => void;
  onCountrySelection: (suggestion: { country: string }) => void;
  autocomplete: {
    park: {
      suggestions: ParkSuggestion[];
      isLoading: boolean;
      error: string | null;
      hasMinCharacters: boolean;
    };
    country: {
      suggestions: CountrySuggestion[];
      isLoading: boolean;
      error: string | null;
      hasMinCharacters: boolean;
    };
    manufacturer: {
      suggestions: ManufacturerSuggestion[];
      isLoading: boolean;
      error: string | null;
      hasMinCharacters: boolean;
    };
    model: {
      suggestions: ModelSuggestion[];
      isLoading: boolean;
      error: string | null;
      hasMinCharacters: boolean;
      hasManufacturer: boolean;
    };
  };
}

export const CoasterEditForm: React.FC<CoasterEditFormProps> = ({
  coaster,
  editForm,
  rideType,
  onFormChange,
  onSave,
  onCancel,
  onParkSelection,
  onCountrySelection,
  autocomplete,
}) => {
  const hasModel = rideType === "coaster";
  const hasMaterial = rideType === "coaster";
  const hasThrillLevel = rideType === "coaster";

  return (
    <>
      <Styled.DesktopLayout>
        <Styled.CoasterHeader>
          <Styled.CoasterTitle>
            <Text as="h3" fontSize="large" colour="charcoal" mb="tiny">
              Editing: {coaster.name}
            </Text>
          </Styled.CoasterTitle>
          {coaster.rankPosition && (
            <Styled.RankBadge>#{coaster.rankPosition}</Styled.RankBadge>
          )}
        </Styled.CoasterHeader>

        <Styled.EditForm>
          <Styled.FormField>
            <Styled.FormLabel>Name *</Styled.FormLabel>
            <Styled.FormInput
              type="text"
              value={editForm.name}
              onChange={(e) => onFormChange("name", e.target.value)}
              required
            />
          </Styled.FormField>

          <Styled.FormField>
            <Styled.FormLabel>Park *</Styled.FormLabel>
            <ParkAutocompleteInput
              value={editForm.park}
              onChange={(value) => onFormChange("park", value)}
              onSuggestionSelect={onParkSelection}
              suggestions={autocomplete.park.suggestions}
              placeholder="e.g. Alton Towers"
              label=""
              id="edit-park"
              name="editPark"
              autoComplete="off"
              required
              isLoading={autocomplete.park.isLoading}
              error={autocomplete.park.error}
              hasMinCharacters={autocomplete.park.hasMinCharacters}
            />
          </Styled.FormField>

          <Styled.FormField>
            <Styled.FormLabel>Manufacturer *</Styled.FormLabel>
            <ManufacturerAutocompleteInput
              value={editForm.manufacturer}
              onChange={(value) => onFormChange("manufacturer", value)}
              suggestions={autocomplete.manufacturer.suggestions}
              placeholder="e.g. B&M"
              label=""
              id="edit-manufacturer"
              name="editManufacturer"
              autoComplete="off"
              required
              isLoading={autocomplete.manufacturer.isLoading}
              error={autocomplete.manufacturer.error}
              hasMinCharacters={autocomplete.manufacturer.hasMinCharacters}
            />
          </Styled.FormField>

          {hasModel && (
            <Styled.FormField>
              <Styled.FormLabel>Model</Styled.FormLabel>
              <ModelAutocompleteInput
                value={editForm.model}
                onChange={(value) => onFormChange("model", value)}
                suggestions={autocomplete.model.suggestions}
                placeholder="e.g. Invert"
                label=""
                id="edit-model"
                name="editModel"
                autoComplete="off"
                isLoading={autocomplete.model.isLoading}
                error={autocomplete.model.error}
                hasMinCharacters={autocomplete.model.hasMinCharacters}
              />
            </Styled.FormField>
          )}

          <Styled.FormField>
            <Styled.FormLabel>Country *</Styled.FormLabel>
            <CountryAutocompleteInput
              value={editForm.country}
              onChange={(value) => onFormChange("country", value)}
              onSuggestionSelect={onCountrySelection}
              suggestions={autocomplete.country.suggestions}
              placeholder="e.g. United Kingdom"
              label=""
              id="edit-country"
              name="editCountry"
              autoComplete="off"
              required
              isLoading={autocomplete.country.isLoading}
              error={autocomplete.country.error}
              hasMinCharacters={autocomplete.country.hasMinCharacters}
            />
          </Styled.FormField>

          {hasMaterial && (
            <Styled.FormField>
              <Styled.FormLabel>Material</Styled.FormLabel>
              <Styled.FormInput
                type="text"
                value={editForm.material}
                onChange={(e) => onFormChange("material", e.target.value)}
              />
            </Styled.FormField>
          )}

          {hasThrillLevel && (
            <Styled.FormField>
              <Styled.FormLabel>Thrill Level</Styled.FormLabel>
              <FilterSelect
                value={editForm.thrillLevel}
                onChange={(e) => onFormChange("thrillLevel", e.target.value)}
              >
                <option value="">Select thrill level...</option>
                <option value="Kiddie">Kiddie</option>
                <option value="Family">Family</option>
                <option value="Family Thrill">Family Thrill</option>
                <option value="Thrill">Thrill</option>
              </FilterSelect>
            </Styled.FormField>
          )}
        </Styled.EditForm>

        <Styled.FormActions>
          <Button
            variant="default"
            onClick={onCancel}
            aria-label="Cancel editing"
          >
            Cancel
          </Button>
          <Button variant="default" onClick={onSave} aria-label="Save changes">
            Save
          </Button>
        </Styled.FormActions>
      </Styled.DesktopLayout>

      {/* Mobile layout would go here - similar structure but adapted for mobile */}
    </>
  );
};
