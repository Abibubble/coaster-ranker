import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  DataContextType,
  UploadedData,
  Coaster,
  RideType,
} from "../types/data";

const DataContext = createContext<DataContextType | undefined>(undefined);

const COASTER_STORAGE_KEY = "coaster-ranker-data";
const DARK_RIDE_STORAGE_KEY = "coaster-ranker-dark-rides";

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [uploadedData, setUploadedDataState] = useState<UploadedData | null>(
    null,
  );
  const [darkRideData, setDarkRideDataState] = useState<UploadedData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to load data from localStorage
  const loadDataFromStorage = (
    key: string,
    setState: (data: UploadedData | null) => void,
  ) => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.uploadedAt) {
          parsedData.uploadedAt = new Date(parsedData.uploadedAt);
        }

        if (parsedData.rankingMetadata) {
          const metadata = parsedData.rankingMetadata;

          if (
            metadata.completedComparisons &&
            Array.isArray(metadata.completedComparisons)
          ) {
            metadata.completedComparisons = new Set(
              metadata.completedComparisons,
            );
          } else {
            metadata.completedComparisons = new Set<string>();
          }
        }

        setState(parsedData);
      }
    } catch (error) {
      console.error(`Error loading data from localStorage (${key}):`, error);
      localStorage.removeItem(key);
    }
  };

  useEffect(() => {
    loadDataFromStorage(COASTER_STORAGE_KEY, setUploadedDataState);
    loadDataFromStorage(DARK_RIDE_STORAGE_KEY, setDarkRideDataState);
  }, []);

  // Helper function to save data to localStorage
  const saveDataToStorage = (data: UploadedData | null, key: string) => {
    try {
      if (data) {
        const dataToSave = JSON.parse(
          JSON.stringify(data, (key, value) => {
            if (key === "completedComparisons" && value instanceof Set) {
              return Array.from(value);
            }
            return value;
          }),
        );

        localStorage.setItem(key, JSON.stringify(dataToSave));
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error saving data to localStorage (${key}):`, error);
    }
  };

  const setUploadedData = useCallback((data: UploadedData | null) => {
    setUploadedDataState(data);
    saveDataToStorage(data, COASTER_STORAGE_KEY);
  }, []);

  const setDarkRideData = useCallback((data: UploadedData | null) => {
    setDarkRideDataState(data);
    saveDataToStorage(data, DARK_RIDE_STORAGE_KEY);
  }, []);

  const markRankingComplete = (finalRanking: Coaster[], rideType: RideType) => {
    const currentData = rideType === "coaster" ? uploadedData : darkRideData;
    const setData = rideType === "coaster" ? setUploadedData : setDarkRideData;
    if (!currentData) return;

    const updatedCoasters = currentData.coasters.map((coaster) => {
      const rankIndex = finalRanking.findIndex(
        (ranked) => ranked.id === coaster.id,
      );
      return {
        ...coaster,
        rankPosition: rankIndex >= 0 ? rankIndex + 1 : undefined,
      };
    });

    const updatedData = {
      ...currentData,
      coasters: updatedCoasters,
      rankingMetadata: {
        ...currentData.rankingMetadata,
        isRanked: true,
        rankedCoasters: finalRanking.map((coaster) => coaster.id),
        completedComparisons:
          currentData.rankingMetadata?.completedComparisons ??
          new Set<string>(),
        partialRankingState: undefined, // Clear partial ranking state when complete
      },
    };

    setData(updatedData);
  };

  const resetRanking = (rideType: RideType) => {
    const currentData = rideType === "coaster" ? uploadedData : darkRideData;
    const setData = rideType === "coaster" ? setUploadedData : setDarkRideData;
    if (!currentData) return;

    const resetCoasters = currentData.coasters.map((coaster) => ({
      ...coaster,
      rankPosition: undefined,
    }));

    const updatedData = {
      ...currentData,
      coasters: resetCoasters,
      rankingMetadata: {
        ...currentData.rankingMetadata,
        isRanked: false,
        rankedCoasters: [],
        completedComparisons: new Set<string>(),
        partialRankingState: undefined, // Clear partial ranking state
      },
    };

    setData(updatedData);
  };

  const savePartialRanking = useCallback(
    (
      rankedCoasterIds: string[],
      comparisonResults: Map<string, string>,
      unrankedCoasterIds: string[],
      currentComparison: {
        coasterA: { id: string };
        coasterB: { id: string };
      } | null,
      lastComparison: {
        winner: { id: string };
        loser: { id: string };
        comparison: { coasterA: { id: string }; coasterB: { id: string } };
      } | null,
      rideType: RideType,
    ) => {
      const currentData = rideType === "coaster" ? uploadedData : darkRideData;
      const setData =
        rideType === "coaster" ? setUploadedData : setDarkRideData;
      if (!currentData) return;

      // Update coaster rank positions based on current ranking progress
      const updatedCoasters = currentData.coasters.map((coaster) => {
        const rankedIndex = rankedCoasterIds.indexOf(coaster.id);

        if (rankedIndex !== -1) {
          // Coaster is ranked - set its position (1-based)
          return {
            ...coaster,
            rankPosition: rankedIndex + 1,
          };
        } else {
          // Coaster is unranked - clear its position
          return {
            ...coaster,
            rankPosition: undefined,
          };
        }
      });

      const partialRankingState = {
        rankedCoasterIds,
        comparisonResults: Array.from(comparisonResults.entries()),
        unrankedCoasterIds,
        currentComparison: currentComparison
          ? {
              coasterAId: currentComparison.coasterA.id,
              coasterBId: currentComparison.coasterB.id,
            }
          : undefined,
        lastComparison: lastComparison
          ? {
              winnerId: lastComparison.winner.id,
              loserId: lastComparison.loser.id,
              coasterAId: lastComparison.comparison.coasterA.id,
              coasterBId: lastComparison.comparison.coasterB.id,
            }
          : undefined,
      };

      const updatedData = {
        ...currentData,
        coasters: updatedCoasters,
        rankingMetadata: {
          ...currentData.rankingMetadata,
          isRanked: currentData.rankingMetadata?.isRanked ?? false,
          completedComparisons:
            currentData.rankingMetadata?.completedComparisons ??
            new Set<string>(),
          rankedCoasters: currentData.rankingMetadata?.rankedCoasters ?? [],
          partialRankingState,
        },
      };

      // Save to localStorage as well
      try {
        const storageKey =
          rideType === "coaster"
            ? "partialRankingState"
            : "partialDarkRideRankingState";
        localStorage.setItem(storageKey, JSON.stringify(partialRankingState));
      } catch (error) {
        console.warn(
          "Failed to save partial ranking state to localStorage:",
          error,
        );
      }

      setData(updatedData);
    },
    [uploadedData, darkRideData, setUploadedData, setDarkRideData],
  );

  return (
    <DataContext.Provider
      value={{
        uploadedData,
        setUploadedData,
        darkRideData,
        setDarkRideData,
        isLoading,
        setIsLoading,
        markRankingComplete,
        resetRanking,
        savePartialRanking,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
