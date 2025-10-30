import { render, RenderOptions } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { DataProvider } from './contexts/DataContext'

// Custom render function that includes DataProvider
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <DataProvider>{children}</DataProvider>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything from testing library
export * from '@testing-library/react'

// Override render method
export { customRender as render }
