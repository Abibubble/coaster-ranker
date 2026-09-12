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

// The Number 0 offer appears for the first not-yet-ranked coaster before any
// other ranking UI (comparisons, the group-ranking-shortcut offer). Tests
// that aren't specifically about that offer decline it first so the rest of
// the flow behaves as it did before that feature existed.
const declineNumberZeroOffer = async (
  user: ReturnType<typeof userEvent.setup>,
) => {
  const declineButton = await screen.findByRole("button", {
    name: /no, rank it normally/i,
  });
  await user.click(declineButton);
};

// Non-blocking variant for mid-session checks: the offer can reappear for
// each new coaster as its turn comes up (it's declined per-coaster-id, not
// for the whole session), so a multi-comparison test needs to clear it
// whenever it shows up rather than only once at the start.
const declineNumberZeroOfferIfPresent = async (
  user: ReturnType<typeof userEvent.setup>,
) => {
  const declineButton = screen.queryByRole("button", {
    name: /no, rank it normally/i,
  });
  if (declineButton) {
    await user.click(declineButton);
  }
};

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
      const user = userEvent.setup();
      await declineNumberZeroOffer(user);

      const buttons = await waitFor(() => {
        const found = getComparisonButtons();
        expect(found).toHaveLength(2);
        return found;
      });

      // Always click the SECOND-shown coaster - this is exactly the bug
      // scenario: the engine used to silently rank the first-shown coaster
      // above the second regardless of which one was actually clicked.
      const secondShownName = nameFromComparisonButton(buttons[1]);

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
      await declineNumberZeroOffer(user);

      // Consistently prefer whichever coaster's name sorts first
      // alphabetically. For a comparison-based insertion sort, always
      // resolving ties the same way guarantees the final order matches that
      // total order - so this both drives the session to completion and
      // gives us a checkable expected result.
      for (let i = 0; i < 20; i++) {
        await declineNumberZeroOfferIfPresent(user);
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
          const offerShowing = screen.queryByRole("button", {
            name: /no, rank it normally/i,
          });
          const done = screen.queryByText("Ranking Complete!");
          expect(
            stillComparing.length === 2 || offerShowing || done,
          ).toBeTruthy();
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
      await declineNumberZeroOffer(user);

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
    await declineNumberZeroOffer(user);

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
    await declineNumberZeroOffer(user);

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
    const setupUser = userEvent.setup();
    await declineNumberZeroOffer(setupUser);

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
    const user = userEvent.setup();
    await declineNumberZeroOffer(user);

    await waitFor(() => {
      expect(getComparisonButtons().length).toBeGreaterThan(0);
    });

    expect(
      screen.queryByText(/compare New Wing against just those first/i),
    ).not.toBeInTheDocument();
  });
});

describe("Number 0 offer", () => {
  it("offers to mark the next unranked coaster as a Number 0, with an explanation and both actions", async () => {
    seedData("coaster", [
      makeCoaster({ id: "1", name: "Alpha" }),
      makeCoaster({ id: "2", name: "Bravo" }),
      makeCoaster({ id: "3", name: "Charlie" }),
    ]);

    render(<Rank />);

    expect(
      await screen.findByText(/Is Alpha one of those for you?/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/don't belong in a competitive ranking at all/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /yes, this is my number 0/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /no, rank it normally/i }),
    ).toBeInTheDocument();
  });

  it("accepting removes the coaster from ranking, persists isNumberZero, and moves on to comparing the rest", async () => {
    seedData("coaster", [
      makeCoaster({ id: "1", name: "Alpha" }),
      makeCoaster({ id: "2", name: "Bravo" }),
      makeCoaster({ id: "3", name: "Charlie" }),
    ]);

    render(<Rank />);
    const user = userEvent.setup();

    await screen.findByText(/Is Alpha one of those for you?/i);
    await user.click(
      screen.getByRole("button", { name: /yes, this is my number 0/i }),
    );

    const buttons = await waitFor(() => {
      const found = getComparisonButtons();
      expect(found).toHaveLength(2);
      return found;
    });
    const names = buttons.map(nameFromComparisonButton).sort();
    expect(names).toEqual(["Bravo", "Charlie"]);
    expect(
      screen.queryByText(/Is Alpha one of those for you?/i),
    ).not.toBeInTheDocument();

    const saved = JSON.parse(
      localStorage.getItem("coaster-ranker-data") || "{}",
    );
    const alpha = saved.coasters.find((c: Coaster) => c.id === "1");
    expect(alpha.isNumberZero).toBe(true);
    expect(alpha.rankPosition).toBeUndefined();
  });

  it("accepting with only one other coaster left completes the ranking immediately, showing the Number 0 separately", async () => {
    seedData("coaster", [
      makeCoaster({ id: "1", name: "Alpha" }),
      makeCoaster({ id: "2", name: "Bravo" }),
    ]);

    render(<Rank />);
    const user = userEvent.setup();

    await screen.findByText(/Is Alpha one of those for you?/i);
    await user.click(
      screen.getByRole("button", { name: /yes, this is my number 0/i }),
    );

    await waitFor(() => {
      expect(screen.getByText("Ranking Complete!")).toBeInTheDocument();
    });

    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Bravo");
    expect(screen.getByText("Your Number 0")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
  });

  it("declining falls through to the normal comparison flow for that same coaster", async () => {
    seedData("coaster", [
      makeCoaster({ id: "1", name: "Alpha" }),
      makeCoaster({ id: "2", name: "Bravo" }),
      makeCoaster({ id: "3", name: "Charlie" }),
    ]);

    render(<Rank />);
    const user = userEvent.setup();

    await screen.findByText(/Is Alpha one of those for you?/i);
    await user.click(
      screen.getByRole("button", { name: /no, rank it normally/i }),
    );

    const buttons = await waitFor(() => {
      const found = getComparisonButtons();
      expect(found).toHaveLength(2);
      return found;
    });
    expect(
      screen.queryByText(/Is Alpha one of those for you?/i),
    ).not.toBeInTheDocument();
    expect(
      buttons.some((b) => nameFromComparisonButton(b) === "Alpha"),
    ).toBe(true);
  });

  it("never offers a second Number 0 once one already exists for this ride type (hard requirement)", async () => {
    seedData("coaster", [
      makeCoaster({ id: "existing-zero", name: "Old Favourite", isNumberZero: true }),
      makeCoaster({ id: "1", name: "Alpha" }),
      makeCoaster({ id: "2", name: "Bravo" }),
    ]);

    render(<Rank />);

    const buttons = await waitFor(() => {
      const found = getComparisonButtons();
      expect(found).toHaveLength(2);
      return found;
    });

    expect(
      screen.queryByText(/one of those for you/i),
    ).not.toBeInTheDocument();
    expect(buttons.map(nameFromComparisonButton).sort()).toEqual([
      "Alpha",
      "Bravo",
    ]);
  });

  it("does not offer a Number 0 for the dark-ride collection when one already exists for coasters (per ride-type, independent)", async () => {
    seedData("coaster", [
      makeCoaster({ id: "c-zero", name: "Coaster Favourite", isNumberZero: true }),
      makeCoaster({ id: "c1", name: "Coaster A" }),
      makeCoaster({ id: "c2", name: "Coaster B" }),
    ]);
    seedData("dark-ride", [
      makeCoaster({ id: "d1", name: "Haunted Mansion", type: "dark-ride" }),
      makeCoaster({ id: "d2", name: "Ghost Train", type: "dark-ride" }),
    ]);

    render(<Rank />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("tab", { name: /Dark Rides/i }));

    expect(
      await screen.findByText(/Is Haunted Mansion one of those for you?/i),
    ).toBeInTheDocument();
  });

  it("takes priority over the group-ranking-shortcut offer for the same coaster", async () => {
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
      makeCoaster({
        id: "new",
        name: "New Wing",
        model: "Wing Coaster",
        manufacturer: "B&M",
      }),
    ]);

    render(<Rank />);

    expect(
      await screen.findByText(/Is New Wing one of those for you?/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/compare New Wing against just those first/i),
    ).not.toBeInTheDocument();
  });

  it("has no accessibility violations on the offer prompt screen", async () => {
    seedData("coaster", [
      makeCoaster({ id: "1", name: "Alpha" }),
      makeCoaster({ id: "2", name: "Bravo" }),
    ]);

    const { container } = render(<Rank />);
    await screen.findByText(/Is Alpha one of those for you?/i);

    await testAxeCompliance(container);
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
      await declineNumberZeroOffer(user);

      const firstButtons = await waitFor(() => {
        const found = getComparisonButtons();
        expect(found).toHaveLength(2);
        return found;
      });
      const firstNames = firstButtons.map(nameFromComparisonButton);

      await user.click(firstButtons[0]);

      // The first comparison ranks both Alpha and Bravo at once (see
      // handleFirstComparison), leaving Charlie as the sole unranked
      // coaster - its turn comes with its own fresh Number 0 offer.
      await declineNumberZeroOfferIfPresent(user);

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

    it("regression: removes the newly-chosen Number 0 from the ranking immediately, closing the gap, without needing a second change", async () => {
      // Regression for a bug where useSimpleRanking's ranking engine (built
      // once from the initial coaster set, only reinitialized when the *set*
      // of ids changes) stayed stale after a Number 0 change. Replacing an
      // EXISTING Number 0 demotes it to genuinely unranked (no rankPosition,
      // isNumberZero: false) as a side effect, which made Rank.tsx's derived
      // isAlreadyRanked flip false for a tick, re-firing the "mark ranking
      // complete" effect with the stale engine's original finalRanking and
      // silently overwriting the fresh rankPosition changes a moment later -
      // hence needing a *second* change to "stick". A first-time Number 0
      // assignment (no existing one to demote) doesn't trigger this at all,
      // so the pre-existing Number 0 here is essential to the repro.
      const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
      seedData(
        "coaster",
        [
          makeCoaster({ id: "1", name: "Alpha", rankPosition: 1 }),
          makeCoaster({ id: "2", name: "Bravo", rankPosition: 2 }),
          makeCoaster({ id: "3", name: "Charlie", rankPosition: 3 }),
          makeCoaster({ id: "4", name: "Delta", isNumberZero: true }),
        ],
        { isRanked: true, rankedCoasters: ["1", "2", "3"] },
      );
      render(<Rank />);
      await screen.findByText("Ranking Complete!");

      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Change" }));
      await user.click(
        screen.getByRole("button", { name: /Alpha at Test Park/ }),
      );

      expect(confirmSpy).toHaveBeenCalled();

      const stored = JSON.parse(
        localStorage.getItem("coaster-ranker-data") || "{}",
      );
      const alpha = stored.coasters.find((c: Coaster) => c.id === "1");
      const bravo = stored.coasters.find((c: Coaster) => c.id === "2");
      const charlie = stored.coasters.find((c: Coaster) => c.id === "3");
      const delta = stored.coasters.find((c: Coaster) => c.id === "4");

      expect(alpha.isNumberZero).toBe(true);
      expect(alpha.rankPosition).toBeUndefined();
      // Bravo/Charlie close the gap Alpha left behind.
      expect(bravo.rankPosition).toBe(1);
      expect(charlie.rankPosition).toBe(2);
      expect(delta.isNumberZero).toBe(false);

      confirmSpy.mockRestore();
    });

    it("regression: persists a freshly-completed comparison for a re-ranked coaster even when rankingMetadata.isRanked was stuck true from an earlier incomplete state", async () => {
      // Regression for a real corrupted-data bug: a Number 0 swap left one
      // coaster genuinely unranked (no rankPosition) while rankingMetadata's
      // isRanked flag stayed stuck at true from before the swap - exactly
      // what happens if isRanked isn't recomputed when applyRankOrder
      // touches rankedCoasters. This is the same shape of data a real user
      // reported: an existing Number 0, one genuinely-unranked coaster, one
      // ranked coaster, and a stale isRanked: true that only lists the
      // ranked one. Gating "mark ranking complete" on that stale flag (as an
      // earlier fix did) meant that even after the user completed the one
      // needed live comparison, the result never got persisted - only the
      // already-ranked coaster ever showed up afterward.
      seedData(
        "dark-ride",
        [
          makeCoaster({ id: "1", name: "Alpha", isNumberZero: true }),
          makeCoaster({ id: "2", name: "Bravo" }), // genuinely unranked
          makeCoaster({ id: "3", name: "Charlie", rankPosition: 1 }),
        ],
        { isRanked: true, rankedCoasters: ["3"] },
      );

      render(<Rank />);

      const user = userEvent.setup();
      const rideTypeToggle = screen.getByRole("tab", { name: /dark ride/i });
      await user.click(rideTypeToggle);

      // No Number 0 offer here - one already exists (Alpha), and the offer
      // never appears while that's true.
      const [chooseFirst] = await screen.findAllByRole("button", {
        name: /^Choose .* as your favorite$/,
      });
      await user.click(chooseFirst);

      await screen.findByText("Ranking Complete!");

      const stored = JSON.parse(
        localStorage.getItem("coaster-ranker-dark-rides") || "{}",
      );
      const bravo = stored.coasters.find((c: Coaster) => c.id === "2");
      const charlie = stored.coasters.find((c: Coaster) => c.id === "3");

      expect(bravo.rankPosition).toBeDefined();
      expect(charlie.rankPosition).toBeDefined();
      expect(stored.rankingMetadata.isRanked).toBe(true);
      expect(stored.rankingMetadata.rankedCoasters).toHaveLength(2);
    });
  });
});
