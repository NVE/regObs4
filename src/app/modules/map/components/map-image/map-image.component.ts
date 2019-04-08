import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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
export class MapImageComponent implements OnInit, OnDestroy {

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
    trackResize: false,
    center: L.latLng(settings.map.unknownMapCenter as L.LatLngTuple),
  };

  ngOnInit() {
    if (this.location && this.location.latLng) {
      this.options.center = this.location.latLng;
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  onLeafletMapReady(map: L.Map) {
    if (this.map === undefined) {
      this.map = map;
      if (!this.allowZoom) {
        if (this.map.tap) {
          this.map.tap.disable();
        }
        this.map.doubleClickZoom.disable();
        this.map.dragging.disable();
        this.map.keyboard.disable();
        this.map.touchZoom.disable();
        this.map.scrollWheelZoom.disable();
        this.map.boxZoom.disable();
      }
      this.addTileLayers();
      this.addMarker();
      this.resize();
    }
  }

  private resize() {
    setTimeout(() => {
      this.resizeInternal();
      setTimeout(() => {
        this.resizeInternal();
      }, 200);
    }, 200);
  }

  private resizeInternal() {
    if (this.map) {
      try {
        this.map.invalidateSize();
      } catch (err) {
      }
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
      url,
      {
        updateWhenIdle: true,
        keepBuffer: 0,
      }
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
