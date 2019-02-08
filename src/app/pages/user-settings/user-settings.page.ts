import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { NanoSql } from '../../../nanosql';
import { NavController, AlertController } from '@ionic/angular';
import { LangKey } from '../../core/models/langKey';
import { HelperService } from '../../core/services/helpers/helper.service';
import { KdvService } from '../../core/services/kdv/kdv.service';
import { TranslateService } from '@ngx-translate/core';
import { OfflineImageService } from '../../core/services/offline-image/offline-image.service';
import { AppVersionService } from '../../core/services/app-version/app-version.service';
import { AppVersion } from '../../core/models/app-version.model';
import { TopoMap } from '../../core/models/topo-map.enum';
import { Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'UserSettingsPage';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit, OnDestroy {
  userSettings: UserSetting;
  LangKey = LangKey;
  showAdvanced = false;
  numberOfCacheTiles: number;
  cacheTilesSize: string;
  isUpdating = false;
  version: AppVersion;
  TopoMap = TopoMap;
  private subscriptions: Subscription[] = [];

  constructor(
    private userSettingService: UserSettingService,
    private offlineMapService: OfflineMapService,
    private helperService: HelperService,
    private kdvService: KdvService,
    private ngZone: NgZone,
    private loggingService: LoggingService,
    private translateService: TranslateService,
    private alertController: AlertController,
    private offlineImageService: OfflineImageService,
    private appVersionService: AppVersionService,
    private navController: NavController) { }

  async ngOnInit() {
    this.subscriptions.push(this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
      });
    }));
    this.subscriptions.push(this.userSettingService.userSettingObservable$
      .pipe(map((val) => val.tilesCacheSize), distinctUntilChanged()).subscribe((val) => {
        this.loggingService.debug('tilesCacheSize changed to ' + val, DEBUG_TAG);
        this.offlineMapService.cleanupTilesCache(val);
      }));
    this.subscriptions.push(this.offlineMapService.getTilesCacheAsObservable().subscribe((tilesCache) => {
      this.ngZone.run(() => {
        this.numberOfCacheTiles = tilesCache.count;
        this.cacheTilesSize = this.helperService.humanReadableByteSize(tilesCache.size);
      });
    }));
    const appver = await this.appVersionService.getAppVersion();
    this.ngZone.run(() => {
      this.version = appver;
    });
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  async updateSettings() {
    await this.userSettingService.saveUserSettings(this.userSettings);
  }

  async toggleAdvanced() {
    this.showAdvanced = !this.showAdvanced;
  }

  async updateDropdowns() {
    this.isUpdating = true;
    // TODO: Show loading with cancel
    const updated = await this.kdvService.updateKdvElementsForLanguage(this.userSettings.appMode, this.userSettings.language);
    await this.showKdvElementsUpdated(updated);
    this.ngZone.run(() => {
      this.isUpdating = false;
    });
  }

  async showKdvElementsUpdated(ok: boolean) {
    const translations = await this.translateService.get(
      ['SETTINGS.DROPDOWNS_UPDATED', 'SETTINGS.DROPDOWNS_FAILED', 'ALERT.OK']).toPromise();
    const alert = await this.alertController.create({
      message: ok ? translations['SETTINGS.DROPDOWNS_UPDATED'] : translations['SETTINGS.DROPDOWNS_FAILED'],
      buttons: [translations['ALERT.OK']]
    });
    alert.present();
    return alert.onDidDismiss();
  }

  async reset() {
    this.isUpdating = true;
    // await this.offlineMapService.reset();
    // await this.offlineImageService.reset();
    await NanoSql.resetDb();
    this.navController.navigateRoot('start-wizard');
  }
}
