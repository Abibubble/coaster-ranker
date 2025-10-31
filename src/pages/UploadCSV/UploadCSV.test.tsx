import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
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
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
