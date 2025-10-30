import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Link from './Link'

describe('Link', () => {
  it('renders a link with text', () => {
    render(<Link href='/test'>Test Link</Link>)

    expect(screen.getByText('Test Link')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Link href='/test'>Test Link</Link>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
