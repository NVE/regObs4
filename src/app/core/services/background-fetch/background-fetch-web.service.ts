import { Injectable } from '@angular/core';
import { BackgroundFetchService } from './background-fetch.service';
import { ObservationService } from '../observation/observation.service';
import { WarningService } from '../warning/warning.service';

@Injectable()
export class BackgroundFetchWebService implements BackgroundFetchService {

    constructor(private observationService: ObservationService, private warningService: WarningService) {

    }

    init() {
        setInterval(async () => {
            this.observationService.updateObservations();
            this.warningService.updateAvalancheWarnings();
        }, 2 * 60 * 1000); // Update frequency for observations on web implementation
    }
}
