import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { Observable, Subscription } from 'rxjs';
import { IRegistration } from '../../models/registration.model';
import { tap } from 'rxjs/operators';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '../../../regobs-api/models';
import { RegistrationTid } from '../../models/registrationTid.enum';
import { NavController } from '@ionic/angular';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { IsEmptyHelper } from '../../../../core/helpers/is-empty.helper';
import { DateHelperService } from '../../../shared/services/date-helper.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit, OnDestroy {
  registration: IRegistration;
  userGroups: ObserverGroupDto[] = [];
  RegistationTid = RegistrationTid;
  private userGroupSubscription: Subscription;
  GeoHazard = GeoHazard;

  summaryItems: Array<ISummaryItem> = [];

  constructor(
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef,
    private navController: NavController,
    private dateHelperService: DateHelperService,
    private userGroupService: UserGroupService) {
  }

  async ngOnInit() {
    this.userGroupSubscription = this.userGroupService.getUserGroupsAsObservable().subscribe((userGroups) => {
      this.userGroups = userGroups;
      this.initSummaryItems().then(() => {
        this.cdr.detectChanges();
      });
    });
    this.userGroupService.updateUserGroups();
  }

  ngOnDestroy(): void {
    this.userGroupSubscription.unsubscribe();
  }

  private getObservationGroupName() {
    if (this.registration && this.registration.ObserverGroupID && this.userGroups) {
      const selectedGroup = this.userGroups.find((x) => x.Id === this.registration.ObserverGroupID);
      if (selectedGroup) {
        return selectedGroup.Name;
      }
    }
    return '';
  }

  async ionViewDidEnter() {
    await this.initSummaryItems();
  }

  private async initSummaryItems() {
    this.registration = await this.registrationService.getCurrentRegistration();
    if (!this.registration) {
      this.navController.navigateRoot('');
    } else {
      this.summaryItems = [
        {
          href: 'registration/obs-location',
          title: 'REGISTRATION.OBS_LOCATION.TITLE',
          subTitle: this.registration.ObsLocation ? this.registration.ObsLocation.LocationName : '',
          hasData: !IsEmptyHelper.isEmpty(this.registration.ObsLocation),
        },
        {
          href: 'registration/set-time',
          title: 'REGISTRATION.OVERVIEW.DATE_AND_TIME',
          subTitle: this.registration.DtObsTime ? (await this.dateHelperService.formatDateString(this.registration.DtObsTime)) : '',
          hasData: !!this.registration.DtObsTime,
        },
      ];
      if (this.userGroups.length > 0) {
        this.summaryItems.push({
          href: 'registration/group',
          title: 'REGISTRATION.OVERVIEW.SHARE_WITH_GROUP',
          subTitle: this.getObservationGroupName(),
          hasData: !!this.registration.ObserverGroupID,
        });
      }

      this.summaryItems.push(...this.getGeoHazardItems());

      this.summaryItems.push(
        this.getRegItem(
          'registration/general-comment',
          'REGISTRATION.GENERAL_COMMENT.TITLE',
          this.registration.GeneralObservation ? this.registration.GeneralObservation.ObsComment : '',
          RegistrationTid.GeneralObservation
        ));
    }
  }

  private getGeoHazardItems() {
    switch (this.registration.geoHazard) {
      case GeoHazard.Water:
        return this.getWaterItems();
      case GeoHazard.Ice:
        return this.getIceItems();
      case GeoHazard.Dirt:
        return this.getDirtItems();
      case GeoHazard.Snow:
        return this.getSnowItems();
    }
  }

  private getWaterItems() {
    return [
      this.getRegItem(
        'registration/water/water-level',
        'REGISTRATION.WATER.WATER_LEVEL.TITLE',
        this.registration.WaterLevel2 ? this.registration.WaterLevel2.Comment : '',
        RegistrationTid.WaterLevel2
      ),
      this.getRegItem(
        'registration/water/damage',
        'REGISTRATION.WATER.DAMAGE.TITLE',
        '', // this.registration.DamageObs ? this.registration.DamageObs.map((x) => x.Comment).join() : '',
        RegistrationTid.DamageObs
      ),
    ];
  }

  private getRegItem(href: string, title: string, subTitle: string, registrationTid: RegistrationTid): ISummaryItem {
    return {
      href,
      title,
      subTitle,
      hasData: !this.registrationService.isEmpty(this.registration, registrationTid),
      images: this.registrationService.getImages(this.registration, registrationTid),
    };
  }

  private getDirtItems() {
    return [];
  }

  private getIceItems() {
    return [];
  }

  private getSnowItems() {
    return [];
  }

  ionViewWillLeave() {
  }
}
