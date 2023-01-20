import { ChangeDetectorRef, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import '@geoman-io/leaflet-geoman-free';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from 'src/settings';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { SwipeBackService } from '../../../../core/services/swipe-back/swipe-back.service';
import {
  LocationTime,
  SetLocationInMapComponent
} from '../../components/set-location-in-map/set-location-in-map.component';
import { IPolygon } from '../../models/polygon';

@Component({
  selector: 'app-set-avalanche-position',
  templateUrl: './set-avalanche-position.page.html',
  styleUrls: ['./set-avalanche-position.page.scss'],
})
export class SetAvalanchePositionPage implements OnInit {
  @Input() startLatLng?: L.LatLng;
  @Input() endLatLng?: L.LatLng;
  @Input() extent?: [number, number][]
  @Input() startExtent?: [number, number][]
  @Input() endExtent?: [number, number][]
  @Input() relativeToLatLng?: L.LatLng;
  @Input() geoHazard: GeoHazard;
  @Input() showPolyline = true;

  GeoHazard = GeoHazard;

  start: L.LatLng;
  end: L.LatLng;
  totalPolygon: IPolygon;
  startPolygon: IPolygon;
  endPolygon: IPolygon;
  private map: L.Map;
  private pathLine: L.Polyline;

  fromMarker: L.Marker;
  locationMarker: L.Marker;
  locationPolygon = new Subject<IPolygon>();
  confirmLocationText = '';
  locationText = '';
  startImageUrl = '/assets/icon/map/GPS_start.svg';
  private startIcon = L.icon({
    iconUrl: this.startImageUrl,
    iconSize: [27, 42],
    iconAnchor: [13.5, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
  endImageUrl = '/assets/icon/map/GPS_stop.svg';
  private endIcon = L.icon({
    iconUrl: this.endImageUrl,
    iconSize: [27, 42],
    iconAnchor: [13.5, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
  locationMarkerIcon = L.icon({
    iconUrl: '/assets/icon/map/obs-location.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
  private startMarker: L.Marker;
  private endMarker: L.Marker;
  private translations;
  private startIsActive = true;
  private endIsActive = false;
  locationMarkerIconUrl = this.startImageUrl;

  fullscreen$: Observable<boolean>;

  @ViewChild(SetLocationInMapComponent)
  setLocationInMapComponent: SetLocationInMapComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService,
    private ngZone: NgZone,
    private fullscreenService: FullscreenService,
    private swipeBackService: SwipeBackService,
    private modalController: ModalController
  ) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  async ngOnInit() {
    this.translations = await this.translateService
      .get([
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION',
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION',
        'REGISTRATION.SNOW.AVALANCHE_OBS.AVALANCHE_AREA',
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.LANDSLIDE_AREA',
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.CONFIRM_LANDSLIDE_AREA',
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.CONFIRM_START_POSITION',
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.CONFIRM_END_POSITION',
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.AREA_TOTAL',
        'REGISTRATION.SNOW.AVALANCHE_OBS.CONFIRM_AVALANCHE_AREA',
        'REGISTRATION.SNOW.AVALANCHE_OBS.AREA_TOTAL',
        'REGISTRATION.SNOW.AVALANCHE_OBS.AREA_START',
        'REGISTRATION.SNOW.AVALANCHE_OBS.AREA_END',
      ])
      .toPromise();
    const fallbackLatlng = L.latLng(59.1, 10.3);
    if (this.startLatLng) {
      this.start = L.latLng(this.startLatLng.lat, this.startLatLng.lng);
    }
    if (this.endLatLng) {
      this.end = L.latLng(this.endLatLng.lat, this.endLatLng.lng);
    }
    this.locationMarker = L.marker(this.relativeToLatLng || fallbackLatlng, {
      icon: this.startIcon,
    });
    this.startMarker = L.marker(this.locationMarker.getLatLng(), {
      icon: this.startIcon,
    }).on('click', () => {
      if (!this.startIsActive) {
        this.end = this.locationMarker.getLatLng();
      }
      this.startIsActive = true;
      this.updateMarkers();
    });
    this.endMarker = L.marker(this.locationMarker.getLatLng(), {
      icon: this.endIcon,
    }).on('click', () => {
      if (this.startIsActive) {
        this.start = this.locationMarker.getLatLng();
      }
      this.startIsActive = false;
      this.updateMarkers();
    });
    if (this.relativeToLatLng) {
      this.fromMarker = L.marker(this.relativeToLatLng, {
        icon: this.locationMarkerIcon,
      });
    }
    let areaTotalText = "";
    if (this.geoHazard == GeoHazard.Snow) {
      areaTotalText = this.translations['REGISTRATION.SNOW.AVALANCHE_OBS.AREA_TOTAL'];
    } else {
      areaTotalText = this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.AREA_TOTAL'];
    }
    this.totalPolygon = this.constructPolygon(
      areaTotalText,
      this.extent,
      settings.map.extentColor
    );
    this.startPolygon = this.constructPolygon(
      this.translations['REGISTRATION.SNOW.AVALANCHE_OBS.AREA_START'],
      this.startExtent,
      settings.map.startExtentColor
    );
    this.endPolygon = this.constructPolygon(
      this.translations['REGISTRATION.SNOW.AVALANCHE_OBS.AREA_END'],
      this.endExtent,
      settings.map.endExtentColor
    );
  }

  onMapReady(map: L.Map) {
    this.map = map;
    setTimeout(() => {
      this.updateMarkers();
    });
    this.ngZone.runOutsideAngular(() => {
      this.map.on('drag', () => this.updatePolyline());
      this.updatePolyline();
    });
  }

  ionViewDidEnter() {
    this.swipeBackService.disableSwipeBack();
    this.updatePolyline();
  }

  ionViewWillLeave() {
    this.swipeBackService.enableSwipeBack();
  }

  private setStartLocationText() {
    this.confirmLocationText = this.translations[
      'REGISTRATION.DIRT.LAND_SLIDE_OBS.CONFIRM_START_POSITION'
    ];
    this.locationText = this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION'];
    this.locationMarkerIconUrl = this.startImageUrl;
  }

  private setEndLocationText() {
    this.confirmLocationText = this.translations[
      'REGISTRATION.DIRT.LAND_SLIDE_OBS.CONFIRM_END_POSITION'
    ];
    this.locationText = this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION'];
    this.locationMarkerIconUrl = this.endImageUrl;
  }

  private setPolygonLocationText() {
    if (this.geoHazard == GeoHazard.Snow) {
      this.confirmLocationText = this.translations[
        'REGISTRATION.SNOW.AVALANCHE_OBS.CONFIRM_AVALANCHE_AREA'
      ];
      this.locationText = this.translations['REGISTRATION.SNOW.AVALANCHE_OBS.AVALANCHE_AREA'];
    } else if (this.geoHazard == GeoHazard.Soil) {
      this.confirmLocationText = this.translations[
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.CONFIRM_LANDSLIDE_AREA'
      ];
      this.locationText = this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.LANDSLIDE_AREA'];
    }
  }

  private constructPolygon(title: string, extent: [number, number][], color: string) {
    return {
      title,
      active: Boolean(extent),
      polygon: extent ? new L.Polygon(
        extent.map(([lng, lat]) => [lat, lng]),
        {color},
      ) : null,
      color,
    };
  }

  private makePolygons() {
    if (!this.totalPolygon.polygon) {
      const totalCircle = new L.Circle(
        [(this.start.lat + this.end.lat) / 2, (this.start.lng + this.end.lng) / 2],
        {radius: this.start.distanceTo(this.end) / 2}
      );
      this.totalPolygon.polygon = L.PM.Utils.circleToPolygon(totalCircle, 5);
    }
    if (!this.startPolygon.polygon) {
      const startCircle = new L.Circle(
        [this.start.lat + (this.end.lat - this.start.lat) / 6, this.start.lng + (this.end.lng - this.start.lng) / 6],
        {radius: this.start.distanceTo(this.end) / 6}
      );
      this.startPolygon.polygon = L.PM.Utils.circleToPolygon(startCircle, 5);
    }
    if (!this.endPolygon.polygon) {
      const endCircle = new L.Circle(
        [this.end.lat + (this.start.lat - this.end.lat) / 6, this.end.lng + (this.start.lng - this.end.lng) / 6],
        {radius: this.start.distanceTo(this.end) / 6}
      );
      this.endPolygon.polygon = L.PM.Utils.circleToPolygon(endCircle, 5);
    }
  }

  private updateMarkers() {
    this.startMarker.remove();
    this.endMarker.remove();
    if (!this.start) {
      this.locationMarker.setIcon(this.startIcon);
      this.setStartLocationText();
    } else {
      if (this.startIsActive) {
        this.locationMarker.setIcon(this.startIcon);
        this.locationMarker.setLatLng(this.start);
        this.setStartLocationText();
        if (this.end) {
          this.endMarker.setLatLng(this.end);
          this.endMarker.addTo(this.map);
        }
      } else if (this.endIsActive) {
        this.locationMarker.setIcon(this.endIcon);
        this.locationMarker.setLatLng(this.end || this.start);
        this.setEndLocationText();
        this.startMarker.setLatLng(this.start);
        this.startMarker.addTo(this.map);
      } else {
        this.locationMarker.remove();
        this.startMarker.setLatLng(this.start);
        this.startMarker.addTo(this.map);
        this.startMarker.off('click');
        this.endMarker.setLatLng(this.end);
        this.endMarker.addTo(this.map);
        this.endMarker.off('click');
        this.map.off('drag');
        this.setPolygonLocationText()
        if (this.geoHazard == GeoHazard.Snow || this.geoHazard == GeoHazard.Soil) {
          this.makePolygons();
          this.locationPolygon.next(this.totalPolygon);
          this.locationPolygon.next(this.startPolygon);
          this.locationPolygon.next(this.endPolygon);
        }
      }
    }
    this.map.panTo(this.locationMarker.getLatLng());
    this.cdr.detectChanges();
  }

  updatePolyline() {
    if (this.end || this.start) {
      const path = [this.locationMarker.getLatLng(), this.startIsActive ? this.end : this.start];
      if (!this.pathLine) {
        this.pathLine = L.polyline(path, {
          color: 'red',
          weight: 6,
          opacity: 0.9,
        }).addTo(this.map);
      } else {
        this.pathLine.setLatLngs(path);
      }
    }
  }

  async onLocationSet({ location }: LocationTime) {
    if (this.startIsActive) {
      this.start = L.latLng(location.Latitude, location.Longitude);
      if (this.end) {
        this.map.panTo(this.end);
      } else {
        this.end = L.latLng(location.Latitude, location.Longitude);
      }
      this.startIsActive = false;
      this.endIsActive = true;
      this.updateMarkers();
    } else if (this.endIsActive) {
      this.end = L.latLng(location.Latitude, location.Longitude);
      this.endIsActive = false;
      this.updateMarkers();
    } else {
      this.modalController.dismiss({
        start: this.start,
        end: this.end,
        totalPolygon: this.totalPolygon.active ? this.totalPolygon.polygon?.toGeoJSON().geometry.coordinates[0] : null,
        startPolygon: this.startPolygon.active ? this.startPolygon.polygon?.toGeoJSON().geometry.coordinates[0] : null,
        endPolygon: this.endPolygon.active ? this.endPolygon.polygon?.toGeoJSON().geometry.coordinates[0] : null,
      });
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.setLocationInMapComponent.confirm();
  }
}
