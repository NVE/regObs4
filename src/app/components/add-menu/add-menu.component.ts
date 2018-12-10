import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { Fab, NavController } from '@ionic/angular';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Subscription } from 'rxjs';
import { UserSetting } from '../../core/models/user-settings.model';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { RegistrationService } from '../../modules/registration/services/registration.service';
import { IRegistration } from '../../modules/registration/models/registration.model';
import * as moment from 'moment';
import { DateHelperService } from '../../modules/shared/services/date-helper.service';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit, OnDestroy {
  @ViewChild('menuFab') menuFab: Fab;

  private subscriptions: Subscription[] = [];

  drafts: IRegistration[] = [];
  draftDates: string[] = [];
  geoHazards: GeoHazard[] = [];
  showTrip = false;
  tripStarted = false;

  constructor(
    private registrationService: RegistrationService,
    private ngZone: NgZone,
    private navController: NavController,
    private dateHelperService: DateHelperService,
    private tripLoggerService: TripLoggerService,
    private userSettingService: UserSettingService) { }

  ngOnInit() {
    this.subscriptions.push(this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.showTrip = val.currentGeoHazard.indexOf(GeoHazard.Snow) >= 0;
        this.geoHazards = val.currentGeoHazard;
      });
    }));
    this.subscriptions.push(this.registrationService.drafts$.subscribe(async (val) => {
      this.ngZone.run(() => {
        this.drafts = val;
      });
      const dates = [];
      for (const d of this.drafts) {
        dates.push(await this.getDate(d.changed));
      }
      this.ngZone.run(() => {
        this.draftDates = dates;
      });
    }));
    this.subscriptions.push(this.tripLoggerService.getLegacyTripAsObservable().subscribe((val) => {
      this.ngZone.run(() => {
        this.tripStarted = !!val;
      });
    }));
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  getName(geoHazard: GeoHazard) {
    return `GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase();
  }

  getDate(timestamp: number) {
    return this.dateHelperService.formatDate(moment.unix(timestamp).toDate());
  }

  closeAndNavigate(url: string) {
    this.navController.navigateForward(url);
    setTimeout(() => {
      this.menuFab.close();
    }, 20);
  }

  createRegistration(geoHazard: GeoHazard) {
    this.closeAndNavigate('registration/obs-location?geoHazard=' + geoHazard);
  }

  editRegistration(draft: IRegistration) {
    this.closeAndNavigate('registration/edit/' + draft.id);
  }

  closeMenu() {
    this.menuFab.close();
  }

  startOrStopTrip() {
    if (!this.tripStarted) {
      this.closeAndNavigate('lagacy-trip');
    } else {
      this.tripLoggerService.stopLegacyTrip();
    }
  }
}
