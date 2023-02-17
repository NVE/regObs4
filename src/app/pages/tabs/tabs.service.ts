import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, shareReplay } from 'rxjs';
import { Location } from '@angular/common';

export enum TABS {
  HOME = 'home',
  OBSERVATION_LIST = 'observation-list',
  WARNING_LIST = 'warning-list',
}

/**
 * Use this to get notified when current tab changes
 */
@Injectable({
  providedIn: 'root',
})
export class TabsService {
  readonly selectedTab$: Observable<TABS | null>;

  constructor(location: Location, router: Router) {
    this.selectedTab$ = router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => location.path()),
      distinctUntilChanged(),
      map((path) => this.parseTabFromPath(path)),
      shareReplay(1) // All tabs subscribe to this, so share amongst subscribers
    );
  }

  private parseTabFromPath(path: string): TABS | null {
    const cleanPath = path.includes('?') ? path.slice(0, path.indexOf('?')) : path;
    if (cleanPath.indexOf(TABS.OBSERVATION_LIST) > -1) {
      return TABS.OBSERVATION_LIST;
    } else if (cleanPath.indexOf(TABS.WARNING_LIST) > -1) {
      return TABS.WARNING_LIST;
    } else if (cleanPath === '') {
      return TABS.HOME;
    }
    return null;
  }
}
