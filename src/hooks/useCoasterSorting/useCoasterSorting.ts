import { useState, useMemo } from "react";
import { Coaster, UploadedData } from "../../types/data";
import { SortField, SortDirection } from "../../components";
import { hasAnyRanking } from "../../utils";

// A Number 0 sits above #1 when sorting by rank - it's not "unranked" (which
// falls to the bottom via MAX_SAFE_INTEGER), it's deliberately outside the
// numbered list altogether.
const rankSortKey = (coaster: Coaster): number => {
  if (coaster.isNumberZero) return -1;
  return coaster.rankPosition || Number.MAX_SAFE_INTEGER;
};

export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}

export interface UseCoasterSortingReturn {
  currentSort: SortOptions | null;
  setCurrentSort: (sort: SortOptions | null) => void;
  sortedCoasters: Coaster[];
  handleSort: (field: SortField, direction: SortDirection) => void;
  handleClearSort: () => void;
}

export const useCoasterSorting = (
  coasters: Coaster[],
  currentData: UploadedData | null,
): UseCoasterSortingReturn => {
  const [currentSort, setCurrentSort] = useState<SortOptions | null>(null);

  const sortedCoasters = useMemo(() => {
    let result = [...coasters];

    if (currentSort) {
      result.sort((a, b) => {
        const { field, direction } = currentSort;
        let valueA: string | number | undefined;
        let valueB: string | number | undefined;

        if (field === "rankPosition") {
          valueA = rankSortKey(a);
          valueB = rankSortKey(b);
        } else {
          valueA = a[field] || "";
          valueB = b[field] || "";
          if (typeof valueA === "string") valueA = valueA.toLowerCase();
          if (typeof valueB === "string") valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) {
          return direction === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    } else {
      // Default sorting by rank if available (complete or partial rankings)
      if (hasAnyRanking(result, currentData?.rankingMetadata)) {
        result.sort((a, b) => rankSortKey(a) - rankSortKey(b));
      }
    }

    return result;
  }, [coasters, currentSort, currentData]);

  const handleSort = (field: SortField, direction: SortDirection) => {
    setCurrentSort({ field, direction });
  };

  const handleClearSort = () => {
    setCurrentSort(null);
  };

  return {
    currentSort,
    setCurrentSort,
    sortedCoasters,
    handleSort,
    handleClearSort,
  };
};
