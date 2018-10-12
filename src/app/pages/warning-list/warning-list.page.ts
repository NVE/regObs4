import { Component, OnInit, OnDestroy, NgZone, ApplicationRef } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { WarningGroup } from '../../core/services/warning/warning-group.model';

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss'],
})
export class WarningListPage implements OnInit, OnDestroy {
  selectedTab: 'inMapView' | 'all' | 'favourites';
  warningsForCurrentGeoHazard$: Observable<WarningGroup[]>;
  warningsInMapViewCenter$: Observable<WarningGroup[]>;
  warningsInMapViewBounds$: Observable<WarningGroup[]>;
  favourites$: Observable<WarningGroup[]>;

  constructor(
    private warningService: WarningService, private app: ApplicationRef) {
  }

  ngOnInit() {
    this.warningsInMapViewCenter$ = this.warningService.warningGroupInMapViewObservable$
      .pipe(map((val) => val.center));
    this.warningsInMapViewBounds$ = this.warningService.warningGroupInMapViewObservable$
      .pipe(map((val) => val.viewBounds));
    this.selectedTab = 'inMapView';
  }

  selectTab(tab: 'inMapView' | 'all' | 'favourites') {
    if (tab === 'all' && !this.warningsForCurrentGeoHazard$) {
      this.warningsForCurrentGeoHazard$ = this.warningService.warningsForCurrentGeoHazardObservable$;
    }
    if (tab === 'favourites' && !this.favourites$) {
      this.favourites$ = this.warningService.warningsObservable$
        .pipe(map((warningGroups) =>
          warningGroups.filter((wg) => wg.isFavourite)));
    }
    this.selectedTab = tab;
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

  ngOnDestroy(): void {
  }
}
