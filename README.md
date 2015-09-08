# ADSR ENVELOPE
[![Build Status](http://img.shields.io/travis/mohayonao/adsr-envelope.svg?style=flat-square)](https://travis-ci.org/mohayonao/adsr-envelope)
[![NPM Version](http://img.shields.io/npm/v/@mohayonao/adsr-envelope.svg?style=flat-square)](https://www.npmjs.org/package/@mohayonao/adsr-envelope)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> ADSR Envelope

## Installation

Node.js

```sh
npm install @mohayonao/adsr-envelope
```

## ADSR

![ADSREnvelope](https://github.com/mohayonao/adsr-envelope/wiki/images/ADSREnvelope.png)

## API
### ADSREnvelope
- `constructor(opts: object = {})`
  - `attackTime: number` _default: **0.01** (10msec)_
  - `decayTime: number` _default: **0.3** (300msec)_
  - `sustainLevel: number` _default: **0.5**_
  - `releaseTime: number` _default: **1** (1sec)_
  - `gateTime: number` _default: **1** (1sec)_
  - `peakLevel: number` _default: **1**_
  - `epsilon: number` _default: **0.001**_
  - `attackCurve: string` _default: **lin**_
    - **lin** or **exp** (linear or exponential)
  - `decayCurve: string` _default: **lin**_
    - **lin** or **exp** (linear or exponential)
  - `releaseCurve: string` _default: **lin**_
    - **lin** or **exp** (linear or exponential)

#### Instance Attributes
- `duration: number`
- `attackTime: number`
- `decayTime: number`
- `sustainLevel: number`
- `releaseTime: number`
- `gateTime: number`
- `peakLevel: number`
- `epsilon: number`
- `attackCurve: string`
- `decayCurve: string`
- `releaseCurve: string`

#### Instance Methods
- `valueAt(time: number): number`
- `applyTo(audioParam: AudioParam, playbackTime: number): self`
- `getWebAudioAPIMethods(): Array[]`
- `clone(): ADSREnvelope`

## Example

```js
import ADSREnvelope from "@mohayonao/adsr-envelope";

let audioContext = new AudioContext();
let oscillator = audioContext.createOscillator();
let gain = audioContext.createGain();
let adsr = new ADSR({
  attackTime: 0.5,
  decayTime: 0.25,
  sustainLevel: 0.8,
  releaseTime: 2.5,
  gateTime: 6,
  releaseCurve: "exp",
});

adsr.applyTo(gain.gain, audioContext.currentTime);

console.log(adsr.getWebAudioAPIMethods());
// [
//   [ "setValueAtTime", 0, 0 ],
//   [ "linearRampToValueAtTime", 1, 0.5 ],
//   [ "linearRampToValueAtTime", 0.8, 0.75],
//   [ "setValueAtTime", 0.8, 6 ],
//   [ "exponentialRampToValueAtTime", 0.001, 8.5 ],
// ]

oscillator.start(audioContext.currentTime);
oscillator.stop(audioContext.currentTime + adsr.duration);

oscillator.connect(gain);
gain.connect(audioContext.destination);
```

## License
MIT
