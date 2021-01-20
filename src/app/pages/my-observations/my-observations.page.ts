import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { Subscription, combineLatest, Observable, of } from 'rxjs';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { RegistrationService } from '../../modules/registration/services/registration.service';
import { map, distinctUntilChanged, switchMap, take, finalize, tap } from 'rxjs/operators';
import { IRegistration } from '../../modules/registration/models/registration.model';
import { RegobsAuthService } from '../../modules/auth/services/regobs-auth.service';
import { IPageInfo } from 'ngx-virtual-scroller';
import { IonContent } from '@ionic/angular';

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

const numberOfItemsToFetch = 10;

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
})
export class MyObservationsPage implements OnInit, OnDestroy {
  private registrationSubscription: Subscription;
  loaded = false;
  refreshFunc = this.refresh.bind(this);
  virtualItems: MyVirtualScrollItem[] = [];
  loadingMore = false;
  parentScrollElement: HTMLElement;
  private lastPageLoaded = false;

  @ViewChild(IonContent, { static: true }) content: IonContent;

  get showEmptyState(): boolean {
    return this.loaded && this.virtualItems.length === 0;
  }

  constructor(
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private registrationService: RegistrationService,
    private regobsAuthService: RegobsAuthService) {
  }

  async refresh(cancelPromise: Promise<any>): Promise<void> {
    await this.registrationService.syncRegistrations(cancelPromise);
    this.initRegistrationSubscription();
  }

  async ngOnInit(): Promise<void> {
    this.parentScrollElement = await this.content.getScrollElement();
    this.initRegistrationSubscription();
  }

  private initRegistrationSubscription() {
    this.registrationSubscription = this.getVirtualScrollItemsObservable().subscribe((result) => {
      this.virtualItems = result;
      this.loaded = true;
    });
  }

  private getVirtualScrollItemsObservable() {
    return this.getSyncItemsObservable().pipe(
      switchMap((syncItems) =>
        combineLatest([of(syncItems), this.getDraftObservable(), this.getMyRegistrationsObservable(0)])
      ), map(([syncIntems, drafts, registrations]) => [...syncIntems, ...drafts, ...registrations]));
  }

  private getMyRegistrationsObservable(pageNumber: number): Observable<MyVirtualScrollItem[]> {
    return combineLatest([this.userSettingService.appModeAndLanguage$, this.regobsAuthService.loggedInUser$])
      .pipe(
        switchMap(([[appMode, langKey], loggedInUser]) =>
          !loggedInUser.isLoggedIn ? of([]) :
            this.observationService.getObservationsForCurrentUser(appMode, loggedInUser.user, langKey, pageNumber, numberOfItemsToFetch).pipe(
              map((val) => val.map((item) => ({ type: <const>'sent', id: item.RegID.toString(), item }))))
        ),
        tap((result) => {
          if (result.length < numberOfItemsToFetch) {
            this.lastPageLoaded = true;
          }
        })
      );
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

  async loadMoreData(event: IPageInfo) {
    if (!this.loaded || this.loadingMore) {
      return;
    }
    if (this.lastPageLoaded) {
      return;
    }
    if (event.endIndex <= 0) {
      return;
    }
    if (event.maxScrollPosition <= 0) {
      return;
    }
    if (event.endIndex !== this.virtualItems.length - 1) {
      return;
    }
    this.loadingMore = true;
    const currentLength = this.virtualItems.filter((x) => x.type === 'sent').length;
    const pageNumber = Math.floor(currentLength / numberOfItemsToFetch);
    this.getMyRegistrationsObservable(pageNumber).pipe(take(1), finalize(() => {
      this.loadingMore = false;
    })).subscribe((nextPage) => this.virtualItems = this.virtualItems.concat(nextPage));
  }

  trackById(index: number, item: MyVirtualScrollItem) {
    return item ? `${item.type}_${item.id}` : undefined;
  }

}
