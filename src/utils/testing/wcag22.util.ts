/**
 * WCAG 2.2 Comprehensive Testing Utilities
 * Combines all WCAG 2.2 Level A and AA tests for convenience
 */

import { testAxeCompliance } from "./axe.util";
import { testFocusNotObscured } from "./focus.util";
import { testTargetSize } from "./targetSize.util";
import { testNoDragRequired } from "./interaction.util";
import { testConsistentHelp } from "./help.util";
import { testRedundantEntry } from "./form.util";
import { testAccessibleAuth } from "./auth.util";

/**
 * Run all basic WCAG 2.2 Level A and AA tests
 */
export const runBasicWCAG22Tests = async (
  container: HTMLElement,
): Promise<void> => {
  await testAxeCompliance(container);
  testFocusNotObscured(container);
  testTargetSize(container);
  testNoDragRequired(container);
  testConsistentHelp(container);
  testRedundantEntry(container);
  testAccessibleAuth(container);
};
