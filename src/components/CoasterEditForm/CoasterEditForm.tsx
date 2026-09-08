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
  openingYear: string;
  isNumberZero: boolean;
}

interface CoasterEditFormProps {
  coaster: Coaster;
  editForm: EditableCoaster;
  rideType: RideType;
  onFormChange: (field: keyof EditableCoaster, value: string) => void;
  onToggleNumberZero: (value: boolean) => void;
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
  onToggleNumberZero,
  onSave,
  onCancel,
  onParkSelection,
  onCountrySelection,
  autocomplete,
}) => {
  const hasMaterial = rideType === "coaster";
  const hasThrillLevel = rideType === "coaster";

  return (
    <>
      <Styled.CoasterHeader>
        <Styled.CoasterTitle>
          <Text as="h3" fontSize="large" colour="charcoal" mb="tiny">
            Editing: {coaster.name}
          </Text>
        </Styled.CoasterTitle>
        {coaster.isNumberZero ? (
          <Styled.NumberZeroBadge>Number 0</Styled.NumberZeroBadge>
        ) : (
          coaster.rankPosition && (
            <Styled.RankBadge>#{coaster.rankPosition}</Styled.RankBadge>
          )
        )}
      </Styled.CoasterHeader>

      <Styled.EditForm>
        <Styled.FormField>
          <Styled.FormLabel htmlFor="edit-name">Name *</Styled.FormLabel>
          <Styled.FormInput
            id="edit-name"
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
            autoComplete="off"
            required
            isLoading={autocomplete.manufacturer.isLoading}
            error={autocomplete.manufacturer.error}
            hasMinCharacters={autocomplete.manufacturer.hasMinCharacters}
          />
        </Styled.FormField>

        <Styled.FormField>
          <Styled.FormLabel>Model</Styled.FormLabel>
          <ModelAutocompleteInput
            value={editForm.model}
            onChange={(value) => onFormChange("model", value)}
            suggestions={autocomplete.model.suggestions}
            placeholder={
              rideType === "dark-ride" ? "e.g. Omnimover" : "e.g. Invert"
            }
            label=""
            id="edit-model"
            autoComplete="off"
            isLoading={autocomplete.model.isLoading}
            error={autocomplete.model.error}
            hasMinCharacters={autocomplete.model.hasMinCharacters}
            showAllOnFocusWhenEmpty
          />
        </Styled.FormField>

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
            autoComplete="off"
            required
            isLoading={autocomplete.country.isLoading}
            error={autocomplete.country.error}
            hasMinCharacters={autocomplete.country.hasMinCharacters}
          />
        </Styled.FormField>

        <Styled.FormField>
          <Styled.FormLabel htmlFor="edit-opening-year">
            Opening Year
          </Styled.FormLabel>
          <Styled.FormInput
            id="edit-opening-year"
            type="number"
            inputMode="numeric"
            min={1800}
            max={new Date().getFullYear() + 2}
            value={editForm.openingYear}
            onChange={(e) => onFormChange("openingYear", e.target.value)}
          />
        </Styled.FormField>

        {hasMaterial && (
          <Styled.FormField>
            <Styled.FormLabel htmlFor="edit-material">
              Material
            </Styled.FormLabel>
            <Styled.FormInput
              id="edit-material"
              type="text"
              value={editForm.material}
              onChange={(e) => onFormChange("material", e.target.value)}
            />
          </Styled.FormField>
        )}

        {hasThrillLevel && (
          <Styled.FormField>
            <Styled.FormLabel htmlFor="edit-thrill-level">
              Thrill Level
            </Styled.FormLabel>
            <FilterSelect
              id="edit-thrill-level"
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

        <Styled.FormField>
          <Styled.CheckboxLabel htmlFor="edit-number-zero">
            <input
              type="checkbox"
              id="edit-number-zero"
              checked={editForm.isNumberZero}
              onChange={(e) => onToggleNumberZero(e.target.checked)}
            />
            This is my Number 0 (too personally significant to rank)
          </Styled.CheckboxLabel>
        </Styled.FormField>
      </Styled.EditForm>

      <Styled.FormActions>
        <Button variant="default" onClick={onCancel} aria-label="Cancel editing">
          Cancel
        </Button>
        <Button variant="default" onClick={onSave} aria-label="Save changes">
          Save
        </Button>
      </Styled.FormActions>
    </>
  );
};
