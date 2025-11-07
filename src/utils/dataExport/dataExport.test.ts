import { generateCSV, generateJSON } from './index'
import { Coaster } from '../../types/data'

describe('Data Export Functions', () => {
  const mockCoasters: Coaster[] = [
    {
      id: 'test-id-1',
      name: 'The Smiler',
      park: 'Alton Towers',
      country: 'United Kingdom',
      manufacturer: 'Gerstlauer',
      model: 'Infinity Coaster',
      material: 'Steel',
      thrillLevel: 'Extreme',
      rankPosition: 1,
    },
    {
      id: 'test-id-2',
      name: 'Nemesis',
      park: 'Alton Towers',
      country: 'United Kingdom',
      manufacturer: 'Bolliger & Mabillard',
      model: 'Inverted Coaster',
      material: 'Steel',
      thrillLevel: 'High',
      rankPosition: 2,
    },
  ]

  describe('generateCSV', () => {
    it('should not include id field in export', () => {
      const result = generateCSV({
        coasters: mockCoasters,
        includeRanking: false,
      })

      const lines = result.content.split('\n')
      const headers = lines[0].split(',')

      expect(headers).not.toContain('id')
      expect(headers).toContain('name')
      expect(headers).toContain('park')
    })

    it('should include rank as first field when ranking is enabled', () => {
      const result = generateCSV({
        coasters: mockCoasters,
        includeRanking: true,
      })

      const lines = result.content.split('\n')
      const headers = lines[0].split(',')

      expect(headers[0]).toBe('rank')
      expect(headers).not.toContain('id')
    })

    it('should export coaster data without id field', () => {
      const result = generateCSV({
        coasters: mockCoasters,
        includeRanking: true,
      })

      const lines = result.content.split('\n')
      const firstDataRow = lines[1].split(',')

      // First field should be rank (1)
      expect(firstDataRow[0]).toBe('1')
      // Should not contain id anywhere in the row
      expect(firstDataRow).not.toContain('test-id-1')
      // Should contain name
      expect(firstDataRow[1]).toBe('The Smiler')
    })
  })

  describe('generateJSON', () => {
    it('should not include id field in export', () => {
      const result = generateJSON({
        coasters: mockCoasters,
        includeRanking: false,
      })

      const parsedResult = JSON.parse(result.content)
      const firstCoaster = parsedResult.coasters[0]

      expect(firstCoaster).not.toHaveProperty('id')
      expect(firstCoaster).toHaveProperty('name')
      expect(firstCoaster).toHaveProperty('park')
    })

    it('should include rank as first field when ranking is enabled', () => {
      const result = generateJSON({
        coasters: mockCoasters,
        includeRanking: true,
      })

      const parsedResult = JSON.parse(result.content)
      const firstCoaster = parsedResult.coasters[0]
      const keys = Object.keys(firstCoaster)

      expect(keys[0]).toBe('rank')
      expect(firstCoaster).not.toHaveProperty('id')
      expect(firstCoaster.rank).toBe(1)
    })

    it('should export coaster data without id field', () => {
      const result = generateJSON({
        coasters: mockCoasters,
        includeRanking: true,
      })

      const parsedResult = JSON.parse(result.content)
      const firstCoaster = parsedResult.coasters[0]

      expect(firstCoaster.rank).toBe(1)
      expect(firstCoaster.name).toBe('The Smiler')
      expect(firstCoaster).not.toHaveProperty('id')
    })
  })
})
