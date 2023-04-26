import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable, combineLatest, distinctUntilChanged, map, tap } from 'rxjs';
import { PagedSearchResult } from 'src/app/core/services/search-registration/search-registration.service';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { UpdateObservationsService } from 'src/app/modules/side-menu/components/update-observations/update-observations.service';

/**
 * View observation cards in a list
 */
@Component({
  selector: 'app-observation-list-view',
  templateUrl: './observation-list-view.component.html',
  styleUrls: ['./observation-list-view.component.scss'],
})
export class ObservationListViewComponent implements OnInit {
  @Input() searchResult: PagedSearchResult<RegistrationViewModel>;

  isFetchingObservations$: Observable<boolean>;
  registrations$: Observable<RegistrationViewModel[]>;
  shouldDisableScroller$: Observable<boolean>;

  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;

  get maxCount() {
    return PagedSearchResult.MAX_ITEMS;
  }

  constructor(private updateObservationsService: UpdateObservationsService) {}
  ngOnInit() {
    this.isFetchingObservations$ = this.searchResult.isFetching$;
    this.registrations$ = this.searchResult.registrations$.pipe(tap(() => this.scroll && this.scroll.complete()));

    this.shouldDisableScroller$ = combineLatest([
      this.searchResult.allFetchedForCriteria$,
      this.searchResult.maxItemsFetched$,
    ]).pipe(
      map(([allFetched, maxReached]) => allFetched || maxReached),
      distinctUntilChanged()
    );
    this.searchResult.registrations$.subscribe(() => this.updateObservationsService.setLastFetched(new Date()));
  }

  loadNextPage(): void {
    this.searchResult.increasePage();
  }

  trackById(_, obs: RegistrationViewModel) {
    return obs ? obs.RegId : undefined;
  }
}
