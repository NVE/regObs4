import { inject } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { GeoHelperService } from '../../services/geo-helper/geo-helper.service';
import { rxResource } from '@angular/core/rxjs-interop';

export function getGeohazardsId(geohazards: GeoHazard[]) {
  const sorted = [...geohazards].sort();
  return sorted
    .map((geoHazard) => (geoHazard !== GeoHazard.Soil ? (<string>GeoHazard[geoHazard]).toLowerCase() : 'dirt'))
    .join('-');
}

export function getIconForGeohazards(geohazards: GeoHazard[]) {
  const id = getGeohazardsId(geohazards);
  return `/assets/icon/${id.replace(/-/, '_')}.svg`;
}

export function getNameForGeohazard(geohazards: GeoHazard[]) {
  const helper = inject(GeoHelperService);

  const nameResource = rxResource({
    // request: () => this.geoHazards(),
    loader: () => helper.getName(geohazards),
  });

  return nameResource.value.asReadonly();
}

// TODO: Flytt / endre navn på fil
