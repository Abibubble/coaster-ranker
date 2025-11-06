import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from '../../utils/testing'
import UploadCSV from './UploadCSV'
import { DataProvider } from '../../contexts/DataContext'

const MockedUploadCSV = () => (
  <DataProvider>
    <UploadCSV />
  </DataProvider>
)

describe('UploadCSV', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<MockedUploadCSV />)
    await testAxeCompliance(container)
  })

  it('meets WCAG 2.2 Level AA requirements', async () => {
    const { container } = render(<MockedUploadCSV />)
    await runBasicWCAG22Tests(container)
  })
})
