import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

/**
 * TODO: Should we use a map service to show observations instead of using this?
 */
export class RegobsGeoHazardMarker {
  private _selected: boolean;
  private _geoHazard: GeoHazard;

  constructor(geoHazard: GeoHazard, isSelected = false) {
    this._selected = isSelected;
    this._geoHazard = geoHazard;
  }

  static getIconSvg(geoHazard: GeoHazard): PictureMarkerSymbol {
    switch (geoHazard) {
      case GeoHazard.Snow:
        return this.getSvg('snow');
      case GeoHazard.Water:
        return this.getSvg('water');
      case GeoHazard.Dirt:
        return this.getSvg('dirt');
      case GeoHazard.Ice:
        return this.getSvg('ice');
      default:
        return null;
    }
  }

  static getSvg(geohazard: string): PictureMarkerSymbol {
    return new PictureMarkerSymbol({
      url: `/assets/icon/map/pin-${geohazard}.svg`,
      width: '25',
      height: '30'
    });
  }

  redraw() {}

  setGeoHazard(geoHazard: GeoHazard) {
    this._geoHazard = geoHazard;
    this.redraw();
  }

  setSelected(selected: boolean) {
    this._selected = selected;
    this.redraw();
  }
}
