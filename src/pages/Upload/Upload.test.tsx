import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { testAxeCompliance, runBasicWCAG22Tests } from '../../utils/testing'
import Upload from './Upload'
import { DataProvider } from '../../contexts/DataContext'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const UploadWithRouter = () => (
  <MemoryRouter>
    <DataProvider>
      <Upload />
    </DataProvider>
  </MemoryRouter>
)

const seedCoasterData = (count: number) => {
  localStorage.setItem(
    'coaster-ranker-data',
    JSON.stringify({
      coasters: Array.from({ length: count }, (_, i) => ({
        id: `c${i}`,
        name: `Coaster ${i}`,
        park: 'Park',
        country: 'Country',
        manufacturer: 'Manufacturer',
      })),
      uploadedAt: new Date(),
      filename: 'coasters.csv',
      rankingMetadata: {
        completedComparisons: [],
        rankedCoasters: [],
        isRanked: false,
      },
    }),
  )
}

const seedDarkRideData = (count: number) => {
  localStorage.setItem(
    'coaster-ranker-dark-rides',
    JSON.stringify({
      coasters: Array.from({ length: count }, (_, i) => ({
        id: `d${i}`,
        name: `Dark Ride ${i}`,
        park: 'Park',
        country: 'Country',
        manufacturer: 'Manufacturer',
        type: 'dark-ride',
      })),
      uploadedAt: new Date(),
      filename: 'dark-rides.csv',
      rankingMetadata: {
        completedComparisons: [],
        rankedCoasters: [],
        isRanked: false,
      },
    }),
  )
}

describe('Upload Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<UploadWithRouter />)
    await testAxeCompliance(container)
  })

  it('meets WCAG 2.2 Level AA requirements', async () => {
    const { container } = render(<UploadWithRouter />)
    await runBasicWCAG22Tests(container)
  })
})

describe('Upload Page - current data summary', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('shows a screen-reader-only heading and no data summary when nothing is uploaded', () => {
    render(<UploadWithRouter />)

    expect(
      screen.queryByText(/you currently have/i),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /choose your upload method/i }),
    ).toBeInTheDocument()
  })

  it('shows the coaster count when only coaster data is present', () => {
    seedCoasterData(3)
    render(<UploadWithRouter />)

    expect(screen.getByText(/3 coasters/i)).toBeInTheDocument()
    expect(screen.queryByText(/dark ride/i)).not.toBeInTheDocument()
  })

  it('shows the dark-ride count when only dark-ride data is present', () => {
    seedDarkRideData(1)
    render(<UploadWithRouter />)

    expect(screen.getByText(/1 dark ride\b/i)).toBeInTheDocument()
  })

  it('shows both counts when both coaster and dark-ride data are present', () => {
    seedCoasterData(2)
    seedDarkRideData(1)
    render(<UploadWithRouter />)

    expect(screen.getByText(/2 coasters/i)).toBeInTheDocument()
    expect(screen.getByText(/1 dark ride\b/i)).toBeInTheDocument()
  })
})

describe('Upload Page - navigation', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('navigates to /upload-csv when the CSV option is clicked', async () => {
    const user = userEvent.setup()
    render(<UploadWithRouter />)

    await user.click(
      screen.getByText(/upload csv file/i).closest('div')!,
    )

    expect(mockNavigate).toHaveBeenCalledWith('/upload-csv')
  })

  it('navigates to /upload-json when the JSON option is clicked', async () => {
    const user = userEvent.setup()
    render(<UploadWithRouter />)

    await user.click(
      screen.getByText(/upload json data/i).closest('div')!,
    )

    expect(mockNavigate).toHaveBeenCalledWith('/upload-json')
  })

  it('navigates to /upload-manual when the manual entry option is clicked', async () => {
    const user = userEvent.setup()
    render(<UploadWithRouter />)

    await user.click(
      screen.getByText(/enter manually/i).closest('div')!,
    )

    expect(mockNavigate).toHaveBeenCalledWith('/upload-manual')
  })

  it('navigates on Enter and Space keydown, not just click', () => {
    render(<UploadWithRouter />)

    const csvButton = screen
      .getByText(/upload csv file/i)
      .closest('div')!

    csvButton.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    )
    expect(mockNavigate).toHaveBeenCalledWith('/upload-csv')

    mockNavigate.mockClear()

    csvButton.dispatchEvent(
      new KeyboardEvent('keydown', { key: ' ', bubbles: true }),
    )
    expect(mockNavigate).toHaveBeenCalledWith('/upload-csv')
  })
})
