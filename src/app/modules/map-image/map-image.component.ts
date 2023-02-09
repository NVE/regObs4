import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { booleanWithin, point } from '@turf/turf';
import * as L from 'leaflet';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { takeUntil, takeWhile, tap } from 'rxjs/operators';
import { NORWAY_BOUNDS } from 'src/app/core/helpers/leaflet/norway-bounds';
import { SVALBARD_BOUNDS } from 'src/app/core/helpers/leaflet/svalbard-bounds';
import { TopoMapLayer } from 'src/app/core/models/topo-map-layer.enum';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from '../../../settings';
import { ImageLocation, ImageLocationStartStop } from '../../components/img-swiper/image-location.model';
import { SmartChanges } from '../../core/helpers/simple-changes.helper';
import { RegobsGeoHazardMarker } from '../map/core/classes/regobs-geohazard-marker';

export const START_ICON = '/assets/icon/map/GPS_start.svg';
export const END_ICON = '/assets/icon/map/GPS_stop.svg';
export const DAMAGE_ICON = '/assets/icon/map/damage-location.svg';

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapImageComponent implements OnInit, OnDestroy, OnChanges {
  @Input() location: ImageLocation;
  @Input() allowZoom: boolean;

  private map: L.Map;
  private mapCenterSubject: BehaviorSubject<ImageLocation>;
  private ngDestroy$: Subject<void>;

  constructor(private cdr: ChangeDetectorRef) {}

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

  private getStartStopIcon(start = false) {
    return L.icon({
      iconUrl: start ? START_ICON : END_ICON,
      iconSize: [27, 42],
      iconAnchor: [13.5, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41],
    });
  }

  private getDamageIcon() {
    return L.icon({
      iconUrl: DAMAGE_ICON,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41],
    });
  }

  ngOnInit() {
    this.mapCenterSubject = new BehaviorSubject(this.location);
    this.ngDestroy$ = new Subject();
  }

  ngOnChanges(changes: SimpleChanges & SmartChanges<this>): void {
    if (!this.mapCenterSubject) {
      this.mapCenterSubject = new BehaviorSubject(this.location);
    }
    this.mapCenterSubject.next(changes.location.currentValue);
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
  onLeafletMapReady(map: L.Map) {
    this.map = map;
    this.mapCenterSubject.pipe(takeUntil(this.ngDestroy$)).subscribe((val) => {
      if (this.map) {
        this.map.eachLayer((layer) => layer.remove());
      }
      this.addTileLayers();
      if (val && val.latLng) {
        this.map.setView(val.latLng, this.options.zoom);
        this.setMarker(val.latLng, val.geoHazard);
      }
      if (val && val.startStopLocation) {
        this.setStartStopLocation(val.startStopLocation);
      }
      if (val && val.damageLocations && val.damageLocations.length > 0) {
        this.setDamageLocations(val.damageLocations);
      }
    });
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
    this.redrawMap();
  }

  redrawMap() {
    let counter = 3;
    timer(500, 50)
      .pipe(
        takeUntil(this.ngDestroy$),
        takeWhile(() => counter > 0),
        tap(() => counter--)
      )
      .subscribe(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      });
  }

  private getMatchingBaseLayer() {
    const location = point([this.location.latLng.lng, this.location.latLng.lat]);
    if (booleanWithin(location, NORWAY_BOUNDS)) {
      return settings.map.tiles.topoMapLayers[TopoMapLayer.statensKartverk];
    }
    if (booleanWithin(location, SVALBARD_BOUNDS)) {
      return settings.map.tiles.topoMapLayers[TopoMapLayer.npolarBasiskart];
    }
    return settings.map.tiles.topoMapLayers[TopoMapLayer.arcGisOnline];
  }

  private addTileLayers() {
    const baseLayer = this.getMatchingBaseLayer();
    L.tileLayer(baseLayer.url, {
      ...baseLayer.options,
      updateWhenIdle: true,
      keepBuffer: 0,
    }).addTo(this.map);
  }

  private setMarker(latLng: L.LatLng, geoHazard: GeoHazard) {
    L.marker(latLng, {
      icon: new RegobsGeoHazardMarker(geoHazard),
      interactive: false,
    }).addTo(this.map);
  }

  private setStartStopLocation(location: ImageLocationStartStop) {
    if (location.start) {
      L.marker(location.start, {
        icon: this.getStartStopIcon(true),
        interactive: false,
      }).addTo(this.map);
    }
    if (location.stop) {
      L.marker(location.stop, {
        icon: this.getStartStopIcon(false),
        interactive: false,
      }).addTo(this.map);
    }
    if (location.start && location.stop) {
      L.polyline([location.start, location.stop], {
        color: 'red',
        weight: 6,
        opacity: 0.9,
      }).addTo(this.map);
    }
    if (location.totalPolygon) {
      location.totalPolygon.addTo(this.map);
    }
    if (location.startPolygon) {
      location.startPolygon.addTo(this.map);
    }
    if (location.endPolygon) {
      location.endPolygon.addTo(this.map);
    }
  }

  private setDamageLocations(locations: L.LatLng[]) {
    if (locations && locations.length > 0) {
      for (const location of locations) {
        L.marker(location, {
          icon: this.getDamageIcon(),
          interactive: false,
        }).addTo(this.map);
      }
    }
  }
}
