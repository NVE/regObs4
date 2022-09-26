import { combineLatest, map, Observable, ReplaySubject, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';
import { SearchCriteriaService } from '../search-criteria/search-criteria.service';
import { SearchResultWithLastUpdatedDate } from './web-api.service';

export abstract class BaseSearchRegistrationService<TViewModel> {
  // Contains filtered registrations. Should listen to searchCriteriaService.searchCriteria$
  // and emit a new list of registration when it updates.
  public readonly registrations$: Observable<TViewModel[]>;

  private readonly lastUpdated = new ReplaySubject<Date>();
  public readonly lastUpdated$: Observable<Date> = this.lastUpdated.asObservable();

  private forceUpdate = new Subject<void>();

  protected searchCriteriaService: SearchCriteriaService;

  constructor(
    searchCriteriaService: SearchCriteriaService,
  ) {
    this.searchCriteriaService = searchCriteriaService;
    this.registrations$ = this.createRegistrationsObservable();
  }

  update() {
    this.forceUpdate.next();
  }

  protected abstract search(criteria: SearchCriteriaRequestDto): Observable<SearchResultWithLastUpdatedDate<TViewModel>>

  protected createRegistrationsObservable(): Observable<TViewModel[]> {
    return combineLatest([
      this.searchCriteriaService.searchCriteria$,
      this.forceUpdate.pipe(startWith(true))
    ]).pipe(
      map(([searchCriteria,]) => searchCriteria),
      switchMap((criteria) => this.search(criteria as SearchCriteriaRequestDto)),
      tap(({ lastUpdatedDate }) => this.lastUpdated.next(lastUpdatedDate)),
      map(({ result }) => result),
      shareReplay(1)
    );
  }
}
