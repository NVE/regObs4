import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { isObservationModelEmptyForRegistrationTid } from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { GeneralObservationEditModel, UrlEditModel, Waterlevel2EditModel } from 'src/app/modules/common-regobs-api';

/**
 * Simplified water registration schema.'
 * Remember to add schemes in SummaryItemService.getWaterItems to show which schemes were included in the observation when sending fails
 */
@Component({
  selector: 'app-simple-water-obs',
  templateUrl: './simple-water-obs.component.html',
  styleUrls: ['./simple-water-obs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleWaterObsComponent {
  @Input() draft: RegistrationDraft;
  constructor(private draftRepository: DraftRepositoryService, private navController: NavController) {}

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
    const isEmpty = isObservationModelEmptyForRegistrationTid(
      this.draft.registration,
      RegistrationTid.GeneralObservation
    );
    if (isEmpty) {
      this.draft.registration.GeneralObservation = null;
    }
    await this.draftRepository.save(this.draft);
  }

  nav() {
    this.navController.navigateForward(`registration/water/set-flood-area/${this.draft.uuid}`);
  }
}
