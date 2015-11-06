import EnvelopeReducer from "./EnvelopeReducer";
import linlin from "./utils/linlin";
import linexp from "./utils/linexp";
import { SET, LIN, EXP } from "./constants";

function build(params) {
  let envelope = buildEnvelope(params);

  envelope = EnvelopeReducer.reduce(envelope);

  return envelope;
}

function getCurveItems(curveType, epsilon) {
  if (curveType === "exp") {
    return { zero: epsilon, calc: linexp, type: EXP };
  }
  return { zero: 0, calc: linlin, type: LIN };
}

function buildEnvelope(params) {
  let { attackTime, decayTime, gateTime, releaseTime } = params;
  let envType = 0;

  envType += 0 < attackTime ? 0b100 : 0;
  envType += 0 < decayTime ? 0b010 : 0;
  envType += 0 < releaseTime ? 0b001 : 0;

  switch (envType) {
  case 0b000:
    return buildSustainEnvelope(params);
  case 0b001:
    return buildSustainReleaseEnvelope(params);
  case 0b010:
    if (gateTime <= decayTime) {
      return buildDecayEnvelope(params);
    }
    return buildDecaySustainEnvelope(params);
  case 0b011:
    if (gateTime <= decayTime) {
      return buildDecayReleaseEnvelope(params);
    }
    return buildDecaySustainReleaseEnvelope(params);
  case 0b100:
    if (gateTime <= attackTime) {
      return buildAttackEnvelope(params);
    }
    return buildAttackSustainEnvelope(params);
  case 0b101:
    if (gateTime <= attackTime) {
      return buildAttackReleaseEnvelope(params);
    }
    return buildAttackSustainReleaseEnvelope(params);
  case 0b110:
    if (gateTime <= attackTime) {
      return buildAttackEnvelope(params);
    }
    if (gateTime <= attackTime + decayTime) {
      return buildAttackDecayEnvelope(params);
    }
    return buildAttackDecaySustainEnvelope(params);
  case 0b111:
    if (gateTime <= attackTime) {
      return buildAttackReleaseEnvelope(params);
    }
    if (gateTime <= attackTime + decayTime) {
      return buildAttackDecayReleaseEnvelope(params);
    }
    return buildAttackDecaySustainReleaseEnvelope(params);
  default:
    // do nothing
  }
}

function buildSustainEnvelope(params) {
  //
  //
  // ----------*
  //           |
  //           +---------
  // 0         12
  //
  let result = [];
  let t0 = 0;
  let t1 = params.gateTime;
  let t2 = params.gateTime;
  let v0 = params.sustainLevel * params.peakLevel;
  let v1 = params.sustainLevel * params.peakLevel;
  let v2 = 0;

  result.push([ SET, v0, t0 ]);
  result.push([ SET, v1, t1 ]);
  result.push([ SET, v2, t2 ]);

  return result;
}

function buildSustainReleaseEnvelope(params) {
  //
  //
  // ----------*
  //            \
  //             +-------
  // 0         1 2
  let result = [];
  let r = getCurveItems(params.releaseCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.gateTime;
  let t2 = params.gateTime + params.releaseTime;
  let v0 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  let v1 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  let v2 = r.zero;

  result.push([ SET, v0, t0 ]);
  result.push([ SET, v1, t1 ]);
  result.push([ r.type, v2, t2 ]);

  return result;
}

function buildDecaySustainEnvelope(params) {
  // +
  //  \
  //   +-------*
  //           |
  //           +---------
  // 0 1       23
  let result = [];
  let d = getCurveItems(params.decayCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.decayTime;
  let t2 = params.gateTime;
  let t3 = params.gateTime;
  let v0 = Math.max(d.zero, params.peakLevel);
  let v1 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  let v2 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  let v3 = 0;

  result.push([ SET, v0, t0 ]);
  result.push([ d.type, v1, t1 ]);
  result.push([ SET, v2, t2 ]);
  result.push([ SET, v3, t3 ]);

  return result;
}

function buildDecayEnvelope(params) {
  // +
  //  \
  //   *
  //   |
  //   +-----------------
  // 0 12
  let result = [];
  let d = getCurveItems(params.decayCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.gateTime;
  let t2 = params.gateTime;
  let v0 = Math.max(d.zero, params.peakLevel);
  let vx = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  let v1 = d.calc(t1, 0, params.decayTime, v0, vx);
  let v2 = 0;

  result.push([ SET, v0, t0 ]);
  result.push([ d.type, v1, t1 ]);
  result.push([ SET, v2, t2 ]);

  return result;
}

function buildDecaySustainReleaseEnvelope(params) {
  // +
  //  \
  //   +-------*
  //            \
  //             +-------
  // 0 1       2 3
  let result = [];
  let d = getCurveItems(params.decayCurve, params.epsilon);
  let r = getCurveItems(params.releaseCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.decayTime;
  let t2 = params.gateTime;
  let t3 = params.gateTime + params.releaseTime;
  let v0 = Math.max(d.zero, r.zero, params.peakLevel);
  let v1 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  let v2 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  let v3 = r.zero;

  result.push([ SET, v0, t0 ]);
  result.push([ d.type, v1, t1 ]);
  result.push([ SET, v2, t2 ]);
  result.push([ r.type, v3, t3 ]);

  return result;
}

function buildDecayReleaseEnvelope(params) {
  // +
  //  \
  //   *
  //    \
  //     +---------------
  // 0 1 2
  let result = [];
  let d = getCurveItems(params.decayCurve, params.epsilon);
  let r = getCurveItems(params.releaseCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.gateTime;
  let t2 = params.gateTime + params.releaseTime;
  let v0 = Math.max(d.zero, r.zero, params.peakLevel);
  let vx = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  let v1 = d.calc(t1, 0, params.decayTime, v0, vx);
  let v2 = Math.max(d.zero, r.zero);

  result.push([ SET, v0, t0 ]);
  result.push([ d.type, v1, t1 ]);
  result.push([ r.type, v2, t2 ]);

  return result;
}

function buildAttackSustainEnvelope(params) {
  //     +
  //    /|
  //   / +-----*
  //  /        |
  // +         +---------
  // 0   12    34
  let result = [];
  let a = getCurveItems(params.attackCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.attackTime;
  let t2 = params.attackTime;
  let t3 = params.gateTime;
  let t4 = params.gateTime;
  let v0 = a.zero;
  let v1 = Math.max(a.zero, params.peakLevel);
  let v2 = params.sustainLevel * params.peakLevel;
  let v3 = params.sustainLevel * params.peakLevel;
  let v4 = 0;

  result.push([ SET, v0, t0 ]);
  result.push([ a.type, v1, t1 ]);
  result.push([ SET, v2, t2 ]);
  result.push([ SET, v3, t3 ]);
  result.push([ SET, v4, t4 ]);

  return result;
}

function buildAttackEnvelope(params) {
  //
  //
  //   *
  //  /|
  // + +-----------------
  // 0 12
  let result = [];
  let a = getCurveItems(params.attackCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.gateTime;
  let t2 = params.gateTime;
  let v0 = a.zero;
  let vx = Math.max(a.zero, params.peakLevel);
  let v1 = a.calc(t1, 0, params.attackTime, v0, vx);
  let v2 = 0;

  result.push([ SET, v0, t0 ]);
  result.push([ a.type, v1, t1 ]);
  result.push([ SET, v2, t2 ]);

  return result;
}

function buildAttackSustainReleaseEnvelope(params) {
  //     +
  //    /|
  //   / +-----*
  //  /         \
  // +           +-------
  // 0   12    3 4
  let result = [];
  let a = getCurveItems(params.attackCurve, params.epsilon);
  let r = getCurveItems(params.releaseCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.attackTime;
  let t2 = params.attackTime;
  let t3 = params.gateTime;
  let t4 = params.gateTime + params.releaseTime;
  let v0 = a.zero;
  let v1 = Math.max(a.zero, params.peakLevel);
  let v2 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  let v3 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  let v4 = r.zero;

  result.push([ SET, v0, t0 ]);
  result.push([ a.type, v1, t1 ]);
  result.push([ SET, v2, t2 ]);
  result.push([ SET, v3, t3 ]);
  result.push([ r.type, v4, t4 ]);

  return result;
}

function buildAttackReleaseEnvelope(params) {
  //
  //
  //   *
  //  / \
  // +   +---------------
  // 0 1 2
  let result = [];
  let a = getCurveItems(params.attackCurve, params.epsilon);
  let r = getCurveItems(params.releaseCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.gateTime;
  let t2 = params.gateTime + params.releaseTime;
  let v0 = a.zero;
  let vx = Math.max(a.zero, params.peakLevel);
  let v1 = a.calc(t1, 0, params.attackTime, v0, vx);
  let v2 = r.zero;

  result.push([ SET, v0, t0 ]);
  result.push([ a.type, v1, t1 ]);
  result.push([ r.type, v2, t2 ]);

  return result;
}

function buildAttackDecaySustainEnvelope(params) {
  //     +
  //    / \
  //   /   +---*
  //  /        |
  // +         +---------
  // 0   1 2   34
  let result = [];
  let a = getCurveItems(params.attackCurve, params.epsilon);
  let d = getCurveItems(params.decayCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.attackTime;
  let t2 = params.attackTime + params.decayTime;
  let t3 = params.gateTime;
  let t4 = params.gateTime;
  let v0 = a.zero;
  let v1 = Math.max(a.zero, d.zero, params.peakLevel);
  let v2 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  let v3 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  let v4 = 0;

  result.push([ SET, v0, t0 ]);
  result.push([ a.type, v1, t1 ]);
  result.push([ d.type, v2, t2 ]);
  result.push([ SET, v3, t3 ]);
  result.push([ SET, v4, t4 ]);

  return result;
}

function buildAttackDecayEnvelope(params) {
  //     +
  //    / \
  //   /   *
  //  /    |
  // +     +-------------
  // 0   1 23
  let result = [];
  let a = getCurveItems(params.attackCurve, params.epsilon);
  let d = getCurveItems(params.decayCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.attackTime;
  let t2 = params.gateTime;
  let t3 = params.gateTime;
  let v0 = a.zero;
  let v1 = Math.max(a.zero, d.zero, params.peakLevel);
  let vx = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  let v2 = d.calc(t2, params.attackTime, params.attackTime + params.decayTime, v1, vx);
  let v3 = 0;

  result.push([ SET, v0, t0 ]);
  result.push([ a.type, v1, t1 ]);
  result.push([ d.type, v2, t2 ]);
  result.push([ SET, v3, t3 ]);

  return result;
}

function buildAttackDecaySustainReleaseEnvelope(params) {
  //     +
  //    / \
  //   /   +---*
  //  /         \
  // +           +-------
  // 0   1 2   3 4
  let result = [];
  let a = getCurveItems(params.attackCurve, params.epsilon);
  let d = getCurveItems(params.decayCurve, params.epsilon);
  let r = getCurveItems(params.releaseCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.attackTime;
  let t2 = params.attackTime + params.decayTime;
  let t3 = params.gateTime;
  let t4 = params.gateTime + params.releaseTime;
  let v0 = a.zero;
  let v1 = Math.max(a.zero, d.zero, params.peakLevel);
  let v2 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  let v3 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  let v4 = Math.max(d.zero, r.zero);

  result.push([ SET, v0, t0 ]);
  result.push([ a.type, v1, t1 ]);
  result.push([ d.type, v2, t2 ]);
  result.push([ SET, v3, t3 ]);
  result.push([ r.type, v4, t4 ]);

  return result;
}

function buildAttackDecayReleaseEnvelope(params) {
  //     +
  //    / \
  //   /   *
  //  /     \
  // +       +-----------
  // 0   1 2 3
  let result = [];
  let a = getCurveItems(params.attackCurve, params.epsilon);
  let d = getCurveItems(params.decayCurve, params.epsilon);
  let r = getCurveItems(params.releaseCurve, params.epsilon);
  let t0 = 0;
  let t1 = params.attackTime;
  let t2 = params.gateTime;
  let t3 = params.gateTime + params.releaseTime;
  let v0 = a.zero;
  let v1 = Math.max(a.zero, d.zero, params.peakLevel);
  let vx = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  let v2 = d.calc(t2, params.attackTime, params.attackTime + params.decayTime, v1, vx);
  let v3 = Math.max(d.zero, r.zero);

  result.push([ SET, v0, t0 ]);
  result.push([ a.type, v1, t1 ]);
  result.push([ d.type, v2, t2 ]);
  result.push([ r.type, v3, t3 ]);

  return result;
}

export default { build };
