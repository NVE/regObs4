import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { IonCheckbox, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { map } from 'rxjs';
import {
  SearchCriteriaOrderBy,
  SearchCriteriaService,
} from 'src/app/core/services/search-criteria/search-criteria.service';

type Page = 'observations' | 'images';

/**
 * Kontrollene i toppen av listevisninga. Viser knapper for "Sortert etter oppdatert tid", osv.
 */
@Component({
  selector: 'app-list-controls',
  imports: [IonCheckbox, IonSelect, IonSelectOption],
  templateUrl: './list-controls.component.html',
  styleUrl: './list-controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListControlsComponent {
  private searchCriteria = inject(SearchCriteriaService);
  private router = inject(Router);

  pageType = input<Page>('observations');

  mapExtentFilterActive = toSignal(this.searchCriteria.useMapExtent$);
  orderBy = toSignal(this.searchCriteria.searchCriteria$.pipe(map((x) => x.OrderBy as SearchCriteriaOrderBy)), {
    initialValue: 'DtChangeTime',
  });

  toggleExtentFilter() {
    const isActive = !this.mapExtentFilterActive();
    this.searchCriteria.setExtentFilterActive(isActive);
  }

  navigate(page: Page) {
    this.router.navigate(['search', page === 'observations' ? 'list' : 'pictures']);
  }

  setOrderBy(orderBy: SearchCriteriaOrderBy) {
    this.searchCriteria.setOrderBy(orderBy);
  }
}
