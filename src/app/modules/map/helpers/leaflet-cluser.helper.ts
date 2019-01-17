import * as L from 'leaflet';

export class LeafletClusterHelper {
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
