import { Component, OnInit } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { CustomAnimation, EASING_IN_OUT_BACK } from '../../core/animations/custom.animation';

@Component({
  selector: 'app-coach-marks',
  templateUrl: './coach-marks.component.html',
  styleUrls: ['./coach-marks.component.scss'],
  animations: [
    trigger('geo-fab-animation', CustomAnimation.createEnterAnimation(200, 500, EASING_IN_OUT_BACK)),
    trigger('geo-coachmark-animation', CustomAnimation.createEnterAnimation(800)),
    trigger('add-fab-animation', CustomAnimation.createEnterAnimation(3000, 500, EASING_IN_OUT_BACK)),
    trigger('add-text-animation', CustomAnimation.createEnterAnimation(3500)),
    trigger('warning-icon-animation', CustomAnimation.createEnterAnimation(4000, 500, EASING_IN_OUT_BACK)),
    trigger('warning-coachmark-animation', CustomAnimation.createEnterAnimation(4500)),
  ]
})
export class CoachMarksComponent implements OnInit {

  showCoachMarks = false;
  private subscription: Subscription;
  isOpen = false;

  constructor(private userSettingService: UserSettingService) { }

  ngOnInit() {
    this.subscription = this.userSettingService.userSettingObservable$
      .pipe(
        map((us) => us.showGeoSelectInfo),
        distinctUntilChanged()
      ).subscribe((showGeoSelectInfo) => {
        this.showCoachMarks = showGeoSelectInfo;
      });
    setTimeout(() => {
      this.isOpen = true;
    }, 2000);
  }

  async hide() {
    this.showCoachMarks = false;
    const userSettings = await this.userSettingService.getUserSettings();
    userSettings.showGeoSelectInfo = false;
    this.userSettingService.saveUserSettings(userSettings);
  }

}
