import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subject, map, switchMap, tap, withLatestFrom, finalize, take, of } from 'rxjs';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { RegobsAuthService } from '../../modules/auth/services/regobs-auth.service';
import { LoggedInUser } from '../../modules/login/models/logged-in-user.model';
import { settings } from '../../../settings';
import moment from 'moment';
import {
  AlertController,
  InputChangeEventDetail,
  InputCustomEvent,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSpinner,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../modules/shared/components/header/header.component';
import { NgIf, AsyncPipe } from '@angular/common';

const toDateInputValue = (date: Date) => {
  const isoString = date.toISOString();
  const s = isoString.substring(0, isoString.indexOf('T'));
  return s;
};

@Component({
  selector: 'app-obskorps',
  templateUrl: './obskorps.page.html',
  styleUrls: ['./obskorps.page.scss'],
  imports: [
    AsyncPipe,
    HeaderComponent,
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonSpinner,
    NgIf,
  ],
})
export class ObskorpsPage implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(RegobsAuthService);
  private userSettings = inject(UserSettingService);
  private alertController = inject(AlertController);

  groupId = 51;
  observerId?: number;
  startDate: string;
  endDate: string;

  // Auth stuff
  isLoggedIn$ = this.authService.loggedInUser$.pipe(map((user) => user.isLoggedIn));
  hasAccess$?: Observable<boolean>;
  hasAccessToGroupReports$?: Observable<boolean>;
  hasAccessToObserverReports$?: Observable<boolean>;

  isWaitingForGroupReport$ = new Subject<boolean>();
  isWaitingForObserverReport$ = new Subject<boolean>();
  groupErr$ = new Subject<string | null>();
  observerErr$ = new Subject<string | null>();

  constructor() {
    const start = moment.utc().subtract({ month: 1 }).startOf('month');
    const end = start.clone().endOf('month');
    this.startDate = toDateInputValue(start.toDate());
    this.endDate = toDateInputValue(end.toDate());
  }

  private getApiUrl$(): Observable<string> {
    return this.userSettings.appMode$.pipe(
      take(1),
      map((appMode) => settings.services.regObs.apiUrl[appMode])
    );
  }

  setStartDate(event: InputCustomEvent<InputChangeEventDetail>) {
    if (event.detail.value != null) {
      this.startDate = event.detail.value;
    }
  }

  setEndDate(event: InputCustomEvent<InputChangeEventDetail>) {
    if (event.detail.value != null) {
      this.endDate = event.detail.value;
    }
  }

  setGroupId(event: InputCustomEvent<InputChangeEventDetail>) {
    if (event.detail.value != null) {
      this.groupId = parseInt(event.detail.value);
    }
  }

  setObserverId(event: InputCustomEvent<InputChangeEventDetail>) {
    if (event.detail.value != null) {
      this.observerId = parseInt(event.detail.value);
    }
  }

  ngOnInit(): void {
    // group har tilgang til grupperapporter og observatørrapporter
    // observer har kun tilgang til observatørrapporter
    const accessType: Observable<'group' | 'observer' | null> = this.authService.myPageData$.pipe(
      map((data) => {
        if (data?.Roles == null) return null;

        if (data.Roles.includes('regobs_ObservatorRapporter')) {
          return 'group';
        }

        if (data.Roles.includes('regobs_ObsKorps')) {
          return 'observer';
        }

        return null;
      })
    );

    this.hasAccessToGroupReports$ = accessType.pipe(map((type) => type === 'group'));
    this.hasAccessToObserverReports$ = accessType.pipe(map((type) => type === 'observer' || type === 'group'));
    this.hasAccess$ = accessType.pipe(map((type) => type != null));

    this.authService.myPageData$.subscribe((user) => {
      this.observerId = user?.ObserverId;
    });
  }

  generateObserverReport() {
    if (!this.observerId) return;

    this.isWaitingForObserverReport$.next(true);

    const params = new URLSearchParams({
      observerId: this.observerId.toString(),
      startDate: this.startDate,
      endDate: this.endDate,
    });

    return this.getApiUrl$()
      .pipe(
        map((apiUrl) => `${apiUrl}/ObserverReport/ExcelObserverReport?${params}`),
        withLatestFrom(this.authService.loggedInUser$),
        switchMap(([url, user]) => this.sendRequest(url, user)),
        tap(() => this.observerErr$.next(null)),
        finalize(() => this.isWaitingForObserverReport$.next(false))
      )
      .subscribe({
        next: (res) => this.handleResponse(res),
        error: (err) => this.observerErr$.next(err.message),
      });
  }

  generateGroupReport() {
    this.isWaitingForGroupReport$.next(true);

    const params = new URLSearchParams({
      groupId: this.groupId.toString(),
      startDate: this.startDate,
      endDate: this.endDate,
    });

    return this.getApiUrl$()
      .pipe(
        map((apiUrl) => `${apiUrl}/ObserverReport/ExcelGroupReport?${params}`),
        withLatestFrom(this.authService.loggedInUser$),
        switchMap(([url, user]) => this.sendRequest(url, user)),
        tap(() => this.groupErr$.next(null)),
        finalize(() => this.isWaitingForGroupReport$.next(false))
      )
      .subscribe({
        next: (res) => this.handleResponse(res),
        error: (err) => this.groupErr$.next(err.message),
      });
  }

  private sendRequest(url: string, user: LoggedInUser) {
    return this.http.get(url, {
      responseType: 'blob',
      headers: { authorization: `Bearer ${user.token}` },
      observe: 'response',
    });
  }

  private handleResponse(res: HttpResponse<Blob>) {
    if (res.status === HttpStatusCode.NoContent || res.body == null) {
      this.alertController
        .create({
          header: 'Ingen data',
          message: 'Ingen data tilgjengelig for valgt periode',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
      return;
    }

    const url = window.URL.createObjectURL(res.body);
    window.open(url);
  }
}
