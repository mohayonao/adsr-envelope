import assert from "power-assert";
import index from "../src";
import ADSREnvelope from "../src/ADSREnvelope";

describe("index", () => {
  it("exports", () => {
    assert(index === ADSREnvelope);
  });
});
