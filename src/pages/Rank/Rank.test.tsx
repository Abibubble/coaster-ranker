import { render } from '../../test-utils'
import { axe } from 'jest-axe'
import Rank from './Rank'

describe('Rank Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Rank />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
