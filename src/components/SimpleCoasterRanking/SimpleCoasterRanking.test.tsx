import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SimpleCoasterRanking from './SimpleCoasterRanking'
import { Coaster } from '../../types/data'
import { axe } from 'jest-axe'

const mockCoaster: Coaster[] = [
  {
    id: '1',
    name: 'Nemesis Reborn',
    park: 'Alton Towers',
    country: 'UK',
    manufacturer: 'B&M',
    model: 'Inverted Coaster',
    material: 'Steel',
  },
]

const defaultProps = {
  coasters: mockCoaster,
  onComplete: () => {},
}

describe('SimpleCoasterRanking', () => {
  it('has no accessibility violations with comparisons remaining', async () => {
    const { container } = render(<SimpleCoasterRanking {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
