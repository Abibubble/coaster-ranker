import { render, screen } from '../../utils/testing'
import { axe } from 'jest-axe'
import Accessibility from './Accessibility'

describe('Accessibility Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Accessibility />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders the main title and content sections', () => {
    render(<Accessibility />)

    expect(screen.getByText('Accessibility Statement')).toBeInTheDocument()
    expect(screen.getByText('Using Coaster Ranker')).toBeInTheDocument()
    expect(
      screen.getByText('Supported assistive technologies')
    ).toBeInTheDocument()
    expect(screen.getByText('Browser compatibility')).toBeInTheDocument()
  })

  it('includes keyboard navigation information', () => {
    render(<Accessibility />)

    expect(screen.getByText('Keyboard navigation')).toBeInTheDocument()
    expect(screen.getByText('Tab')).toBeInTheDocument()
    expect(screen.getByText('Enter')).toBeInTheDocument()
    expect(screen.getByText('Space')).toBeInTheDocument()
  })

  it('includes commitment text', () => {
    render(<Accessibility />)

    expect(
      screen.getByText(/committed to being accessible to all users/)
    ).toBeInTheDocument()
  })

  it('includes assistive technology information', () => {
    render(<Accessibility />)

    expect(
      screen.getByText('Supported assistive technologies')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Screen readers (JAWS, NVDA, VoiceOver, TalkBack)')
    ).toBeInTheDocument()
  })

  it('lists browser compatibility', () => {
    render(<Accessibility />)

    expect(screen.getByText('Browser compatibility')).toBeInTheDocument()
    expect(
      screen.getByText('Chrome (recommended for full feature support)')
    ).toBeInTheDocument()
    expect(screen.getByText('Firefox')).toBeInTheDocument()
    expect(screen.getByText('Safari')).toBeInTheDocument()
    expect(screen.getByText('Edge')).toBeInTheDocument()
  })

  it('includes external accessibility resource links', () => {
    render(<Accessibility />)

    expect(
      screen.getByText('Learn more About web accessibility')
    ).toBeInTheDocument()

    const waiLink = screen.getByRole('link', {
      name: 'Web Accessibility Initiative (WAI)',
    })
    expect(waiLink).toHaveAttribute('href', 'https://www.w3.org/WAI/')

    const webaimLink = screen.getByRole('link', {
      name: 'WebAIM - Web Accessibility In Mind',
    })
    expect(webaimLink).toHaveAttribute('href', 'https://webaim.org/')
  })

  it('includes comprehensive accessibility feature sections', () => {
    render(<Accessibility />)

    expect(screen.getByText('Visual features')).toBeInTheDocument()
    expect(screen.getByText('Screen reader support')).toBeInTheDocument()
    expect(screen.getByText('Keyboard navigation')).toBeInTheDocument()
  })

  it('renders the main content with proper structure', () => {
    render(<Accessibility />)

    expect(screen.getByText('Accessibility Statement')).toBeInTheDocument()
  })
})
