import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { settings } from '../../../../../settings';
import * as L from 'leaflet';
import { RegobsGeoHazardMarker } from '../../core/classes/regobs-geohazard-marker';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapImageComponent implements OnInit {

  @Input() location: { latLng: L.LatLng, geoHazard: GeoHazard };
  @Input() allowZoom: boolean;

  private map: L.Map;

  constructor() { }

  options: L.MapOptions = {
    zoom: settings.map.tiles.zoomLevelObservationList,
    maxZoom: settings.map.tiles.maxZoom,
    minZoom: 8,
    bounceAtZoomLimits: false,
    attributionControl: false,
    zoomControl: false,
    scrollWheelZoom: 'center', // zoom to center regardless where mouse is
    touchZoom: 'center',
  };

  ngOnInit() {
  }

  onLeafletMapReady(map: L.Map) {
    if (this.map === undefined) {
      this.map = map;
      this.map.dragging.disable();
      this.map.keyboard.disable();
      this.map.doubleClickZoom.disable();
      if (this.map.tap) {
        this.map.tap.disable();
      }
      if (!this.allowZoom) {
        this.map.touchZoom.disable();
        this.map.scrollWheelZoom.disable();
        this.map.boxZoom.disable();
      } else {
        this.map.on('zoomend', () => {
          this.map.panTo(this.location.latLng);
        });
      }
      this.addTileLayers();
      this.addMarker();
      setTimeout(() => {
        this.map.invalidateSize();
        if (this.location && this.location.latLng) {
          this.map.setView(this.location.latLng, settings.map.tiles.zoomLevelObservationList);
        }
      }, 500);
    }
  }

  private isInNorway() {
    if (this.location && this.location.latLng) {
      return BorderHelper.isInNorway(this.location.latLng);
    }
    return false;
  }

  private addTileLayers() {
    const url = this.isInNorway() ? settings.map.tiles.statensKartverkMapUrl : settings.map.tiles.arcGisOnlineTopoMapUrl;
    L.tileLayer(
      url
    ).addTo(this.map);
  }

  private addMarker() {
    if (this.location && this.location.latLng) {
      const marker = L.marker(this.location.latLng, {
        icon: new RegobsGeoHazardMarker(this.location.geoHazard),
        interactive: false,
      });
      marker.addTo(this.map);
    }
  }

}
