import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { vi } from 'vitest'
import RankingControls from './RankingControls'

const defaultProps = {
  onReset: vi.fn(),
  canUndo: true,
  onUndo: vi.fn(),
}

describe('RankingControls', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<RankingControls {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
