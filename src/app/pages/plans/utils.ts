import { FileSystemEntry } from 'ngx-file-drop';

export function assertIsFileEntry(fileEntry: FileSystemEntry): asserts fileEntry is FileSystemFileEntry {
  if (!fileEntry.isFile) {
    throw new Error('fileEntry is not a file');
  }
}

export function toText(fileEntry: FileSystemFileEntry): Promise<string> {
  return new Promise((resolve, reject) => {
    fileEntry.file((file: File) => {
      file
        .text()
        .then((text) => resolve(text))
        .catch((reason) => reject(reason));
    });
  });
}

export function generateShortRandomId(length = 6) {
  // Generate a random number and convert it to a base-36 string (0-9 and a-z).
  // The substring(2) removes the "0." prefix from the generated string.
  // We then take a substring of the desired length.
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}
