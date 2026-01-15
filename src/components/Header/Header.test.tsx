import {
  fireEvent,
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import Header from "./Header";

describe("Header", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Header />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<Header />);
    await runBasicWCAG22Tests(container);
  });

  it("renders navigation", () => {
    render(<Header />);

    expect(screen.getByText("Coaster Ranker")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Upload")).toBeInTheDocument();
    expect(screen.getByText("View Coasters")).toBeInTheDocument();
    expect(screen.getByText("Rank")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
  });

  it("toggles mobile menu", () => {
    render(<Header />);

    const burgerButton = screen.getByLabelText("Toggle navigation menu");
    expect(burgerButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(burgerButton);
    expect(burgerButton).toHaveAttribute("aria-expanded", "true");
  });
});
