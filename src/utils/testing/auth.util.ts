/**
 * WCAG 2.2 authentication testing utility for accessible authentication compliance.
 * Tests that authentication doesn't rely solely on cognitive function tests.
 */

export const testAccessibleAuth = (container: HTMLElement): void => {
  const authElements = container.querySelectorAll(
    'input[type="password"], [class*="captcha"], [id*="captcha"]',
  );

  if (authElements.length > 0) {
    const cognitiveTests = container.querySelectorAll(
      '[class*="math"], [class*="puzzle"]',
    );

    cognitiveTests.forEach(() => {
      const hasAlternative = container.querySelector(
        '[aria-label*="audio"], [data-testid*="alternative"]',
      );
      expect(hasAlternative).toBeTruthy();
    });
  }
};
