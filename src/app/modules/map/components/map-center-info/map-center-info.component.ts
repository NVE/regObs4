import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { TranslateService } from '@ngx-translate/core';
import { of, Observable, combineLatest, firstValueFrom, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { switchMap, tap, map, filter, timeout } from 'rxjs/operators';
import { ViewInfo } from '../../services/map-search/view-info.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { IMapView } from '../../services/map/map-view.interface';
import { MapService } from '../../services/map/map.service';
import { GeoPositionService } from 'src/app/core/services/geo-position/geo-position.service';
import { HelperService } from 'src/app/core/services/helpers/helper.service';

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
  mapCenterNameAndHeightData$: ReplaySubject<ViewInfo>;
  mapView$: ReplaySubject<IMapView>;
  isLoading$ = new BehaviorSubject<boolean>(false);
  isLoadingInternal = 0;
  constructedDate = new Date();

  constructor(
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private mapSearchService: MapSearchService,
    private clipboard: Clipboard,
    private toastController: ToastController,
    private translateService: TranslateService,
    private platform: Platform,
    private geoPositionService: GeoPositionService,
    private helperService: HelperService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.showMapCenter$ = this.userSettingService.showMapCenter$;
    this.mapView$ = new ReplaySubject(1);
    this.mapCenterNameAndHeightData$ = new ReplaySubject(1);
    this.createMapView();
    this.createMapCenterNameAndHeightData();
    this.horizontalDistanceFromGpsPos$ = this.createHorizontalDistanceFromGpsPos();
    this.heightDifference$ = this.createHeightDifference();

    this.mapService.mapMoveStart$.subscribe(() => {
      if (this.mapService.followMode || new Date().getTime() - this.constructedDate.getTime() < 1000) {
        return;
      }
      this.isLoading$.next(true);
      let counter = this.isLoadingInternal;
      setTimeout(async () => {
        if (counter == this.isLoadingInternal) {
          this.isLoading$.next(false);
        }
      }, 5000);
    })
  }

  private createMapView(): void {
    this.mapService.relevantMapChangeWithInitialView$.subscribe((mapView) => {
      this.isLoadingInternal++;
      this.isLoading$.next(true);
      this.mapView$.next(mapView);
    });
  }

  private createMapCenterNameAndHeightData(): void {
    combineLatest([this.showMapCenter$, this.mapView$]).pipe(
      switchMap(([showMapCenter, mapView]) => {
        if (showMapCenter && mapView?.center) {
          return this.mapSearchService.getViewInfo(mapView).pipe(
            (viewInfo) => {
              this.isLoading$.next(false);
              return viewInfo;
            },
          );
        }
        return of(null);
      }),
    ).subscribe((mapView) => {
      this.mapCenterNameAndHeightData$.next(mapView);
    });
  }

  private createHorizontalDistanceFromGpsPos(): Observable<string> {
    return combineLatest(
      [this.showMapCenter$, this.mapView$, this.geoPositionService.currentPosition$]).pipe(
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

  private createHeightDifference(): Observable<HeightDifference> {
    return combineLatest([this.showMapCenter$, this.mapCenterNameAndHeightData$, this.geoPositionService.currentPosition$]).pipe(
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
      }),
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

