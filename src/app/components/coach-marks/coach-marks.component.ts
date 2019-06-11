import { Component, OnInit } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { CustomAnimation, EASE_IN_OUT_BACK, EASE_IN_OUT } from '../../core/animations/custom.animation';

@Component({
  selector: 'app-coach-marks',
  templateUrl: './coach-marks.component.html',
  styleUrls: ['./coach-marks.component.scss'],
  animations: [
    trigger('geo-coachmark-animation', CustomAnimation.createEnterScaleInAnimation(1000, 500, EASE_IN_OUT, 0.9)),
    trigger('add-fab-animation', CustomAnimation.createEnterScaleInAnimation(3000, 500, EASE_IN_OUT_BACK)),
    trigger('add-text-animation', CustomAnimation.createEnterScaleInAnimation(4000, 500, EASE_IN_OUT, 0.9)),
    trigger('warning-icon-animation', CustomAnimation.createEnterScaleInAnimation(5000, 500, EASE_IN_OUT_BACK)),
    trigger('warning-coachmark-animation', CustomAnimation.createEnterScaleInAnimation(6000, 500, EASE_IN_OUT, 0.9)),
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
