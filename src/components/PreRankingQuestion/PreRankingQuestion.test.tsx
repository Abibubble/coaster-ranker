import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import PreRankingQuestion from './PreRankingQuestion'

describe('PreRankingQuestion', () => {
  const mockOnAnswer = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    mockOnAnswer.mockClear()
    mockOnCancel.mockClear()
  })

  it('renders the pre-ranking question correctly', () => {
    render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={5}
        filename='test-coasters.csv'
      />
    )

    expect(screen.getByText('Ranking order question')).toBeInTheDocument()
    expect(
      screen.getByText(/You're uploading 5 coasters from "test-coasters.csv"/)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Yes, these coasters are already ranked in order',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'No, these coasters are not ranked' })
    ).toBeInTheDocument()
  })

  it('calls onAnswer with true when Yes button is clicked', () => {
    render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={3}
        filename='test-coasters.csv'
      />
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Yes, these coasters are already ranked in order',
      })
    )
    expect(mockOnAnswer).toHaveBeenCalledWith(true)
  })

  it('calls onAnswer with false when No button is clicked', () => {
    render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={3}
        filename='test-coasters.csv'
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'No, these coasters are not ranked' })
    )
    expect(mockOnAnswer).toHaveBeenCalledWith(false)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={5}
        filename='test-coasters.csv'
      />
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
