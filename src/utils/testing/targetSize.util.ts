/**
 * WCAG 2.2 Target Size Testing Utilities
 * Tests for WCAG 2.2 - 2.5.8 Target Size (Minimum) - Level AA
 */

/**
 * Test that interactive elements meet minimum target size requirements (24x24px)
 */
export const testTargetSize = (container: HTMLElement): void => {
  const interactiveElements = container.querySelectorAll(
    'button, [role="button"], a, input, select, textarea',
  );

  interactiveElements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.width > 0 && rect.height > 0) {
      expect(rect.width).toBeGreaterThanOrEqual(24);
      expect(rect.height).toBeGreaterThanOrEqual(24);
    } else {
      expect(element).toBeInTheDocument();
      expect(element).not.toHaveAttribute("tabindex", "-1");
    }
  });
};
