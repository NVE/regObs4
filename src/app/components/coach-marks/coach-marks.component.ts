import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Observable, Subject, from, merge } from 'rxjs';
import { map, distinctUntilChanged, concatMap, take, takeUntil, filter, delay } from 'rxjs/operators';
import { trigger } from '@angular/animations';
import { CustomAnimation, EASE_IN_OUT_BACK, EASE_IN_OUT } from '../../core/animations/custom.animation';
import { enterZone } from '../../core/helpers/observable-helper';

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
export class CoachMarksComponent implements OnInit, OnDestroy {
  showCoachMarks$: Observable<boolean>;
  isOpen = false;
  ngDestroy$ = new Subject();
  hideSubject = new Subject<boolean>();

  constructor(private userSettingService: UserSettingService, private ngZone: NgZone) { }

  ngOnInit() {
    this.showCoachMarks$ = merge(this.getShowGeoSelectObservable(), this.hideSubject).pipe(enterZone(this.ngZone));
    this.getShowGeoSelectObservable().pipe(
      takeUntil(this.ngDestroy$),
      filter((val) => val),
      delay(2000),
      enterZone(this.ngZone)).subscribe(() => {
        this.isOpen = true;
      });
  }

  private getShowGeoSelectObservable() {
    return this.userSettingService.userSetting$
      .pipe(
        map((us) => us.showGeoSelectInfo),
        distinctUntilChanged());
  }

  async hide() {
    this.hideSubject.next(false);
    const currentSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
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
