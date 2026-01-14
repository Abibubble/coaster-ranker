import React, { createContext, useContext, useState, useEffect } from "react";
import { DataContextType, UploadedData, Coaster } from "../types/data";

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = "coaster-ranker-data";

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [uploadedData, setUploadedDataState] = useState<UploadedData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Convert uploadedAt back to Date object
        if (parsedData.uploadedAt) {
          parsedData.uploadedAt = new Date(parsedData.uploadedAt);
        }

        // Convert ranking metadata back to proper types
        if (parsedData.rankingMetadata) {
          const metadata = parsedData.rankingMetadata;

          // Convert completedComparisons array back to Set
          if (
            metadata.completedComparisons &&
            Array.isArray(metadata.completedComparisons)
          ) {
            metadata.completedComparisons = new Set(
              metadata.completedComparisons
            );
          } else {
            metadata.completedComparisons = new Set<string>();
          }
        }

        setUploadedDataState(parsedData);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      // If there's an error, clear the corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Custom setter that also saves to localStorage
  const setUploadedData = (data: UploadedData | null) => {
    setUploadedDataState(data);

    try {
      if (data) {
        // Prepare data for JSON serialization
        const dataToSave = JSON.parse(
          JSON.stringify(data, (key, value) => {
            // Custom serialization for Set and Map
            if (key === "completedComparisons" && value instanceof Set) {
              return Array.from(value);
            }
            return value;
          })
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  // Function to mark ranking as complete
  const markRankingComplete = (finalRanking: Coaster[]) => {
    if (!uploadedData) return;

    const updatedData = {
      ...uploadedData,
      rankingMetadata: {
        ...uploadedData.rankingMetadata,
        isRanked: true,
        rankedCoasters: finalRanking.map((coaster) => coaster.id),
        completedComparisons:
          uploadedData.rankingMetadata?.completedComparisons ||
          new Set<string>(),
      },
    };

    setUploadedData(updatedData);
  };

  return (
    <DataContext.Provider
      value={{
        uploadedData,
        setUploadedData,
        isLoading,
        setIsLoading,
        markRankingComplete,
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
