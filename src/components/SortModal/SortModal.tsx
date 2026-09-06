import React from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import * as Styled from "./SortModal.styled.js";

export type SortField =
  | "name"
  | "park"
  | "manufacturer"
  | "country"
  | "model"
  | "material"
  | "thrillLevel"
  | "rankPosition";
export type SortDirection = "asc" | "desc";

export interface SortOption {
  field: SortField;
  direction: SortDirection;
  label: string;
}

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: (field: SortField, direction: SortDirection) => void;
  currentSort: { field: SortField; direction: SortDirection } | null;
  hasRanking: boolean;
  hasModel?: boolean;
}

export const SortModal: React.FC<SortModalProps> = ({
  isOpen,
  onClose,
  onSort,
  currentSort,
  hasRanking,
  hasModel = true,
}) => {
  const sortOptions: SortOption[] = [
    // Name sorting
    { field: "name", direction: "asc", label: "Ride Name (A-Z)" },
    { field: "name", direction: "desc", label: "Ride Name (Z-A)" },

    // Park sorting
    { field: "park", direction: "asc", label: "Park Name (A-Z)" },
    { field: "park", direction: "desc", label: "Park Name (Z-A)" },

    // Manufacturer sorting
    { field: "manufacturer", direction: "asc", label: "Manufacturer (A-Z)" },
    { field: "manufacturer", direction: "desc", label: "Manufacturer (Z-A)" },
  ];

  // Model doesn't apply to dark rides
  if (hasModel) {
    sortOptions.push(
      { field: "model", direction: "asc", label: "Model (A-Z)" },
      { field: "model", direction: "desc", label: "Model (Z-A)" },
    );
  }

  // Add ranking options if available
  if (hasRanking) {
    sortOptions.push(
      {
        field: "rankPosition",
        direction: "asc",
        label: "Rankings (Top to Bottom)",
      },
      {
        field: "rankPosition",
        direction: "desc",
        label: "Rankings (Bottom to Top)",
      },
    );
  }

  const handleSortClick = (field: SortField, direction: SortDirection) => {
    onSort(field, direction);
    onClose();
  };

  const isCurrentSort = (field: SortField, direction: SortDirection) => {
    return currentSort?.field === field && currentSort?.direction === direction;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sort coasters"
      ariaLabel="Sort coasters by different criteria"
    >
      <Styled.SortOptions>
        {sortOptions.map((option) => (
          <Styled.SortOption
            key={`${option.field}-${option.direction}`}
            $isActive={isCurrentSort(option.field, option.direction)}
            onClick={() => handleSortClick(option.field, option.direction)}
            aria-pressed={isCurrentSort(option.field, option.direction)}
          >
            <Styled.SortOptionLabel>{option.label}</Styled.SortOptionLabel>
            {isCurrentSort(option.field, option.direction) && (
              <Styled.CheckIcon />
            )}
          </Styled.SortOption>
        ))}
      </Styled.SortOptions>

      <Styled.Actions>
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
      </Styled.Actions>
    </Modal>
  );
};
