import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import ProgressInfo from "./ProgressInfo";

const defaultProps = {
  remainingComparisons: 10,
  totalComparisons: 12,
  title: "Hello",
  showProgressBar: true,
};

const coastersProps = {
  totalCoasters: 10,
  rankedCoasters: 3,
  title: "Ranking Progress",
  showCoastersLeft: true,
  showProgressBar: true,
};

describe("ProgressInfo", () => {
  it("has no accessibility violations with comparisons remaining", async () => {
    const { container } = render(<ProgressInfo {...defaultProps} />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements with comparisons", async () => {
    const { container } = render(<ProgressInfo {...defaultProps} />);
    await runBasicWCAG22Tests(container);
  });

  it("has no accessibility violations with coasters left to rank", async () => {
    const { container } = render(<ProgressInfo {...coastersProps} />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements with coasters", async () => {
    const { container } = render(<ProgressInfo {...coastersProps} />);
    await runBasicWCAG22Tests(container);
  });
});
