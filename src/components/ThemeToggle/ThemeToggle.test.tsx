import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ThemeToggle />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<ThemeToggle />);
    await runBasicWCAG22Tests(container);
  });

  it("renders as a pressed button in light mode by default", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "Switch to dark mode" });
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to dark mode when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    );

    expect(
      screen.getByRole("button", { name: "Switch to light mode" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("switches back to light mode on a second click", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "Switch to dark mode" });
    await user.click(button);
    await user.click(
      screen.getByRole("button", { name: "Switch to light mode" }),
    );

    expect(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("supports keyboard activation", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.tab();
    expect(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    ).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("applies custom className when provided", () => {
    render(<ThemeToggle className="custom-class" />);

    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });
});
