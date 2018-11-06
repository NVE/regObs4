import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { Subscription } from 'rxjs';
import { IRegistration } from '../../models/registration.model';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '../../../regobs-api/models';
import { RegistrationTid } from '../../models/registrationTid.enum';
import { NavController } from '@ionic/angular';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { IsEmptyHelper } from '../../../../core/helpers/is-empty.helper';
import { DateHelperService } from '../../../shared/services/date-helper.service';
import { ActivatedRoute } from '@angular/router';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { TranslateService } from '@ngx-translate/core';
import { settings } from '../../../../../settings';
import { RegistrationStatus } from '../../models/registrationStatus.enum';

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
  RegistrationStatus = RegistrationStatus;
  summaryItems: Array<ISummaryItem> = [];

  constructor(
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private dateHelperService: DateHelperService,
    private emailComposer: EmailComposer,
    private translateService: TranslateService,
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
    if (this.userGroupSubscription) {
      this.userGroupSubscription.unsubscribe();
    }
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

  private getRegistration() {
    if (this.activatedRoute.snapshot.params['id']) {
      return this.registrationService.getSavedRegistrationById(this.activatedRoute.snapshot.params['id']);
    } else {
      return this.registrationService.getCurrentRegistration();
    }
  }

  private async initSummaryItems() {
    this.registration = await this.getRegistration();
    if (!this.registration) {
      this.registration = await this.registrationService.createNewRegistration();
      await this.registrationService.saveRegistration(this.registration);
    }
    this.summaryItems = [
      {
        href: 'registration/obs-location/' + this.registration.Id,
        title: 'REGISTRATION.OBS_LOCATION.TITLE',
        subTitle: this.registration.ObsLocation ? this.registration.ObsLocation.LocationName : '',
        hasData: !IsEmptyHelper.isEmpty(this.registration.ObsLocation),
      },
      {
        href: 'registration/set-time/' + this.registration.Id,
        title: 'REGISTRATION.OVERVIEW.DATE_AND_TIME',
        subTitle: this.registration.DtObsTime ? (await this.dateHelperService.formatDateString(this.registration.DtObsTime)) : '',
        hasData: !!this.registration.DtObsTime,
      },
    ];
    if (this.userGroups.length > 0) {
      this.summaryItems.push({
        href: 'registration/group/' + this.registration.Id,
        title: 'REGISTRATION.OVERVIEW.SHARE_WITH_GROUP',
        subTitle: this.getObservationGroupName(),
        hasData: !!this.registration.ObserverGroupID,
      });
    }

    this.summaryItems.push(...this.getGeoHazardItems());

    this.summaryItems.push(
      this.getRegItem(
        'registration/general-comment/' + this.registration.Id,
        'REGISTRATION.GENERAL_COMMENT.TITLE',
        this.registration.GeneralObservation ? this.registration.GeneralObservation.ObsComment : '',
        RegistrationTid.GeneralObservation
      ));
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
        'registration/water/water-level/' + this.registration.Id,
        'REGISTRATION.WATER.WATER_LEVEL.TITLE',
        this.registration.WaterLevel2 ? this.registration.WaterLevel2.Comment : '',
        RegistrationTid.WaterLevel2
      ),
      this.getRegItem(
        'registration/water/damage/' + this.registration.Id,
        'REGISTRATION.WATER.DAMAGE.TITLE',
        '', // this.registration.DamageObs ? this.registration.DamageObs.map((x) => x.Comment).join() : '',
        RegistrationTid.DamageObs,
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
    return [
      this.getRegItem(
        'registration/danger-obs/' + this.registration.Id,
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      this.getRegItem(
        'registration/dirt/landslide-obs/' + this.registration.Id,
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE',
        this.registration.LandSlideObs ? this.registration.LandSlideObs.Comment : '',
        RegistrationTid.LandSlideObs
      ),
    ];
  }

  private getIceItems() {
    return [
      this.getRegItem(
        'registration/ice/ice-cover/' + this.registration.Id,
        'REGISTRATION.ICE.ICE_COVER.TITLE',
        this.registration.IceCoverObs ? this.registration.IceCoverObs.Comment : '',
        RegistrationTid.IceCoverObs
      ),
      this.getRegItem(
        'registration/ice/ice-thickness/' + this.registration.Id,
        'REGISTRATION.ICE.ICE_THICKNESS.TITLE',
        this.registration.IceThickness ? this.registration.IceThickness.Comment : '',
        RegistrationTid.IceThickness
      ),
      this.getRegItem(
        'registration/danger-obs/' + this.registration.Id,
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      this.getRegItem(
        'registration/incident/' + this.registration.Id,
        'REGISTRATION.INCIDENT.TITLE',
        '',
        RegistrationTid.Incident
      ),
    ];
  }

  private getSnowItems() {
    return [
      this.getRegItem(
        'registration/danger-obs/' + this.registration.Id,
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      this.getRegItem(
        'registration/snow/avalanche-obs/' + this.registration.Id,
        'REGISTRATION.SNOW.AVALANCHE_OBS.TITLE',
        '',
        RegistrationTid.AvalancheObs
      )
    ];
  }

  ionViewWillLeave() {
  }

  // private async getEmailAddress() {
  //   const userSetting = await this.userSettingService.getUserSettings();
  //   switch (userSetting.currentGeoHazard) {
  //     case GeoHazard.Snow:
  //       return 'snoskredvarsling@nve.no';
  //     case GeoHazard.Ice:
  //       return 'isvarsling@nve.no';
  //     case GeoHazard.Water:
  //       return 'flomvarsling@nve.no';
  //     case GeoHazard.Dirt:
  //       return 'jordskredvarsling@nve.no';
  //   }
  // }

  async openForEdit() {
    this.registration.status = RegistrationStatus.Draft;
    await this.registrationService.saveRegistration(this.registration);
  }

  async sendEmail() {
    const translations = await this.translateService
      .get(['REGISTRATION.EMAIL.SUBJECT', 'REGISTRATION.EMAIL.BODY']).toPromise();
    const base64string = btoa(JSON.stringify(this.registration));
    const email: EmailComposerOptions = {
      to: settings.errorEmailAddress,
      attachments: [
        'base64:registration.json//' + base64string,
      ],
      subject: translations['REGISTRATION.EMAIL.SUBJECT'],
      body: translations['REGISTRATION.EMAIL.BODY'],
      isHtml: true
    };
    this.emailComposer.open(email);
  }
}
