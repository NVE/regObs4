/**
 * Removes properties that are null or undefined from an object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeNullOrUndefined<T extends Record<string, any>>(obj: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entries: [keyof T, any][] = Object.entries(obj);
  const notEmpty = entries.filter(([, value]) => value != null);
  return Object.fromEntries(notEmpty) as T;
}
