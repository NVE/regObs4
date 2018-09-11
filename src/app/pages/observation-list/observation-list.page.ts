import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { settings } from '../../../settings';
import { ObservationService } from '../../core/services/observation/observation.service';
import { RegObsObservation } from '../../core/models/regobs-observation.model';
import { HelperService } from '../../core/services/helpers/helper.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.page.html',
  styleUrls: ['./observation-list.page.scss'],
})
export class ObservationListPage implements OnInit {

  private observations: RegObsObservation[];
  visibleObservations: RegObsObservation[];

  constructor(
    private events: Events,
    private observationService: ObservationService,
    private helperService: HelperService) {
    this.observations = [];
    this.visibleObservations = [];
  }

  ngOnInit() {
    this.observationService.getObservationsAsObservable().subscribe((observations) => {
      this.observations = observations;
      this.filterVisibleObservations();
    });

    this.events.subscribe(settings.events.tabsChanged, async (tabName: string) => {
      if (tabName === 'observation-list') {
        this.filterVisibleObservations();
      }
    });
  }

  filterVisibleObservations() {
    this.helperService.getCurrentMapView().then((viewBounds) => {
      if (viewBounds) {
        setTimeout(() => {
          this.visibleObservations = this.observations.filter(
            (observation) => viewBounds.bounds.contains(L.latLng(observation.Latitude, observation.Longitude)));
        }, 0);
      }
    });
  }
}
