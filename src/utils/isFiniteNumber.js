export default function isFiniteNumber(value) {
  return typeof value === "number" && isFinite(value);
}
