import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { testAxeCompliance, runBasicWCAG22Tests } from "../../utils/testing";
import { Modal } from "./Modal";

describe("Modal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: "Test Modal",
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Create a div element for portal mounting
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    // Clean up portal root
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it("has no accessibility violations", async () => {
    const { baseElement } = render(<Modal {...defaultProps} />);
    await testAxeCompliance(baseElement);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { baseElement } = render(
      <Modal {...defaultProps} title="Accessible Modal" />,
    );
    await runBasicWCAG22Tests(baseElement);
  });

  it("renders modal when open", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render modal when closed", () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    await user.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when escape key is pressed", async () => {
    render(<Modal {...defaultProps} />);

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onClose when clicking outside modal", async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    const overlay = screen.getByRole("dialog").parentElement;
    if (overlay) {
      await user.click(overlay);
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    }
  });

  it("does not close when clicking inside modal", async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    const modal = screen.getByRole("dialog");
    await user.click(modal);

    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it("sets focus to modal when opened", async () => {
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveFocus();
    });
  });

  it("prevents body scroll when open", () => {
    const originalOverflow = document.body.style.overflow;
    render(<Modal {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");

    // Cleanup
    document.body.style.overflow = originalOverflow;
  });

  it("restores body scroll when closed", () => {
    const originalOverflow = document.body.style.overflow;
    const { rerender } = render(<Modal {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");

    rerender(<Modal {...defaultProps} isOpen={false} />);

    expect(document.body.style.overflow).toBe("unset");

    // Cleanup
    document.body.style.overflow = originalOverflow;
  });

  it("uses custom aria-label when provided", () => {
    const customLabel = "Custom Modal Label";
    render(<Modal {...defaultProps} ariaLabel={customLabel} />);

    const modal = screen.getByRole("dialog");
    expect(modal).toHaveAttribute("aria-label", customLabel);
  });

  it("falls back to title as aria-label when no custom label provided", () => {
    render(<Modal {...defaultProps} />);

    const modal = screen.getByRole("dialog");
    expect(modal).toHaveAttribute("aria-label", "Test Modal");
  });

  it("has correct modal attributes", () => {
    render(<Modal {...defaultProps} />);

    const modal = screen.getByRole("dialog");
    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).toHaveAttribute("tabIndex", "-1");
  });

  it("renders complex children correctly", () => {
    const complexChildren = (
      <div>
        <p>Paragraph content</p>
        <button>Action Button</button>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
        </ul>
      </div>
    );

    render(<Modal {...defaultProps}>{complexChildren}</Modal>);

    expect(screen.getByText("Paragraph content")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Action Button" }),
    ).toBeInTheDocument();
    expect(screen.getByText("List item 1")).toBeInTheDocument();
    expect(screen.getByText("List item 2")).toBeInTheDocument();
  });
});
