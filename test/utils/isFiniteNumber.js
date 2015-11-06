import assert from "power-assert";
import isFiniteNumber from "../../src/utils/isFiniteNumber";

describe("utils", () => {
  describe("isFiniteNumber(value: number): boolean", () => {
    it("works", () => {
      assert(isFiniteNumber(0) === true);
      assert(isFiniteNumber(+Math.PI) === true);
      assert(isFiniteNumber(-Math.PI) === true);
      assert(isFiniteNumber(+Infinity) === false);
      assert(isFiniteNumber(-Infinity) === false);
      assert(isFiniteNumber(NaN) === false);
      assert(isFiniteNumber("0") === false);
    });
  });
});
