import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'

// jsdom doesn't implement matchMedia; ThemeContext uses it to detect the
// user's OS colour-scheme preference when no theme is stored yet.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}
