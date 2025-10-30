import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Title from './Title'

describe('Title', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Title>Test Title</Title>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders text', () => {
    render(<Title>Test Title</Title>)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent('Test Title')
  })
})
