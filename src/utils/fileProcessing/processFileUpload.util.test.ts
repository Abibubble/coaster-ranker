import { describe, expect, it } from "vitest";
import { Coaster, UploadedData } from "../../types/data";
import type { DuplicateResolution } from "../../components/DuplicateResolver";
import { DuplicateMatch } from "./duplicateDetection.util";
import {
  handleDuplicateResolution,
  handlePreRankingDecision,
  processFileUpload,
} from "./processFileUpload.util";

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

describe("processFileUpload", () => {
  it("processes a single-row CSV with no existing data straight through", async () => {
    const csv = "name,park,manufacturer,country\nNemesis,Alton Towers,B&M,United Kingdom";

    const result = await processFileUpload({
      fileContent: csv,
      filename: "upload.csv",
      existingData: null,
    });

    expect(result.success).toBe(true);
    expect(result.needsPreRankingDecision).toBe(false);
    expect(result.needsDuplicateResolution).toBe(false);
    expect(result.combinedData?.coasters).toHaveLength(1);
    expect(result.combinedData?.coasters[0].name).toBe("Nemesis");
  });

  it("asks for a pre-ranking decision when the CSV has multiple rows", async () => {
    const csv =
      "name,park,manufacturer,country\n" +
      "Nemesis,Alton Towers,B&M,United Kingdom\n" +
      "Fury 325,Carowinds,B&M,United States";

    const result = await processFileUpload({
      fileContent: csv,
      filename: "upload.csv",
      existingData: null,
    });

    expect(result.needsPreRankingDecision).toBe(true);
    expect(result.needsDuplicateResolution).toBe(false);
    expect(result.parsedCoasters).toHaveLength(2);
    expect(result.combinedData).toBeUndefined();
  });

  it("flags a manual duplicate for a single-row CSV that matches existing data", async () => {
    const csv =
      "name,park,manufacturer,model,country\nNemesis,Thorpe Park,B&M,Inverted,United Kingdom";

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

    const result = await processFileUpload({
      fileContent: csv,
      filename: "upload.csv",
      existingData,
    });

    expect(result.needsDuplicateResolution).toBe(true);
    expect(result.duplicates).toHaveLength(1);
  });

  it("returns a failure result for unparseable content instead of throwing", async () => {
    const result = await processFileUpload({
      fileContent: "not,enough\nrows",
      filename: "upload.csv",
      existingData: null,
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("tags parsed coasters with the requested ride type", async () => {
    const csv = "name,park,manufacturer,country\nHaunted Mansion,Disneyland,Disney,United States";

    const result = await processFileUpload({
      fileContent: csv,
      filename: "upload.csv",
      existingData: null,
      rideType: "dark-ride",
    });

    expect(result.combinedData?.coasters[0].type).toBe("dark-ride");
  });
});

describe("handlePreRankingDecision", () => {
  it("combines coasters directly when there are no duplicates", () => {
    const coasters = [
      makeCoaster({ id: "a", name: "Nemesis" }),
      makeCoaster({ id: "b", name: "Fury 325" }),
    ];

    const result = handlePreRankingDecision({
      coasters,
      filename: "upload.csv",
      existingData: null,
      isPreRanked: true,
    });

    expect(result.needsDuplicateResolution).toBe(false);
    expect(result.combinedData?.coasters).toHaveLength(2);
    expect(result.newCoasterCount).toBe(2);
  });

  it("flags duplicates instead of combining when a match is found", () => {
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
    const coasters = [
      makeCoaster({
        id: "incoming",
        name: "Nemesis",
        park: "Thorpe Park",
        manufacturer: "B&M",
        model: "Inverted",
      }),
    ];

    const result = handlePreRankingDecision({
      coasters,
      filename: "upload.csv",
      existingData,
      isPreRanked: false,
    });

    expect(result.needsDuplicateResolution).toBe(true);
    expect(result.duplicates).toHaveLength(1);
    expect(result.combinedData).toBeUndefined();
  });
});

describe("handleDuplicateResolution (processFileUpload wrapper)", () => {
  it("delegates to processDuplicateResolution", () => {
    const pendingCoaster = makeCoaster({ id: "pending", name: "Nemesis" });
    const existing = makeCoaster({ id: "existing", name: "Nemesis" });
    const duplicate: DuplicateMatch = {
      existingCoaster: existing,
      newCoaster: pendingCoaster,
      matchingFields: ["name", "manufacturer", "model"],
      matchCount: 3,
    };
    const resolutions: DuplicateResolution[] = [
      { action: "keep-both", duplicateIndex: 0 },
    ];

    const result = handleDuplicateResolution({
      resolutions,
      duplicates: [duplicate],
      pendingCoasters: [pendingCoaster],
      existingData: makeUploadedData({ coasters: [existing] }),
      filename: "manual-entry",
      isPreRanked: false,
    });

    expect(result.combinedData.coasters.map((c) => c.id)).toEqual(
      expect.arrayContaining(["existing", "pending"]),
    );
  });
});
