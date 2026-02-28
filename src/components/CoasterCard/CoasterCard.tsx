import React from "react";
import { Button, Text } from "../index";
import { Coaster, RideType } from "../../types/data";
import { CoasterEditForm, EditableCoaster } from "../CoasterEditForm";
import {
  ParkSuggestion,
  CountrySuggestion,
  ManufacturerSuggestion,
  ModelSuggestion,
} from "../../hooks";
import * as Styled from "./CoasterCard.styled";

interface CoasterCardProps {
  coaster: Coaster;
  rideType: RideType;
  isEditing: boolean;
  editForm?: EditableCoaster;
  isRanked?: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onFieldClick: (field: string, value: string) => void;
  onFormChange?: (field: keyof EditableCoaster, value: string) => void;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
  onParkSelection?: (suggestion: { name: string; country: string }) => void;
  onCountrySelection?: (suggestion: { country: string }) => void;
  autocomplete?: {
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

export const CoasterCard: React.FC<CoasterCardProps> = ({
  coaster,
  rideType,
  isEditing,
  editForm,
  isRanked,
  onEdit,
  onRemove,
  onFieldClick,
  onFormChange,
  onSaveEdit,
  onCancelEdit,
  onParkSelection,
  onCountrySelection,
  autocomplete,
}) => {
  if (
    isEditing &&
    editForm &&
    onFormChange &&
    onSaveEdit &&
    onCancelEdit &&
    onParkSelection &&
    onCountrySelection &&
    autocomplete
  ) {
    return (
      <CoasterEditForm
        coaster={coaster}
        editForm={editForm}
        rideType={rideType}
        onFormChange={onFormChange}
        onSave={onSaveEdit}
        onCancel={onCancelEdit}
        onParkSelection={onParkSelection}
        onCountrySelection={onCountrySelection}
        autocomplete={autocomplete}
      />
    );
  }

  return (
    <>
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
              {isRanked && coaster.rankPosition && (
                <Styled.RankBadge>#{coaster.rankPosition}</Styled.RankBadge>
              )}
              <Text as="h3" fontSize="large" colour="charcoal">
                {coaster.name}
              </Text>
            </div>
          </Styled.CoasterTitle>
          <Styled.CoasterActions>
            <Button
              variant="default"
              onClick={onEdit}
              aria-label={`Edit ${coaster.name}`}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={onRemove}
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
              onClick={() => onFieldClick("park", coaster.park)}
              title={`Filter by park: ${coaster.park}`}
              aria-label={`Filter by park: ${coaster.park}`}
            >
              {coaster.park}
            </Styled.ClickableFieldValue>
          </Styled.CoasterField>

          <Styled.CoasterField>
            <Styled.FieldLabel>Manufacturer</Styled.FieldLabel>
            <Styled.ClickableFieldValue
              onClick={() => onFieldClick("manufacturer", coaster.manufacturer)}
              title={`Filter by manufacturer: ${coaster.manufacturer}`}
              aria-label={`Filter by manufacturer: ${coaster.manufacturer}`}
            >
              {coaster.manufacturer}
            </Styled.ClickableFieldValue>
          </Styled.CoasterField>

          {coaster.model && (
            <Styled.CoasterField>
              <Styled.FieldLabel>Model</Styled.FieldLabel>
              <Styled.ClickableFieldValue
                onClick={() => onFieldClick("model", coaster.model || "")}
                title={`Filter by model: ${coaster.model}`}
                aria-label={`Filter by model: ${coaster.model}`}
              >
                {coaster.model}
              </Styled.ClickableFieldValue>
            </Styled.CoasterField>
          )}

          {coaster.material && (
            <Styled.CoasterField>
              <Styled.FieldLabel>Material</Styled.FieldLabel>
              <Styled.ClickableFieldValue
                onClick={() => onFieldClick("material", coaster.material || "")}
                title={`Filter by material: ${coaster.material}`}
                aria-label={`Filter by material: ${coaster.material}`}
              >
                {coaster.material}
              </Styled.ClickableFieldValue>
            </Styled.CoasterField>
          )}

          {coaster.thrillLevel && (
            <Styled.CoasterField>
              <Styled.FieldLabel>Thrill Level</Styled.FieldLabel>
              <Styled.ClickableFieldValue
                onClick={() =>
                  onFieldClick("thrillLevel", coaster.thrillLevel || "")
                }
                title={`Filter by thrill level: ${coaster.thrillLevel}`}
                aria-label={`Filter by thrill level: ${coaster.thrillLevel}`}
              >
                {coaster.thrillLevel}
              </Styled.ClickableFieldValue>
            </Styled.CoasterField>
          )}

          {coaster.country && (
            <Styled.CoasterField>
              <Styled.FieldLabel>Country</Styled.FieldLabel>
              <Styled.ClickableFieldValue
                onClick={() => onFieldClick("country", coaster.country)}
                title={`Filter by country: ${coaster.country}`}
                aria-label={`Filter by country: ${coaster.country}`}
              >
                {coaster.country}
              </Styled.ClickableFieldValue>
            </Styled.CoasterField>
          )}
        </Styled.CoasterDetails>
      </Styled.DesktopLayout>

      <Styled.MobileLayout>
        {isRanked && coaster.rankPosition && (
          <Styled.CoasterField>
            <Styled.FieldLabel>Rank</Styled.FieldLabel>
            <Styled.RankBadge>#{coaster.rankPosition}</Styled.RankBadge>
          </Styled.CoasterField>
        )}

        <Styled.CoasterField>
          <Styled.FieldLabel>Name</Styled.FieldLabel>
          <Text colour="charcoal">{coaster.name}</Text>
        </Styled.CoasterField>

        <Styled.CoasterField>
          <Styled.FieldLabel>Park</Styled.FieldLabel>
          <Styled.ClickableFieldValue
            onClick={() => onFieldClick("park", coaster.park)}
            title={`Filter by park: ${coaster.park}`}
            aria-label={`Filter by park: ${coaster.park}`}
          >
            {coaster.park}
          </Styled.ClickableFieldValue>
        </Styled.CoasterField>

        <Styled.CoasterField>
          <Styled.FieldLabel>Manufacturer</Styled.FieldLabel>
          <Styled.ClickableFieldValue
            onClick={() => onFieldClick("manufacturer", coaster.manufacturer)}
            title={`Filter by manufacturer: ${coaster.manufacturer}`}
            aria-label={`Filter by manufacturer: ${coaster.manufacturer}`}
          >
            {coaster.manufacturer}
          </Styled.ClickableFieldValue>
        </Styled.CoasterField>

        {/* Additional fields for mobile */}
        {coaster.model && (
          <Styled.CoasterField>
            <Styled.FieldLabel>Model</Styled.FieldLabel>
            <Styled.ClickableFieldValue
              onClick={() => onFieldClick("model", coaster.model || "")}
              title={`Filter by model: ${coaster.model}`}
              aria-label={`Filter by model: ${coaster.model}`}
            >
              {coaster.model}
            </Styled.ClickableFieldValue>
          </Styled.CoasterField>
        )}

        {coaster.country && (
          <Styled.CoasterField>
            <Styled.FieldLabel>Country</Styled.FieldLabel>
            <Styled.ClickableFieldValue
              onClick={() => onFieldClick("country", coaster.country)}
              title={`Filter by country: ${coaster.country}`}
              aria-label={`Filter by country: ${coaster.country}`}
            >
              {coaster.country}
            </Styled.ClickableFieldValue>
          </Styled.CoasterField>
        )}

        <Styled.CoasterField>
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            <Button
              variant="default"
              onClick={onEdit}
              aria-label={`Edit ${coaster.name}`}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={onRemove}
              aria-label={`Remove ${coaster.name} from collection`}
            >
              Remove
            </Button>
          </div>
        </Styled.CoasterField>
      </Styled.MobileLayout>
    </>
  );
};
