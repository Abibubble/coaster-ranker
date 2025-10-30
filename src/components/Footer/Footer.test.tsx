import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Footer from './Footer'

describe('Footer', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders copyright text', () => {
    render(<Footer />)

    expect(screen.getByText('© Bubble & Squeak')).toBeInTheDocument()
  })
})
