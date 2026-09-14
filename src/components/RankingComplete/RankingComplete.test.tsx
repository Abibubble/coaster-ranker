import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { Link } from "react-router-dom";
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

  it('still shows the "Your Number 0" section with a prompt to set one when no coaster is a Number 0', () => {
    const currentData: UploadedData = {
      coasters: mockCoasters,
      uploadedAt: new Date("2024-01-01"),
      filename: "test.csv",
    };
    render(<RankingComplete {...defaultProps} currentData={currentData} />);

    expect(screen.getByText("Your Number 0")).toBeInTheDocument();
    expect(screen.getByText("You haven't set one yet.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Set Number 0" }),
    ).toBeInTheDocument();
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

describe("RankingComplete - reordering", () => {
  it("has no accessibility violations in the editing (adjust rankings) view", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    const { container } = render(<RankingComplete {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: "Adjust Rankings" }));

    await testAxeCompliance(container);
  });

  it("shows a drag handle for each ranked coaster while editing", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(<RankingComplete {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: "Adjust Rankings" }));

    expect(
      screen.getByRole("button", { name: "Drag to reorder Test Coaster 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Drag to reorder Test Coaster 2" }),
    ).toBeInTheDocument();
  });

  it("reorders coasters with the arrow buttons, unaffected by the drag handle addition", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(<RankingComplete {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: "Adjust Rankings" }));
    await user.click(
      screen.getByRole("button", {
        name: "Move Test Coaster 2 up one position",
      }),
    );

    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Test Coaster 2");
    expect(items[1]).toHaveTextContent("Test Coaster 1");
  });

  it("only shows a 'Show more' button once there are more than 10 ranked coasters", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(<RankingComplete {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: "Adjust Rankings" }));

    expect(
      screen.queryByRole("button", { name: /Show \d+ more/ }),
    ).not.toBeInTheDocument();
  });

  it("reveals more rows in chunks of up to 100 via the 'Show more' button", () => {
    // Uses fireEvent (not userEvent) and a trimmed coaster count to keep this
    // fast under the full suite: it still renders enough rows to exercise
    // both the initial jump-to-100 and the "remainder < 100" chunk.
    const manyCoasters = Array.from({ length: 130 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Coaster ${i + 1}`,
      park: "Test Park",
      manufacturer: "Test Manufacturer",
      type: "coaster" as const,
      country: "UK",
    }));

    render(
      <RankingComplete rankedCoasters={manyCoasters} onRankAgain={vi.fn()} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Adjust Rankings" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(10);

    fireEvent.click(
      screen.getByRole("button", { name: "Show 90 more (10 of 130)" }),
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(100);

    fireEvent.click(
      screen.getByRole("button", { name: "Show 30 more (100 of 130)" }),
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(130);

    expect(
      screen.queryByRole("button", { name: /Show \d+ more/ }),
    ).not.toBeInTheDocument();
  });
});

describe("RankingComplete - unsaved changes guard", () => {
  const renderWithNavAway = () =>
    render(
      <>
        <Link to="/somewhere-else">Leave</Link>
        <RankingComplete {...defaultProps} />
      </>,
    );

  it("does not warn when leaving without having made any changes", async () => {
    renderWithNavAway();

    fireEvent.click(screen.getByRole("button", { name: "Adjust Rankings" }));
    fireEvent.click(screen.getByRole("link", { name: "Leave" }));

    expect(
      screen.queryByText("Unsaved ranking changes"),
    ).not.toBeInTheDocument();
  });

  it("warns before leaving when the order has changed but not been saved", async () => {
    renderWithNavAway();

    fireEvent.click(screen.getByRole("button", { name: "Adjust Rankings" }));
    fireEvent.click(
      screen.getByRole("button", {
        name: "Move Test Coaster 2 up one position",
      }),
    );
    fireEvent.click(screen.getByRole("link", { name: "Leave" }));

    expect(
      await screen.findByText("Unsaved ranking changes"),
    ).toBeInTheDocument();
  });

  it("'Keep editing' dismisses the warning and stays on the page in edit mode", async () => {
    renderWithNavAway();

    fireEvent.click(screen.getByRole("button", { name: "Adjust Rankings" }));
    fireEvent.click(
      screen.getByRole("button", {
        name: "Move Test Coaster 2 up one position",
      }),
    );
    fireEvent.click(screen.getByRole("link", { name: "Leave" }));
    const warningDialog = await screen.findByRole("dialog", {
      name: /unsaved ranking changes/i,
    });

    fireEvent.click(
      within(warningDialog).getByRole("button", { name: "Keep editing" }),
    );

    await waitFor(() =>
      expect(
        screen.queryByText("Unsaved ranking changes"),
      ).not.toBeInTheDocument(),
    );
    expect(
      screen.getByRole("button", { name: "Save Changes" }),
    ).toBeInTheDocument();
  });

  it("'Discard changes' from the warning reverts the order and lets navigation proceed", async () => {
    renderWithNavAway();

    fireEvent.click(screen.getByRole("button", { name: "Adjust Rankings" }));
    fireEvent.click(
      screen.getByRole("button", {
        name: "Move Test Coaster 2 up one position",
      }),
    );
    fireEvent.click(screen.getByRole("link", { name: "Leave" }));
    const warningDialog = await screen.findByRole("dialog", {
      name: /unsaved ranking changes/i,
    });

    fireEvent.click(
      within(warningDialog).getByRole("button", { name: "Discard changes" }),
    );

    await waitFor(() =>
      expect(
        screen.queryByText("Unsaved ranking changes"),
      ).not.toBeInTheDocument(),
    );
    expect(
      screen.getByRole("button", { name: "Adjust Rankings" }),
    ).toBeInTheDocument();
  });

  it("'Save Changes' from the warning persists the order and lets navigation proceed", async () => {
    renderWithNavAway();

    fireEvent.click(screen.getByRole("button", { name: "Adjust Rankings" }));
    fireEvent.click(
      screen.getByRole("button", {
        name: "Move Test Coaster 2 up one position",
      }),
    );
    fireEvent.click(screen.getByRole("link", { name: "Leave" }));
    const warningDialog = await screen.findByRole("dialog", {
      name: /unsaved ranking changes/i,
    });

    fireEvent.click(
      within(warningDialog).getByRole("button", { name: "Save Changes" }),
    );

    await waitFor(() =>
      expect(
        screen.queryByText("Unsaved ranking changes"),
      ).not.toBeInTheDocument(),
    );
    expect(
      screen.getByRole("button", { name: "Adjust Rankings" }),
    ).toBeInTheDocument();
  });

  it("blocks the browser tab from closing/refreshing when there are unsaved changes", async () => {
    render(<RankingComplete {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Adjust Rankings" }));
    fireEvent.click(
      screen.getByRole("button", {
        name: "Move Test Coaster 2 up one position",
      }),
    );

    const event = new Event("beforeunload", { cancelable: true });
    window.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it("has no accessibility violations in the unsaved changes warning dialog", async () => {
    const { container } = renderWithNavAway();

    fireEvent.click(screen.getByRole("button", { name: "Adjust Rankings" }));
    fireEvent.click(
      screen.getByRole("button", {
        name: "Move Test Coaster 2 up one position",
      }),
    );
    fireEvent.click(screen.getByRole("link", { name: "Leave" }));
    await screen.findByRole("dialog", { name: /unsaved ranking changes/i });

    await testAxeCompliance(container);
  });

  it("does not block the browser tab from closing/refreshing without unsaved changes", async () => {
    render(<RankingComplete {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Adjust Rankings" }));

    const event = new Event("beforeunload", { cancelable: true });
    window.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
  });
});
