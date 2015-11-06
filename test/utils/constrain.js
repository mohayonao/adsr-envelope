import assert from "power-assert";
import constrain from "../../src/utils/constrain";

describe("utils", () => {
  describe("constrain(value: number, minValue: number, maxValue: number): number", () => {
    it("works", () => {
      assert(constrain(5, 10, 20) === 10);
      assert(constrain(15, 10, 20) === 15);
      assert(constrain(25, 10, 20) === 20);
    });
  });
});
