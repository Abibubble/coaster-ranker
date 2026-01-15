import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import Footer from "./Footer";

describe("Footer", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Footer />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<Footer />);
    await runBasicWCAG22Tests(container);
  });

  it("renders copyright text and navigation links", () => {
    render(<Footer />);

    expect(screen.getByText("© Bubble & Squeak")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Accessibility" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Privacy Policy" })
    ).toBeInTheDocument();
  });
});
