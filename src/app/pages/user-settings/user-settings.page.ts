import { Component, OnInit } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { NanoSql } from '../../../nanosql';
import { NavController } from '@ionic/angular';
import { LangKey } from '../../core/models/langKey';
import { HelperService } from '../../core/services/helpers/helper.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

  userSettings: UserSetting;
  LangKey = LangKey;
  showAdvanced = false;
  showDebug = false;
  numberOfCacheTiles: number;
  cacheTilesSize: string;

  constructor(
    private userSettingService: UserSettingService,
    private offlineMapService: OfflineMapService,
    private helperService: HelperService,
    private navController: NavController) { }

  async ngOnInit() {
    this.userSettings = await this.userSettingService.getUserSettings();
  }

  async updateSettings() {
    await this.userSettingService.saveUserSettings(this.userSettings);
  }

  async showDebugClick() {
    this.showDebug = true;
    const tilesCache = await this.offlineMapService.getTilesCacheSize();
    this.numberOfCacheTiles = tilesCache.tiles;
    this.cacheTilesSize = this.helperService.humanReadableByteSize(tilesCache.folderSize);
  }

  async reset() {
    await this.offlineMapService.reset();
    await NanoSql.dropAllTables();
    console.log('[INFO] App reset complete');
    await this.navController.navigateRoot('start-wizard');
  }
}
