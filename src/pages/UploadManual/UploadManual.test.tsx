import {
  render,
  screen,
  waitFor,
  fireEvent,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import UploadManual from "./UploadManual";
import { DataProvider } from "../../contexts/DataContext";

const MockedUploadManual = () => (
  <DataProvider>
    <UploadManual />
  </DataProvider>
);

const seedCoasterData = (coasters: unknown[]) => {
  localStorage.setItem(
    "coaster-ranker-data",
    JSON.stringify({
      coasters,
      uploadedAt: new Date(),
      filename: "coasters.csv",
      rankingMetadata: {
        completedComparisons: [],
        rankedCoasters: [],
        isRanked: false,
      },
    }),
  );
};

const seedDarkRideData = (coasters: unknown[]) => {
  localStorage.setItem(
    "coaster-ranker-dark-rides",
    JSON.stringify({
      coasters,
      uploadedAt: new Date(),
      filename: "dark-rides.csv",
      rankingMetadata: {
        completedComparisons: [],
        rankedCoasters: [],
        isRanked: false,
      },
    }),
  );
};

const getStoredCoasters = (key: string): any[] => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw).coasters : [];
};

describe("UploadManual", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<MockedUploadManual />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<MockedUploadManual />);
    await runBasicWCAG22Tests(container);
  });
});

describe("UploadManual - form submission", () => {
  beforeEach(() => {
    localStorage.clear();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);
  });

  const fillRequiredFields = async (
    user: ReturnType<typeof userEvent.setup>,
    { name, park, manufacturer, country }: Record<string, string>,
  ) => {
    await user.type(screen.getByLabelText(/^name/i), name);
    await user.type(
      screen.getByRole("combobox", { name: "Theme Park" }),
      park,
    );
    await user.type(
      screen.getByRole("combobox", { name: "Manufacturer" }),
      manufacturer,
    );
    await user.type(
      screen.getByRole("combobox", { name: "Location" }),
      country,
    );
  };

  it("adds a valid new coaster with no existing data and shows a success message", async () => {
    const user = userEvent.setup();
    render(<MockedUploadManual />);

    await fillRequiredFields(user, {
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "B&M",
      country: "United Kingdom",
    });

    await user.click(
      screen.getByRole("button", { name: /add coaster to collection/i }),
    );

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        /successfully added/i,
      );
    });

    const stored = getStoredCoasters("coaster-ranker-data");
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe("Nemesis");
  });

  it("regression: the Name field has no name attribute (Firefox autofill history keys off it)", () => {
    render(<MockedUploadManual />);

    expect(screen.getByLabelText(/^name/i)).not.toHaveAttribute("name");
  });

  it("shows an error and adds nothing when required fields are missing", async () => {
    const { container } = render(<MockedUploadManual />);

    // The Name/Theme Park/Manufacturer/Location inputs all carry an HTML
    // `required` attribute, so a real click on the submit button would be
    // blocked by native browser constraint validation before React's
    // onSubmit (and its own missing-fields check) ever runs. Dispatch the
    // submit event directly to exercise that JS-level validation instead.
    const form = container.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        /please fill in all required fields/i,
      );
    });

    expect(localStorage.getItem("coaster-ranker-data")).toBeNull();
  });

  it("auto-merges into an existing coaster missing a field, without showing the resolver", async () => {
    seedCoasterData([
      {
        id: "existing-1",
        name: "Nemesis",
        park: "Alton Towers",
        country: "United Kingdom",
        manufacturer: "B&M",
      },
    ]);

    const user = userEvent.setup();
    render(<MockedUploadManual />);

    await fillRequiredFields(user, {
      name: "Nemesis",
      park: "Alton Towers",
      manufacturer: "B&M",
      country: "United Kingdom",
    });
    await user.type(
      screen.getByRole("combobox", { name: "Model" }),
      "Inverted Coaster",
    );

    await user.click(
      screen.getByRole("button", { name: /add coaster to collection/i }),
    );

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/auto-merged/i);
    });

    expect(
      screen.queryByText(/potential duplicate coasters detected/i),
    ).not.toBeInTheDocument();

    const stored = getStoredCoasters("coaster-ranker-data");
    expect(stored).toHaveLength(1);
    expect(stored[0].model).toBe("Inverted Coaster");
  });

  it("regression: an auto-merged dark-ride submission updates the dark-ride bucket, not the coaster bucket", async () => {
    // Auto-merge only requires an exact name match + fuzzy park match, so
    // (unlike a manual "needs resolution" duplicate, which requires 3+
    // matching fields including one - like model - that dark rides can no
    // longer submit via this form) it's reachable for a dark-ride entry.
    // This exercises the exact code path that used to write dark-ride
    // duplicate/auto-merge results into the coaster bucket instead.
    seedDarkRideData([
      {
        id: "existing-dr-1",
        name: "Ghost Train",
        park: "Blackpool Pleasure Beach",
        country: "United Kingdom",
        manufacturer: "",
        type: "dark-ride",
      },
    ]);

    const user = userEvent.setup();
    render(<MockedUploadManual />);

    await user.click(screen.getByRole("tab", { name: "Dark Rides" }));

    await fillRequiredFields(user, {
      name: "Ghost Train",
      park: "Blackpool Pleasure Beach",
      manufacturer: "ETF Rides",
      country: "United Kingdom",
    });

    await user.click(
      screen.getByRole("button", { name: /add dark ride to collection/i }),
    );

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        /successfully merged "ghost train" with existing data/i,
      );
    });

    const darkRides = getStoredCoasters("coaster-ranker-dark-rides");
    expect(darkRides).toHaveLength(1);
    expect(darkRides[0].manufacturer).toBe("ETF Rides");

    // The coaster bucket must be untouched by a dark-ride submission.
    expect(localStorage.getItem("coaster-ranker-data")).toBeNull();
  });

  it("regression: only shows model/material/thrill-level fields for coasters, hiding all three for dark rides", async () => {
    const user = userEvent.setup();
    render(<MockedUploadManual />);

    expect(
      screen.getByRole("combobox", { name: "Model" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^material$/i)).toBeInTheDocument();
    expect(screen.getByText(/^thrill level$/i)).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Dark Rides" }));

    // Model is now gated by ride type too, matching Material/Thrill Level -
    // a dark-ride entry can no longer get a model value that's invisible
    // everywhere else in the app (FilterSection/CoasterEditForm already
    // hid Model for dark rides).
    expect(
      screen.queryByRole("combobox", { name: "Model" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/^material$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^thrill level$/i)).not.toBeInTheDocument();
  });
});
