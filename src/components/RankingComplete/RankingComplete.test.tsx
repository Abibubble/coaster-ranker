import { render, testAxeCompliance } from '../../utils/testing'
import { vi } from 'vitest'
import RankingComplete from './RankingComplete'

const mockCoasters = [
  {
    id: '1',
    name: 'Test Coaster 1',
    park: 'Test Park 1',
    manufacturer: 'Test Manufacturer',
    model: 'Test Model',
    type: 'Steel',
    country: 'UK',
  },
  {
    id: '2',
    name: 'Test Coaster 2',
    park: 'Test Park 2',
    manufacturer: 'Test Manufacturer',
    model: 'Test Model',
    type: 'Steel',
    country: 'UK',
  },
]

const defaultProps = {
  rankedCoasters: mockCoasters,
  onRankAgain: vi.fn(),
}

describe('RankingComplete', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<RankingComplete {...defaultProps} />)
    await testAxeCompliance(container)
  })
})
