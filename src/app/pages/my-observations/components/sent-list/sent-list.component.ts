import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map, scan, startWith, takeUntil, tap } from 'rxjs/operators';
import { SearchCriteria } from 'src/app/core/models/search-criteria';
import { AddUpdateDeleteRegistrationService } from 'src/app/core/services/add-update-delete-registration/add-update-delete-registration.service';
import { NetworkStatusService } from 'src/app/core/services/network-status/network-status.service';
import {
  PagedSearchResult,
  SearchRegistrationService,
} from 'src/app/core/services/search-registration/search-registration.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { getUniqueRegistrations } from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'SentListComponent';

@Component({
  selector: 'app-sent-list',
  templateUrl: './sent-list.component.html',
  styleUrls: ['./sent-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentListComponent implements OnDestroy {
  @Output() isEmpty = new EventEmitter<boolean>();

  myRegistrations$: Observable<RegistrationViewModel[]>;
  searchResult: PagedSearchResult<RegistrationViewModel>;
  isOffline$: Observable<boolean>;
  shouldDisableScroller$: Observable<boolean>;
  private ngDestroy$ = new Subject<void>();

  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;

  get maxCount() {
    return PagedSearchResult.MAX_ITEMS;
  }

  constructor(
    addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
    private searchRegistrationService: SearchRegistrationService,
    private userSettingService: UserSettingService,
    private logger: LoggingService,
    networkStatusService: NetworkStatusService
  ) {
    this.isOffline$ = networkStatusService.connected$.pipe(
      takeUntil(this.ngDestroy$),
      map((connected) => !connected)
    );

    const searchCriteria$: Observable<SearchCriteria> = this.userSettingService.language$.pipe(
      takeUntil(this.ngDestroy$),
      map((langKey) => {
        return {
          OrderBy: 'DtChangeTime',
          LangKey: langKey,
        };
      })
    );
    this.searchResult = this.searchRegistrationService.searchMyRegistrations(searchCriteria$);

    const submittedRegistrations$: Observable<RegistrationViewModel[]> =
      addUpdateDeleteRegistrationService.changedRegistrations$.pipe(
        map((changedReg) => changedReg.reg),
        scan((allChanged, changedReg) => [changedReg, ...allChanged], [])
      );

    const deletedRegIds$: Observable<number[]> = addUpdateDeleteRegistrationService.deletedRegistrationIds$.pipe(
      scan((acc, value) => [value, ...acc], [])
    );

    //TODO: Håndtere at søket feiler, nå vises skjelettet
    this.myRegistrations$ = combineLatest([
      this.searchResult.registrations$,
      submittedRegistrations$.pipe(startWith([])),
      deletedRegIds$.pipe(startWith([])),
    ]).pipe(
      map(([registrations, submittedRegistrations, deletedRegIds]) => {
        const changedRegIds = submittedRegistrations.map((reg: RegistrationViewModel) => reg.RegId).join(',');
        this.logger.debug(
          `MyRegistrations refreshed. ${submittedRegistrations.length} submitted: ${changedRegIds}, ${
            deletedRegIds.length
          } deleted: ${deletedRegIds.join(',')}`,
          DEBUG_TAG,
          registrations
        );
        if (submittedRegistrations.length) {
          registrations = getUniqueRegistrations([...submittedRegistrations, ...registrations]);
        }
        if (deletedRegIds.length) {
          registrations = registrations.filter((reg) => !deletedRegIds.includes(reg.RegId));
        }
        if (submittedRegistrations.length || deletedRegIds.length) {
          this.logger.debug('Registrations after filtering', DEBUG_TAG, registrations);
        }
        return registrations;
      }),
      catchError((error) => {
        this.logger.error(error, DEBUG_TAG, error.message);
        return of([]);
      }),
      tap(() => this.scroll && this.scroll.complete())
    );

    this.shouldDisableScroller$ = combineLatest([
      this.searchResult.allFetchedForCriteria$,
      this.searchResult.maxItemsFetched$,
    ]).pipe(
      takeUntil(this.ngDestroy$),
      map(([allFetched, maxReached]) => allFetched || maxReached),
      distinctUntilChanged()
    );
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  refresh(): void {
    this.logger.debug('Refresh triggered', DEBUG_TAG);
    this.searchResult.resetPaging();
  }

  loadNextPage(): void {
    this.searchResult.increasePage();
  }

  trackByIdFunc(_: unknown, obs: RegistrationViewModel): string {
    return obs ? obs.RegId.toString() : undefined;
  }
}
