import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { TabName } from './tab-name.enum';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  private _subject: Subject<{ tab: TabName, active: boolean }>;
  private _currentTab: { tab: TabName, active: boolean };
  tabsChange$: Observable<{ tab: TabName, active: boolean }>;

  constructor() {
    this._subject = new Subject<{ tab: TabName, active: boolean }>();
    this.tabsChange$ = this._subject.asObservable().pipe(shareReplay(1));
  }

  tabChange(tab: TabName, active: boolean) {
    if (this._currentTab) {
      if (tab !== this._currentTab.tab) {
        this._subject.next({ tab: this._currentTab.tab, active: false });
      } else if (active === this._currentTab.active) {
        return; // No change
      }
    }
    this._currentTab = { tab, active };
    this._subject.next(this._currentTab);
  }
}
