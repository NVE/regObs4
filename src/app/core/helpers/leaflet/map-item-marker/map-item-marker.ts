import * as L from 'leaflet';
import { MapItem } from '../../../models/map-item.model';
import { RegobsGeoHazardMarker } from '../../../../modules/map/core/classes/regobs-geohazard-marker';
export class MapItemMarker extends L.Marker {

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

    constructor(item: MapItem, latlng: L.LatLng, options: L.MarkerOptions) {
        super(latlng, options);
        this._item = item;
        this.updateIcon();
    }

    setSelected() {
        this._isSelected = true;
        this.updateIcon();
    }

    deselect() {
        this._isSelected = false;
        this.updateIcon();
    }

    private updateIcon() {
        this.setIcon(new RegobsGeoHazardMarker(this._item.GeoHazardTID, this._isSelected));
    }
}
