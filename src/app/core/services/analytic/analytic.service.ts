import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { settings } from '../../../../settings';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  ga: UniversalAnalytics.ga;

  constructor(
    private router: Router,
  ) {
  }

  async init() {
    this.ga = (<any>window).ga;
    if (window.localStorage) {
      this.ga('create', settings.googleAnalytics.trackerId, 'auto', {
        'storage': 'none',
        'clientId': window.localStorage.getItem('ga_clientId')
      });
      this.ga(function (tracker) {
        window.localStorage.setItem('ga_clientId', tracker.get('clientId'));
      });
    } else {
      this.ga('create', settings.googleAnalytics.trackerId, 'auto');
    }
    this.ga('set', 'appName', 'regObs4');
    this.ga('set', 'anonymizeIp', settings.googleAnalytics.anonymizeIp);
    this.ga('send', 'pageview');

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map((val: NavigationEnd) => val.urlAfterRedirects), distinctUntilChanged())
      .subscribe((url: string) => {
        this.trackView(url);
      });
  }

  private trackView(url: string) {
    this.ga('set', 'page', url);
    this.ga('send', 'pageview');
  }
}
