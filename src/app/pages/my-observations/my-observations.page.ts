import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { Subscription, combineLatest, Observable, of } from 'rxjs';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';
import { ObserverResponseDto, RegistrationViewModel } from '../../modules/regobs-api/models';
import { RegistrationService } from '../../modules/registration/services/registration.service';
import { map, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { IRegistration } from '../../modules/registration/models/registration.model';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { RegobsAuthService } from '../../modules/auth/services/regobs-auth.service';
import { AppMode } from '../../core/models/app-mode.enum';
import { LangKey } from '../../core/models/langKey';

interface MyVirtualScrollItem {
  type: 'draft' | 'sync' | 'sent';
  id: string;
  item: IRegistration | RegistrationViewModel;
}

const LIST_HEADERS = {
  'draft': { header: 'REGISTRATION.DRAFTS', subtitle: 'REGISTRATION.DRAFTS_DESCRIPTION' },
  'sync': { header: 'REGISTRATION.SAVED_ON_PHONE', subtitle: 'REGISTRATION.SAVED_DESCRIPTION' },
  'sent': { header: 'MY_OBSERVATIONS.MY_SENT_OBSERVATIONS', subtitle: 'MY_OBSERVATIONS.SENT_SUBTITLE' },
};

const DEBUG_TAG = 'MyObservationsPage';

const numberOfItemsToFetch = 100;

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
})
export class MyObservationsPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll, { static: true }) virtualScroll: IonVirtualScroll;
  private registrationSubscription: Subscription;
  loaded = false;
  disableInfiniteScroll = true;
  refreshFunc = this.refresh.bind(this);
  virtualItems: MyVirtualScrollItem[] = [];

  get showEmptyState() {
    return this.loaded && this.virtualItems.length === 0;
  }

  constructor(
    private observationService: ObservationService,
    private ngZone: NgZone,
    private userSettingService: UserSettingService,
    private registrationService: RegistrationService,
    private loggingService: LoggingService,
    private regobsAuthService: RegobsAuthService) {
  }

  async refresh(cancelPromise: Promise<any>) {
    await this.registrationService.syncRegistrations(cancelPromise);
    this.initRegistrationSubscription();
  }

  ngOnInit() {
    this.initRegistrationSubscription();
  }

  private initRegistrationSubscription() {
    this.registrationSubscription = this.getVirtualScrollItemsObservable().subscribe((val) => this.updateVirtualItems(val));
  }

  private updateVirtualItems(virtualItems: MyVirtualScrollItem[]) {
    const loadTimeout = virtualItems.length > 0 ? 2000 : 0;
    setTimeout(() => {
      this.ngZone.run(() => {
        this.loaded = true;
        if (virtualItems.length === numberOfItemsToFetch) {
          this.enableInfiniteScroll();
        }
      });
    }, loadTimeout);
    this.ngZone.run(() => {
      this.virtualItems = virtualItems;
    });
  }

  myHeaderFn(record: MyVirtualScrollItem, index: number, items: MyVirtualScrollItem[]) {
    if (index <= 0) {
      return LIST_HEADERS[record.type];
    } else {
      const prev = items[index - 1];
      if (prev.type !== record.type) {
        return LIST_HEADERS[record.type];
      }
    }
    return null;
  }

  private getVirtualScrollItemsObservable() {
    return this.getSyncItemsObservable().pipe(
      switchMap((syncItems) =>
        combineLatest([of(syncItems), this.getDraftObservable(), this.getMyRegistrationsObservable(0)])
      ), map(([syncIntems, drafts, registrations]) => [...syncIntems, ...drafts, ...registrations]));
  }

  private getMyRegistrationsObservable(pageNumber: number): Observable<MyVirtualScrollItem[]> {
    return combineLatest([this.userSettingService.appModeAndLanguage$, this.regobsAuthService.loggedInUser$])
      .pipe(switchMap(([[appMode, langKey], loggedInUser]) =>
        !loggedInUser.isLoggedIn ? of([]) :
          this.observationService.getObservationsForCurrentUser(appMode, loggedInUser.user, langKey, pageNumber, numberOfItemsToFetch).pipe(
            map((val) => val.map((item) => ({ type: <const>'sent', id: item.RegID.toString(), item }))))
      ));
  }
  private getDraftObservable(): Observable<MyVirtualScrollItem[]> {
    return this.registrationService.drafts$.pipe(
      map((val) => val.map((item) => ({ type: <const>'draft', id: item.id, item }))));
  }

  private getSyncItemsObservable(): Observable<MyVirtualScrollItem[]> {
    return this.registrationService.getRegistrationsToSync().pipe(
      distinctUntilChanged<IRegistration[], string>((a, b) => a.localeCompare(b) === 0,
        (keySelector) => this.getDistinctSyncItemList(keySelector)),
      map((val) => val.map((item) => ({ type: <const>'sync', id: item.id, item }))));
  }

  getDistinctRegistrationList(arr: RegistrationViewModel[]) {
    return arr ? arr.map((reg) => `${reg.RegID}-${reg.DtChangeTime}`).join('#') : '';
  }

  getDistinctSyncItemList(arr: IRegistration[]) {
    return arr ? arr.map((reg) => `${reg.id}`).join('#') : '';
  }

  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }

  async loadMoreData() {
    try {
      this.disableInfiniteScroll = true; // Disable while adding items to virtual scroll
      const currentLength = this.virtualItems.filter((x) => x.type === 'sent').length;
      const pageNumber = Math.floor(currentLength / numberOfItemsToFetch);
      const nextPage = await this.getMyRegistrationsObservable(pageNumber).pipe(take(1)).toPromise();
      const hasMoreDataToLoad = nextPage.length === numberOfItemsToFetch;
      this.setInfiniteScrollComplete();
      this.ngZone.run(() => {
        this.virtualItems.push(...nextPage);
        this.virtualScroll.checkEnd();
      });
      if (hasMoreDataToLoad) {
        this.enableInfiniteScroll();
      }
    } catch (err) {
      this.setInfiniteScrollComplete();
      this.loggingService.error(err, DEBUG_TAG, 'Could not load more data');
    }
  }

  private setInfiniteScrollComplete() {
    this.ngZone.run(() => {
      this.infiniteScroll.complete();
    });
  }

  private enableInfiniteScroll() {
    setTimeout(() => {
      this.disableInfiniteScroll = false;
    }, 1000);
  }

  trackById(index: number, item: MyVirtualScrollItem) {
    return item ? `${item.type}_${item.id}` : undefined;
  }

}
