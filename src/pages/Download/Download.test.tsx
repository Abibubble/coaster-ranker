import { vi } from "vitest";
import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import userEvent from "@testing-library/user-event";
import Download from "./Download";
import { Coaster } from "../../types/data";

vi.mock("../../utils/dataExport", async () => {
  const actual = await vi.importActual<typeof import("../../utils/dataExport")>(
    "../../utils/dataExport",
  );
  return {
    ...actual,
    generateCSV: vi.fn(actual.generateCSV),
    generateJSON: vi.fn(actual.generateJSON),
    downloadFile: vi.fn(() => ({ success: true })),
  };
});

import { generateCSV, generateJSON, downloadFile } from "../../utils/dataExport";

describe("Download Page", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Download />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<Download />);
    await runBasicWCAG22Tests(container);
  });
});

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster => ({
  id: overrides.id ?? overrides.name ?? "id",
  name: "Coaster",
  park: "Park",
  country: "Country",
  manufacturer: "Manufacturer",
  ...overrides,
});

const seedData = (
  key: string,
  coasters: Coaster[],
  rankingMetadata?: { isRanked?: boolean; rankedCoasters?: string[] },
) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      coasters,
      uploadedAt: new Date().toISOString(),
      filename: "test-data.csv",
      rankingMetadata: {
        completedComparisons: [],
        rankedCoasters: rankingMetadata?.rankedCoasters ?? [],
        isRanked: rankingMetadata?.isRanked ?? false,
      },
    }),
  );
};

describe("Download Page - empty state", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("shows a no-data message and no download options when nothing has been uploaded", () => {
    render(<Download />);

    expect(screen.getByText("No Rides Yet")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Download as CSV/i }),
    ).not.toBeInTheDocument();
  });
});

describe("Download Page - coaster export wiring", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("downloads a CSV without ranking data when nothing is ranked", async () => {
    const user = userEvent.setup();
    seedData("coaster-ranker-data", [
      makeCoaster({ id: "1", name: "Nemesis" }),
      makeCoaster({ id: "2", name: "Galactica" }),
    ]);

    render(<Download />);

    await user.click(screen.getByText("Download as CSV"));

    expect(generateCSV).toHaveBeenCalledWith(
      expect.objectContaining({
        coasters: expect.arrayContaining([
          expect.objectContaining({ name: "Nemesis" }),
          expect.objectContaining({ name: "Galactica" }),
        ]),
        includeRanking: false,
      }),
    );
    expect(downloadFile).toHaveBeenCalledWith(
      expect.objectContaining({
        filename: expect.stringMatching(/^coaster-ranker-.*\.csv$/),
        contentType: "text/csv",
        content: expect.stringContaining("Nemesis"),
      }),
    );
  });

  it("downloads a JSON export with the same coaster data", async () => {
    const user = userEvent.setup();
    seedData("coaster-ranker-data", [makeCoaster({ id: "1", name: "Nemesis" })]);

    render(<Download />);

    await user.click(screen.getByText("Download as JSON"));

    expect(generateJSON).toHaveBeenCalledWith(
      expect.objectContaining({
        coasters: expect.arrayContaining([
          expect.objectContaining({ name: "Nemesis" }),
        ]),
        includeRanking: false,
      }),
    );
    expect(downloadFile).toHaveBeenCalledWith(
      expect.objectContaining({
        filename: expect.stringMatching(/^coaster-ranker-.*\.json$/),
        contentType: "application/json",
        content: expect.stringContaining("Nemesis"),
      }),
    );
  });

  it("includes ranking in both CSV and JSON exports identically when coasters are ranked", async () => {
    const user = userEvent.setup();
    seedData(
      "coaster-ranker-data",
      [
        makeCoaster({ id: "1", name: "Nemesis", rankPosition: 1 }),
        makeCoaster({ id: "2", name: "Galactica", rankPosition: 2 }),
      ],
      { isRanked: true, rankedCoasters: ["1", "2"] },
    );

    render(<Download />);

    expect(
      screen.getByText((_, el) => el?.textContent === "Downloading 2 coasters with ranking"),
    ).toBeInTheDocument();

    await user.click(screen.getByText("Download as CSV"));
    expect(generateCSV).toHaveBeenCalledWith(
      expect.objectContaining({ includeRanking: true }),
    );
    const csvContent = (downloadFile as ReturnType<typeof vi.fn>).mock.calls[0][0]
      .content as string;
    expect(csvContent.split("\n")[0]).toContain("rank");

    vi.clearAllMocks();

    await user.click(screen.getByText("Download as JSON"));
    expect(generateJSON).toHaveBeenCalledWith(
      expect.objectContaining({ includeRanking: true }),
    );
    const jsonContent = (downloadFile as ReturnType<typeof vi.fn>).mock.calls[0][0]
      .content as string;
    const parsed = JSON.parse(jsonContent);
    expect(parsed.coasters[0].rank).toBeDefined();
  });
});

describe("Download Page - dark ride ride-type switching", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("exports the dark-ride collection, not the coaster collection, once switched", async () => {
    const user = userEvent.setup();
    seedData("coaster-ranker-data", [
      makeCoaster({ id: "c1", name: "Nemesis" }),
    ]);
    seedData("coaster-ranker-dark-rides", [
      makeCoaster({ id: "d1", name: "Haunted Mansion", park: "Magic Kingdom" }),
    ]);

    render(<Download />);

    await user.click(screen.getByRole("tab", { name: "Dark Rides" }));
    await user.click(screen.getByText("Download as CSV"));

    expect(generateCSV).toHaveBeenCalledWith(
      expect.objectContaining({
        coasters: expect.arrayContaining([
          expect.objectContaining({ name: "Haunted Mansion" }),
        ]),
      }),
    );
    expect(downloadFile).toHaveBeenCalledWith(
      expect.objectContaining({
        filename: expect.stringMatching(/^dark-ride-ranker-.*\.csv$/),
        content: expect.stringContaining("Haunted Mansion"),
      }),
    );
    const csvContent = (downloadFile as ReturnType<typeof vi.fn>).mock.calls[0][0]
      .content as string;
    expect(csvContent).not.toContain("Nemesis");
  });

  it("shows an info message and no download buttons for a ride type with no data", async () => {
    const user = userEvent.setup();
    seedData("coaster-ranker-data", [makeCoaster({ id: "c1" })]);
    // No dark-ride data seeded.

    render(<Download />);

    await user.click(screen.getByRole("tab", { name: "Dark Rides" }));

    expect(
      screen.getByText(/No dark rides uploaded yet/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Download as CSV/i }),
    ).not.toBeInTheDocument();
  });
});
