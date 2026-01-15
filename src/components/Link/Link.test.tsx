import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import Link from "./Link";

describe("Link", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Link href="/test">Test Link</Link>);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<Link href="/test">Test Link</Link>);
    await runBasicWCAG22Tests(container);
  });

  it("renders a link with text", () => {
    render(<Link href="/test">Test Link</Link>);

    expect(screen.getByText("Test Link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
  });
});
