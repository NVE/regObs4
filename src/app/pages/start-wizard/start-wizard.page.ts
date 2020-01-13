import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IonSlides, NavController } from '@ionic/angular';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { LangKey } from '../../core/models/langKey';
import { UserSetting } from '../../core/models/user-settings.model';
import { animations } from './start-wizard.animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
  animations: animations,
})

export class StartWizardPage implements OnInit, OnDestroy {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  GeoHazard = GeoHazard;
  LangKey = LangKey;
  userSettings: UserSetting;
  state = 'x';
  reachedEnd = false;
  showLegalIcon = false;
  private subscription: Subscription;

  constructor(private userSetting: UserSettingService,
    private navController: NavController,
    private ngZone: NgZone,
  ) { }

  async ngOnInit() {
    this.subscription = this.userSetting.userSettingObservable$.subscribe((val) => {
      this.userSettings = val;
    });
    setTimeout(() => {
      this.state = 'page_0';
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
      this.slides.slideTo(5, 200);
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
    setTimeout(() => {
      this.showLegalIcon = true;
      // Crazy ios bug to get animation on spinner.. :o
    }, 0);
  }

  ionSlidePrevStart() {
    this.reachedEnd = false;
  }
}
