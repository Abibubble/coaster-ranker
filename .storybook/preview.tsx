import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { colours } from '../src/theme'

// Global styles for Storybook
const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${colours.white};
    color: ${colours.black};
  }
`

const preview: Preview = {
  decorators: [
    Story => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
