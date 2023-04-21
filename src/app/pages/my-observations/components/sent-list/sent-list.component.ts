import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, scan, startWith, takeUntil, tap } from 'rxjs/operators';
import { AddUpdateDeleteRegistrationService } from 'src/app/core/services/add-update-delete-registration/add-update-delete-registration.service';
import { NetworkStatusService } from 'src/app/core/services/network-status/network-status.service';
import {
  PagedSearchResult,
  SearchRegistrationService,
} from 'src/app/core/services/search-registration/search-registration.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { getUniqueRegistrations } from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationViewModel, SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api/models';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'SentListComponent';

@Component({
  selector: 'app-sent-list',
  templateUrl: './sent-list.component.html',
  styleUrls: ['./sent-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentListComponent implements OnInit, OnDestroy {
  @Output() isEmpty = new EventEmitter<boolean>();

  myRegistrations: RegistrationViewModel[];
  searchResult: PagedSearchResult<RegistrationViewModel>;
  isOffline$: Observable<boolean>;
  error$ = new BehaviorSubject(false);
  shouldDisableScroller$: Observable<boolean>;
  private ngDestroy$ = new Subject<void>();
  private submittedRegistrations$: Observable<RegistrationViewModel[]>;
  private deletedRegIds$: Observable<number[]>;
  private registrationsSubscription: Subscription;

  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;

  get maxCount() {
    return PagedSearchResult.MAX_ITEMS;
  }

  constructor(
    addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
    private searchRegistrationService: SearchRegistrationService,
    private userSettingService: UserSettingService,
    private logger: LoggingService,
    networkStatusService: NetworkStatusService,
    private cdr: ChangeDetectorRef
  ) {
    this.isOffline$ = networkStatusService.connected$.pipe(
      takeUntil(this.ngDestroy$),
      map((connected) => !connected)
    );

    this.submittedRegistrations$ = addUpdateDeleteRegistrationService.changedRegistrations$.pipe(
      map((changedReg) => changedReg.reg),
      scan((allChanged, changedReg) => [changedReg, ...allChanged], [])
    );

    this.deletedRegIds$ = addUpdateDeleteRegistrationService.deletedRegistrationIds$.pipe(
      scan((acc, value) => [value, ...acc], [])
    );
  }

  initSearch() {
    this.error$.next(false);

    if (this.registrationsSubscription != null) {
      this.registrationsSubscription.unsubscribe;
    }

    this.userSettingService.language$.pipe(takeUntil(this.ngDestroy$)).subscribe((langKey) => {
      const searchCriteria = new BehaviorSubject<SearchCriteriaRequestDto>({
        OrderBy: 'DtChangeTime',
        LangKey: langKey,
      });
      this.searchResult = this.searchRegistrationService.searchMyRegistrations(searchCriteria);
    });

    this.registrationsSubscription = combineLatest([
      this.searchResult.registrations$,
      this.submittedRegistrations$.pipe(startWith([])),
      this.deletedRegIds$.pipe(startWith([])),
    ])
      .pipe(
        map(([myRegistrations, submittedRegistrations, deletedRegIds]) => {
          return this.mergeRegistrations(myRegistrations, submittedRegistrations, deletedRegIds);
        }),
        tap(() => this.scroll && this.scroll.complete())
      )
      .subscribe({
        next: (myRegistrations) => {
          this.error$.next(false);
          this.myRegistrations = myRegistrations;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.myRegistrations = [];
          this.error$.next(true);
          this.cdr.detectChanges();
          this.logger.log('Error in search', err, LogLevel.Warning, DEBUG_TAG);
        },
      });

    this.shouldDisableScroller$ = combineLatest([
      this.searchResult.allFetchedForCriteria$,
      this.searchResult.maxItemsFetched$,
    ]).pipe(
      takeUntil(this.ngDestroy$),
      map(([allFetched, maxReached]) => allFetched || maxReached),
      distinctUntilChanged()
    );
  }

  ngOnInit() {
    this.initSearch();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  refresh(): void {
    this.logger.debug('Refresh triggered', DEBUG_TAG);
    this.initSearch();
    this.searchResult.resetPaging();
  }

  loadNextPage(): void {
    this.searchResult.increasePage();
  }

  trackByIdFunc(_: unknown, obs: RegistrationViewModel): string {
    return obs ? obs.RegId.toString() : undefined;
  }

  private mergeRegistrations(
    myRegistrations: RegistrationViewModel[],
    submittedRegistrations: RegistrationViewModel[],
    deletedRegIds: number[]
  ): RegistrationViewModel[] {
    const changedRegIds = submittedRegistrations.map((reg: RegistrationViewModel) => reg.RegId).join(',');
    this.logger.debug(
      `MyRegistrations refreshed. ${submittedRegistrations.length} submitted: ${changedRegIds}, ${
        deletedRegIds.length
      } deleted: ${deletedRegIds.join(',')}`,
      DEBUG_TAG,
      myRegistrations
    );
    if (submittedRegistrations.length) {
      myRegistrations = getUniqueRegistrations([...submittedRegistrations, ...myRegistrations]);
    }
    if (deletedRegIds.length) {
      myRegistrations = myRegistrations.filter((reg) => !deletedRegIds.includes(reg.RegId));
    }
    if (submittedRegistrations.length || deletedRegIds.length) {
      this.logger.debug('Registrations after filtering', DEBUG_TAG, myRegistrations);
    }
    return myRegistrations;
  }
}
