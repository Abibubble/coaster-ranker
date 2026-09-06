import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitFor,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { Rank } from "./Rank";
import { Coaster, RideType } from "../../types/data";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const STORAGE_KEYS: Record<RideType, string> = {
  coaster: "coaster-ranker-data",
  "dark-ride": "coaster-ranker-dark-rides",
};

const makeCoaster = (overrides: Partial<Coaster> & { id: string; name: string }): Coaster => ({
  park: "Test Park",
  country: "Test Country",
  manufacturer: "Test Manufacturer",
  ...overrides,
});

interface SeedRankingMetadata {
  isRanked?: boolean;
  rankedCoasters?: string[];
  completedComparisons?: string[];
}

const seedData = (
  rideType: RideType,
  coasters: Coaster[],
  rankingMetadata?: SeedRankingMetadata,
) => {
  const payload = {
    coasters,
    uploadedAt: new Date().toISOString(),
    filename: "test.csv",
    rankingMetadata: rankingMetadata
      ? {
          isRanked: false,
          rankedCoasters: [],
          completedComparisons: [],
          ...rankingMetadata,
        }
      : undefined,
  };
  localStorage.setItem(STORAGE_KEYS[rideType], JSON.stringify(payload));
};

const getComparisonButtons = () =>
  screen.getAllByRole("button", { name: /^Choose .* as your favorite$/ });

const nameFromComparisonButton = (button: HTMLElement) => {
  const match = button
    .getAttribute("aria-label")
    ?.match(/^Choose (.*) as your favorite$/);
  return match?.[1] ?? "";
};

describe("Rank Page", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Rank />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<Rank />);
    await runBasicWCAG22Tests(container);
  });

  describe("no data uploaded", () => {
    it("shows a message and an upload link for the coaster ride type", async () => {
      render(<Rank />);

      expect(
        await screen.findByText(/No coaster data uploaded yet/i),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Upload page/i }),
      ).toHaveAttribute("href", "/upload");
    });

    it("shows the dark-ride equivalent when switching ride types with only coaster data present", async () => {
      seedData("coaster", [
        makeCoaster({ id: "1", name: "Steel Vengeance" }),
        makeCoaster({ id: "2", name: "Fury 325" }),
      ]);

      render(<Rank />);

      const user = userEvent.setup();
      await user.click(screen.getByRole("tab", { name: /Dark Rides/i }));

      expect(
        await screen.findByText(/No dark ride data uploaded yet/i),
      ).toBeInTheDocument();
    });
  });

  describe("only one coaster uploaded", () => {
    it("regression: shows the 'need at least 2' message instead of crashing", async () => {
      // Rank.tsx has its own branch for exactly one coaster that renders a
      // "need at least 2" message. useSimpleRanking's initialization effect
      // runs unconditionally (hooks can't be conditional), and used to call
      // `new RankingEngine(...)` with no try/catch - RankingEngine's own
      // constructor guard throws "Need at least 2 coasters to rank, got 1"
      // with exactly one un-preranked coaster and no saved partial state,
      // which used to propagate uncaught out of the effect and crash the
      // whole page (there's no ErrorBoundary anywhere in the app) before
      // this message ever got a chance to render. The effect now catches
      // that failure and falls back to a null engine instead.
      seedData("coaster", [makeCoaster({ id: "1", name: "Steel Vengeance" })]);

      expect(() => render(<Rank />)).not.toThrow();

      expect(
        await screen.findByText(/need at least 2 coasters/i),
      ).toBeInTheDocument();
    });
  });

  describe("fresh ranking session", () => {
    it("regression: ranks the coaster the user actually clicked above the other, even on the very first comparison", async () => {
      seedData("coaster", [
        makeCoaster({ id: "1", name: "Alpha" }),
        makeCoaster({ id: "2", name: "Bravo" }),
      ]);

      render(<Rank />);

      const buttons = await waitFor(() => {
        const found = getComparisonButtons();
        expect(found).toHaveLength(2);
        return found;
      });

      // Always click the SECOND-shown coaster - this is exactly the bug
      // scenario: the engine used to silently rank the first-shown coaster
      // above the second regardless of which one was actually clicked.
      const secondShownName = nameFromComparisonButton(buttons[1]);

      const user = userEvent.setup();
      await user.click(buttons[1]);

      await waitFor(() => {
        expect(screen.getByText("Ranking Complete!")).toBeInTheDocument();
      });

      const items = screen.getAllByRole("listitem");
      expect(items[0]).toHaveTextContent(secondShownName);
    });

    it("completes a full multi-comparison session and produces a final order consistent with every choice made", async () => {
      seedData("coaster", [
        makeCoaster({ id: "1", name: "Delta" }),
        makeCoaster({ id: "2", name: "Alpha" }),
        makeCoaster({ id: "3", name: "Charlie" }),
        makeCoaster({ id: "4", name: "Bravo" }),
      ]);

      render(<Rank />);

      const user = userEvent.setup();

      // Consistently prefer whichever coaster's name sorts first
      // alphabetically. For a comparison-based insertion sort, always
      // resolving ties the same way guarantees the final order matches that
      // total order - so this both drives the session to completion and
      // gives us a checkable expected result.
      for (let i = 0; i < 20; i++) {
        if (screen.queryByText("Ranking Complete!")) break;

        const buttons = getComparisonButtons();
        expect(buttons.length).toBe(2);

        const names = buttons.map(nameFromComparisonButton);
        const winnerIndex = names[0] < names[1] ? 0 : 1;

        await user.click(buttons[winnerIndex]);

        await waitFor(() => {
          const stillComparing = screen.queryAllByRole("button", {
            name: /^Choose .* as your favorite$/,
          });
          const done = screen.queryByText("Ranking Complete!");
          expect(stillComparing.length === 2 || done).toBeTruthy();
        });
      }

      await waitFor(() => {
        expect(screen.getByText("Ranking Complete!")).toBeInTheDocument();
      });

      const items = screen.getAllByRole("listitem");
      expect(items.map((item) => item.textContent)).toEqual([
        expect.stringContaining("Alpha"),
        expect.stringContaining("Bravo"),
        expect.stringContaining("Charlie"),
        expect.stringContaining("Delta"),
      ]);
    });

    it("supports a full ranking session for the dark-ride collection independently of coaster data", async () => {
      seedData("dark-ride", [
        makeCoaster({ id: "d1", name: "Haunted Mansion", type: "dark-ride" }),
        makeCoaster({ id: "d2", name: "Ghost Train", type: "dark-ride" }),
      ]);

      render(<Rank />);

      const user = userEvent.setup();
      await user.click(screen.getByRole("tab", { name: /Dark Rides/i }));

      const buttons = await waitFor(() => {
        const found = getComparisonButtons();
        expect(found).toHaveLength(2);
        return found;
      });

      await user.click(buttons[0]);

      await waitFor(() => {
        expect(screen.getByText("Ranking Complete!")).toBeInTheDocument();
      });
    });
  });

  describe("group ranking shortcut (issue #3)", () => {
  const seedWingGroup = (extra: Coaster[] = []) =>
    seedData("coaster", [
      makeCoaster({
        id: "w1",
        name: "Wing One",
        model: "Wing Coaster",
        manufacturer: "B&M",
        rankPosition: 1,
      }),
      makeCoaster({
        id: "w2",
        name: "Wing Two",
        model: "Wing Coaster",
        manufacturer: "B&M",
        rankPosition: 2,
      }),
      makeCoaster({
        id: "w3",
        name: "Wing Three",
        model: "Wing Coaster",
        manufacturer: "B&M",
        rankPosition: 3,
      }),
      makeCoaster({
        id: "w4",
        name: "Wing Four",
        model: "Wing Coaster",
        manufacturer: "B&M",
        rankPosition: 4,
      }),
      ...extra,
    ]);

  it("offers a group comparison shortcut, and a fully-covering result resolves the main ranking with no further questions", async () => {
    seedWingGroup([
      makeCoaster({
        id: "new",
        name: "New Wing",
        model: "Wing Coaster",
        manufacturer: "B&M",
      }),
    ]);

    render(<Rank />);
    const user = userEvent.setup();

    expect(
      await screen.findByText(/compare New Wing against just those first/i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /yes, compare those first/i }),
    );

    expect(await screen.findByText(/quick comparison/i)).toBeInTheDocument();

    // Always favor "New Wing" in the mini-ranking - it should beat every
    // other Wing Coaster and end up ranked #1 overall.
    let safety = 0;
    while (!screen.queryByText("Ranking Complete!")) {
      if (safety++ > 20) throw new Error("Session did not complete");

      const buttons = getComparisonButtons();
      const newWingButton = buttons.find(
        (b) => nameFromComparisonButton(b) === "New Wing",
      );
      expect(newWingButton).toBeDefined();

      await user.click(newWingButton!);

      await waitFor(() => {
        const stillComparing = screen.queryAllByRole("button", {
          name: /^Choose .* as your favorite$/,
        });
        const done = screen.queryByText("Ranking Complete!");
        expect(stillComparing.length === 2 || done).toBeTruthy();
      });
    }

    // All 4 already-ranked coasters were the group, and New Wing beat every
    // one of them in the mini-ranking - that fully determines its position
    // in the main ranking too, with no further (non-group) questions asked.
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("New Wing");
  });

  it("falls back to the normal ranking flow when the user declines the offer", async () => {
    seedWingGroup([
      makeCoaster({
        id: "new",
        name: "New Wing",
        model: "Wing Coaster",
        manufacturer: "B&M",
      }),
    ]);

    render(<Rank />);
    const user = userEvent.setup();

    expect(
      await screen.findByText(/compare New Wing against just those first/i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /no, rank normally/i }),
    );

    const buttons = await waitFor(() => {
      const found = getComparisonButtons();
      expect(found).toHaveLength(2);
      return found;
    });

    expect(
      screen.queryByText(/compare New Wing against just those first/i),
    ).not.toBeInTheDocument();
    expect(
      buttons.some((b) => nameFromComparisonButton(b) === "New Wing"),
    ).toBe(true);
  });

  it("has no accessibility violations on the offer prompt screen", async () => {
    seedWingGroup([
      makeCoaster({
        id: "new",
        name: "New Wing",
        model: "Wing Coaster",
        manufacturer: "B&M",
      }),
    ]);

    const { container } = render(<Rank />);

    await screen.findByText(/compare New Wing against just those first/i);

    await testAxeCompliance(container);
  });

  it("does not offer the shortcut with only 3 already-ranked matches (not more than 3)", async () => {
    seedData("coaster", [
      makeCoaster({
        id: "w1",
        name: "Wing One",
        model: "Wing Coaster",
        manufacturer: "B&M",
        rankPosition: 1,
      }),
      makeCoaster({
        id: "w2",
        name: "Wing Two",
        model: "Wing Coaster",
        manufacturer: "B&M",
        rankPosition: 2,
      }),
      makeCoaster({
        id: "w3",
        name: "Wing Three",
        model: "Wing Coaster",
        manufacturer: "B&M",
        rankPosition: 3,
      }),
      makeCoaster({
        id: "new",
        name: "New Wing",
        model: "Wing Coaster",
        manufacturer: "B&M",
      }),
    ]);

    render(<Rank />);

    await waitFor(() => {
      expect(getComparisonButtons().length).toBeGreaterThan(0);
    });

    expect(
      screen.queryByText(/compare New Wing against just those first/i),
    ).not.toBeInTheDocument();
  });
});

describe("undo", () => {
    it("reverts to the previous comparison and hides the undo control once history is exhausted", async () => {
      seedData("coaster", [
        makeCoaster({ id: "1", name: "Alpha" }),
        makeCoaster({ id: "2", name: "Bravo" }),
        makeCoaster({ id: "3", name: "Charlie" }),
      ]);

      render(<Rank />);

      const user = userEvent.setup();

      const firstButtons = await waitFor(() => {
        const found = getComparisonButtons();
        expect(found).toHaveLength(2);
        return found;
      });
      const firstNames = firstButtons.map(nameFromComparisonButton);

      await user.click(firstButtons[0]);

      const undoButton = await screen.findByRole("button", {
        name: /Undo your last choice/i,
      });
      expect(undoButton).toBeInTheDocument();

      await user.click(undoButton);

      await waitFor(() => {
        const restored = getComparisonButtons().map(nameFromComparisonButton);
        expect(restored.sort()).toEqual(firstNames.sort());
      });

      expect(
        screen.queryByRole("button", { name: /Undo your last choice/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe("already-ranked data", () => {
    const seedRanked = () => {
      seedData(
        "coaster",
        [
          makeCoaster({ id: "1", name: "Alpha", rankPosition: 1 }),
          makeCoaster({ id: "2", name: "Bravo", rankPosition: 2 }),
        ],
        { isRanked: true, rankedCoasters: ["1", "2"] },
      );
    };

    it("renders straight to Ranking Complete with no comparison UI", async () => {
      seedRanked();
      render(<Rank />);

      expect(
        await screen.findByText("Ranking Complete!"),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /^Choose .* as your favorite$/ }),
      ).not.toBeInTheDocument();
    });

    it("confirms, resets, and reloads when the user accepts Rank again", async () => {
      // Note: we can't assert the reset actually "stuck" in localStorage
      // here. In real usage, window.location.reload() immediately follows
      // resetRanking() and wipes all in-memory state, so the user always
      // lands on a genuinely fresh session. But with reload stubbed to a
      // no-op (required so the test doesn't actually navigate jsdom), the
      // component keeps running - and useSimpleRanking's engine is only
      // reinitialized when the *set* of coaster ids changes, not when
      // rankPosition/isRanked change. Since "Rank again" re-ranks the same
      // coasters, the stale (already-isComplete) engine causes Rank.tsx's
      // "mark ranking complete" effect to immediately re-fire with the old
      // finalRanking, re-persisting the pre-reset ranking a tick later. This
      // is a real latent bug in the reset flow, currently masked only by
      // the immediate reload - see the fork's report. The reliable,
      // non-racy signal here is that confirm -> resetRanking -> reload all
      // fired in sequence, which is what this test asserts.
      seedRanked();
      const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
      const reloadMock = vi.fn();
      vi.stubGlobal("location", { ...window.location, reload: reloadMock });

      render(<Rank />);
      await screen.findByText("Ranking Complete!");

      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: /Rank again/i }));

      expect(confirmSpy).toHaveBeenCalled();
      await waitFor(() => {
        expect(reloadMock).toHaveBeenCalled();
      });

      confirmSpy.mockRestore();
      vi.unstubAllGlobals();
    });

    it("does not reset the ranking when the user cancels the confirmation", async () => {
      seedRanked();
      const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);
      const reloadMock = vi.fn();
      vi.stubGlobal("location", { ...window.location, reload: reloadMock });

      render(<Rank />);
      await screen.findByText("Ranking Complete!");

      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: /Rank again/i }));

      expect(confirmSpy).toHaveBeenCalled();
      const stored = JSON.parse(
        localStorage.getItem("coaster-ranker-data") || "{}",
      );
      expect(stored.rankingMetadata.isRanked).toBe(true);
      expect(reloadMock).not.toHaveBeenCalled();

      confirmSpy.mockRestore();
      vi.unstubAllGlobals();
    });
  });
});
