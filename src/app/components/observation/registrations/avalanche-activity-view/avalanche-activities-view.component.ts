import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import { AvalancheActivityObs2ViewModel } from 'src/app/modules/common-regobs-api';
import { RegistrationHeaderComponent } from '../../registration-header/registration-header.component';
import { AvalancheActivityViewComponent } from './avalanche-activity-view.component';

/**
 * Brukes i observasjonskort for å vise en liste av registreringer av skredaktivitet
 */
@Component({
  selector: 'app-avalanche-activities-view',
  imports: [TranslatePipe, RegistrationHeaderComponent, AvalancheActivityViewComponent],
  template: `
    <app-registration-header>{{ 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE' | translate }}</app-registration-header>
    @for (activity of data(); track $index) {
      <app-avalanche-activity-view [data]="activity"></app-avalanche-activity-view>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvalancheActivitesViewComponent {
  readonly data = input.required<AvalancheActivityObs2ViewModel[]>();
  count = computed(() => this.data().length);
}
