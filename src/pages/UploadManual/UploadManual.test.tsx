import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import UploadManual from './UploadManual'
import { DataProvider } from '../../contexts/DataContext'

const MockedUploadManual = () => (
  <DataProvider>
    <UploadManual />
  </DataProvider>
)

describe('UploadManual', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<MockedUploadManual />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
