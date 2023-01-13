import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Feature, Point } from 'geojson';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';

export class RegObsMarkerClusterLayer extends L.MarkerClusterGroup {
  openedFeature: Feature<Point, RegistrationViewModel> = null;
  openedPopup: L.Popup = null;

  constructor(private map: L.Map) {
    super();
    const options = (this as any).options as L.MarkerClusterGroupOptions;
    options.zoomToBoundsOnClick = false;
    options.animate = true;
    options.chunkedLoading = true;
    options.showCoverageOnHover = false;
    options.maxClusterRadius = 50;
    options.spiderfyOnMaxZoom = false;
    options.iconCreateFunction = (cluster) => this.createClusterIcon(cluster);
    this.init();
  }

  init() {
    this.on('clusterclick', (e) => this.onMarkerClusterClick(e));
  }

  addMarkers(markerList: L.GeoJSON[]) {
    this.addLayers(markerList);
  }

  onMarkerClusterClick(e: L.LeafletEvent) {
    const layer: L.MarkerCluster = e.propagatedFrom;
    const newZoom = this.map.getZoom() + 2;
    if (newZoom >= this.map.getMaxZoom()) {
      (layer as any).spiderfy();
    } else {
      const bounds = layer.getBounds();
      this.map.fitBounds(bounds, {
        animate: true,
        duration: 0.5,
        easeLinearity: 0.1,
        noMoveStart: true,
        maxZoom: newZoom,
        paddingBottomRight: new L.Point(75, 0),
        paddingTopLeft: new L.Point(0, 75),
      });
    }
  }

  private createClusterIcon(cluster: L.MarkerCluster): L.DivIcon {
    const count = cluster.getChildCount();
    let diameter = 79;
    if (count < 10) {
      diameter = 39;
    } else if (count < 100) {
      diameter = 49;
    } else if (count < 1000) {
      diameter = 64;
    }

    return L.divIcon({
      html: RegObsMarkerClusterLayer.getMixedObservationsClusterSvg(count, diameter),
      iconSize: [diameter, diameter],
      iconAnchor: [Math.floor(diameter / 2), diameter],
      className: 'cluster-marker',
    });
  }

  static getMixedObservationsClusterSvg(count: number, diameter: number): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 ${diameter} ${diameter}" width="${diameter}" height="${diameter}" aria-label="${count}">
        <circle fill="#9BB9C2" stroke="white" stroke-width="2" cx="${diameter / 2}" cy="${diameter / 2}" r="${
      diameter / 2 - 1
    }" />
        <text font-family="Source Sans Pro" font-weight="normal" fill="#000000" text-anchor="middle" x="50%" y="50%" dy=".3em" font-size="14">
            ${count}
        </text>
    </svg>`;
  }
}
