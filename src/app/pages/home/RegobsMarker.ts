import { DivIcon } from 'leaflet';
import { AtAGlanceViewModel } from 'src/app/modules/common-regobs-api';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { IconHelper } from './icon.helper';

export class RegobsMarker {
  // static getIconForMultiple(regs: RegistrationViewModel[]): L.IconOptions {
  //   return null;
  // }

  static getIcon(reg: AtAGlanceViewModel): DivIcon {
    return this.getIconForGeohazard(reg.GeoHazardTID);
  }

  static getIconForGeohazard(geohazard: number): DivIcon {
    if (geohazard === GeoHazard.Ice) {
      return IconHelper.getIceObservationsClusterIcon(1);
    }
    if (geohazard === GeoHazard.Water) {
      return IconHelper.getWaterObservationsClusterIcon(1);
    }
    if (geohazard === GeoHazard.Snow) {
      return IconHelper.getSnowObservationsClusterIcon(1);
    }
    if (geohazard === GeoHazard.Soil) {
      return IconHelper.getSoilObservationsClusterIcon(1);
    }
  }
}
