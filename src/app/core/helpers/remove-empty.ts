/**
 * Removes properties that are null or undefined from an object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeEmpty<T extends Record<string, any>>(obj: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entries: [keyof T, any][] = Object.entries(obj);
  const notEmpty = entries
    // Remove null or undefined
    .filter(([, value]) => value != null)
    // Remove empty arrays
    .filter(([, value]) => !(Array.isArray(value) && value.length === 0));
  return Object.fromEntries(notEmpty) as T;
}
