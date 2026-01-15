import {
  render,
  screen,
  fireEvent,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { describe, it, expect, vi } from "vitest";
import SimpleCoasterRanking from "./SimpleCoasterRanking";
import { Coaster } from "../../types/data";

const mockCoaster: Coaster[] = [
  {
    id: "1",
    name: "Nemesis Reborn",
    park: "Alton Towers",
    country: "UK",
    manufacturer: "B&M",
    model: "Inverted Coaster",
    material: "Steel",
  },
];

const defaultProps = {
  coasters: mockCoaster,
  onComplete: () => {},
};

describe("SimpleCoasterRanking", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<SimpleCoasterRanking {...defaultProps} />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<SimpleCoasterRanking {...defaultProps} />);
    await runBasicWCAG22Tests(container);
  });
});
