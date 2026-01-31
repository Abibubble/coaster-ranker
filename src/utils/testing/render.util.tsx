import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { DataProvider } from "../../contexts/DataContext";

/**
 * Custom render function that includes DataProvider and Router
 * Wraps components with necessary providers for testing
 */
export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
      <DataProvider>{children}</DataProvider>
    </MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";

export { customRender as render };
