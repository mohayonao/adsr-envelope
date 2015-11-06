import { SET, TYPE, VALUE, TIME } from "./constants";

function reduce(envelope) {
  envelope = envelope.filter((items) => {
    return isFinite(items[TIME]);
  });

  let changed;

  do {
    changed = false;

    if (2 <= envelope.length) {
      let a = envelope[envelope.length - 2];
      let b = envelope[envelope.length - 1];

      if (a[VALUE] === b[VALUE]) {
        envelope.pop();
      }
    }

    for (let i = envelope.length - 2; i >= 0; i--) {
      let a = envelope[i];
      let b = envelope[i + 1];

      if (a[TYPE] === SET) {
        if (b[TYPE] !== SET) {
          if (a[VALUE] === b[VALUE] || a[TIME] === b[TIME]) {
            b[TYPE] = SET;
            changed = true;
          }
        } else if (a[TIME] === b[TIME]) {
          envelope.splice(i, 1);
          changed = true;
        }
      }
    }
  } while (changed && envelope.length);

  return envelope;
}

export default { reduce };
