import { Component, OnInit, OnDestroy } from '@angular/core';
import { Events } from '@ionic/angular';
import { settings } from '../../../settings';
import { ObservationService } from '../../core/services/observation/observation.service';
import { RegObsObservation } from '../../core/models/regobs-observation.model';
import * as L from 'leaflet';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { ObserverSubscriber } from 'nano-sql/lib/observable';
import { MapService } from '../../core/services/map/map.service';
import { MapView } from '../../core/services/map/map-view.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.page.html',
  styleUrls: ['./observation-list.page.scss'],
})
export class ObservationListPage implements OnInit, OnDestroy {
  private observations: RegObsObservation[];
  visibleObservations: RegObsObservation[];
  private observationSubscription: Subscription;
  private mapViewSubscription: ObserverSubscriber;
  private currentMapView: MapView;

  constructor(
    private events: Events,
    private observationService: ObservationService,
    private mapService: MapService,
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
    this.mapViewSubscription = this.mapService.getMapViewObservable().subscribe((currentMapView) => {
      this.currentMapView = currentMapView;
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.tabsChanged);
    this.events.unsubscribe(settings.events.geoHazardChanged);
    this.observationSubscription.unsubscribe();
    this.mapViewSubscription.unsubscribe();
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
    if (this.currentMapView) {
      setTimeout(() => {
        this.visibleObservations = this.observations.filter(
          (observation) => this.currentMapView.bounds.contains(L.latLng(observation.Latitude, observation.Longitude)));
      }, 0);
    }
  }
}
