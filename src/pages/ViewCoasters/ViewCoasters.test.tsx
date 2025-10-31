import React from 'react'
import { render, screen } from '@testing-library/react'
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
  TableBody: 'div',
  TableRow: 'div',
  TableCell: 'div',
  CoasterName: 'div',
  CoasterModel: 'div',
  TypeBadge: 'span',
  CoasterCount: 'div',
}))

describe('ViewCoasters', () => {
  const renderWithProvider = (children: React.ReactNode) => {
    return render(<DataProvider>{children}</DataProvider>)
  }

  it('shows empty state when no coasters are uploaded', () => {
    renderWithProvider(<ViewCoasters />)

    expect(screen.getByText('Your Coasters')).toBeInTheDocument()
    expect(screen.getByText('No Coasters Yet')).toBeInTheDocument()
    expect(
      screen.getByText(/You haven't uploaded any coasters yet/)
    ).toBeInTheDocument()
  })

  it('shows a link to upload page when no coasters', () => {
    renderWithProvider(<ViewCoasters />)

    expect(screen.getByText('Go to Upload Page')).toBeInTheDocument()
  })
})
