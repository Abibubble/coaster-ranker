import {
  render,
  screen,
  waitFor,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import userEvent from "@testing-library/user-event";
import UploadJSON from "./UploadJSON";
import { DataProvider } from "../../contexts/DataContext";

const MockedUploadJSON = () => (
  <DataProvider>
    <UploadJSON />
  </DataProvider>
);

describe("UploadJSON", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<MockedUploadJSON />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<MockedUploadJSON />);
    await runBasicWCAG22Tests(container);
  });
});

const COASTER_KEY = "coaster-ranker-data";
const DARK_RIDE_KEY = "coaster-ranker-dark-rides";

const submitJson = async (json: string) => {
  // Not screen.getByLabelText: the <label> here is a ScreenReaderOnly
  // rendered `as="label" htmlFor="json-textarea"`, but ScreenReaderOnly only
  // forwards `children`/`as`/`id` and silently drops `htmlFor`, so the
  // rendered label has no `for` attribute and isn't programmatically
  // associated with the textarea (a real, pre-existing accessibility bug,
  // reported separately - not fixed here).
  const user = userEvent.setup();
  const textarea = document.getElementById(
    "json-textarea",
  ) as HTMLTextAreaElement;
  await user.click(textarea);
  await user.paste(json);
  await user.click(screen.getByRole("button", { name: /Process JSON/i }));
};

const seedUploadedData = (key: string, coasters: Record<string, unknown>[]) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      coasters,
      uploadedAt: new Date().toISOString(),
      filename: "seed.json",
      rankingMetadata: {
        completedComparisons: [],
        rankedCoasters: [],
        isRanked: false,
      },
    }),
  );
};

describe("UploadJSON - business logic", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("submits a valid single-item JSON array and shows a success message", async () => {
    render(<MockedUploadJSON />);

    await submitJson(
      JSON.stringify([
        {
          name: "Nemesis",
          park: "Alton Towers",
          manufacturer: "B&M",
          country: "United Kingdom",
        },
      ]),
    );

    await waitFor(() => {
      expect(screen.getByText(/SUCCESS:/i)).toBeInTheDocument();
    });
    expect(localStorage.getItem(COASTER_KEY)).toContain("Nemesis");
  });

  it("shows an error instead of crashing for malformed JSON", async () => {
    render(<MockedUploadJSON />);

    await submitJson("{not valid json");

    await waitFor(() => {
      expect(screen.getByText(/ERROR:/i)).toBeInTheDocument();
    });
    expect(localStorage.getItem(COASTER_KEY)).toBeNull();
  });

  it("routes the upload to the coaster collection by default", async () => {
    render(<MockedUploadJSON />);

    await submitJson(
      JSON.stringify([
        {
          name: "Nemesis",
          park: "Alton Towers",
          manufacturer: "B&M",
          country: "United Kingdom",
        },
      ]),
    );

    await waitFor(() => {
      expect(screen.getByText(/SUCCESS:/i)).toBeInTheDocument();
    });
    expect(localStorage.getItem(COASTER_KEY)).toContain("Nemesis");
    expect(localStorage.getItem(DARK_RIDE_KEY)).toBeNull();
  });

  it("routes the upload to the dark-ride collection when Dark Rides is selected", async () => {
    render(<MockedUploadJSON />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("tab", { name: "Dark Rides" }));
    await submitJson(
      JSON.stringify([
        {
          name: "Haunted Mansion",
          park: "Magic Kingdom",
          manufacturer: "Disney Imagineering",
          country: "United States",
        },
      ]),
    );

    await waitFor(() => {
      expect(screen.getByText(/SUCCESS:/i)).toBeInTheDocument();
    });
    expect(localStorage.getItem(DARK_RIDE_KEY)).toContain("Haunted Mansion");
    expect(localStorage.getItem(COASTER_KEY)).toBeNull();
  });

  it("shows the duplicate resolver for a fuzzy-matching item, and resolving it completes the upload", async () => {
    seedUploadedData(COASTER_KEY, [
      {
        id: "existing-1",
        name: "Untamed",
        park: "Canobie Lake Park",
        manufacturer: "Rocky Mountain Construction",
        model: "Wood",
        country: "United States",
      },
    ]);

    render(<MockedUploadJSON />);

    await submitJson(
      JSON.stringify([
        {
          name: "Untamed",
          park: "Six Flags Great Escape",
          manufacturer: "Rocky Mountain Construction",
          model: "Wood",
          country: "United States",
        },
      ]),
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Potential Duplicate Coasters Detected/i),
      ).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Keep Both" }));
    await user.click(screen.getByRole("button", { name: "Confirm Choices" }));

    await waitFor(() => {
      expect(
        screen.queryByText(/Potential Duplicate Coasters Detected/i),
      ).not.toBeInTheDocument();
    });
    expect(localStorage.getItem(COASTER_KEY)).toContain("Untamed");
  });

  it("shows the pre-ranking question for a multi-item JSON array, and answering completes the upload", async () => {
    render(<MockedUploadJSON />);

    await submitJson(
      JSON.stringify([
        {
          name: "Nemesis",
          park: "Alton Towers",
          manufacturer: "B&M",
          country: "United Kingdom",
        },
        {
          name: "Galactica",
          park: "Alton Towers",
          manufacturer: "Intamin",
          country: "United Kingdom",
        },
      ]),
    );

    await waitFor(() => {
      expect(screen.getByText(/Ranking order question/i)).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(
      screen.getByRole("button", {
        name: "No, these coasters are not ranked",
      }),
    );

    await waitFor(() => {
      expect(screen.getByText(/SUCCESS:/i)).toBeInTheDocument();
    });
    const saved = JSON.parse(localStorage.getItem(COASTER_KEY) || "{}");
    expect(saved.coasters).toHaveLength(2);
  });
});
