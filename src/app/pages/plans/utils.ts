import { FileSystemEntry } from 'ngx-file-drop';
import { toGeoJSON as gpxToGeoJSON } from './gpx';
import { FeatureCollection } from 'geojson';
import { check } from '@placemarkio/check-geojson';

export function assertIsFileEntry(fileEntry: FileSystemEntry): asserts fileEntry is FileSystemFileEntry {
  if (!fileEntry.isFile) {
    throw new Error('fileEntry is not a file');
  }
}

export function isGpxFile(fileEntry: FileSystemEntry): boolean {
  return fileEntry.name.toLowerCase().endsWith('.gpx');
}

function isGeoJSONFile(fileEntry: FileSystemEntry): boolean {
  return fileEntry.name.toLowerCase().endsWith('.geojson') || fileEntry.name.toLowerCase().endsWith('.json');
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

// leser en GPX- eller GeoJSON-fil og returnerer et GeoJSON-objekt
export async function toGeoJSON(fileEntry: FileSystemEntry): Promise<FeatureCollection> {
  assertIsFileEntry(fileEntry);
  if (isGpxFile(fileEntry)) {
    return await gpxToGeoJSON(fileEntry);
  }
  if (isGeoJSONFile(fileEntry)) {
    const fileContent = await toText(fileEntry);
    return check(fileContent) as FeatureCollection; // hvis denne blir for kresen, kan vi prøve scavenge i stedet
  }
  throw new Error('Unsupported file type. Only GPX and GeoJSON files are supported.');
}
