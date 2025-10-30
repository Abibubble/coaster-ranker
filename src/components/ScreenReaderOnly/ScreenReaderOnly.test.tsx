import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import ScreenReaderOnly from './ScreenReaderOnly'

describe('ScreenReaderOnly', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <ScreenReaderOnly>Hidden text</ScreenReaderOnly>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders content', () => {
    render(<ScreenReaderOnly>Hidden text</ScreenReaderOnly>)

    expect(screen.getByText('Hidden text')).toBeInTheDocument()
  })
})
