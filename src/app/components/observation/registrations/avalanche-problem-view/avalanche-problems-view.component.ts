import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { AvalancheEvalProblem2ViewModel } from 'src/app/modules/common-regobs-api';
import { AvalancheProblemViewComponent } from './avalanche-problem-view.component';

/**
 * Brukes i observasjonskort for å vise en liste av skredproblemer
 */
@Component({
  selector: 'app-avalanche-problems-view',
  imports: [AvalancheProblemViewComponent],
  template: `
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
