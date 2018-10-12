import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { RegObsObservation } from '../../core/models/regobs-observation.model';
import * as L from 'leaflet';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapService } from '../../core/services/map/map.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMapView } from '../../core/services/map/map-view.interface';

@Component({
    selector: 'app-observation-list',
    templateUrl: './observation-list.page.html',
    styleUrls: ['./observation-list.page.scss'],
})
export class ObservationListPage implements OnInit {
    $observations: Observable<RegObsObservation[]>;

    constructor(
        private observationService: ObservationService,
        private mapService: MapService) {
    }

    async ngOnInit() {
        this.$observations = combineLatest(this.observationService.observations$,
            this.mapService.mapViewObservable$)
            .pipe(
                // Using combineLatest to make sure that observable is emitted when wither observations or map view is updated
                map(([observations, mapView]) => this.filterObservationsWithinViewBounds(observations, mapView)),
            );
    }

    private filterObservationsWithinViewBounds(observations: RegObsObservation[], view: IMapView) {
        return observations.filter((observation) => !view || view.bounds.contains(L.latLng(observation.Latitude, observation.Longitude)));
    }

    trackByRegId(index: number, obs: RegObsObservation) {
        return obs ? obs.RegId : undefined;
    }
}
