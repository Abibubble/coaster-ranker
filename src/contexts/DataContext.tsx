import React, { createContext, useContext, useState, useEffect } from "react";
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

  const setUploadedData = (data: UploadedData | null) => {
    setUploadedDataState(data);
    saveDataToStorage(data, COASTER_STORAGE_KEY);
  };

  const setDarkRideData = (data: UploadedData | null) => {
    setDarkRideDataState(data);
    saveDataToStorage(data, DARK_RIDE_STORAGE_KEY);
  };

  const markRankingComplete = (finalRanking: Coaster[], rideType: RideType) => {
    const currentData = rideType === "coaster" ? uploadedData : darkRideData;
    const setData = rideType === "coaster" ? setUploadedData : setDarkRideData;
    if (!currentData) return;

    console.log("=== MARK RANKING COMPLETE DEBUG ===");
    console.log(
      "Input finalRanking:",
      finalRanking.map((c) => c.name),
    );
    console.log("finalRanking length:", finalRanking.length);

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
          currentData.rankingMetadata?.completedComparisons ||
          new Set<string>(),
      },
    };

    console.log(
      "rankedCoasters IDs being stored:",
      updatedData.rankingMetadata.rankedCoasters,
    );
    console.log(
      "Updated coasters with rankPosition:",
      updatedCoasters.slice(0, 5).map((c) => `${c.name}: ${c.rankPosition}`),
    );
    console.log("=== END MARK RANKING COMPLETE DEBUG ===");

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
      },
    };

    setData(updatedData);
  };

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
