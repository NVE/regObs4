import { IonIcon, IonSpinner, IonItem, IonLabel, IonRouterLink } from '@ionic/angular/standalone';
import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { SyncStatus } from '../../../../modules/common-registration/registration.models';
import {
  RegistrationDraft,
  RegistrationDraftError,
  RegistrationDraftErrorCode,
} from '../../../../core/services/draft/draft-model';
import { ObsLocationViewModel } from '../../../../modules/common-regobs-api';
import { RouterLink } from '@angular/router';
import { GeoIconComponent } from '../../../../modules/shared/components/geo-icon/geo-icon.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FormatDatePipe } from '../../../../modules/shared/pipes/format-date/format-date.pipe';
import { addIcons } from 'ionicons';
import { calendar, warning, shuffleOutline, cloudOfflineOutline } from 'ionicons/icons';

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
  draft = input.required<RegistrationDraft>();

  isLoading = computed(() => {
    const { syncStatus, error } = this.draft();
    return (syncStatus === SyncStatus.Sync || syncStatus === SyncStatus.SyncAndIgnoreVersionCheck) && error == null;
  });

  isDraft = computed(() => this.draft().syncStatus === SyncStatus.Draft);

  locationName = computed(() => {
    const { ObsLocation } = this.draft().registration;
    return (
      ObsLocation?.LocationName ||
      ObsLocation?.LocationDescription ||
      (ObsLocation as ObsLocationViewModel)?.Title ||
      ''
    );
  });

  getErrorIconName(draftError?: RegistrationDraftError): string {
    switch (draftError?.code) {
      case RegistrationDraftErrorCode.NoNetworkOrTimedOut:
        return 'cloud-offline-outline';
      case RegistrationDraftErrorCode.ConflictError:
        return 'shuffle-outline';
    }
    return 'warning'; // default error icon
  }

  constructor() {
    addIcons({ calendar, warning, shuffleOutline, cloudOfflineOutline });
  }
}
