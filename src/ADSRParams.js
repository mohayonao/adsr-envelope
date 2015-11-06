import EnvelopeBuilder from "./EnvelopeBuilder";
import EnvelopeValue from "./EnvelopeValue";
import defaultValues from "./defaultValues";
import defaults from "./utils/defaults";
import constrain from "./utils/constrain";
import isFiniteNumber from "./utils/isFiniteNumber";
import { SET, LIN, EXP } from "./constants";

const EPSILON = 2.220446049250313e-16;

export default class ADSRParams {
  constructor(opts = {}) {
    this.attackTime = time(defaults(opts.attackTime, defaultValues.attackTime));
    this.decayTime = time(defaults(opts.decayTime, defaultValues.decayTime));
    this.sustainLevel = level(defaults(opts.sustainLevel, defaultValues.sustainLevel));
    this.releaseTime = time(defaults(opts.releaseTime, defaultValues.releaseTime));
    this.peakLevel = time(defaults(opts.peakLevel, defaultValues.peakLevel));
    this.epsilon = epsilon(defaults(opts.epsilon, defaultValues.epsilon));
    this.attackCurve = curve(defaults(opts.attackCurve, defaultValues.attackCurve));
    this.decayCurve = curve(defaults(opts.decayCurve, defaultValues.decayCurve));
    this.releaseCurve = curve(defaults(opts.releaseCurve, defaultValues.releaseCurve));
    this.gateTime = defaultValues.gateTime;

    if (isFiniteNumber(opts.sustainTime)) {
      this.setSustainTime(opts.sustainTime);
    }
    if (isFiniteNumber(opts.gateTime)) {
      this.setGateTime(opts.gateTime);
    }
    if (isFiniteNumber(opts.duration)) {
      this.setDuration(opts.duration);
    }

    this.update();
  }

  valueAt(time) {
    return EnvelopeValue.at(this.envelope, time);
  }

  methods(playbackTime) {
    return this.envelope.map(([ type, value, time ]) => {
      return [ method(type), value, playbackTime + time ];
    });
  }

  setDuration(value) {
    let duration = time(value);

    this.setGateTime(duration - this.releaseTime);
  }

  setAttackTime(value) {
    this.attackTime = time(value);
    this.update();
  }

  setDecayTime(value) {
    this.decayTime = time(value);
    this.update();
  }

  setSustainTime(value) {
    let sustainTime = time(value);

    this.setGateTime(this.attackTime + this.decayTime + sustainTime);
  }

  setSustainLevel(value) {
    this.sustainLevel = level(value);
    this.update();
  }

  setReleaseTime(value) {
    this.releaseTime = time(value);
    this.update();
  }

  setGateTime(value) {
    this.gateTime = time(value);
    this.update();
  }

  setPeakLevel(value) {
    this.peakLevel = time(value);
    this.update();
  }

  setEpsilon(value) {
    this.epsilon = epsilon(value);
    this.update();
  }

  setAttackCurve(value) {
    this.attackCurve = curve(value);
    this.update();
  }

  setDecayCurve(value) {
    this.decayCurve = curve(value);
    this.update();
  }

  setReleaseCurve(value) {
    this.releaseCurve = curve(value);
    this.update();
  }

  update() {
    this.sustainTime = Math.max(0, this.gateTime - this.attackTime - this.decayTime);
    this.duration = this.gateTime + this.releaseTime;
    this.envelope = EnvelopeBuilder.build(this);
  }
}

function time(value) {
  return Math.max(0, value) || 0;
}

function level(value) {
  return constrain(+value, 0, 1) || 0;
}

function epsilon(value) {
  return constrain(+value, EPSILON, 1e-2) || 1e-3;
}

function curve(type) {
  return type === "exp" ? "exp" : "lin";
}

function method(type) {
  switch (type) {
  case SET:
    return "setValueAtTime";
  case LIN:
    return "linearRampToValueAtTime";
  case EXP:
    return "exponentialRampToValueAtTime";
  default:
    // do nothing
  }
}
