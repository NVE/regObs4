import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { Events } from '@ionic/angular';
import { settings } from '../../../settings';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppCountry } from '../../core/models/app-country.enum';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  userSettings: UserSetting;
  lastUpdated: Date;
  settings = settings;

  private lastUpdateSubscription: Subscription;
  private userSettingSubscription: Subscription;

  get useAppInNorway() {
    return this.userSettings && this.userSettings.country === AppCountry.norway;
  }

  constructor(
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private events: Events) {
  }

  async ngOnInit() {
    this.lastUpdateSubscription = this.observationService.getLastUpdatedForCurrentGeoHazardAsObservable()
      .subscribe((val) => {
        this.ngZone.run(() => {
          this.lastUpdated = val;
        });
      });
    this.userSettingSubscription = this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
      });
    });
  }

  saveUserSettings() {
    this.userSettingService.saveUserSettings(this.userSettings);
  }

  ngOnDestroy(): void {
    if (this.lastUpdateSubscription) {
      this.lastUpdateSubscription.unsubscribe();
    }
    if (this.userSettingSubscription) {
      this.userSettingSubscription.unsubscribe();
    }
  }

  updateObservations() {
    this.observationService.updateObservationsForCurrentGeoHazard();
  }
}
