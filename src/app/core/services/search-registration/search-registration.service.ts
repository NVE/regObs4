import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  concatMap,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  finalize,
  map,
  Observable,
  of,
  ReplaySubject,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
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
import { SearchRegistrationsWithAttachments } from 'src/app/modules/common-regobs-api/models/search-registrations-with-attachments';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

export class SearchResult<TViewModel> {
  static DEBUG_TAG = 'SearchResult';
  readonly registrations$: Observable<TViewModel[]>;
  private forceUpdate = new Subject<void>();
  private isFetching = new BehaviorSubject<boolean>(false);
  isFetching$ = this.isFetching.asObservable();

  constructor(
    searchCriteria$: Observable<SearchCriteria>,
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>
  ) {
    this.registrations$ = this.createRegistrationsObservable(searchCriteria$, fetchFunc);
  }

  update() {
    this.forceUpdate.next();
  }

  protected createRegistrationsObservable(
    searchCriteria$: Observable<SearchCriteria>,
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>
  ) {
    return combineLatest([searchCriteria$, this.forceUpdate.pipe(startWith(true))]).pipe(
      map(([searchCriteria]) => searchCriteria),
      // We are fetching new data, so set isFetching to true
      tap(() => this.isFetching.next(true)),
      switchMap((criteria) => fetchFunc(criteria as SearchCriteriaRequestDto)),
      tap(() => this.isFetching.next(false)),
      finalize(() => {
        this.isFetching.next(false); // ensures that we reset fetching flag on error
      }),
      shareReplay(1)
    );
  }
}

export class PagedSearchResult<TViewModel extends HasRegId> {
  static DEBUG_TAG = 'PagedSearchResult';
  static PAGE_SIZE = 10;
  static MAX_ITEMS = 100;
  readonly registrations$: Observable<TViewModel[]>;
  private pageInfo = new BehaviorSubject<{ offset: number; items: number }>({
    offset: 0,
    items: PagedSearchResult.PAGE_SIZE,
  });
  private allFetchedForCriteria = new BehaviorSubject<boolean>(false);
  allFetchedForCriteria$ = this.allFetchedForCriteria.pipe(distinctUntilChanged());
  private maxItemsFetched = new BehaviorSubject<boolean>(false);
  maxItemsFetched$ = this.maxItemsFetched.pipe(distinctUntilChanged());
  private isFetching = new BehaviorSubject<boolean>(false);
  isFetching$ = this.isFetching.asObservable();
  private forceUpdate = new Subject<void>();

  private countError = new ReplaySubject<Error>(1);
  private searchError = new ReplaySubject<Error>(1);
  error$: Observable<{ hasError: boolean; searchError?: Error; countError?: Error }> = combineLatest([
    this.countError.pipe(startWith(null)),
    this.searchError.pipe(startWith(null)),
  ]).pipe(
    map(([countError, searchError]) => {
      if (searchError || countError) {
        return { hasError: true, searchError, countError };
      }
      return { hasError: false };
    }),
    distinctUntilKeyChanged('hasError')
  );

  private lastFetched = new Subject<Date>();
  lastFetched$ = combineLatest([this.error$, this.lastFetched]).pipe(
    map(([{ hasError }, lastFetched]) => (hasError ? null : lastFetched))
  );

  constructor(
    searchCriteria$: Observable<SearchCriteria>,
    // Not sure what is best here, provide SearchService to this class, or provide the flexibility to create these
    // functions outside
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>,
    countFunc: (criteria: SearchCriteriaRequestDto) => Observable<number>
  ) {
    this.registrations$ = combineLatest([searchCriteria$, this.forceUpdate.pipe(startWith(null))]).pipe(
      // For every new search criteria, create a paged search and check what the total count is
      tap(() => this.isFetching.next(true)),
      switchMap(([searchCriteria]) =>
        combineLatest([
          this.createPagedSearch(searchCriteria, fetchFunc),
          countFunc(searchCriteria as SearchCriteriaRequestDto).pipe(
            tap(() => this.countError.next(null)),
            catchError((err) => {
              this.countError.next(err);
              return of(0);
            })
          ),
        ])
      ),
      // Save search state
      tap(([registrations, totalCount]) => {
        this.allFetchedForCriteria.next(registrations.length >= totalCount);
        this.maxItemsFetched.next(registrations.length >= PagedSearchResult.MAX_ITEMS);
      }),
      // Map to registrations
      map(([registrations]) => registrations),
      tap(() => this.isFetching.next(false)),
      finalize(() => {
        this.isFetching.next(false); // ensures that we reset fetching flag on error
      }),
      // Expensive observable, so share results if many subscribers
      shareReplay(1)
    );
  }

  update() {
    this.forceUpdate.next();
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
    this.resetPaging(); // Reset state when a new search is created

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
          tap(() => this.lastFetched.next(new Date())),
          tap(() => this.searchError.next(null)),
          catchError((err) => {
            this.searchError.next(err);
            return of([]);
          }),
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
   *  Search my registrations with paging
   */
  searchMyRegistrations(searchCriteria$: Observable<SearchCriteria>): PagedSearchResult<RegistrationViewModel> {
    return new PagedSearchResult<RegistrationViewModel>(
      searchCriteria$,
      this.searchService.SearchPostSearchMyRegistrations.bind(this.searchService),
      (searchCriteria) =>
        this.searchService.SearchCountMyRegistrations(searchCriteria).pipe(map((result) => result.TotalMatches))
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

  searchAttachments(
    searchCriteria$: Observable<SearchCriteria>
  ): PagedSearchResult<SearchRegistrationsWithAttachments> {
    return new PagedSearchResult<SearchRegistrationsWithAttachments>(
      searchCriteria$,
      this.searchService.SearchAttachments.bind(this.searchService),
      (searchCriteria) =>
        //implement count function for attachments
        this.searchService.SearchCount(searchCriteria).pipe(map((result) => result.TotalMatches))
    );
  }
}
