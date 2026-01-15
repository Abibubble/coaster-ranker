import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import Title from "./Title";

describe("Title", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Title>Test Title</Title>);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<Title>Test Title</Title>);
    await runBasicWCAG22Tests(container);
  });

  it("renders text", () => {
    render(<Title>Test Title</Title>);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent("Test Title");
  });
});
