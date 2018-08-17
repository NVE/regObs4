import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BackgroundFetchService } from './background-fetch.service';
import { ObservationService } from '../observation/observation.service';

@Injectable()
export class BackgroundFetchWebService implements BackgroundFetchService {

    constructor(private observationService: ObservationService) {

    }

    init() {
        setInterval(async () => {
            this.observationService.updateObservations();
        }, 10 * 1000);
    }
}
