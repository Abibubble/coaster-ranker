import { axe } from 'jest-axe'

/**
 * Basic axe accessibility testing utilities
 */

/**
 * Test for WCAG compliance using axe-core
 */
export const testAxeCompliance = async (
  container: HTMLElement
): Promise<void> => {
  const results = await axe(container)
  expect(results).toHaveNoViolations()
}
