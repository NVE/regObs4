import { Component, OnInit } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

  userSettings: UserSetting;

  constructor(private userSettingService: UserSettingService) { }

  async ngOnInit() {
    this.userSettings = await this.userSettingService.getUserSettings();
  }

  async updateSettings() {
    await this.userSettingService.saveUserSettings(this.userSettings);
  }

}
