import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { GeoHazard } from '../../models/geo-hazard.enum';

export class MarkerHelper {

  static getGeoHazardSvg(geoHazard: GeoHazard, isSelected?: boolean): PictureMarkerSymbol {
    const geoHazardName = GeoHazard[geoHazard];
    return new PictureMarkerSymbol({
      url: isSelected
        ? `/assets/icon/map/pin-${geoHazardName.toLowerCase()}-outline.svg`
        : `/assets/icon/map/pin-${geoHazardName.toLowerCase()}.svg`,
      width: '36px',
      height: '41px',
      yoffset: '20px',
      xoffset: '3px'
    });
  }
}
