import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import Home from "./Home";

describe("Home Page", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Home />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<Home />);
    await runBasicWCAG22Tests(container);
  });
});
