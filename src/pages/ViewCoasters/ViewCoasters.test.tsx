import React from "react";
import {
  render,
  screen,
  within,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { DataProvider } from "../../contexts/DataContext";
import ViewCoasters from "./ViewCoasters";
import { steelVengeance, fury325 } from "../../mocks";
import { Coaster } from "../../types/data";

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

const mockCoasterData = {
  coasters: [
    {
      ...steelVengeance,
      country: "USA",
      model: "I-Box",
      material: "Wood/Steel Hybrid",
      thrillLevel: "Extreme",
      rank: 1,
    },
    {
      ...fury325,
      country: "USA",
      model: "Giga Coaster",
      thrillLevel: "High",
      rank: 2,
    },
  ],
  uploadMethod: "csv" as const,
  isRanked: true,
};

describe("ViewCoasters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("shows empty state when no coasters are uploaded", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(
        <DataProvider>
          <ViewCoasters />
        </DataProvider>,
      );

      expect(screen.getByText("Your Coasters")).toBeInTheDocument();
      expect(screen.getByText("No coasters yet")).toBeInTheDocument();
    });

    it("displays coaster data when available", () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockCoasterData));

      render(
        <DataProvider>
          <ViewCoasters />
        </DataProvider>,
      );

      expect(screen.getAllByText("Steel Vengeance")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Fury 325")[0]).toBeInTheDocument();
      expect(
        screen.getByText((content, element) => {
          const textContent = element?.textContent || "";
          return (
            element?.tagName === "P" &&
            textContent.includes("You currently have") &&
            textContent.includes("2 coasters") &&
            textContent.includes("in your collection")
          );
        }),
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations with empty state", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { container } = render(
        <DataProvider>
          <ViewCoasters />
        </DataProvider>,
      );

      await testAxeCompliance(container);
    });
  });
});

// The tests below need per-key localStorage (coaster vs dark-ride data
// stored under different keys simultaneously), which the single-value
// `mockLocalStorage.getItem.mockReturnValue(...)` used above can't express.
// Route the same mocks through a real in-memory store instead.
let storageData: Record<string, string> = {};

const makeCoaster = (overrides: Partial<Coaster> & { id: string }): Coaster => ({
  name: "Coaster",
  park: "Default Park",
  country: "Default Country",
  manufacturer: "Default Manufacturer",
  ...overrides,
});

const seed = (
  key: string,
  coasters: Coaster[],
  rankingMetadata?: { isRanked?: boolean; rankedCoasters?: string[] },
) => {
  storageData[key] = JSON.stringify({
    coasters,
    uploadedAt: new Date().toISOString(),
    filename: "test-data.csv",
    rankingMetadata: {
      completedComparisons: [],
      rankedCoasters: rankingMetadata?.rankedCoasters ?? [],
      isRanked: rankingMetadata?.isRanked ?? false,
    },
  });
};

const mockAutocompleteFetch = () => {
  global.fetch = vi.fn((url: unknown) => {
    const href = String(url);
    if (href.includes("parks.json")) {
      return Promise.resolve({
        ok: true,
        json: async () => [{ name: "Alton Towers", country: "United Kingdom" }],
      } as Response);
    }
    if (href.includes("countries.json")) {
      return Promise.resolve({
        ok: true,
        json: async () => [{ country: "United Kingdom" }],
      } as Response);
    }
    if (href.includes("manufacturers.json")) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          { manufacturer: "Bolliger & Mabillard", models: ["Inverted Coaster"] },
        ],
      } as Response);
    }
    return Promise.resolve({ ok: true, json: async () => [] } as Response);
  }) as unknown as typeof fetch;
};

beforeEach(() => {
  vi.clearAllMocks();
  storageData = {};
  mockLocalStorage.getItem.mockImplementation(
    (key: string) => storageData[key] ?? null,
  );
  mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
    storageData[key] = value;
  });
  mockLocalStorage.removeItem.mockImplementation((key: string) => {
    delete storageData[key];
  });
  // ViewCoasters always runs the edit-autocomplete hooks, even outside edit
  // mode, so fetch needs a mock in every test below to avoid noisy failed
  // network calls to relative URLs in the jsdom environment.
  mockAutocompleteFetch();
});

/** Scopes a query to the FilterSection, since its field labels (e.g. "Park")
 * collide with the same static labels repeated on every CoasterCard. */
const getFilterSection = (): HTMLElement =>
  screen.getByRole("button", { name: /filter options/i })
    .parentElement as HTMLElement;

describe("ViewCoasters - filtering", () => {
  it("narrows the list by park and restores it when filters are cleared", async () => {
    const user = userEvent.setup();
    seed("coaster-ranker-data", [
      makeCoaster({ id: "1", name: "Nemesis", park: "Alton Towers" }),
      makeCoaster({ id: "2", name: "Galactica", park: "Alton Towers" }),
      makeCoaster({ id: "3", name: "Stealth", park: "Thorpe Park" }),
    ]);

    render(
      <DataProvider>
        <ViewCoasters />
      </DataProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Show filter options" }));
    const parkGroup = within(getFilterSection()).getByText("Park")
      .parentElement as HTMLElement;
    await user.selectOptions(within(parkGroup).getByRole("combobox"), "Thorpe Park");

    expect(screen.queryAllByText("Nemesis")).toHaveLength(0);
    expect(screen.queryAllByText("Galactica")).toHaveLength(0);
    expect(screen.getAllByText("Stealth").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Clear all filters" }));

    expect(screen.getAllByText("Nemesis").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Galactica").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Stealth").length).toBeGreaterThan(0);
  });
});

describe("ViewCoasters - sorting and rank badges", () => {
  it('regression: offers "Sort by rank" and shows rank badges for a PARTIALLY ranked collection', async () => {
    const user = userEvent.setup();
    // isRanked is false - only individual rankPositions are set - so this
    // must go through the shared hasAnyRanking helper to be treated as
    // "ranked" at all (fixed this session; used to require isRanked: true).
    seed(
      "coaster-ranker-data",
      [
        makeCoaster({ id: "1", name: "Nemesis", rankPosition: 2 }),
        makeCoaster({ id: "2", name: "Galactica", rankPosition: 1 }),
        makeCoaster({ id: "3", name: "Stealth" }),
      ],
      { isRanked: false },
    );

    render(
      <DataProvider>
        <ViewCoasters />
      </DataProvider>,
    );

    expect(screen.getAllByText("#1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("#2").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Open sort options" }));
    expect(screen.getByText("Rankings (Top to Bottom)")).toBeInTheDocument();

    await user.click(screen.getByText("Rankings (Top to Bottom)"));

    const names = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(names.indexOf("Galactica")).toBeLessThan(names.indexOf("Nemesis"));
    expect(names.indexOf("Nemesis")).toBeLessThan(names.indexOf("Stealth"));
  });
});

describe("ViewCoasters - editing", () => {
  it("edits a coaster's name and saves the change", async () => {
    const user = userEvent.setup();
    seed("coaster-ranker-data", [
      makeCoaster({
        id: "1",
        name: "Nemesis",
        park: "Alton Towers",
        manufacturer: "Bolliger & Mabillard",
        country: "United Kingdom",
      }),
    ]);

    render(
      <DataProvider>
        <ViewCoasters />
      </DataProvider>,
    );

    await user.click(screen.getAllByRole("button", { name: "Edit Nemesis" })[0]);

    const nameInput = screen.getByDisplayValue("Nemesis");
    await user.clear(nameInput);
    await user.type(nameInput, "Nemesis Reborn");
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(screen.getAllByText("Nemesis Reborn").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("Nemesis", { exact: true })).toHaveLength(0);
  });

  it("discards the change when editing is cancelled", async () => {
    const user = userEvent.setup();
    seed("coaster-ranker-data", [
      makeCoaster({
        id: "1",
        name: "Nemesis",
        park: "Alton Towers",
        manufacturer: "Bolliger & Mabillard",
        country: "United Kingdom",
      }),
    ]);

    render(
      <DataProvider>
        <ViewCoasters />
      </DataProvider>,
    );

    await user.click(screen.getAllByRole("button", { name: "Edit Nemesis" })[0]);
    const nameInput = screen.getByDisplayValue("Nemesis");
    await user.clear(nameInput);
    await user.type(nameInput, "Something Else");
    await user.click(screen.getByRole("button", { name: "Cancel editing" }));

    expect(screen.getAllByText("Nemesis").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("Something Else")).toHaveLength(0);
  });
});

describe("ViewCoasters - removing", () => {
  it("removes a coaster after confirmation and persists the change", async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
    seed("coaster-ranker-data", [
      makeCoaster({ id: "1", name: "Nemesis" }),
      makeCoaster({ id: "2", name: "Galactica" }),
    ]);

    render(
      <DataProvider>
        <ViewCoasters />
      </DataProvider>,
    );

    await user.click(
      screen.getAllByRole("button", { name: "Remove Nemesis from collection" })[0],
    );

    expect(confirmSpy).toHaveBeenCalled();
    expect(screen.queryAllByText("Nemesis")).toHaveLength(0);
    expect(screen.getAllByText("Galactica").length).toBeGreaterThan(0);

    const saved = JSON.parse(storageData["coaster-ranker-data"]);
    expect(saved.coasters.map((c: Coaster) => c.name)).toEqual(["Galactica"]);

    confirmSpy.mockRestore();
  });

  it("does not remove the coaster when the confirmation is cancelled", async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);
    seed("coaster-ranker-data", [makeCoaster({ id: "1", name: "Nemesis" })]);

    render(
      <DataProvider>
        <ViewCoasters />
      </DataProvider>,
    );

    await user.click(
      screen.getAllByRole("button", { name: "Remove Nemesis from collection" })[0],
    );

    expect(screen.getAllByText("Nemesis").length).toBeGreaterThan(0);
    confirmSpy.mockRestore();
  });
});

describe("ViewCoasters - dark-ride collection", () => {
  it("hides coaster-only filters and fields, and still supports filtering and removing", async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
    // Seed a coaster too so the page mounts on its normal (functional) toggle
    // rather than the empty-state's own disconnected ride-type toggle.
    seed("coaster-ranker-data", [makeCoaster({ id: "c1", name: "Nemesis" })]);
    seed("coaster-ranker-dark-rides", [
      makeCoaster({
        id: "d1",
        name: "Haunted Mansion",
        park: "Magic Kingdom",
        type: "dark-ride",
      }),
      makeCoaster({
        id: "d2",
        name: "Pirates of the Caribbean",
        park: "Magic Kingdom",
        type: "dark-ride",
      }),
    ]);

    render(
      <DataProvider>
        <ViewCoasters />
      </DataProvider>,
    );

    await user.click(screen.getByRole("tab", { name: "Dark Rides" }));
    await user.click(screen.getByRole("button", { name: "Show filter options" }));

    expect(screen.queryAllByText("Model")).toHaveLength(0);
    expect(screen.queryAllByText("Material")).toHaveLength(0);
    expect(screen.queryAllByText("Thrill Level")).toHaveLength(0);

    const parkGroup = within(getFilterSection()).getByText("Park")
      .parentElement as HTMLElement;
    await user.selectOptions(within(parkGroup).getByRole("combobox"), "Magic Kingdom");
    expect(screen.getAllByText("Haunted Mansion").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pirates of the Caribbean").length).toBeGreaterThan(0);

    await user.click(
      screen.getAllByRole("button", {
        name: "Remove Haunted Mansion from collection",
      })[0],
    );
    expect(screen.queryAllByText("Haunted Mansion")).toHaveLength(0);
    expect(screen.getAllByText("Pirates of the Caribbean").length).toBeGreaterThan(0);

    confirmSpy.mockRestore();
  });
});
