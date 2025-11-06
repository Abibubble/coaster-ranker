import { describe, it, expect } from 'vitest'
import { validateCoasterData } from './fileProcessing/fileParser'

describe('fileParser - formatString integration', () => {
  it('should format string data with space and first-word capitalization', () => {
    const rawDataWithFormattingNeeds = [
      {
        name: 'the smiler',
        park: 'ALTON TOWERS',
        country: 'united-kingdom',
        manufacturer: 'gerstlauer',
        model: 'euro_fighter',
        type: 'STEEL',
        thrillLevel: 'family-thrill',
      },
    ]

    const result = validateCoasterData(rawDataWithFormattingNeeds)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      id: 'coaster_0',
      name: 'The Smiler',
      park: 'Alton Towers',
      country: 'United Kingdom',
      manufacturer: 'Gerstlauer',
      model: 'Euro Fighter',
      material: 'Steel',
      thrillLevel: 'Family Thrill',
    })
  })

  it('should handle mixed case and special characters in formatting', () => {
    const rawDataWithSpecialChars = [
      {
        name: 'BOLT-action COASTER',
        park: "disney's_california adventure",
        country: 'united states',
        manufacturer: 'INTAMIN ag',
        model: 'launch-coaster',
        type: 'STEEL track',
      },
    ]

    const result = validateCoasterData(rawDataWithSpecialChars)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      id: 'coaster_0',
      name: 'Bolt Action Coaster',
      park: 'Disneys California Adventure',
      country: 'United States',
      manufacturer: 'Intamin Ag',
      model: 'Launch Coaster',
      material: 'Steel Track',
      thrillLevel: undefined,
    })
  })
})

describe('fileParser - extra fields handling', () => {
  it('should accept and ignore extra fields in coaster data', () => {
    const rawDataWithExtraFields = [
      {
        name: 'Test Coaster',
        park: 'Test Park',
        country: 'Test Country',
        manufacturer: 'Test Manufacturer',
        model: 'Test Model',
        type: 'Steel',
        // Extra fields that should be ignored
        height: '50',
        speed: '80',
        year: '2020',
        location: 'Test Location',
        inversions: '3',
        randomField: 'should be ignored',
        anotherField: 'also ignored',
      },
    ]

    const result = validateCoasterData(rawDataWithExtraFields)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      id: 'coaster_0',
      name: 'Test Coaster',
      park: 'Test Park',
      country: 'Test Country',
      manufacturer: 'Test Manufacturer',
      model: 'Test Model',
      material: 'Steel',
      thrillLevel: undefined,
    })

    // Verify extra fields are not included
    expect('height' in result[0]).toBe(false)
    expect('speed' in result[0]).toBe(false)
    expect('year' in result[0]).toBe(false)
    expect('location' in result[0]).toBe(false)
    expect('inversions' in result[0]).toBe(false)
    expect('randomField' in result[0]).toBe(false)
    expect('anotherField' in result[0]).toBe(false)
  })

  it('should still require all mandatory fields even with extra fields present', () => {
    const rawDataMissingRequired = [
      {
        name: 'Test Coaster',
        park: 'Test Park',
        // Missing country, manufacturer
        height: '50', // Extra field
        speed: '80', // Extra field
        extraField: 'ignored',
      },
    ]

    expect(() => validateCoasterData(rawDataMissingRequired)).toThrow(
      'Manufacturer is required'
    )
  })

  it('should handle mixed data with some having extra fields and some not', () => {
    const mixedData = [
      {
        name: 'Coaster 1',
        park: 'Park 1',
        country: 'Country 1',
        manufacturer: 'Manufacturer 1',
        model: 'Model 1',
        type: 'Steel',
        // No extra fields
      },
      {
        name: 'Coaster 2',
        park: 'Park 2',
        country: 'Country 2',
        manufacturer: 'Manufacturer 2',
        model: 'Model 2',
        type: 'Wood',
        // Extra fields
        height: '40',
        year: '2019',
        customField: 'test',
      },
    ]

    const result = validateCoasterData(mixedData)

    expect(result).toHaveLength(2)

    // First coaster - no extra fields
    expect(result[0]).toEqual({
      id: 'coaster_0',
      name: 'Coaster 1',
      park: 'Park 1',
      country: 'Country 1',
      manufacturer: 'Manufacturer 1',
      model: 'Model 1',
      material: 'Steel',
      thrillLevel: undefined,
    })

    // Second coaster - extra fields should be filtered out
    expect(result[1]).toEqual({
      id: 'coaster_1',
      name: 'Coaster 2',
      park: 'Park 2',
      country: 'Country 2',
      manufacturer: 'Manufacturer 2',
      model: 'Model 2',
      material: 'Wood',
      thrillLevel: undefined,
    })

    // Verify extra fields are not included in second coaster
    expect('height' in result[1]).toBe(false)
    expect('year' in result[1]).toBe(false)
    expect('customField' in result[1]).toBe(false)
  })
})
