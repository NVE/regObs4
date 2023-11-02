import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subject, map, switchMap, tap, withLatestFrom, finalize, take } from 'rxjs';
import { ExternalLinkService } from 'src/app/core/services/external-link/external-link.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { LoggedInUser } from 'src/app/modules/login/models/logged-in-user.model';
import { settings } from 'src/settings';
import moment from 'moment';
import { InputCustomEvent } from '@ionic/angular';

const toDateInputValue = (date: Date) => {
  const isoString = date.toISOString();
  const s = isoString.substring(0, isoString.indexOf('T'));
  return s;
};

@Component({
  selector: 'app-obskorps',
  templateUrl: './obskorps.page.html',
  styleUrls: ['./obskorps.page.scss'],
})
export class ObskorpsPage implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(RegobsAuthService);
  private userSettings = inject(UserSettingService);

  groupId = 51;
  observerId: number;
  startDate: string;
  endDate: string;
  isLoggedIn$: Observable<boolean>;
  isWaitingForGroupReport$ = new Subject<boolean>();
  isWaitingForObserverReport$ = new Subject<boolean>();
  groupErr$ = new Subject<string>();
  observerErr$ = new Subject<string>();

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

  setStartDate(event: InputCustomEvent) {
    this.startDate = event.detail.value;
  }

  setEndDate(event: InputCustomEvent) {
    this.endDate = event.detail.value;
  }

  setGroupId(event: InputCustomEvent) {
    this.groupId = parseInt(event.detail.value);
  }

  setObserverId(event: InputCustomEvent) {
    this.observerId = parseInt(event.detail.value);
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.loggedInUser$.pipe(map((user) => user.isLoggedIn));

    this.authService.myPageData$.subscribe((user) => {
      this.observerId = user.ObserverId;
    });
  }

  generateObserverReport() {
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
        next: (blob) => this.downloadFile(blob),
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
        next: (blob) => this.downloadFile(blob),
        error: (err) => this.groupErr$.next(err.message),
      });
  }

  private sendRequest(url: string, user: LoggedInUser) {
    return this.http.get(url, {
      responseType: 'blob',
      headers: { authorization: `Bearer ${user.token}` },
    });
  }

  private downloadFile(data: Blob) {
    const url = window.URL.createObjectURL(data);
    window.open(url);
  }
}
