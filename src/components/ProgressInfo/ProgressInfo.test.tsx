import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import ProgressInfo from './ProgressInfo'

const defaultProps = {
  remainingComparisons: 10,
  totalComparisons: 12,
  title: 'Hello',
  showProgressBar: true,
}

const coastersProps = {
  totalCoasters: 10,
  rankedCoasters: 3,
  title: 'Ranking Progress',
  showCoastersLeft: true,
  showProgressBar: true,
}

describe('ProgressInfo', () => {
  it('has no accessibility violations with comparisons remaining', async () => {
    const { container } = render(<ProgressInfo {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations with coasters left to rank', async () => {
    const { container } = render(<ProgressInfo {...coastersProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
