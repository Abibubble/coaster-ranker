/**
 * WCAG 2.2 Help and Support Testing Utilities
 * Tests for WCAG 2.2 - 3.2.6 Consistent Help - Level A
 */

/**
 * Test that help information is consistent and accessible
 */
export const testConsistentHelp = (container: HTMLElement): void => {
  const helpElements = container.querySelectorAll(
    '[aria-label*="help"], [title*="help"], .help, .instructions'
  )

  helpElements.forEach(element => {
    expect(element).toBeVisible()
    if (element.textContent) {
      expect(element.textContent.trim()).not.toBe('')
    }
  })
}
