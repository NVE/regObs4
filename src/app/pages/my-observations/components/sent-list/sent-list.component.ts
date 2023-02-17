import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, finalize, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { enterZone, toPromiseWithCancel } from 'src/app/core/helpers/observable-helper';
import { AddUpdateDeleteRegistrationService } from 'src/app/core/services/add-update-delete-registration/add-update-delete-registration.service';
import { NetworkStatusService } from 'src/app/core/services/network-status/network-status.service';
import { ObservationService } from 'src/app/core/services/observation/observation.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { getUniqueRegistrations } from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
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
  loaded = false;
  refreshFunc = this.refresh.bind(this);
  @Output() isEmpty = new EventEmitter<boolean>();
  loadingMore = false;
  pageIndex: number;
  myObservationsUrl$: Observable<string>;
  isOffline$: Observable<boolean>;
  private ngDestroy$ = new Subject<void>();

  constructor(
    addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
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

    addUpdateDeleteRegistrationService.changedRegistrations$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((newRegistration) => {
        const regsWithoutNewRegistration = this.loadedRegistrations.filter(
          (reg) => reg.RegId !== newRegistration.RegId
        );

        this.loadedRegistrations = [newRegistration, ...regsWithoutNewRegistration];

        this.isEmpty.next(false);
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  async refresh(cancelPromise?: Promise<void>): Promise<void> {
    await this.initRegistrationSubscription(cancelPromise);
  }

  private async initRegistrationSubscription(cancel?: Promise<void>): Promise<void> {
    this.loadedRegistrations = [];
    this.loaded = false;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = 0;
    try {
      const result = await toPromiseWithCancel(this.getMyRegistrations$(0), cancel, 20000);
      // Since this.loadedRegistrations can be modified by the draftToRegService subscription above as well,
      // add results to the end and filter unique observations in case the my-observations request returns after a
      // new registration has been added
      this.loadedRegistrations = getUniqueRegistrations([...this.loadedRegistrations, ...result]);
      this.isEmpty.emit(this.loadedRegistrations.length === 0);
    } catch (error) {
      this.loggingService.debug('Could not load my registrations', DEBUG_TAG, error);
    } finally {
      this.loaded = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  private getMyRegistrations$(pageNumber: number): Observable<RegistrationViewModel[]> {
    return combineLatest([this.userSettingService.language$, this.regobsAuthService.loggedInUser$]).pipe(
      switchMap(([langKey, loggedInUser]) => {
        if (loggedInUser.isLoggedIn) {
          return this.observationService.getObservationsForCurrentUser(langKey, pageNumber, PAGE_SIZE);
        }
        return of([]);
      }),
      take(1)
    );
  }

  loadNextPage(event: CustomEvent<RegistrationViewModel>): void {
    const currentLength = this.loadedRegistrations.length;
    const currentPageIndex = Math.floor(currentLength / PAGE_SIZE);
    this.loadingMore = true;
    this.getMyRegistrations$(currentPageIndex)
      .pipe(
        take(1),
        finalize(() => {
          this.loadingMore = false;
        })
      )
      .subscribe((nextPage) => {
        // Filter unique registrations as the paging indexes can be a bit off when a new registration has been
        // submitted after the first page has loaded
        this.loadedRegistrations = getUniqueRegistrations(this.loadedRegistrations.concat(nextPage));
        this.pageIndex += 1;
        const target: IonInfiniteScroll = event.target as unknown as IonInfiniteScroll;
        target.complete();
        if (nextPage.length < PAGE_SIZE || this.maxCountReached) {
          target.disabled = true; //we have reached the end, so no need to load more pages from now
        }
        this.changeDetectorRef.detectChanges();
      });
  }

  trackByIdFunc(_: unknown, obs: RegistrationViewModel): string {
    return obs ? obs.RegId.toString() : undefined;
  }

  get maxCountReached(): boolean {
    return this.loadedRegistrations.length >= MAX_REGISTRATIONS_COUNT;
  }

  get maxCount(): number {
    return MAX_REGISTRATIONS_COUNT;
  }

  private createMyObservationsUrl$(): Observable<string> {
    return this.userSettingService.userSetting$.pipe(
      map((userSettings) => settings.services.regObs.webUrl[userSettings.appMode]),
      distinctUntilChanged(),
      enterZone(this.ngZone)
    );
  }
}
