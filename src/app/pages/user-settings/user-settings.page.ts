import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { NanoSql } from '../../../nanosql';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { LangKey } from '../../core/models/langKey';
import { KdvService } from '../../core/services/kdv/kdv.service';
import { TranslateService } from '@ngx-translate/core';
import { AppVersionService } from '../../core/services/app-version/app-version.service';
import { AppVersion } from '../../core/models/app-version.model';
import { Subscription } from 'rxjs';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { DataMarshallService } from '../../core/services/data-marshall/data-marshall.service';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { HelperService } from '../../core/services/helpers/helper.service';

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
  private subscriptions: Subscription[] = [];

  constructor(
    private userSettingService: UserSettingService,
    private offlineMapService: OfflineMapService,
    private helperService: HelperService,
    private kdvService: KdvService,
    private ngZone: NgZone,
    private loggingService: LoggingService,
    private translateService: TranslateService,
    private dataMarshallService: DataMarshallService,
    private alertController: AlertController,
    private appVersionService: AppVersionService,
    private loadingController: LoadingController,
    private navController: NavController) { }

  async ngOnInit() {
    this.subscriptions.push(this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
      });
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
    this.stopSubscriptions();
  }

  private stopSubscriptions() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.subscriptions = [];
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

  async confirmReset() {
    const translations = await this.translateService.get(
      ['SETTINGS.CONFIRM_RESET', 'ALERT.OK', 'ALERT.CANCEL']).toPromise();
    const alert = await this.alertController.create({
      message: translations['SETTINGS.CONFIRM_RESET'],
      buttons: [{
        text: translations['ALERT.OK'],
        handler: () => this.reset(),
      },
      {
        text: translations['ALERT.CANCEL'],
        role: 'cancel',
      }
      ]
    });
    alert.present();
  }

  async reset() {
    const message = await this.translateService.get('SETTINGS.RESETTING').toPromise();
    const loading = await this.loadingController.create({
      message,
    });
    loading.present();
    this.isUpdating = true;
    this.stopSubscriptions();
    this.dataMarshallService.unsubscribeAll();
    await NanoSql.resetDb();
    this.userSettingService.initObservables();
    this.dataMarshallService.init();
    this.isUpdating = false;
    loading.dismiss();
    this.navController.navigateRoot('start-wizard');
  }
}
