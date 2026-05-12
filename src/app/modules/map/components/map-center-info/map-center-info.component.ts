import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  inject,
  viewChild,
  signal,
  computed,
} from '@angular/core';
import { IonGrid, IonIcon, IonRow, IonSpinner, ToastController } from '@ionic/angular/standalone';
import { Clipboard } from '@capacitor/clipboard';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { combineLatest, firstValueFrom, iif, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap, takeUntil, tap, timeout } from 'rxjs/operators';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { MapService } from '../../services/map/map.service';
import { GeoPositionService } from 'src/app/core/services/geo-position/geo-position.service';
import { HelperService } from 'src/app/core/services/helpers/helper.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { Position } from '@capacitor/geolocation';
import { LocationName } from '../../services/map-search/location-name.model';
import L from 'leaflet';
import { ViewInfo } from '../../services/map-search/view-info.model';
import { Capacitor } from '@capacitor/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { ExternalLinkService } from 'src/app/core/services/external-link/external-link.service';
import { HttpClient } from '@angular/common/http';
import { booleanPointInPolygon } from '@turf/turf';
import { NORWAY_BOUNDS } from 'src/app/core/helpers/leaflet/norway-bounds';
import { DecimalPipe } from '@angular/common';
import { AbsPipe } from '../../../shared/pipes/abs.pipe';
import { addIcons } from 'ionicons';
import { arrowUp, arrowDown, arrowForward } from 'ionicons/icons';
import { calculateBearing, calculateMagneticBearing } from './map-center-utils';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { toSignal } from '@angular/core/rxjs-interop';

const DEBUG_TAG = 'MapCenterInfoComponent';
const LOCATION_INFO_REQUEST_TIMEOUT = 10_000;

@Component({
  selector: 'app-map-center-info',
  templateUrl: './map-center-info.component.html',
  styleUrls: ['./map-center-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AbsPipe, DecimalPipe, IonGrid, IonIcon, IonRow, IonSpinner, TranslatePipe],
})
export class MapCenterInfoComponent extends NgDestoryBase implements OnInit {
  private mapService = inject(MapService);
  private mapSearchService = inject(MapSearchService);
  private toastController = inject(ToastController);
  private translateService = inject(TranslateService);
  private geoPositionService = inject(GeoPositionService);
  private helperService = inject(HelperService);
  private loggingService = inject(LoggingService);
  private externalLinkService = inject(ExternalLinkService);
  private http = inject(HttpClient);
  private userSettingService = inject(UserSettingService);

  private lastUserPos?: L.LatLng; //Remember last gps position to avoid adjusting altitude when device dont' move

  // For accessing the info box element from parent views
  readonly infoBoxElement = viewChild.required<ElementRef<HTMLDivElement>>('infoBoxElement');

  get nativeElement() {
    return this.infoBoxElement().nativeElement;
  }

  // Public props we can see in the map center info box
  readonly mapCenter = signal<L.LatLng | undefined>(undefined);
  readonly elevation = signal<number | undefined>(undefined);
  readonly location = signal<LocationName | undefined>(undefined);
  readonly steepness = signal<number | undefined>(undefined);
  readonly loading = signal(false);
  private readonly userPos = signal<Position | undefined>(undefined);
  private readonly serverAltitude = signal<number | undefined>(undefined); // korrigert høyde fra API

  readonly userAltitude = computed(() => this.serverAltitude() ?? this.userPos()?.coords?.altitude ?? undefined);

  readonly distance = computed(() => {
    const pos = this.userPos();
    const center = this.mapCenter();
    if (!pos?.coords || center == null) return 0;
    return center.distanceTo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  });

  readonly heightDifference = computed(() => {
    const alt = this.userAltitude();
    const elev = this.elevation();
    return alt != null && elev != null ? elev - alt : undefined;
  });

  /**
   * Beregner kompasskurs i grader fra brukerens posisjon til kartets sentrum, der 0° er nord, 90° er øst, osv.
   * Returnerer undefined hvis vi ikke har nok info til å beregne (f.eks. ingen gps-posisjon eller kart-senter).
   * Funksjonen justerer også for misvisning hvis bruker ikke har deaktivert dette
   */
  readonly bearing = computed(() => {
    const pos = this.userPos();
    const center = this.mapCenter();
    if (!pos?.coords || center == null) return undefined;
    const { latitude, longitude } = pos.coords;
    if (this.useMagneticBearing()) {
      return calculateMagneticBearing(latitude, longitude, center.lat, center.lng, this.userAltitude() ?? 0);
    }
    return calculateBearing(latitude, longitude, center.lat, center.lng);
  });

  readonly useMagneticBearing = toSignal(this.userSettingService.userSetting$.pipe(map((s) => s.useMagneticBearing)), {
    initialValue: true,
  });

  constructor() {
    super();
    addIcons({ arrowUp, arrowDown, arrowForward });
  }

  ngOnInit(): void {
    // When we get a new gps position, update cached position.
    // If followMode is on, we do not need to show distance and relative height.
    combineLatest([this.geoPositionService.currentPosition$, this.mapService.followMode$])
      .pipe(
        takeUntil(this.ngDestroy$),
        tap(([newPos, followMode]) => this.userPos.set(followMode ? undefined : newPos)),
        switchMap(() => this.fixGpsPosHeight())
      )
      .subscribe();

    //fetch location info from Regobs API on map pan or zoom
    //update location, elevation and steepness when/if we get results from the API
    this.mapService.relevantMapChangeWithInitialView$
      .pipe(
        takeUntil(this.ngDestroy$),
        tap((newMapView) => {
          this.loading.set(true);
          this.mapCenter.set(newMapView.center);
          this.location.set(undefined);
          this.elevation.set(undefined);
          this.steepness.set(undefined);
        }),
        debounceTime(1500),
        switchMap((newMapView) =>
          iif(
            () => booleanPointInPolygon([newMapView.center.lng, newMapView.center.lat], NORWAY_BOUNDS),
            this.getLocationInfo$(newMapView.center),
            of(null)
          )
        )
      )
      .subscribe((locationInfo) => {
        if (locationInfo != null) {
          this.location.set(locationInfo?.location);
          this.elevation.set(locationInfo?.elevation);
          this.steepness.set(locationInfo?.steepness);
        }
        this.loading.set(false);
      });
  }

  /** Hent høyde for Android fra server fordi GPS-høyde ofte er unøyaktig */
  private async fixGpsPosHeight(): Promise<void> {
    const pos = this.userPos();
    if (Capacitor.getPlatform() !== 'ios' && pos?.coords) {
      const start = Date.now();
      const latLng = new L.LatLng(pos.coords.latitude, pos.coords.longitude);
      if (!this.lastUserPos || this.lastUserPos.distanceTo(latLng) > 5) {
        this.lastUserPos = latLng;
        const locationInfo = await firstValueFrom(this.getLocationInfo$(latLng));
        if (locationInfo?.elevation) {
          this.serverAltitude.set(locationInfo.elevation);
          this.loggingService.debug(
            `Device altitude ${pos.coords.altitude} adjusted to ${locationInfo.elevation} ` +
              `in ${Date.now() - start}ms`,
            DEBUG_TAG
          );
        } else {
          this.serverAltitude.set(undefined);
          this.loggingService.debug(
            'Tried to adjust user position altitude, but got no response from server, ' +
              `keeping altitude from device: ${pos.coords.altitude}, took ${Date.now() - start}ms`,
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
      catchError(() => of({ latLng }))
    );
  }

  async copyToClipboard(): Promise<void> {
    const textToCopy = `${this.mapCenter()?.lat.toFixed(5)}, ${this.mapCenter()?.lng.toFixed(5)}`;
    await Clipboard.write({ string: textToCopy });

    const toastText = await firstValueFrom(this.translateService.get('MAP_CENTER_INFO.COPIED_TO_CLIPBOARD'));
    const toast = await this.toastController.create({
      message: toastText,
      mode: 'md',
      duration: 2000,
    });
    toast.present();
  }

  async loadYrClick(event: MouseEvent) {
    // siden vi bruker aux for å støtte midtklikk på mus, må vi sikre at auxclick ikke blir kalt for høyreklikk
    if (event.button == 2) return;
    event.stopPropagation();
    event.preventDefault();
    const center = this.mapCenter();
    if (center != null) {
      await this.loadYr(center.lat, center.lng);
    }
  }

  async loadYr(lat: number, lon: number) {
    interface YrSearch {
      totalResults: number;
      _embedded: {
        location: {
          id: string;
        }[];
      };
    }

    const yrApiUrl = `https://www.yr.no/api/v0/locations/search?language=nb&lat=${lat}&lon=${lon}&accuracy=100000`;

    try {
      const response = await firstValueFrom(this.http.get<YrSearch>(yrApiUrl, { observe: 'response' }));
      const apiResponse = response.body;

      if (!apiResponse || !apiResponse.totalResults) {
        throw new Error('loadYr: No results found');
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
