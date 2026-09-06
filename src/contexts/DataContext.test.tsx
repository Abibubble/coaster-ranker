import { renderHook, act } from "@testing-library/react";
import { DataProvider, useData } from "./DataContext";
import { Coaster, RideType, UploadedData } from "../types/data";

const COASTER_STORAGE_KEY = "coaster-ranker-data";
const DARK_RIDE_STORAGE_KEY = "coaster-ranker-dark-rides";

const dataStorageKeyFor = (rideType: RideType) =>
  rideType === "coaster" ? COASTER_STORAGE_KEY : DARK_RIDE_STORAGE_KEY;

const partialStorageKeyFor = (rideType: RideType) =>
  rideType === "coaster" ? "partialRankingState" : "partialDarkRideRankingState";

const makeCoaster = (overrides: Partial<Coaster>): Coaster => ({
  id: overrides.id ?? "id",
  name: "Coaster",
  park: "Park",
  country: "Country",
  manufacturer: "Manufacturer",
  ...overrides,
});

const makeUploadedData = (
  coasters: Coaster[],
  overrides: Partial<UploadedData> = {},
): UploadedData => ({
  coasters,
  uploadedAt: new Date("2024-01-01T00:00:00.000Z"),
  filename: "test-upload.json",
  ...overrides,
});

const renderData = () => renderHook(() => useData(), { wrapper: DataProvider });

const setDataFor = (
  result: ReturnType<typeof renderData>["result"],
  rideType: RideType,
  data: UploadedData | null,
) => {
  act(() => {
    if (rideType === "coaster") {
      result.current.setUploadedData(data);
    } else {
      result.current.setDarkRideData(data);
    }
  });
};

const getDataFor = (
  result: ReturnType<typeof renderData>["result"],
  rideType: RideType,
) => (rideType === "coaster" ? result.current.uploadedData : result.current.darkRideData);

describe("DataContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("throws when useData is called outside a DataProvider", () => {
    expect(() => renderHook(() => useData())).toThrow(
      "useData must be used within a DataProvider",
    );
  });

  (["coaster", "dark-ride"] as RideType[]).forEach((rideType) => {
    describe(`rideType: ${rideType}`, () => {
      it("setting data for this rideType does not affect the other rideType's state or storage", () => {
        const { result } = renderData();
        const otherType: RideType = rideType === "coaster" ? "dark-ride" : "coaster";

        setDataFor(result, rideType, makeUploadedData([makeCoaster({ id: "1" })]));

        expect(getDataFor(result, rideType)?.coasters).toHaveLength(1);
        expect(getDataFor(result, otherType)).toBeNull();

        const storedThis = localStorage.getItem(dataStorageKeyFor(rideType));
        expect(storedThis).not.toBeNull();
        expect(JSON.parse(storedThis as string).coasters).toHaveLength(1);

        expect(localStorage.getItem(dataStorageKeyFor(otherType))).toBeNull();
      });

      it("markRankingComplete sets rankPosition/isRanked/rankedCoasters and clears the partial-ranking localStorage key (regression)", () => {
        const { result } = renderData();
        const c1 = makeCoaster({ id: "1", name: "A" });
        const c2 = makeCoaster({ id: "2", name: "B" });
        const c3 = makeCoaster({ id: "3", name: "C" });
        setDataFor(result, rideType, makeUploadedData([c1, c2, c3]));

        act(() => {
          result.current.savePartialRanking(
            ["1"],
            new Map(),
            ["2", "3"],
            null,
            null,
            rideType,
          );
        });
        expect(localStorage.getItem(partialStorageKeyFor(rideType))).not.toBeNull();

        act(() => {
          result.current.markRankingComplete([c3, c1, c2], rideType);
        });

        const updated = getDataFor(result, rideType);
        expect(updated?.coasters.find((c) => c.id === "3")?.rankPosition).toBe(1);
        expect(updated?.coasters.find((c) => c.id === "1")?.rankPosition).toBe(2);
        expect(updated?.coasters.find((c) => c.id === "2")?.rankPosition).toBe(3);
        expect(updated?.rankingMetadata?.isRanked).toBe(true);
        expect(updated?.rankingMetadata?.rankedCoasters).toEqual(["3", "1", "2"]);

        expect(localStorage.getItem(partialStorageKeyFor(rideType))).toBeNull();
      });

      it("resetRanking clears rankPosition/isRanked/rankedCoasters and clears the partial-ranking localStorage key (regression)", () => {
        const { result } = renderData();
        const c1 = makeCoaster({ id: "1", rankPosition: 1 });
        const c2 = makeCoaster({ id: "2", rankPosition: 2 });
        setDataFor(
          result,
          rideType,
          makeUploadedData([c1, c2], {
            rankingMetadata: {
              completedComparisons: new Set(["1-2"]),
              rankedCoasters: ["1", "2"],
              isRanked: true,
            },
          }),
        );

        act(() => {
          result.current.savePartialRanking(["1"], new Map(), ["2"], null, null, rideType);
        });
        expect(localStorage.getItem(partialStorageKeyFor(rideType))).not.toBeNull();

        act(() => {
          result.current.resetRanking(rideType);
        });

        const updated = getDataFor(result, rideType);
        expect(updated?.coasters.every((c) => c.rankPosition === undefined)).toBe(true);
        expect(updated?.rankingMetadata?.isRanked).toBe(false);
        expect(updated?.rankingMetadata?.rankedCoasters).toEqual([]);
        expect(localStorage.getItem(partialStorageKeyFor(rideType))).toBeNull();
      });

      it("savePartialRanking sets rankPosition only for ranked coasters and persists the partial state shape", () => {
        const { result } = renderData();
        const c1 = makeCoaster({ id: "1" });
        const c2 = makeCoaster({ id: "2" });
        const c3 = makeCoaster({ id: "3" });
        setDataFor(result, rideType, makeUploadedData([c1, c2, c3]));

        const comparisonResults = new Map([["1-2", "1"]]);
        act(() => {
          result.current.savePartialRanking(
            ["2", "1"],
            comparisonResults,
            ["3"],
            { coasterA: { id: "1" }, coasterB: { id: "3" } },
            {
              winner: { id: "2" },
              loser: { id: "1" },
              comparison: { coasterA: { id: "2" }, coasterB: { id: "1" } },
            },
            rideType,
          );
        });

        const updated = getDataFor(result, rideType);
        expect(updated?.coasters.find((c) => c.id === "2")?.rankPosition).toBe(1);
        expect(updated?.coasters.find((c) => c.id === "1")?.rankPosition).toBe(2);
        expect(updated?.coasters.find((c) => c.id === "3")?.rankPosition).toBeUndefined();

        const partial = updated?.rankingMetadata?.partialRankingState;
        expect(partial).toBeDefined();
        expect(partial?.rankedCoasterIds).toEqual(["2", "1"]);
        expect(partial?.unrankedCoasterIds).toEqual(["3"]);
        expect(partial?.comparisonResults).toEqual([["1-2", "1"]]);
        expect(partial?.currentComparison).toEqual({
          coasterAId: "1",
          coasterBId: "3",
        });
        expect(partial?.lastComparison).toEqual({
          winnerId: "2",
          loserId: "1",
          coasterAId: "2",
          coasterBId: "1",
        });

        const storedRaw = localStorage.getItem(partialStorageKeyFor(rideType));
        expect(storedRaw).not.toBeNull();
        expect(JSON.parse(storedRaw as string)).toEqual(partial);
      });

      it("is a safe no-op for markRankingComplete/resetRanking/savePartialRanking when no data has been uploaded yet", () => {
        const { result } = renderData();

        expect(() => {
          act(() => {
            result.current.markRankingComplete([], rideType);
            result.current.resetRanking(rideType);
            result.current.savePartialRanking([], new Map(), [], null, null, rideType);
          });
        }).not.toThrow();

        expect(getDataFor(result, rideType)).toBeNull();
      });
    });
  });

  it("loads previously saved coaster data on mount, restoring completedComparisons as a Set", () => {
    const stored = {
      coasters: [makeCoaster({ id: "1" }), makeCoaster({ id: "2" })],
      uploadedAt: new Date("2024-05-01T00:00:00.000Z").toISOString(),
      filename: "prior.json",
      rankingMetadata: {
        completedComparisons: ["1-2", "2-3"],
        rankedCoasters: ["1", "2"],
        isRanked: true,
      },
    };
    localStorage.setItem(COASTER_STORAGE_KEY, JSON.stringify(stored));

    const { result } = renderData();

    expect(result.current.uploadedData?.coasters).toHaveLength(2);
    expect(result.current.uploadedData?.uploadedAt).toBeInstanceOf(Date);
    expect(
      result.current.uploadedData?.rankingMetadata?.completedComparisons,
    ).toBeInstanceOf(Set);
    expect(
      Array.from(
        result.current.uploadedData?.rankingMetadata?.completedComparisons ?? [],
      ),
    ).toEqual(["1-2", "2-3"]);
  });

  it("loads previously saved dark-ride data on mount independently of coaster data", () => {
    const stored = {
      coasters: [makeCoaster({ id: "d1", type: "dark-ride" })],
      uploadedAt: new Date("2024-05-01T00:00:00.000Z").toISOString(),
      filename: "dark.json",
    };
    localStorage.setItem(DARK_RIDE_STORAGE_KEY, JSON.stringify(stored));

    const { result } = renderData();

    expect(result.current.darkRideData?.coasters).toHaveLength(1);
    expect(result.current.darkRideData?.coasters[0].type).toBe("dark-ride");
    expect(result.current.uploadedData).toBeNull();
  });

  (["coaster", "dark-ride"] as RideType[]).forEach((rideType) => {
    it(`recovers from malformed JSON in localStorage for ${rideType} without crashing`, () => {
      const key = dataStorageKeyFor(rideType);
      localStorage.setItem(key, "{not valid json");

      let hookResult: ReturnType<typeof renderData>["result"] | undefined;
      expect(() => {
        ({ result: hookResult } = renderData());
      }).not.toThrow();

      expect(getDataFor(hookResult as ReturnType<typeof renderData>["result"], rideType)).toBeNull();
      expect(localStorage.getItem(key)).toBeNull();
    });
  });
});
