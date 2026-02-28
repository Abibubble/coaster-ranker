import React from "react";
import { Button, Text } from "../index";
import { RideType } from "../../types/data";
import { FilterOptions } from "../../hooks/useCoasterFilters";
import { getUniqueFieldValues } from "../../utils/coasterOperations";
import { Coaster } from "../../types/data";
import * as Styled from "./FilterSection.styled";

interface FilterSectionProps {
  filters: FilterOptions;
  isFiltersOpen: boolean;
  hasActiveFilters: boolean;
  rideType: RideType;
  ridePluralLabel: string;
  allCoasters: Coaster[];
  onToggleFilters: () => void;
  onFilterChange: (field: keyof FilterOptions, value: string) => void;
  onClearAllFilters: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  isFiltersOpen,
  hasActiveFilters,
  rideType,
  ridePluralLabel,
  allCoasters,
  onToggleFilters,
  onFilterChange,
  onClearAllFilters,
}) => {
  const uniqueParks = getUniqueFieldValues(allCoasters, "park");
  const uniqueManufacturers = getUniqueFieldValues(allCoasters, "manufacturer");
  const uniqueMaterials = getUniqueFieldValues(allCoasters, "material");
  const uniqueCountries = getUniqueFieldValues(allCoasters, "country");
  const uniqueThrillLevels = getUniqueFieldValues(allCoasters, "thrillLevel");

  const hasModel = rideType === "coaster";
  const hasMaterial = rideType === "coaster";
  const hasThrillLevel = rideType === "coaster";

  return (
    <Styled.FiltersSection>
      <Styled.FilterHeading
        as={Text}
        colour="charcoal"
        fontSize="medium"
        mb="small"
      >
        Filter {ridePluralLabel}
      </Styled.FilterHeading>
      <Styled.FilterToggle
        onClick={onToggleFilters}
        aria-expanded={isFiltersOpen}
        aria-label={`${isFiltersOpen ? "Hide" : "Show"} filter options`}
      >
        Filter {ridePluralLabel}
        <Styled.FilterIcon $isOpen={isFiltersOpen} />
      </Styled.FilterToggle>
      <Styled.FilterContent $isOpen={isFiltersOpen}>
        <Styled.FiltersGrid>
          <Styled.FilterGroup>
            <Styled.FilterLabel>Park</Styled.FilterLabel>
            <Styled.FilterSelect
              value={filters.park}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onFilterChange("park", e.target.value)
              }
            >
              <option value="">All parks</option>
              {uniqueParks.map((park) => (
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
                onFilterChange("manufacturer", e.target.value)
              }
            >
              <option value="">All manufacturers</option>
              {uniqueManufacturers.map((manufacturer) => (
                <option key={manufacturer} value={manufacturer}>
                  {manufacturer}
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
                  onFilterChange("model", e.target.value)
                }
              >
                <option value="">All models</option>
              </Styled.FilterSelect>
            </Styled.FilterGroup>
          )}

          <Styled.FilterGroup>
            <Styled.FilterLabel>Country</Styled.FilterLabel>
            <Styled.FilterSelect
              value={filters.country}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onFilterChange("country", e.target.value)
              }
            >
              <option value="">All countries</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Styled.FilterSelect>
          </Styled.FilterGroup>

          {hasMaterial && (
            <Styled.FilterGroup>
              <Styled.FilterLabel>Material</Styled.FilterLabel>
              <Styled.FilterSelect
                value={filters.material}
                onChange={(e) => onFilterChange("material", e.target.value)}
              >
                <option value="">All materials</option>
                {uniqueMaterials.map((material) => (
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
                onChange={(e) => onFilterChange("thrillLevel", e.target.value)}
              >
                <option value="">All thrill levels</option>
                {uniqueThrillLevels.map((level) => (
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
            <Button variant="default" onClick={onClearAllFilters}>
              Clear all filters
            </Button>
          </Styled.FilterActions>
        )}
      </Styled.FilterContent>
    </Styled.FiltersSection>
  );
};
