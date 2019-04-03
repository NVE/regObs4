import { Component, OnInit, Input, NgZone } from '@angular/core';
import { settings } from '../../../../../settings';
import * as L from 'leaflet';
import { RegobsGeoHazardMarker } from '../../core/classes/regobs-geohazard-marker';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss']
})
export class MapImageComponent implements OnInit {

  @Input() location: { latLng: L.LatLng, geoHazard: GeoHazard };
  @Input() allowZoom: boolean;

  private map: L.Map;

  constructor(private ngZone: NgZone) { }

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
    this.ngZone.runOutsideAngular(() => {
      if (this.map === undefined) {
        this.map = map;
        this.map.dragging.disable();
        this.map.keyboard.disable();
        this.map.doubleClickZoom.disable();
        if (this.map.tap) {
          this.map.tap.disable();
        }
        if (this.location && this.location.latLng) {
          this.map.setView(this.location.latLng, settings.map.tiles.zoomLevelObservationList);
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
        this.redrawMap();
      }
    });
  }

  private isInNorway() {
    if (this.location && this.location.latLng) {
      return BorderHelper.isInNorway(this.location.latLng);
    }
    return false;
  }

  private addTileLayers() {
    const tileLayerGroup = L.layerGroup();
    const url = this.isInNorway() ? settings.map.tiles.statensKartverkMapUrl : settings.map.tiles.arcGisOnlineTopoMapUrl;
    L.tileLayer(
      url
    ).addTo(tileLayerGroup);
    tileLayerGroup.addTo(this.map);
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
