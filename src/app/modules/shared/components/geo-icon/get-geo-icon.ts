import { GeoHazard } from 'src/app/modules/common-core/models';

export function getGeohazardsId(geohazards: GeoHazard[]) {
  return geohazards
    .map((geoHazard) => (geoHazard !== GeoHazard.Soil ? (<string>GeoHazard[geoHazard]).toLowerCase() : 'dirt'))
    .join('-');
}

export function getIconForGeohazards(geohazards: GeoHazard[]) {
  const id = getGeohazardsId(geohazards);
  return `/assets/icon/${id.replace(/-/, '_')}.svg`;
}

// TODO: Flytt / endre navn på fil
