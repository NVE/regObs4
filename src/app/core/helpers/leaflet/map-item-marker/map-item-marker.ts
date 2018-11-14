import * as L from 'leaflet';
import { MapItem } from '../../../models/map-item.model';
import { GeoHazard } from '../../../models/geo-hazard.enum';
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
        const iconUrl = this.getIconUrl();
        this.setIcon(L.icon({
            iconUrl: iconUrl,
            iconSize: [27, 42],
            iconAnchor: [13.5, 41],
            shadowUrl: '/leaflet/marker-shadow.png',
            shadowSize: [42, 42],
        }));
    }

    private getIconUrl() {
        const geoName = GeoHazard[this._item.GeoHazardTID].toLowerCase();
        return `/assets/icon/map/${geoName}${this._isSelected ? '_selected' : ''}.svg`;
    }
}
