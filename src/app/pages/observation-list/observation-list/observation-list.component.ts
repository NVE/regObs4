import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { combineLatest, map, tap } from 'rxjs';
import { ObservationComponent } from 'src/app/components/observation/observation/observation.component';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { SearchRegistrationService } from 'src/app/core/services/search-registration/search-registration.service';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { ListControlsComponent } from '../list-controls/list-controls.component';
import { ShowFilterCriteriaComponent } from 'src/app/modules/side-menu/components/show-filter-criteria/show-filter-criteria.component';
import { TranslatePipe } from '@ngx-translate/core';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

@Component({
  selector: 'app-observation-list',
  imports: [
    ObservationComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    ErrorStateComponent,
    EmptyStateComponent,
    ListControlsComponent,
    ShowFilterCriteriaComponent,
    TranslatePipe,
  ],
  templateUrl: './observation-list.component.html',
  styleUrl: './observation-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservationListComponent {
  private searchCriteriaService = inject(SearchCriteriaService);
  private searchRegistrations = inject(SearchRegistrationService);
  private infiniteScroll = viewChild(IonInfiniteScroll);
  private ionRefresher = viewChild(IonRefresher);
  isDesktop = inject(BreakpointService).isDesktop;

  private searchHandler = this.searchRegistrations.pagedSearch(this.searchCriteriaService.searchCriteria$);
  registrations = toSignal(
    this.searchHandler.registrations$.pipe(
      tap(() => {
        this.infiniteScroll()?.complete();
        this.ionRefresher()?.complete();
      })
    ),
    { initialValue: [] as RegistrationViewModel[] }
  );
  count = this.searchHandler.count.asReadonly();

  disableInfiniteScroll = toSignal(
    combineLatest([this.searchHandler.allFetchedForCriteria$, this.searchHandler.maxItemsFetched$]).pipe(
      map(([allFetched, maxReached]) => allFetched || maxReached)
    ),
    { initialValue: false }
  );

  isLoading = toSignal(this.searchHandler.isFetching$, { initialValue: false });
  maxItemsFetched = toSignal(this.searchHandler.maxItemsFetched$, { initialValue: false });
  error = toSignal(this.searchHandler.error$, { initialValue: { hasError: false } });

  loadNextPage() {
    this.searchHandler.increasePage();
  }

  refresh() {
    this.searchHandler.update();
  }
}
