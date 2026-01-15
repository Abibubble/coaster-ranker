import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import SkipLink from "./SkipLink";

describe("SkipLink", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<SkipLink />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<SkipLink />);
    await runBasicWCAG22Tests(container);
  });

  it("renders skip link", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: "Skip to main content" });
    expect(link).toHaveAttribute("href", "#main-content");
  });
});
