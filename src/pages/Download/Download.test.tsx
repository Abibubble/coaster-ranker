import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import Download from "./Download";

describe("Download Page", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Download />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<Download />);
    await runBasicWCAG22Tests(container);
  });
});
