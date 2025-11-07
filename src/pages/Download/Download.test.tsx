import { render } from '../../utils/testing'
import { axe } from 'jest-axe'
import Download from './Download'

describe('Download Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Download />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
