import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { DraftToRegistrationService } from 'src/app/core/services/draft/draft-to-registration.service';
import { ObservationService } from 'src/app/core/services/observation/observation.service';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'VersionConflictComponent';

/**
 * Visible on the overview page for a draft if you got a HTTP Gone when you submitted the draft.
 * Shows the error message and let you submit a new draft based on the deleted registration or abandon your changes
 */
@Component({
  selector: 'app-gone-registration',
  templateUrl: './gone-registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoneRegistrationComponent {
  @Input() draft: RegistrationDraft;

  constructor(
    private draftToRegistrationService: DraftToRegistrationService,
    private draftRepository: DraftRepositoryService,
    private observationService: ObservationService,
    private logger: LoggingService,
    private navController: NavController
  ) {}

  async submitAsNew(): Promise<void> {
    const uuid = uuidv4();
    await this.draftRepository.copyDraftAndSave(this.draft, uuid);
    const newDraft = await this.draftRepository.load(uuid);
    this.logger.debug(
      `Submitting new draft with uuid ${newDraft.uuid} based on deleted registration with regId ${this.draft.regId}`,
      DEBUG_TAG
    );
    this.draftToRegistrationService.markDraftAsReadyToSubmit(newDraft, false);
    this.delete();
    this.navigateToMyObservations(); //so we can see that the draft happily submits
  }

  abandon(): void {
    this.logger.debug(`Draft ${this.draft.uuid} abandoned`, DEBUG_TAG);
    this.delete();
    this.navigateToMyObservations(); //so we can see that the observation is gone
  }

  private delete(): void {
    this.draftRepository.delete(this.draft.uuid); //delete draft that was deleted in Regobs
    this.observationService.deleteFetchedObservation(this.draft.regId); //delete observation from map and list view
  }

  navigateToMyObservations(): void {
    this.navController.navigateRoot('my-observations');
  }
}
