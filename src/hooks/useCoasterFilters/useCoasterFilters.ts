import { useState, useMemo } from "react";
import { Coaster } from "../../types/data";
import { resolveManufacturerGroup } from "../../utils/manufacturerGrouping";

export interface FilterOptions {
  park: string;
  manufacturer: string;
  model: string;
  material: string;
  thrillLevel: string;
  country: string;
  openingYear: string;
}

export interface UseCoasterFiltersReturn {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  filteredCoasters: Coaster[];
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
  updateFilter: (field: keyof FilterOptions, value: string) => void;
}

export const useCoasterFilters = (
  allCoasters: Coaster[],
  manufacturerAliasMap: Map<string, string> = new Map(),
): UseCoasterFiltersReturn => {
  const [filters, setFilters] = useState<FilterOptions>({
    park: "",
    manufacturer: "",
    model: "",
    material: "",
    thrillLevel: "",
    country: "",
    openingYear: "",
  });

  const filteredCoasters = useMemo(() => {
    let result = [...allCoasters];

    if (filters.park) {
      result = result.filter((coaster) =>
        coaster.park.toLowerCase().includes(filters.park.toLowerCase()),
      );
    }
    if (filters.manufacturer) {
      const filterGroup = resolveManufacturerGroup(
        filters.manufacturer,
        manufacturerAliasMap,
      );
      result = result.filter((coaster) => {
        const isSubstringMatch = coaster.manufacturer
          .toLowerCase()
          .includes(filters.manufacturer.toLowerCase());
        const isSameManufacturerGroup =
          resolveManufacturerGroup(coaster.manufacturer, manufacturerAliasMap) ===
          filterGroup;

        return isSubstringMatch || isSameManufacturerGroup;
      });
    }
    if (filters.model) {
      const filterTerm = filters.model.toLowerCase().trim();
      result = result.filter((coaster) => {
        const coasterModel = coaster.model?.toLowerCase().trim();
        if (!coasterModel) return false;
        if (coasterModel === filterTerm) return true;
        return coasterModel.startsWith(filterTerm);
      });
    }
    if (filters.material) {
      result = result.filter((coaster) =>
        coaster.material
          ?.toLowerCase()
          .includes(filters.material.toLowerCase()),
      );
    }
    if (filters.thrillLevel) {
      result = result.filter((coaster) =>
        coaster.thrillLevel
          ?.toLowerCase()
          .includes(filters.thrillLevel.toLowerCase()),
      );
    }
    if (filters.country) {
      result = result.filter((coaster) =>
        coaster.country.toLowerCase().includes(filters.country.toLowerCase()),
      );
    }
    if (filters.openingYear) {
      result = result.filter(
        (coaster) => String(coaster.openingYear ?? "") === filters.openingYear,
      );
    }

    return result;
  }, [allCoasters, filters, manufacturerAliasMap]);

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter !== "",
  );

  const clearAllFilters = () => {
    setFilters({
      park: "",
      manufacturer: "",
      model: "",
      material: "",
      thrillLevel: "",
      country: "",
      openingYear: "",
    });
  };

  const updateFilter = (field: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    filters,
    setFilters,
    filteredCoasters,
    hasActiveFilters,
    clearAllFilters,
    updateFilter,
  };
};
