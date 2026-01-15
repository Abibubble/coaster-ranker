import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import CodeBlock from "./CodeBlock";

describe("CodeBlock", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<CodeBlock>Test code</CodeBlock>);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<CodeBlock>Test code</CodeBlock>);
    await runBasicWCAG22Tests(container);
  });

  it("renders content correctly", () => {
    render(<CodeBlock>Test code content</CodeBlock>);
    expect(screen.getByText("Test code content")).toBeInTheDocument();
  });
});
