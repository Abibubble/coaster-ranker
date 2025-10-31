import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import BackLink from './BackLink'

describe('BackLink', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <BackLink href='/previous-page'>
        <p>Test</p>
      </BackLink>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
