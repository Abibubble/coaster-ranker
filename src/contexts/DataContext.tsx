import React, { createContext, useContext, useState, useEffect } from 'react'
import { DataContextType, UploadedData } from '../types/data'

const DataContext = createContext<DataContextType | undefined>(undefined)

const STORAGE_KEY = 'coaster-ranker-data'

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [uploadedData, setUploadedDataState] = useState<UploadedData | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        // Convert uploadedAt back to Date object
        if (parsedData.uploadedAt) {
          parsedData.uploadedAt = new Date(parsedData.uploadedAt)
        }
        setUploadedDataState(parsedData)
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
      // If there's an error, clear the corrupted data
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  // Custom setter that also saves to localStorage
  const setUploadedData = (data: UploadedData | null) => {
    setUploadedDataState(data)

    try {
      if (data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
    }
  }

  return (
    <DataContext.Provider
      value={{
        uploadedData,
        setUploadedData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
