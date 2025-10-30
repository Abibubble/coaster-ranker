import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import MainContent from './MainContent'

describe('MainContent', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <MainContent>
        <h1>Page Title</h1>
        <p>Content paragraph</p>
      </MainContent>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders content', () => {
    render(
      <MainContent>
        <h1>Page Title</h1>
        <p>Content paragraph</p>
      </MainContent>
    )

    expect(
      screen.getByRole('heading', { name: 'Page Title' })
    ).toBeInTheDocument()
    expect(screen.getByText('Content paragraph')).toBeInTheDocument()
  })
})
