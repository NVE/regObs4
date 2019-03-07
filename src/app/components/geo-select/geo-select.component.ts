import { Component, OnInit, OnDestroy, Input, NgZone } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { Subscription, Observable } from 'rxjs';
import { UserSetting } from '../../core/models/user-settings.model';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { trigger, state, transition, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-geo-select',
  templateUrl: './geo-select.component.html',
  styleUrls: ['./geo-select.component.scss'],
  animations: [
    trigger('pulse', [
      state('*', style({
        transform: 'scale3d(1, 1, 1)'
      })),
      transition('* => showGeoSelectInfo', animate(`700ms 1000ms ease-out`, keyframes([
        style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
        style({ transform: 'scale3d(1.2, 1.2, 1.2)', offset: 0.5 }),
        style({ transform: 'scale3d(1, 1, 1)', offset: 1.0 })
      ]))),
    ]),
  ]
})
export class GeoSelectComponent implements OnInit, OnDestroy {

  geoHazardTypes: Array<GeoHazard[]>;
  isOpen = false;
  fullscreen$: Observable<boolean>;

  private geoHazardSubscription: Subscription;
  userSettings: UserSetting;
  private showGeoSelectInfo: boolean;
  state = 'x';

  @Input() inHeader: boolean;

  get size() {
    return this.inHeader && !this.isOpen ? 0.7 : 1.0;
  }

  constructor(
    private userSettingService: UserSettingService,
    private fullscreenService: FullscreenService,
    private ngZone: NgZone) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  ngOnInit() {
    this.geoHazardTypes = [[GeoHazard.Snow], [GeoHazard.Ice], [GeoHazard.Water, GeoHazard.Dirt]];
    this.geoHazardSubscription = this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
        if (this.showGeoSelectInfo === undefined) {
          this.showGeoSelectInfo = this.userSettings.showGeoSelectInfo;
          this.isOpen = this.userSettings.showGeoSelectInfo;
          if (this.showGeoSelectInfo) {
            this.state = 'showGeoSelectInfo';
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.geoHazardSubscription) {
      this.geoHazardSubscription.unsubscribe();
    }
  }

  getNames(geoHazards: GeoHazard[]) {
    return geoHazards.map((geoHazard) => `GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase());
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.showGeoSelectInfo) {
      this.showGeoSelectInfo = false;
      this.userSettings.showGeoSelectInfo = false;
      this.state = 'x';
      this.userSettingService.saveUserSettings(this.userSettings);
    }
  }

  changeGeoHazard(geoHazards: GeoHazard[]) {
    this.isOpen = false;
    this.showGeoSelectInfo = false;
    this.userSettings.currentGeoHazard = geoHazards;
    this.userSettings.showGeoSelectInfo = false;
    this.userSettingService.saveUserSettings(this.userSettings);
  }
}
