
/**
 * Comparator for list of attachments that can be used with distinctUntilChanged
 *
 * @param previous Previous list of attachments
 * @param current Current list of attachments
 * @param {string} key 'Id' property used when comparing attachment objects
 */
export function attachmentsComparator<T>(previous: T[], current: T[], key: keyof T): boolean {
  if (previous.length !== current.length) {
    return false;
  }
  const previousIds = previous.map(a => a[key]).sort();
  const currentIds = previous.map(a => a[key]).sort();
  return previousIds.every((id, index) => id == currentIds[index]);
}