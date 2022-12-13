import * as L from 'leaflet';
import 'leaflet.markercluster';
import { IconHelper } from './icon.helper';
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

  resetPopup() {
    this.openedPopup = null;
    this.openedFeature = null;
  }

  createClusterIcon(cluster: L.MarkerCluster): L.DivIcon {
    return IconHelper.getMixedObservationsClusterIcon(cluster.getChildCount());
  }

  getDistinctGeohazards(items): number[] {
    return Array.from(new Set(items));
  }
}
