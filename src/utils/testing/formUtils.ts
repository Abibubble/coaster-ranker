/**
 * WCAG 2.2 Form Input Testing Utilities
 * Tests for WCAG 2.2 - 3.3.7 Redundant Entry - Level A
 */

/**
 * Test that forms avoid requiring redundant entry of information
 */
export const testRedundantEntry = (container: HTMLElement): void => {
  const inputs = container.querySelectorAll(
    'input:not([type="file"]), textarea, select'
  )

  inputs.forEach(input => {
    const htmlInput = input as HTMLInputElement
    const hasAutocomplete = htmlInput.hasAttribute('autocomplete')
    const hasValue = htmlInput.value !== ''

    // At least one method to avoid redundant entry should exist
    expect(hasAutocomplete || hasValue).toBe(true)
  })
}
