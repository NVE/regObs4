import { Component, OnInit, ViewChild } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting.service';
import { Slides, NavController } from '@ionic/angular';
import { AppMode } from '../../core/models/app-mode.enum';
import { GeoHazard } from '../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
})

export class StartWizardPage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  languages = {
    'no': false,
    'en': false
  };
  GeoHazard = GeoHazard;

  constructor(private userSetting: UserSettingService, private navController: NavController) { }

  async ngOnInit() {
    await this.updateLanguagesFromUserSettings();
  }

  async updateLanguagesFromUserSettings() {
    const userSettings = await this.userSetting.getUserSettings();
    for (const key in this.languages) {
      if (this.languages.hasOwnProperty(key)) {
        this.languages[key] = false;
      }
    }
    this.languages[userSettings.language] = true;
  }

  async changeLanguage(language: 'no' | 'en') {
    const userSettings = await this.userSetting.getUserSettings();
    userSettings.language = language;
    this.userSetting.saveUserSettings(userSettings);
    await this.updateLanguagesFromUserSettings();
    this.slides.slideNext();
  }

  async selectGeoHazard(geoHazard: GeoHazard) {
    const userSettings = await this.userSetting.getUserSettings();
    userSettings.currentGeoHazard = geoHazard;
    userSettings.completedStartWizard = true;
    this.userSetting.saveUserSettings(userSettings);
    this.navController.navigateRoot('/');
  }
}
