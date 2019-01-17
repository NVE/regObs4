import * as L from 'leaflet';
import { settings } from '../../../../settings';

export class LeafletClusterHelper {
    static createMarkerClusterGroup = () => L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        maxClusterRadius: settings.map.maxClusterRadius,
        iconCreateFunction: LeafletClusterHelper.createClusterIcon,
    })

    static createClusterIcon(cluster: L.MarkerCluster) {
        const length = cluster.getAllChildMarkers().length;
        const size = (length < 100 ? 35 :
            (length < 1000 ? 50 : 70));
        return L.divIcon({
            html: '<div>' + length + '</div>',
            iconSize: [size, size],
            iconAnchor: [size / 2.0, size / 2.0],
            className: 'circle-marker-cluster',
        });
    }
}
