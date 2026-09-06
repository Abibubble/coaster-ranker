import { describe, expect, it } from "vitest";
import {
  parseCSV,
  validateCoasterData,
  processUploadedFile,
} from "./fileParser.util";

const makeFile = (name: string, type: string): File => new File([], name, { type });

describe("parseCSV", () => {
  it("maps header row to values, trimming whitespace", () => {
    const csv = "name,park,manufacturer,country\n Steel Vengeance , Cedar Point ,RMC,USA";

    const rows = parseCSV(csv);

    expect(rows).toEqual([
      {
        name: "Steel Vengeance",
        park: "Cedar Point",
        manufacturer: "RMC",
        country: "USA",
      },
    ]);
  });

  it("preserves an escaped double-quote inside a quoted field (regression)", () => {
    const csv =
      'name,park,manufacturer,country\nSteel Vengeance,"Six ""Flags"" Magic Mountain",RMC,USA';

    const rows = parseCSV(csv);

    expect(rows[0].park).toBe('Six "Flags" Magic Mountain');
  });

  it("keeps a comma inside a quoted field as part of the value", () => {
    const csv =
      'name,park,manufacturer,country\nFury 325,"Six Flags, Magic Mountain",B&M,USA';

    const rows = parseCSV(csv);

    expect(rows[0].park).toBe("Six Flags, Magic Mountain");
  });

  it("skips a row whose value count does not match the header count", () => {
    const csv = [
      "name,park,manufacturer,country",
      "Good Coaster,Some Park,Intamin,USA",
      "Bad Row,Missing Fields", // only 2 values, 4 headers expected
      "Another Good One,Other Park,B&M,UK",
    ].join("\n");

    const rows = parseCSV(csv);

    expect(rows).toHaveLength(2);
    expect(rows.map((r) => r.name)).toEqual([
      "Good Coaster",
      "Another Good One",
    ]);
  });

  it("throws when the CSV has no data rows", () => {
    expect(() => parseCSV("name,park,manufacturer,country")).toThrow(
      "CSV must have at least a header row and one data row",
    );
  });
});

describe("validateCoasterData", () => {
  const validRow = {
    name: "steel vengeance",
    park: "cedar point",
    manufacturer: "rmc",
    country: "usa",
  };

  it.each([
    ["name", "Coaster name is required"],
    ["park", "Park name is required"],
    ["manufacturer", "Manufacturer is required"],
    ["country", "Country is required"],
  ])("throws when %s is missing, indicating the row number", (field, message) => {
    const row = { ...validRow, [field]: undefined };

    expect(() => validateCoasterData([validRow, row])).toThrow(
      `Row 2: ${message}`,
    );
  });

  it("formats required fields and defaults type to coaster", () => {
    const [result] = validateCoasterData([validRow]);

    expect(result.name).toBe("Steel Vengeance");
    expect(result.park).toBe("Cedar Point");
    expect(result.manufacturer).toBe("Rmc");
    expect(result.country).toBe("Usa");
    expect(result.type).toBe("coaster");
  });

  it("passes through the given rideType, e.g. dark-ride", () => {
    const [result] = validateCoasterData([validRow], "dark-ride");

    expect(result.type).toBe("dark-ride");
  });

  it("leaves model, material and thrillLevel unset when absent", () => {
    const [result] = validateCoasterData([validRow]);

    expect(result.model).toBeUndefined();
    expect(result.material).toBeUndefined();
    expect(result.thrillLevel).toBeUndefined();
  });

  it("formats model, material and thrillLevel when present", () => {
    const [result] = validateCoasterData([
      {
        ...validRow,
        model: "i-box",
        material: "hybrid",
        thrillLevel: "thrill",
      },
    ]);

    expect(result.model).toBe("I Box");
    expect(result.material).toBe("Hybrid");
    expect(result.thrillLevel).toBe("Thrill");
  });

  it("uses the provided id, or falls back to a generated one", () => {
    const [withId] = validateCoasterData([{ ...validRow, id: "abc" }]);
    const [withoutId] = validateCoasterData([validRow]);

    expect(withId.id).toBe("abc");
    expect(withoutId.id).toBe("coaster_0");
  });

  it("sets ranking fields from a valid positive integer rank", () => {
    const [result] = validateCoasterData([{ ...validRow, rank: "3" }]);

    expect(result.rankPosition).toBe(3);
    expect(result.originalRankPosition).toBe(3);
    expect(result.isPreRanked).toBe(true);
  });

  it.each([["abc"], ["0"], ["-5"], [""]])(
    "ignores an invalid rank value: %s",
    (rank) => {
      const [result] = validateCoasterData([{ ...validRow, rank }]);

      expect("rankPosition" in result).toBe(false);
      expect("originalRankPosition" in result).toBe(false);
      expect("isPreRanked" in result).toBe(false);
    },
  );

  it("sets openingYear from a plausible year (issue #44)", () => {
    const [result] = validateCoasterData([
      { ...validRow, openingYear: "2015" },
    ]);

    expect(result.openingYear).toBe(2015);
  });

  it("leaves openingYear unset when absent", () => {
    const [result] = validateCoasterData([validRow]);

    expect("openingYear" in result).toBe(false);
  });

  it.each([["abc"], ["1799"], [String(new Date().getFullYear() + 3)], [""]])(
    "ignores an implausible opening year: %s",
    (openingYear) => {
      const [result] = validateCoasterData([{ ...validRow, openingYear }]);

      expect("openingYear" in result).toBe(false);
    },
  );
});

describe("processUploadedFile", () => {
  const jsonRow = {
    name: "Bat",
    park: "Blackpool Pleasure Beach",
    manufacturer: "Interlink",
    country: "UK",
  };

  it("resolves coasters from a raw JSON array", async () => {
    const file = makeFile("data.json", "application/json");
    const content = JSON.stringify([jsonRow]);

    const result = await processUploadedFile(file, content);

    expect(result.coasters).toHaveLength(1);
    expect(result.coasters[0].name).toBe("Bat");
    expect(result.filename).toBe("data.json");
  });

  it("resolves coasters from a JSON object with a coasters array", async () => {
    const file = makeFile("data.json", "application/json");
    const content = JSON.stringify({ coasters: [jsonRow] });

    const result = await processUploadedFile(file, content);

    expect(result.coasters).toHaveLength(1);
  });

  it("parses CSV content when the file is not JSON", async () => {
    const file = makeFile("data.csv", "text/csv");
    const content =
      "name,park,manufacturer,country\nBat,Blackpool Pleasure Beach,Interlink,UK";

    const result = await processUploadedFile(file, content);

    expect(result.coasters).toHaveLength(1);
    expect(result.coasters[0].park).toBe("Blackpool Pleasure Beach");
  });

  it("passes the given rideType through to the parsed coasters, e.g. dark-ride", async () => {
    const file = makeFile("data.json", "application/json");
    const content = JSON.stringify([jsonRow]);

    const result = await processUploadedFile(file, content, "dark-ride");

    expect(result.coasters[0].type).toBe("dark-ride");
  });

  it("rejects when the parsed data array is empty", async () => {
    const file = makeFile("data.json", "application/json");

    await expect(
      processUploadedFile(file, JSON.stringify([])),
    ).rejects.toThrow("No coaster data found in file");
  });

  it("rejects listing missing required header columns", async () => {
    const file = makeFile("data.json", "application/json");
    const content = JSON.stringify([{ name: "Bat" }]);

    await expect(processUploadedFile(file, content)).rejects.toThrow(
      /park, manufacturer/,
    );
  });

  it("rejects rather than throws synchronously on malformed JSON", async () => {
    const file = makeFile("data.json", "application/json");

    await expect(
      processUploadedFile(file, "{not valid json"),
    ).rejects.toBeInstanceOf(Error);
  });
});
