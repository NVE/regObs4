import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonCheckbox, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import {
  SearchCriteriaOrderBy,
  SearchCriteriaService,
} from 'src/app/core/services/search-criteria/search-criteria.service';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Kontrollene i toppen av listevisninga. Viser knapper for "Sortert etter oppdatert tid", osv.
 */
@Component({
  selector: 'app-list-controls',
  imports: [IonCheckbox, IonSelect, IonSelectOption, TranslatePipe],
  templateUrl: './list-controls.component.html',
  styleUrl: './list-controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListControlsComponent {
  private searchCriteria = inject(SearchCriteriaService);

  extentCheckboxValue = this.searchCriteria.isExtentCriteriaActive;
  extentCheckboxDisabled = this.searchCriteria.isExtentCriteriaDisabled;
  orderBy = this.searchCriteria.orderBy;

  toggleExtentFilter() {
    this.searchCriteria.isExtentCriteriaActive.update((isActive) => !isActive);
  }

  setOrderBy(orderBy: SearchCriteriaOrderBy) {
    this.searchCriteria.orderBy.set(orderBy);
  }
}
