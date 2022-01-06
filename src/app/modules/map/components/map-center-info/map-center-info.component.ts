import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, firstValueFrom, of } from 'rxjs';
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
import { IMapView } from '../../services/map/map-view.interface';

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

  get heightDifference(): number {
    if (this.userPos?.coords?.altitude != null && this.elevation) {
      return this.elevation - this.userPos.coords.altitude;
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
        this.cdr.markForCheck();
      });

    mapService.relevantMapChangeWithInitialView$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((newMapView) => {
        this.mapCenter = newMapView.center;
        this.location = null;
        this.elevation = null;
        this.steepness = null;
        this.fetchNewLocationInfo(newMapView);
        this.cdr.markForCheck();
      });
  }

  getHorizontalDifferenceText(value: number): string {
    return this.helperService.getDistanceText(value);
  }

  private fetchNewLocationInfo(mapView: IMapView) {
    this.loading = true;

    const locationInfoRequest = this.mapSearchService
      .getViewInfo(mapView)
      .pipe(
        timeout(LOCATION_INFO_REQUEST_TIMEOUT),
        catchError(() => of({} as ViewInfo)),
      );

    // Track request number, so we only update the view
    // after the last observable completes.
    requestCounter++;
    const requestIndex = requestCounter;

    firstValueFrom(locationInfoRequest)
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
