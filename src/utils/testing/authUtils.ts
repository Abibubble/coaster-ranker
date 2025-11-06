/**
 * WCAG 2.2 Authentication Testing Utilities
 * Tests for WCAG 2.2 - 3.3.8 Accessible Authentication (Minimum) - Level AA
 */

/**
 * Test that authentication doesn't rely solely on cognitive function tests
 */
export const testAccessibleAuth = (container: HTMLElement): void => {
  const authElements = container.querySelectorAll(
    'input[type="password"], [class*="captcha"], [id*="captcha"]'
  )

  // If authentication exists, check for cognitive test alternatives
  if (authElements.length > 0) {
    const cognitiveTests = container.querySelectorAll(
      '[class*="math"], [class*="puzzle"]'
    )

    cognitiveTests.forEach(() => {
      const hasAlternative = container.querySelector(
        '[aria-label*="audio"], [data-testid*="alternative"]'
      )
      expect(hasAlternative).toBeTruthy()
    })
  }
}
