import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import { AvalancheEvalProblem2ViewModel } from 'src/app/modules/common-regobs-api';
import { RegistrationHeaderComponent } from '../../registration-header/registration-header.component';
import { AvalancheProblemViewComponent } from './avalanche-problem-view.component';

/**
 * Brukes i observasjonskort for å vise en liste av skredproblemer
 */
@Component({
  selector: 'app-avalanche-problems-view',
  imports: [TranslatePipe, RegistrationHeaderComponent, AvalancheProblemViewComponent],
  template: `
    <app-registration-header>{{ 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE' | translate }}</app-registration-header>
    @for (singleProblem of data(); track $index) {
      <app-avalanche-problem-view [data]="singleProblem"></app-avalanche-problem-view>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbalancheProblemsViewComponent {
  readonly data = input.required<AvalancheEvalProblem2ViewModel[]>();
  count = computed(() => this.data().length);
}
