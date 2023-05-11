import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, takeUntil } from 'rxjs';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { getNewAndExistingAttachmentsForDraft$ } from 'src/app/core/services/add-update-delete-registration/attachmentHelpers';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { hasAnyDataBesidesPropertyToExclude } from 'src/app/modules/common-registration/registration.helpers';
import { ExistingOrNewAttachment, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { GeneralObservationEditModel, UrlEditModel, Waterlevel2EditModel } from 'src/app/modules/common-regobs-api';

/**
 * Simplified water registration schema.'
 * Remember to add schemes in SummaryItemService.getWaterItems to show which schemes were included in the observation when sending fails
 * Simple water is based on the same logic as generalObservation but is not a subclass of the BasePage thus we must check if fields are empty
 * and save data directly in SimpleWaterObsComponent
 */
@Component({
  selector: 'app-simple-water-obs',
  templateUrl: './simple-water-obs.component.html',
  styleUrls: ['./simple-water-obs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleWaterObsComponent extends NgDestoryBase implements OnInit {
  @Input() draft: RegistrationDraft;

  genObsRegistrationTid = RegistrationTid.GeneralObservation;

  constructor(
    private draftRepository: DraftRepositoryService,
    private navController: NavController,
    private newAttachmentService: NewAttachmentService
  ) {
    super();
  }
  ngOnInit(): void {
    // observe attachments to force water obs for updates
    getNewAndExistingAttachmentsForDraft$(
      this.genObsRegistrationTid,
      this.draftRepository.getDraft$(this.draft.uuid),
      this.newAttachmentService.getAttachments(this.draft.uuid, { registrationTid: this.genObsRegistrationTid })
    )
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => this.save());
  }

  get waterLevel2(): Waterlevel2EditModel {
    return this.draft.registration.WaterLevel2;
  }

  get generalObservation(): GeneralObservationEditModel {
    if (!this.draft.registration.GeneralObservation) {
      return {};
    }
    return this.draft.registration.GeneralObservation;
  }

  async saveComment(value: string) {
    if (!this.draft.registration.GeneralObservation) {
      this.draft.registration.GeneralObservation = {};
    }
    this.draft.registration.GeneralObservation.ObsComment = value;
    await this.save();
  }

  async saveUrl(value: UrlEditModel[]) {
    if (!this.draft.registration.GeneralObservation) {
      this.draft.registration.GeneralObservation = {};
    }
    this.draft.registration.GeneralObservation.Urls = value;
    await this.save();
  }

  async save(): Promise<void> {
    const isEmpty = await this.isSimpleWaterGeneralObsEmpty(this.draft);
    // if genObs is not empty (for example there are attachments) but self GeneralObservation property
    // doesnt exist in the draft, create en empty object
    this.draft.registration.GeneralObservation = isEmpty
      ? null
      : !isEmpty && !this.draft.registration.GeneralObservation
      ? {}
      : this.draft.registration.GeneralObservation;

    await this.draftRepository.save(this.draft);
  }

  async isSimpleWaterGeneralObsEmpty(draft: RegistrationDraft): Promise<boolean> {
    if (draft.registration.GeneralObservation) {
      // check if existing generalObservation fields are not empty
      if (
        hasAnyDataBesidesPropertyToExclude(draft.registration.GeneralObservation, ['GeoHazardTID', 'GeoHazardName'])
      ) {
        return false;
      }
      // check if the new generalObservation is not empty
      else if (
        draft.registration.GeneralObservation.ObsComment &&
        draft.registration.GeneralObservation.Urls?.length > 0
      ) {
        return false;
      }
    }

    // check if any attachments are connected to genObs
    const hasAttachments = await this.draftRepository.hasAttachments(draft, RegistrationTid.GeneralObservation);
    if (hasAttachments) {
      return false;
    }

    return true;
  }

  nav() {
    this.navController.navigateForward(`registration/water/set-flood-area/${this.draft.uuid}`);
  }
}
