import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import PrivacyPolicy from './PrivacyPolicy'

describe('PrivacyPolicy Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<PrivacyPolicy />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders the main title and content sections', () => {
    render(<PrivacyPolicy />)

    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Data Collection')).toBeInTheDocument()
    expect(screen.getByText('How Your Data is Used')).toBeInTheDocument()
    expect(screen.getByText('Data Storage and Security')).toBeInTheDocument()
    expect(screen.getByText('Third-Party Services')).toBeInTheDocument()
  })

  it('includes data collection information', () => {
    render(<PrivacyPolicy />)

    expect(
      screen.getByText(/No personal information collected:/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Local data only:/)).toBeInTheDocument()
    expect(screen.getByText(/No tracking:/)).toBeInTheDocument()
  })

  it('includes user rights section', () => {
    render(<PrivacyPolicy />)

    expect(screen.getByText('Your Rights')).toBeInTheDocument()
    expect(screen.getByText(/Delete your data:/)).toBeInTheDocument()
    expect(screen.getByText(/Export your data:/)).toBeInTheDocument()
    expect(screen.getByText(/Data portability:/)).toBeInTheDocument()
    expect(screen.getByText('How to Clear Your Data')).toBeInTheDocument()
  })

  it('includes commitment to privacy', () => {
    render(<PrivacyPolicy />)

    expect(
      screen.getByText(/respects your privacy and is committed/)
    ).toBeInTheDocument()
  })

  it('includes data usage information', () => {
    render(<PrivacyPolicy />)

    expect(
      screen.getByText('Displaying your coaster information')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Enabling you to rank and compare coasters')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Generating downloadable rankings')
    ).toBeInTheDocument()
  })

  it('includes security information', () => {
    render(<PrivacyPolicy />)

    expect(screen.getByText(/Local storage:/)).toBeInTheDocument()
    expect(screen.getByText(/No server storage:/)).toBeInTheDocument()
    expect(screen.getByText(/Browser security:/)).toBeInTheDocument()
  })

  it('includes contact and changes sections', () => {
    render(<PrivacyPolicy />)

    expect(screen.getByText('Changes to This Policy')).toBeInTheDocument()
  })

  it('includes last updated date', () => {
    render(<PrivacyPolicy />)

    expect(
      screen.getByText('Last updated: November 6, 2025')
    ).toBeInTheDocument()
  })

  it('includes browser-specific instructions for clearing data', () => {
    render(<PrivacyPolicy />)

    expect(screen.getByText(/Chrome:/)).toBeInTheDocument()
    expect(screen.getByText(/Firefox:/)).toBeInTheDocument()
    expect(screen.getByText(/Safari:/)).toBeInTheDocument()
    expect(screen.getByText(/Edge:/)).toBeInTheDocument()
    expect(screen.getByText(/Note:/)).toBeInTheDocument()
  })
})
