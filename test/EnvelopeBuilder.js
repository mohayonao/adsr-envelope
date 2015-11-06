import assert from "power-assert";
import EnvelopeBuilder from "../src/EnvelopeBuilder";
import { SET, LIN } from "../src/constants";

function makeParams(attackTime, decayTime, releaseTime, gateTime, curve = "lin") {
  return {
    attackTime: attackTime,
    decayTime: decayTime,
    sustainLevel: 0.5,
    releaseTime: releaseTime,
    gateTime: gateTime,
    peakLevel: 1,
    epsilon: 1e-3,
    attackCurve: curve,
    decayCurve: curve,
    releaseCurve: curve
  };
}

describe("EnvelopeBuilder", () => {
  describe(".build(params: object): number[][]", () => {
    describe("attackTime: 0, decayTime: 0, releaseTime: 0", () => {
      it("gateTime: 0", () => {
        let params = makeParams(0, 0, 0, 0);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ]
        ]);
      });
      it("gateTime: 4", () => {
        let params = makeParams(0, 0, 0, 4);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ SET, 0, 4 ]
        ]);
      });
      it("gateTime: 5", () => {
        let params = makeParams(0, 0, 0, 5);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ SET, 0, 5 ]
        ]);
      });
      it("gateTime: 8", () => {
        let params = makeParams(0, 0, 0, 8);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ SET, 0, 8 ]
        ]);
      });
      it("gateTime: 10", () => {
        let params = makeParams(0, 0, 0, 8);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ SET, 0, 8 ]
        ]);
      });
      it("gateTime: 20", () => {
        let params = makeParams(0, 0, 0, 20);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ SET, 0, 20 ]
        ]);
      });
      it("gateTime: Infinity", () => {
        let params = makeParams(0, 0, 0, Infinity);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ]
        ]);
      });
    });
    describe("attackTime: 0, decayTime: 0, releaseTime: 10", () => {
      it("gateTime: 0", () => {
        let params = makeParams(0, 0, 10, 0);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ LIN, 0, 10 ]
        ]);
      });
      it("gateTime: 4", () => {
        let params = makeParams(0, 0, 10, 4);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ SET, 0.5, 4 ],
          [ LIN, 0, 14 ]
        ]);
      });
      it("gateTime: 5", () => {
        let params = makeParams(0, 0, 10, 5);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ SET, 0.5, 5 ],
          [ LIN, 0, 15 ]
        ]);
      });
      it("gateTime: 8", () => {
        let params = makeParams(0, 0, 10, 8);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ SET, 0.5, 8 ],
          [ LIN, 0, 18 ]
        ]);
      });
      it("gateTime: 10", () => {
        let params = makeParams(0, 0, 10, 10);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ SET, 0.5, 10 ],
          [ LIN, 0, 20 ]
        ]);
      });
      it("gateTime: 20", () => {
        let params = makeParams(0, 0, 10, 20);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ],
          [ SET, 0.5, 20 ],
          [ LIN, 0, 30 ]
        ]);
      });
      it("gateTime: Infinity", () => {
        let params = makeParams(0, 0, 10, Infinity);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0.5, 0 ]
        ]);
      });
    });
    describe("attackTime: 0, decayTime: 5, releaseTime: 0", () => {
      it("gateTime: 0", () => {
        let params = makeParams(0, 5, 0, 0);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ]
        ]);
      });
      it("gateTime: 4", () => {
        let params = makeParams(0, 5, 0, 4);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.6, 4 ],
          [ SET, 0, 4 ]
        ]);
      });
      it("gateTime: 5", () => {
        let params = makeParams(0, 5, 0, 5);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.5, 5 ],
          [ SET, 0, 5 ]
        ]);
      });
      it("gateTime: 8", () => {
        let params = makeParams(0, 5, 0, 8);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.5, 5 ],
          [ SET, 0, 8 ]
        ]);
      });
      it("gateTime: 10", () => {
        let params = makeParams(0, 5, 0, 10);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.5, 5 ],
          [ SET, 0, 10 ]
        ]);
      });
      it("gateTime: 20", () => {
        let params = makeParams(0, 5, 0, 20);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.5, 5 ],
          [ SET, 0, 20 ]
        ]);
      });
      it("gateTime: Infinity", () => {
        let params = makeParams(0, 5, 0, Infinity);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.5, 5 ]
        ]);
      });
    });
    describe("attackTime: 0, decayTime: 5, releaseTime: 10", () => {
      it("gateTime: 0", () => {
        let params = makeParams(0, 5, 10, 0);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0, 10 ]
        ]);
      });
      it("gateTime: 4", () => {
        let params = makeParams(0, 5, 10, 4);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.6, 4 ],
          [ LIN, 0, 14 ]
        ]);
      });
      it("gateTime: 5", () => {
        let params = makeParams(0, 5, 10, 5);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.5, 5 ],
          [ LIN, 0, 15 ]
        ]);
      });
      it("gateTime: 8", () => {
        let params = makeParams(0, 5, 10, 8);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.5, 5 ],
          [ SET, 0.5, 8 ],
          [ LIN, 0, 18 ]
        ]);
      });
      it("gateTime: 10", () => {
        let params = makeParams(0, 5, 10, 10);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.5, 5 ],
          [ SET, 0.5, 10 ],
          [ LIN, 0, 20 ]
        ]);
      });
      it("gateTime: 20", () => {
        let params = makeParams(0, 5, 10, 20);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.5, 5 ],
          [ SET, 0.5, 20 ],
          [ LIN, 0, 30 ]
        ]);
      });
      it("gateTime: Infinity", () => {
        let params = makeParams(0, 5, 10, Infinity);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 1, 0 ],
          [ LIN, 0.5, 5 ]
        ]);
      });
    });
    describe("attackTime: 5, decayTime: 0, releaseTime: 0", () => {
      it("gateTime: 0", () => {
        let params = makeParams(5, 0, 0, 0);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ]
        ]);
      });
      it("gateTime: 4", () => {
        let params = makeParams(5, 0, 0, 4);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 0.8, 4 ],
          [ SET, 0, 4 ]
        ]);
      });
      it("gateTime: 5", () => {
        let params = makeParams(5, 0, 0, 5);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ SET, 0, 5 ]
        ]);
      });
      it("gateTime: 8", () => {
        let params = makeParams(5, 0, 0, 8);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ SET, 0.5, 5 ],
          [ SET, 0, 8 ]
        ]);
      });
      it("gateTime: 10", () => {
        let params = makeParams(5, 0, 0, 10);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ SET, 0.5, 5 ],
          [ SET, 0, 10 ]
        ]);
      });
      it("gateTime: 20", () => {
        let params = makeParams(5, 0, 0, 20);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ SET, 0.5, 5 ],
          [ SET, 0, 20 ]
        ]);
      });
      it("gateTime: Infinity", () => {
        let params = makeParams(5, 0, 0, Infinity);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ SET, 0.5, 5 ]
        ]);
      });
    });
    describe("attackTime: 5, decayTime: 0, releaseTime: 10", () => {
      it("gateTime: 0", () => {
        let params = makeParams(5, 0, 10, 0);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ]
        ]);
      });
      it("gateTime: 4", () => {
        let params = makeParams(5, 0, 10, 4);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 0.8, 4 ],
          [ LIN, 0, 14 ]
        ]);
      });
      it("gateTime: 5", () => {
        let params = makeParams(5, 0, 10, 5);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ LIN, 0, 15 ]
        ]);
      });
      it("gateTime: 8", () => {
        let params = makeParams(5, 0, 10, 8);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ SET, 0.5, 5 ],
          [ SET, 0.5, 8 ],
          [ LIN, 0, 18 ]
        ]);
      });
      it("gateTime: 10", () => {
        let params = makeParams(5, 0, 10, 10);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ SET, 0.5, 5 ],
          [ SET, 0.5, 10 ],
          [ LIN, 0, 20 ]
        ]);
      });
      it("gateTime: 20", () => {
        let params = makeParams(5, 0, 10, 20);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ SET, 0.5, 5 ],
          [ SET, 0.5, 20 ],
          [ LIN, 0, 30 ]
        ]);
      });
      it("gateTime: Infinity", () => {
        let params = makeParams(5, 0, 10, Infinity);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ SET, 0.5, 5 ]
        ]);
      });
    });
    describe("attackTime: 5, decayTime: 5, releaseTime: 0", () => {
      it("gateTime: 0", () => {
        let params = makeParams(5, 5, 0, 0);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ]
        ]);
      });
      it("gateTime: 4", () => {
        let params = makeParams(5, 5, 0, 4);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 0.8, 4 ],
          [ SET, 0, 4 ]
        ]);
      });
      it("gateTime: 5", () => {
        let params = makeParams(5, 5, 0, 5);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ SET, 0, 5 ]
        ]);
      });
      it("gateTime: 8", () => {
        let params = makeParams(5, 5, 0, 8);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ LIN, 0.7, 8 ],
          [ SET, 0, 8 ]
        ]);
      });
      it("gateTime: 10", () => {
        let params = makeParams(5, 5, 0, 10);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ LIN, 0.5, 10 ],
          [ SET, 0, 10 ]
        ]);
      });
      it("gateTime: 20", () => {
        let params = makeParams(5, 5, 0, 20);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ LIN, 0.5, 10 ],
          [ SET, 0, 20 ]
        ]);
      });
      it("gateTime: Infinity", () => {
        let params = makeParams(5, 5, 0, Infinity);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ LIN, 0.5, 10 ]
        ]);
      });
    });
    describe("attackTime: 5, decayTime: 5, releaseTime: 10", () => {
      it("gateTime: 0", () => {
        let params = makeParams(5, 5, 10, 0);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ]
        ]);
      });
      it("gateTime: 4", () => {
        let params = makeParams(5, 5, 10, 4);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 0.8, 4 ],
          [ LIN, 0, 14 ]
        ]);
      });
      it("gateTime: 5", () => {
        let params = makeParams(5, 5, 10, 5);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ LIN, 0, 15 ]
        ]);
      });
      it("gateTime: 8", () => {
        let params = makeParams(5, 5, 10, 8);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ LIN, 0.7, 8 ],
          [ LIN, 0, 18 ]
        ]);
      });
      it("gateTime: 10", () => {
        let params = makeParams(5, 5, 10, 10);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ LIN, 0.5, 10 ],
          [ LIN, 0, 20 ]
        ]);
      });
      it("gateTime: 20", () => {
        let params = makeParams(5, 5, 10, 20);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ LIN, 0.5, 10 ],
          [ SET, 0.5, 20 ],
          [ LIN, 0, 30 ]
        ]);
      });
      it("gateTime: Infinity", () => {
        let params = makeParams(5, 5, 10, Infinity);
        let envelope = EnvelopeBuilder.build(params);

        assert.deepEqual(envelope, [
          [ SET, 0, 0 ],
          [ LIN, 1, 5 ],
          [ LIN, 0.5, 10 ]
        ]);
      });
    });
  });
});
