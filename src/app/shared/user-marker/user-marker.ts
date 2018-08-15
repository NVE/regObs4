import * as L from 'leaflet';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Subscription } from 'rxjs';
import { Geoposition } from '@ionic-native/geolocation/ngx';

export class UserMarker {

    userMarker: L.Marker;
    userMarkerIcon: L.DivIcon;
    headingSubscription: Subscription;
    deviceOrientation: DeviceOrientation;
    accuracyMarker: L.Circle;
    map: L.Map;
    position: Geoposition;

    accuracyCircleStyle = {
        stroke: true,
        color: '#03f',
        weight: 3,
        opacity: 0.5,
        fillOpacity: 0.15,
        fillColor: '#03f',
        clickable: false
    };

    constructor(deviceOrientation: DeviceOrientation, map: L.Map, position: Geoposition) {
        this.deviceOrientation = deviceOrientation;
        this.map = map;
        this.position = position;
        this.userMarkerIcon = L.divIcon({
            className: 'leaflet-usermarker',
            iconSize: [18, 18],
            html: '<div class=\'heading\'></div><i class=\'pulse\'></i>'
        });
        const latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.userMarker = L.marker(
            latLng,
            { icon: this.userMarkerIcon }
        );
        this.userMarker.addTo(this.map);
        this.setAccuracy(position);

    }

    getPosition(): Geoposition {
        return this.position;
    }

    updatePosition(position: Geoposition) {
        this.position = position;
        const latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.userMarker.setLatLng(latLng);
        this.setAccuracy(position);
    }

    watchHeading() {
        this.headingSubscription = this.deviceOrientation.watchHeading({ frequency: 500 })
            .subscribe((data: DeviceOrientationCompassHeading) => {
                this.setHeading(data.magneticHeading);
            });
    }

    stopWatch() {
        if (this.headingSubscription !== null) {
            this.headingSubscription.unsubscribe();
        }
    }

    private setHeading(degrees: number) {
        const element: HTMLElement = this.userMarker.getElement().childNodes[0] as HTMLElement;
        const rotateZ = degrees - 90;
        element.style['-webkit-transform'] = 'rotate(' + rotateZ + 'deg) translateX(15px)';
        element.style.display = 'block';
    }

    private setAccuracy(position: Geoposition) {
        if (!this.accuracyMarker) {
            const latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
            this.accuracyMarker = L.circle(latLng, position.coords.accuracy, this.accuracyCircleStyle);
            this.accuracyMarker.addTo(this.map);
        } else {
            this.accuracyMarker.setRadius(position.coords.accuracy);
        }
    }
}
