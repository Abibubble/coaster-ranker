import { render, screen } from '../../utils/testing'
import { axe } from 'jest-axe'
import Footer from './Footer'

describe('Footer', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders copyright text and navigation links', () => {
    render(<Footer />)

    expect(screen.getByText('© Bubble & Squeak')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Accessibility' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Privacy Policy' })
    ).toBeInTheDocument()
  })
})
