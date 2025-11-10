import { IonItem, IonCheckbox } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';

@Component({
  selector: 'app-slush-flow-filter',
  templateUrl: './slush-flow-filter.component.html',
  styleUrls: ['./slush-flow-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonCheckbox, IonItem],
})
export class SlushFlowFilterComponent {
  private searchCriteriaService = inject(SearchCriteriaService);
  label = input<string>('');

  isChecked = this.searchCriteriaService.slushFlow;

  setIsChecked(event: CustomEvent) {
    const checked = event.detail.checked;
    this.searchCriteriaService.setSlushFlow(checked);
  }
}
