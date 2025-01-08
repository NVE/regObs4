/**
 * Usage:
 *
 * const stringified = JSON.stringify(circularReference, getCircularReplacer());
 *
 * Created by Klesun, copied from https://stackoverflow.com/a/53731154
 * License: https://creativecommons.org/licenses/by-sa/4.0/
 */
export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        // return '[Circular]';
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
