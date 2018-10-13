import { Component, OnInit, OnDestroy, HostBinding, Inject, NgZone } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { ToastController, Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { MapService } from '../../core/services/map/map.service';
import { IMapView } from '../../core/services/map/map-view.interface';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { MapSearchService } from '../../core/services/map-search/map-search.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ViewInfo } from '../../core/services/map-search/view-info.model';
import { UserSetting } from '../../core/models/user-settings.model';

@Component({
  selector: 'app-map-center-info',
  templateUrl: './map-center-info.component.html',
  styleUrls: ['./map-center-info.component.scss']
})
export class MapCenterInfoComponent implements OnInit, OnDestroy {
  viewInfo$: Observable<ViewInfo>;
  mapView$: Observable<IMapView>;
  userSettings$: Observable<UserSetting>;
  isLoading: boolean;

  private textToCopy: string;

  constructor(
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private mapSerachService: MapSearchService,
    private clipboard: Clipboard,
    private toastController: ToastController,
    private translateService: TranslateService,
    private platform: Platform,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document) {
  }

  async ngOnInit() {
    this.userSettings$ = this.userSettingService.userSettingObservable$.pipe(tap((val) => {
      this.document.documentElement.style.setProperty('--map-center-info-height', val.showMapCenter ? '72px' : '0px');
    }));
    this.mapView$ = this.mapService.mapViewObservable$.pipe(tap((val) => {
      this.textToCopy = `${val.center.lat}, ${val.center.lng}`;
      this.zone.run(() => {
        this.isLoading = true;
      });
    }));
    this.viewInfo$ = this.mapView$
      .pipe(switchMap((mapView: IMapView) => this.mapSerachService.getViewInfo(mapView.center)),
        tap(() => {
          this.zone.run(() => {
            this.isLoading = false;
          });
        }));
  }
  ngOnDestroy(): void {
  }

  private useNativeClipboardPlugin() {
    return window.hasOwnProperty('cordova') && (this.platform.is('android') || this.platform.is('ios'));
  }

  async copyToClipboard() {
    if (this.useNativeClipboardPlugin()) {
      await this.clipboard.copy(this.textToCopy);
    } else {
      this.copyToClipBoardWeb(this.textToCopy);
    }
    const toastText = await this.translateService.get('MAP_CENTER_INFO.COPIED_TO_CLIPBOARD').toPromise();
    const toast = await this.toastController.create({
      message: toastText,
      duration: 2000,
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
