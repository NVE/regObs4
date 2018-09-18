import { Component, OnInit, OnDestroy } from '@angular/core';
import { Events } from '@ionic/angular';
import { settings } from '../../../settings';
import { ObservationService } from '../../core/services/observation/observation.service';
import { RegObsObservation } from '../../core/models/regobs-observation.model';
import { HelperService } from '../../core/services/helpers/helper.service';
import * as L from 'leaflet';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { ObserverSubscriber } from 'nano-sql/lib/observable';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.page.html',
  styleUrls: ['./observation-list.page.scss'],
})
export class ObservationListPage implements OnInit, OnDestroy {
  private observations: RegObsObservation[];
  visibleObservations: RegObsObservation[];
  private observationSubscription: ObserverSubscriber;

  constructor(
    private events: Events,
    private observationService: ObservationService,
    private helperService: HelperService,
    private userSettingService: UserSettingService) {
    this.observations = [];
    this.visibleObservations = [];
  }

  async ngOnInit() {
    await this.initObservationSubscription();
    this.events.subscribe(settings.events.tabsChanged, async (tabName: string) => {
      if (tabName === 'observation-list') {
        this.filterVisibleObservations();
      }
    });
    this.events.subscribe(settings.events.geoHazardChanged, async () => {
      await this.initObservationSubscription();
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.tabsChanged);
    this.events.unsubscribe(settings.events.geoHazardChanged);
    this.observationSubscription.unsubscribe();
  }

  async initObservationSubscription() {
    const userSettings = await this.userSettingService.getUserSettings();
    this.observationSubscription =
      this.observationService.getObservationsAsObservable(userSettings.currentGeoHazard).subscribe((observations) => {
        this.observations = observations;
        this.filterVisibleObservations();
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
