import { Injectable } from '@angular/core';
import { RegistrationService } from './registration.service';
import { IRegistration } from '../models/registration.model';
import { IsEmptyHelper } from '../../../core/helpers/is-empty.helper';
import { DateHelperService } from '../../shared/services/date-helper.service';
import { RegistrationTid } from '../models/registrationTid.enum';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { ISummaryItem } from '../components/summary-item/summary-item.model';
import { UserGroupService } from '../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '../../regobs-api/models';

@Injectable({
  providedIn: 'root'
})
export class SummaryItemService {

  constructor(
    private registrationService: RegistrationService,
    private dateHelperService: DateHelperService,
    private userGroupService: UserGroupService,
  ) { }

  async getSummaryItems(registration: IRegistration) {
    const userGroups = await this.userGroupService.getUserGroups();
    const summaryItems: ISummaryItem[] = [
      {
        href: '/registration/obs-location/' + registration.Id,
        title: 'REGISTRATION.OBS_LOCATION.TITLE',
        subTitle: registration.ObsLocation ? registration.ObsLocation.LocationName : '',
        hasData: !IsEmptyHelper.isEmpty(registration.ObsLocation),
      },
      {
        href: 'registration/set-time/' + registration.Id,
        title: 'REGISTRATION.OVERVIEW.DATE_AND_TIME',
        subTitle: registration.DtObsTime ? (await this.dateHelperService.formatDateString(registration.DtObsTime)) : '',
        hasData: !!registration.DtObsTime,
      },
    ];
    if (userGroups.length > 0) {
      summaryItems.push({
        href: '/registration/group/' + registration.Id,
        title: 'REGISTRATION.OVERVIEW.SHARE_WITH_GROUP',
        subTitle: this.getObservationGroupName(registration, userGroups),
        hasData: !!registration.ObserverGroupID,
      });
    }

    summaryItems.push(...this.getGeoHazardItems(registration));

    summaryItems.push(
      this.getRegItem(
        registration,
        '/registration/general-comment/' + registration.Id,
        'REGISTRATION.GENERAL_COMMENT.TITLE',
        registration.GeneralObservation ? registration.GeneralObservation.ObsComment : '',
        RegistrationTid.GeneralObservation
      ));

    return summaryItems;
  }

  private getObservationGroupName(registration: IRegistration, userGroups: ObserverGroupDto[]) {
    if (registration && registration.ObserverGroupID && userGroups) {
      const selectedGroup = userGroups.find((x) => x.Id === registration.ObserverGroupID);
      if (selectedGroup) {
        return selectedGroup.Name;
      }
    }
    return '';
  }

  private getGeoHazardItems(registration: IRegistration) {
    switch (registration.geoHazard) {
      case GeoHazard.Water:
        return this.getWaterItems(registration);
      case GeoHazard.Ice:
        return this.getIceItems(registration);
      case GeoHazard.Dirt:
        return this.getDirtItems(registration);
      case GeoHazard.Snow:
        return this.getSnowItems(registration);
    }
  }

  private getWaterItems(registration: IRegistration) {
    return [
      this.getRegItem(
        registration,
        '/registration/water/water-level/' + registration.Id,
        'REGISTRATION.WATER.WATER_LEVEL.TITLE',
        registration.WaterLevel2 ? registration.WaterLevel2.Comment : '',
        RegistrationTid.WaterLevel2
      ),
      this.getRegItem(
        registration,
        '/registration/water/damage/' + registration.Id,
        'REGISTRATION.WATER.DAMAGE.TITLE',
        '', // this.registration.DamageObs ? this.registration.DamageObs.map((x) => x.Comment).join() : '',
        RegistrationTid.DamageObs,
      ),
    ];
  }

  private getRegItem(
    registration: IRegistration,
    href: string,
    title: string,
    subTitle: string,
    registrationTid: RegistrationTid): ISummaryItem {
    return {
      href,
      title,
      subTitle,
      hasData: !this.registrationService.isEmpty(registration, registrationTid),
      images: this.registrationService.getImages(registration, registrationTid),
    };
  }

  private getDirtItems(registration: IRegistration) {
    return [
      this.getRegItem(
        registration,
        '/registration/danger-obs/' + registration.Id,
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      this.getRegItem(
        registration,
        '/registration/dirt/landslide-obs/' + registration.Id,
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE',
        registration.LandSlideObs ? registration.LandSlideObs.Comment : '',
        RegistrationTid.LandSlideObs
      ),
    ];
  }

  private getIceItems(registration: IRegistration) {
    return [
      this.getRegItem(
        registration,
        '/registration/ice/ice-cover/' + registration.Id,
        'REGISTRATION.ICE.ICE_COVER.TITLE',
        registration.IceCoverObs ? registration.IceCoverObs.Comment : '',
        RegistrationTid.IceCoverObs
      ),
      this.getRegItem(
        registration,
        '/registration/ice/ice-thickness/' + registration.Id,
        'REGISTRATION.ICE.ICE_THICKNESS.TITLE',
        registration.IceThickness ? registration.IceThickness.Comment : '',
        RegistrationTid.IceThickness
      ),
      this.getRegItem(
        registration,
        '/registration/danger-obs/' + registration.Id,
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      this.getRegItem(
        registration,
        '/registration/incident/' + registration.Id,
        'REGISTRATION.INCIDENT.TITLE',
        '',
        RegistrationTid.Incident
      ),
    ];
  }

  private getSnowItems(registration: IRegistration) {
    return [
      this.getRegItem(
        registration,
        '/registration/danger-obs/' + registration.Id,
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      this.getRegItem(
        registration,
        '/registration/snow/avalanche-obs/' + registration.Id,
        'REGISTRATION.SNOW.AVALANCHE_OBS.TITLE',
        '',
        RegistrationTid.AvalancheObs
      ),
      this.getRegItem(
        registration,
        '/registration/snow/avalanche-activity/' + registration.Id,
        'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE',
        '',
        RegistrationTid.AvalancheActivityObs2
      ),
      this.getRegItem(
        registration,
        '/registration/snow/weather/' + registration.Id,
        'REGISTRATION.SNOW.WEATHER.TITLE',
        '',
        RegistrationTid.WeatherObservation
      ),
      this.getRegItem(
        registration,
        '/registration/snow/snow-surface/' + registration.Id,
        'REGISTRATION.SNOW.SNOW_SURFACE.TITLE',
        '',
        RegistrationTid.SnowSurfaceObservation
      ),
      this.getRegItem(
        registration,
        '/registration/snow/snow-profile/' + registration.Id,
        'REGISTRATION.SNOW.SNOW_PROFILE.TITLE',
        '',
        RegistrationTid.SnowProfile
      ),
      this.getRegItem(
        registration,
        '/registration/snow/compression-test/' + registration.Id,
        'REGISTRATION.SNOW.COMPRESSION_TEST.TITLE',
        '',
        RegistrationTid.CompressionTest
      ),
      this.getRegItem(
        registration,
        '/registration/snow/avalanche-problem/' + registration.Id,
        'REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE',
        '',
        RegistrationTid.AvalancheEvalProblem2
      ),
      this.getRegItem(
        registration,
        '/registration/snow/avalanche-evaluation/' + registration.Id,
        'REGISTRATION.SNOW.AVALANCHE_EVALUATION.TITLE',
        '',
        RegistrationTid.AvalancheEvaluation3
      )
    ];
  }
}
