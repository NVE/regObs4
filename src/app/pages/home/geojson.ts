import * as L from 'leaflet';
import { Feature, Point } from 'geojson';
import { AtAGlanceViewModel } from 'src/app/modules/common-regobs-api';
import { RegobsGeoHazardMarker } from 'src/app/modules/map/core/classes/regobs-geohazard-marker';
import { GeoHazard } from 'src/app/modules/common-core/models';

/**
 * Used to draw a marking pin for a registration on the map
 */
export class RegObsGeoJson extends L.GeoJSON {
  constructor(markers) {
    super(markers, {
      pointToLayer: (p, loc) => RegObsGeoJson.pointToLayer(p, loc),
    });
  }

  static pointToLayer(point: Feature<Point, AtAGlanceViewModel>, location: L.LatLng): L.Marker {
    const geoHazardTID = point.properties.GeoHazardTID;
    const geoHazardName = GeoHazard[geoHazardTID];
    return L.marker(location, {
      icon: new RegobsGeoHazardMarker(geoHazardTID),
      alt: geoHazardName,
    }) as L.Marker;
  }
}
