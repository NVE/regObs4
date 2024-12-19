import { IonIcon, IonSpinner, IonItem, IonLabel, IonRouterLink } from '@ionic/angular/standalone';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import {
  RegistrationDraft,
  RegistrationDraftError,
  RegistrationDraftErrorCode,
} from 'src/app/core/services/draft/draft-model';
import { ObsLocationViewModel } from 'src/app/modules/common-regobs-api';
import { RouterLink } from '@angular/router';
import { GeoIconComponent } from '../../../../modules/shared/components/geo-icon/geo-icon.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FormatDatePipe } from '../../../../modules/shared/pipes/format-date/format-date.pipe';
import { addIcons } from 'ionicons';
import { calendar } from 'ionicons/icons';

@Component({
  selector: 'app-sync-item',
  templateUrl: './sync-item.component.html',
  styleUrls: ['./sync-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FormatDatePipe,
    GeoIconComponent,
    IonIcon,
    IonItem,
    IonLabel,
    IonSpinner,
    NgIf,
    RouterLink,
    TranslatePipe,
    IonRouterLink,
  ],
})
export class SyncItemComponent {
  @Input() draft: RegistrationDraft;

  get loading() {
    return (
      (this.draft.syncStatus === SyncStatus.Sync || this.draft.syncStatus === SyncStatus.SyncAndIgnoreVersionCheck) &&
      this.draft.error == null
    );
  }

  get isDraft() {
    return this.draft.syncStatus === SyncStatus.Draft;
  }

  get locationName(): string {
    return (
      this.draft.registration.ObsLocation?.LocationName ||
      this.draft.registration.ObsLocation?.LocationDescription ||
      (this.draft.registration.ObsLocation as ObsLocationViewModel)?.Title ||
      ''
    );
  }

  getErrorIconName(draftError: RegistrationDraftError): string {
    switch (draftError?.code) {
      case RegistrationDraftErrorCode.NoNetworkOrTimedOut:
        return 'cloud-offline-outline';
      case RegistrationDraftErrorCode.ConflictError:
        return 'shuffle-outline';
    }
    return 'warning'; // default error icon
  }

  constructor() {
    addIcons({ calendar });
  }
}
