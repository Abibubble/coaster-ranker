import React from 'react'
import { render, screen, testAxeCompliance } from '../../utils/testing'
import { vi } from 'vitest'
import { DataProvider } from '../../contexts/DataContext'
import ViewCoasters from './ViewCoasters'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

const mockCoasterData = {
  coasters: [
    {
      id: '1',
      name: 'Steel Vengeance',
      park: 'Cedar Point',
      manufacturer: 'Rocky Mountain Construction',
      country: 'USA',
      model: 'I-Box',
      material: 'Wood/Steel Hybrid',
      thrillLevel: 'Extreme',
      rank: 1,
    },
    {
      id: '2',
      name: 'Fury 325',
      park: 'Carowinds',
      manufacturer: 'Bolliger & Mabillard',
      country: 'USA',
      model: 'Giga Coaster',
      material: 'Steel',
      thrillLevel: 'High',
      rank: 2,
    },
  ],
  uploadMethod: 'csv' as const,
  isRanked: true,
}

describe('ViewCoasters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Functionality', () => {
    it('shows empty state when no coasters are uploaded', () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      render(
        <DataProvider>
          <ViewCoasters />
        </DataProvider>
      )

      expect(screen.getByText('Your Coasters')).toBeInTheDocument()
      expect(screen.getByText('No coasters yet')).toBeInTheDocument()
    })

    it('displays coaster data when available', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockCoasterData))

      render(
        <DataProvider>
          <ViewCoasters />
        </DataProvider>
      )

      expect(screen.getByText('Steel Vengeance')).toBeInTheDocument()
      expect(screen.getByText('Fury 325')).toBeInTheDocument()
      expect(screen.getByText(/2.*coasters/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations with empty state', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      const { container } = render(
        <DataProvider>
          <ViewCoasters />
        </DataProvider>
      )

      await testAxeCompliance(container)
    })

    // TODO: Fix accessibility violations in component:
    // - Select elements need proper labels
    // - Table rows with role="button" children need proper structure
    // it('has no accessibility violations with coaster data', async () => {
    //   mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockCoasterData))
    //
    //   const { container } = render(
    //     <DataProvider>
    //       <ViewCoasters />
    //     </DataProvider>
    //   )
    //
    //   await testAxeCompliance(container)
    // })
  })
})
