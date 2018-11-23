import { Component, OnInit, ViewChild } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Slides, NavController } from '@ionic/angular';
import { AppMode } from '../../core/models/app-mode.enum';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { LangKey } from '../../core/models/langKey';
import { AppCountry } from '../../core/models/app-country.enum';
import { UserSetting } from '../../core/models/user-settings.model';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
})

export class StartWizardPage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  GeoHazard = GeoHazard;
  AppCountry = AppCountry;
  LangKey = LangKey;
  userSettings: UserSetting;

  constructor(private userSetting: UserSettingService, private navController: NavController) { }

  async ngOnInit() {
    this.userSettings = await this.userSetting.getUserSettings();
  }

  slideNext() {
    this.slides.slideNext();
  }

  async selectGeoHazard(geoHazards: GeoHazard[]) {
    this.userSettings.currentGeoHazard = geoHazards;
    this.userSettings.completedStartWizard = true;
    this.userSetting.saveUserSettings(this.userSettings);
    this.navController.navigateRoot('/');
  }

  saveUserSettings() {
    this.userSetting.saveUserSettings(this.userSettings);
  }
}
