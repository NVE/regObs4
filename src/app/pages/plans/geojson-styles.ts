import L from 'leaflet';

/**
 * Default stil for GeoJSON-linjer
 */
export const defaultGeoJsonLineStyle: L.PathOptions = {
  dashArray: '4',
  color: 'red',
  stroke: true,
  weight: 3,
};

/**
 * Stil for hoveret GeoJSON-linjer
 */
export const hoverGeoJsonLineStyle: L.PathOptions = {
  ...defaultGeoJsonLineStyle,
  weight: 5,
  dashArray: '7',
};

/**
 * Stil for markerte/highlighted GeoJSON-linjer
 */
export const highlightedGeoJsonLineStyle: L.PathOptions = {
  ...defaultGeoJsonLineStyle,
  weight: 5,
  dashArray: '7',
};

/**
 * Style-funksjon for GeoJSON features
 * Returnerer riktig stil basert på geometry type
 */
export function getGeoJsonFeatureStyle(feature?: GeoJSON.Feature): L.PathOptions {
  if (!feature) {
    return defaultGeoJsonLineStyle;
  }

  switch (feature.geometry.type) {
    case 'Point':
    case 'MultiPoint':
      return {};
    default:
      return defaultGeoJsonLineStyle;
  }
}

/**
 * Oppretter en punkt-marker for GeoJSON Point features
 */
export function createGeoJsonPointMarker(latlng: L.LatLng): L.CircleMarker {
  return L.circleMarker(latlng, {
    stroke: false,
    radius: 5,
    fillColor: 'red',
    weight: 1,
    opacity: 1,
    fillOpacity: 1,
  });
}

/**
 * Highlight-stil for Point features
 */
export const highlightedPointStyle: L.PathOptions = {
  stroke: true,
  color: 'red',
  weight: 6,
};
