import * as L from "leaflet";

export class UserMarker {

    userMarker: L.Marker;
    userMarkerIcon: L.DivIcon;

    constructor(map: L.Map, latLng: L.LatLng) {
        this.userMarkerIcon = L.divIcon({
            className: "leaflet-usermarker",
            iconSize: [18, 18],
            html: "<div class='heading'></div><i class='pulse'></i>"
        });
        this.userMarker = L.marker(
            latLng,
            { icon: this.userMarkerIcon }
        );
        this.userMarker.addTo(map);
    }

    updatePosition(latLng: L.LatLng) {
        this.userMarker.setLatLng(latLng);
    }
}