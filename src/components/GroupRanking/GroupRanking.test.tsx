import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import GroupRanking from './GroupRanking'
import { Coaster } from '../../types/data'

const defaultProps = {
  coasters: [],
  groupBy: 'park' as const,
  onRankingComplete: (rankedCoasters: Coaster[]) => {},
  onHierarchicalFallback: (attemptedMode: 'park' | 'model') => {},
}

describe('GroupRanking', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<GroupRanking {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
