import { Component, OnInit, OnDestroy } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Events } from '@ionic/angular';
import { HelperService } from '../../core/services/helpers/helper.service';
import { RegionSummary } from '../../core/services/warning/region-summary.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-varsom',
  templateUrl: './varsom.page.html',
  styleUrls: ['./varsom.page.scss'],
})
export class VarsomPage implements OnInit, OnDestroy {
  regions: string[];
  regionSummary: Observable<Array<RegionSummary>>;
  // get filteredRegions() {
  //   return this.regionSummary.pipe(map((regionsummary) => regionsummary.filter((region) => this.regions.indexOf(region.Name) < 0)));
  // }

  constructor(private helperService: HelperService,
    private warningService: WarningService,
    private events: Events,
    private geolocation: Geolocation) { }

  async ngOnInit() {
    this.events.subscribe('tabs:changed', async (tabName: string) => {
      if (tabName === 'varsom') {
        this.regions = await this.helperService.getAvalancheWarningRegionsForCurrentMapView();
      }
    });

    const distances = await this.helperService.getDistanceToRegion();

    this.regionSummary = (await this.warningService.avalancheWarningRegionSummarySimple()).pipe(map((regionSummary) => {
      return regionSummary.sort((a, b) => {
        return this.getDistanceToRegion(a.Name, distances) - this.getDistanceToRegion(b.Name, distances);
      });
    }));
  }

  private getDistanceToRegion(region: string, distances: Array<{ name: string, distance: number }>) {
    const matchingRegion = distances.find((x) => x.name === region);
    if (matchingRegion) {
      return matchingRegion.distance;
    } else {
      return -1;
    }
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('tabs:changed');
  }
}
