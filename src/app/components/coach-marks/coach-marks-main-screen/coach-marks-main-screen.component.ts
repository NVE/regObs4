import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { Observable, Subject, merge } from 'rxjs';
import {
  map,
  distinctUntilChanged,
  take,
  takeUntil,
  filter,
  delay
} from 'rxjs/operators';
import { trigger } from '@angular/animations';
import {
  CustomAnimation,
  EASE_IN_OUT_BACK,
  EASE_IN_OUT
} from '../../../core/animations/custom.animation';

@Component({
  selector: 'app-coach-marks-main-screen',
  templateUrl: './coach-marks-main-screen.component.html',
  styleUrls: ['./coach-marks-main-screen.component.scss', '../coachmark-backdrop.scss'],
  animations: [
    trigger(
      'geo-coachmark-animation',
      CustomAnimation.createEnterScaleInAnimation(1000, 500, EASE_IN_OUT, 0.9)
    ),
    trigger(
      'add-fab-animation',
      CustomAnimation.createEnterScaleInAnimation(3000, 500, EASE_IN_OUT_BACK)
    ),
    trigger(
      'add-text-animation',
      CustomAnimation.createEnterScaleInAnimation(4000, 500, EASE_IN_OUT, 0.9)
    ),
    trigger(
      'warning-icon-animation',
      CustomAnimation.createEnterScaleInAnimation(5000, 500, EASE_IN_OUT_BACK)
    ),
    trigger(
      'warning-coachmark-animation',
      CustomAnimation.createEnterScaleInAnimation(6000, 500, EASE_IN_OUT, 0.9)
    )
  ]
})
export class CoachMarksMainScreenComponent implements OnInit, OnDestroy {
  showCoachMarks$: Observable<boolean>;
  isOpen = false;
  ngDestroy$ = new Subject<void>();
  hideSubject = new Subject<boolean>();

  constructor(
    private userSettingService: UserSettingService
  ) {}

  ngOnInit() {
    this.showCoachMarks$ = merge(
      this.getShowGeoSelectObservable(),
      this.hideSubject
    );
    this.getShowGeoSelectObservable()
      .pipe(
        takeUntil(this.ngDestroy$),
        filter((val) => val),
        delay(2000)
      )
      .subscribe(() => {
        this.isOpen = true;
      });
  }

  private getShowGeoSelectObservable() {
    return this.userSettingService.userSetting$.pipe(
      map((us) => us.showGeoSelectInfo),
      distinctUntilChanged()
    );
  }

  async hide() {
    this.hideSubject.next(false);
    const currentSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    this.userSettingService.saveUserSettings({
      ...currentSettings,
      showGeoSelectInfo: false
    });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
