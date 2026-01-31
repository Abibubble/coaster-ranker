import React from "react";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { useScrollToTop } from "./useScrollToTop";

const scrollToMock = vi.fn();
Object.defineProperty(window, "scrollTo", {
  value: scrollToMock,
  writable: true,
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("useScrollToTop", () => {
  beforeEach(() => {
    scrollToMock.mockClear();
  });

  it("scrolls to top when hook is called", () => {
    renderHook(() => useScrollToTop(), { wrapper });

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });

  it("scrolls to top when pathname changes", () => {
    const { rerender } = renderHook(() => useScrollToTop(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
      ),
    });

    expect(scrollToMock).toHaveBeenCalledTimes(1);
    scrollToMock.mockClear();

    rerender();
  });
});
