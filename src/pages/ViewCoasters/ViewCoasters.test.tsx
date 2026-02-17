import React from "react";
import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { vi } from "vitest";
import { DataProvider } from "../../contexts/DataContext";
import ViewCoasters from "./ViewCoasters";
import { steelVengeance, fury325 } from "../../mocks";

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

const mockCoasterData = {
  coasters: [
    {
      ...steelVengeance,
      country: "USA",
      model: "I-Box",
      material: "Wood/Steel Hybrid",
      thrillLevel: "Extreme",
      rank: 1,
    },
    {
      ...fury325,
      country: "USA",
      model: "Giga Coaster",
      thrillLevel: "High",
      rank: 2,
    },
  ],
  uploadMethod: "csv" as const,
  isRanked: true,
};

describe("ViewCoasters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("shows empty state when no coasters are uploaded", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(
        <DataProvider>
          <ViewCoasters />
        </DataProvider>,
      );

      expect(screen.getByText("Your Coasters")).toBeInTheDocument();
      expect(screen.getByText("No coasters yet")).toBeInTheDocument();
    });

    it("displays coaster data when available", () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockCoasterData));

      render(
        <DataProvider>
          <ViewCoasters />
        </DataProvider>,
      );

      expect(screen.getAllByText("Steel Vengeance")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Fury 325")[0]).toBeInTheDocument();
      expect(
        screen.getByText((content, element) => {
          const textContent = element?.textContent || "";
          return (
            element?.tagName === "P" &&
            textContent.includes("You currently have") &&
            textContent.includes("2 coasters") &&
            textContent.includes("in your collection")
          );
        }),
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations with empty state", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { container } = render(
        <DataProvider>
          <ViewCoasters />
        </DataProvider>,
      );

      await testAxeCompliance(container);
    });
  });
});
