import {
  Component,
  OnInit,
  Input,
  NgZone,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObsLocationDto } from '../../../regobs-api/models';
import * as L from 'leaflet';
import { TranslateService } from '@ngx-translate/core';
import { SetLocationInMapComponent } from '../../components/set-location-in-map/set-location-in-map.component';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { Observable, Subject } from 'rxjs';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { SwipeBackService } from '../../../../core/services/swipe-back/swipe-back.service';
import Graphic from '@arcgis/core/Graphic';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { Point, Polyline } from '@arcgis/core/geometry';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { MapComponent } from 'src/app/modules/map/components/map/map.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-set-avalanche-position',
  templateUrl: './set-avalanche-position.page.html',
  styleUrls: ['./set-avalanche-position.page.scss']
})
export class SetAvalanchePositionPage implements OnInit {
  @Input() startLatLng?: L.LatLng;
  @Input() endLatLng?: L.LatLng;
  @Input() relativeToLatLng?: L.LatLng;
  @Input() geoHazard: GeoHazard;
  @Input() showPolyline = true;

  GeoHazard = GeoHazard;

  private start: Point;
  private end: Point;
  private mapComponent: MapComponent;
  private pathLine: Graphic;

  fromMarker: Graphic;
  locationMarker: Graphic;
  confirmLocationText = '';
  locationText = '';
  startImageUrl = '/assets/icon/map/GPS_start.svg';
  endImageUrl = '/assets/icon/map/GPS_stop.svg';
  private startMarker: Graphic;
  private endMarker: Graphic;
  private markerLayer: GraphicsLayer;
  private translations;
  private startIsActive = true;
  locationMarkerIconUrl = this.startImageUrl;
  fullscreen$: Observable<boolean>;

  @ViewChild(SetLocationInMapComponent)
  setLocationInMapComponent: SetLocationInMapComponent;
  private ngDestroy$ = new Subject();

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

  async ngOnInit(): Promise<void> {
    this.translations = await this.translateService
      .get([
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION',
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION',
        'DIALOGS.CONFIRM'
      ])
      .toPromise();
    const fallbackLatlng = L.latLng(59.1, 10.3);
    if (this.startLatLng) {
      this.start = new Point({
        latitude: this.startLatLng.lat,
        longitude: this.startLatLng.lng
      });
    }
    if (this.endLatLng) {
      this.end = new Point({
        latitude: this.endLatLng.lat,
        longitude: this.endLatLng.lng
      });
    }
    this.locationMarker = this.createMarkerFromLeafletLatLng(
      this.relativeToLatLng || fallbackLatlng,
      this.startImageUrl
    );
    this.startMarker = this.createMarker(
      this.locationMarker.geometry as Point,
      this.startImageUrl
    );
    //TODO: Support click on marker to move it
    // .on('click', () => {
    //   if (!this.startIsActive) {
    //     this.end = this.locationMarker.geometry as Point;
    //   }
    //   this.startIsActive = true;
    //   this.updateMarkers();
    // });
    this.endMarker = this.createMarker(
      this.locationMarker.geometry as Point,
      this.endImageUrl
    );
    //TODO: Support click on marker to move it
    // .on('click', () => {
    //   if (this.startIsActive) {
    //     this.start = this.locationMarker.geometry as Point;
    //   }
    //   this.startIsActive = false;
    //   this.updateMarkers();
    // });
    if (this.relativeToLatLng) {
      this.fromMarker = this.createMarkerFromLeafletLatLng(
        this.relativeToLatLng,
        this.locationMarkerIconUrl
      );
    }
  }

  onMapReady(mapComponent: MapComponent): void {
    this.mapComponent = mapComponent;
  }

  onMarkerLayerReady(markerLayer: GraphicsLayer): void {
    this.markerLayer = markerLayer;
    setTimeout(() => {
      this.updateMarkers();
    });
    this.ngZone.runOutsideAngular(() => {
      this.mapComponent.drag$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => 
        this.updatePolyline()
      );
    });
  }

  private createMarker(point: Point, symbolPath?: string): Graphic {
    return new Graphic({
      geometry: point,
      symbol: new PictureMarkerSymbol({
        url: symbolPath ? symbolPath : this.locationMarkerIconUrl,
        width: '25px',
        height: '41px',
        yoffset: '15px'
      })
    });
  }

  private createMarkerFromLeafletLatLng(
    latLng: L.LatLng,
    symbolPath: string
  ): Graphic {
    return this.createMarker(
      new Point({ latitude: latLng.lat, longitude: latLng.lng }),
      symbolPath
    );
  }

  ionViewDidEnter(): void {
    this.swipeBackService.disableSwipeBack();
  }

  ionViewWillLeave(): void {
    this.swipeBackService.enableSwipeBack();
  }

  private setStartLocationText() {
    this.confirmLocationText = `${
      this.translations['DIALOGS.CONFIRM']
    } ${this.translations[
      'REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION'
    ].toLowerCase()}`;
    this.locationText = this.translations[
      'REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION'
    ];
    this.locationMarkerIconUrl = this.startImageUrl;
  }

  private setEndLocationText() {
    this.confirmLocationText = `${
      this.translations['DIALOGS.CONFIRM']
    } ${this.translations[
      'REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION'
    ].toLowerCase()}`;
    this.locationText = this.translations[
      'REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION'
    ];
    this.locationMarkerIconUrl = this.endImageUrl;
  }

  private setMarkerSymbol(marker: Graphic, imageUrl: string): void {
    const symbol = marker.symbol as PictureMarkerSymbol;
    symbol.url = imageUrl;
  }

  private updateMarkers() {
    this.startMarker.destroy();
    this.endMarker.destroy();
    if (!this.start) {
      this.setMarkerSymbol(this.locationMarker, this.startImageUrl);
      this.setStartLocationText();
    } else {
      if (this.startIsActive) {
        this.setMarkerSymbol(this.locationMarker, this.startImageUrl);
        this.locationMarker.geometry = this.start;
        this.setStartLocationText();
        if (this.end) {
          this.endMarker.geometry = this.end;
          this.markerLayer.add(this.endMarker);
        }
      } else {
        this.setMarkerSymbol(this.locationMarker, this.endImageUrl);
        this.locationMarker.geometry = this.end || this.start;
        this.setEndLocationText();
        this.startMarker.geometry = this.start;
        this.markerLayer.add(this.startMarker);
      }
    }
    this.mapComponent.goToPoint(this.locationMarker.geometry as Point);
    this.cdr.detectChanges();
  }

  updatePolyline(): void {
    if (this.end || this.start) {
      const path = [
        this.locationMarker.geometry as Point,
        this.startIsActive ? this.end : this.start
      ];
      if (!this.pathLine) {
        this.pathLine = new Graphic();
        this.pathLine.geometry = new Polyline();
        //TODO: Trenger vi å gjøre streken finere?
        // this.pathLine = L.polyline(path, {
        //   color: 'red',
        //   weight: 6,
        //   opacity: 0.9
        // }).addTo(this.map);
        this.markerLayer.add(this.pathLine);
      } else {
        const polyLine = this.pathLine.geometry as Polyline;
        polyLine.removePath(0);
      }
      const polyLine = this.pathLine.geometry as Polyline;
      polyLine.addPath(path);
    }
  }

  async onLocationSet(event: ObsLocationDto): Promise<void> {
    if (this.startIsActive) {
      this.start = new Point({
        latitude: event.Latitude,
        longitude: event.Longitude
      });
      if (this.end) {
        this.mapComponent.goToPoint(this.end);
      } else {
        this.end = new Point({
          latitude: event.Latitude,
          longitude: event.Longitude
        });
      }
      this.startIsActive = false;
      this.updateMarkers();
    } else {
      this.end = new Point({
        latitude: event.Latitude,
        longitude: event.Longitude
      });
      this.modalController.dismiss({ start: this.start, end: this.end });
    }
  }

  cancel(): void {
    this.modalController.dismiss();
  }

  ok(): void {
    this.setLocationInMapComponent.confirmLocation();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
