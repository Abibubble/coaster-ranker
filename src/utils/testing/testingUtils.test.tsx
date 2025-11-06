/**
 * Test file to verify the new testing utilities structure
 */

import {
  render,
  testAxeCompliance,
  testFocusNotObscured,
  testTargetSize,
  testNoDragRequired,
  testConsistentHelp,
  testRedundantEntry,
  testAccessibleAuth,
  runBasicWCAG22Tests,
} from './index'

// Test component
const TestComponent = () => (
  <div>
    <h1>Test Component</h1>
    <button>Test Button</button>
    <input type='text' autoComplete='name' />
  </div>
)

describe('Testing Utilities Structure', () => {
  it('imports all utilities correctly', async () => {
    const { container } = render(<TestComponent />)

    // Test that all utilities can be imported and called
    await testAxeCompliance(container)
    testFocusNotObscured(container)
    testTargetSize(container)
    testNoDragRequired(container)
    testConsistentHelp(container)
    testRedundantEntry(container)
    testAccessibleAuth(container)

    // Test the comprehensive utility
    await runBasicWCAG22Tests(container)
  })
})
