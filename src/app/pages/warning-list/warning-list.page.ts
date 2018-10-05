import { Component, OnInit, OnDestroy } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Events, PopoverController } from '@ionic/angular';
import { HelperService } from '../../core/services/helpers/helper.service';
import { Observable, of, combineLatest } from 'rxjs';
import { map, tap, switchMap, groupBy, partition, filter } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observer, ObserverSubscriber } from 'nano-sql/lib/observable';
import { settings } from '../../../settings';
import * as moment from 'moment';
import { PopoverMenuComponent } from '../../components/popover-menu/popover-menu.component';
import { IWarning } from '../../core/services/warning/warning.interface';
import { CapAlertInfo } from '../../modules/cap/models/cap-alert.model';
import { MapService } from '../../core/services/map/map.service';
import { MapView } from '../../core/services/map/map-view.model';
import { BorderHelper } from '../../core/helpers/leaflet/border-helper';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { WarningGroup } from '../../core/services/warning/warning-group.model';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';

export interface WarningInMapView {
  inMapView: { center: boolean, viewBounds: boolean };
  warningGroup: WarningGroup;
}

// export interface CapItemInMapViewGroup {
//   name: string;
//   geoHazard: GeoHazard;
//   items: CapItemWithTranslation[];
// }

// export interface CapItemWithTranslation {
//   warning: IWarning;
//   translatedItem: CapAlertInfo;
// }

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss'],
})
export class WarningListPage implements OnInit, OnDestroy {
  showAll: boolean;
  warnings$: Observable<WarningGroup[]>;
  warningsInViewBounds$: Observable<{
    center: WarningGroup[],
    viewBounds: WarningGroup[]
  }>;

  constructor(private helperService: HelperService,
    private warningService: WarningService,
    private mapService: MapService,
    private userSettingService: UserSettingService,
    private events: Events) {
  }

  async ngOnInit() {
    // this.regionDistances = await this.helperService.getDistanceToRegion();
    // this.subscription = (await this.warningService.getAvalancheWarningRegionSummaryAsObservable()).subscribe((regionSummary) => {
    //   this.allRegions = regionSummary;
    // });
    // this.events.subscribe(settings.events.tabsChanged, async (tabName: string) => {
    //   if (tabName === 'warning-list') {
    //     this.regions = await this.helperService.getAvalancheWarningRegionsForCurrentMapView();
    //     // TODO: Create observable of regions in current map view
    //     this.filterRegions();
    //   }
    // });
    this.warnings$ = this.warningService.getWarningsForCurrentLanguageAsObservable().pipe(tap((val) => {
      console.log('[WarningListPage] Warnings changed: ', val);
    }));

    this.warningsInViewBounds$ = this.mapService.getMapViewObservable()
      .pipe(switchMap((mapView: MapView) => this.getWarningsForCurrentMapView(mapView)));
  }

  getWarningsForCurrentMapView(mapView: MapView) {
    return combineLatest(
      this.warningService.getWarningsForCurrentLanguageAsObservable(),
      this.userSettingService.getUserSettingsAsObservable()).pipe(
        map(([warnings, usersettings]) => {
          const inMapView = BorderHelper.getGroupInView(usersettings.currentGeoHazard, mapView.center, mapView.bounds);
          const warningsInMapView: WarningInMapView[] = warnings
            .map((warningGroup) => {
              const groupInMapView = {
                center: inMapView.center.indexOf(warningGroup.group.groupId) >= 0,
                viewBounds: inMapView.viewBounds.indexOf(warningGroup.group.groupId) >= 0,
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

  toggleTab() {
    this.showAll = !this.showAll;
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

  // private filterRegions() {
  //   setTimeout(() => {
  //     const sortedRegions = this.allRegions.sort((a, b) => {
  //       return this.getDistanceToRegion(a.Name) - this.getDistanceToRegion(b.Name);
  //     });
  //     this.mapRegions = sortedRegions.filter((r) => this.regions.indexOf(r.Name) >= 0);
  //     this.otherRegions = sortedRegions.filter((r) => this.regions.indexOf(r.Name) < 0);
  //   }, 0);
  // }

  // private getDistanceToRegion(region: string) {
  //   const matchingRegion = this.regionDistances.find((x) => x.name === region);
  //   if (matchingRegion) {
  //     return matchingRegion.distance;
  //   } else {
  //     return -1;
  //   }
  // }

  ngOnDestroy(): void {
    // this.events.unsubscribe(settings.events.tabsChanged);
    // this.subscription.unsubscribe();
  }
}
