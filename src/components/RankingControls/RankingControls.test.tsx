import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { vi } from 'vitest'
import RankingControls from './RankingControls'

const defaultProps = {
  onUndo: vi.fn(),
  onReset: vi.fn(),
  canUndo: true,
}

describe('RankingControls', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<RankingControls {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
