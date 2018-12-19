import { Component, OnInit, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import * as L from 'leaflet';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapService } from '../../modules/map/services/map/map.service';
import { IMapView } from '../../modules/map/services/map/map-view.interface';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { IonContent } from '@ionic/angular';

@Component({
    selector: 'app-observation-list',
    templateUrl: './observation-list.page.html',
    styleUrls: ['./observation-list.page.scss'],
})
export class ObservationListPage implements OnInit, OnDestroy {
    observations$: Observable<RegistrationViewModel[]>;

    @ViewChild('pageContent') pageContent: IonContent;

    constructor(
        private observationService: ObservationService,
        private mapService: MapService) {
    }

    ngOnInit() {
        this.observations$ = combineLatest(this.observationService.observations$,
            this.mapService.mapViewObservable$)
            .pipe(
                // Using combineLatest to make sure that observable is emitted when wither observations or map view is updated
                map(([observations, mapView]) => this.filterObservationsWithinViewBounds(observations, mapView))
            );
    }

    ngOnDestroy() {
    }

    private filterObservationsWithinViewBounds(observations: RegistrationViewModel[], view: IMapView) {
        return observations.filter((observation) => !view ||
            view.bounds.contains(L.latLng(observation.ObsLocation.Latitude, observation.ObsLocation.Longitude)));
    }

    trackByRegId(_, obs: RegistrationViewModel) {
        return obs ? obs.RegID : undefined;
    }

    // TODO: Change virtual scoll to ionic virtual scoll when no issues:
    // https://github.com/ionic-team/ionic/issues/15948
    // https://github.com/ionic-team/ionic/issues/15258
}
