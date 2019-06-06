import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { state, trigger, style, transition, animate, keyframes, stagger, query } from '@angular/animations';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { Observable, Subscription } from 'rxjs';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { CustomAnimation, EASING_IN_OUT_BACK, DEFAULT_DURATION } from '../../../../core/animations/custom.animation';

@Component({
  selector: 'app-geo-fab',
  templateUrl: './geo-fab.component.html',
  styleUrls: ['./geo-fab.component.scss'],
  animations: [
    trigger('enterAnimationFab', [
      state('x', style({ transform: 'scale(0)', opacity: 0 })),
      state('visible', style({ transform: 'scale(1)', opacity: 1 })),
      transition('x => startAnimated', CustomAnimation.createScaleInTransition(500, DEFAULT_DURATION, EASING_IN_OUT_BACK))
    ]),
    trigger('enterAnimation', CustomAnimation.createEnterAnimation(0, DEFAULT_DURATION, EASING_IN_OUT_BACK)),
    trigger('listAnimate', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'scale(0)', opacity: 0 }),  // initial
          stagger(100, CustomAnimation.createScaleInAnimation(0, DEFAULT_DURATION, EASING_IN_OUT_BACK)),
        ], { optional: true })
      ]),
    ]),
  ]
})
export class GeoFabComponent implements OnInit, OnDestroy {

  fullscreen$: Observable<boolean>;
  currentGeoHazard: GeoHazard[];

  @Input() color = 'light';
  @Input() isOpen = false;
  @Input() showLabels = true;
  @Output() isOpenChange = new EventEmitter();
  @Input() animateOnEnter = false;

  animateOnEnterState = 'x';

  geoHazardTypes = [[GeoHazard.Snow], [GeoHazard.Ice], [GeoHazard.Water, GeoHazard.Dirt]];

  get selectableGeoHazards() {
    return this.geoHazardTypes.filter((x) => !(this.currentGeoHazard && this.currentGeoHazard.some((c) => x.some((z) => z === c))));
  }

  constructor(private fullscreenService: FullscreenService, private userSettingService: UserSettingService) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  private geoHazardSubscription: Subscription;

  ngOnInit() {
    this.geoHazardSubscription = this.userSettingService.currentGeoHazardObservable$.subscribe((val) => {
      this.currentGeoHazard = val;
    });
    if (this.animateOnEnter) {
      setTimeout(() => {
        this.animateOnEnterState = 'startAnimated';
      }, 500);
    } else {
      this.animateOnEnterState = 'visible';
    }
  }

  ngOnDestroy(): void {
    if (this.geoHazardSubscription) {
      this.geoHazardSubscription.unsubscribe();
    }
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
