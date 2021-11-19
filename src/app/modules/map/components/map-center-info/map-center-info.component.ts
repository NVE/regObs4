import { Component, OnInit, OnDestroy, Inject, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, of, Observable, combineLatest, firstValueFrom, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { ViewInfo } from '../../services/map-search/view-info.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { IMapView } from '../../services/map/map-view.interface';
import { MapService } from '../../services/map/map.service';
import { GeoPositionService } from 'src/app/core/services/geo-position/geo-position.service';
import { HelperService } from 'src/app/core/services/helpers/helper.service';
import L from 'leaflet';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

interface HeightDifference extends ViewInfo {
  heightDifferenceFromGpsPos?: string; //including unit (m)
  gpsPosIsBelowMapCenter?: boolean;
}

const DEBUG_TAG = 'MapCenterInfoComponent';

@Component({
  selector: 'app-map-center-info',
  templateUrl: './map-center-info.component.html',
  styleUrls: ['./map-center-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapCenterInfoComponent implements OnInit {
  showMapCenter$: Observable<boolean>;
  mapCenterCoords$: Observable<L.LatLng>;
  horizontalDistanceFromGpsPos$: Observable<string>; //including unit (m or km)
  heightDifference$: Observable<HeightDifference>;
  mapCenterNameAndHeightData$: Observable<ViewInfo>;
  mapView$: Observable<IMapView>;
  loading = false;
  private rowCount = 0;

  constructor(
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private mapSearchService: MapSearchService,
    private clipboard: Clipboard,
    private toastController: ToastController,
    private translateService: TranslateService,
    private platform: Platform,
    private ngZone: NgZone,
    private geoPositionService: GeoPositionService,
    private helperService: HelperService,
    private cdr: ChangeDetectorRef,
    private loggingService: LoggingService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  async ngOnInit(): Promise<void> {
    // this.subscriptions.push(
    //   this.userSettingService.showMapCenter$
    //     .pipe(
    //       switchMap((showMapCenter) =>
    //         showMapCenter ? this.mapService.relevantMapChange$ : of(null)
    //       ),
    //       filter((val) => !!val),
    //       tap(() => {
    //         this.isLoading.next(true);
    //       }),
    //       switchMap((val: IMapView) => this.getViewInfo(val))
    //     )
    //     .subscribe(
    //       (viewInfo) => {
    //         this.ngZone.run(() => {
    //           this.viewInfo = viewInfo;
    //           this.isLoading.next(false);
    //         });
    //       },
    //       (_) => {
    //         this.ngZone.run(() => {
    //           this.isLoading.next(false);
    //         });
    //       }
    //     )
    // );
    this.showMapCenter$ = this.userSettingService.showMapCenter$;
    this.mapView$ = this.createMapView$();
    this.horizontalDistanceFromGpsPos$ = this.createHorizontalDistanceFromGpsPos$();
    this.mapCenterNameAndHeightData$ = this.createMapCenterNameAndHeightData$();
    this.heightDifference$ = this.createHeightDifference$();
  }

  private createMapView$(): Observable<IMapView> {
    return this.showMapCenter$.pipe(
      switchMap((showMapCenter) => {
        if (showMapCenter) {
          return this.mapService.relevantMapChangeWithInitialView$;
        }
        return of(null);
      })
    );
  }

  private createHorizontalDistanceFromGpsPos$(): Observable<string> {
    return combineLatest(
      [this.showMapCenter$, this.mapView$, this.geoPositionService.currentPosition$]).pipe(
      tap(([showMapCenter, mapView, gpsPos]) => {this.loggingService.debug(`createHorizontalDistanceFromGpsPos$(): showMapCenter = ${showMapCenter}, center = ${mapView?.center}, gpsPos = ${gpsPos?.coords?.longitude},${gpsPos?.coords?.latitude}`, DEBUG_TAG);}),
      map(([showMapCenter, mapView, gpsPos]) => {
        if (showMapCenter && mapView?.center && gpsPos?.coords) {
          const dist = this.helperService.getDistanceText(
            mapView.center.distanceTo([
              gpsPos.coords.latitude,
              gpsPos.coords.longitude
            ])
          );
          return dist;
        }
        of(null);
      })
    );
  }

  private createMapCenterNameAndHeightData$(): Observable<ViewInfo> {
    return combineLatest(
      [this.showMapCenter$, this.mapView$]).pipe(
      tap(([showMapCenter, mapView]) => {
        this.loggingService.debug(`createMapCenterNameAndHeightData$(): showMapCenter = ${showMapCenter}, center = ${mapView?.center}`, DEBUG_TAG);
      }),
      // tap(() => {
      //   this.ngZone.run(() => {
      //     this.loading = true;
      //     this.cdr.markForCheck();
      //   });
      // }),
      switchMap(([showMapCenter, mapView]) => {
        if (showMapCenter && mapView?.center) {
          // this.isLoading.next(true);
          this.loggingService.debug('createMapCenterNameAndHeightData$(): henter lokasjonsdata', DEBUG_TAG);
          return this.mapSearchService.getViewInfo(mapView);
        }
        return of(null);
      }),
      // tap(() => {
      //   this.ngZone.run(() => {
      //     this.loading = false;
      //     this.cdr.markForCheck();
      //   });
      // })
    );
  }

  private createHeightDifference$(): Observable<HeightDifference> {
    return combineLatest([this.showMapCenter$, this.mapCenterNameAndHeightData$, this.geoPositionService.currentPosition$]).pipe(
      tap(([showMapCenter, mapView, gpsPos]) => {
        this.loggingService.debug(`createHeightDifference$(): showMapCenter = ${showMapCenter}, elevation = ${mapView?.elevation}, gpsPos = ${gpsPos?.coords?.longitude},${gpsPos?.coords?.latitude}`, DEBUG_TAG);
      }),
      map(([showMapCenter, mapView, gpsPos]) => {
        const gpsAltitude = gpsPos?.coords?.altitude ? gpsPos?.coords?.altitude : 42;
        if (showMapCenter && mapView?.elevation && gpsAltitude) {
          let heightDifference = undefined;
          let gpsPosIsBelowMapCenter = undefined;
          heightDifference = Math.abs(mapView.elevation - gpsAltitude).toFixed() + ' m';
          if (gpsAltitude < mapView.elevation) {
            gpsPosIsBelowMapCenter = true;
          } else if (gpsAltitude > mapView.elevation) {
            gpsPosIsBelowMapCenter = false;
          } else {
            heightDifference = '';
          }
          return {
            heightDifferenceFromGpsPos: heightDifference,
            gpsPosIsBelowMapCenter: gpsPosIsBelowMapCenter
          } as HeightDifference;
        } else {
          return null;
        }
      })
    );
  }

  ngDoCheck(): void {
    const rowCount = this.getVisibleRowCount();
    if (rowCount !== this.rowCount) {
      this.rowCount = rowCount;
      this.ngZone.run(() => {
        this.setHeightStyle(rowCount);
      });
    }
  }

  private getVisibleRowCount(): number {
    const rows = this.document.getElementsByName('map-center-info-row');
    this.loggingService.debug(`row count = ${rows.length}, spinner is visible = ${this.loading}`, DEBUG_TAG);
    // if (this.loading) {
    //   return rows.length + 2; //spinner takes 2 rows
    // }
    return rows.length;
  }

  private setHeightStyle(numRows: number): void {
    const padding = numRows > 0 ? 20 : 0;
    this.document.documentElement.style.setProperty(
      '--map-center-info-height',
      `${padding + numRows * 17}px`
    );
  }

  private useNativeClipboardPlugin() {
    return (
      this.platform.is('hybrid') &&
      (this.platform.is('android') || this.platform.is('ios'))
    );
  }

  async copyToClipboard(): Promise<void> {
    const mapView = await firstValueFrom(this.mapView$);
    const textToCopy = `${mapView.center.lat}, ${mapView.center.lng}`;
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

  // TODO: Make service?
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

