import { Component, OnInit, OnDestroy, NgZone, ApplicationRef } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { UserSetting } from '../../core/models/user-settings.model';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';

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
  userSetting$: Observable<UserSetting>;
  hasData: boolean;
  subscription: Subscription;

  constructor(
    private warningService: WarningService, private userSettingService: UserSettingService) {
  }

  // TODO: Pull to refresh and virtual items!

  ngOnInit() {
    this.selectedTab = 'inMapView';
    this.userSetting$ = this.userSettingService.userSettingObservable$;
    this.warningsInMapViewCenter$ = this.warningService.warningGroupInMapViewObservable$
      .pipe(map((val) => val.center));
    this.warningsInMapViewBounds$ = this.warningService.warningGroupInMapViewObservable$
      .pipe(map((val) => val.viewBounds));
    this.warningsForCurrentGeoHazard$ = this.warningService.warningsForCurrentGeoHazardObservable$;
    this.favourites$ = this.warningService.warningsObservable$
      .pipe(map((warningGroups) =>
        warningGroups.filter((wg) => wg.isFavourite)));
    this.subscription = this.warningsForCurrentGeoHazard$.subscribe((val) => {
      this.hasData = val.length > 0;
    });
  }

  selectTab(tab: 'inMapView' | 'all' | 'favourites') {
    this.selectedTab = tab;
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
