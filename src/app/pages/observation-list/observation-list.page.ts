import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { RegObsObservation } from '../../core/models/regobs-observation.model';
import * as L from 'leaflet';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapService } from '../../core/services/map/map.service';
import { Observable } from 'rxjs';
import { map, combineLatest, tap } from 'rxjs/operators';
import { MapView } from '../../core/services/map/map-view.model';
import { Events } from '@ionic/angular';
import { settings } from '../../../settings';

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
                // Using combineLatest to make sure that observable is emitted when wither observations or map view is updated
                map((val) => this.filterObservationsWithinViewBounds(val[0], val[1])),
                // tap((val) => {
                //     console.log('[INFO] Observable in ObservationListPage changed!', val);
                // })
            );
    }

    private filterObservationsWithinViewBounds(observations: RegObsObservation[], view: MapView) {
        return observations.filter((observation) => !view || view.bounds.contains(L.latLng(observation.Latitude, observation.Longitude)));
    }
}
