import { Component, OnInit } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { ObservationService } from '../../core/services/observation/observation.service';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';

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
    private offlineMapService: OfflineMapService) { }

  async ngOnInit() {
    this.userSettings = await this.userSettingService.getUserSettings();
  }

  async updateSettings() {
    await this.userSettingService.saveUserSettings(this.userSettings);
  }

  async reset() {
    await this.observationService.drop();
    await this.userSettingService.reset();
    await this.offlineMapService.clear();
    console.log('Observations reset');
  }
}
