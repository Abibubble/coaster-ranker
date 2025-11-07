import { MemoryRouter } from 'react-router-dom'
import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from '../../utils/testing'
import Upload from './Upload'

const UploadWithRouter = () => (
  <MemoryRouter>
    <Upload />
  </MemoryRouter>
)

describe('Upload Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<UploadWithRouter />)
    await testAxeCompliance(container)
  })

  it('meets WCAG 2.2 Level AA requirements', async () => {
    const { container } = render(<UploadWithRouter />)
    await runBasicWCAG22Tests(container)
  })
})
