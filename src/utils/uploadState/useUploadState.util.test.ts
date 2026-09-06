import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Coaster } from "../../types/data";
import { DuplicateMatch } from "../fileProcessing/duplicateDetection.util";
import { useUploadState } from "./useUploadState.util";

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster =>
  ({
    id: overrides.id ?? "1",
    name: "Test Ride",
    park: "Test Park",
    country: "Test Country",
    manufacturer: "Test Manufacturer",
    ...overrides,
  }) as Coaster;

const makeDuplicateMatch = (
  overrides: Partial<DuplicateMatch> = {},
): DuplicateMatch =>
  ({
    existingCoaster: makeCoaster({ id: "existing" }),
    newCoaster: makeCoaster({ id: "new" }),
    matchingFields: ["name", "park"],
    matchCount: 2,
    ...overrides,
  }) as DuplicateMatch;

describe("useUploadState - initial state", () => {
  it("starts with empty/falsy defaults", () => {
    const { result } = renderHook(() => useUploadState());

    expect(result.current.error).toBeNull();
    expect(result.current.success).toBeNull();
    expect(result.current.duplicates).toEqual([]);
    expect(result.current.pendingCoasters).toEqual([]);
    expect(result.current.pendingFilename).toBe("");
    expect(result.current.showDuplicateResolver).toBe(false);
    expect(result.current.showPreRankingQuestion).toBe(false);
  });
});

describe("useUploadState - individual setters", () => {
  it("setError updates error", () => {
    const { result } = renderHook(() => useUploadState());
    act(() => result.current.setError("Something went wrong"));
    expect(result.current.error).toBe("Something went wrong");
  });

  it("setSuccess updates success", () => {
    const { result } = renderHook(() => useUploadState());
    act(() => result.current.setSuccess("Upload complete"));
    expect(result.current.success).toBe("Upload complete");
  });

  it("setDuplicates updates duplicates", () => {
    const { result } = renderHook(() => useUploadState());
    const duplicates = [makeDuplicateMatch()];
    act(() => result.current.setDuplicates(duplicates));
    expect(result.current.duplicates).toEqual(duplicates);
  });

  it("setPendingCoasters accepts coaster-type rides", () => {
    const { result } = renderHook(() => useUploadState());
    const coasters = [makeCoaster({ id: "c1", type: "coaster" })];
    act(() => result.current.setPendingCoasters(coasters));
    expect(result.current.pendingCoasters).toEqual(coasters);
  });

  it("setPendingCoasters accepts dark-ride-type rides", () => {
    const { result } = renderHook(() => useUploadState());
    const darkRides = [
      makeCoaster({ id: "d1", name: "Haunted Mansion", type: "dark-ride" }),
    ];
    act(() => result.current.setPendingCoasters(darkRides));
    expect(result.current.pendingCoasters).toEqual(darkRides);
    expect(result.current.pendingCoasters[0].type).toBe("dark-ride");
  });

  it("setPendingFilename updates pendingFilename", () => {
    const { result } = renderHook(() => useUploadState());
    act(() => result.current.setPendingFilename("dark-rides.csv"));
    expect(result.current.pendingFilename).toBe("dark-rides.csv");
  });

  it("setShowDuplicateResolver updates showDuplicateResolver", () => {
    const { result } = renderHook(() => useUploadState());
    act(() => result.current.setShowDuplicateResolver(true));
    expect(result.current.showDuplicateResolver).toBe(true);
  });

  it("setShowPreRankingQuestion updates showPreRankingQuestion", () => {
    const { result } = renderHook(() => useUploadState());
    act(() => result.current.setShowPreRankingQuestion(true));
    expect(result.current.showPreRankingQuestion).toBe(true);
  });
});

describe("useUploadState - resetUploadState", () => {
  it("clears every piece of state back to its default", () => {
    const { result } = renderHook(() => useUploadState());

    act(() => {
      result.current.setError("err");
      result.current.setSuccess("ok");
      result.current.setDuplicates([makeDuplicateMatch()]);
      result.current.setPendingCoasters([makeCoaster()]);
      result.current.setPendingFilename("file.csv");
      result.current.setShowDuplicateResolver(true);
      result.current.setShowPreRankingQuestion(true);
    });

    act(() => result.current.resetUploadState());

    expect(result.current.error).toBeNull();
    expect(result.current.success).toBeNull();
    expect(result.current.duplicates).toEqual([]);
    expect(result.current.pendingCoasters).toEqual([]);
    expect(result.current.pendingFilename).toBe("");
    expect(result.current.showDuplicateResolver).toBe(false);
    expect(result.current.showPreRankingQuestion).toBe(false);
  });
});

describe("useUploadState - clearPendingData", () => {
  it("clears pending upload fields but leaves error/success untouched", () => {
    const { result } = renderHook(() => useUploadState());

    act(() => {
      result.current.setError("err");
      result.current.setSuccess("ok");
      result.current.setDuplicates([makeDuplicateMatch()]);
      result.current.setPendingCoasters([
        makeCoaster({ type: "dark-ride" }),
      ]);
      result.current.setPendingFilename("dark-rides.json");
      result.current.setShowDuplicateResolver(true);
      result.current.setShowPreRankingQuestion(true);
    });

    act(() => result.current.clearPendingData());

    expect(result.current.duplicates).toEqual([]);
    expect(result.current.pendingCoasters).toEqual([]);
    expect(result.current.pendingFilename).toBe("");
    expect(result.current.showDuplicateResolver).toBe(false);
    expect(result.current.showPreRankingQuestion).toBe(false);

    // error/success are deliberately left alone by clearPendingData
    expect(result.current.error).toBe("err");
    expect(result.current.success).toBe("ok");
  });
});
