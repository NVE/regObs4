import { Injectable } from '@angular/core';
import { DateHelperService } from '../../shared/services/date-helper/date-helper.service';
import {
  ExistingAttachmentType,
  ExistingOrNewAttachment,
  KdvKey,
  NewAttachmentType,
  RegistrationTid,
} from 'src/app/modules/common-registration/registration.models';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ISummaryItem } from '../components/summary-item/summary-item.model';
import { UserGroupService } from '../../../core/services/user-group/user-group.service';
import {
  GeneralObservationEditModel,
  ObserverGroupDto,
  RegistrationEditModel,
  UrlEditModel,
} from 'src/app/modules/common-regobs-api/models';
import { NavController } from '@ionic/angular';
import { RouterDirection } from '@ionic/core';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { combineLatest, distinctUntilChanged, firstValueFrom, from, map, Observable, switchMap } from 'rxjs';
import deepEqual from 'fast-deep-equal';
import {
  getAllAttachmentsFromEditModel,
  getRegistationPropertyForModel,
  getRegistrationsWithData,
  isObservationModelEmptyForRegistrationTid,
} from '../../common-registration/registration.helpers';
import { attachmentsComparator } from 'src/app/core/helpers/attachment-comparator';
import { KdvService, NewAttachmentService } from '../../common-registration/registration.services';

/**
 *
 * @param previous
 * @param current
 * @returns
 */
export function draftHasNotChanged(previous: RegistrationDraft, current: RegistrationDraft) {
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

  const preTids = getRegistrationsWithData(previous);
  const curTids = getRegistrationsWithData(current);

  // Check if we have any new or removed forms
  if (preTids.length !== curTids.length) {
    return false;
  }

  // Check if we have any changed forms
  for (const tid of curTids) {
    const previousRegistration = getRegistationPropertyForModel(previous.registration, tid);
    const currentRegistration = getRegistationPropertyForModel(current.registration, tid);
    if (!deepEqual(previousRegistration, currentRegistration)) {
      return false;
    }
  }

  const preExistingAttachments = getAllAttachmentsFromEditModel(previous.registration);
  const curExistingAttachments = getAllAttachmentsFromEditModel(current.registration);

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
  providedIn: 'root',
})
export class SummaryItemService {
  constructor(
    private draftService: DraftRepositoryService,
    private newAttachmentService: NewAttachmentService,
    private dateHelperService: DateHelperService,
    private userGroupService: UserGroupService,
    private navController: NavController,
    private kdv: KdvService
  ) {}

  getSummaryItems$(uuid: string): Observable<ISummaryItem[]> {
    // Observables that only emits when the properties we need has changed
    const draft$ = this.draftService.getDraft$(uuid).pipe(distinctUntilChanged(draftHasNotChanged));
    const groups$ = this.userGroupService.getUserGroupsAsObservable().pipe(distinctUntilChanged(groupsHasNotChanged));
    const newAttachments$ = this.newAttachmentService
      .getAttachments(uuid)
      .pipe(distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'id')));

    return combineLatest([draft$, groups$, newAttachments$]).pipe(
      // Combine new attachments and existing attachments into one array
      map(([draft, groups, newAttachments]) => {
        const existingAttachments = getAllAttachmentsFromEditModel(draft.registration);
        return [
          draft,
          groups,
          [
            ...existingAttachments.map((attachment) => ({ type: 'existing' as ExistingAttachmentType, attachment })),
            ...newAttachments.map((attachment) => ({ type: 'new' as NewAttachmentType, attachment })),
          ],
        ] as [RegistrationDraft, ObserverGroupDto[], ExistingOrNewAttachment[]];
      }),
      // Get summary items
      switchMap((inputs) => from(this.getSummaryItems(...inputs)))
    );
  }

  async getLocationAndTimeSummaryItem(draft: RegistrationDraft): Promise<ISummaryItem> {
    const reg = draft.registration;
    const locSummary = reg.ObsLocation?.LocationName || reg.ObsLocation?.LocationDescription || '';
    const timeSummary = reg.DtObsTime ? await this.dateHelperService.formatDateString(reg.DtObsTime) : '';
    return {
      uuid: draft.uuid,
      href: '/registration/obs-location',
      queryParams: { geoHazard: draft.registration.GeoHazardTID },
      title: 'REGISTRATION.OBS_LOCATION.TITLE',
      subTitle: [locSummary, timeSummary].join(' — '),
      hasData: !isEmpty(reg.ObsLocation) || !!reg.DtObsTime,
    };
  }

  private async getSummaryItems(
    draft: RegistrationDraft,
    userGroups?: ObserverGroupDto[],
    attachments?: ExistingOrNewAttachment[]
  ): Promise<ISummaryItem[]> {
    if (!draft) {
      return [];
    }

    // If usergroups or attachments are not provided, do not use them.
    // This is used internally by getPreviousAndNext to get all the hrefs
    const userGroupsToUse = userGroups ? userGroups : [];
    const attachmentsToUse = attachments ? attachments : [];

    const locationAndTimeItem = await this.getLocationAndTimeSummaryItem(draft);

    const summaryItems: ISummaryItem[] = [
      locationAndTimeItem,
      ...(await this.getGeoHazardItems(draft, attachmentsToUse)),
    ];

    if (draft.registration.GeoHazardTID != 70) {
      summaryItems.push(
        await this.getRegItem(
          draft,
          '/registration/general-comment',
          'REGISTRATION.GENERAL_COMMENT.TITLE',
          getGenerelObsText(draft.registration.GeneralObservation),
          RegistrationTid.GeneralObservation,
          attachmentsToUse
        )
      );
    }

    if (userGroupsToUse.length > 0) {
      summaryItems.push({
        uuid: draft.uuid,
        href: '/registration/group',
        title: 'REGISTRATION.OVERVIEW.SHARE_WITH_GROUP',
        subTitle: this.getObservationGroupName(draft, userGroupsToUse),
        hasData: !!draft.registration.ObserverGroupID,
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

  private getGeoHazardItems(draft: RegistrationDraft, attachments: ExistingOrNewAttachment[]): Promise<ISummaryItem[]> {
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
    // We have no spesific summary items for water yet because of the new simple form,
    // but we would need to add more later when we get more fields in the simple form so
    // that they are shown in error summary view
    return [
      await this.getRegItem(
        draft,
        '/registration',
        'REGISTRATION.WATER.WATER_LEVEL.SET_FLOOD_POSITION_SUMMARY_TITLE',
        '',
        RegistrationTid.WaterLevel2,
        attachments
      ),
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
    const attachments = allAttachments.filter((a) => a.attachment.RegistrationTID === registrationTid);
    const isEmpty =
      attachments.length === 0 && isObservationModelEmptyForRegistrationTid(draft.registration, registrationTid);

    return {
      uuid: draft.uuid,
      href,
      title,
      subTitle,
      hasData: !isEmpty,
      attachments,
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
        await this.getDangerObsSummary(draft.registration.DangerObs, 'Dirt_DangerSignKDV'),
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
      ),
    ];
  }

  private async getIceCoverSummary(model: RegistrationEditModel['IceCoverObs']): Promise<string> {
    const texts = [];
    if (model?.IceCoverTID) {
      const values = await firstValueFrom(this.kdv.getKdvRepositoryByKeyObservable('Ice_IceCoverKDV'));
      const selectedValue = values.find((v) => v.Id === model.IceCoverTID);
      if (selectedValue) {
        texts.push(selectedValue.Name);
      }
    }
    if (model?.Comment) {
      texts.push(model.Comment);
    }
    return texts.join(', ');
  }

  private getIceThicknessSummary(model: RegistrationEditModel['IceThickness']): string {
    const texts = [];
    if (model?.IceThicknessSum != null) {
      texts.push(`${model.IceThicknessSum * 100} cm`);
    }
    if (model?.Comment) {
      texts.push(model.Comment);
    }
    return texts.join(', ');
  }

  private async getDangerObsSummary(model: RegistrationEditModel['DangerObs'], kdv: KdvKey): Promise<string> {
    let texts = '';
    if (model?.length) {
      const kdvs = await firstValueFrom(this.kdv.getKdvRepositoryByKeyObservable(kdv));
      texts = model
        .map((dangerSign) => dangerSign.DangerSignTID)
        .map((tid) => kdvs.find((v) => v.Id === tid))
        .filter((text) => text != null)
        .map((kdv) => kdv.Name)
        .join(', ');
    }
    return texts;
  }

  private async getIceItems(draft: RegistrationDraft, attachments: ExistingOrNewAttachment[]): Promise<ISummaryItem[]> {
    return [
      await this.getRegItem(
        draft,
        '/registration/ice/ice-cover',
        'REGISTRATION.ICE.ICE_COVER.TITLE',
        await this.getIceCoverSummary(draft.registration.IceCoverObs),
        RegistrationTid.IceCoverObs,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/ice/ice-thickness',
        'REGISTRATION.ICE.ICE_THICKNESS.TITLE',
        this.getIceThicknessSummary(draft.registration.IceThickness),
        RegistrationTid.IceThickness,
        attachments
      ),
      await this.getRegItem(
        draft,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        await this.getDangerObsSummary(draft.registration.DangerObs, 'Ice_DangerSignKDV'),
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
      ),
    ];
  }

  private async getSnowItems(
    draft: RegistrationDraft,
    attachments: ExistingOrNewAttachment[]
  ): Promise<ISummaryItem[]> {
    const snowProfileAttachments = attachments.filter(
      (a) => a.attachment.RegistrationTID === RegistrationTid.SnowProfile2
    );
    const snowProfileHasTests = draft.registration.CompressionTest?.some((x) => x.IncludeInSnowProfile === true);
    const snowProfileIsEmpty =
      snowProfileAttachments.length === 0 &&
      isObservationModelEmptyForRegistrationTid(draft.registration, RegistrationTid.SnowProfile2) &&
      !snowProfileHasTests;

    return [
      await this.getRegItem(
        draft,
        '/registration/danger-obs',
        'REGISTRATION.DANGER_OBS.TITLE',
        await this.getDangerObsSummary(draft.registration.DangerObs, 'Snow_DangerSignKDV'),
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
        attachments: snowProfileAttachments,
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
      ),
    ];
  }
}

// Helper function to get short text description for a url item
const getUrlText = (url: UrlEditModel): string => {
  if (url.UrlDescription) {
    return `${url.UrlDescription} (${url.UrlLine})`;
  }
  return url.UrlLine;
};

// Helper function to get short text description for a general obs item
const getGenerelObsText = (go: GeneralObservationEditModel): string => {
  const texts = [];
  if (go?.ObsComment) {
    texts.push(go.ObsComment);
  }
  if (go?.Urls) {
    for (const url of go.Urls) {
      texts.push(getUrlText(url));
    }
  }
  if (texts.length) {
    return texts.join(', ');
  }
  return '';
};
