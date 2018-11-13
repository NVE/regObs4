import { Component, OnInit } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import * as L from 'leaflet';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapService } from '../../modules/map/services/map/map.service';
import { IMapView } from '../../modules/map/services/map/map-view.interface';
import { RegistrationViewModel } from '../../modules/regobs-api/models';

@Component({
    selector: 'app-observation-list',
    templateUrl: './observation-list.page.html',
    styleUrls: ['./observation-list.page.scss'],
})
export class ObservationListPage implements OnInit {
    $observations: Observable<RegistrationViewModel[]>;

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

    private filterObservationsWithinViewBounds(observations: RegistrationViewModel[], view: IMapView) {
        return observations.filter((observation) => !view ||
            view.bounds.contains(L.latLng(observation.ObsLocation.Latitude, observation.ObsLocation.Longitude)));
    }

    trackByRegId(index: number, obs: RegistrationViewModel) {
        return obs ? obs.RegID : undefined;
    }
}
