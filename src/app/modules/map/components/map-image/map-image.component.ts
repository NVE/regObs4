import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { ImageLocation } from '../../../../components/img-swiper/image-location.model';
import { Point } from '@arcgis/core/geometry';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapImageComponent implements OnInit, OnDestroy{
  @Input() location: ImageLocation;

  centerLocation: Point;
  private ngDestroy$: Subject<void>;

  imgUrl: string;
  iconUrl: string;
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.imgUrl = this.createImageUrl();
    this.iconUrl = this.createIcon(this.location.geoHazard);
    this.ngDestroy$ = new Subject();
  }

  createImageUrl() : string {
    const limit = 0.02;
    const boundingBox = `${this.location.latLng.lng - limit},${this.location.latLng.lat - limit},${this.location.latLng.lng + limit},${this.location.latLng.lat + limit}`
    return `https://services.geodataonline.no/arcgis/rest/services/Geocache_WMAS_WGS84/GeocacheLandskap/MapServer/export?bbox=${boundingBox}&bboxSR=%7B%22wkid%22%3A4326%7D&layers=&layerDefs=&size=600%2C600&format=png&f=image`
  }

  createIcon(geoHazard: GeoHazard) : string {
    const geoHazardName = GeoHazard[geoHazard];
    return `/assets/icon/map/pin-${geoHazardName.toLowerCase()}.svg`;
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

/*  TODO: De to funksjonene under er hjelpefunksjoner som blir spart på om de trengs til arbeidet med å få inn Kartverket kartet i observasjonskortene 
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
  } */
}
