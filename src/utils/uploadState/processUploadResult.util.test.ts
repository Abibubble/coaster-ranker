import { beforeEach, describe, expect, it, vi } from "vitest";
import { Coaster, UploadedData } from "../../types/data";
import { UploadStateActions } from "./useUploadState.util";
import { ProcessFileUploadResult } from "../fileProcessing";

vi.mock("../fileProcessing", async () => {
  const actual = await vi.importActual<typeof import("../fileProcessing")>(
    "../fileProcessing",
  );
  return {
    ...actual,
    processFileUpload: vi.fn(),
  };
});

import { processFileUpload } from "../fileProcessing";
import {
  processUploadResult,
  processUploadWorkflow,
} from "./processUploadResult.util";

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster =>
  ({
    id: overrides.id ?? "1",
    name: "Test Ride",
    park: "Test Park",
    country: "Test Country",
    manufacturer: "Test Manufacturer",
    ...overrides,
  }) as Coaster;

const makeUploadedData = (overrides: Partial<UploadedData> = {}): UploadedData => ({
  coasters: [makeCoaster()],
  uploadedAt: new Date("2026-01-01"),
  filename: "test.csv",
  ...overrides,
});

const makeUploadStateActions = (): UploadStateActions => ({
  setError: vi.fn(),
  setSuccess: vi.fn(),
  setDuplicates: vi.fn(),
  setPendingCoasters: vi.fn(),
  setPendingFilename: vi.fn(),
  setShowDuplicateResolver: vi.fn(),
  setShowPreRankingQuestion: vi.fn(),
  resetUploadState: vi.fn(),
  clearPendingData: vi.fn(),
});

describe("processUploadResult - failure", () => {
  it("sets the error and returns success: false without touching pending state", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();

    const result = processUploadResult({
      result: {
        success: false,
        needsPreRankingDecision: false,
        needsDuplicateResolution: false,
        error: "Bad file",
      },
      filename: "broken.csv",
      uploadStateActions: actions,
      setUploadedData,
    });

    expect(result).toEqual({
      success: false,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
    });
    expect(actions.setError).toHaveBeenCalledWith("Bad file");
    expect(actions.setPendingCoasters).not.toHaveBeenCalled();
    expect(setUploadedData).not.toHaveBeenCalled();
  });

  it("falls back to a generic error message when none is provided", () => {
    const actions = makeUploadStateActions();

    processUploadResult({
      result: {
        success: false,
        needsPreRankingDecision: false,
        needsDuplicateResolution: false,
      },
      filename: "broken.csv",
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(actions.setError).toHaveBeenCalledWith("Failed to process file");
  });
});

describe("processUploadResult - needs pre-ranking decision", () => {
  it("stores pending coasters/filename and shows the pre-ranking question", () => {
    const actions = makeUploadStateActions();
    const parsedCoasters = [makeCoaster({ id: "a" }), makeCoaster({ id: "b" })];

    const result = processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: true,
        needsDuplicateResolution: false,
        parsedCoasters,
      },
      filename: "batch.csv",
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(actions.setPendingCoasters).toHaveBeenCalledWith(parsedCoasters);
    expect(actions.setPendingFilename).toHaveBeenCalledWith("batch.csv");
    expect(actions.setShowPreRankingQuestion).toHaveBeenCalledWith(true);
    expect(result).toEqual({
      success: true,
      needsPreRankingDecision: true,
      needsDuplicateResolution: false,
    });
  });

  it("works the same for a parsed batch of dark rides", () => {
    const actions = makeUploadStateActions();
    const parsedDarkRides = [
      makeCoaster({ id: "d1", name: "Haunted Mansion", type: "dark-ride" }),
    ];

    processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: true,
        needsDuplicateResolution: false,
        parsedCoasters: parsedDarkRides,
      },
      filename: "dark-rides.json",
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(actions.setPendingCoasters).toHaveBeenCalledWith(parsedDarkRides);
    expect(actions.setPendingFilename).toHaveBeenCalledWith("dark-rides.json");
  });
});

describe("processUploadResult - needs duplicate resolution", () => {
  it("shows the duplicate resolver and records pendingPreRanked=false in sessionStorage", () => {
    const actions = makeUploadStateActions();
    sessionStorage.clear();

    const result = processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: false,
        needsDuplicateResolution: true,
        parsedCoasters: [makeCoaster()],
        duplicates: [],
      },
      filename: "dupes.csv",
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(actions.setDuplicates).toHaveBeenCalledWith([]);
    expect(actions.setShowDuplicateResolver).toHaveBeenCalledWith(true);
    expect(sessionStorage.getItem("pendingPreRanked")).toBe("false");
    expect(actions.setSuccess).not.toHaveBeenCalled();
    expect(result.needsDuplicateResolution).toBe(true);
  });

  it("also reports auto-merged coasters via a success message", () => {
    const actions = makeUploadStateActions();

    processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: false,
        needsDuplicateResolution: true,
        parsedCoasters: [makeCoaster()],
        duplicates: [],
        autoMerged: { count: 2, mergedCoasters: ["Alpha", "Beta"] },
      },
      filename: "dupes.csv",
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(actions.setSuccess).toHaveBeenCalledWith(
      expect.stringContaining("Auto-merged data for 2 existing coasters: Alpha, Beta"),
    );
  });

  it("uses singular phrasing for a single auto-merge", () => {
    const actions = makeUploadStateActions();

    processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: false,
        needsDuplicateResolution: true,
        parsedCoasters: [makeCoaster()],
        duplicates: [],
        autoMerged: { count: 1, mergedCoasters: ["Alpha"] },
      },
      filename: "dupes.csv",
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(actions.setSuccess).toHaveBeenCalledWith(
      expect.stringContaining("Auto-merged data for 1 existing coaster: Alpha"),
    );
  });

  it("regression: persists updatedExistingData immediately so an auto-merge alongside an unresolved duplicate isn't lost", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();
    const mergedExistingData = makeUploadedData({
      coasters: [makeCoaster({ id: "existing-1", manufacturer: "B&M" })],
    });

    processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: false,
        needsDuplicateResolution: true,
        parsedCoasters: [makeCoaster()],
        duplicates: [],
        autoMerged: { count: 1, mergedCoasters: ["Alpha"] },
        updatedExistingData: mergedExistingData,
      },
      filename: "dupes.csv",
      uploadStateActions: actions,
      setUploadedData,
    });

    expect(setUploadedData).toHaveBeenCalledWith(mergedExistingData);
  });

  it("does not call setUploadedData when there is no auto-merge to persist", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();

    processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: false,
        needsDuplicateResolution: true,
        parsedCoasters: [makeCoaster()],
        duplicates: [],
      },
      filename: "dupes.csv",
      uploadStateActions: actions,
      setUploadedData,
    });

    expect(setUploadedData).not.toHaveBeenCalled();
  });
});

describe("processUploadResult - direct completion", () => {
  it("saves the combined data and reports the new/total counts", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();
    const combinedData = makeUploadedData();

    const result = processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: false,
        needsDuplicateResolution: false,
        combinedData,
        newCoasterCount: 3,
        totalCount: 5,
      },
      filename: "batch.csv",
      uploadStateActions: actions,
      setUploadedData,
    });

    expect(setUploadedData).toHaveBeenCalledWith(combinedData);
    expect(actions.setSuccess).toHaveBeenCalledWith(
      "Successfully processed file! Added 3 new coasters. You now have 5 coasters total.",
    );
    expect(actions.setPendingCoasters).toHaveBeenCalledWith([]);
    expect(actions.setPendingFilename).toHaveBeenCalledWith("");
    expect(result).toEqual({
      success: true,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
    });
  });

  it("uses a custom successMessagePrefix and appends auto-merge info", () => {
    const actions = makeUploadStateActions();

    processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: false,
        needsDuplicateResolution: false,
        combinedData: makeUploadedData(),
        newCoasterCount: 1,
        totalCount: 4,
        autoMerged: { count: 1, mergedCoasters: ["Existing Ride"] },
      },
      filename: "batch.csv",
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
      successMessagePrefix: "Successfully processed dark rides!",
    });

    expect(actions.setSuccess).toHaveBeenCalledWith(
      "Successfully processed dark rides! Added 1 new coasters. You now have 4 coasters total. Auto-merged data for 1 existing coaster: Existing Ride.",
    );
  });

  it("calls onAdditionalCleanup when provided", () => {
    const actions = makeUploadStateActions();
    const onAdditionalCleanup = vi.fn();

    processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: false,
        needsDuplicateResolution: false,
        combinedData: makeUploadedData(),
        newCoasterCount: 1,
        totalCount: 1,
      },
      filename: "batch.csv",
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
      onAdditionalCleanup,
    });

    expect(onAdditionalCleanup).toHaveBeenCalledTimes(1);
  });

  it("works identically for a combined dark-ride collection", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();
    const combinedDarkRideData = makeUploadedData({
      filename: "dark-rides.json",
      coasters: [makeCoaster({ id: "d1", type: "dark-ride" })],
    });

    processUploadResult({
      result: {
        success: true,
        needsPreRankingDecision: false,
        needsDuplicateResolution: false,
        combinedData: combinedDarkRideData,
        newCoasterCount: 1,
        totalCount: 1,
      },
      filename: "dark-rides.json",
      uploadStateActions: actions,
      setUploadedData,
    });

    expect(setUploadedData).toHaveBeenCalledWith(combinedDarkRideData);
    expect(actions.setSuccess).toHaveBeenCalledWith(
      expect.stringContaining("Added 1 new coasters"),
    );
  });
});

describe("processUploadWorkflow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("wraps the workflow in isLoading true/false and defaults rideType to coaster", async () => {
    const actions = makeUploadStateActions();
    const setIsLoading = vi.fn();
    const setUploadedData = vi.fn();

    (processFileUpload as ReturnType<typeof vi.fn>).mockResolvedValue({
      success: true,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
      combinedData: makeUploadedData(),
      newCoasterCount: 1,
      totalCount: 1,
    } satisfies ProcessFileUploadResult);

    await processUploadWorkflow({
      fileContent: "name,park,manufacturer,country\nA,B,C,D",
      filename: "test.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData,
      setIsLoading,
    });

    expect(setIsLoading).toHaveBeenNthCalledWith(1, true);
    expect(setIsLoading).toHaveBeenLastCalledWith(false);
    expect(processFileUpload).toHaveBeenCalledWith(
      expect.objectContaining({ rideType: "coaster" }),
    );
    expect(setUploadedData).toHaveBeenCalled();
  });

  it("passes rideType 'dark-ride' straight through to processFileUpload", async () => {
    const actions = makeUploadStateActions();

    (processFileUpload as ReturnType<typeof vi.fn>).mockResolvedValue({
      success: true,
      needsPreRankingDecision: true,
      needsDuplicateResolution: false,
      parsedCoasters: [makeCoaster({ type: "dark-ride" })],
    } satisfies ProcessFileUploadResult);

    await processUploadWorkflow({
      fileContent: "name,park,manufacturer,country\nHaunted,Mansion,Disney,US",
      filename: "dark-rides.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
      setIsLoading: vi.fn(),
      rideType: "dark-ride",
    });

    expect(processFileUpload).toHaveBeenCalledWith(
      expect.objectContaining({ rideType: "dark-ride" }),
    );
  });

  it("clears error/success before running and sets an error message if processFileUpload throws", async () => {
    const actions = makeUploadStateActions();

    (processFileUpload as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("network down"),
    );

    const result = await processUploadWorkflow({
      fileContent: "bad content",
      filename: "test.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
      setIsLoading: vi.fn(),
    });

    expect(actions.setError).toHaveBeenNthCalledWith(1, null);
    expect(actions.setSuccess).toHaveBeenCalledWith(null);
    expect(actions.setError).toHaveBeenLastCalledWith(
      "Error processing file: network down",
    );
    expect(result).toEqual({
      success: false,
      needsPreRankingDecision: false,
      needsDuplicateResolution: false,
    });
  });

  it("still turns isLoading back off when processFileUpload throws", async () => {
    const actions = makeUploadStateActions();
    const setIsLoading = vi.fn();

    (processFileUpload as ReturnType<typeof vi.fn>).mockRejectedValue(
      "not even an Error instance",
    );

    await processUploadWorkflow({
      fileContent: "bad content",
      filename: "test.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
      setIsLoading,
    });

    expect(setIsLoading).toHaveBeenLastCalledWith(false);
    expect(actions.setError).toHaveBeenLastCalledWith(
      "Error processing file: Unknown error",
    );
  });
});
