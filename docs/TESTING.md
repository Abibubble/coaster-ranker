# Testing Commands Reference

This project has two types of tests configured to run separately:

## Test Types

### 🧪 Unit Tests (`*.test.tsx` files)

- **Purpose**: Logic testing, accessibility testing, component behavior
- **Environment**: jsdom (fast, headless)
- **Files**: `src/**/*.{test,spec}.{js,ts,jsx,tsx}`
- **Framework**: Vitest with React Testing Library
- **Includes**: Our custom accessibility test utilities

### 📚 Storybook Tests (`*.stories.tsx` files)

- **Purpose**: Visual component testing, interaction testing, story-based accessibility testing
- **Environment**: Chromium browser (real browser rendering)
- **Files**: `src/**/*.stories.{js,ts,jsx,tsx}`
- **Framework**: Storybook Test Runner with Playwright

## Available Commands

### Unit Tests

```bash
# Run unit tests in watch mode
npm run test:unit

# Run unit tests once (CI mode)
npm run test:unit:ci

# Run unit tests in watch mode (alias)
npm run test:unit:watch
```

### Storybook Tests

```bash
# Run Storybook tests in watch mode
npm run test:storybook

# Run Storybook tests once (CI mode)
npm run test:storybook:ci
```

### All Tests

```bash
# Run all tests (both unit and Storybook) once
npm run test:all

# Run all tests in watch mode
npm run test

# Legacy CI command (runs all tests)
npm run test:ci

# Watch mode for all tests
npm run test:watch
```

### Specific Test Examples

```bash
# Run a specific unit test file
npm run test:unit:ci -- src/components/Button/Button.test.tsx

# Run unit tests matching a pattern
npm run test:unit:ci -- Button

# Run all accessibility-related unit tests
npm run test:unit:ci -- accessibility
```

## Test File Patterns

### Unit Test Files

- `src/components/Button/Button.test.tsx` - Component unit tests
- `src/pages/Home/Home.test.tsx` - Page unit tests
- `src/utils/testing/testingUtils.test.tsx` - Utility tests

### Storybook Test Files

- `src/components/Button/Button.stories.tsx` - Component stories with tests
- Stories automatically include accessibility testing via Storybook addons

## When to Use Which

### Use Unit Tests For:

- ✅ Testing component logic and behavior
- ✅ Testing accessibility compliance (WCAG 2.2)
- ✅ Testing utility functions
- ✅ Fast feedback during development
- ✅ Testing props, state changes, and event handlers

### Use Storybook Tests For:

- ✅ Visual regression testing
- ✅ Component documentation
- ✅ Interactive testing in real browser
- ✅ Cross-browser compatibility
- ✅ Design system validation

## Accessibility Testing

Both test types include accessibility testing:

- **Unit Tests**: Use our custom WCAG 2.2 testing utilities
- **Storybook Tests**: Use Storybook's a11y addon with axe-core

### WCAG 2.2 Utilities (Unit Tests)

```typescript
import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from '../utils/testing'

it('meets accessibility standards', async () => {
  const { container } = render(<Component />)
  await testAxeCompliance(container) // Basic axe testing
  await runBasicWCAG22Tests(container) // Full WCAG 2.2 Level AA testing
})
```

## Configuration Files

- **Vitest Config**: `vite.config.ts` (contains both unit and Storybook project configs)
- **Package.json**: Contains all test script commands
- **Setup Files**:
  - Unit tests: `src/setupTests.ts`
  - Storybook tests: `.storybook/vitest.setup.ts`
