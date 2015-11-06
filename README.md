# ADSR ENVELOPE
[![Build Status](http://img.shields.io/travis/mohayonao/adsr-envelope.svg?style=flat-square)](https://travis-ci.org/mohayonao/adsr-envelope)
[![NPM Version](http://img.shields.io/npm/v/adsr-envelope.svg?style=flat-square)](https://www.npmjs.org/package/adsr-envelope)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> ADSR Envelope

## Installation

Node.js

```sh
npm install adsr-envelope
```

## Online Demo
- http://mohayonao.github.io/adsr-envelope/

## ADSR

![ADSREnvelope](https://github.com/mohayonao/adsr-envelope/wiki/images/ADSREnvelope.png)

## API
### ADSREnvelope
- `constructor(opts: object = {})`
  - `attackTime: number` _default: **0.01** (10msec)_
  - `decayTime: number` _default: **0.3** (300msec)_
  - `sustainLevel: number` _default: **0.5**_
  - `releaseTime: number` _default: **1** (1sec)_
  - `gateTime: number` _default: **Infinity**_
  - `sustainTime: number`
  - `duration: number`
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
- `sustainTime: number`
- `sustainLevel: number`
- `releaseTime: number`
- `gateTime: number`
- `peakLevel: number`
- `epsilon: number`
- `attackCurve: string`
- `decayCurve: string`
- `releaseCurve: string`

#### Instance Methods
- `valueAt(time: number = 0): number`
- `applyTo(audioParam: AudioParam, playbackTime: number = 0): self`
- `getWebAudioAPIMethods(playbackTime: number = 0): Array[]`
- `clone(): ADSREnvelope`

## Example
### sequencer style

```js
import ADSREnvelope from "adsr-envelope";

let audioContext = new AudioContext();
let oscillator = audioContext.createOscillator();
let gain = audioContext.createGain();
let adsr = new ADSREnvelope({
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

### noteOn / noteOff style

```js
import ADSREnvelope from "adsr-envelope";

let audioContext = new AudioContext();
let adsr = new ADSREnvelope({
  attackTime: 0.5,
  decayTime: 0.25,
  sustainLevel: 0.8,
  releaseTime: 2.5,
  gateTime: 6,
  releaseCurve: "exp",
});
let noteMap = {};

class Note {
  constructor(audioContext, noteNumber, envelope) {
    this.audioContext = audioContext;
    this.noteNumber = noteNumber;
    this.envelope = envelope;
    this.startTime = 0;
    this.oscillator = audioContext.createOscillator();
    this.gain = audioContext.createGain();

    this.oscillator.frequency.value = midicps(noteNumber);
    this.oscillator.onended = () => {
      this.oscillator.disconnect();
      this.gain.disconnect();
    };

    this.oscillator.connect(this.gain);
    this.gain.connect(audioContext.destination);
  }

  noteOn(playbackTime = this.audioContext.currentTime) {
    this.startTime = playbackTime;
    this.envelope.gateTime = Infinity;
    this.envelope.applyTo(this.gain.gain, playbackTime);
    this.oscillator.start(playbackTime);
  }

  noteOff(playbackTime = this.audioContext.currentTime) {
    this.gain.gain.cancelScheduledValues(this.startTime);

    this.envelope.gateTime = playbackTime - this.startTime;
    this.envelope.applyTo(this.gain.gain, this.startTime);

    this.oscillator.stop(this.startTime + this.envelope.duration);
  }
}

midiKeyboard.on("noteOn", ({ noteNumber }) => {
  if (noteMap[noteNumber]) {
    noteMap[noteNumber].noteOff();
  }

  noteMap[noteNumber] = new Note(audioContext, noteNumber, adsr.clone());
  noteMap[noteNumber].noteOn();
});
midiKeyboard.on("noteOff", ({ noteNumber }) => {
  if (noteMap[noteNumber]) {
    noteMap[noteNumber].noteOff();
  }
  noteMap[noteNumber] = null;
});
```

## License
MIT
