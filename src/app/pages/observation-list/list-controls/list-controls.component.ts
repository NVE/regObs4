import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { IonCheckbox, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { map } from 'rxjs';
import {
  SearchCriteriaOrderBy,
  SearchCriteriaService,
} from 'src/app/core/services/search-criteria/search-criteria.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MapService } from 'src/app/modules/map/services/map/map.service';

type Page = 'observations' | 'images';

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
  private router = inject(Router);
  private mapService = inject(MapService);

  pageType = input<Page>('observations');

  private mapExtentFilterActive = signal(true); // TODO! toSignal(this.searchCriteria.useMapExtent$);
  mapExtentFilterDisabled = toSignal(this.mapService.mapView$.pipe(map((v) => v == null)), { initialValue: false });
  mapExtentFilterValue = computed(() => this.mapExtentFilterActive() && !this.mapExtentFilterDisabled());

  orderBy = this.searchCriteria.orderBy;

  toggleExtentFilter() {
    const isActive = !this.mapExtentFilterActive();
    this.searchCriteria.setExtentFilterActive(isActive);
  }

  navigate(page: Page) {
    this.router.navigate(['search', page === 'observations' ? 'list' : 'pictures']);
  }

  setOrderBy(orderBy: SearchCriteriaOrderBy) {
    this.searchCriteria.orderBy.set(orderBy);
  }
}
