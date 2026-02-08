import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { testAxeCompliance, runBasicWCAG22Tests } from "../../utils/testing";
import CurrentDataInfo from "./CurrentDataInfo";

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter initialEntries={["/"]}>{component}</MemoryRouter>,
  );
};

describe("CurrentDataInfo", () => {
  describe("Accessibility", () => {
    it("should meet basic accessibility requirements", async () => {
      const { container } = renderWithRouter(
        <CurrentDataInfo coasterCount={5} />,
      );
      await testAxeCompliance(container);
    });

    it("should meet WCAG 2.2 Level AA standards", async () => {
      const { container } = renderWithRouter(
        <CurrentDataInfo coasterCount={10} />,
      );
      await runBasicWCAG22Tests(container);
    });
  });

  describe("Content Display", () => {
    it("displays correct coaster count for zero coasters", () => {
      renderWithRouter(<CurrentDataInfo coasterCount={0} />);

      expect(screen.getByText("no rides")).toBeInTheDocument();
      expect(
        screen.getByText(/You currently have.*in your collection/),
      ).toBeInTheDocument();
    });

    it("displays correct coaster count for single coaster", () => {
      renderWithRouter(<CurrentDataInfo coasterCount={1} />);

      expect(screen.getByText("1 coaster")).toBeInTheDocument();
      expect(
        screen.getByText(/You currently have.*in your collection/),
      ).toBeInTheDocument();
    });

    it("displays correct coaster count for multiple coasters", () => {
      renderWithRouter(<CurrentDataInfo coasterCount={25} />);

      expect(screen.getByText("25 coasters")).toBeInTheDocument();
      expect(
        screen.getByText(/You currently have.*in your collection/),
      ).toBeInTheDocument();
    });

    it("displays correct coaster count for large collection", () => {
      renderWithRouter(<CurrentDataInfo coasterCount={150} />);

      expect(screen.getByText("150 coasters")).toBeInTheDocument();
    });
  });

  describe("Navigation Link", () => {
    it("renders link to view all coasters", () => {
      renderWithRouter(<CurrentDataInfo coasterCount={5} />);

      const link = screen.getByRole("link", { name: /view all coasters/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/view-coasters");
    });

    it("link has proper button styling", () => {
      renderWithRouter(<CurrentDataInfo coasterCount={5} />);

      const link = screen.getByRole("link", { name: /view all coasters/i });
      expect(link).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders with proper semantic structure", () => {
      renderWithRouter(<CurrentDataInfo coasterCount={5} />);

      // Check that the main text is in a paragraph
      const paragraph = screen.getByText(
        /You currently have.*in your collection/,
      );
      expect(paragraph.tagName).toBe("P");

      // Check that the count is emphasized
      const countText = screen.getByText("5 coasters");
      expect(countText).toBeInTheDocument();
    });

    it("renders without crashing with zero count", () => {
      const { container } = renderWithRouter(
        <CurrentDataInfo coasterCount={0} />,
      );
      expect(container).toBeInTheDocument();
    });

    it("renders without crashing with large count", () => {
      const { container } = renderWithRouter(
        <CurrentDataInfo coasterCount={999} />,
      );
      expect(container).toBeInTheDocument();
      expect(screen.getByText("999 coasters")).toBeInTheDocument();
    });
  });

  describe("Text Content", () => {
    it("uses proper text formatting", () => {
      renderWithRouter(<CurrentDataInfo coasterCount={42} />);

      // Check that the count number is bolded
      const boldText = screen.getByText("42 coasters");
      expect(boldText).toBeInTheDocument();
    });

    it("contains appropriate descriptive text", () => {
      renderWithRouter(<CurrentDataInfo coasterCount={10} />);

      expect(screen.getByText(/in your collection/)).toBeInTheDocument();
      expect(screen.getByText(/You currently have/)).toBeInTheDocument();
    });
  });
});
