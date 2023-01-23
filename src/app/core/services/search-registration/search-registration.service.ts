import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { SearchCriteria } from 'src/app/core/models/search-criteria';
import { getUniqueRegistrations, HasRegId } from 'src/app/modules/common-registration/registration.helpers';
import {
  AtAGlanceViewModel,
  RegistrationViewModel,
  SearchCriteriaRequestDto,
  SearchService,
} from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

export class SearchResult<TViewModel> {
  static DEBUG_TAG = 'SearchResult';
  registrations = new Subject<TViewModel[]>();
  readonly registrations$ = this.registrations.asObservable();
  private forceUpdate = new Subject<void>();
  isStreamActive = new Subject<boolean>();
  isStreamActive$ = this.isStreamActive.asObservable();

  constructor(
    searchCriteria$: Observable<SearchCriteria>,
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>
  ) {
    this.createRegistrationsObservable(searchCriteria$, fetchFunc);
  }

  update() {
    this.forceUpdate.next();
  }

  protected createRegistrationsObservable(
    searchCriteria$: Observable<SearchCriteria>,
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>
  ) {
    const searchCriteriaActiveStream = this.isStreamActive$.pipe(
      filter((isActive) => isActive === true),
      switchMap(() =>
        searchCriteria$.pipe(
          takeUntil(this.isStreamActive),
          switchMap((searchCriteria) =>
            combineLatest([
              fetchFunc(searchCriteria as SearchCriteriaRequestDto),
              this.forceUpdate.pipe(startWith(true)),
            ])
          ),
          map(([registrations]) => registrations),
          shareReplay(1)
        )
      )
    );
    searchCriteriaActiveStream.subscribe((searchResult) => {
      this.registrations.next(searchResult);
    });
  }
}

export class PagedSearchResult<TViewModel extends HasRegId> {
  static DEBUG_TAG = 'PagedSearchResult';
  static PAGE_SIZE = 10;
  static MAX_ITEMS = 100;
  registrations = new Subject<TViewModel[]>();
  readonly registrations$ = this.registrations.asObservable();
  private pageInfo = new BehaviorSubject<{ offset: number; items: number }>({
    offset: 0,
    items: PagedSearchResult.PAGE_SIZE,
  });
  private allFetchedForCriteria = new BehaviorSubject<boolean>(false);
  allFetchedForCriteria$ = this.allFetchedForCriteria.pipe(distinctUntilChanged());
  private maxItemsFetched = new BehaviorSubject<boolean>(false);
  maxItemsFetched$ = this.maxItemsFetched.pipe(distinctUntilChanged());
  isStreamActive = new Subject();
  isStreamActive$ = this.isStreamActive.asObservable();

  constructor(
    searchCriteria$: Observable<SearchCriteria>,
    // Not sure what is best here, provide SearchService to this class, or provide the flexibility to create these
    // functions outside
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>,
    countFunc: (criteria: SearchCriteriaRequestDto) => Observable<number>
  ) {
    //since this method observes searchCriteria that can be updated from many different subscribers and on different tabs,
    //it will cause that the createPagedSearch will be called every time it happens and cause
    //unnecessary network traffic, therefore guardStream observable is stopping the subscription with isActiveStream subject
    //whenever specified Tab is left
    this.createRegistrationsObservable(searchCriteria$, fetchFunc, countFunc);
  }

  protected createRegistrationsObservable(
    searchCriteria$: Observable<SearchCriteria>,
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>,
    countFunc: (criteria: SearchCriteriaRequestDto) => Observable<number>
  ) {
    const searchCriteriaActiveStream = this.isStreamActive$.pipe(
      filter((isActive) => isActive === true),
      switchMap(() =>
        searchCriteria$.pipe(
          takeUntil(this.isStreamActive),
          switchMap((searchCriteria) =>
            combineLatest([
              this.createPagedSearch(searchCriteria, fetchFunc),
              countFunc(searchCriteria as SearchCriteriaRequestDto),
            ])
          ),
          // Save search state
          tap(([registrations, totalCount]) => {
            this.allFetchedForCriteria.next(registrations.length >= totalCount);
            this.maxItemsFetched.next(registrations.length >= PagedSearchResult.MAX_ITEMS);
          }),
          // Map to registrations
          map(([registrations]) => registrations),
          // Expensive observable, so share results if many subscribers
          shareReplay(1)
        )
      )
    );
    searchCriteriaActiveStream.subscribe((searchResult) => {
      this.registrations.next(searchResult);
    });
  }
  // Do we need to handle this ?? probably not - verify
  update() {
    const { offset: oldOffset, items: oldItems } = this.pageInfo.value;
    this.pageInfo.next({
      offset: 0,
      items: oldOffset * oldItems,
    });
  }

  increasePage() {
    const { offset, items } = this.pageInfo.value;
    this.pageInfo.next({ offset: offset + items, items: PagedSearchResult.PAGE_SIZE });
  }

  resetPaging() {
    this.pageInfo.next({ offset: 0, items: PagedSearchResult.PAGE_SIZE });
    this.allFetchedForCriteria.next(false);
    this.maxItemsFetched.next(false);
  }

  protected createPagedSearch(
    searchCriteria: SearchCriteria,
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>
  ): Observable<TViewModel[]> {
    //this.resetPaging(); // Reset state when a new search is created

    return this.pageInfo.pipe(
      // Add page info to search criteria
      map((pageInfo) => ({
        ...searchCriteria,
        Offset: pageInfo.offset,
        NumberOfRecords: pageInfo.items,
      })),
      // Search for matching registrations.
      // Use concatMap here and not switchMap as we want to include all pages if increasePage() is called before
      // the current search is finished.
      concatMap((searchCriteria) =>
        fetchFunc(searchCriteria as SearchCriteriaRequestDto).pipe(
          // Include search criteria with search results so that we know which search criteria the results belong to
          map((result) => ({ searchCriteria, result }))
        )
      ),
      // Accumulate results if offset > 0
      scan(
        (accumulated, { searchCriteria, result }) => (searchCriteria.Offset > 0 ? [...accumulated, ...result] : result),
        [] // Start with an empty array
      ),
      // Return unique registrations. If a new page result comes in after a registration has been submitted,
      // we would get duplicates
      map((regs) => getUniqueRegistrations(regs))
    );
  }
}

/**
 * Use this to search for observations.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchRegistrationService {
  constructor(private searchService: SearchService, private logger: LoggingService) {}

  /**
   * Normal search.
   * You should apply a row limit to the search criteria
   * if you don't have control over how many rows you will get.
   */
  search(searchCriteria$: Observable<SearchCriteria>): SearchResult<RegistrationViewModel> {
    return new SearchResult<RegistrationViewModel>(
      searchCriteria$,
      this.searchService.SearchSearch.bind(this.searchService)
    );
  }

  /**
   * Normal search with paging
   */
  pagedSearch(searchCriteria$: Observable<SearchCriteria>): PagedSearchResult<RegistrationViewModel> {
    return new PagedSearchResult<RegistrationViewModel>(
      searchCriteria$,
      this.searchService.SearchSearch.bind(this.searchService),
      (searchCriteria) => this.searchService.SearchCount(searchCriteria).pipe(map((result) => result.TotalMatches))
    );
  }

  /**
   * A fast search. Return only a summary of each observation.
   */
  atAGlance(searchCriteria$: Observable<SearchCriteria>): SearchResult<AtAGlanceViewModel> {
    return new SearchResult<AtAGlanceViewModel>(
      searchCriteria$.pipe(map((c) => ({ ...c, NumberOfRecords: 100000 }))),
      this.searchService.SearchAtAGlance.bind(this.searchService)
    );
  }
}
