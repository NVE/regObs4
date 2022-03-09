import { Injectable } from '@angular/core';
import { DateHelperService } from '../../shared/services/date-helper/date-helper.service';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ISummaryItem } from '../components/summary-item/summary-item.model';
import { UserGroupService } from '../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from 'src/app/modules/common-regobs-api/models';
import { NavController } from '@ionic/angular';
import { RouterDirection } from '@ionic/core';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryItemService {
  constructor(
    private draftService: DraftRepositoryService,
    private dateHelperService: DateHelperService,
    private userGroupService: UserGroupService,
    private navController: NavController
  ) {}

  async getSummaryItems(draft: RegistrationDraft, userGroups?: ObserverGroupDto[]) {
    if (!draft) {
      return [];
    }
    const userGroupsToUse = userGroups ? userGroups : await this.userGroupService.getUserGroups();
    const summaryItems: ISummaryItem[] = [
      {
        id: draft.uuid,
        href: '/registration/obs-location',
        queryParams: { geoHazard: draft.registration.GeoHazardTID },
        title: 'REGISTRATION.OBS_LOCATION.TITLE',
        subTitle: draft.registration.ObsLocation
          ? draft.registration.ObsLocation.LocationName || draft.registration.ObsLocation.LocationDescription
          : '',
        hasData: !isEmpty(draft.registration.ObsLocation)
      },
      {
        id: draft.uuid,
        href: '/registration/set-time',
        title: 'REGISTRATION.OVERVIEW.DATE_AND_TIME',
        subTitle: draft.registration.DtObsTime
          ? await this.dateHelperService.formatDateString(
            draft.registration.DtObsTime
          )
          : '',
        hasData: !!draft.registration.DtObsTime
      }
    ];
    if (userGroupsToUse.length > 0) {
      summaryItems.push({
        id: draft.uuid,
        href: '/registration/group',
        title: 'REGISTRATION.OVERVIEW.SHARE_WITH_GROUP',
        subTitle: this.getObservationGroupName(draft, userGroupsToUse),
        hasData: !!draft.registration.ObserverGroupID
      });
    }

    summaryItems.push(...(await this.getGeoHazardItems(draft)));

    summaryItems.push(
      await this.getRegItem(
        draft,
        '/registration/general-comment',
        'REGISTRATION.GENERAL_COMMENT.TITLE',
        draft.registration.GeneralObservation ? draft.registration.GeneralObservation.ObsComment : '',
        RegistrationTid.GeneralObservation
      )
    );

    return summaryItems;
  }

  async getPreviousAndNext(draft: RegistrationDraft, url: string): Promise<{ previous: ISummaryItem; next: ISummaryItem }> {
    const summaryItems = await this.getSummaryItems(draft);
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

  navigateTo(draft: RegistrationDraft, summaryItem: ISummaryItem, direction: RouterDirection = 'forward') {
    const url = `${summaryItem.href}/${draft.uuid}`;
    return direction === 'forward' ? this.navController.navigateForward(url) : this.navController.navigateBack(url);
  }

  async navigateForward(draft: RegistrationDraft, url: string) {
    const prevAndNext = await this.getPreviousAndNext(draft, url);
    if (prevAndNext.next) {
      return this.navigateTo(draft, prevAndNext.next, 'forward');
    } else {
      return this.navController.navigateRoot(`/registration/edit/${draft.uuid}`);
    }
  }

  private getObservationGroupName(draft: RegistrationDraft, userGroups: ObserverGroupDto[]) {
    if (draft && draft.registration.ObserverGroupID && userGroups) {
      const selectedGroup = userGroups.find((x) => x.Id === draft.registration.ObserverGroupID);
      if (selectedGroup) {
        return selectedGroup.Name;
      }
    }
    return '';
  }

  private getGeoHazardItems(draft: RegistrationDraft) {
    switch (draft.registration.GeoHazardTID) {
    case GeoHazard.Water:
      return this.getWaterItems(draft);
    case GeoHazard.Ice:
      return this.getIceItems(draft);
    case GeoHazard.Soil:
      return this.getDirtItems(draft);
    case GeoHazard.Snow:
      return this.getSnowItems(draft);
    }
  }

  private async getWaterItems(draft: RegistrationDraft) {
    return [
      await this.getRegItem(
        draft,
        '/registration/water/water-level',
        'REGISTRATION.WATER.WATER_LEVEL.TITLE',
        draft.registration.WaterLevel2 ? draft.registration.WaterLevel2.Comment : '',
        RegistrationTid.WaterLevel2
      ),
      await this.getRegItem(
        draft,
        '/registration/water/damage',
        'REGISTRATION.WATER.DAMAGE.TITLE',
        '', // this.registration.DamageObs ? this.registration.DamageObs.map((x) => x.Comment).join() : '',
        RegistrationTid.DamageObs
      )
    ];
  }

  private async getRegItem(
    draft: RegistrationDraft,
    href: string,
    title: string,
    subTitle: string,
    registrationTid: RegistrationTid
  ): Promise<ISummaryItem> {
    return {
      id: draft.uuid,
      href,
      title,
      subTitle,
      hasData: !await this.draftService.isDraftEmptyForRegistrationType(draft, registrationTid),
      attachments: await this.draftService.getAttachments(draft, registrationTid)
    };
  }

  private async getDirtItems(draft: RegistrationDraft) {
    return [
      await this.getRegItem(
        draft,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      await this.getRegItem(
        draft,
        '/registration/dirt/landslide-obs',
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE',
        draft.registration.LandSlideObs ? draft.registration.LandSlideObs.Comment : '',
        RegistrationTid.LandSlideObs
      )
    ];
  }

  private async getIceItems(draft: RegistrationDraft) {
    return [
      await this.getRegItem(
        draft,
        '/registration/ice/ice-cover',
        'REGISTRATION.ICE.ICE_COVER.TITLE',
        draft.registration.IceCoverObs ? draft.registration.IceCoverObs.Comment : '',
        RegistrationTid.IceCoverObs
      ),
      await this.getRegItem(
        draft,
        '/registration/ice/ice-thickness',
        'REGISTRATION.ICE.ICE_THICKNESS.TITLE',
        draft.registration.IceThickness ? draft.registration.IceThickness.Comment : '',
        RegistrationTid.IceThickness
      ),
      await this.getRegItem(
        draft,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      await this.getRegItem(
        draft,
        '/registration/incident',
        'REGISTRATION.INCIDENT.TITLE',
        '',
        RegistrationTid.Incident
      )
    ];
  }

  private async getSnowItems(draft: RegistrationDraft) {
    return [
      await this.getRegItem(
        draft,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/avalanche-obs',
        'REGISTRATION.SNOW.AVALANCHE_OBS.TITLE',
        '',
        RegistrationTid.AvalancheObs
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/avalanche-activity',
        'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE',
        '',
        RegistrationTid.AvalancheActivityObs2
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/weather',
        'REGISTRATION.SNOW.WEATHER.TITLE',
        '',
        RegistrationTid.WeatherObservation
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/snow-surface',
        'REGISTRATION.SNOW.SNOW_SURFACE.TITLE',
        '',
        RegistrationTid.SnowSurfaceObservation
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/compression-test',
        'REGISTRATION.SNOW.COMPRESSION_TEST.TITLE',
        '',
        RegistrationTid.CompressionTest
      ),
      {
        id: draft.uuid,
        href: '/registration/snow/snow-profile',
        title: 'REGISTRATION.SNOW.SNOW_PROFILE.TITLE',
        subTitle: '',
        hasData:
          !await this.draftService.isDraftEmptyForRegistrationType(draft, RegistrationTid.SnowProfile2) ||
          draft.registration.CompressionTest?.some((x) => x.IncludeInSnowProfile === true),
        attachments: await this.draftService.getAttachments(draft, RegistrationTid.SnowProfile2)
      },
      await this.getRegItem(
        draft,
        '/registration/snow/avalanche-problem',
        'REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE',
        '',
        RegistrationTid.AvalancheEvalProblem2
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/avalanche-evaluation',
        'REGISTRATION.SNOW.AVALANCHE_EVALUATION.TITLE',
        '',
        RegistrationTid.AvalancheEvaluation3
      )
    ];
  }
}
