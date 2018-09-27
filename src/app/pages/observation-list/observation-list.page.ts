import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { RegObsObservation } from '../../core/models/regobs-observation.model';
import * as L from 'leaflet';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapService } from '../../core/services/map/map.service';
import { Observable } from 'rxjs';
import { map, combineLatest } from 'rxjs/operators';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.page.html',
  styleUrls: ['./observation-list.page.scss'],
})
export class ObservationListPage implements OnInit {
  $observations: Observable<RegObsObservation[]>;

  constructor(
    private observationService: ObservationService,
    private mapService: MapService,
    private userSettingService: UserSettingService) {
  }

  async ngOnInit() {
    const userSettings = await this.userSettingService.getUserSettings();
    // TODO: Move user settings to Observable! :)
    this.$observations = this.observationService.getObservationsAsObservable(userSettings.currentGeoHazard)
      .pipe(combineLatest(this.mapService.getMapViewObservable()),
        map((val) => val[0].filter((observation) =>
          !val[1] || val[1].bounds.contains(L.latLng(observation.Latitude, observation.Longitude)))));
  }
}
