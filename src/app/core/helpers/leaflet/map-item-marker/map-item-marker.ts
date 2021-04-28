import { MapItem } from '../../../models/map-item.model';
import { Point } from '@arcgis/core/geometry';
import Graphic from '@arcgis/core/Graphic';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

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
    //TODO: Fix svg icon instead og using the tmp symbol below
    // this.symbol = new RegobsGeoHazardMarker(
    //   this._item.GeoHazardTID,
    //   this._isSelected
    // );
    const outline = this.isSelected
      ? new SimpleLineSymbol({ color: 'black', width: 2 })
      : null;
    this.symbol = new SimpleMarkerSymbol({
      color: '#ee7b04',
      outline: outline
    });
  }
}
