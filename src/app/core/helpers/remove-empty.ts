/**
 * Removes properties that are null or undefined from an object.
 */
export function removeNullOrUndefined<T extends Record<string, any>>(obj: T): T {
  const entries: [keyof T, any][] = Object.entries(obj);
  const notEmpty = entries.filter(([, value]) => value != null);
  return Object.fromEntries(notEmpty) as T;
}
