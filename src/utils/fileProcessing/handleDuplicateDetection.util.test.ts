import { describe, expect, it } from "vitest";
import { Coaster, UploadedData } from "../../types/data";
import type { DuplicateResolution } from "../../components/DuplicateResolver";
import { DuplicateMatch } from "./duplicateDetection.util";
import {
  handleDuplicateDetection,
  processDuplicateResolution,
} from "./handleDuplicateDetection.util";

const makeCoaster = (overrides: Partial<Coaster> = {}): Coaster =>
  ({
    id: overrides.id ?? overrides.name ?? "id",
    name: "Coaster",
    park: "Park",
    country: "Country",
    manufacturer: "Manufacturer",
    ...overrides,
  }) as Coaster;

const makeUploadedData = (
  overrides: Partial<UploadedData> = {},
): UploadedData => ({
  coasters: [],
  uploadedAt: new Date("2024-01-01"),
  filename: "existing.csv",
  ...overrides,
});

describe("handleDuplicateDetection", () => {
  it("combines directly when there is no existing data", () => {
    const result = handleDuplicateDetection({
      newCoasters: [makeCoaster({ id: "a", name: "Nemesis" })],
      existingData: null,
      filename: "upload.csv",
    });

    expect(result.hasDuplicates).toBe(false);
    expect(result.combinedData?.coasters).toHaveLength(1);
  });

  it("auto-merges a matching coaster and returns the merged data", () => {
    const existingData = makeUploadedData({
      coasters: [
        makeCoaster({
          id: "existing",
          name: "Nemesis",
          park: "Alton Towers",
          manufacturer: "",
        }),
      ],
    });

    const result = handleDuplicateDetection({
      newCoasters: [
        makeCoaster({
          id: "incoming",
          name: "Nemesis",
          park: "Alton Towers",
          manufacturer: "B&M",
        }),
      ],
      existingData,
      filename: "upload.csv",
    });

    expect(result.hasDuplicates).toBe(false);
    expect(result.autoMerged?.count).toBe(1);
    expect(result.autoMerged?.mergedCoasters).toContain("Nemesis");
    const merged = result.combinedData?.coasters.find(
      (c) => c.id === "existing",
    );
    expect(merged?.manufacturer).toBe("B&M");
  });

  it("flags a manual duplicate without combining the data yet", () => {
    const existingData = makeUploadedData({
      coasters: [
        makeCoaster({
          id: "existing",
          name: "Nemesis",
          park: "Alton Towers",
          manufacturer: "B&M",
          model: "Inverted",
        }),
      ],
    });

    const result = handleDuplicateDetection({
      newCoasters: [
        makeCoaster({
          id: "incoming",
          name: "Nemesis",
          park: "Thorpe Park",
          manufacturer: "B&M",
          model: "Inverted",
        }),
      ],
      existingData,
      filename: "upload.csv",
    });

    expect(result.hasDuplicates).toBe(true);
    expect(result.duplicates).toHaveLength(1);
    expect(result.combinedData).toBeUndefined();
  });

  it("surfaces an auto-merge that happens alongside an unresolved manual duplicate in the same upload, so callers can persist it", () => {
    // Regression: when one new coaster auto-merges and another is a manual
    // duplicate in the same call, the function used to report `autoMerged`
    // but take the early "needs resolution" return path without ever
    // returning the merged data — so callers had nothing to persist and the
    // computed merge was silently lost. `updatedExistingData` now carries
    // the merge through so callers can save it immediately.
    const existingData = makeUploadedData({
      coasters: [
        makeCoaster({
          id: "auto-merge-existing",
          name: "Nemesis",
          park: "Alton Towers",
          manufacturer: "",
        }),
        makeCoaster({
          id: "manual-dup-existing",
          name: "Fury 325",
          park: "Carowinds",
          manufacturer: "B&M",
          model: "Giga",
        }),
      ],
    });

    const result = handleDuplicateDetection({
      newCoasters: [
        makeCoaster({
          id: "auto-merge-incoming",
          name: "Nemesis",
          park: "Alton Towers",
          manufacturer: "B&M",
        }),
        makeCoaster({
          id: "manual-dup-incoming",
          name: "Fury 325",
          park: "Six Flags Magic Mountain",
          manufacturer: "B&M",
          model: "Giga",
        }),
      ],
      existingData,
      filename: "upload.csv",
    });

    expect(result.hasDuplicates).toBe(true);
    expect(result.autoMerged?.count).toBe(1);
    expect(result.combinedData).toBeUndefined();

    // The merge is still not in `combinedData` (that only appears once every
    // duplicate is resolved), but it must now be recoverable from
    // `updatedExistingData` so a caller can persist it right away.
    const mergedExisting = result.updatedExistingData?.coasters.find(
      (c) => c.id === "auto-merge-existing",
    );
    expect(mergedExisting?.manufacturer).toBe("B&M");
    // The other existing coaster (uninvolved in the auto-merge) is untouched.
    expect(
      result.updatedExistingData?.coasters.find(
        (c) => c.id === "manual-dup-existing",
      ),
    ).toEqual(existingData.coasters[1]);
  });
});

describe("processDuplicateResolution", () => {
  const buildDuplicate = (
    existingCoaster: Coaster,
    newCoaster: Coaster,
  ): DuplicateMatch => ({
    existingCoaster,
    newCoaster,
    matchingFields: ["name", "manufacturer", "model"],
    matchCount: 3,
  });

  it("adds the pending coaster only once when it matches two existing coasters and both are resolved as keep-new/keep-both", () => {
    // Regression test for the UploadManual double-insertion bug: a single
    // pending coaster matching multiple existing coasters must only ever be
    // added to the result once, regardless of how many duplicate entries
    // reference it.
    const pendingCoaster = makeCoaster({ id: "pending", name: "Nemesis" });
    const existingA = makeCoaster({ id: "existingA", name: "Nemesis" });
    const existingB = makeCoaster({ id: "existingB", name: "Nemesis" });

    const duplicates = [
      buildDuplicate(existingA, pendingCoaster),
      buildDuplicate(existingB, pendingCoaster),
    ];
    const resolutions: DuplicateResolution[] = [
      { action: "keep-new", duplicateIndex: 0 },
      { action: "keep-both", duplicateIndex: 1 },
    ];

    const result = processDuplicateResolution({
      resolutions,
      duplicates,
      pendingCoasters: [pendingCoaster],
      existingData: makeUploadedData({ coasters: [existingA, existingB] }),
      filename: "manual-entry",
      isPreRanked: false,
    });

    const matches = result.combinedData.coasters.filter(
      (c) => c.id === "pending",
    );
    expect(matches).toHaveLength(1);
  });

  it("still adds the pending coaster only once regardless of resolution order", () => {
    const pendingCoaster = makeCoaster({ id: "pending", name: "Nemesis" });
    const existingA = makeCoaster({ id: "existingA", name: "Nemesis" });
    const existingB = makeCoaster({ id: "existingB", name: "Nemesis" });

    const duplicates = [
      buildDuplicate(existingA, pendingCoaster),
      buildDuplicate(existingB, pendingCoaster),
    ];
    const resolutions: DuplicateResolution[] = [
      { action: "keep-both", duplicateIndex: 0 },
      { action: "keep-new", duplicateIndex: 1 },
    ];

    const result = processDuplicateResolution({
      resolutions,
      duplicates,
      pendingCoasters: [pendingCoaster],
      existingData: makeUploadedData({ coasters: [existingA, existingB] }),
      filename: "manual-entry",
      isPreRanked: false,
    });

    const matches = result.combinedData.coasters.filter(
      (c) => c.id === "pending",
    );
    expect(matches).toHaveLength(1);
  });

  it("drops the pending coaster and keeps the existing one for 'keep-existing'", () => {
    const pendingCoaster = makeCoaster({ id: "pending", name: "Nemesis" });
    const existing = makeCoaster({ id: "existing", name: "Nemesis" });

    const result = processDuplicateResolution({
      resolutions: [{ action: "keep-existing", duplicateIndex: 0 }],
      duplicates: [buildDuplicate(existing, pendingCoaster)],
      pendingCoasters: [pendingCoaster],
      existingData: makeUploadedData({ coasters: [existing] }),
      filename: "manual-entry",
      isPreRanked: false,
    });

    expect(result.combinedData.coasters).toHaveLength(1);
    expect(result.combinedData.coasters[0].id).toBe("existing");
  });

  it("removes the existing coaster and adds the new one for 'keep-new'", () => {
    const pendingCoaster = makeCoaster({ id: "pending", name: "Nemesis" });
    const existing = makeCoaster({ id: "existing", name: "Nemesis" });

    const result = processDuplicateResolution({
      resolutions: [{ action: "keep-new", duplicateIndex: 0 }],
      duplicates: [buildDuplicate(existing, pendingCoaster)],
      pendingCoasters: [pendingCoaster],
      existingData: makeUploadedData({ coasters: [existing] }),
      filename: "manual-entry",
      isPreRanked: false,
    });

    expect(result.combinedData.coasters).toHaveLength(1);
    expect(result.combinedData.coasters[0].id).toBe("pending");
  });

  it("keeps both coasters for 'keep-both'", () => {
    const pendingCoaster = makeCoaster({ id: "pending", name: "Nemesis" });
    const existing = makeCoaster({ id: "existing", name: "Nemesis" });

    const result = processDuplicateResolution({
      resolutions: [{ action: "keep-both", duplicateIndex: 0 }],
      duplicates: [buildDuplicate(existing, pendingCoaster)],
      pendingCoasters: [pendingCoaster],
      existingData: makeUploadedData({ coasters: [existing] }),
      filename: "manual-entry",
      isPreRanked: false,
    });

    expect(result.combinedData.coasters.map((c) => c.id)).toEqual(
      expect.arrayContaining(["existing", "pending"]),
    );
  });

  it("resolves correctly for a dark-ride collection", () => {
    const pendingCoaster = makeCoaster({
      id: "pending",
      name: "Haunted Mansion",
      type: "dark-ride",
    });
    const existing = makeCoaster({
      id: "existing",
      name: "Haunted Mansion",
      type: "dark-ride",
    });

    const result = processDuplicateResolution({
      resolutions: [{ action: "keep-both", duplicateIndex: 0 }],
      duplicates: [buildDuplicate(existing, pendingCoaster)],
      pendingCoasters: [pendingCoaster],
      existingData: makeUploadedData({
        coasters: [existing],
        filename: "dark-rides.csv",
      }),
      filename: "manual-entry",
      isPreRanked: false,
    });

    expect(result.combinedData.coasters).toHaveLength(2);
    expect(
      result.combinedData.coasters.every((c) => c.type === "dark-ride"),
    ).toBe(true);
  });
});
