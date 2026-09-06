import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { screen } from "@testing-library/react";
import { vi } from "vitest";
import RankingComplete from "./RankingComplete";
import { UploadedData } from "../../types/data";

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

describe("RankingComplete - Number 0 section", () => {
  const currentDataWithNumberZero: UploadedData = {
    coasters: [
      ...mockCoasters,
      {
        id: "3",
        name: "Nemesis",
        park: "Alton Towers",
        manufacturer: "Bolliger & Mabillard",
        type: "coaster" as const,
        country: "UK",
        isNumberZero: true,
      },
    ],
    uploadedAt: new Date("2024-01-01"),
    filename: "test.csv",
  };

  it('shows a "Your Number 0" section with the coaster\'s name and park when one exists in currentData', () => {
    render(
      <RankingComplete
        {...defaultProps}
        currentData={currentDataWithNumberZero}
      />,
    );

    expect(screen.getByText("Your Number 0")).toBeInTheDocument();
    expect(screen.getByText("Nemesis")).toBeInTheDocument();
    expect(screen.getByText(/Alton Towers/)).toBeInTheDocument();
  });

  it("does not show the section when no coaster is a Number 0", () => {
    const currentData: UploadedData = {
      coasters: mockCoasters,
      uploadedAt: new Date("2024-01-01"),
      filename: "test.csv",
    };
    render(<RankingComplete {...defaultProps} currentData={currentData} />);

    expect(screen.queryByText("Your Number 0")).not.toBeInTheDocument();
  });

  it("still shows the Number 0 section while in the editing (adjust rankings) view", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(
      <RankingComplete
        {...defaultProps}
        currentData={currentDataWithNumberZero}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Adjust Rankings" }));

    expect(screen.getByText("Your Number 0")).toBeInTheDocument();
  });

  it("has no accessibility violations with the Number 0 section present", async () => {
    const { container } = render(
      <RankingComplete
        {...defaultProps}
        currentData={currentDataWithNumberZero}
      />,
    );
    await testAxeCompliance(container);
  });
});
