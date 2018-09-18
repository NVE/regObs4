import * as L from 'leaflet';
import { MapItem } from '../../../models/map-item.model';
export class MapItemMarker extends L.Marker {

    private _item: MapItem;

    get item(): MapItem {
        return { ...this._item };
    }

    get id(): number {
        return this._item.RegId;
    }

    constructor(item: MapItem, latlng: L.LatLng, options: L.MarkerOptions) {
        super(latlng, options);
        this._item = item;
        // this.setIcon(L.icon({ iconSize: [40, 40], iconUrl: '/assets/icon/snow.svg' }));
    }
}
