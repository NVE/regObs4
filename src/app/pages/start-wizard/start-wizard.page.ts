import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IonSlides, NavController } from '@ionic/angular';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { LangKey } from '../../core/models/langKey';
import { UserSetting } from '../../core/models/user-settings.model';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
  animations: [
    trigger('bounce', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('* => rightSwipe', animate('700ms ease-out', keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translateX(-65px)', offset: 0.3 }),
        style({ transform: 'translateX(0)', offset: 1.0 })
      ]))),
      transition('* => leftSwipe', animate('700ms ease-out', keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translateX(65px)', offset: 0.3 }),
        style({ transform: 'translateX(0)', offset: 1.0 })
      ])))
    ])
  ]
})

export class StartWizardPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  GeoHazard = GeoHazard;
  LangKey = LangKey;
  userSettings: UserSetting;
  state = 'x';

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

  async slideMoved() {
    const activeIndex = await this.slides.getActiveIndex();
    const prevIndex = await this.slides.getPreviousIndex();
    if (activeIndex >= prevIndex) {
      this.state = 'rightSwipe';
    } else {
      this.state = 'leftSwipe';
    }
  }

  animationDone() {
    this.state = 'x';
  }
}
