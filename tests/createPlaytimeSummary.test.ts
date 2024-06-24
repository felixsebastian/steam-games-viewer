import createPlaytimeSummary from "@/lib/createPlaytimeSummary";

describe("createPlaytimeSummary()", () => {
  describe("playtime is zero", () => {
    it("should return an empty array", () => {
      expect(createPlaytimeSummary(0)).toEqual([]);
    });
  });

  describe("playtime is less than 1 hour", () => {
    it("should return an item for minutes", () => {
      expect(createPlaytimeSummary(10)).toEqual(["10 minutes"]);
    });
  });

  describe("playtime is more than than 1 year", () => {
    it("should return an item for minutes", () => {
      expect(createPlaytimeSummary(10000000)).toEqual([
        "19 years",
        "4 days",
        "10 hours",
      ]);
    });
  });
});
