import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Card from './Card'

describe('Card', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Card>
        <div>Test content</div>
      </Card>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders card with content', () => {
    render(
      <Card>
        <div>Test content</div>
      </Card>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
