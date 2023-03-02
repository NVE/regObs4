import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { AddUpdateDeleteRegistrationService } from 'src/app/core/services/add-update-delete-registration/add-update-delete-registration.service';
import { NetworkStatusService } from 'src/app/core/services/network-status/network-status.service';
import {
  PagedSearchResult,
  SearchRegistrationService,
} from 'src/app/core/services/search-registration/search-registration.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { RegistrationViewModel, SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api/models';
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

  myRegistrations: RegistrationViewModel[];
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
    private loggingService: LoggingService,
    private regobsAuthService: RegobsAuthService,
    private cdr: ChangeDetectorRef,
    networkStatusService: NetworkStatusService
  ) {
    this.isOffline$ = networkStatusService.connected$.pipe(
      takeUntil(this.ngDestroy$),
      map((connected) => !connected)
    );

    addUpdateDeleteRegistrationService.changedRegistrations$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(({ reg: changedRegistration }) => {
        if (!this.myRegistrations) return;
        const regsWithoutNewRegistration = this.regsWithoutNewOrDeletedRegistration(changedRegistration.RegId);
        // Since this.myRegistrations can be modified by the draftToRegService subscription above as well,
        // add results to the end and filter unique observations in case the my-observations request returns after a
        // new registration has been added
        this.myRegistrations = [changedRegistration, ...regsWithoutNewRegistration];

        this.isEmpty.next(false);
        this.cdr.detectChanges();
      });

    addUpdateDeleteRegistrationService.deletedRegistrationIds$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((deletedRegistrationId) => {
        if (!this.myRegistrations) return;
        const regsWithoutDeletedRegistration = this.regsWithoutNewOrDeletedRegistration(deletedRegistrationId);
        // Since this.myRegistrations can be modified by the draftToRegService subscription above as well,
        // add results to the end and filter unique observations in case the my-observations request returns after a
        // new registration has been added
        this.myRegistrations = [...regsWithoutDeletedRegistration];

        this.isEmpty.next(false);
        this.cdr.detectChanges();
      });
  }

  private regsWithoutNewOrDeletedRegistration(registrationId: number): RegistrationViewModel[] {
    return this.myRegistrations.filter((reg) => reg.RegId !== registrationId);
  }

  private async initOnRefresh() {
    this.userSettingService.language$.pipe(takeUntil(this.ngDestroy$)).subscribe((langKey) => {
      const searchCriteria = new BehaviorSubject<SearchCriteriaRequestDto>({
        OrderBy: 'DtChangeTime',
        LangKey: langKey,
      });
      this.searchResult = this.searchRegistrationService.searchMyRegistrations(searchCriteria);
    });

    this.searchResult.registrations$
      .pipe(
        takeUntil(this.ngDestroy$),
        tap(() => this.scroll && this.scroll.complete())
      )
      .subscribe((myRegistrations) => {
        this.myRegistrations = myRegistrations;
        this.cdr.detectChanges();
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

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  refresh(): void {
    this.loggingService.debug('Refresh', DEBUG_TAG);
    this.initOnRefresh();
  }

  loadNextPage(): void {
    this.searchResult.increasePage();
  }

  trackByIdFunc(_: unknown, obs: RegistrationViewModel): string {
    return obs ? obs.RegId.toString() : undefined;
  }
}
