import { Component, OnInit, ViewChild } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Slides, NavController } from '@ionic/angular';
import { AppMode } from '../../core/models/app-mode.enum';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { LangKey } from '../../core/models/langKey';
import { AppCountry } from '../../core/models/app-country.enum';

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
  AppCountry = AppCountry;
  LangKey = LangKey;
  countries = {
    'norway': false,
    'world': false,
  };

  constructor(private userSetting: UserSettingService, private navController: NavController) { }

  async ngOnInit() {
    await this.updateFromUserSettings();
  }

  async updateFromUserSettings() {
    const userSettings = await this.userSetting.getUserSettings();
    for (const key in this.languages) {
      if (this.languages.hasOwnProperty(key)) {
        this.languages[key] = false;
      }
    }
    const langKeyName = LangKey[userSettings.language];
    this.languages[langKeyName] = true;

    for (const key in this.countries) {
      if (this.countries.hasOwnProperty(key)) {
        this.countries[key] = false;
      }
    }
    const countryName = AppCountry[userSettings.country];
    this.countries[countryName] = true;
  }

  async changeLanguage(language: LangKey) {
    const userSettings = await this.userSetting.getUserSettings();
    userSettings.language = language;
    await this.userSetting.saveUserSettings(userSettings);
    await this.updateFromUserSettings();
    this.slides.slideNext();
  }

  async changeCountry(country: AppCountry) {
    const userSettings = await this.userSetting.getUserSettings();
    userSettings.country = country;
    await this.userSetting.saveUserSettings(userSettings);
    await this.updateFromUserSettings();
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
