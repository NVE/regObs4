import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import * as L from 'leaflet';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { takeUntil, takeWhile, tap } from 'rxjs/operators';
import { ImageLocation } from '../../../../components/img-swiper/image-location.model';
import { settings } from '../../../../../settings';
import { SmartChanges } from '../../../../core/helpers/simple-changes.helper';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';
import MapView from '@arcgis/core/views/MapView';
import { Point } from '@arcgis/core/geometry';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import { MarkerHelper } from '../../../../core/helpers/arcgis/markerHelper';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

const START_ICON = '/assets/icon/map/GPS_start.svg';
const END_ICON = '/assets/icon/map/GPS_stop.svg';
const DAMAGE_ICON = '/assets/icon/map/damage-location.svg';

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapImageComponent implements OnInit, OnDestroy, OnChanges {
  @Input() location: ImageLocation;
  @Input() allowZoom: boolean;

  private map: L.Map;
  private mapView: MapView;
  private mapCenterSubject: BehaviorSubject<ImageLocation>;
  centerLocation: Point;
  private ngDestroy$: Subject<void>;
  private markerLayer = new GraphicsLayer({ id: 'MARKERS' });

  imgUrl: string;
  iconUrl: string;

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
    center: L.latLng(settings.map.unknownMapCenter as L.LatLngTuple)
  };

  private getStartStopIcon(start = false) {
    return L.icon({
      iconUrl: start ? START_ICON : END_ICON,
      iconSize: [27, 42],
      iconAnchor: [13.5, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41]
    });
  }

  private getDamageIcon() {
    return L.icon({
      iconUrl: DAMAGE_ICON,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41]
    });
  }

  ngOnInit() {
    this.imgUrl = this.createImageUrl();
    this.iconUrl = this.createIcon(this.location.geoHazard);
    this.mapCenterSubject = new BehaviorSubject(this.location);
    this.centerLocation = new Point({
      latitude: this.location.latLng.lat,
      longitude: this.location.latLng.lng
    });
    this.ngDestroy$ = new Subject();
  }

  createImageUrl() : string {
    const limit = 0.02;
    const boundingBox = `${this.location.latLng.lng - limit},${this.location.latLng.lat - limit},${this.location.latLng.lng + limit},${this.location.latLng.lat + limit}`
    return `https://services.geodataonline.no/arcgis/rest/services/Geocache_WMAS_WGS84/GeocacheLandskap/MapServer/export?bbox=${boundingBox}&bboxSR=%7B%22wkid%22%3A4326%7D&layers=&layerDefs=&size=600%2C600&format=png&f=image`
  }

  createIcon(geoHazard: GeoHazard) : string {
    switch(geoHazard) {
      case GeoHazard.Snow:
        return this.getIconUrl('snow');
      case GeoHazard.Ice:
        return this.getIconUrl('ice');
      case GeoHazard.Dirt:
        return this.getIconUrl('dirt');
      case GeoHazard.Water:
        return this.getIconUrl('water');
    }
  }

  getIconUrl(geohazard: string) : string {
    return `/assets/icon/map/pin-${geohazard}.svg`;
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

  onMapReady(map: MapView) {
    this.mapView = map;
    const symbol = MarkerHelper.getIconSvg(this.location.geoHazard);
    const marker = new Graphic({
      geometry: this.centerLocation,
      symbol: symbol
    });
    this.markerLayer.add(marker);
    this.mapView.map.add(this.markerLayer);
  }



  onLeafletMapReady(map: L.Map) {
    this.map = map;
    /* this.mapCenterSubject.pipe(takeUntil(this.ngDestroy$)).subscribe((val) => {
      if (this.map) {
        this.map.eachLayer((layer) => layer.remove());
      }
      this.addTileLayers();
      if (val && val.latLng) {
        this.map.setView(val.latLng, this.options.zoom);
        this.setMarker(val.latLng, val.geoHazard);
      }
      if (val && val.startStopLocation) {
        this.setStartStopLocation(
          val.startStopLocation.start,
          val.startStopLocation.stop
        );
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
    } */
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

  private isInNorway() {
    if (this.location && this.location.latLng) {
      return (
        BorderHelper.isInNorway(this.location.latLng) ||
        BorderHelper.isInSvalbard(this.location.latLng)
      );
    }
    return false;
  }

  private addTileLayers() {
    const url = this.isInNorway()
      ? settings.map.tiles.statensKartverkMapUrl
      : settings.map.tiles.arcGisOnlineTopoMapUrl;
    L.tileLayer(url, {
      updateWhenIdle: true,
      keepBuffer: 0
    }).addTo(this.map);
  }

  private setStartStopLocation(start: L.LatLng, stop: L.LatLng) {
    if (start) {
      L.marker(start, {
        icon: this.getStartStopIcon(true),
        interactive: false
      }).addTo(this.map);
    }
    if (stop) {
      L.marker(stop, {
        icon: this.getStartStopIcon(false),
        interactive: false
      }).addTo(this.map);
    }
    if (start && stop) {
      L.polyline([start, stop], {
        color: 'red',
        weight: 6,
        opacity: 0.9
      }).addTo(this.map);
    }
  }

  private setDamageLocations(locations: L.LatLng[]) {
    if (locations && locations.length > 0) {
      for (const location of locations) {
        L.marker(location, {
          icon: this.getDamageIcon(),
          interactive: false
        }).addTo(this.map);
      }
    }
  }
}
