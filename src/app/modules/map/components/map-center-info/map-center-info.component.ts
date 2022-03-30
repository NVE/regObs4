import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, firstValueFrom, Observable, of } from 'rxjs';
import { catchError, takeUntil, timeout } from 'rxjs/operators';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { MapService } from '../../services/map/map.service';
import { GeoPositionService } from 'src/app/core/services/geo-position/geo-position.service';
import { HelperService } from 'src/app/core/services/helpers/helper.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { Position } from '@capacitor/geolocation';
import { LocationName } from '../../services/map-search/location-name.model';
import * as L from 'leaflet';
import { ViewInfo } from '../../services/map-search/view-info.model';
import { Capacitor } from '@capacitor/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'MapCenterInfoComponent';
const LOCATION_INFO_REQUEST_TIMEOUT = 10_000;
let requestCounter = 0;

@Component({
  selector: 'app-map-center-info',
  templateUrl: './map-center-info.component.html',
  styleUrls: ['./map-center-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapCenterInfoComponent extends NgDestoryBase {
  private userPos: Position;  // Caches the gps position for distance and height diff computation
  private lastUserPos: L.LatLng; //Remember last gps position to avoid adjusting altitude when device dont' move
  private _userAltitude: number = null; // Cached user altitude from server fetched when we can't trust the GPS altitude

  // For accessing the info box element from parent views
  @ViewChild('infoBoxElement') private infoBoxElement: ElementRef;

  get nativeElement(): HTMLElement | null {
    return this.infoBoxElement?.nativeElement;
  }

  // Public props we can see in the map center info box
  mapCenter: L.LatLng;
  elevation: number;
  location: LocationName;
  steepness: number;
  loading = false;

  get distance(): number {
    if (this.userPos?.coords && this.mapCenter != null) {
      return this.mapCenter.distanceTo({
        lat: this.userPos.coords.latitude,
        lng: this.userPos.coords.longitude
      });
    }
  }

  get userAltitude(): number {
    return this._userAltitude || this.userPos?.coords?.altitude;
  }

  get heightDifference(): number {
    if (this.userAltitude != null && this.elevation != null) {
      return this.elevation - this.userAltitude;
    }
  }

  constructor(
    mapService: MapService,
    private mapSearchService: MapSearchService,
    private clipboard: Clipboard,
    private toastController: ToastController,
    private translateService: TranslateService,
    private platform: Platform,
    geoPositionService: GeoPositionService,
    private helperService: HelperService,
    private cdr: ChangeDetectorRef,
    private loggingService: LoggingService
  ) {
    super();

    // When we get a new gps position, update cached position.
    // If followMode is on, we do not need to show distance and relative height.
    combineLatest([
      geoPositionService.currentPosition$,
      mapService.followMode$
    ])
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(([newPos, followMode]) => {
        this.userPos = followMode ? null : newPos;
        this.fixGpsPosHeight();
        this.cdr.markForCheck();
      });

    mapService.relevantMapChangeWithInitialView$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((newMapView) => {
        this.mapCenter = newMapView.center;
        this.location = null;
        this.elevation = null;
        this.steepness = null;
        this.fetchNewLocationInfo(newMapView.center);
        this.cdr.markForCheck();
      });
  }

  private async fixGpsPosHeight(): Promise<void> {
    if (Capacitor.getPlatform() !== 'ios' && this.userPos?.coords) {
      const start = Date.now();
      const latLng = new L.LatLng(this.userPos.coords.latitude, this.userPos.coords.longitude);
      if (!this.lastUserPos || this.lastUserPos.distanceTo(latLng) > 5) {
        this.lastUserPos = latLng;
        const locationInfo = await firstValueFrom(this.getLocationInfo$(latLng));
        if (locationInfo && locationInfo.elevation) {
          this._userAltitude = locationInfo.elevation;
          this.cdr.markForCheck();
          this.loggingService.debug(
            `Device altitude ${this.userPos.coords.altitude} adjusted to ${locationInfo.elevation} ` +
            `in ${Date.now() - start}ms`, DEBUG_TAG
          );
        } else {
          this._userAltitude = null;
          this.loggingService.debug(
            'Tried to adjust user position altitude, but got no response from server, ' +
            `keeping altitude from device: ${this.userPos.coords.altitude}, took ${Date.now() - start}ms`, DEBUG_TAG
          );
        }
      } else {
        this.loggingService.debug(
          `Distance to last user position is ${this.lastUserPos.distanceTo(latLng)}m. ` +
          'Skips adjustment of altitude when distance is < 5m', DEBUG_TAG
        );
      }
    }
  }

  getHorizontalDifferenceText(value: number): string {
    return this.helperService.getDistanceText(value);
  }

  private getLocationInfo$(latLng: L.LatLng): Observable<ViewInfo> {
    return this.mapSearchService.getViewInfo(latLng)
      .pipe(
        timeout(LOCATION_INFO_REQUEST_TIMEOUT),
        catchError(() => of({} as ViewInfo)),
      );
  }

  private fetchNewLocationInfo(latLng: L.LatLng) {
    this.loading = true;

    // Track request number, so we only update the view
    // after the last observable completes.
    requestCounter++;
    const requestIndex = requestCounter;

    firstValueFrom(this.getLocationInfo$(latLng))
      .then(viewInfo => {
        if (requestIndex < requestCounter) return;

        this.location = viewInfo.location;
        this.elevation = viewInfo.elevation;
        this.steepness = viewInfo.steepness;
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  private useNativeClipboardPlugin() {
    return (
      this.platform.is('hybrid') &&
      (this.platform.is('android') || this.platform.is('ios'))
    );
  }

  async copyToClipboard(): Promise<void> {
    const textToCopy = `${this.mapCenter.lat}, ${this.mapCenter.lng}`;
    if (this.useNativeClipboardPlugin()) {
      await this.clipboard.copy(textToCopy);
    } else {
      this.copyToClipBoardWeb(textToCopy);
    }
    const toastText = await firstValueFrom(this.translateService.get('MAP_CENTER_INFO.COPIED_TO_CLIPBOARD'));
    const toast = await this.toastController.create({
      message: toastText,
      mode: 'md',
      duration: 2000
    });
    toast.present();
  }

  private copyToClipBoardWeb(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
