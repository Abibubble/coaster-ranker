// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import globals from 'globals'

export default [// Ignore dist folder
{ ignores: ['dist', 'build'] }, // Base configuration for all files
js.configs.recommended, // TypeScript and React configuration
{
  files: ['**/*.{ts,tsx,js,jsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: tsparser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    '@typescript-eslint': tseslint,
    react: react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'jsx-a11y': jsxA11y,
  },
  rules: {
    // TypeScript rules
    ...tseslint.configs.recommended.rules,
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',

    // React rules
    ...react.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/prop-types': 'off', // Using TypeScript for prop validation
    'react/no-unescaped-entities': 'off', // Allow apostrophes in text

    // React Refresh - make it less strict
    'react-refresh/only-export-components': 'off',

    // Accessibility rules
    ...jsxA11y.configs.recommended.rules,
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    'jsx-a11y/no-noninteractive-tabindex': 'warn', // Allow tabindex on non-interactive elements with warning

    // Relax React Hooks rules for useEffect
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/set-state-in-effect': 'off', // Allow setState in useEffect for localStorage initialization
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}, // Test files configuration
{
  files: [
    '**/*.test.{ts,tsx}',
    '**/*.spec.{ts,tsx}',
    '**/test-utils.tsx',
    '**/setupTests.ts',
  ],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.jest,
      // Vitest globals
      describe: 'readonly',
      it: 'readonly',
      expect: 'readonly',
      vi: 'readonly',
      test: 'readonly',
      beforeEach: 'readonly',
      afterEach: 'readonly',
      beforeAll: 'readonly',
      afterAll: 'readonly',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-refresh/only-export-components': 'off',
  },
}, // Type definition files
{
  files: ['**/*.d.ts'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
}, ...storybook.configs["flat/recommended"]];
