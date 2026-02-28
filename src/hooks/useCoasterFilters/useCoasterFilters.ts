import { useState, useMemo } from "react";
import { Coaster } from "../../types/data";

export interface FilterOptions {
  park: string;
  manufacturer: string;
  model: string;
  material: string;
  thrillLevel: string;
  country: string;
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
): UseCoasterFiltersReturn => {
  const [filters, setFilters] = useState<FilterOptions>({
    park: "",
    manufacturer: "",
    model: "",
    material: "",
    thrillLevel: "",
    country: "",
  });

  const filteredCoasters = useMemo(() => {
    let result = [...allCoasters];

    if (filters.park) {
      result = result.filter((coaster) =>
        coaster.park.toLowerCase().includes(filters.park.toLowerCase()),
      );
    }
    if (filters.manufacturer) {
      result = result.filter((coaster) =>
        coaster.manufacturer
          .toLowerCase()
          .includes(filters.manufacturer.toLowerCase()),
      );
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

    return result;
  }, [allCoasters, filters]);

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
