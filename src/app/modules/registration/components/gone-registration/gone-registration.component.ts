import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
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
  @Input() draft: RegistrationDraft;

  constructor(
    private draftToRegistrationService: DraftToRegistrationService,
    private draftRepository: DraftRepositoryService,
    private logger: LoggingService,
    private navController: NavController,
    private userSettingService: UserSettingService,
    private sqliteService: SqliteService
  ) {
    addIcons({ refresh, warning });
  }

  async submitAsNew(): Promise<void> {
    const uuid = await this.draftRepository.copyDraftAndSave(this.draft);
    const newDraft = await this.draftRepository.load(uuid);
    this.logger.debug(
      `Submitting new draft with uuid ${newDraft.uuid} based on deleted registration with regId ${this.draft.regId}`,
      DEBUG_TAG
    );
    await this.draftToRegistrationService.markDraftAsReadyToSubmit(newDraft, false);
    await this.delete();
    this.navigateToMyObservations(); //so we can see that the draft happily submits
  }

  async abandon() {
    this.logger.debug(`Draft ${this.draft.uuid} abandoned`, DEBUG_TAG);
    await this.delete();
    this.navigateToMyObservations(); //so we can see that the observation is gone
  }

  private async delete() {
    this.draftRepository.delete(this.draft.uuid); //delete draft that was deleted in Regobst

    //delete observation from map and list view
    const appMode = await firstValueFrom(this.userSettingService.appMode$);
    this.sqliteService.deleteRegistrations([this.draft.regId], appMode);
  }

  navigateToMyObservations(): void {
    this.navController.navigateRoot('my-observations');
  }
}
