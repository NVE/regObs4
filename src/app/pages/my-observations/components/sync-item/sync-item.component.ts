import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';

@Component({
  selector: 'app-sync-item',
  templateUrl: './sync-item.component.html',
  styleUrls: ['./sync-item.component.scss'],changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncItemComponent {
  @Input() draft: RegistrationDraft;

  get loading() {
    return this.draft.syncStatus === SyncStatus.Sync && this.draft.error == null;
  }

  get isDraft() {
    return this.draft.syncStatus === SyncStatus.Draft;
  }

  get locationName(): string {
    return (
      this.draft.registration.ObsLocation?.LocationName ||
      this.draft.registration.ObsLocation?.LocationDescription ||
      ''
    );
  }
}
