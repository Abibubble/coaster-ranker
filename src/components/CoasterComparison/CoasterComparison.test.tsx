import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import CoasterComparison from './CoasterComparison'

const defaultProps = {
  coaster1: {
    id: '1',
    name: 'Coaster One',
    park: 'Park A',
    country: 'US',
    manufacturer: 'Manufacturer A',
    model: 'Model A',
    type: 'Steel',
  },
  coaster2: {
    id: '1',
    name: 'Coaster One',
    park: 'Park A',
    country: 'US',
    manufacturer: 'Manufacturer A',
    model: 'Model A',
    type: 'Steel',
  },
  onChoose1: () => {},
  onChoose2: () => {},
}

describe('CoasterComparison', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<CoasterComparison {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
