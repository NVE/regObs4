import type { BBox, Feature, Polygon } from 'geojson';
import moment from 'moment';

type XYZ = [number, number, number];

/** Opplysninger om et offlinekart for et begrenset område */
export interface PackageMetadata {
  Name: string;
  LastModified: string; // in UTC
  Urls: string[];
  SizeInMib: number;
}

/** Opplysninger om en sammensatt kartpakke. Består gjerne av både bakgrunnskart og hjelpekart (f.eks. svekket is) */
export interface CompoundPackageMetadata {
  Id: string;
  Xyz: XYZ;
  Bbox: BBox;
  SizeInMib: number;
  Maps: PackageMetadata[];
  ZMax: number;
}

export interface Part {
  name: string;
  url: string;
}

export type CompoundPackageFeature = Feature<Polygon, null>;

export class CompoundPackage {
  static GetNameFromXYZ(x: number, y: number, z: number) {
    return `${x}-${y}-${z}`;
  }

  static GetFeatureId(x: number, y: number, z: number) {
    return CompoundPackage.GetNameFromXYZ(x, y, z);
  }

  private metadata: CompoundPackageMetadata;

  constructor(metadata: CompoundPackageMetadata) {
    this.metadata = metadata;
  }

  getFeature(): CompoundPackageFeature {
    const [xMin, yMin, xMax, yMax] = this.metadata.Bbox;
    return {
      type: 'Feature',
      geometry: {
        bbox: this.metadata.Bbox,
        type: 'Polygon',
        coordinates: [
          [
            [xMin, yMin],
            [xMin, yMax],
            [xMax, yMax],
            [xMax, yMin],
            [xMin, yMin],
          ],
        ],
      },
      properties: null,
      id: CompoundPackage.GetFeatureId(...this.metadata.Xyz),
    };
  }

  getSizeInMiB(): number {
    return this.metadata.SizeInMib;
  }

  getName(): string {
    const [x, y, z] = this.metadata.Xyz;
    return CompoundPackage.GetNameFromXYZ(x, y, z);
  }

  /** Returnerer produksjonstidspunkt for den nyeste pakka. Hvis produksjonstidspunkt mangler, returneres 01.01.1970 00:00 */
  getLastModified(): Date {
    let latestDate = moment(0);
    for (const map of this.metadata.Maps) {
      if (map.LastModified) {
        latestDate = moment.max(latestDate, moment(map.LastModified));
      }
    }
    return latestDate.toDate();
  }

  getParts(): Part[] {
    return (
      this.metadata.Maps
        // Hent name / url for alle pakker
        .map((p) => p.Urls.map((url) => ({ name: p.Name, url })))
        // Flatten array
        .reduce((a, b) => a.concat(b), [])
    );
  }

  getXYZ(): XYZ {
    return this.metadata.Xyz;
  }
}
