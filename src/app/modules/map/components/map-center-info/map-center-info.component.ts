import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, firstValueFrom, iif, Observable, of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, takeUntil, tap, timeout } from 'rxjs/operators';
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
import { ExternalLinkService } from 'src/app/core/services/external-link/external-link.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { StrictHttpResponse } from 'src/app/modules/common-regobs-api/strict-http-response';
import * as turf from '@turf/turf';
import { NORWAY_BOUNDS } from 'src/app/core/helpers/leaflet/norway-bounds';

const DEBUG_TAG = 'MapCenterInfoComponent';
const LOCATION_INFO_REQUEST_TIMEOUT = 10_000;

@Component({
  selector: 'app-map-center-info',
  templateUrl: './map-center-info.component.html',
  styleUrls: ['./map-center-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapCenterInfoComponent extends NgDestoryBase implements OnInit {
  private userPos: Position; // Caches the gps position for distance and height diff computation
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
        lng: this.userPos.coords.longitude,
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
    private mapService: MapService,
    private mapSearchService: MapSearchService,
    private toastController: ToastController,
    private translateService: TranslateService,
    private geoPositionService: GeoPositionService,
    private helperService: HelperService,
    private cdr: ChangeDetectorRef,
    private loggingService: LoggingService,
    private externalLinkService: ExternalLinkService,
    private http: HttpClient
  ) {
    super();

    // We call detectChanges after every new mapView or gps pos has been processed, so
    // no need for this component to be in the regular change detection loop.
    this.cdr.detach();
  }

  ngOnInit(): void {
    // When we get a new gps position, update cached position.
    // If followMode is on, we do not need to show distance and relative height.
    combineLatest([this.geoPositionService.currentPosition$, this.mapService.followMode$])
      .pipe(
        takeUntil(this.ngDestroy$),
        tap(([newPos, followMode]) => (this.userPos = followMode ? null : newPos)),
        switchMap(() => this.fixGpsPosHeight())
      )
      .subscribe(() => {
        this.cdr.detectChanges();
      });

    //fetch location info from Regobs API on map pan or zoom
    //update location, elevation and steepness when/if we get results from the API
    this.mapService.relevantMapChangeWithInitialView$
      .pipe(
        takeUntil(this.ngDestroy$),
        tap((newMapView) => {
          this.loading = true;
          this.mapCenter = newMapView.center;
          this.location = null;
          this.elevation = null;
          this.steepness = null;
          this.cdr.detectChanges();
        }),
        debounceTime(1500),
        switchMap((newMapView) =>
          iif(
            () => turf.booleanPointInPolygon([newMapView.center.lng, newMapView.center.lat], NORWAY_BOUNDS),
            this.getLocationInfo$(newMapView.center),
            of(null)
          )
        )
      )
      .subscribe((locationInfo) => {
        if (locationInfo != null) {
          this.location = locationInfo.location;
          this.elevation = locationInfo.elevation;
          this.steepness = locationInfo.steepness;
        }
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  private async fixGpsPosHeight(): Promise<void> {
    if (Capacitor.getPlatform() !== 'ios' && this.userPos?.coords) {
      const start = Date.now();
      const latLng = new L.LatLng(this.userPos.coords.latitude, this.userPos.coords.longitude);
      if (!this.lastUserPos || this.lastUserPos.distanceTo(latLng) > 5) {
        this.lastUserPos = latLng;
        const locationInfo = await firstValueFrom(this.getLocationInfo$(latLng));
        if (locationInfo?.elevation) {
          this._userAltitude = locationInfo.elevation;
          this.loggingService.debug(
            `Device altitude ${this.userPos.coords.altitude} adjusted to ${locationInfo.elevation} ` +
              `in ${Date.now() - start}ms`,
            DEBUG_TAG
          );
        } else {
          this._userAltitude = null;
          this.loggingService.debug(
            'Tried to adjust user position altitude, but got no response from server, ' +
              `keeping altitude from device: ${this.userPos.coords.altitude}, took ${Date.now() - start}ms`,
            DEBUG_TAG
          );
        }
      } else {
        this.loggingService.debug(
          `Distance to last user position is ${this.lastUserPos.distanceTo(latLng)}m. ` +
            'Skips adjustment of altitude when distance is < 5m',
          DEBUG_TAG
        );
      }
    }
  }

  getHorizontalDifferenceText(value: number): string {
    return this.helperService.getDistanceText(value);
  }

  private getLocationInfo$(latLng: L.LatLng): Observable<ViewInfo> {
    return this.mapSearchService.getViewInfo(latLng).pipe(
      timeout(LOCATION_INFO_REQUEST_TIMEOUT),
      catchError(() => of(null))
    );
  }

  async copyToClipboard(): Promise<void> {
    const textToCopy = `${this.mapCenter.lat}, ${this.mapCenter.lng}`;
    await Clipboard.write({ string: textToCopy });

    const toastText = await firstValueFrom(this.translateService.get('MAP_CENTER_INFO.COPIED_TO_CLIPBOARD'));
    const toast = await this.toastController.create({
      message: toastText,
      mode: 'md',
      duration: 2000,
    });
    toast.present();
  }

  async loadYr(lat, lon) {
    interface YrSearch {
      totalResults: number;
      _embedded: {
        location: {
          id: string;
        }[];
      };
    }

    const apiReq = await new HttpRequest(
      'GET',
      `https://www.yr.no/api/v0/locations/search?language=nb&lat=${lat}&lon=${lon}&accuracy=100000`
    );

    try {
      const apiResponse = await firstValueFrom(
        this.http.request(apiReq).pipe(
          filter((_r) => _r instanceof HttpResponse),
          map((_r) => (_r as StrictHttpResponse<YrSearch>).body)
        )
      );

      if (!apiResponse.totalResults) {
        throw new Error();
      }

      const id = apiResponse._embedded.location[0].id;
      const url =
        {
          nb: `https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/${id}`,
          nn: `https://www.yr.no/nn/v%C3%AArvarsel/dagleg-tabell/${id}`,
        }[this.translateService.currentLang] || `https://www.yr.no/en/forecast/daily-table/${id}`;
      this.externalLinkService.openExternalLink(url);
    } catch {
      await this.toastOnYrError();
    }
  }

  private async toastOnYrError() {
    const toastText = await firstValueFrom(this.translateService.get('MAP_CENTER_INFO.WEATHER_ERROR'));
    const toast = await this.toastController.create({
      message: toastText,
      mode: 'md',
      duration: 2000,
    });
    toast.present();
  }
}
