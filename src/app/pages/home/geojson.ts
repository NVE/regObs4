import * as L from 'leaflet';
import { Feature, Point } from 'geojson';
import { AtAGlanceViewModel } from 'src/app/modules/common-regobs-api';
import { RegobsMarker } from './RegobsMarker';

export class RegObsGeoJson extends L.GeoJSON {
  constructor(markers) {
    super(markers, {
      // onEachFeature: (f, l) => RegObsGeoJson.onEachJSONFeature(f, l),
      pointToLayer: (p, loc) => RegObsGeoJson.pointToLayer(p, loc),
    });
  }

  static pointToLayer(point: Feature<Point, AtAGlanceViewModel>, location: L.LatLng): L.Marker {
    return L.marker(location, {
      icon: RegobsMarker.getIcon(point.properties),
      alt: 'TODO: Naturfare', //point.properties.GeoHazardName,
    }) as L.Marker;
  }
}
