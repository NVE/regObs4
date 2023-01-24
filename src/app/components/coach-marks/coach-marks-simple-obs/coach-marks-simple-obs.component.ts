import { Component, OnInit } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { distinctUntilChanged, map, merge, Observable, Subject, take } from 'rxjs';
import { CustomAnimation, EASE_IN_OUT, EASE_IN_OUT_BACK } from 'src/app/core/animations/custom.animation';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-coach-marks-simple-obs',
  templateUrl: './coach-marks-simple-obs.component.html',
  styleUrls: ['./coach-marks-simple-obs.component.scss', '../coachmark-backdrop.scss'],
  animations: [
    trigger('coachmark-animation', CustomAnimation.createEnterScaleInAnimation(200, 400, EASE_IN_OUT, 0.9)),
    trigger('element-animation', CustomAnimation.createEnterScaleInAnimation(200, 400, EASE_IN_OUT_BACK)),
  ],
})
export class CoachMarksSimpleObsComponent implements OnInit {
  isVisible$: Observable<boolean>;
  click = 0;
  hideSubject = new Subject<boolean>();
  constructor(private userSettingService: UserSettingService) {}

  ngOnInit(): void {
    this.isVisible$ = merge(this.getShowSimpleObsObservable(), this.hideSubject);
  }

  private getShowSimpleObsObservable() {
    return this.userSettingService.userSetting$.pipe(
      map((us) => !us.completedSimpleObsOnboarding),
      distinctUntilChanged()
    );
  }

  clickBackdrop() {
    if (this.click == 0) {
      this.click++;
    } else {
      this.hide();
    }
  }

  async hide() {
    this.hideSubject.next(false);
    const currentSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    this.userSettingService.saveUserSettings({
      ...currentSettings,
      completedSimpleObsOnboarding: true,
    });
  }
}
