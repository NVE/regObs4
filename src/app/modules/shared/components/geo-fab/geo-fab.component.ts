import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { state, trigger, style, transition, animate, keyframes, stagger, query } from '@angular/animations';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { CustomAnimation, EASE_IN_OUT_BACK, DEFAULT_DURATION, EASE_IN_OUT } from '../../../../core/animations/custom.animation';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-geo-fab',
  templateUrl: './geo-fab.component.html',
  styleUrls: ['./geo-fab.component.scss'],
  animations: [
    trigger('enterAnimationFab', [
      state('x', style({ transform: 'scale3d(0,0,1)', opacity: 0 })),
      state('visible', style({ transform: 'scale3d(1,1,1)', opacity: 1 })),
      transition('x => startAnimated', CustomAnimation.createScaleInTransition(200, 500, EASE_IN_OUT_BACK))
    ]),
    trigger('enterAnimation', CustomAnimation.createEnterScaleInAnimation(0, 200, EASE_IN_OUT)),
    trigger('listAnimate', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translate3d(0, -30px, 0) scale3d(0, 0, 1)', opacity: 0 }),  // initial
          stagger(100, animate(`200ms 0ms ${EASE_IN_OUT}`, style({ transform: 'translate3d(0, 0, 0) scale3d(1,1,1)', opacity: 1 }))),
        ], { optional: true })
      ]),
    ]),
  ]
})
export class GeoFabComponent implements OnInit, OnDestroy {
  fullscreen: boolean;
  currentGeoHazard: GeoHazard[];

  @Input() color = 'light';
  @Input() isOpen = false;
  @Input() showLabels = true;
  @Output() isOpenChange = new EventEmitter();
  @Input() animateOnEnter = false;

  private ngDestroy$ = new Subject();
  private animationTimout: NodeJS.Timeout;

  animateOnEnterState = 'x';

  geoHazardTypes = [[GeoHazard.Snow], [GeoHazard.Ice], [GeoHazard.Water, GeoHazard.Dirt]];

  get selectableGeoHazards() {
    return this.geoHazardTypes.filter((x) => !(this.currentGeoHazard && this.currentGeoHazard.some((c) => x.some((z) => z === c))));
  }

  constructor(
    private fullscreenService: FullscreenService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    this.userSettingService.currentGeoHazardObservable$.pipe(takeUntil(this.ngDestroy$)).subscribe((val) => {
      this.ngZone.run(() => {
        this.currentGeoHazard = val;
      });
    });
    this.fullscreenService.isFullscreen$.pipe(takeUntil(this.ngDestroy$)).subscribe((val) => {
      this.ngZone.run(() => {
        this.fullscreen = val;
      });
    });
    if (this.animateOnEnter) {
      this.animationTimout = setTimeout(() => {
        this.animateOnEnterState = 'startAnimated';
      }, 500);
    } else {
      this.animateOnEnterState = 'visible';
    }
  }

  ngOnDestroy(): void {
    if (this.animationTimout) {
      clearTimeout(this.animationTimout);
    }
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  toggle() {
    this.triggerOpenClose(!this.isOpen);
  }

  open() {
    this.triggerOpenClose(true);
  }

  close() {
    this.triggerOpenClose(false);
  }

  triggerOpenClose(open: boolean) {
    const changed = this.isOpen !== open;
    if (changed) {
      this.isOpen = open;
      this.isOpenChange.emit(this.isOpen);
    }
  }

  async setCurrentGeoHazard(geoHazards: GeoHazard[]) {
    this.close();
    this.currentGeoHazard = geoHazards;
    const userSettings = await this.userSettingService.getUserSettings();
    userSettings.currentGeoHazard = geoHazards;
    this.userSettingService.saveUserSettings(userSettings);
  }
}
