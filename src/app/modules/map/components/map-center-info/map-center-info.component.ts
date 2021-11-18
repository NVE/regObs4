import { Component, OnInit, OnDestroy, Inject, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, of, Observable, combineLatest, firstValueFrom, BehaviorSubject } from 'rxjs';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { ViewInfo } from '../../services/map-search/view-info.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { IMapView } from '../../services/map/map-view.interface';
import { MapService } from '../../services/map/map.service';
import { GeoPositionService } from 'src/app/core/services/geo-position/geo-position.service';
import { HelperService } from 'src/app/core/services/helpers/helper.service';
import L from 'leaflet';

interface HeightDifference extends ViewInfo {
  heightDifferenceFromGpsPos?: string; //including unit (m)
  gpsPosIsBelowMapCenter?: boolean;
}

@Component({
  selector: 'app-map-center-info',
  templateUrl: './map-center-info.component.html',
  styleUrls: ['./map-center-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapCenterInfoComponent implements OnInit, OnDestroy {
  showMapCenter$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  mapCenterCoords$: Observable<L.LatLng>;
  horizontalDistanceFromGpsPos$: Observable<string>; //including unit (m or km)
  heightDifference$: Observable<HeightDifference>;
  mapCenterNameAndHeightData$: Observable<ViewInfo>;
  mapView$: Observable<IMapView>;

  private subscriptions: Subscription[] = [];
  private isLoading = new BehaviorSubject(false);

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
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isLoading$ = this.isLoading.asObservable();
  }

  async ngOnInit(): Promise<void> {
    this.showMapCenter$ = this.userSettingService.showMapCenter$.pipe(
      tap(() => {
        this.ngZone.run(() => {
          this.setHeightStyle(5);
          // this.setHeightStyle(showMapCenter ? 1 : 0);
        });
      })
    );
    // this.subscriptions.push(
    //   this.userSettingService.showMapCenter$
    //     .pipe(
    //       switchMap((showMapCenter) =>
    //         showMapCenter ? this.mapService.mapView$ : of(null)
    //       ),
    //       filter((val) => !!val)
    //     )
    //     .subscribe((mapView) => {
    //       this.ngZone.run(() => {
    //         this.mapView = mapView;
    //         this.textToCopy = `${mapView.center.lat}, ${mapView.center.lng}`;
    //       });
    //     })
    // );
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
    this.mapView$ = this.createMapView$();
    this.horizontalDistanceFromGpsPos$ = this.createHorizontalDistanceFromGpsPos$();
    this.mapCenterNameAndHeightData$ = this.createMapCenterNameAndHeightData$();
    this.heightDifference$ = this.createHeightDifference$();

    this.mapCenterNameAndHeightData$.pipe(
      tap(() => {
        // this.isLoading.next(false);
      })).subscribe();
  }

  private createMapView$(): Observable<IMapView> {
    return this.userSettingService.showMapCenter$.pipe(
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
      [this.userSettingService.showMapCenter$, this.mapService.relevantMapChange$, this.geoPositionService.currentPosition$]).pipe(
      tap(([showMapCenter, mapView, gpsPos]) => {console.log(`createHorizontalDistanceFromGpsPos$(): showMapCenter = ${showMapCenter}, center = ${mapView?.center}, gpsPos = ${gpsPos?.coords?.longitude},${gpsPos?.coords?.latitude}`);}),
      map(([showMapCenter, mapView, gpsPos]) => {
        if (showMapCenter && mapView?.center && gpsPos?.coords) {
          const dist = this.helperService.getDistanceText(
            mapView.center.distanceTo([
              gpsPos.coords.latitude,
              gpsPos.coords.longitude
            ])
          );
          console.log(`new horizontal distance = ${dist}`);
          return dist;
        }
        of(null);
      })
    );
  }

  private createMapCenterNameAndHeightData$(): Observable<ViewInfo> {
    return combineLatest(
      [this.userSettingService.showMapCenter$, this.mapView$]).pipe(
      tap(([showMapCenter, mapView]) => {console.log(`createViewInfoWithDistance$(): showMapCenter = ${showMapCenter}, center = ${mapView?.center}`);}),
      switchMap(([showMapCenter, mapView]) => {
        if (showMapCenter && mapView?.center) {
          // this.isLoading.next(true);
          console.log('henter lokasjonsdata');
          return this.mapSearchService.getViewInfo(mapView);
        }
        return of(null);
      })
    );
  }

  private createHeightDifference$(): Observable<HeightDifference> {
    return combineLatest([this.userSettingService.showMapCenter$, this.mapCenterNameAndHeightData$, this.geoPositionService.currentPosition$]).pipe(
      tap(([showMapCenter, mapView, gpsPos]) => {console.log(`createHeightDifference$(): showMapCenter = ${showMapCenter}, elevation = ${mapView?.elevation}, gpsPos = ${gpsPos?.coords?.longitude},${gpsPos?.coords?.latitude}`);}),
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
    console.log(`row count (push) = ${rowCount}`);
    this.ngZone.run(() => {
      this.setHeightStyle(rowCount);
    });
  }

  private getVisibleRowCount(): number {
    const rows = this.document.getElementsByName('map-center-info-row');
    return rows.length;
  }

  private setHeightStyle(numRows: number): void {
    const padding = numRows > 0 ? 20 : 0;
    this.document.documentElement.style.setProperty(
      '--map-center-info-height',
      `${padding + numRows * 17}px`
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
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

