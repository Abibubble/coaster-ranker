import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from '../../utils/testing'
import Upload from './Upload'

describe('Upload Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Upload />)
    await testAxeCompliance(container)
  })

  it('meets WCAG 2.2 Level AA requirements', async () => {
    const { container } = render(<Upload />)
    await runBasicWCAG22Tests(container)
  })
})
