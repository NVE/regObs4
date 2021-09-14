import { Injectable } from '@angular/core';
import { DateHelperService } from '../../shared/services/date-helper/date-helper.service';
import { IRegistration, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { RegistrationService } from 'src/app/modules/common-registration/services/registration/registration.service';
import { GeoHazard } from '@varsom-regobs-common/core';
import { ISummaryItem } from '../components/summary-item/summary-item.model';
import { UserGroupService } from '../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '@varsom-regobs-common/regobs-api';
import { NavController } from '@ionic/angular';
import { RouterDirection } from '@ionic/core';
import { isEmpty } from '@varsom-regobs-common/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SummaryItemService {
  constructor(
    private registrationService: RegistrationService,
    private dateHelperService: DateHelperService,
    private userGroupService: UserGroupService,
    private navController: NavController
  ) {}

  async getSummaryItems(
    registration: IRegistration,
    userGroups?: ObserverGroupDto[]
  ) {
    if (!registration) {
      return [];
    }
    const userGroupsToUse = userGroups
      ? userGroups
      : await this.userGroupService.getUserGroups();
    const summaryItems: ISummaryItem[] = [
      {
        id: registration.id,
        href: '/registration/obs-location',
        queryParams: { geoHazard: registration.geoHazard },
        title: 'REGISTRATION.OBS_LOCATION.TITLE',
        subTitle: registration.request.ObsLocation
          ? registration.request.ObsLocation.LocationName ||
            registration.request.ObsLocation.LocationDescription
          : '',
        hasData: !isEmpty(registration.request.ObsLocation)
      },
      {
        id: registration.id,
        href: '/registration/set-time',
        title: 'REGISTRATION.OVERVIEW.DATE_AND_TIME',
        subTitle: registration.request.DtObsTime
          ? await this.dateHelperService.formatDateString(
            registration.request.DtObsTime
          )
          : '',
        hasData: !!registration.request.DtObsTime
      }
    ];
    if (userGroupsToUse.length > 0) {
      summaryItems.push({
        id: registration.id,
        href: '/registration/group',
        title: 'REGISTRATION.OVERVIEW.SHARE_WITH_GROUP',
        subTitle: this.getObservationGroupName(registration, userGroupsToUse),
        hasData: !!registration.request.ObserverGroupID
      });
    }

    summaryItems.push(... await this.getGeoHazardItems(registration));

    summaryItems.push(
      await this.getRegItem(
        registration,
        '/registration/general-comment',
        'REGISTRATION.GENERAL_COMMENT.TITLE',
        registration.request.GeneralObservation
          ? registration.request.GeneralObservation.ObsComment
          : '',
        RegistrationTid.GeneralObservation
      )
    );

    return summaryItems;
  }

  async getPreviousAndNext(
    registration: IRegistration,
    url: string
  ): Promise<{ previous: ISummaryItem; next: ISummaryItem }> {
    const summaryItems = await this.getSummaryItems(registration);
    const currentItem = summaryItems.find((x) => url.indexOf(x.href) >= 0);
    const result = { previous: undefined, next: undefined };
    if (currentItem) {
      const index = summaryItems.indexOf(currentItem);
      if (index > 0) {
        result.previous = summaryItems[index - 1];
      }
      const nextIndex = index + 1;
      if (nextIndex < summaryItems.length) {
        result.next = summaryItems[nextIndex];
      }
    }
    return result;
  }

  navigateTo(
    registration: IRegistration,
    summaryItem: ISummaryItem,
    direction: RouterDirection = 'forward'
  ) {
    const url = `${summaryItem.href}/${registration.id}`;
    return direction === 'forward'
      ? this.navController.navigateForward(url)
      : this.navController.navigateBack(url);
  }

  async navigateForward(registration: IRegistration, url: string) {
    const prevAndNext = await this.getPreviousAndNext(registration, url);
    if (prevAndNext.next) {
      return this.navigateTo(registration, prevAndNext.next, 'forward');
    } else {
      return this.navController.navigateRoot(
        `/registration/edit/${registration.id}`
      );
    }
  }

  private getObservationGroupName(
    registration: IRegistration,
    userGroups: ObserverGroupDto[]
  ) {
    if (registration && registration.request.ObserverGroupID && userGroups) {
      const selectedGroup = userGroups.find(
        (x) => x.Id === registration.request.ObserverGroupID
      );
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
    case GeoHazard.Soil:
      return this.getDirtItems(registration);
    case GeoHazard.Snow:
      return this.getSnowItems(registration);
    }
  }

  private async getWaterItems(registration: IRegistration) {
    return [
      await this.getRegItem(
        registration,
        '/registration/water/water-level',
        'REGISTRATION.WATER.WATER_LEVEL.TITLE',
        registration.request.WaterLevel2
          ? registration.request.WaterLevel2.Comment
          : '',
        RegistrationTid.WaterLevel2
      ),
      await this.getRegItem(
        registration,
        '/registration/water/damage',
        'REGISTRATION.WATER.DAMAGE.TITLE',
        '', // this.registration.DamageObs ? this.registration.DamageObs.map((x) => x.Comment).join() : '',
        RegistrationTid.DamageObs
      )
    ];
  }

  private async getRegItem(
    registration: IRegistration,
    href: string,
    title: string,
    subTitle: string,
    registrationTid: RegistrationTid
  ): Promise<ISummaryItem> {
    return {
      id: registration.id,
      href,
      title,
      subTitle,
      hasData: await this.registrationService.hasAnyDataToShowInRegistrationTypes(registration, registrationTid).pipe(take(1)).toPromise(),
      attachments: await this.registrationService.getAllAttachmentsForRegistrationTid$(registration.id, registrationTid).pipe(take(1)).toPromise()
    };
  }

  private async getDirtItems(registration: IRegistration) {
    return [
      await this.getRegItem(
        registration,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      await this.getRegItem(
        registration,
        '/registration/dirt/landslide-obs',
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE',
        registration.request.LandSlideObs
          ? registration.request.LandSlideObs.Comment
          : '',
        RegistrationTid.LandSlideObs
      )
    ];
  }

  private async getIceItems(registration: IRegistration) {
    return [
      await this.getRegItem(
        registration,
        '/registration/ice/ice-cover',
        'REGISTRATION.ICE.ICE_COVER.TITLE',
        registration.request.IceCoverObs
          ? registration.request.IceCoverObs.Comment
          : '',
        RegistrationTid.IceCoverObs
      ),
      await this.getRegItem(
        registration,
        '/registration/ice/ice-thickness',
        'REGISTRATION.ICE.ICE_THICKNESS.TITLE',
        registration.request.IceThickness
          ? registration.request.IceThickness.Comment
          : '',
        RegistrationTid.IceThickness
      ),
      await this.getRegItem(
        registration,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      await this.getRegItem(
        registration,
        '/registration/incident',
        'REGISTRATION.INCIDENT.TITLE',
        '',
        RegistrationTid.Incident
      )
    ];
  }

  private async getSnowItems(registration: IRegistration) {
    return [
      await this.getRegItem(
        registration,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      await this.getRegItem(
        registration,
        '/registration/snow/avalanche-obs',
        'REGISTRATION.SNOW.AVALANCHE_OBS.TITLE',
        '',
        RegistrationTid.AvalancheObs
      ),
      await this.getRegItem(
        registration,
        '/registration/snow/avalanche-activity',
        'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE',
        '',
        RegistrationTid.AvalancheActivityObs2
      ),
      await this.getRegItem(
        registration,
        '/registration/snow/weather',
        'REGISTRATION.SNOW.WEATHER.TITLE',
        '',
        RegistrationTid.WeatherObservation
      ),
      await this.getRegItem(
        registration,
        '/registration/snow/snow-surface',
        'REGISTRATION.SNOW.SNOW_SURFACE.TITLE',
        '',
        RegistrationTid.SnowSurfaceObservation
      ),
      await this.getRegItem(
        registration,
        '/registration/snow/compression-test',
        'REGISTRATION.SNOW.COMPRESSION_TEST.TITLE',
        '',
        RegistrationTid.CompressionTest
      ),
      {
        id: registration.id,
        href: '/registration/snow/snow-profile',
        title: 'REGISTRATION.SNOW.SNOW_PROFILE.TITLE',
        subTitle: '',
        hasData:
          await this.registrationService.hasAnyDataToShowInRegistrationTypes(
            registration,
            RegistrationTid.SnowProfile2
          ).pipe(take(1)).toPromise() ||
          (registration.request.CompressionTest &&
            registration.request.CompressionTest.some(
              (x) => x.IncludeInSnowProfile === true
            )),
        attachments: await this.registrationService.getAllAttachmentsForRegistrationTid$(
          registration.id,
          RegistrationTid.SnowProfile2
        ).pipe(take(1)).toPromise()
      },
      await this.getRegItem(
        registration,
        '/registration/snow/avalanche-problem',
        'REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE',
        '',
        RegistrationTid.AvalancheEvalProblem2
      ),
      await this.getRegItem(
        registration,
        '/registration/snow/avalanche-evaluation',
        'REGISTRATION.SNOW.AVALANCHE_EVALUATION.TITLE',
        '',
        RegistrationTid.AvalancheEvaluation3
      )
    ];
  }
}
