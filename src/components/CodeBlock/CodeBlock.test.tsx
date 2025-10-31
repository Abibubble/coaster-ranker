import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import CodeBlock from './CodeBlock'

describe('CodeBlock', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <CodeBlock>
        <p>Test</p>
      </CodeBlock>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
