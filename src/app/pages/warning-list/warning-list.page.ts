import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Events } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { IWarningGroupInMapView } from '../../core/services/warning/warninggroup-in-mapview.interface';

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss'],
})
export class WarningListPage implements OnInit, OnDestroy {
  selectedTab: 'inMapView' | 'all' | 'favourites';
  warningsForCurrentGeoHazard$: Observable<WarningGroup[]>;
  warningsInMapView$: Observable<IWarningGroupInMapView>;
  favourites$: Observable<WarningGroup[]>;

  constructor(
    private warningService: WarningService,
    private events: Events, private zone: NgZone) {
  }

  async ngOnInit() {
    this.selectedTab = 'inMapView';
    this.warningsInMapView$ = this.warningService.warningGroupInMapViewObservable$;
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
    // this.events.unsubscribe(settings.events.tabsChanged);
    // this.subscription.unsubscribe();
  }
}
