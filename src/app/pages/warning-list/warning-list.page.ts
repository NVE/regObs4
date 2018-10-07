import { Component, OnInit, OnDestroy } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Events } from '@ionic/angular';
import { HelperService } from '../../core/services/helpers/helper.service';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, switchMap, share } from 'rxjs/operators';
import * as moment from 'moment';
import { MapService } from '../../core/services/map/map.service';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapViewArea } from '../../core/services/map/map-view-area.model';
import { GeoHazard } from '../../core/models/geo-hazard.enum';

interface WarningInMapView {
  inMapView: { center: boolean, viewBounds: boolean };
  warningGroup: WarningGroup;
}

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss'],
})
export class WarningListPage implements OnInit, OnDestroy {
  selectedTab: 'inMapView' | 'all' | 'favourites';
  warnings$: Observable<WarningGroup[]>;
  warningsForCurrentGeoHazard$: Observable<WarningGroup[]>;
  warningsInMapView$: Observable<{
    center: WarningGroup[],
    viewBounds: WarningGroup[]
  }>;
  favourites$: Observable<WarningGroup[]>;

  constructor(private helperService: HelperService,
    private warningService: WarningService,
    private mapService: MapService,
    private userSettingService: UserSettingService,
    private events: Events) {
  }

  async ngOnInit() {

    this.selectedTab = 'inMapView';

    this.warnings$ = this.warningService.getWarningsForCurrentLanguageAsObservable().pipe(
      share(),
      tap((val) => {
        console.log('[WarningListPage] Warnings changed: ', val);
      }));

    this.warningsForCurrentGeoHazard$ = combineLatest(this.warnings$,
      this.userSettingService.getUserSettingsAsObservable())
      .pipe(map(([warningGroups, userSetting]) => {
        const geoHazardsToFilter = [userSetting.currentGeoHazard];
        if (userSetting.currentGeoHazard === GeoHazard.Dirt) {
          geoHazardsToFilter.push(GeoHazard.Water);
        } else if (userSetting.currentGeoHazard === GeoHazard.Water) {
          geoHazardsToFilter.push(GeoHazard.Dirt);
        }
        return warningGroups.filter((wg) => geoHazardsToFilter.indexOf(wg.group.geoHazard) >= 0);
      }));

    this.warningsInMapView$ = this.mapService.getMapViewAreaObservable()
      .pipe(switchMap((mapViewArea: MapViewArea) => this.getWarningsForCurrentMapView(mapViewArea)));

    this.favourites$ = this.warnings$.pipe(map((warningGroups) =>
      warningGroups.filter((wg) => wg.isFavourite)));
  }

  getWarningsForCurrentMapView(mapViewArea: MapViewArea) {
    return this.warningsForCurrentGeoHazard$.pipe(
      map((warnings) => {
        // TODO: Create web worker for this processing task?
        const warningsInMapView: WarningInMapView[] = warnings
          .map((warningGroup) => {
            const groupInMapView = {
              center: mapViewArea.regionInCenter === warningGroup.group.groupId,
              viewBounds: mapViewArea.regionsInViewBounds.indexOf(warningGroup.group.groupId) >= 0,
            };
            return { inMapView: groupInMapView, warningGroup };
          }).filter((warningGroupInView) => warningGroupInView.inMapView.center || warningGroupInView.inMapView.viewBounds);
        return {
          center: warningsInMapView.filter((item) => item.inMapView.center).map((item) => item.warningGroup),
          viewBounds: warningsInMapView.filter((item) =>
            item.inMapView.viewBounds && !item.inMapView.center
          ).map((item) => item.warningGroup)
        };
      }),
      tap((val) => {
        console.log('[WarningListPage] Warnings for current view changed: ', val);
      })
    );
  }

  selectTab(tab: 'inMapView' | 'all' | 'favourites') {
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
