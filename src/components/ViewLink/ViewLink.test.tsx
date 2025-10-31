import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import ViewLink from './ViewLink'

const defaultProps = {
  children: 'Test Link',
  href: '/test-url',
}

describe('ViewLink', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ViewLink {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
