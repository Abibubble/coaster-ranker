import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import DuplicateResolver from './DuplicateResolver'
import { DuplicateResolution } from './DuplicateResolver'

const defaultProps = {
  duplicates: [],
  onCancel: () => {},
  onResolve: (_resolutions: DuplicateResolution[]) => {},
}

describe('DuplicateResolver', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<DuplicateResolver {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
