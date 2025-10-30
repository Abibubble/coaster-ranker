export interface Coaster {
  id: string
  name: string
  park: string
  country: string
  manufacturer: string
  model: string
  type: string
  location?: string
  height?: number
  speed?: number
  inversions?: number
  year?: number
}

export interface UploadedData {
  coasters: Coaster[]
  uploadedAt: Date
  filename: string
}

export type DataContextType = {
  uploadedData: UploadedData | null
  setUploadedData: (data: UploadedData | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}
