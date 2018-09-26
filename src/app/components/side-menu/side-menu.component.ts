import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { Events } from '@ionic/angular';
import { settings } from '../../../settings';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {

  lastUpdated: Date;
  interval: NodeJS.Timer;
  userSettings: UserSetting;

  constructor(
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private events: Events) {

  }

  async ngOnInit() {
    this.lastUpdated = await this.observationService.getLastUpdated();
    this.userSettings = await this.userSettingService.getUserSettings();
    this.interval = setInterval(async () => {
      this.lastUpdated = await this.observationService.getLastUpdated();
    }, 10000);
    // TODO: Use observable instead! And also get last updated for current geoHazard!
    this.events.subscribe(settings.events.userSettingsChanged, (newSettings) => {
      this.userSettings = newSettings;
    });
  }

  async saveUserSettings() {
    await this.userSettingService.saveUserSettings(this.userSettings);
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.userSettingsChanged);
    clearInterval(this.interval);
  }

  async updateObservations() {
    await this.observationService.updateObservations();
    this.lastUpdated = await this.observationService.getLastUpdated();
  }

}
