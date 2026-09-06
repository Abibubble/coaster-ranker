import {
  render,
  screen,
  waitFor,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from '../../utils/testing'
import userEvent from "@testing-library/user-event";
import UploadCSV from './UploadCSV'
import { DataProvider } from '../../contexts/DataContext'

const MockedUploadCSV = () => (
  <DataProvider>
    <UploadCSV />
  </DataProvider>
)

describe('UploadCSV', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<MockedUploadCSV />)
    await testAxeCompliance(container)
  })

  it('meets WCAG 2.2 Level AA requirements', async () => {
    const { container } = render(<MockedUploadCSV />)
    await runBasicWCAG22Tests(container)
  })
})

const COASTER_KEY = "coaster-ranker-data";
const DARK_RIDE_KEY = "coaster-ranker-dark-rides";

const uploadCsvFile = async (content: string, filename = "upload.csv") => {
  const user = userEvent.setup();
  const file = new File([content], filename, { type: "text/csv" });
  const input = document.getElementById(
    "csv-file-upload",
  ) as HTMLInputElement;
  await user.upload(input, file);
};

const seedUploadedData = (key: string, coasters: Record<string, unknown>[]) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      coasters,
      uploadedAt: new Date().toISOString(),
      filename: "seed.csv",
      rankingMetadata: {
        completedComparisons: [],
        rankedCoasters: [],
        isRanked: false,
      },
    }),
  );
};

describe("UploadCSV - business logic", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("uploads a valid single-row CSV and shows a success message", async () => {
    render(<MockedUploadCSV />);

    await uploadCsvFile(
      "name,park,manufacturer,country\nNemesis,Alton Towers,B&M,United Kingdom",
    );

    await waitFor(() => {
      expect(screen.getByText(/SUCCESS:/i)).toBeInTheDocument();
    });
    expect(localStorage.getItem(COASTER_KEY)).toContain("Nemesis");
  });

  it("shows an error instead of crashing when required CSV headers are missing", async () => {
    render(<MockedUploadCSV />);

    await uploadCsvFile("foo,bar\n1,2");

    await waitFor(() => {
      expect(screen.getByText(/ERROR:/i)).toBeInTheDocument();
    });
    expect(localStorage.getItem(COASTER_KEY)).toBeNull();
  });

  it("routes the upload to the coaster collection by default", async () => {
    render(<MockedUploadCSV />);

    await uploadCsvFile(
      "name,park,manufacturer,country\nNemesis,Alton Towers,B&M,United Kingdom",
    );

    await waitFor(() => {
      expect(screen.getByText(/SUCCESS:/i)).toBeInTheDocument();
    });
    expect(localStorage.getItem(COASTER_KEY)).toContain("Nemesis");
    expect(localStorage.getItem(DARK_RIDE_KEY)).toBeNull();
  });

  it("routes the upload to the dark-ride collection when Dark Rides is selected", async () => {
    render(<MockedUploadCSV />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("tab", { name: "Dark Rides" }));
    await uploadCsvFile(
      "name,park,manufacturer,country\nHaunted Mansion,Magic Kingdom,Disney Imagineering,United States",
    );

    await waitFor(() => {
      expect(screen.getByText(/SUCCESS:/i)).toBeInTheDocument();
    });
    expect(localStorage.getItem(DARK_RIDE_KEY)).toContain("Haunted Mansion");
    expect(localStorage.getItem(COASTER_KEY)).toBeNull();
  });

  it("shows the duplicate resolver for a fuzzy-matching row, and resolving it completes the upload", async () => {
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

    render(<MockedUploadCSV />);

    await uploadCsvFile(
      "name,park,manufacturer,model,country\nUntamed,Six Flags Great Escape,Rocky Mountain Construction,Wood,United States",
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

  it("shows the pre-ranking question for a multi-row CSV, and answering completes the upload", async () => {
    render(<MockedUploadCSV />);

    await uploadCsvFile(
      "name,park,manufacturer,country\n" +
        "Nemesis,Alton Towers,B&M,United Kingdom\n" +
        "Galactica,Alton Towers,Intamin,United Kingdom",
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
