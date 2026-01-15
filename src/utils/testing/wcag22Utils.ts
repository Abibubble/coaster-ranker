/**
 * WCAG 2.2 Comprehensive Testing Utilities
 * Combines all WCAG 2.2 Level A and AA tests for convenience
 */

import { testAxeCompliance } from "./axeUtils";
import { testFocusNotObscured } from "./focusUtils";
import { testTargetSize } from "./targetSizeUtils";
import { testNoDragRequired } from "./interactionUtils";
import { testConsistentHelp } from "./helpUtils";
import { testRedundantEntry } from "./formUtils";
import { testAccessibleAuth } from "./authUtils";

/**
 * Run all basic WCAG 2.2 Level A and AA tests
 */
export const runBasicWCAG22Tests = async (
  container: HTMLElement
): Promise<void> => {
  await testAxeCompliance(container);
  testFocusNotObscured(container);
  testTargetSize(container);
  testNoDragRequired(container);
  testConsistentHelp(container);
  testRedundantEntry(container);
  testAccessibleAuth(container);
};
