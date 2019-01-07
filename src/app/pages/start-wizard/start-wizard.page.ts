import { Component, OnInit, ViewChild } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IonSlides, NavController } from '@ionic/angular';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { LangKey } from '../../core/models/langKey';
import { UserSetting } from '../../core/models/user-settings.model';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
})

export class StartWizardPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  GeoHazard = GeoHazard;
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
