import { Injectable } from '@angular/core';
import { DateHelperService } from '../../shared/services/date-helper/date-helper.service';
import { ExistingAttachmentType, ExistingOrNewAttachment, NewAttachmentType, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ISummaryItem } from '../components/summary-item/summary-item.model';
import { UserGroupService } from '../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from 'src/app/modules/common-regobs-api/models';
import { NavController } from '@ionic/angular';
import { RouterDirection } from '@ionic/core';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { combineLatest, distinctUntilChanged, from, map, Observable, switchMap } from 'rxjs';
import deepEqual from 'fast-deep-equal';
import { getAttachmentsFromRegistration, getRegistrationsWithData, isObservationModelEmptyForRegistrationTid } from '../../common-registration/registration.helpers';
import { attachmentsComparator } from 'src/app/core/helpers/attachment-comparator';
import { NewAttachmentService } from '../../common-registration/registration.services';

function draftHasNotChanged(previous: RegistrationDraft, current: RegistrationDraft) {
  // Check if draft time has changed
  if (previous.registration.DtObsTime !== current.registration.DtObsTime) {
    return false;
  }

  // Check if groups on draft has changed
  if (previous.registration.ObserverGroupID !== current.registration.ObserverGroupID) {
    return false;
  }

  // Check if draft location has changed
  if (!deepEqual(previous.registration.ObsLocation, current.registration.ObsLocation)) {
    return false;
  }

  const preTids = getRegistrationsWithData(previous).sort((a, b) => a - b);
  const curTids = getRegistrationsWithData(current).sort((a, b) => a - b);

  // Check if we have any new or removed forms
  if (preTids.length !== curTids.length) {
    return false;
  }

  // Check if we have any changed forms
  const anyTidsChanged = curTids.some((curTid, i) => curTid !== preTids[i]);
  if (anyTidsChanged) {
    return false;
  }

  const preExistingAttachments = getAttachmentsFromRegistration(previous.registration);
  const curExistingAttachments = getAttachmentsFromRegistration(current.registration);

  // Check if existing attachments has changed
  return attachmentsComparator(preExistingAttachments, curExistingAttachments, 'AttachmentId');
}

function groupsHasNotChanged(previous: ObserverGroupDto[], current: ObserverGroupDto[]) {
  if (previous.length !== current.length) {
    return false;
  }

  const sortedCurrent = current.sort((a, b) => a.Id - b.Id);
  const sortedPrevious = current.sort((a, b) => a.Id - b.Id);

  return !sortedCurrent.some((group, i) => group.Id !== sortedPrevious[i].Id);
}

@Injectable({
  providedIn: 'root'
})
export class SummaryItemService {

  constructor(
    private draftService: DraftRepositoryService,
    private newAttachmentService: NewAttachmentService,
    private dateHelperService: DateHelperService,
    private userGroupService: UserGroupService,
    private navController: NavController
  ) {}

  getSummaryItems$(uuid: string): Observable<ISummaryItem[]> {
    // Observables that only emits when the properties we need has changed
    const draft$ = this.draftService.getDraft$(uuid).pipe(distinctUntilChanged(draftHasNotChanged));
    const groups$ = this.userGroupService.getUserGroupsAsObservable().pipe(distinctUntilChanged(groupsHasNotChanged));
    const newAttachments$ = this.newAttachmentService.getAttachments(uuid)
      .pipe(distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'id')));

    return combineLatest([draft$, groups$, newAttachments$]).pipe(
      // Combine new attachments and existing attachments into one array
      map(([draft, groups, newAttachments]) => {
        const existingAttachments = getAttachmentsFromRegistration(draft.registration);
        return [
          draft,
          groups,
          [
            ...existingAttachments.map(attachment => ({ type: 'existing' as ExistingAttachmentType, attachment })),
            ...newAttachments.map(attachment => ({ type: 'new' as NewAttachmentType, attachment }))
          ]
        ] as [RegistrationDraft, ObserverGroupDto[], ExistingOrNewAttachment[]];
      }),
      // Get summary items
      switchMap(inputs => from(this.getSummaryItems(...inputs)))
    );
  }

  private async getSummaryItems(
    draft: RegistrationDraft,
    userGroups?: ObserverGroupDto[],
    attachments?: ExistingOrNewAttachment[],
  ): Promise<ISummaryItem[]> {
    if (!draft) {
      return [];
    }

    // If usergroups or attachments are not provided, do not use them.
    // This is used internally by getPreviousAndNext to get all the hrefs
    const userGroupsToUse = userGroups ? userGroups : [];
    const attachmentsToUse = attachments ? attachments : [];
    const summaryItems: ISummaryItem[] = [...(await this.getGeoHazardItems(draft, attachmentsToUse))];

    summaryItems.splice(
      draft.registration.GeoHazardTID == GeoHazard.Water ? 0 : summaryItems.length,
      0,
      await this.getRegItem(
        draft,
        '/registration/general-comment',
        'REGISTRATION.GENERAL_COMMENT.TITLE',
        draft.registration.GeneralObservation ? draft.registration.GeneralObservation.ObsComment : '',
        RegistrationTid.GeneralObservation,
        attachmentsToUse
      )
    );

    summaryItems.push(...[
      {
        uuid: draft.uuid,
        href: '/registration/obs-location',
        queryParams: { geoHazard: draft.registration.GeoHazardTID },
        title: 'REGISTRATION.OBS_LOCATION.TITLE',
        subTitle: draft.registration.ObsLocation
          ? draft.registration.ObsLocation.LocationName || draft.registration.ObsLocation.LocationDescription
          : '',
        hasData: !isEmpty(draft.registration.ObsLocation)
      },
      {
        uuid: draft.uuid,
        href: '/registration/set-time',
        title: 'REGISTRATION.OVERVIEW.DATE_AND_TIME',
        subTitle: draft.registration.DtObsTime
          ? await this.dateHelperService.formatDateString(
            draft.registration.DtObsTime
          )
          : '',
        hasData: !!draft.registration.DtObsTime
      }
    ]);

    if (userGroupsToUse.length > 0) {
      summaryItems.push({
        uuid: draft.uuid,
        href: '/registration/group',
        title: 'REGISTRATION.OVERVIEW.SHARE_WITH_GROUP',
        subTitle: this.getObservationGroupName(draft, userGroupsToUse),
        hasData: !!draft.registration.ObserverGroupID
      });
    }

    return summaryItems;
  }

  async getPreviousAndNext(
    draft: RegistrationDraft,
    url: string
  ): Promise<{ previous: ISummaryItem; next: ISummaryItem }> {
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

  private getGeoHazardItems(
    draft: RegistrationDraft,
    attachments: ExistingOrNewAttachment[]
  ): Promise<ISummaryItem[]> {
    switch (draft.registration.GeoHazardTID) {
    case GeoHazard.Water:
      return this.getWaterItems(draft, attachments);
    case GeoHazard.Ice:
      return this.getIceItems(draft, attachments);
    case GeoHazard.Soil:
      return this.getDirtItems(draft, attachments);
    case GeoHazard.Snow:
      return this.getSnowItems(draft, attachments);
    }
  }

  private async getWaterItems(
    draft: RegistrationDraft,
    attachments: ExistingOrNewAttachment[]
  ): Promise<ISummaryItem[]> {
    return [
      await this.getRegItem(
        draft,
        '/registration/water/water-level',
        'REGISTRATION.WATER.WATER_LEVEL.TITLE',
        draft.registration.WaterLevel2 ? draft.registration.WaterLevel2.Comment : '',
        RegistrationTid.WaterLevel2,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/water/damage',
        'REGISTRATION.WATER.DAMAGE.TITLE',
        '', // this.registration.DamageObs ? this.registration.DamageObs.map((x) => x.Comment).join() : '',
        RegistrationTid.DamageObs,
        attachments
      )
    ];
  }

  private async getRegItem(
    draft: RegistrationDraft,
    href: string,
    title: string,
    subTitle: string,
    registrationTid: RegistrationTid,
    allAttachments: ExistingOrNewAttachment[]
  ): Promise<ISummaryItem> {
    const attachments = allAttachments.filter(a => a.attachment.RegistrationTID === registrationTid);
    const isEmpty = attachments.length === 0
      && isObservationModelEmptyForRegistrationTid(draft.registration, registrationTid);

    return {
      uuid: draft.uuid,
      href,
      title,
      subTitle,
      hasData: !isEmpty,
      attachments
    };
  }

  private async getDirtItems(
    draft: RegistrationDraft,
    attachments: ExistingOrNewAttachment[]
  ): Promise<ISummaryItem[]> {
    return [
      await this.getRegItem(
        draft,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/dirt/landslide-obs',
        'REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE',
        draft.registration.LandSlideObs ? draft.registration.LandSlideObs.Comment : '',
        RegistrationTid.LandSlideObs,
        attachments
      )
    ];
  }

  private async getIceItems(
    draft: RegistrationDraft,
    attachments: ExistingOrNewAttachment[]
  ): Promise<ISummaryItem[]> {
    return [
      await this.getRegItem(
        draft,
        '/registration/ice/ice-cover',
        'REGISTRATION.ICE.ICE_COVER.TITLE',
        draft.registration.IceCoverObs ? draft.registration.IceCoverObs.Comment : '',
        RegistrationTid.IceCoverObs,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/ice/ice-thickness',
        'REGISTRATION.ICE.ICE_THICKNESS.TITLE',
        draft.registration.IceThickness ? draft.registration.IceThickness.Comment : '',
        RegistrationTid.IceThickness,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/incident',
        'REGISTRATION.INCIDENT.TITLE',
        '',
        RegistrationTid.Incident,
        attachments
      )
    ];
  }

  private async getSnowItems(
    draft: RegistrationDraft,
    attachments: ExistingOrNewAttachment[]
  ): Promise<ISummaryItem[]> {
    const snowProfileAttachments = attachments
      .filter(a => a.attachment.RegistrationTID === RegistrationTid.SnowProfile2);
    const snowProfileHasTests = draft.registration.CompressionTest?.some((x) => x.IncludeInSnowProfile === true);
    const snowProfileIsEmpty = snowProfileAttachments.length === 0
      && isObservationModelEmptyForRegistrationTid(draft.registration, RegistrationTid.SnowProfile2)
      && !snowProfileHasTests;

    return [
      await this.getRegItem(
        draft,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        '',
        RegistrationTid.DangerObs,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/avalanche-obs',
        'REGISTRATION.SNOW.AVALANCHE_OBS.TITLE',
        '',
        RegistrationTid.AvalancheObs,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/avalanche-activity',
        'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE',
        '',
        RegistrationTid.AvalancheActivityObs2,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/weather',
        'REGISTRATION.SNOW.WEATHER.TITLE',
        '',
        RegistrationTid.WeatherObservation,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/snow-surface',
        'REGISTRATION.SNOW.SNOW_SURFACE.TITLE',
        '',
        RegistrationTid.SnowSurfaceObservation,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/compression-test',
        'REGISTRATION.SNOW.COMPRESSION_TEST.TITLE',
        '',
        RegistrationTid.CompressionTest,
        attachments
      ),
      {
        uuid: draft.uuid,
        href: '/registration/snow/snow-profile',
        title: 'REGISTRATION.SNOW.SNOW_PROFILE.TITLE',
        subTitle: '',
        hasData: !snowProfileIsEmpty,
        attachments: snowProfileAttachments
      },
      await this.getRegItem(
        draft,
        '/registration/snow/avalanche-problem',
        'REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE',
        '',
        RegistrationTid.AvalancheEvalProblem2,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/snow/avalanche-evaluation',
        'REGISTRATION.SNOW.AVALANCHE_EVALUATION.TITLE',
        '',
        RegistrationTid.AvalancheEvaluation3,
        attachments
      )
    ];
  }
}
