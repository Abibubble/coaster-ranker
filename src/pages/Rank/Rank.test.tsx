import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { Rank } from "./Rank";

describe("Rank Page", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Rank />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<Rank />);
    await runBasicWCAG22Tests(container);
  });
});
