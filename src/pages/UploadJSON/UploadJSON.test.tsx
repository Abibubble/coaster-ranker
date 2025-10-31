import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import UploadJSON from './UploadJSON'
import { DataProvider } from '../../contexts/DataContext'

const MockedUploadJSON = () => (
  <DataProvider>
    <UploadJSON />
  </DataProvider>
)

describe('UploadJSON', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<MockedUploadJSON />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
