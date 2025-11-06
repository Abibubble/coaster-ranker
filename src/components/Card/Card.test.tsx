import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import Card from './Card'
import { testAxeCompliance, runBasicWCAG22Tests } from '../../utils/testing'

describe('Card', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Card title='Test Card'>
        <p>Card content</p>
      </Card>
    )
    await testAxeCompliance(container)
  })

  it('meets WCAG 2.2 Level AA requirements', async () => {
    const { container } = render(
      <Card title='Test Card' subtitle='Test subtitle'>
        <p>Card content</p>
      </Card>
    )
    await runBasicWCAG22Tests(container)
  })
})
