import { beforeEach, describe, expect, it, vi } from "vitest";
import { Coaster, UploadedData } from "../../types/data";
import { UploadStateActions } from "./useUploadState.util";
import type { DuplicateResolution } from "../../components/DuplicateResolver";

vi.mock("../fileProcessing", async () => {
  const actual = await vi.importActual<typeof import("../fileProcessing")>(
    "../fileProcessing",
  );
  return {
    ...actual,
    handleDuplicateResolution: vi.fn(),
  };
});

import { handleDuplicateResolution } from "../fileProcessing";
import {
  handleUploadDuplicateResolution,
  handleDuplicateCancel,
} from "./handleDuplicates.util";

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

const resolutions: DuplicateResolution[] = [
  { action: "keep-both", duplicateIndex: 0 },
];

describe("handleUploadDuplicateResolution - no pending coasters", () => {
  it("bails out without calling the underlying util or any setters", () => {
    const actions = makeUploadStateActions();

    const result = handleUploadDuplicateResolution({
      resolutions,
      duplicates: [],
      pendingCoasters: [],
      pendingFilename: "",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(handleDuplicateResolution).not.toHaveBeenCalled();
    expect(actions.setSuccess).not.toHaveBeenCalled();
    expect(result).toEqual({ success: false, addedCount: 0, totalCount: 0 });
  });
});

describe("handleUploadDuplicateResolution - reads and clears sessionStorage flag", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    (handleDuplicateResolution as ReturnType<typeof vi.fn>).mockReturnValue({
      combinedData: makeUploadedData(),
      addedCount: 1,
      totalCount: 1,
    });
  });

  it("passes isPreRanked: true through when sessionStorage says 'true', then clears it", () => {
    sessionStorage.setItem("pendingPreRanked", "true");
    const actions = makeUploadStateActions();

    handleUploadDuplicateResolution({
      resolutions,
      duplicates: [],
      pendingCoasters: [makeCoaster()],
      pendingFilename: "batch.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(handleDuplicateResolution).toHaveBeenCalledWith(
      expect.objectContaining({ isPreRanked: true }),
    );
    expect(sessionStorage.getItem("pendingPreRanked")).toBeNull();
  });

  it("defaults isPreRanked to false when the flag was never set", () => {
    const actions = makeUploadStateActions();

    handleUploadDuplicateResolution({
      resolutions,
      duplicates: [],
      pendingCoasters: [makeCoaster()],
      pendingFilename: "batch.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(handleDuplicateResolution).toHaveBeenCalledWith(
      expect.objectContaining({ isPreRanked: false }),
    );
  });
});

describe("handleUploadDuplicateResolution - success path", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it("saves the combined data, reports counts, and resets duplicate-resolution state", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();
    const combinedData = makeUploadedData();

    (handleDuplicateResolution as ReturnType<typeof vi.fn>).mockReturnValue({
      combinedData,
      addedCount: 2,
      totalCount: 6,
    });

    const result = handleUploadDuplicateResolution({
      resolutions,
      duplicates: [],
      pendingCoasters: [makeCoaster(), makeCoaster({ id: "2" })],
      pendingFilename: "batch.csv",
      uploadedData: makeUploadedData(),
      uploadStateActions: actions,
      setUploadedData,
    });

    expect(setUploadedData).toHaveBeenCalledWith(combinedData);
    expect(actions.setSuccess).toHaveBeenCalledWith(
      "Successfully processed file! Added 2 new coasters. You now have 6 coasters total.",
    );
    expect(actions.setShowDuplicateResolver).toHaveBeenCalledWith(false);
    expect(actions.setDuplicates).toHaveBeenCalledWith([]);
    expect(actions.setPendingCoasters).toHaveBeenCalledWith([]);
    expect(actions.setPendingFilename).toHaveBeenCalledWith("");
    expect(result).toEqual({ success: true, addedCount: 2, totalCount: 6 });
  });

  it("notes pre-ranked status in the message when the flag was set", () => {
    sessionStorage.setItem("pendingPreRanked", "true");
    const actions = makeUploadStateActions();

    (handleDuplicateResolution as ReturnType<typeof vi.fn>).mockReturnValue({
      combinedData: makeUploadedData(),
      addedCount: 1,
      totalCount: 1,
    });

    handleUploadDuplicateResolution({
      resolutions,
      duplicates: [],
      pendingCoasters: [makeCoaster()],
      pendingFilename: "batch.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
    });

    expect(actions.setSuccess).toHaveBeenCalledWith(
      expect.stringContaining("(marked as pre-ranked)"),
    );
  });

  it("calls onAdditionalCleanup when provided", () => {
    const actions = makeUploadStateActions();
    const onAdditionalCleanup = vi.fn();

    (handleDuplicateResolution as ReturnType<typeof vi.fn>).mockReturnValue({
      combinedData: makeUploadedData(),
      addedCount: 1,
      totalCount: 1,
    });

    handleUploadDuplicateResolution({
      resolutions,
      duplicates: [],
      pendingCoasters: [makeCoaster()],
      pendingFilename: "batch.csv",
      uploadedData: null,
      uploadStateActions: actions,
      setUploadedData: vi.fn(),
      onAdditionalCleanup,
    });

    expect(onAdditionalCleanup).toHaveBeenCalledTimes(1);
  });

  it("works identically for a dark-ride collection", () => {
    const actions = makeUploadStateActions();
    const setUploadedData = vi.fn();
    const combinedDarkRideData = makeUploadedData({
      filename: "dark-rides.json",
      coasters: [makeCoaster({ id: "d1", type: "dark-ride" })],
    });

    (handleDuplicateResolution as ReturnType<typeof vi.fn>).mockReturnValue({
      combinedData: combinedDarkRideData,
      addedCount: 1,
      totalCount: 1,
    });

    handleUploadDuplicateResolution({
      resolutions,
      duplicates: [],
      pendingCoasters: [makeCoaster({ id: "d1", type: "dark-ride" })],
      pendingFilename: "dark-rides.json",
      uploadedData: makeUploadedData({
        filename: "dark-rides.json",
        coasters: [],
      }),
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

describe("handleDuplicateCancel", () => {
  it("resets duplicate-resolution state and sets the cancellation error", () => {
    const actions = makeUploadStateActions();

    handleDuplicateCancel({ uploadStateActions: actions });

    expect(actions.setShowDuplicateResolver).toHaveBeenCalledWith(false);
    expect(actions.setDuplicates).toHaveBeenCalledWith([]);
    expect(actions.setPendingCoasters).toHaveBeenCalledWith([]);
    expect(actions.setPendingFilename).toHaveBeenCalledWith("");
    expect(actions.setError).toHaveBeenCalledWith(
      "Upload cancelled due to potential duplicates.",
    );
  });

  it("calls onAdditionalCleanup when provided", () => {
    const actions = makeUploadStateActions();
    const onAdditionalCleanup = vi.fn();

    handleDuplicateCancel({ uploadStateActions: actions, onAdditionalCleanup });

    expect(onAdditionalCleanup).toHaveBeenCalledTimes(1);
  });
});
