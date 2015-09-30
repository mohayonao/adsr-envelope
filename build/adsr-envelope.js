(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ADSREnvelope = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./lib");

},{"./lib":9}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ADSRParams = require("./ADSRParams");

var _ADSRParams2 = _interopRequireDefault(_ADSRParams);

var ADSREnvelope = (function () {
  function ADSREnvelope(opts) {
    _classCallCheck(this, ADSREnvelope);

    this._ = new _ADSRParams2["default"](opts);
  }

  _createClass(ADSREnvelope, [{
    key: "valueAt",
    value: function valueAt() {
      var time = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      return this._.valueAt(time);
    }
  }, {
    key: "applyTo",
    value: function applyTo(audioParam, playbackTime) {
      this.getWebAudioAPIMethods(playbackTime).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var method = _ref2[0];
        var value = _ref2[1];
        var time = _ref2[2];

        audioParam[method](value, time);
      });

      return this;
    }
  }, {
    key: "getWebAudioAPIMethods",
    value: function getWebAudioAPIMethods() {
      var playbackTime = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      return this._.methods(playbackTime);
    }
  }, {
    key: "clone",
    value: function clone() {
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
  }, {
    key: "duration",
    set: function set(value) {
      this._.setDuration(value);
    },
    get: function get() {
      return this._.duration;
    }
  }, {
    key: "attackTime",
    set: function set(value) {
      this._.setAttackTime(value);
    },
    get: function get() {
      return this._.attackTime;
    }
  }, {
    key: "decayTime",
    set: function set(value) {
      this._.setDecayTime(value);
    },
    get: function get() {
      return this._.decayTime;
    }
  }, {
    key: "sustainTime",
    set: function set(value) {
      this._.setSustainTime(value);
    },
    get: function get() {
      return this._.sustainTime;
    }
  }, {
    key: "sustainLevel",
    set: function set(value) {
      this._.setSustainLevel(value);
    },
    get: function get() {
      return this._.sustainLevel;
    }
  }, {
    key: "releaseTime",
    set: function set(value) {
      this._.setReleaseTime(value);
    },
    get: function get() {
      return this._.releaseTime;
    }
  }, {
    key: "gateTime",
    set: function set(value) {
      this._.setGateTime(value);
    },
    get: function get() {
      return this._.gateTime;
    }
  }, {
    key: "peakLevel",
    set: function set(value) {
      this._.setPeakLevel(value);
    },
    get: function get() {
      return this._.peakLevel;
    }
  }, {
    key: "epsilon",
    set: function set(value) {
      this._.setEpsilon(value);
    },
    get: function get() {
      return this._.epsilon;
    }
  }, {
    key: "attackCurve",
    set: function set(value) {
      this._.setAttackCurve(value);
    },
    get: function get() {
      return this._.attackCurve;
    }
  }, {
    key: "decayCurve",
    set: function set(value) {
      this._.setDecayCurve(value);
    },
    get: function get() {
      return this._.decayCurve;
    }
  }, {
    key: "releaseCurve",
    set: function set(value) {
      this._.setReleaseCurve(value);
    },
    get: function get() {
      return this._.releaseCurve;
    }
  }]);

  return ADSREnvelope;
})();

exports["default"] = ADSREnvelope;
module.exports = exports["default"];
},{"./ADSRParams":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _mohayonaoUtilsDefaults = require("@mohayonao/utils/defaults");

var _mohayonaoUtilsDefaults2 = _interopRequireDefault(_mohayonaoUtilsDefaults);

var _mohayonaoUtilsConstrain = require("@mohayonao/utils/constrain");

var _mohayonaoUtilsConstrain2 = _interopRequireDefault(_mohayonaoUtilsConstrain);

var _EnvelopeBuilder = require("./EnvelopeBuilder");

var _EnvelopeBuilder2 = _interopRequireDefault(_EnvelopeBuilder);

var _EnvelopeValue = require("./EnvelopeValue");

var _EnvelopeValue2 = _interopRequireDefault(_EnvelopeValue);

var _defaultValues = require("./defaultValues");

var _defaultValues2 = _interopRequireDefault(_defaultValues);

var _constants = require("./constants");

var EPSILON = 2.220446049250313e-16;

var ADSRParams = (function () {
  function ADSRParams() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ADSRParams);

    this.attackTime = time((0, _mohayonaoUtilsDefaults2["default"])(opts.attackTime, _defaultValues2["default"].attackTime));
    this.decayTime = time((0, _mohayonaoUtilsDefaults2["default"])(opts.decayTime, _defaultValues2["default"].decayTime));
    this.sustainLevel = level((0, _mohayonaoUtilsDefaults2["default"])(opts.sustainLevel, _defaultValues2["default"].sustainLevel));
    this.releaseTime = time((0, _mohayonaoUtilsDefaults2["default"])(opts.releaseTime, _defaultValues2["default"].releaseTime));
    this.peakLevel = time((0, _mohayonaoUtilsDefaults2["default"])(opts.peakLevel, _defaultValues2["default"].peakLevel));
    this.epsilon = epsilon((0, _mohayonaoUtilsDefaults2["default"])(opts.epsilon, _defaultValues2["default"].epsilon));
    this.attackCurve = curve((0, _mohayonaoUtilsDefaults2["default"])(opts.attackCurve, _defaultValues2["default"].attackCurve));
    this.decayCurve = curve((0, _mohayonaoUtilsDefaults2["default"])(opts.decayCurve, _defaultValues2["default"].decayCurve));
    this.releaseCurve = curve((0, _mohayonaoUtilsDefaults2["default"])(opts.releaseCurve, _defaultValues2["default"].releaseCurve));
    this.gateTime = _defaultValues2["default"].gateTime;

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

  _createClass(ADSRParams, [{
    key: "valueAt",
    value: function valueAt(time) {
      return _EnvelopeValue2["default"].at(this.envelope, time);
    }
  }, {
    key: "methods",
    value: function methods(playbackTime) {
      return this.envelope.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var type = _ref2[0];
        var value = _ref2[1];
        var time = _ref2[2];

        return [method(type), value, playbackTime + time];
      });
    }
  }, {
    key: "setDuration",
    value: function setDuration(value) {
      var duration = time(value);

      this.setGateTime(duration - this.releaseTime);
    }
  }, {
    key: "setAttackTime",
    value: function setAttackTime(value) {
      this.attackTime = time(value);
      this.update();
    }
  }, {
    key: "setDecayTime",
    value: function setDecayTime(value) {
      this.decayTime = time(value);
      this.update();
    }
  }, {
    key: "setSustainTime",
    value: function setSustainTime(value) {
      var sustainTime = time(value);

      this.setGateTime(this.attackTime + this.decayTime + sustainTime);
    }
  }, {
    key: "setSustainLevel",
    value: function setSustainLevel(value) {
      this.sustainLevel = level(value);
      this.update();
    }
  }, {
    key: "setReleaseTime",
    value: function setReleaseTime(value) {
      this.releaseTime = time(value);
      this.update();
    }
  }, {
    key: "setGateTime",
    value: function setGateTime(value) {
      this.gateTime = time(value);
      this.update();
    }
  }, {
    key: "setPeakLevel",
    value: function setPeakLevel(value) {
      this.peakLevel = time(value);
      this.update();
    }
  }, {
    key: "setEpsilon",
    value: function setEpsilon(value) {
      this.epsilon = epsilon(value);
      this.update();
    }
  }, {
    key: "setAttackCurve",
    value: function setAttackCurve(value) {
      this.attackCurve = curve(value);
      this.update();
    }
  }, {
    key: "setDecayCurve",
    value: function setDecayCurve(value) {
      this.decayCurve = curve(value);
      this.update();
    }
  }, {
    key: "setReleaseCurve",
    value: function setReleaseCurve(value) {
      this.releaseCurve = curve(value);
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      this.sustainTime = Math.max(0, this.gateTime - this.attackTime - this.decayTime);
      this.duration = this.gateTime + this.releaseTime;
      this.envelope = _EnvelopeBuilder2["default"].build(this);
    }
  }]);

  return ADSRParams;
})();

exports["default"] = ADSRParams;

function isFiniteNumber(value) {
  return typeof value === "number" && isFinite(value);
}

function time(value) {
  return Math.max(0, value) || 0;
}

function level(value) {
  return (0, _mohayonaoUtilsConstrain2["default"])(+value, 0, 1) || 0;
}

function epsilon(value) {
  return (0, _mohayonaoUtilsConstrain2["default"])(+value, EPSILON, 1e-2) || 1e-3;
}

function curve(type) {
  return type === "exp" ? "exp" : "lin";
}

function method(type) {
  switch (type) {
    case _constants.SET:
      return "setValueAtTime";
    case _constants.LIN:
      return "linearRampToValueAtTime";
    case _constants.EXP:
      return "exponentialRampToValueAtTime";
    default:
    // do nothing
  }
}
module.exports = exports["default"];
},{"./EnvelopeBuilder":4,"./EnvelopeValue":6,"./constants":7,"./defaultValues":8,"@mohayonao/utils/constrain":10,"@mohayonao/utils/defaults":11}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoUtilsLinlin = require("@mohayonao/utils/linlin");

var _mohayonaoUtilsLinlin2 = _interopRequireDefault(_mohayonaoUtilsLinlin);

var _mohayonaoUtilsLinexp = require("@mohayonao/utils/linexp");

var _mohayonaoUtilsLinexp2 = _interopRequireDefault(_mohayonaoUtilsLinexp);

var _constants = require("./constants");

var _EnvelopeReducer = require("./EnvelopeReducer");

var _EnvelopeReducer2 = _interopRequireDefault(_EnvelopeReducer);

function build(params) {
  var envelope = buildEnvelope(params);

  envelope = _EnvelopeReducer2["default"].reduce(envelope);

  return envelope;
}

function getCurveItems(curveType, epsilon) {
  if (curveType === "exp") {
    return { zero: epsilon, calc: _mohayonaoUtilsLinexp2["default"], type: _constants.EXP };
  }
  return { zero: 0, calc: _mohayonaoUtilsLinlin2["default"], type: _constants.LIN };
}

function buildEnvelope(params) {
  var attackTime = params.attackTime;
  var decayTime = params.decayTime;
  var gateTime = params.gateTime;
  var releaseTime = params.releaseTime;

  var envType = 0;

  envType += 0 < attackTime ? 4 : 0;
  envType += 0 < decayTime ? 2 : 0;
  envType += 0 < releaseTime ? 1 : 0;

  switch (envType) {
    case 0:
      return buildSustainEnvelope(params);
    case 1:
      return buildSustainReleaseEnvelope(params);
    case 2:
      if (gateTime <= decayTime) {
        return buildDecayEnvelope(params);
      }
      return buildDecaySustainEnvelope(params);
    case 3:
      if (gateTime <= decayTime) {
        return buildDecayReleaseEnvelope(params);
      }
      return buildDecaySustainReleaseEnvelope(params);
    case 4:
      if (gateTime <= attackTime) {
        return buildAttackEnvelope(params);
      }
      return buildAttackSustainEnvelope(params);
    case 5:
      if (gateTime <= attackTime) {
        return buildAttackReleaseEnvelope(params);
      }
      return buildAttackSustainReleaseEnvelope(params);
    case 6:
      if (gateTime <= attackTime) {
        return buildAttackEnvelope(params);
      }
      if (gateTime <= attackTime + decayTime) {
        return buildAttackDecayEnvelope(params);
      }
      return buildAttackDecaySustainEnvelope(params);
    case 7:
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
  var result = [];
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime;
  var v0 = params.sustainLevel * params.peakLevel;
  var v1 = params.sustainLevel * params.peakLevel;
  var v2 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([_constants.SET, v1, t1]);
  result.push([_constants.SET, v2, t2]);

  return result;
}

function buildSustainReleaseEnvelope(params) {
  //
  //
  // ----------*
  //            \
  //             +-------
  // 0         1 2
  var result = [];
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime + params.releaseTime;
  var v0 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  var v1 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  var v2 = r.zero;

  result.push([_constants.SET, v0, t0]);
  result.push([_constants.SET, v1, t1]);
  result.push([r.type, v2, t2]);

  return result;
}

function buildDecaySustainEnvelope(params) {
  // +
  //  \
  //   +-------*
  //           |
  //           +---------
  // 0 1       23
  var result = [];
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.decayTime;
  var t2 = params.gateTime;
  var t3 = params.gateTime;
  var v0 = Math.max(d.zero, params.peakLevel);
  var v1 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v2 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v3 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([d.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);
  result.push([_constants.SET, v3, t3]);

  return result;
}

function buildDecayEnvelope(params) {
  // +
  //  \
  //   *
  //   |
  //   +-----------------
  // 0 12
  var result = [];
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime;
  var v0 = Math.max(d.zero, params.peakLevel);
  var vx = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v1 = d.calc(t1, 0, params.decayTime, v0, vx);
  var v2 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([d.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);

  return result;
}

function buildDecaySustainReleaseEnvelope(params) {
  // +
  //  \
  //   +-------*
  //            \
  //             +-------
  // 0 1       2 3
  var result = [];
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.decayTime;
  var t2 = params.gateTime;
  var t3 = params.gateTime + params.releaseTime;
  var v0 = Math.max(d.zero, r.zero, params.peakLevel);
  var v1 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  var v2 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  var v3 = r.zero;

  result.push([_constants.SET, v0, t0]);
  result.push([d.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);
  result.push([r.type, v3, t3]);

  return result;
}

function buildDecayReleaseEnvelope(params) {
  // +
  //  \
  //   *
  //    \
  //     +---------------
  // 0 1 2
  var result = [];
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime + params.releaseTime;
  var v0 = Math.max(d.zero, r.zero, params.peakLevel);
  var vx = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  var v1 = d.calc(t1, 0, params.decayTime, v0, vx);
  var v2 = Math.max(d.zero, r.zero);

  result.push([_constants.SET, v0, t0]);
  result.push([d.type, v1, t1]);
  result.push([r.type, v2, t2]);

  return result;
}

function buildAttackSustainEnvelope(params) {
  //     +
  //    /|
  //   / +-----*
  //  /        |
  // +         +---------
  // 0   12    34
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.attackTime;
  var t3 = params.gateTime;
  var t4 = params.gateTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, params.peakLevel);
  var v2 = params.sustainLevel * params.peakLevel;
  var v3 = params.sustainLevel * params.peakLevel;
  var v4 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);
  result.push([_constants.SET, v3, t3]);
  result.push([_constants.SET, v4, t4]);

  return result;
}

function buildAttackEnvelope(params) {
  //
  //
  //   *
  //  /|
  // + +-----------------
  // 0 12
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime;
  var v0 = a.zero;
  var vx = Math.max(a.zero, params.peakLevel);
  var v1 = a.calc(t1, 0, params.attackTime, v0, vx);
  var v2 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);

  return result;
}

function buildAttackSustainReleaseEnvelope(params) {
  //     +
  //    /|
  //   / +-----*
  //  /         \
  // +           +-------
  // 0   12    3 4
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.attackTime;
  var t3 = params.gateTime;
  var t4 = params.gateTime + params.releaseTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, params.peakLevel);
  var v2 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  var v3 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  var v4 = r.zero;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);
  result.push([_constants.SET, v3, t3]);
  result.push([r.type, v4, t4]);

  return result;
}

function buildAttackReleaseEnvelope(params) {
  //
  //
  //   *
  //  / \
  // +   +---------------
  // 0 1 2
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime + params.releaseTime;
  var v0 = a.zero;
  var vx = Math.max(a.zero, params.peakLevel);
  var v1 = a.calc(t1, 0, params.attackTime, v0, vx);
  var v2 = r.zero;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([r.type, v2, t2]);

  return result;
}

function buildAttackDecaySustainEnvelope(params) {
  //     +
  //    / \
  //   /   +---*
  //  /        |
  // +         +---------
  // 0   1 2   34
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.attackTime + params.decayTime;
  var t3 = params.gateTime;
  var t4 = params.gateTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, d.zero, params.peakLevel);
  var v2 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v3 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v4 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([d.type, v2, t2]);
  result.push([_constants.SET, v3, t3]);
  result.push([_constants.SET, v4, t4]);

  return result;
}

function buildAttackDecayEnvelope(params) {
  //     +
  //    / \
  //   /   *
  //  /    |
  // +     +-------------
  // 0   1 23
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.gateTime;
  var t3 = params.gateTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, d.zero, params.peakLevel);
  var vx = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v2 = d.calc(t2, params.attackTime, params.attackTime + params.decayTime, v1, vx);
  var v3 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([d.type, v2, t2]);
  result.push([_constants.SET, v3, t3]);

  return result;
}

function buildAttackDecaySustainReleaseEnvelope(params) {
  //     +
  //    / \
  //   /   +---*
  //  /         \
  // +           +-------
  // 0   1 2   3 4
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.attackTime + params.decayTime;
  var t3 = params.gateTime;
  var t4 = params.gateTime + params.releaseTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, d.zero, params.peakLevel);
  var v2 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  var v3 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  var v4 = Math.max(d.zero, r.zero);

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([d.type, v2, t2]);
  result.push([_constants.SET, v3, t3]);
  result.push([r.type, v4, t4]);

  return result;
}

function buildAttackDecayReleaseEnvelope(params) {
  //     +
  //    / \
  //   /   *
  //  /     \
  // +       +-----------
  // 0   1 2 3
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.gateTime;
  var t3 = params.gateTime + params.releaseTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, d.zero, params.peakLevel);
  var vx = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v2 = d.calc(t2, params.attackTime, params.attackTime + params.decayTime, v1, vx);
  var v3 = Math.max(d.zero, r.zero);

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([d.type, v2, t2]);
  result.push([r.type, v3, t3]);

  return result;
}

exports["default"] = { build: build };
module.exports = exports["default"];
},{"./EnvelopeReducer":5,"./constants":7,"@mohayonao/utils/linexp":12,"@mohayonao/utils/linlin":13}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require("./constants");

function reduce(envelope) {
  envelope = envelope.filter(function (items) {
    return isFinite(items[_constants.TIME]);
  });

  var changed = undefined;

  do {
    changed = false;

    if (2 <= envelope.length) {
      var a = envelope[envelope.length - 2];
      var b = envelope[envelope.length - 1];

      if (a[_constants.VALUE] === b[_constants.VALUE]) {
        envelope.pop();
      }
    }

    for (var i = envelope.length - 2; i >= 0; i--) {
      var a = envelope[i];
      var b = envelope[i + 1];

      if (a[_constants.TYPE] === _constants.SET) {
        if (b[_constants.TYPE] !== _constants.SET) {
          if (a[_constants.VALUE] === b[_constants.VALUE] || a[_constants.TIME] === b[_constants.TIME]) {
            b[_constants.TYPE] = _constants.SET;
            changed = true;
          }
        } else if (a[_constants.TIME] === b[_constants.TIME]) {
          envelope.splice(i, 1);
          changed = true;
        }
      }
    }
  } while (changed && envelope.length);

  return envelope;
}

exports["default"] = { reduce: reduce };
module.exports = exports["default"];
},{"./constants":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoUtilsLinlin = require("@mohayonao/utils/linlin");

var _mohayonaoUtilsLinlin2 = _interopRequireDefault(_mohayonaoUtilsLinlin);

var _mohayonaoUtilsLinexp = require("@mohayonao/utils/linexp");

var _mohayonaoUtilsLinexp2 = _interopRequireDefault(_mohayonaoUtilsLinexp);

var _constants = require("./constants");

function at(envelope, time) {
  for (var i = 0, imax = envelope.length - 1; i < imax; i++) {
    var e0 = envelope[i];
    var e1 = envelope[i + 1];

    if (e0[_constants.TIME] <= time && time < e1[_constants.TIME]) {
      switch (e1[_constants.TYPE]) {
        case _constants.LIN:
          return (0, _mohayonaoUtilsLinlin2["default"])(time, e0[_constants.TIME], e1[_constants.TIME], e0[_constants.VALUE], e1[_constants.VALUE]);
        case _constants.EXP:
          return (0, _mohayonaoUtilsLinexp2["default"])(time, e0[_constants.TIME], e1[_constants.TIME], e0[_constants.VALUE], e1[_constants.VALUE]);
        default:
          return e0[_constants.VALUE];
      }
    }
  }

  return envelope.length ? envelope[envelope.length - 1][_constants.VALUE] : 0;
}

exports["default"] = { at: at };
module.exports = exports["default"];
},{"./constants":7,"@mohayonao/utils/linexp":12,"@mohayonao/utils/linlin":13}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET = 0;
exports.SET = SET;
var LIN = 1;
exports.LIN = LIN;
var EXP = 2;

exports.EXP = EXP;
var TYPE = 0;
exports.TYPE = TYPE;
var VALUE = 1;
exports.VALUE = VALUE;
var TIME = 2;
exports.TIME = TIME;
},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  attackTime: 0.01,
  decayTime: 0.3,
  sustainLevel: 0.5,
  releaseTime: 1,
  gateTime: 1,
  peakLevel: 1,
  epsilon: 1e-3,
  attackCurve: "lin",
  decayCurve: "lin",
  releaseCurve: "lin"
};
module.exports = exports["default"];
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ADSREnvelope = require("./ADSREnvelope");

var _ADSREnvelope2 = _interopRequireDefault(_ADSREnvelope);

exports["default"] = _ADSREnvelope2["default"];
module.exports = exports["default"];
},{"./ADSREnvelope":2}],10:[function(require,module,exports){
module.exports = function(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(value, maxValue));
};

},{}],11:[function(require,module,exports){
module.exports = function(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
};

},{}],12:[function(require,module,exports){
module.exports = function(value, inMin, inMax, outMin, outMax) {
  return Math.pow(outMax / outMin, (value - inMin) / (inMax - inMin)) * outMin;
};

},{}],13:[function(require,module,exports){
module.exports = function(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
};

},{}]},{},[1])(1)
});