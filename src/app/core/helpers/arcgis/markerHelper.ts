import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { GeoHazard } from '../../models/geo-hazard.enum';

export class MarkerHelper {
  static getIconSvg(
    geoHazard: GeoHazard,
    isSelected?: boolean
  ): PictureMarkerSymbol {
    switch (geoHazard) {
      case GeoHazard.Snow:
        return this.getSvg('snow', isSelected);
      case GeoHazard.Water:
        return this.getSvg('water', isSelected);
      case GeoHazard.Dirt:
        return this.getSvg('dirt', isSelected);
      case GeoHazard.Ice:
        return this.getSvg('ice', isSelected);
      default:
        return null;
    }
  }

  static getSvg(geohazard: string, isSelected?: boolean): PictureMarkerSymbol {
    return new PictureMarkerSymbol({
      url: isSelected
        ? `/assets/icon/map/pin-${geohazard}-outline.svg`
        : `/assets/icon/map/pin-${geohazard}.svg`,
      width: '36px',
      height: '41px',
      yoffset: '20px',
      xoffset: '3px'
    });
  }
}
