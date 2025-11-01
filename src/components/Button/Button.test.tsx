import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import Button from './Button'

describe('Button', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Test</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
