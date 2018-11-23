import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { RegistrationService } from '../../modules/registration/services/registration.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Subscription } from 'rxjs';
import { IRegistration } from '../../modules/registration/models/registration.model';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { DateHelperService } from '../../modules/shared/services/date-helper.service';
import * as moment from 'moment';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss']
})
export class PopoverMenuComponent implements OnInit, OnDestroy {

  private registrationSubscription: Subscription;
  private geoHazardSubscription: Subscription;
  drafts: IRegistration[] = [];
  draftDates: string[] = [];
  geoHazards: GeoHazard[] = [];

  constructor(
    private navController: NavController,
    private popoverController: PopoverController,
    private ngZone: NgZone,
    private dateHelperService: DateHelperService,
    private userSettingService: UserSettingService,
    private registrationService: RegistrationService) { }

  ngOnInit() {
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
    this.geoHazardSubscription = this.userSettingService.currentGeoHazardObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.geoHazards = val;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
    if (this.geoHazardSubscription) {
      this.geoHazardSubscription.unsubscribe();
    }
  }

  getName(geoHazard: GeoHazard) {
    return `GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase();
  }

  getDate(timestamp: number) {
    return this.dateHelperService.formatDate(moment.unix(timestamp).toDate());
  }

  async closeAndNavigate(url: string) {
    await this.popoverController.dismiss();
    return this.navController.navigateForward(url);
  }

  async createRegistration(geoHazard: GeoHazard) {
    await this.popoverController.dismiss();
    this.navController.navigateForward('registration/obs-location?geoHazard=' + geoHazard);
  }

  async editRegistration(draft: IRegistration) {
    await this.popoverController.dismiss();
    this.navController.navigateForward('registration/edit/' + draft.id);
  }

}
