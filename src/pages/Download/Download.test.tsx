import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { vi } from 'vitest'
import Download from './Download'

describe('Download Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Download />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
