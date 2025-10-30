import { render } from '../../test-utils'
import { axe } from 'jest-axe'
import Upload from './Upload'

describe('Upload Page', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Upload />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
