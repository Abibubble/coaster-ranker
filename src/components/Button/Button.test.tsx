import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from '../../utils/testing'
import Button from './Button'

describe('Button', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Test</Button>)
    await testAxeCompliance(container)
  })

  it('meets WCAG 2.2 Level AA requirements', async () => {
    const { container } = render(<Button>Test Button</Button>)
    await runBasicWCAG22Tests(container)
  })
})
