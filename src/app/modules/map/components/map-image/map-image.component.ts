import { Component, OnInit, Input } from '@angular/core';
import { settings } from '../../../../../settings';
import * as L from 'leaflet';
import { RegobsGeoHazardMarker } from '../../core/classes/regobs-geohazard-marker';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss']
})
export class MapImageComponent implements OnInit {

  @Input() location: { latLng: L.LatLng, geoHazard: GeoHazard };

  private map: L.Map;

  constructor() { }

  options: L.MapOptions = {
    zoom: settings.map.tiles.zoomInPosition,
    maxZoom: settings.map.tiles.maxZoom,
    minZoom: settings.map.tiles.minZoom,
    bounceAtZoomLimits: false,
    attributionControl: false,
    zoomControl: false,
  };

  ngOnInit() {
  }

  onLeafletMapReady(map: L.Map) {
    this.map = map;
    if (this.location && this.location.latLng) {
      this.map.setView(this.location.latLng, settings.map.tiles.zoomLevelObservationList);
    }
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
    if (this.map.tap) {
      this.map.tap.disable();
    }
    // document.getElementById('map').style.cursor='default';
    this.addTileLayers();
    this.addMarker();
    this.redrawMap();
  }

  private addTileLayers() {
    const tileLayerGroup = L.layerGroup();
    L.tileLayer(
      settings.map.tiles.arcGisOnlineTopoMapUrl
    ).addTo(tileLayerGroup);
    L.tileLayer(
      settings.map.tiles.statensKartverkMapUrl,
      {
        bounds: <any>settings.map.tiles.supportTilesBounds,
      }
    ).addTo(tileLayerGroup);
    tileLayerGroup.addTo(this.map);
  }

  private addMarker() {
    if (this.location && this.location.latLng) {
      const marker = L.marker(this.location.latLng, {
        icon: new RegobsGeoHazardMarker(this.location.geoHazard)
      });
      marker.addTo(this.map);
    }
  }

  redrawMap() {
    setTimeout(() => {
      if (this.map) {
        try {
          this.map.invalidateSize();
        } catch (err) {
        }
      }
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

}
