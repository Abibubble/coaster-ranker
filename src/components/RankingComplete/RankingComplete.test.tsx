import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { vi } from "vitest";
import RankingComplete from "./RankingComplete";

const mockCoasters = [
  {
    id: "1",
    name: "Test Coaster 1",
    park: "Test Park 1",
    manufacturer: "Test Manufacturer",
    model: "Test Model",
    type: "coaster" as const,
    country: "UK",
  },
  {
    id: "2",
    name: "Test Coaster 2",
    park: "Test Park 2",
    manufacturer: "Test Manufacturer",
    model: "Test Model",
    type: "coaster" as const,
    country: "UK",
  },
];

const defaultProps = {
  rankedCoasters: mockCoasters,
  onRankAgain: vi.fn(),
};

describe("RankingComplete", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<RankingComplete {...defaultProps} />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<RankingComplete {...defaultProps} />);
    await runBasicWCAG22Tests(container);
  });
});
