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

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit, OnDestroy {
  @ViewChild('menuFab') menuFab: Fab;

  private userSettingSubscription: Subscription;
  private registrationSubscription: Subscription;
  private userSettings: UserSetting;
  private geoHazardSubscription: Subscription;
  drafts: IRegistration[] = [];
  draftDates: string[] = [];
  geoHazards: GeoHazard[] = [];
  showTrip = false;

  constructor(
    private registrationService: RegistrationService,
    private ngZone: NgZone,
    private navController: NavController,
    private dateHelperService: DateHelperService,
    private userSettingService: UserSettingService) { }

  ngOnInit() {
    this.userSettingSubscription = this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
        this.showTrip = this.userSettings.currentGeoHazard.indexOf(GeoHazard.Snow) >= 0;
        this.geoHazards = this.userSettings.currentGeoHazard;
      });
    });
    this.registrationSubscription = this.registrationService.drafts$.subscribe(async (val) => {
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
    });
  }

  ngOnDestroy(): void {
    if (this.userSettingSubscription) {
      this.userSettingSubscription.unsubscribe();
    }
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
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
}
