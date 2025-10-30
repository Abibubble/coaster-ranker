import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import SkipLink from './SkipLink'

describe('SkipLink', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<SkipLink />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders skip link', () => {
    render(<SkipLink />)

    const link = screen.getByRole('link', { name: 'Skip to main content' })
    expect(link).toHaveAttribute('href', '#main-content')
  })
})
