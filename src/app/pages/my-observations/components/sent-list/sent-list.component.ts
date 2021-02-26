import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  NgZone,
  OnInit,
  Output
} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { combineLatest, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  pairwise,
  switchMap,
  take,
} from 'rxjs/operators';
import {
  enterZone,
  toPromiseWithCancel
} from 'src/app/core/helpers/observable-helper';
import { ObservationService } from 'src/app/core/services/observation/observation.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { RegistrationService } from 'src/app/modules/registration/services/registration.service';
import { RegistrationViewModel } from '@varsom-regobs-common/regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { settings } from 'src/settings';

const PAGE_SIZE = 10;
const MAX_REGISTRATIONS_COUNT = 100;

@Component({
  selector: 'app-sent-list',
  templateUrl: './sent-list.component.html',
  styleUrls: ['./sent-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentListComponent implements OnInit {
  loadedRegistrations: RegistrationViewModel[] = [];
  loaded = false;
  refreshFunc = this.refresh.bind(this);
  @Output() isEmpty = new EventEmitter<boolean>();
  loadingMore = false;
  pageIndex: number;
  myObservationsUrl$: Observable<string>;

  constructor(
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private registrationService: RegistrationService,
    private regobsAuthService: RegobsAuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private loggingService: LoggingService,
    private ngZone: NgZone
  ) {
    this.myObservationsUrl$ = this.createMyObservationsUrl$();
  }

  async ngOnInit(): Promise<void> {
    this.initRegistrationSubscription();
    this.registrationService.registrations$
      .pipe(
        map((regs) => regs.length),
        pairwise(),
        map(([lastCount, newCount]) => newCount - lastCount),
        distinctUntilChanged(),
        filter((diff) => diff < 0), //only fetch observations when num drafts decrease
        debounceTime(500) //wait a bit in case multiple observations were shipped
      )
      .subscribe(() => this.initRegistrationSubscription());
  }

  async refresh(cancelPromise: Promise<void>): Promise<void> {
    await this.registrationService.syncRegistrations(cancelPromise);
    await this.initRegistrationSubscription(cancelPromise);
  }

  private async initRegistrationSubscription(
    cancel?: Promise<void>
  ): Promise<void> {
    this.loaded = false;
    this.changeDetectorRef.detectChanges();
    this.pageIndex = 0;
    try {
      const result = await toPromiseWithCancel(
        this.getMyRegistrations$(0),
        cancel,
        20000
      );
      this.loadedRegistrations = result;
    } catch (error) {
      this.loggingService.debug(
        'Could not load my registrations',
        'SentListComponent.initRegistrationSubscription()',
        error
      );
    } finally {
      this.loaded = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  private getMyRegistrations$(
    pageNumber: number
  ): Observable<RegistrationViewModel[]> {
    return combineLatest([
      this.userSettingService.appModeAndLanguage$,
      this.regobsAuthService.loggedInUser$
    ]).pipe(
      switchMap(([[appMode, langKey], loggedInUser]) => {
        if (loggedInUser.isLoggedIn) {
          return this.observationService.getObservationsForCurrentUser(
            appMode,
            loggedInUser.user,
            langKey,
            pageNumber,
            PAGE_SIZE
          );
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
        this.loadedRegistrations = this.loadedRegistrations.concat(nextPage);
        this.pageIndex += 1;
        const target: IonInfiniteScroll = (event.target as unknown) as IonInfiniteScroll;
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
      map(
        (userSettings) => settings.services.regObs.webUrl[userSettings.appMode]
      ),
      distinctUntilChanged(),
      enterZone(this.ngZone)
    );
  }
}
