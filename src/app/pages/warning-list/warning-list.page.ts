import { Component, OnInit, OnDestroy, NgZone, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { UserSetting } from '../../core/models/user-settings.model';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IonRefresher } from '@ionic/angular';
import { CapListGroupComponent } from '../../components/cap-list-group/cap-list-group.component';
import { GeoHazard } from '../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss'],
})
export class WarningListPage implements OnInit, OnDestroy {
  selectedTab: 'inMapView' | 'all' | 'favourites';
  allWarnings$: Observable<WarningGroup[]>;
  allAWarnings$: Observable<WarningGroup[]>;
  allBWarnings$: Observable<WarningGroup[]>;
  warningsInMapViewCenter$: Observable<WarningGroup[]>;
  warningsInMapViewBounds$: Observable<WarningGroup[]>;
  warningsInMapViewBuffer$: Observable<WarningGroup[]>;
  favourites$: Observable<WarningGroup[]>;
  userSetting$: Observable<UserSetting>;
  warningsInViewBoundsLength: number;
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChildren(CapListGroupComponent) capListGroups: QueryList<CapListGroupComponent>;
  GeoHazard = GeoHazard;

  constructor(
    private warningService: WarningService, private userSettingService: UserSettingService, private ngZone: NgZone) {
  }
  ngOnInit() {
    this.selectedTab = 'inMapView';
    this.userSetting$ = this.userSettingService.userSettingObservable$;
    this.warningsInMapViewCenter$ = this.warningService.warningGroupInMapViewObservable$
      .pipe(map((val) => val.center));
    this.warningsInMapViewBounds$ = this.warningService.warningGroupInMapViewObservable$
      .pipe(map((val) => val.viewBounds), tap((values) => {
        setTimeout(() => {
          this.warningsInViewBoundsLength = values.length;
        });
      }));
    this.warningsInMapViewBuffer$ = this.warningService.warningGroupInMapViewObservable$
      .pipe(map((val) => val.buffer));
    this.allWarnings$ = this.warningService.warningsForCurrentGeoHazardObservable$;
    this.allAWarnings$ = this.allWarnings$.pipe(
      map((warnings) => warnings.filter((warning) => warning.groupType === 'A')));
    this.allBWarnings$ = this.allWarnings$.pipe(
      map((warnings) => warnings.filter((warning) => warning.groupType === 'B')));
    this.favourites$ = this.warningService.warningsObservable$
      .pipe(map((warningGroups) =>
        warningGroups.filter((wg) => wg.isFavourite)));
  }

  async selectTab(tab: 'inMapView' | 'all' | 'favourites') {
    await this.closeAllSlidingItems();
    this.ngZone.run(() => {
      this.selectedTab = tab;
    });
  }

  async closeAllSlidingItems() {
    for (const capGroup of this.capListGroups.toArray()) {
      await capGroup.closeSlidingItems();
    }
  }

  ionViewWillLeave() {
    return this.closeAllSlidingItems();
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

  async doRefresh() {
    await this.warningService.updateWarningsForCurrentGeoHazard();
    this.refresher.complete();
  }

  ngOnDestroy(): void {
  }
}
