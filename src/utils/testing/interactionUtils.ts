/**
 * WCAG 2.2 Interaction Testing Utilities
 * Tests for WCAG 2.2 - 2.5.7 Dragging Movements - Level AA
 */

/**
 * Test that drag operations have keyboard/click alternatives
 */
export const testNoDragRequired = (container: HTMLElement): void => {
  const draggableElements = container.querySelectorAll('[draggable="true"]')

  draggableElements.forEach(element => {
    const hasAlternative =
      element.hasAttribute('onclick') ||
      element.getAttribute('role') === 'button' ||
      element.tagName === 'BUTTON'
    expect(hasAlternative).toBe(true)
  })
}
