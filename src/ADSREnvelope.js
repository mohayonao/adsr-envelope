import ADSRParams from "./ADSRParams";

export default class ADSREnvelope {
  constructor(opts) {
    this._ = new ADSRParams(opts);
  }

  set duration(value) {
    this._.setDuration(value);
  }

  get duration() {
    return this._.duration;
  }

  set attackTime(value) {
    this._.setAttackTime(value);
  }

  get attackTime() {
    return this._.attackTime;
  }

  set decayTime(value) {
    this._.setDecayTime(value);
  }

  get decayTime() {
    return this._.decayTime;
  }

  set sustainTime(value) {
    this._.setSustainTime(value);
  }

  get sustainTime() {
    return this._.sustainTime;
  }

  set sustainLevel(value) {
    this._.setSustainLevel(value);
  }

  get sustainLevel() {
    return this._.sustainLevel;
  }

  set releaseTime(value) {
    this._.setReleaseTime(value);
  }

  get releaseTime() {
    return this._.releaseTime;
  }

  set gateTime(value) {
    this._.setGateTime(value);
  }

  get gateTime() {
    return this._.gateTime;
  }

  set peakLevel(value) {
    this._.setPeakLevel(value);
  }

  get peakLevel() {
    return this._.peakLevel;
  }

  set epsilon(value) {
    this._.setEpsilon(value);
  }

  get epsilon() {
    return this._.epsilon;
  }

  set attackCurve(value) {
    this._.setAttackCurve(value);
  }

  get attackCurve() {
    return this._.attackCurve;
  }

  set decayCurve(value) {
    this._.setDecayCurve(value);
  }

  get decayCurve() {
    return this._.decayCurve;
  }

  set releaseCurve(value) {
    this._.setReleaseCurve(value);
  }

  get releaseCurve() {
    return this._.releaseCurve;
  }

  valueAt(time = 0) {
    return this._.valueAt(time);
  }

  applyTo(audioParam, playbackTime) {
    this.getWebAudioAPIMethods(playbackTime).forEach(([ method, value, time ]) => {
      audioParam[method](value, time);
    });

    return this;
  }

  getWebAudioAPIMethods(playbackTime = 0) {
    return this._.methods(playbackTime);
  }

  clone() {
    return new ADSREnvelope({
      attackTime: this._.attackTime,
      decayTime: this._.decayTime,
      sustainLevel: this._.sustainLevel,
      releaseTime: this._.releaseTime,
      gateTime: this._.gateTime,
      peakLevel: this._.peakLevel,
      epsilon: this._.epsilon,
      attackCurve: this._.attackCurve,
      decayCurve: this._.decayCurve,
      releaseCurve: this._.releaseCurve
    });
  }
}
