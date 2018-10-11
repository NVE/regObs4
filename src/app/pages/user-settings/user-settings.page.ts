import { Component, OnInit } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { ObservationService } from '../../core/services/observation/observation.service';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { WarningService } from '../../core/services/warning/warning.service';
import { NanoSql } from '../../../nanosql';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

  userSettings: UserSetting;

  constructor(
    private userSettingService: UserSettingService,
    private observationService: ObservationService,
    private offlineMapService: OfflineMapService,
    private warningService: WarningService,
    private navController: NavController) { }

  async ngOnInit() {
    this.userSettings = await this.userSettingService.getUserSettings();
  }

  async updateSettings() {
    await this.userSettingService.saveUserSettings(this.userSettings);
  }

  async reset() {
    await this.offlineMapService.reset();
    await NanoSql.dropAllTables();
    console.log('[INFO] App reset complete');
    await this.navController.navigateRoot('start-wizard');
  }
}
