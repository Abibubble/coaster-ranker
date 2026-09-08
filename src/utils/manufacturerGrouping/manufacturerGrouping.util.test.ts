import {
  buildManufacturerAliasMap,
  getOtherNamesInManufacturerGroup,
  resolveManufacturerGroup,
} from "./manufacturerGrouping.util";

describe("manufacturerGrouping.util", () => {
  const manufacturers = [
    {
      manufacturer: "Arrow Dynamics",
      alternateNames: ["Arrow Development", "Arrow-Huss"],
    },
    { manufacturer: "Bolliger & Mabillard" },
    { manufacturer: "BHS", alternateNames: ["Translift"] },
  ];

  describe("buildManufacturerAliasMap", () => {
    it("maps a manufacturer's own name to itself", () => {
      const aliasMap = buildManufacturerAliasMap(manufacturers);
      expect(aliasMap.get("arrow dynamics")).toBe("Arrow Dynamics");
      expect(aliasMap.get("bolliger & mabillard")).toBe("Bolliger & Mabillard");
    });

    it("maps each alternate name to the primary manufacturer name", () => {
      const aliasMap = buildManufacturerAliasMap(manufacturers);
      expect(aliasMap.get("arrow development")).toBe("Arrow Dynamics");
      expect(aliasMap.get("arrow-huss")).toBe("Arrow Dynamics");
      expect(aliasMap.get("translift")).toBe("BHS");
    });

    it("is case- and whitespace-insensitive", () => {
      const aliasMap = buildManufacturerAliasMap(manufacturers);
      expect(aliasMap.get("  ARROW DEVELOPMENT  ")).toBeUndefined();
      expect(aliasMap.get("arrow development")).toBe("Arrow Dynamics");
    });

    it("handles manufacturers with no alternateNames", () => {
      const aliasMap = buildManufacturerAliasMap(manufacturers);
      expect(aliasMap.get("bolliger & mabillard")).toBe("Bolliger & Mabillard");
    });

    it("returns an empty map for an empty list", () => {
      expect(buildManufacturerAliasMap([]).size).toBe(0);
    });
  });

  describe("resolveManufacturerGroup", () => {
    const aliasMap = buildManufacturerAliasMap(manufacturers);

    it("resolves a primary name to itself", () => {
      expect(resolveManufacturerGroup("Arrow Dynamics", aliasMap)).toBe(
        "Arrow Dynamics",
      );
    });

    it("resolves an alternate name to the primary name", () => {
      expect(resolveManufacturerGroup("Arrow Development", aliasMap)).toBe(
        "Arrow Dynamics",
      );
      expect(resolveManufacturerGroup("Translift", aliasMap)).toBe("BHS");
    });

    it("is case- and whitespace-insensitive on the input name", () => {
      expect(
        resolveManufacturerGroup("  arrow DEVELOPMENT  ", aliasMap),
      ).toBe("Arrow Dynamics");
    });

    it("falls back to the original name when it isn't in the alias map", () => {
      expect(resolveManufacturerGroup("Some Unlisted Company", aliasMap)).toBe(
        "Some Unlisted Company",
      );
    });
  });

  describe("getOtherNamesInManufacturerGroup", () => {
    const aliasMap = buildManufacturerAliasMap(manufacturers);

    it("finds the other raw names present that belong to the same group", () => {
      const rawNames = ["Arrow Development", "Arrow Dynamics", "BHS"];

      expect(
        getOtherNamesInManufacturerGroup(rawNames, "Arrow Development", aliasMap),
      ).toEqual(["Arrow Dynamics"]);
    });

    it("is symmetric - selecting the primary name finds the alternate names present", () => {
      const rawNames = ["Arrow Development", "Arrow Dynamics", "Arrow-Huss"];

      expect(
        getOtherNamesInManufacturerGroup(rawNames, "Arrow Dynamics", aliasMap),
      ).toEqual(["Arrow Development", "Arrow-Huss"]);
    });

    it("returns an empty array when no other name in the group is present", () => {
      const rawNames = ["Arrow Dynamics", "Bolliger & Mabillard"];

      expect(
        getOtherNamesInManufacturerGroup(rawNames, "Arrow Dynamics", aliasMap),
      ).toEqual([]);
    });

    it("excludes the selected name itself even with different casing/whitespace", () => {
      const rawNames = ["arrow dynamics", "Arrow Development"];

      expect(
        getOtherNamesInManufacturerGroup(rawNames, "Arrow Dynamics", aliasMap),
      ).toEqual(["Arrow Development"]);
    });

    it("dedupes repeated raw names", () => {
      const rawNames = ["Arrow Development", "Arrow Development", "Arrow Dynamics"];

      expect(
        getOtherNamesInManufacturerGroup(rawNames, "Arrow Dynamics", aliasMap),
      ).toEqual(["Arrow Development"]);
    });
  });
});
