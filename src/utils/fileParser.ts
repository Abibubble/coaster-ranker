import { Coaster, UploadedData } from '../types/data'

// Raw data types for parsing - before validation
interface RawCoasterData {
  [key: string]: string | undefined
  id?: string
  name?: string
  park?: string
  country?: string
  manufacturer?: string
  model?: string
  type?: string
  location?: string
  height?: string
  speed?: string
  inversions?: string
  year?: string
}

export function parseCSV(csvText: string): RawCoasterData[] {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row')
  }

  const headers = lines[0]
    .split(',')
    .map(header => header.trim().replace(/"/g, ''))
  const data = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length !== headers.length) {
      console.warn(
        `Line ${i + 1} has ${values.length} values but expected ${
          headers.length
        }`
      )
      continue
    }

    const row: RawCoasterData = {}
    headers.forEach((header, index) => {
      row[header] = values[index] || ''
    })
    data.push(row)
  }

  return data
}

function parseCSVLine(line: string): string[] {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

export function validateCoasterData(data: RawCoasterData[]): Coaster[] {
  return data.map((item, index) => {
    if (!item.name) {
      throw new Error(`Row ${index + 1}: Coaster name is required`)
    }
    if (!item.park) {
      throw new Error(`Row ${index + 1}: Park name is required`)
    }
    if (!item.manufacturer) {
      throw new Error(`Row ${index + 1}: Manufacturer is required`)
    }
    if (!item.model) {
      throw new Error(`Row ${index + 1}: Model is required`)
    }
    if (!item.type) {
      throw new Error(`Row ${index + 1}: Type is required`)
    }

    return {
      id: item.id || `coaster_${index}`,
      name: item.name,
      park: item.park,
      country: item.country || '',
      manufacturer: item.manufacturer,
      model: item.model,
      type: item.type,
      location: item.location || '',
      height: item.height ? parseFloat(item.height) : undefined,
      speed: item.speed ? parseFloat(item.speed) : undefined,
      inversions: item.inversions ? parseInt(item.inversions) : undefined,
      year: item.year ? parseInt(item.year) : undefined,
    }
  })
}

export function processUploadedFile(
  file: File,
  content: string
): Promise<UploadedData> {
  return new Promise((resolve, reject) => {
    try {
      let data: RawCoasterData[]

      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        // Parse JSON
        const jsonData = JSON.parse(content)
        if (Array.isArray(jsonData)) {
          data = jsonData
        } else if (jsonData.coasters && Array.isArray(jsonData.coasters)) {
          data = jsonData.coasters
        } else {
          throw new Error(
            'JSON must be an array of coasters or contain a "coasters" property with an array'
          )
        }
      } else {
        // Parse CSV
        data = parseCSV(content)
      }

      // Validate data
      if (data.length === 0) {
        throw new Error('No coaster data found in file')
      }

      const firstRow = data[0]
      const headers = Object.keys(firstRow).map(h => h.toLowerCase())

      // Check if it has required coaster fields
      const requiredFields = ['name', 'park', 'manufacturer', 'model', 'type']
      const missingFields = requiredFields.filter(
        field => !headers.includes(field)
      )

      if (missingFields.length > 0) {
        throw new Error(
          `Coaster data must include these required fields: ${missingFields.join(
            ', '
          )}`
        )
      }

      const coasters = validateCoasterData(data)

      const result: UploadedData = {
        coasters,
        uploadedAt: new Date(),
        filename: file.name,
      }

      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}
