import {
  render,
  screen,
  fireEvent,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { vi } from "vitest";
import PreRankingQuestion from "./PreRankingQuestion";

describe("PreRankingQuestion", () => {
  const mockOnAnswer = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockOnAnswer.mockClear();
    mockOnCancel.mockClear();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={5}
        filename="test-coasters.csv"
      />
    );
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={5}
        filename="test-coasters.csv"
      />
    );
    await runBasicWCAG22Tests(container);
  });

  it("renders the pre-ranking question correctly", () => {
    render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={5}
        filename="test-coasters.csv"
      />
    );

    expect(screen.getByText("Ranking order question")).toBeInTheDocument();
    expect(
      screen.getByText(/You're uploading 5 coasters from "test-coasters.csv"/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Yes, these coasters are already ranked in order",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "No, these coasters are not ranked" })
    ).toBeInTheDocument();
  });

  it("calls onAnswer with true when Yes button is clicked", () => {
    render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={3}
        filename="test-coasters.csv"
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Yes, these coasters are already ranked in order",
      })
    );
    expect(mockOnAnswer).toHaveBeenCalledWith(true);
  });

  it("calls onAnswer with false when No button is clicked", () => {
    render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={3}
        filename="test-coasters.csv"
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "No, these coasters are not ranked" })
    );
    expect(mockOnAnswer).toHaveBeenCalledWith(false);
  });

  it("renders warning message when existing ranked data is present", () => {
    render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={3}
        filename="new-coasters.csv"
        hasExistingRankedData={true}
        existingCoasterCount={10}
      />
    );

    expect(screen.getByText("Adding to existing ranking")).toBeInTheDocument();
    expect(
      screen.getByText(/You already have 10 ranked coasters/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with upload" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: "Yes, these coasters are already ranked in order",
      })
    ).not.toBeInTheDocument();
  });

  it("calls onAnswer with false when Continue Upload is clicked for existing ranked data", () => {
    render(
      <PreRankingQuestion
        onAnswer={mockOnAnswer}
        onCancel={mockOnCancel}
        coasterCount={2}
        hasExistingRankedData={true}
        existingCoasterCount={5}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Continue with upload" })
    );
    expect(mockOnAnswer).toHaveBeenCalledWith(false);
  });
});
