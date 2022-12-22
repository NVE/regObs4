import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, shareReplay } from 'rxjs';
import { Location } from '@angular/common';

export const TAB_HOME = 'home';
export const TAB_OBSERVATION_LIST = 'observation-list';
export const TAB_WARNING_LIST = 'warning-list';

/**
 * Use this to get notified when current tab changes
 */
@Injectable({
  providedIn: 'root',
})
export class TabsService {
  readonly selectedTab$: Observable<string>;

  constructor(location: Location, router: Router) {
    this.selectedTab$ = router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => location.path()),
      distinctUntilChanged(),
      map((path) => this.parseTabFromPath(path)),
      shareReplay() // All tabs subscribe to this, so share amongst subscribers
    );
  }

  private parseTabFromPath(path: string) {
    if (path.indexOf('observation-list') > -1) {
      return TAB_OBSERVATION_LIST;
    }
    if (path.indexOf('warning-list') > -1) {
      return TAB_WARNING_LIST;
    }
    return TAB_HOME;
  }
}
