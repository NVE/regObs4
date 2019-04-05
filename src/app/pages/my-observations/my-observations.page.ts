import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { LoginService } from '../../modules/login/services/login.service';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { ObserverResponseDto, RegistrationViewModel } from '../../modules/regobs-api/models';
import { RegistrationService } from '../../modules/registration/services/registration.service';
import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IRegistration } from '../../modules/registration/models/registration.model';

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

const itemsToLoad = 20;

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
})
export class MyObservationsPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private registrationSubscription: Subscription;
  private user: ObserverResponseDto;
  loaded = false;
  refreshFunc = this.refresh.bind(this);
  private firstDataLoad = false;
  virtualItems: MyVirtualScrollItem[] = [];

  get showEmptyState() {
    return this.loaded && this.virtualItems.length === 0 && this.firstDataLoad;
  }

  constructor(
    private observationService: ObservationService,
    private ngZone: NgZone,
    private userSettingService: UserSettingService,
    private navContoller: NavController,
    private registrationService: RegistrationService,
    private loginService: LoginService) {
  }

  async refresh(cancelPromise: Promise<any>) {
    await this.registrationService.syncRegistrations(cancelPromise);
    this.initRegistrationSubscription();
  }

  async ngOnInit() {
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (!loggedInUser.isLoggedIn) {
      this.navContoller.navigateRoot('/');
    } else {
      this.user = loggedInUser.user;
    }
    this.initRegistrationSubscription();
  }

  private initRegistrationSubscription() {
    this.registrationSubscription = this.getVirtualScrollItemsObservable().subscribe((val) => this.updateVirtualItems(val));
  }

  private updateVirtualItems(virtualItems: MyVirtualScrollItem[]) {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.loaded = true;
      });
    }, virtualItems.length > 0 ? 2000 : 0);
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
    return combineLatest(
      this.getSyncItemsObservable(),
      this.getDraftObservable())
      .pipe(map(([a, b]) => ([...a, ...b])),
        switchMap((syncItems) => this.getMyRegistrationsObservable().pipe(
          map((val) => ([...syncItems, ...val])))));
  }

  private getMyRegistrationsObservable() {
    return this.userSettingService.appModeAndLanguage$.pipe(switchMap(([appMode, langKey]) =>
      this.observationService.getObservationsForCurrentUser(appMode, this.user, langKey, 0, itemsToLoad).pipe(
        map((val) => val.map((item) => ({ type: <'sent'>'sent', id: item.RegID.toString(), item }))))
    ));
  }

  private getDraftObservable(): Observable<MyVirtualScrollItem[]> {
    return this.registrationService.drafts$.pipe(
      map((val) => val.map((item) => ({ type: <'draft'>'draft', id: item.id, item }))));
  }

  private getSyncItemsObservable(): Observable<MyVirtualScrollItem[]> {
    return this.registrationService.getRegistrationsToSync().pipe(
      distinctUntilChanged<IRegistration[], string>((a, b) => a.localeCompare(b) === 0,
        (keySelector) => this.getDistinctSyncItemList(keySelector)),
      map((val) => val.map((item) => ({ type: <'sync'>'sync', id: item.id, item }))));
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
    const currentLength = this.virtualItems.filter((x) => x.type === 'sent').length;
    const pageNumber = Math.floor(currentLength / itemsToLoad);
    const subscription = this.userSettingService.appModeAndLanguage$.pipe(switchMap(([appMode, langKey]) =>
      this.observationService.getObservationsForCurrentUser(appMode, this.user, langKey, pageNumber, itemsToLoad)
    )).subscribe((val) => {
      const sentItems = val.map((item) => ({ type: <'sent'>'sent', id: item.RegID.toString(), item }));
      this.ngZone.run(() => {
        this.virtualItems.push(...sentItems);
        this.infiniteScroll.complete();
      });
    }, (_) => {
      this.ngZone.run(() => {
        this.infiniteScroll.complete();
      });
    });
  }

  trackById(index: number, item: MyVirtualScrollItem) {
    return item ? `${item.type}_${item.id}` : undefined;
  }

}
