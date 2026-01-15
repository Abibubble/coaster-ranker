import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import DuplicateResolver from "./DuplicateResolver";
import { DuplicateResolution } from "./DuplicateResolver";

const defaultProps = {
  duplicates: [],
  onCancel: () => {},
  onResolve: (_resolutions: DuplicateResolution[]) => {},
};

describe("DuplicateResolver", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<DuplicateResolver {...defaultProps} />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<DuplicateResolver {...defaultProps} />);
    await runBasicWCAG22Tests(container);
  });
});
