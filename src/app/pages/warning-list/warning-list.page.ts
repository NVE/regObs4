import { Component, OnInit, OnDestroy } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Events } from '@ionic/angular';
import { HelperService } from '../../core/services/helpers/helper.service';
import { RegionSummary } from '../../core/services/warning/region-summary.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observer, ObserverSubscriber } from 'nano-sql/lib/observable';
import { settings } from '../../../settings';
import * as moment from 'moment';

@Component({
  selector: 'app-warning-list',
  templateUrl: './warning-list.page.html',
  styleUrls: ['./warning-list.page.scss'],
})
export class WarningListPage implements OnInit, OnDestroy {
  regions: string[];
  otherRegions: Array<RegionSummary>;
  mapRegions: Array<RegionSummary>;
  allRegions: Array<RegionSummary>;
  subscription: ObserverSubscriber;
  regionDistances: { name: string, distance: number }[];

  constructor(private helperService: HelperService,
    private warningService: WarningService,
    private events: Events) {
    this.regions = [];
    this.allRegions = [];
  }

  async ngOnInit() {
    this.regionDistances = await this.helperService.getDistanceToRegion();
    this.subscription = (await this.warningService.getWarningRegionSummaryAsObservable()).subscribe((regionSummary) => {
      this.allRegions = regionSummary;
    });
    this.events.subscribe(settings.events.tabsChanged, async (tabName: string) => {
      if (tabName === 'warning-list') {
        this.regions = await this.helperService.getAvalancheWarningRegionsForCurrentMapView();
        this.filterRegions();
      }
    });
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

  private filterRegions() {
    setTimeout(() => {
      const sortedRegions = this.allRegions.sort((a, b) => {
        return this.getDistanceToRegion(a.Name) - this.getDistanceToRegion(b.Name);
      });
      this.mapRegions = sortedRegions.filter((r) => this.regions.indexOf(r.Name) >= 0);
      this.otherRegions = sortedRegions.filter((r) => this.regions.indexOf(r.Name) < 0);
    }, 0);
  }

  private getDistanceToRegion(region: string) {
    const matchingRegion = this.regionDistances.find((x) => x.name === region);
    if (matchingRegion) {
      return matchingRegion.distance;
    } else {
      return -1;
    }
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.tabsChanged);
    this.subscription.unsubscribe();
  }
}
