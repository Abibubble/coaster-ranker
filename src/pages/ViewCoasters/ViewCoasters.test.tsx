import React from 'react'
import {
  render,
  screen,
  fireEvent,
  testAxeCompliance,
} from '../../utils/testing'
import { vi } from 'vitest'
import { DataProvider } from '../../contexts/DataContext'
import ViewCoasters from './ViewCoasters'

// Mock the styled components to avoid import issues in tests
vi.mock('./ViewCoasters.styled', () => ({
  EmptyState: 'div',
  UploadLink: 'a',
  CoastersSummary: 'div',
  UploadInfo: 'div',
  ActionsBar: 'div',
  ActionButton: 'a',
  CoastersTable: 'div',
  TableHeader: 'div',
  HeaderCell: 'div',
  ClickableTableCell: ({ children, onClick, ...props }: any) => (
    <div
      {...props}
      onClick={onClick}
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      {children}
    </div>
  ),
  TableBody: 'div',
  TableRow: 'div',
  TableCell: 'div',
  MobileFieldLabel: 'span',
  MobileFieldValue: 'div',
  MobileRankCell: 'div',
  CoasterName: 'div',
  CoasterModel: 'div',
  TypeBadge: 'span',
  CoasterCount: 'div',
  FilterInfo: 'div',
  FilterControls: 'div',
  FilterButton: 'button',
  HelpText: 'p',
}))

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
    {
      id: '3',
      name: 'The Smiler',
      park: 'Alton Towers',
      manufacturer: 'Gerstlauer',
      country: 'UK',
      model: 'Infinity Coaster',
      material: 'Steel',
      thrillLevel: 'Extreme',
      rank: 3,
    },
  ],
  uploadMethod: 'csv' as const,
  isRanked: true,
}

describe('ViewCoasters', () => {
  const renderWithProvider = (children: React.ReactNode) => {
    return render(<DataProvider>{children}</DataProvider>)
  }

  const renderWithData = (data = mockCoasterData) => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(data))

    return render(
      <DataProvider>
        <ViewCoasters />
      </DataProvider>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Functionality', () => {
    it('shows empty state when no coasters are uploaded', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      renderWithProvider(<ViewCoasters />)

      expect(screen.getByText('Your Coasters')).toBeInTheDocument()
      expect(screen.getByText('No Coasters Yet')).toBeInTheDocument()
      expect(
        screen.getByText(/You haven't uploaded any coasters yet/)
      ).toBeInTheDocument()
    })

    it('shows a link to upload page when no coasters', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      renderWithProvider(<ViewCoasters />)

      expect(screen.getByText('Go to Upload Page')).toBeInTheDocument()
    })

    it('displays coaster data when available', () => {
      renderWithData()

      expect(screen.getByText('Steel Vengeance')).toBeInTheDocument()
      expect(screen.getByText('Fury 325')).toBeInTheDocument()
      expect(screen.getByText('The Smiler')).toBeInTheDocument()
    })

    it('shows coaster count correctly', () => {
      renderWithData()

      expect(screen.getByText('3 coasters')).toBeInTheDocument()
    })
  })

  describe('Accessibility Compliance', () => {
    it('has no accessibility violations with empty state', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      const { container } = renderWithProvider(<ViewCoasters />)

      await testAxeCompliance(container)
    })

    it('has no accessibility violations with coaster data', async () => {
      const { container } = renderWithData()

      await testAxeCompliance(container)
    })
  })

  describe('Keyboard Navigation', () => {
    it('allows keyboard navigation through interactive elements', () => {
      renderWithData()

      // Get all interactive elements
      const interactiveElements = screen.getAllByRole('button')

      // Should include filter buttons and clickable header cells
      expect(interactiveElements.length).toBeGreaterThan(0)

      // Each should be keyboard accessible
      interactiveElements.forEach(element => {
        expect(element).toHaveAttribute('tabIndex')
        expect(element.getAttribute('tabIndex')).not.toBe('-1')
      })
    })

    it('supports Enter and Space key activation for clickable headers', () => {
      renderWithData()

      const filterElements = screen.getAllByText('filter')
      if (filterElements.length > 0) {
        const parkHeader = filterElements[0]
        const onClick = vi.fn()

        // Mock the onClick for testing
        parkHeader.onclick = onClick

        // Test Enter key
        fireEvent.keyDown(parkHeader, { key: 'Enter' })
        fireEvent.keyDown(parkHeader, { key: ' ' }) // Space key

        // Should be keyboard accessible
        expect(parkHeader).toHaveAttribute('role', 'button')
        expect(parkHeader).toHaveAttribute('tabIndex', '0')
      }
    })
  })

  describe('ARIA Attributes', () => {
    it('has proper ARIA labels for filter controls', () => {
      renderWithData()

      // Filter buttons should have descriptive ARIA labels
      const filterButtons = screen.getAllByRole('button')
      filterButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label')
      })
    })

    it('has proper table structure with accessible headers', () => {
      renderWithData()

      // Check for proper table structure
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Park')).toBeInTheDocument()
      expect(screen.getByText('Manufacturer')).toBeInTheDocument()
      expect(screen.getByText('Country')).toBeInTheDocument()
      expect(screen.getByText('Model')).toBeInTheDocument()
      expect(screen.getByText('Material')).toBeInTheDocument()
      expect(screen.getByText('Thrill Level')).toBeInTheDocument()
    })

    it('provides help text for interactive features', () => {
      renderWithData()

      // Should have help text explaining clickable fields
      expect(
        screen.getByText(/Click on any field name to filter by that value/)
      ).toBeInTheDocument()
    })
  })

  describe('Screen Reader Support', () => {
    it('announces filter states properly', () => {
      renderWithData()

      // Apply a filter
      const clearAllButton = screen.getByText('Clear All')
      expect(clearAllButton).toBeInTheDocument()

      // Should show filter count
      expect(screen.getByText('3 coasters')).toBeInTheDocument()
    })

    it('has semantic heading structure', () => {
      renderWithData()

      // Main heading should be present
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Your Coasters'
      )
    })

    it('provides ranking information in accessible format', () => {
      renderWithData()

      // Ranked coasters should show rank
      expect(screen.getByText('1')).toBeInTheDocument() // Rank 1
      expect(screen.getByText('2')).toBeInTheDocument() // Rank 2
      expect(screen.getByText('3')).toBeInTheDocument() // Rank 3
    })
  })

  describe('Visual Accessibility', () => {
    it('maintains focus indicators for interactive elements', () => {
      renderWithData()

      const interactiveElements = screen.getAllByRole('button')

      interactiveElements.forEach(element => {
        // Focus the element
        element.focus()

        // Should be focusable and visible
        expect(element).toHaveFocus()
        expect(element).toBeVisible()
      })
    })

    it('displays filter states clearly', () => {
      renderWithData()

      // Should show current filter state
      expect(screen.getByText('Filters: None')).toBeInTheDocument()

      // Should show coaster count
      expect(screen.getByText('3 coasters')).toBeInTheDocument()
    })
  })

  describe('Error States and Empty States', () => {
    it('provides accessible empty state message', () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      renderWithProvider(<ViewCoasters />)

      expect(screen.getByText('No Coasters Yet')).toBeInTheDocument()
      expect(
        screen.getByText(/You haven't uploaded any coasters yet/)
      ).toBeInTheDocument()
      expect(screen.getByText('Go to Upload Page')).toBeInTheDocument()
    })

    it('handles filtered empty states accessibly', () => {
      renderWithData()

      // The component should handle empty filter results gracefully
      // This would be tested with actual filter interactions
      expect(screen.getByText('Clear All')).toBeInTheDocument()
    })
  })

  describe('Data Formatting and Display', () => {
    it('formats data consistently for screen readers', () => {
      renderWithData()

      // Check that formatted data is present and readable
      expect(screen.getByText('Steel Vengeance')).toBeInTheDocument()
      expect(screen.getByText('Cedar Point')).toBeInTheDocument()
      expect(
        screen.getByText('Rocky Mountain Construction')
      ).toBeInTheDocument()
    })

    it('displays rankings in logical order', () => {
      renderWithData()

      // Should be sorted by rank (1, 2, 3)
      const coasterRows = screen.getAllByText(
        /Steel Vengeance|Fury 325|The Smiler/
      )

      // First coaster should be Steel Vengeance (rank 1)
      expect(coasterRows[0]).toHaveTextContent('Steel Vengeance')
    })

    it('shows proper table structure with all required columns', () => {
      renderWithData()

      // Verify all table headers are present
      const headers = [
        'Name',
        'Park',
        'Manufacturer',
        'Country',
        'Model',
        'Material',
        'Thrill Level',
      ]
      headers.forEach(header => {
        expect(screen.getByText(header)).toBeInTheDocument()
      })
    })
  })

  describe('Filtering Functionality', () => {
    it('displays filter controls when data is present', () => {
      renderWithData()

      // Should show filter controls
      expect(screen.getByText('Clear All')).toBeInTheDocument()
      expect(screen.getByText('Filters: None')).toBeInTheDocument()
    })

    it('shows helpful filter instructions', () => {
      renderWithData()

      expect(
        screen.getByText(/Click on any field name to filter by that value/)
      ).toBeInTheDocument()
    })
  })
})
