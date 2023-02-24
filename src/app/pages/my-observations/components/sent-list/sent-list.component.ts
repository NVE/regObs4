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
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { enterZone } from 'src/app/core/helpers/observable-helper';
import { AddUpdateDeleteRegistrationService } from 'src/app/core/services/add-update-delete-registration/add-update-delete-registration.service';
import { NetworkStatusService } from 'src/app/core/services/network-status/network-status.service';
import {
  PagedSearchResult,
  SearchRegistrationService,
} from 'src/app/core/services/search-registration/search-registration.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { RegistrationViewModel, SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { settings } from 'src/settings';

const DEBUG_TAG = 'SentListComponent';

@Component({
  selector: 'app-sent-list',
  templateUrl: './sent-list.component.html',
  styleUrls: ['./sent-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentListComponent implements OnDestroy {
  @Output() isEmpty = new EventEmitter<boolean>();

  refreshFunc = this.refresh.bind(this);
  myRegistrations: RegistrationViewModel[];
  myObservationsUrl$: Observable<string>;
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
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    networkStatusService: NetworkStatusService
  ) {
    this.isOffline$ = networkStatusService.connected$.pipe(
      takeUntil(this.ngDestroy$),
      map((connected) => !connected)
    );

    this.myObservationsUrl$ = this.createMyObservationsUrl$();

    this.userSettingService.language$.subscribe((langKey) => {
      const searchCriteria = new BehaviorSubject<SearchCriteriaRequestDto>({
        OrderBy: 'DtChangeTime',
        LangKey: langKey,
      });
      this.searchResult = this.searchRegistrationService.searchMyRegistrations(searchCriteria);
    });

    this.searchResult.registrations$
      .pipe(tap(() => this.scroll && this.scroll.complete()))
      .subscribe((myRegistrations) => {
        this.myRegistrations = myRegistrations;
        this.cdr.detectChanges();
      });

    addUpdateDeleteRegistrationService.changedRegistrations$.subscribe((newRegistration) => {
      const regsWithoutNewRegistration = this.myRegistrations.filter((reg) => reg.RegId !== newRegistration.RegId);
      // Since this.myRegistrations can be modified by the draftToRegService subscription above as well,
      // add results to the end and filter unique observations in case the my-observations request returns after a
      // new registration has been added
      this.myRegistrations = [newRegistration, ...regsWithoutNewRegistration];

      this.isEmpty.next(false);
      this.cdr.detectChanges();
    });

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
    this.loggingService.debug('Refresh', DEBUG_TAG);
    this.searchResult.resetPaging();
  }

  loadNextPage(): void {
    this.searchResult.increasePage();
  }

  trackByIdFunc(_: unknown, obs: RegistrationViewModel): string {
    return obs ? obs.RegId.toString() : undefined;
  }

  private createMyObservationsUrl$(): Observable<string> {
    return this.userSettingService.userSetting$.pipe(
      map((userSettings) => settings.services.regObs.webUrl[userSettings.appMode]),
      distinctUntilChanged(),
      enterZone(this.ngZone)
    );
  }
}
