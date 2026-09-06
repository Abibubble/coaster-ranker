import { beforeEach, describe, expect, it, vi } from "vitest";
import { Coaster, UploadedData } from "../../types/data";
import { UploadStateActions } from "./useUploadState.util";

vi.mock("../fileProcessing", async () => {
  const actual = await vi.importActual<typeof import("../fileProcessing")>(
    "../fileProcessing",
  );
  return {
    ...actual,
    handlePreRankingDecision: vi.fn(),
  };
});

import { handlePreRankingDecision } from "../fileProcessing";
import {
  handlePreRankingAnswer,
  handlePreRankingCancel,
} from "./handlePreRanking.util";

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

describe("handlePreRankingAnswer - no pending coasters", () => {
  it("hides the question and bails out without calling the util", () => {
    const actions = makeUploadStateActions();

    const result = handlePreRankingAnswer({
      isPreRanked: true,
      pendingCoasters: [],
      pendingFilename: "",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(actions.setShowPreRankingQuestion).toHaveBeenCalledWith(false);
    expect(handlePreRankingDecision).not.toHaveBeenCalled();
    expect(result).toEqual({ success: false, needsDuplicateResolution: false });
  });
});

describe("handlePreRankingAnswer - needs duplicate resolution", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it("shows the duplicate resolver and records the pre-ranked answer for later", () => {
    const actions = makeUploadStateActions();

    (handlePreRankingDecision as ReturnType<typeof vi.fn>).mockReturnValue({
      needsDuplicateResolution: true,
      duplicates: [],
    });

    const result = handlePreRankingAnswer({
      isPreRanked: true,
      pendingCoasters: [makeCoaster()],
      pendingFilename: "batch.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(actions.setDuplicates).toHaveBeenCalledWith([]);
    expect(actions.setShowDuplicateResolver).toHaveBeenCalledWith(true);
    expect(sessionStorage.getItem("pendingPreRanked")).toBe("true");
    expect(result).toEqual({ success: true, needsDuplicateResolution: true });
  });

  it("records 'false' when the user said the data isn't pre-ranked", () => {
    const actions = makeUploadStateActions();

    (handlePreRankingDecision as ReturnType<typeof vi.fn>).mockReturnValue({
      needsDuplicateResolution: true,
      duplicates: [],
    });

    handlePreRankingAnswer({
      isPreRanked: false,
      pendingCoasters: [makeCoaster({ type: "dark-ride" })],
      pendingFilename: "dark-rides.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(sessionStorage.getItem("pendingPreRanked")).toBe("false");
  });

  it("regression: persists updatedExistingData immediately so an auto-merge alongside an unresolved duplicate isn't lost", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();
    const mergedExistingData = makeUploadedData({
      coasters: [makeCoaster({ id: "existing-1", manufacturer: "B&M" })],
    });

    (handlePreRankingDecision as ReturnType<typeof vi.fn>).mockReturnValue({
      needsDuplicateResolution: true,
      duplicates: [],
      autoMerged: { count: 1, mergedCoasters: ["Alpha"] },
      updatedExistingData: mergedExistingData,
    });

    handlePreRankingAnswer({
      isPreRanked: true,
      pendingCoasters: [makeCoaster()],
      pendingFilename: "batch.csv",
      uploadedData: makeUploadedData(),
      uploadStateActions: actions,
      setUploadedData,
    });

    expect(setUploadedData).toHaveBeenCalledWith(mergedExistingData);
    expect(actions.setSuccess).toHaveBeenCalledWith(
      expect.stringContaining("Auto-merged data for 1 existing coaster: Alpha"),
    );
  });

  it("does not call setUploadedData when there is no auto-merge to persist", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();

    (handlePreRankingDecision as ReturnType<typeof vi.fn>).mockReturnValue({
      needsDuplicateResolution: true,
      duplicates: [],
    });

    handlePreRankingAnswer({
      isPreRanked: true,
      pendingCoasters: [makeCoaster()],
      pendingFilename: "batch.csv",
      uploadedData: makeUploadedData(),
      uploadStateActions: actions,
      setUploadedData,
    });

    expect(setUploadedData).not.toHaveBeenCalled();
  });
});

describe("handlePreRankingAnswer - direct completion", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("saves the combined data and reports pre-ranked status in the message", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();
    const combinedData = makeUploadedData();

    (handlePreRankingDecision as ReturnType<typeof vi.fn>).mockReturnValue({
      needsDuplicateResolution: false,
      combinedData,
      newCoasterCount: 2,
      totalCount: 2,
    });

    const result = handlePreRankingAnswer({
      isPreRanked: true,
      pendingCoasters: [makeCoaster(), makeCoaster({ id: "2" })],
      pendingFilename: "batch.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData,
    });

    expect(setUploadedData).toHaveBeenCalledWith(combinedData);
    expect(actions.setSuccess).toHaveBeenCalledWith(
      "Successfully processed file! Added 2 new coasters (marked as pre-ranked). You now have 2 coasters total.",
    );
    expect(actions.setPendingCoasters).toHaveBeenCalledWith([]);
    expect(actions.setPendingFilename).toHaveBeenCalledWith("");
    expect(result).toEqual({ success: true, needsDuplicateResolution: false });
  });

  it("omits the pre-ranked note when isPreRanked is false", () => {
    const actions = makeUploadStateActions();

    (handlePreRankingDecision as ReturnType<typeof vi.fn>).mockReturnValue({
      needsDuplicateResolution: false,
      combinedData: makeUploadedData(),
      newCoasterCount: 1,
      totalCount: 1,
    });

    handlePreRankingAnswer({
      isPreRanked: false,
      pendingCoasters: [makeCoaster()],
      pendingFilename: "batch.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(actions.setSuccess).toHaveBeenCalledWith(
      "Successfully processed file! Added 1 new coasters. You now have 1 coasters total.",
    );
  });

  it("calls onAdditionalCleanup when provided", () => {
    const actions = makeUploadStateActions();
    const onAdditionalCleanup = vi.fn();

    (handlePreRankingDecision as ReturnType<typeof vi.fn>).mockReturnValue({
      needsDuplicateResolution: false,
      combinedData: makeUploadedData(),
      newCoasterCount: 1,
      totalCount: 1,
    });

    handlePreRankingAnswer({
      isPreRanked: false,
      pendingCoasters: [makeCoaster()],
      pendingFilename: "batch.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
      onAdditionalCleanup,
    });

    expect(onAdditionalCleanup).toHaveBeenCalledTimes(1);
  });

  it("works the same for a batch of dark rides", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();
    const combinedDarkRideData = makeUploadedData({
      filename: "dark-rides.json",
      coasters: [makeCoaster({ id: "d1", type: "dark-ride" })],
    });

    (handlePreRankingDecision as ReturnType<typeof vi.fn>).mockReturnValue({
      needsDuplicateResolution: false,
      combinedData: combinedDarkRideData,
      newCoasterCount: 1,
      totalCount: 1,
    });

    handlePreRankingAnswer({
      isPreRanked: true,
      pendingCoasters: [makeCoaster({ id: "d1", type: "dark-ride" })],
      pendingFilename: "dark-rides.json",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData,
      successMessagePrefix: "Successfully processed dark rides!",
    });

    expect(setUploadedData).toHaveBeenCalledWith(combinedDarkRideData);
    expect(actions.setSuccess).toHaveBeenCalledWith(
      expect.stringContaining("Successfully processed dark rides!"),
    );
  });
});

describe("handlePreRankingCancel", () => {
  it("resets pending state and sets the cancellation error", () => {
    const actions = makeUploadStateActions();

    handlePreRankingCancel({ uploadStateActions: actions });

    expect(actions.setShowPreRankingQuestion).toHaveBeenCalledWith(false);
    expect(actions.setPendingCoasters).toHaveBeenCalledWith([]);
    expect(actions.setPendingFilename).toHaveBeenCalledWith("");
    expect(actions.setError).toHaveBeenCalledWith("Upload cancelled by user.");
  });

  it("calls onAdditionalCleanup when provided", () => {
    const actions = makeUploadStateActions();
    const onAdditionalCleanup = vi.fn();

    handlePreRankingCancel({ uploadStateActions: actions, onAdditionalCleanup });

    expect(onAdditionalCleanup).toHaveBeenCalledTimes(1);
  });
});
