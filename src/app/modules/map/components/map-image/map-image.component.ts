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
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { ImageLocation } from '../../../../components/img-swiper/image-location.model';
import { SmartChanges } from '../../../../core/helpers/simple-changes.helper';
import { Point } from '@arcgis/core/geometry';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

/* const START_ICON = '/assets/icon/map/GPS_start.svg';
const END_ICON = '/assets/icon/map/GPS_stop.svg';
const DAMAGE_ICON = '/assets/icon/map/damage-location.svg'; */

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapImageComponent implements OnInit, OnDestroy{
  @Input() location: ImageLocation;

  //private mapCenterSubject: BehaviorSubject<ImageLocation>;
  centerLocation: Point;
  private ngDestroy$: Subject<void>;

  imgUrl: string;
  iconUrl: string;
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.imgUrl = this.createImageUrl();
    this.iconUrl = this.createIcon(this.location.geoHazard);
    //this.mapCenterSubject = new BehaviorSubject(this.location);
    this.ngDestroy$ = new Subject();
  }

  createImageUrl() : string {
    const limit = 0.02;
    //spørre om mer enn 1 tile - gjøre om fra lng til lat, x, y, finn ut hvilken tile vi er i.
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

/*   ngOnChanges(changes: SimpleChanges & SmartChanges<this>): void {
    if (!this.mapCenterSubject) {
      this.mapCenterSubject = new BehaviorSubject(this.location);
    }
    this.mapCenterSubject.next(changes.location.currentValue);
  } */

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

/*   private isInNorway() {
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
  } */
}
