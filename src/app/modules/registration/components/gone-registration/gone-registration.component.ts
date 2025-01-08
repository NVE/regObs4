import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonList, NavController } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { DraftToRegistrationService } from 'src/app/core/services/draft/draft-to-registration.service';
import { SqliteService } from 'src/app/core/services/sqlite/sqlite.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { refresh, warning } from 'ionicons/icons';

const DEBUG_TAG = 'VersionConflictComponent';

/**
 * Visible on the overview page for a draft if you got a HTTP Gone when you submitted the draft.
 * Shows the error message and let you submit a new draft based on the deleted registration or abandon your changes
 */
@Component({
  selector: 'app-gone-registration',
  templateUrl: './gone-registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, IonItem, IonLabel, IonList, TranslatePipe],
})
export class GoneRegistrationComponent {
  private draftToRegistrationService = inject(DraftToRegistrationService);
  private draftRepository = inject(DraftRepositoryService);
  private logger = inject(LoggingService);
  private navController = inject(NavController);
  private userSettingService = inject(UserSettingService);
  private sqliteService = inject(SqliteService);

  readonly draft = input.required<RegistrationDraft>();

  constructor() {
    addIcons({ refresh, warning });
  }

  async submitAsNew(): Promise<void> {
    const draft = this.draft();
    const uuid = await this.draftRepository.copyDraftAndSave(draft);
    const newDraft = await this.draftRepository.load(uuid);
    if (!newDraft) {
      // TODO: Check if this needs better error handling - how can newDraft be undefined and what happens then?
      throw new Error('Failed to create new draft');
    }
    this.logger.debug(
      `Submitting new draft with uuid ${newDraft.uuid} based on deleted registration with regId ${draft.regId}`,
      DEBUG_TAG
    );
    await this.draftToRegistrationService.markDraftAsReadyToSubmit(newDraft, false);
    await this.delete(draft);
    this.navigateToMyObservations(); //so we can see that the draft happily submits
  }

  async abandon() {
    const draft = this.draft();
    this.logger.debug(`Draft ${draft.uuid} abandoned`, DEBUG_TAG);
    await this.delete(draft);
    this.navigateToMyObservations(); //so we can see that the observation is gone
  }

  private async delete(draft: RegistrationDraft) {
    this.draftRepository.delete(draft.uuid); //delete draft that was deleted in Regobst

    //delete observation from map and list view
    const appMode = await firstValueFrom(this.userSettingService.appMode$);

    // TODO: Det er vel ikke helt heldig at sqlite service lastes på web? Hvordan komme rundt dette?
    if (draft.regId) {
      this.sqliteService.deleteRegistrations([draft.regId], appMode);
    }
  }

  navigateToMyObservations(): void {
    this.navController.navigateRoot('my-observations');
  }
}
