import { Component, OnInit } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

export function getAnimation(delay: number) {
  return [
    transition(':enter', [
      style({ transform: 'scale(0)', opacity: 0 }),  // initial
      animate(`200ms ${delay || 0}ms ease-in-out`, style({ transform: 'scale(1)', opacity: 1 })),
    ]),
  ];
}

@Component({
  selector: 'app-coach-marks',
  templateUrl: './coach-marks.component.html',
  styleUrls: ['./coach-marks.component.scss'],
  animations: [
    trigger('geo-coachmark-animation', getAnimation(2000)),
    trigger('add-fab-animation', getAnimation(4000)),
    trigger('add-text-animation', getAnimation(4500)),
    trigger('warning-icon-animation', getAnimation(6000)),
    trigger('warning-coachmark-animation', getAnimation(6500)),
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
    }, 3000);
  }

  async hide() {
    this.showCoachMarks = false;
    const userSettings = await this.userSettingService.getUserSettings();
    userSettings.showGeoSelectInfo = false;
    this.userSettingService.saveUserSettings(userSettings);
  }

}
