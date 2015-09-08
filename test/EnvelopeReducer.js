import assert from "power-assert";
import EnvelopeReducer from "../src/EnvelopeReducer";
import { SET, LIN } from "../src/constants";

describe("EnvelopeReducer", () => {
  describe(".reduce(envelope: number[][]): number[][]", () => {
    it("works has not finite value", () => {
      let envelope = [
        [ SET, 1, 0 ],
        [ SET, 0.5, 0.5 ],
        [ SET, 0, Infinity ],
      ];

      assert.deepEqual(EnvelopeReducer.reduce(envelope), [
        [ SET, 1, 0 ],
        [ SET, 0.5, 0.5 ],
      ]);
    });
    it("works has same time", () => {
      let envelope = [
        [ SET, 1, 0 ],
        [ LIN, 2, 0 ],
      ];

      assert.deepEqual(EnvelopeReducer.reduce(envelope), [
        [ SET, 2, 0 ],
      ]);
    });
  });
});
