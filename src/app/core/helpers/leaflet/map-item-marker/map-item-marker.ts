import { MapItem } from '../../../models/map-item.model';
import { Point } from '@arcgis/core/geometry';
import Graphic from '@arcgis/core/Graphic';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { GeoHazard } from '../../../models/geo-hazard.enum';

/**
 * An icon representation of an observation location. Use this to show obserations on the map
 */
export class MapItemMarker extends Graphic {
  private _item: MapItem;
  private _isSelected: boolean;

  get item(): MapItem {
    return { ...this._item };
  }

  get id(): number {
    return this._item.RegID;
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  constructor(regObservation: MapItem) {
    super();
    this.geometry = new Point({
      latitude: regObservation.ObsLocation.Latitude,
      longitude: regObservation.ObsLocation.Longitude
    });
    this._item = regObservation;
    this.updateIcon();
  }

  setSelected(): void {
    this._isSelected = true;
    this.updateIcon();
  }

  deselect(): void {
    this._isSelected = false;
    this.updateIcon();
  }

  private updateIcon() {
    this.symbol = this.getIconSvg(this._item.GeoHazardTID, this._isSelected);
  }

  private getSvg(geohazard: string, isSelected: boolean): PictureMarkerSymbol {
    return new PictureMarkerSymbol({
      url: isSelected
        ? `/assets/icon/map/pin-${geohazard}-outline.svg`
        : `/assets/icon/map/pin-${geohazard}.svg`,
      width: '27',
      height: '30',
      yoffset: 15
    });
  }

  private getIconSvg(
    geoHazard: GeoHazard,
    isSelected: boolean
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
}
