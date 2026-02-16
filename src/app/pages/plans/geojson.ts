import { Feature, FeatureCollection, GeoJsonProperties, Geometry, GeometryCollection } from 'geojson';
import { cleanCoords } from '@turf/clean-coords';
import { length } from '@turf/turf';
import { truncate } from '@turf/truncate';

const propertiesToKeep = ['beskrivelse', 'terrengklasse', 'navn'];

/**
 * Beholder kun tillatte properties fra hver feature.
 * Denne endrer objektet som sendes inn.
 */
function removeProperties(fc: FeatureCollection) {
  for (const feature of fc.features) {
    const keptProperties: GeoJsonProperties = {};

    if (feature.properties) {
      for (const key of propertiesToKeep) {
        if (Object.hasOwn(feature.properties, key)) {
          keptProperties[key] = feature.properties[key];
        }
      }
    }

    feature.properties = keptProperties;
  }
}

function isGeometryCollection(geometry: Geometry): geometry is GeometryCollection {
  return geometry.type === 'GeometryCollection';
}

/**
 * Fjerner eventuelle unødvendige koordinatpar fra geometriene.
 */
function cleanCoordinates(geometry: Geometry) {
  if (isGeometryCollection(geometry)) {
    for (const g of geometry.geometries) {
      cleanCoordinates(g);
    }
  } else {
    cleanCoords(geometry, { mutate: true });
  }
}

/**
 * Fjerner unødvendige koordinater/desimaler og egenskaper.
 * Endrer objektet som sendes inn (dette er raskest).
 */
export function cleanFeatureCollection(
  fc: FeatureCollection,
  errClb: (error: unknown, feature: Feature<Geometry, GeoJsonProperties>) => void
) {
  // NB: coordinates: 2 fjerner høydekoordinat.
  // Vi bruker ikke høyde til noe enda, derfor fjernes den.
  // Tror ikke vi kan anta at alle importerte geojson / gpx har høyde, tenker derfor det er like greit å fjerne den.
  truncate(fc, { mutate: true, precision: 6, coordinates: 2 });
  for (const feature of fc.features) {
    try {
      cleanCoordinates(feature.geometry);
    } catch (error) {
      errClb(error, feature);
    }
  }
  removeProperties(fc);
}

/**
 * Kalkulerer lengden av LineString features i et GeoJSON objekt
 * @param geojson
 * @returns lengde i kilometer
 */
export function calculateLengthKm(geojson: Feature<Geometry, GeoJsonProperties>[]): number {
  return geojson.reduce((sum, feature) => sum + length(feature), 0);
}
