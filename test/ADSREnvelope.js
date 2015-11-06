import "web-audio-test-api";
import assert from "power-assert";
import sinon from "sinon";
import ADSREnvelope from "../src/ADSREnvelope";

describe("ADSREnvelope", () => {
  describe("constructor(opts = {})", () => {
    it("works without options", () => {
      let env = new ADSREnvelope();

      assert(env instanceof ADSREnvelope);
      assert(env.attackTime === 0.01);
      assert(env.decayTime === 0.3);
      assert(env.sustainLevel === 0.5);
      assert(env.releaseTime === 1);
      assert(env.gateTime === 1);
      assert(env.peakLevel === 1);
      assert(env.epsilon === 1e-3);
      assert(env.attackCurve === "lin");
      assert(env.decayCurve === "lin");
      assert(env.releaseCurve === "lin");
    });
    it("works", () => {
      let env = new ADSREnvelope({
        attackTime: 2,
        decayTime: 0.1,
        sustainLevel: 0.25,
        releaseTime: 13,
        gateTime: 6,
        peakLevel: 0.25,
        epsilon: 0.0001,
        attackCurve: "exp",
        decayCurve: "exp",
        releaseCurve: "exp"
      });

      assert(env instanceof ADSREnvelope);
      assert(env.attackTime === 2);
      assert(env.decayTime === 0.1);
      assert(env.sustainLevel === 0.25);
      assert(env.releaseTime === 13);
      assert(env.gateTime === 6);
      assert(env.peakLevel === 0.25);
      assert(env.epsilon === 0.0001);
      assert(env.attackCurve === "exp");
      assert(env.decayCurve === "exp");
      assert(env.releaseCurve === "exp");
    });
  });
  describe("#duration: number", () => {
    it("works", () => {
      let env = new ADSREnvelope({ attackTime: 2, decayTime: 3, gateTime: 10, releaseTime: 5 });

      assert(env.duration === 15);

      env.duration = 20;
      assert(env.duration === 20);
      assert(env.sustainTime === 10);
      assert(env.gateTime === 15);
      assert(env.releaseTime === 5);

      env.duration = -10;
      assert(env.duration === 5);
      assert(env.sustainTime === 0);
      assert(env.gateTime === 0);

      env.duration = NaN;
      assert(env.duration === 5);
      assert(env.sustainTime === 0);
      assert(env.gateTime === 0);
    });
  });
  describe("#attackTime: number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      env.attackTime = 10;
      assert(env.attackTime === 10);

      env.attackTime = -10;
      assert(env.attackTime === 0);

      env.attackTime = NaN;
      assert(env.attackTime === 0);
    });
  });
  describe("#decayTime: number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      env.decayTime = 10;
      assert(env.decayTime === 10);

      env.decayTime = -10;
      assert(env.decayTime === 0);

      env.decayTime = NaN;
      assert(env.decayTime === 0);
    });
  });
  describe("#sustainTime: number", () => {
    it("works", () => {
      let env = new ADSREnvelope({ attackTime: 2, decayTime: 3, sustainTime: 10, releaseTime: 5 });

      assert(env.sustainTime === 10);
      assert(env.gateTime === 15);
      assert(env.duration === 20);

      env.sustainTime = 5;
      assert(env.sustainTime === 5);
      assert(env.gateTime === 10);
      assert(env.duration === 15);

      env.sustainTime = -10;
      assert(env.sustainTime === 0);
      assert(env.gateTime === 5);
      assert(env.duration === 10);

      env.sustainTime = NaN;
      assert(env.sustainTime === 0);
      assert(env.gateTime === 5);
      assert(env.duration === 10);
    });
  });
  describe("#sustainLevel: number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      env.sustainLevel = 0.25;
      assert(env.sustainLevel === 0.25);

      env.sustainLevel = -10;
      assert(env.sustainLevel === 0);

      env.sustainLevel = 10;
      assert(env.sustainLevel === 1);

      env.sustainLevel = NaN;
      assert(env.sustainLevel === 0);
    });
  });
  describe("#releaseTime: number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      env.releaseTime = 10;
      assert(env.releaseTime === 10);

      env.releaseTime = -10;
      assert(env.releaseTime === 0);

      env.releaseTime = NaN;
      assert(env.releaseTime === 0);
    });
  });
  describe("#gateTime: number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      env.gateTime = 10;
      assert(env.gateTime === 10);

      env.gateTime = -10;
      assert(env.gateTime === 0);

      env.gateTime = NaN;
      assert(env.gateTime === 0);
    });
  });
  describe("#peakLevel: number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      env.peakLevel = 0.25;
      assert(env.peakLevel === 0.25);

      env.peakLevel = -10;
      assert(env.peakLevel === 0);

      env.peakLevel = 10;
      assert(env.peakLevel === 10);

      env.peakLevel = NaN;
      assert(env.peakLevel === 0);
    });
  });
  describe("#epsilon: number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      env.epsilon = 1e-5;
      assert(env.epsilon === 1e-5);

      env.epsilon = 1;
      assert(env.epsilon === 1e-2);

      env.epsilon = 0;
      assert(env.epsilon !== 0);

      env.epsilon = NaN;
      assert(env.epsilon !== 0);
    });
  });
  describe("#attackCurve: number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      env.attackCurve = "lin";
      assert(env.attackCurve === "lin");

      env.attackCurve = "exp";
      assert(env.attackCurve === "exp");
    });
  });
  describe("#decayCurve: number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      env.decayCurve = "lin";
      assert(env.decayCurve === "lin");

      env.decayCurve = "exp";
      assert(env.decayCurve === "exp");
    });
  });
  describe("#releaseCurve: number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      env.releaseCurve = "lin";
      assert(env.releaseCurve === "lin");

      env.releaseCurve = "exp";
      assert(env.releaseCurve === "exp");
    });
  });
  describe("#valueAt(time: number): number", () => {
    it("works", () => {
      let env = new ADSREnvelope();

      assert(env.valueAt(0) === 0);
    });
  });
  describe("#applyTo(audioParam: AudioParam, playbackTime): self", () => {
    it("works", () => {
      let gain = new global.AudioContext().createGain().gain;
      let env = new ADSREnvelope({
        attackTime: 5,
        decayTime: 5,
        sustainLevel: 0.5,
        releaseTime: 10,
        gateTime: 20,
        epsilon: 1e-6,
        releaseCurve: "exp"
      });

      gain.setValueAtTime = sinon.spy(gain.setValueAtTime.bind(gain));
      gain.linearRampToValueAtTime = sinon.spy(gain.linearRampToValueAtTime.bind(gain));
      gain.exponentialRampToValueAtTime = sinon.spy(gain.exponentialRampToValueAtTime.bind(gain));

      let result = env.applyTo(gain, 10);

      assert(result === env);
      assert(gain.setValueAtTime.callCount === 2);
      assert(gain.linearRampToValueAtTime.callCount === 2);
      assert(gain.exponentialRampToValueAtTime.callCount === 1);
      assert.deepEqual(gain.setValueAtTime.args[0], [ 0, 10 ]);
      assert.deepEqual(gain.linearRampToValueAtTime.args[0], [ 1, 15 ]);
      assert.deepEqual(gain.linearRampToValueAtTime.args[1], [ 0.5, 20 ]);
      assert.deepEqual(gain.setValueAtTime.args[1], [ 0.5, 30 ]);
      assert.deepEqual(gain.exponentialRampToValueAtTime.args[0], [ 1e-6, 40 ]);
    });
  });
  describe("#getWebAudioAPIMethods(): Array[]", () => {
    it("works", () => {
      let env = new ADSREnvelope({
        attackTime: 5,
        decayTime: 5,
        sustainLevel: 0.5,
        releaseTime: 10,
        gateTime: 20,
        epsilon: 1e-6,
        releaseCurve: "exp"
      });

      assert.deepEqual(env.getWebAudioAPIMethods(), [
        [ "setValueAtTime", 0, 0 ],
        [ "linearRampToValueAtTime", 1, 5 ],
        [ "linearRampToValueAtTime", 0.5, 10 ],
        [ "setValueAtTime", 0.5, 20 ],
        [ "exponentialRampToValueAtTime", 1e-6, 30 ]
      ]);
    });
  });
  describe("#clone(): ADSREnvelope", () => {
    it("works", () => {
      let env1 = new ADSREnvelope({ attackTime: 5, releaseCurve: "exp" });
      let env2 = env1.clone();

      assert(env1 !== env2);
      assert(env1.attackTime === env2.attackTime);
      assert(env1.decayTime === env2.decayTime);
      assert(env1.sustainLevel === env2.sustainLevel);
      assert(env1.releaseTime === env2.releaseTime);
      assert(env1.attackCurve === env2.attackCurve);
      assert(env1.decayCurve === env2.decayCurve);
      assert(env1.releaseCurve === env2.releaseCurve);
    });
  });
});
