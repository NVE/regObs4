import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonList, NavController } from '@ionic/angular/standalone';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { DraftToRegistrationService } from 'src/app/core/services/draft/draft-to-registration.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { refresh, warning } from 'ionicons/icons';

const DEBUG_TAG = 'VersionConflictComponent';

/**
 * Visible on the overview page for a draft if you got a version conflict when you submitted the draft.
 * Shows the error message and let you overwrite the remote version or abandon your changes
 */
@Component({
  selector: 'app-version-conflict',
  templateUrl: './version-conflict.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, IonItem, IonLabel, IonList, TranslateModule],
})
export class VersionConflictComponent {
  @Input() draft: RegistrationDraft;

  constructor(
    private draftToRegistrationService: DraftToRegistrationService,
    private draftRepository: DraftRepositoryService,
    private logger: LoggingService,
    private navController: NavController
  ) {
    addIcons({ refresh, warning });
  }

  overwrite(): void {
    this.logger.debug(`Trying to overwrite remote version of draft ${this.draft.uuid}`, DEBUG_TAG);
    this.draftToRegistrationService.markDraftAsReadyToSubmit(this.draft, true);
    this.navigateToMyObservations(); //so we can see that the draft happily submits
  }

  abandon(): void {
    this.logger.debug(`Draft ${this.draft.uuid} abandoned`, DEBUG_TAG);
    this.draftRepository.delete(this.draft.uuid);
    this.navigateToMyObservations(); //so we can find the new version
  }

  navigateToMyObservations(): void {
    this.navController.navigateRoot('my-observations');
  }
}
