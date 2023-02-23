import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  NgZone,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import {
  defaultIfEmpty,
  distinctUntilChanged,
  finalize,
  map,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { enterZone, toPromiseWithCancel } from 'src/app/core/helpers/observable-helper';
import { SearchCriteria } from 'src/app/core/models/search-criteria';
import { AddUpdateDeleteRegistrationService } from 'src/app/core/services/add-update-delete-registration/add-update-delete-registration.service';
import { NetworkStatusService } from 'src/app/core/services/network-status/network-status.service';
import { ObservationService } from 'src/app/core/services/observation/observation.service';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import {
  PagedSearchResult,
  SearchRegistrationService,
} from 'src/app/core/services/search-registration/search-registration.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { getUniqueRegistrations } from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationViewModel, SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { settings } from 'src/settings';

const DEBUG_TAG = 'SentListComponent';
const PAGE_SIZE = 10;
const MAX_REGISTRATIONS_COUNT = 100;

@Component({
  selector: 'app-sent-list',
  templateUrl: './sent-list.component.html',
  styleUrls: ['./sent-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // A possible solution to not having custom methods for getting a users own observations.
  // Not sure if this works, but useFactory can be used as a backup, as a new instance is guaranteed.
  // providers: [
  //   { provide: SearchCriteriaService: useClass: UserPageSearchCriteriaService },
  //   { provide: ObservationService, useClass: ObservationService }
  // ]
})
export class SentListComponent implements OnDestroy {
  loadedRegistrations: RegistrationViewModel[] = [];
  myRegistrations$: Observable<RegistrationViewModel[]>;
  searchResult: PagedSearchResult<RegistrationViewModel>;
  loaded = false;
  refreshFunc = this.refresh.bind(this);
  @Output() isEmpty = new EventEmitter<boolean>();
  loadingMore = false;
  pageIndex: number;
  myObservationsUrl$: Observable<string>;
  isOffline$: Observable<boolean>;
  private ngDestroy$ = new Subject<void>();
  shouldDisableScroller$: Observable<boolean>;

  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;

  constructor(
    addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
    private searchRegistrationService: SearchRegistrationService,
    private searchCriteriaService: SearchCriteriaService,
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private regobsAuthService: RegobsAuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private loggingService: LoggingService,
    private ngZone: NgZone,
    networkStatusService: NetworkStatusService
  ) {
    this.isOffline$ = networkStatusService.connected$.pipe(
      takeUntil(this.ngDestroy$),
      map((connected) => !connected)
    );
    this.myObservationsUrl$ = this.createMyObservationsUrl$();
    this.userSettingService.language$.subscribe((langKey) => {
      const search = new BehaviorSubject<SearchCriteriaRequestDto>({ OrderBy: 'DtChangeTime', LangKey: langKey });
      this.searchResult = this.searchRegistrationService.searchMyRegistrations(search);
    });
    this.myRegistrations$ = combineLatest([
      this.searchResult.registrations$.pipe(tap(() => this.scroll && this.scroll.complete())),
      addUpdateDeleteRegistrationService.changedRegistrations$,
    ]).pipe(
      map(([myRegistrations, newRegistration]) => {
        if (!newRegistration) {
          return myRegistrations;
        } else {
          // Since this.loadedRegistrations can be modified by the draftToRegService subscription above as well,
          // add results to the end and filter unique observations in case the my-observations request returns after a
          // new registration has been added
          const regsWithoutNewRegistration = myRegistrations.filter((reg) => reg.RegId !== newRegistration.RegId);
          return [newRegistration, ...regsWithoutNewRegistration];
        }
      })
    );
    this.shouldDisableScroller$ = combineLatest([
      this.searchResult.allFetchedForCriteria$,
      this.searchResult.maxItemsFetched$,
    ]).pipe(
      map(([allFetched, maxReached]) => allFetched || maxReached),
      distinctUntilChanged()
    );
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  refresh(): void {
    this.loggingService.debug('Refresh', 'PagedSearchResult');
    this.searchResult.resetPaging();
  }

  loadNextPage(): void {
    this.searchResult.increasePage();
  }

  trackByIdFunc(_: unknown, obs: RegistrationViewModel): string {
    return obs ? obs.RegId.toString() : undefined;
  }

  get maxCount() {
    return PagedSearchResult.MAX_ITEMS;
  }

  private createMyObservationsUrl$(): Observable<string> {
    return this.userSettingService.userSetting$.pipe(
      map((userSettings) => settings.services.regObs.webUrl[userSettings.appMode]),
      distinctUntilChanged(),
      enterZone(this.ngZone)
    );
  }
}
