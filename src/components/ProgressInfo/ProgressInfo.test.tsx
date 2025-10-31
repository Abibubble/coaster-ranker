import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import ProgressInfo from './ProgressInfo'

const defaultProps = {
  remainingComparisons: 10,
  totalComparisons: 12,
  title: 'Hello',
  showProgressBar: true,
}

describe('ProgressInfo', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ProgressInfo {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
