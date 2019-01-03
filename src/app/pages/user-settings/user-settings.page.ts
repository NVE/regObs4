import { Component, OnInit, NgZone } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { NanoSql } from '../../../nanosql';
import { NavController, AlertController } from '@ionic/angular';
import { LangKey } from '../../core/models/langKey';
import { HelperService } from '../../core/services/helpers/helper.service';
import { AppCountry } from '../../core/models/app-country.enum';
import { KdvService } from '../../core/services/kdv/kdv.service';
import { TranslateService } from '@ngx-translate/core';
import { OfflineImageService } from '../../core/services/offline-image/offline-image.service';
import { AppVersionService } from '../../core/services/app-version/app-version.service';
import { AppVersion } from '../../core/models/app-version.model';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

  userSettings: UserSetting;
  LangKey = LangKey;
  showAdvanced = false;
  numberOfCacheTiles: number;
  cacheTilesSize: string;
  AppCountry = AppCountry;
  isUpdating = false;
  version: AppVersion;

  constructor(
    private userSettingService: UserSettingService,
    private offlineMapService: OfflineMapService,
    private helperService: HelperService,
    private kdvService: KdvService,
    private ngZone: NgZone,
    private translateService: TranslateService,
    private alertController: AlertController,
    private offlineImageService: OfflineImageService,
    private appVersionService: AppVersionService,
    private navController: NavController) { }

  async ngOnInit() {
    this.userSettings = await this.userSettingService.getUserSettings();
    const appver = await this.appVersionService.getAppVersion();
    this.ngZone.run(() => {
      this.version = appver;
    });
  }

  async updateSettings() {
    await this.userSettingService.saveUserSettings(this.userSettings);
  }

  async toggleAdvanced() {
    this.showAdvanced = !this.showAdvanced;
    if (this.showAdvanced) {
      if (this.numberOfCacheTiles === undefined) {
        const tilesCache = await this.offlineMapService.getTilesCacheSize();
        this.ngZone.run(() => {
          this.numberOfCacheTiles = tilesCache.count;
          this.cacheTilesSize = this.helperService.humanReadableByteSize(tilesCache.size);
        });
      }
    }
  }

  async updateDropdowns() {
    this.isUpdating = true;
    let failed = false;
    try {
      // TODO: Show loading with cancel
      await this.kdvService.updateKdvElementsForLanguage(this.userSettings.appMode, this.userSettings.language);
    } catch (err) {
      failed = true;
    } finally {
      await this.showKdvElementsUpdated(failed);
      this.ngZone.run(() => {
        this.isUpdating = false;
      });
    }
  }

  async showKdvElementsUpdated(failed: boolean) {
    const translations = await this.translateService.get(
      ['SETTINGS.DROPDOWNS_UPDATED', 'SETTINGS.DROPDOWNS_FAILED', 'ALERT.OK']).toPromise();
    const alert = await this.alertController.create({
      message: failed ? translations['SETTINGS.DROPDOWNS_FAILED'] : translations['SETTINGS.DROPDOWNS_UPDATED'],
      buttons: [translations['ALERT.OK']]
    });
    alert.present();
    return alert.onDidDismiss();
  }

  async reset() {
    this.isUpdating = true;
    await this.offlineMapService.reset();
    await this.offlineImageService.reset();
    await NanoSql.dropAllTables();
    await this.navController.navigateRoot('start-wizard');
  }
}
