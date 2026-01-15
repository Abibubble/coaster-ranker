import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import MainContent from "./MainContent";

describe("MainContent", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<MainContent>Test content</MainContent>);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<MainContent>Test content</MainContent>);
    await runBasicWCAG22Tests(container);
  });

  it("renders content", () => {
    render(
      <MainContent>
        <h1>Page Title</h1>
        <p>Content paragraph</p>
      </MainContent>
    );

    expect(
      screen.getByRole("heading", { name: "Page Title" })
    ).toBeInTheDocument();
    expect(screen.getByText("Content paragraph")).toBeInTheDocument();
  });
});
