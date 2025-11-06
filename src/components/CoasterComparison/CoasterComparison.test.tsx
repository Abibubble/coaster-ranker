import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from '../../utils/testing'
import { vi } from 'vitest'
import CoasterComparison from './CoasterComparison'

const defaultProps = {
  coaster1: {
    id: '1',
    name: 'Steel Vengeance',
    park: 'Cedar Point',
    country: 'USA',
    manufacturer: 'Rocky Mountain Construction',
    model: 'I-Box',
    type: 'Steel',
  },
  coaster2: {
    id: '2',
    name: 'Fury 325',
    park: 'Carowinds',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    model: 'Giga Coaster',
    type: 'Steel',
  },
  onChoose1: vi.fn(),
  onChoose2: vi.fn(),
}

describe('CoasterComparison', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CoasterComparison {...defaultProps} />)
    await testAxeCompliance(container)
  })

  it('meets WCAG 2.2 Level AA requirements', async () => {
    const { container } = render(<CoasterComparison {...defaultProps} />)
    await runBasicWCAG22Tests(container)
  })
})
