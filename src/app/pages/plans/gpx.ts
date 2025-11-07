import { FileSystemEntry } from 'ngx-file-drop';
import { assertIsFileEntry, toText } from './utils';
import { gpx } from '@tmcw/togeojson';

function assertIsGpxFile(fileEntry: FileSystemEntry): asserts fileEntry is FileSystemFileEntry {
  assertIsFileEntry(fileEntry);
  if (!fileEntry.name.toLowerCase().endsWith('.gpx')) {
    throw new Error('fileEntry is not GPX file');
  }
}

export async function toGeoJSON(fileEntry: FileSystemEntry) {
  assertIsGpxFile(fileEntry);
  const text = await toText(fileEntry);
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'application/xml');
  const geojson = gpx(xml);
  return geojson;
}
