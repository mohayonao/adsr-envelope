import assert from "power-assert";
import EnvelopeValue from "../src/EnvelopeValue";
import { SET, LIN, EXP } from "../src/constants";

function closeTo(expected, actual, delta) {
  return Math.abs(expected - actual) <= delta;
}

describe("EnvelopeValue", () => {
  describe(".at(envelope: number[][], time: number): number", () => {
    it("works", () => {
      let envelope = [
        [ SET, 0, 0 ],
        [ LIN, 1, 5 ],
        [ LIN, 0.5, 7 ],
        [ SET, 0.5, 10 ],
        [ EXP, 0.01, 15 ]
      ];

      assert(closeTo(EnvelopeValue.at(envelope, 0), 0, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 1), 0.2, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 2), 0.4, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 3), 0.6, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 4), 0.8, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 5), 1, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 6), 0.75, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 7), 0.5, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 8), 0.5, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 9), 0.5, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 10), 0.5, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 11), 0.22865252196788788, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 12), 0.10456395894289017, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 13), 0.04781762510538101, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 14), 0.021867241710424423, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 15), 0.01, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 16), 0.01, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 17), 0.01, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 18), 0.01, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 19), 0.01, 1e-6));
      assert(closeTo(EnvelopeValue.at(envelope, 20), 0.01, 1e-6));
    });
    it("works when empty envelope", () => {
      let envelope = [];

      assert(EnvelopeValue.at(envelope, 0) === 0);
    });
  });
});
