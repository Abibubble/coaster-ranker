import { Coaster, UploadedData, RideType } from "../../types/data";
import { formatString } from "../formatString.util";

/**
 * Utility functions for parsing CSV and JSON files into validated coaster data.
 * Handles file parsing, data validation, and transformation into application format.
 */

interface RawCoasterData {
  [key: string]: string | undefined;
  id?: string;
  name?: string;
  park?: string;
  country?: string;
  manufacturer?: string;
  model?: string;
  material?: string;
  thrillLevel?: string;
}

export function parseCSV(csvText: string): RawCoasterData[] {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) {
    throw new Error("CSV must have at least a header row and one data row");
  }

  const headers = lines[0]
    .split(",")
    .map((header) => header.trim().replace(/"/g, ""));
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== headers.length) {
      console.warn(
        `Line ${i + 1} has ${values.length} values but expected ${
          headers.length
        }`,
      );
      continue;
    }

    const row: RawCoasterData = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    data.push(row);
  }

  return data;
}

function parseCSVLine(line: string): string[] {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

export function validateCoasterData(
  data: RawCoasterData[],
  rideType: RideType = "coaster",
): Coaster[] {
  return data.map((item, index) => {
    if (!item.name) {
      throw new Error(`Row ${index + 1}: Coaster name is required`);
    }
    if (!item.park) {
      throw new Error(`Row ${index + 1}: Park name is required`);
    }
    if (!item.manufacturer) {
      throw new Error(`Row ${index + 1}: Manufacturer is required`);
    }
    if (!item.country) {
      throw new Error(`Row ${index + 1}: Country is required`);
    }

    return {
      id: item.id || `coaster_${index}`,
      name: formatString(item.name, "space", "first-word", false),
      park: formatString(item.park, "space", "first-word", false),
      country: formatString(item.country, "space", "first-word", false),
      manufacturer: formatString(
        item.manufacturer,
        "space",
        "first-word",
        false,
      ),
      model: item.model
        ? formatString(item.model, "space", "first-word", false)
        : undefined,
      material: item.material
        ? formatString(item.material, "space", "first-word", false)
        : undefined,
      thrillLevel: item.thrillLevel
        ? formatString(item.thrillLevel, "space", "first-word", false)
        : undefined,
      type: rideType,
    };
  });
}

export function processUploadedFile(
  file: File,
  content: string,
  rideType: RideType = "coaster",
): Promise<UploadedData> {
  return new Promise((resolve, reject) => {
    try {
      let data: RawCoasterData[];

      if (file.type === "application/json" || file.name.endsWith(".json")) {
        // Parse JSON
        const jsonData = JSON.parse(content);
        if (Array.isArray(jsonData)) {
          data = jsonData;
        } else if (jsonData.coasters && Array.isArray(jsonData.coasters)) {
          data = jsonData.coasters;
        } else {
          throw new Error(
            'JSON must be an array of coasters or contain a "coasters" property with an array',
          );
        }
      } else {
        // Parse CSV
        data = parseCSV(content);
      }

      // Validate data
      if (data.length === 0) {
        throw new Error("No coaster data found in file");
      }

      const firstRow = data[0];
      const headers = Object.keys(firstRow).map((h) => h.toLowerCase());

      const requiredFields = ["name", "park", "manufacturer"];
      const missingFields = requiredFields.filter(
        (field) => !headers.includes(field),
      );

      if (missingFields.length > 0) {
        throw new Error(
          `Coaster data must include these required fields: ${missingFields.join(
            ", ",
          )}`,
        );
      }

      const coasters = validateCoasterData(data, rideType);

      const result: UploadedData = {
        coasters,
        uploadedAt: new Date(),
        filename: file.name,
      };

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
