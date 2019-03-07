import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IonSlides, NavController } from '@ionic/angular';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { LangKey } from '../../core/models/langKey';
import { UserSetting } from '../../core/models/user-settings.model';
import { animations } from './start-wizard.animations';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
  animations: animations,
})

export class StartWizardPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  GeoHazard = GeoHazard;
  LangKey = LangKey;
  userSettings: UserSetting;
  state = 'x';
  reachedEnd = false;

  constructor(private userSetting: UserSettingService,
    private navController: NavController,
    private ngZone: NgZone) { }

  async ngOnInit() {
    this.userSettings = await this.userSetting.getUserSettings();
    setTimeout(() => {
      this.state = 'page_0';
    }, 0);
  }

  slideNext() {
    setTimeout(() => {
      if (this.slides) {
        this.slides.slideNext();
      }
    }, 700);
  }

  async start() {
    if (this.reachedEnd) {
      this.userSettings.completedStartWizard = true;
      this.userSetting.saveUserSettings(this.userSettings);
      this.navController.navigateRoot('/');
    } else {
      this.slides.slideTo(4);
    }
  }

  saveUserSettings() {
    this.userSetting.saveUserSettings(this.userSettings);
  }

  async ionSlideTransitionStart() {
    const index = await this.slides.getActiveIndex();
    this.ngZone.run(() => {
      this.state = `page_${index}`;
    });
  }

  ionSlideReachEnd() {
    this.reachedEnd = true;
  }

  ionSlidePrevStart() {
    this.reachedEnd = false;
  }
}
