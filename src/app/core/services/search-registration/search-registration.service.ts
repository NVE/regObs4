import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  concatMap, distinctUntilChanged, map, Observable, scan, shareReplay,
  startWith,
  Subject,
  switchMap, tap
} from 'rxjs';
import { SearchCriteria } from 'src/app/core/models/search-criteria';
import {
  AtAGlanceViewModel,
  RegistrationViewModel,
  SearchCriteriaRequestDto,
  SearchService
} from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

export class SearchResult<TViewModel> {
  static DEBUG_TAG = 'SearchResult';
  readonly registrations$: Observable<TViewModel[]>;
  private forceUpdate = new Subject<void>();

  constructor(
    searchCriteria$: Observable<SearchCriteria>,
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>,
    private searchRegistrationService: SearchRegistrationService,
    private logger: LoggingService
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
    return combineLatest([
      searchCriteria$,
      this.forceUpdate.pipe(startWith(true))
    ]).pipe(
      tap(() => {
        this.searchRegistrationService.setFetchingStatus(true);
      }),
      map(([searchCriteria,]) => searchCriteria),
      switchMap((criteria) => fetchFunc(criteria as SearchCriteriaRequestDto)),
      tap(() => {
        this.searchRegistrationService.updateLastFetched();
        this.searchRegistrationService.setFetchingStatus(false);
      }),
      shareReplay(1)
    );
  }
}

export class PagedSearchResult<TViewModel> {
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

  constructor(
    searchCriteria$: Observable<SearchCriteria>,
    // Not sure what is best here, provide SearchService to this class, or provide the flexibility to create these
    // functions outside
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>,
    countFunc: (criteria: SearchCriteriaRequestDto) => Observable<number>,
    private searchRegistrationService: SearchRegistrationService,
    private logger: LoggingService
  ) {
    this.registrations$ = searchCriteria$.pipe(
      // Every time we get new search criteria, reset paging and search state
      tap(() => {
        this.resetPaging();
        this.allFetchedForCriteria.next(false);
        this.maxItemsFetched.next(false);
      }),
      // For every new search criteria, create a paged search and check what the total count is
      switchMap((searchCriteria) =>
        combineLatest([
          this.createPagedSearch(searchCriteria$, fetchFunc),
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
    );
  }

  // Do we need to handle this ??
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
  }

  protected createPagedSearch(
    searchCriteria$: Observable<SearchCriteria>,
    fetchFunc: (criteria: SearchCriteriaRequestDto) => Observable<TViewModel[]>
  ): Observable<TViewModel[]> {
    return combineLatest([
      searchCriteria$,
      this.pageInfo
      // TODO: Oppfrisk-knappen virket ikke med dette:
      // this.pageInfo.pipe(distinctUntilChanged((prev, curr) => prev.items === curr.items && prev.offset === curr.offset))
    ]).pipe(
      tap(() => {
        this.searchRegistrationService.setFetchingStatus(true);
      }),
      // Add page info to search criteria
      map(([searchCriteria, pageInfo]) => ({
        ...searchCriteria,
        Offset: pageInfo.offset,
        NumberOfRecords: pageInfo.items,
      })),
      // Search for matching registrations.
      // Use concatMap here and not switchMap as we want to include all pages if increasePage() is called before
      // the current search is finished.
      concatMap(searchCriteria => fetchFunc(searchCriteria as SearchCriteriaRequestDto).pipe(
        // Include search criteria with search results so that we know which search criteria the results belong to
        map(result => ({ searchCriteria, result }))
      )),
      // Accumulate results if offset > 0
      // TODO: Filter out duplicates
      scan(
        (accumulated, { searchCriteria, result }) => searchCriteria.Offset > 0 ? [...accumulated, ...result] : result,
        []  // Start with an empty array
      ),
      tap(() => {
        this.searchRegistrationService.updateLastFetched();
        this.searchRegistrationService.setFetchingStatus(false);
      })
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

  private searchRequested = new Subject<void>();
  private lastFetched = new Subject<Date>()
  private isFetchingData = new BehaviorSubject(false);
  readonly searchRequested$ = this.searchRequested.asObservable()
  readonly lastFetched$ = this.lastFetched.asObservable()
  readonly isFetchingData$ = this.isFetchingData.asObservable()

  constructor(private searchService: SearchService, private logger: LoggingService) {
  }

  /**
   * Normal search.
   * You should apply a row limit to the search criteria
   * if you don't have control over how many rows you will get.
   */
  search(searchCriteria$: Observable<SearchCriteria>): SearchResult<RegistrationViewModel> {
    return new SearchResult<RegistrationViewModel>(
      searchCriteria$,
      this.searchService.SearchSearch.bind(this.searchService),
      this,
      this.logger
    );
  }

  /**
   * Normal search with paging
   */
  pagedSearch(searchCriteria$: Observable<SearchCriteria>): PagedSearchResult<RegistrationViewModel> {
    return new PagedSearchResult<RegistrationViewModel>(
      searchCriteria$,
      this.searchService.SearchSearch.bind(this.searchService),
      searchCriteria => this.searchService.SearchCount(searchCriteria).pipe(map(result => result.TotalMatches)),
      this,
      this.logger
    );
  }

  /**
   * A fast search. Return only a summary of each observation.
   */
  atAGlance(searchCriteria$: Observable<SearchCriteria>): SearchResult<AtAGlanceViewModel> {
    return new SearchResult<AtAGlanceViewModel>(
      searchCriteria$.pipe(map((c) => ({ ...c, NumberOfRecords: 100000 }))),
      this.searchService.SearchAtAGlance.bind(this.searchService),
      this,
      this.logger
    );
  }

  /**
   * Use this to trigger search (again) with current search criteria
   */
  requestSearch() {
    this.searchRequested.next();
  }

  setFetchingStatus(fetching: boolean) {
    this.isFetchingData.next(fetching);
  }

  updateLastFetched() {
    this.lastFetched.next(new Date());
  }
}
