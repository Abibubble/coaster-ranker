import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { DataProvider } from "../../contexts/DataContext";
import { ThemeProvider } from "../../contexts/ThemeContext";

/**
 * Custom render function that includes ThemeProvider, DataProvider and Router
 * Wraps components with necessary providers for testing.
 *
 * Uses a data router (rather than <MemoryRouter>) so that hooks requiring a
 * data router, e.g. useBlocker, work under test.
 */
export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const router = createMemoryRouter([
      { path: "*", element: <DataProvider>{children}</DataProvider> },
    ]);

    return (
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";

export { customRender as render };
