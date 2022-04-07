import { AttachmentEditModel } from 'src/app/modules/common-regobs-api';

/**
 * Comparator for list of attachments that can be used with distinctUntilChanged.
 * Only works if the attachment value behind the key property does not change.
 *
 * @param previous Previous list of attachments
 * @param current Current list of attachments
 * @param {string} key 'Id' property used when comparing attachment objects
 */
export function attachmentsComparator<T extends AttachmentEditModel>(
  previous: T[],
  current: T[],
  key: keyof T
): boolean {
  if (previous.length !== current.length) {
    return false;
  }
  const previousIds = previous.map(a => a[key]).sort();
  const currentIds = previous.map(a => a[key]).sort();
  return previousIds.every((id, index) => id == currentIds[index]);
}