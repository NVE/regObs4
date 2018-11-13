import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { Events } from '@ionic/angular';
import { settings } from '../../../settings';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppCountry } from '../../core/models/app-country.enum';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  userSettings: UserSetting;
  lastUpdated$: Observable<Date>;
  settings = settings;

  get useAppInNorway() {
    return this.userSettings && this.userSettings.country === AppCountry.norway;
  }

  constructor(
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private cdr: ChangeDetectorRef,
    private events: Events) {
  }

  async ngOnInit() {
    this.lastUpdated$ = this.observationService.getLastUpdatedForCurrentGeoHazardAsObservable()
      .pipe(tap(() => this.cdr.detectChanges()));
    this.userSettings = await this.userSettingService.getUserSettings();
    this.events.subscribe(settings.events.userSettingsChanged, (newSettings) => {
      this.userSettings = newSettings;
    });
  }

  saveUserSettings() {
    this.userSettingService.saveUserSettings(this.userSettings);
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.userSettingsChanged);
  }

  updateObservations() {
    this.observationService.updateObservationsForCurrentGeoHazard();
  }
}
