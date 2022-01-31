// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumeric(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function setDecimalPlaces(n: number, decimalPlaces: number): number {
  if (!isNumeric(n) || !(decimalPlaces > 0)) {
    return n;
  }
  return Math.round(((n + Number.EPSILON) * Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces);
}
