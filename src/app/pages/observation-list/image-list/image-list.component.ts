import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { tap, combineLatest, map } from 'rxjs';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { SearchRegistrationService } from 'src/app/core/services/search-registration/search-registration.service';
import { SearchRegistrationsWithAttachments } from 'src/app/modules/common-regobs-api/models/search-registrations-with-attachments';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

@Component({
  selector: 'app-image-list',
  imports: [
    IonContent,
    IonRefresher,
    IonRefresherContent,
    ErrorStateComponent,
    EmptyStateComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListComponent {
  private searchCriteriaService = inject(SearchCriteriaService);
  private searchRegistrations = inject(SearchRegistrationService);
  private infiniteScroll = viewChild(IonInfiniteScroll);
  private ionRefresher = viewChild(IonRefresher);

  private searchHandler = this.searchRegistrations.searchAttachments(this.searchCriteriaService.searchCriteria$);
  registrations = toSignal(
    this.searchHandler.registrations$.pipe(
      tap(() => {
        this.infiniteScroll()?.complete();
        this.ionRefresher()?.complete();
      })
    ),
    { initialValue: [] as SearchRegistrationsWithAttachments[] }
  );

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
