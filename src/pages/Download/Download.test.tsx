import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { vi } from 'vitest'
import Download from './Download'
import { DataProvider } from '../../contexts/DataContext'

const MockedDownload = () => (
  <DataProvider>
    <Download />
  </DataProvider>
)

describe('Download Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<MockedDownload />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
