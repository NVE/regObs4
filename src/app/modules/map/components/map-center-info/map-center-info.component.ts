import { Component, OnInit, OnDestroy, Inject, NgZone } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, of, Observable } from 'rxjs';
import { switchMap, tap, filter, map } from 'rxjs/operators';
import { ViewInfo } from '../../services/map-search/view-info.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { IMapView } from '../../services/map/map-view.interface';
import { MapService } from '../../services/map/map.service';
import { GeoPositionService } from 'src/app/core/services/geo-position/geo-position.service';
import { Geoposition } from '@ionic-native/geolocation/ngx';

interface ViewInfoWithDistance extends ViewInfo {
  horizontalDistanceFromGpsPos?: number;
  heightDifferenceFromGpsPos?: number; //if < 0 = map center is below GPS position
}

@Component({
  selector: 'app-map-center-info',
  templateUrl: './map-center-info.component.html',
  styleUrls: ['./map-center-info.component.scss']
})
export class MapCenterInfoComponent implements OnInit, OnDestroy {
  viewInfo: ViewInfoWithDistance;
  mapView: IMapView;
  showMapCenter: boolean;
  isLoading: boolean;

  private textToCopy: string;
  private subscriptions: Subscription[] = [];

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
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit() {
    const showMapCenterObservable = this.userSettingService.showMapCenter$.pipe(
      tap((showMapCenter) => {
        this.ngZone.run(() => {
          this.showMapCenter = showMapCenter;
          this.document.documentElement.style.setProperty(
            '--map-center-info-height',
            showMapCenter ? '89px' : '0px'
          );
        });
      })
    );
    this.subscriptions.push(
      showMapCenterObservable
        .pipe(
          switchMap((showMapCenter) =>
            showMapCenter ? this.mapService.mapView$ : of(null)
          ),
          filter((val) => !!val)
        )
        .subscribe((mapView) => {
          this.ngZone.run(() => {
            this.mapView = mapView;
            this.textToCopy = `${mapView.center.lat}, ${mapView.center.lng}`;
          });
        })
    );
    this.subscriptions.push(
      showMapCenterObservable
        .pipe(
          switchMap((showMapCenter) =>
            showMapCenter ? this.mapService.relevantMapChange$ : of(null)
          ),
          filter((val) => !!val),
          tap(() => {
            this.ngZone.run(() => {
              this.isLoading = true;
            });
          }),
          switchMap((val: IMapView) => this.getViewInfo(val))
        )
        .subscribe(
          (viewInfo) => {
            this.ngZone.run(() => {
              this.viewInfo = viewInfo;
              this.isLoading = false;
            });
          },
          (_) => {
            this.ngZone.run(() => {
              this.isLoading = false;
            });
          }
        )
    );
  }

  private getViewInfo(mapView: IMapView): Observable<ViewInfoWithDistance> {
    return this.mapSearchService
      .getViewInfo(mapView)
      .pipe(
        switchMap((viewInfo) =>
          this.geoPositionService.currentPosition$.pipe(
            map((gpsPos) => this.createViewInfoWithDistance(viewInfo, gpsPos))
          )
        )
      );
  }

  private createViewInfoWithDistance(
    viewInfo: ViewInfo,
    gpsPos: Geoposition
  ): ViewInfoWithDistance {
    if (viewInfo) {
      let horizontalDistance = undefined;
      let heightDifference = undefined;
      if (gpsPos) {
        if (gpsPos.coords) {
          horizontalDistance = viewInfo.latLng
            .distanceTo([gpsPos.coords.latitude, gpsPos.coords.longitude])
            .toFixed();
          if (gpsPos.coords.altitude) {
            heightDifference = (
              viewInfo.elevation - gpsPos.coords.altitude
            ).toFixed();
          }
          heightDifference = -100;
        }
      }
      return {
        location: viewInfo.location,
        elevation: viewInfo.elevation,
        steepness: viewInfo.steepness,
        latLng: viewInfo.latLng,
        horizontalDistanceFromGpsPos: horizontalDistance,
        heightDifferenceFromGpsPos: heightDifference
      };
    } else {
      return null;
    }
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private useNativeClipboardPlugin() {
    return (
      this.platform.is('cordova') &&
      (this.platform.is('android') || this.platform.is('ios'))
    );
  }

  async copyToClipboard() {
    if (this.useNativeClipboardPlugin()) {
      await this.clipboard.copy(this.textToCopy);
    } else {
      this.copyToClipBoardWeb(this.textToCopy);
    }
    const toastText = await this.translateService
      .get('MAP_CENTER_INFO.COPIED_TO_CLIPBOARD')
      .toPromise();
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
