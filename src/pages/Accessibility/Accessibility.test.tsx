import { render, screen } from '@testing-library/react'
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
    expect(screen.getByText('Our Commitment')).toBeInTheDocument()
    expect(screen.getByText('Accessibility Standards')).toBeInTheDocument()
    expect(screen.getByText('Accessibility Features')).toBeInTheDocument()
  })

  it('includes keyboard navigation information', () => {
    render(<Accessibility />)

    expect(screen.getByText('Keyboard Navigation')).toBeInTheDocument()
    expect(screen.getByText('Tab')).toBeInTheDocument()
    expect(screen.getByText('Enter')).toBeInTheDocument()
    expect(screen.getByText('Space')).toBeInTheDocument()
  })

  it('mentions WCAG compliance', () => {
    render(<Accessibility />)

    expect(screen.getByText(/WCAG.*2\.1.*Level AA/)).toBeInTheDocument()
  })

  it('includes assistive technology information', () => {
    render(<Accessibility />)

    expect(screen.getByText('Assistive Technologies')).toBeInTheDocument()
    expect(
      screen.getByText('Screen readers (JAWS, NVDA, VoiceOver, TalkBack)')
    ).toBeInTheDocument()
  })

  it('lists browser compatibility', () => {
    render(<Accessibility />)

    expect(screen.getByText('Browser Compatibility')).toBeInTheDocument()
    expect(screen.getByText('Chrome (latest version)')).toBeInTheDocument()
    expect(screen.getByText('Firefox (latest version)')).toBeInTheDocument()
    expect(screen.getByText('Safari (latest version)')).toBeInTheDocument()
  })

  it('includes external accessibility resource links', () => {
    render(<Accessibility />)

    expect(screen.getByText('Accessibility Resources')).toBeInTheDocument()

    const waiLink = screen.getByRole('link', {
      name: 'Web Accessibility Initiative (WAI)',
    })
    expect(waiLink).toHaveAttribute('href', 'https://www.w3.org/WAI/')

    const wcagLink = screen.getByRole('link', {
      name: 'WCAG 2.1 Quick Reference',
    })
    expect(wcagLink).toHaveAttribute(
      'href',
      'https://www.w3.org/WAI/WCAG21/quickref/'
    )

    const webaimLink = screen.getByRole('link', {
      name: 'WebAIM - Web Accessibility In Mind',
    })
    expect(webaimLink).toHaveAttribute('href', 'https://webaim.org/')
  })

  it('displays last updated date', () => {
    render(<Accessibility />)

    expect(
      screen.getByText('Last updated: August 23, 2025')
    ).toBeInTheDocument()
  })

  it('includes comprehensive accessibility feature sections', () => {
    render(<Accessibility />)

    expect(screen.getByText('Visual Design')).toBeInTheDocument()
    expect(screen.getByText('Screen Reader Support')).toBeInTheDocument()
    expect(screen.getByText('Interactive Elements')).toBeInTheDocument()
    expect(screen.getByText('Known Limitations')).toBeInTheDocument()
    expect(screen.getByText('Ongoing Efforts')).toBeInTheDocument()
  })

  it('renders the main content with proper structure', () => {
    render(<Accessibility />)

    expect(screen.getByText('Accessibility Statement')).toBeInTheDocument()
  })
})
