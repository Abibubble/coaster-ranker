import React, { createContext, useContext, useState, useEffect } from "react";
import { DataContextType, UploadedData, Coaster } from "../types/data";

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = "coaster-ranker-data";

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [uploadedData, setUploadedDataState] = useState<UploadedData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
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

        setUploadedDataState(parsedData);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const setUploadedData = (data: UploadedData | null) => {
    setUploadedDataState(data);

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

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  const markRankingComplete = (finalRanking: Coaster[]) => {
    if (!uploadedData) return;

    console.log("=== MARK RANKING COMPLETE DEBUG ===");
    console.log(
      "Input finalRanking:",
      finalRanking.map((c) => c.name),
    );
    console.log("finalRanking length:", finalRanking.length);

    const updatedCoasters = uploadedData.coasters.map((coaster) => {
      const rankIndex = finalRanking.findIndex(
        (ranked) => ranked.id === coaster.id,
      );
      return {
        ...coaster,
        rankPosition: rankIndex >= 0 ? rankIndex + 1 : undefined,
      };
    });

    const updatedData = {
      ...uploadedData,
      coasters: updatedCoasters,
      rankingMetadata: {
        ...uploadedData.rankingMetadata,
        isRanked: true,
        rankedCoasters: finalRanking.map((coaster) => coaster.id),
        completedComparisons:
          uploadedData.rankingMetadata?.completedComparisons ||
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

    setUploadedData(updatedData);
  };

  const resetRanking = () => {
    if (!uploadedData) return;

    const resetCoasters = uploadedData.coasters.map((coaster) => ({
      ...coaster,
      rankPosition: undefined,
    }));

    const updatedData = {
      ...uploadedData,
      coasters: resetCoasters,
      rankingMetadata: {
        ...uploadedData.rankingMetadata,
        isRanked: false,
        rankedCoasters: [],
        completedComparisons: new Set<string>(),
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
