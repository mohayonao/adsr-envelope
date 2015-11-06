export default function constrain(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(value, maxValue));
}
