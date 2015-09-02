import linlin from "@mohayonao/utils/linlin";
import linexp from "@mohayonao/utils/linexp";
import { LIN, EXP, TYPE, VALUE, TIME } from "./constants";

function at(envelope, time) {
  for (let i = 0, imax = envelope.length - 1; i < imax; i++) {
    let e0 = envelope[i];
    let e1 = envelope[i + 1];

    if (e0[TIME] <= time && time < e1[TIME]) {
      switch (e1[TYPE]) {
      case LIN:
        return linlin(time, e0[TIME], e1[TIME], e0[VALUE], e1[VALUE]);
      case EXP:
        return linexp(time, e0[TIME], e1[TIME], e0[VALUE], e1[VALUE]);
      default:
        return e0[VALUE];
      }
    }
  }

  return envelope.length ? envelope[envelope.length - 1][VALUE] : 0;
}

export default { at };
