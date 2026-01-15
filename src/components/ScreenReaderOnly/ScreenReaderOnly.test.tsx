import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import ScreenReaderOnly from "./ScreenReaderOnly";

describe("ScreenReaderOnly", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <ScreenReaderOnly>Test content</ScreenReaderOnly>
    );
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(
      <ScreenReaderOnly>Test content</ScreenReaderOnly>
    );
    await runBasicWCAG22Tests(container);
  });

  it("renders content", () => {
    render(<ScreenReaderOnly>Hidden text</ScreenReaderOnly>);
    expect(screen.getByText("Hidden text")).toBeInTheDocument();
  });
});
