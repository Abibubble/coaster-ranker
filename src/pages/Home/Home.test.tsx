import { render } from '../../utils/testing'
import { axe } from 'jest-axe'
import Home from './Home'

describe('Home Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Home />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
