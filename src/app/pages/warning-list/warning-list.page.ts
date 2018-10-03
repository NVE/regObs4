import { Component, OnInit, OnDestroy } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Events, PopoverController } from '@ionic/angular';
import { HelperService } from '../../core/services/helpers/helper.service';
import { RegionSummary } from '../../core/services/warning/snow/region-summary.model';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap, groupBy, partition, filter } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observer, ObserverSubscriber } from 'nano-sql/lib/observable';
import { settings } from '../../../settings';
import * as moment from 'moment';
import { PopoverMenuComponent } from '../../components/popover-menu/popover-menu.component';
import { WarningCap } from '../../core/services/warning/warning-cap.model';
import { CapAlertInfo } from '../../modules/cap/models/cap-alert.model';
import { MapService } from '../../core/services/map/map.service';
import { MapView } from '../../core/services/map/map-view.model';
import { BorderHelper } from '../../core/helpers/leaflet/border-helper';
import { GeoHazard } from '../../core/models/geo-hazard.enum';

export interface CapItemInMapView {
  inMapView: { center: boolean, viewBounds: boolean };
  item: CapItemWithTranslation;
}

export interface CapItemInMapViewGroup {
  name: string;
  geoHazard: GeoHazard;
  items: CapItemWithTranslation[];
}

export interface CapItemWithTranslation {
  warning: WarningCap;
  translatedItem: CapAlertInfo;
}

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss'],
})
export class WarningListPage implements OnInit, OnDestroy {
  // regions: string[];
  // otherRegions: Array<RegionSummary>;
  // mapRegions: Array<RegionSummary>;
  // allRegions: Array<RegionSummary>;
  // subscription: ObserverSubscriber;
  // regionDistances: { name: string, distance: number }[];
  showAll: boolean;
  $capWarnings: Observable<CapItemWithTranslation[]>;
  $capWarningsMapCenter: Observable<{
    center: CapItemInMapViewGroup[],
    viewBounds: CapItemInMapViewGroup[]
  }>;

  constructor(private helperService: HelperService,
    private warningService: WarningService,
    private mapService: MapService,
    private events: Events) {
    // this.regions = [];
    // this.allRegions = [];
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
    this.$capWarnings = this.warningService.getCapWarningsForCurrentLanguageAsObservable().pipe(tap((val) => {
      console.log('CAP ITEMS: ', val);
    }));

    this.$capWarningsMapCenter = this.mapService.getMapViewObservable()
      .pipe(switchMap((mapView: MapView) => this.getWarningsForCurrentMapView(mapView)));
  }

  getWarningsForCurrentMapView(mapView: MapView) {
    return this.$capWarnings.pipe(
      map((warnings) => {
        const warningsInMapView: CapItemInMapView[] = warnings
          .filter((items) => moment(items.translatedItem.effective).isAfter(moment().startOf('day')))
          .map((item) => {
            const polygon = item.translatedItem.area.polygon;
            const inMapView = BorderHelper.isinView(mapView.center, mapView.bounds, polygon);
            return { inMapView, item };
          }).filter((item) => item.inMapView.center || item.inMapView.viewBounds);
        return {
          center: this.groupResult(warningsInMapView.filter((item) => item.inMapView.center).map((item) => item.item)),
          viewBounds: this.groupResult(warningsInMapView.filter((item) =>
            item.inMapView.viewBounds && !item.inMapView.center
          ).map((item) => item.item))
        };
      }));
  }

  groupResult(items: CapItemWithTranslation[]) {
    const result: CapItemInMapViewGroup[] = [];
    for (const item of items) {
      const key = result.find((x) =>
        x.name === item.translatedItem.area.areaDesc &&
        x.geoHazard === item.warning.geoHazard);
      if (key) {
        key.items.push(item);
      } else {
        result.push({
          name: item.translatedItem.area.areaDesc,
          geoHazard: item.warning.geoHazard,
          items: [item]
        });
      }
    }
    return result;
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
