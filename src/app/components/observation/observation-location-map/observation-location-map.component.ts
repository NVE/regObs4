import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import L from 'leaflet';
import { ImageLocation, ImageLocationStartStop } from 'src/app/core/models/image-location.model';
import { AvalancheObsViewModel, LandslideViewModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { ModalMapImagePage } from 'src/app/modules/map/pages/modal-map-image/modal-map-image.page';
import { StaticMapImageComponent } from 'src/app/modules/static-map-image/static-map-image.component';
import { settings } from 'src/settings';

/**
 * Viser lokasjonen til observasjonen i et statisk kartbilde.
 * Når du trykker på kartet vises en modal med et interaktivt kart
 */
@Component({
  selector: 'app-observation-location-map',
  imports: [StaticMapImageComponent],
  template: `<app-static-map-image [location]="location()" (click)="openMapModal()"></app-static-map-image>`,
  styles: [
    `
      :host {
        display: block;
        cursor: pointer;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservationLocationMapComponent {
  registration = input.required<RegistrationViewModel>();
  modalController = inject(ModalController);
  location = computed(() => getLocation(this.registration()));

  async openMapModal() {
    const modal = await this.modalController.create({
      component: ModalMapImagePage,
      componentProps: {
        location: this.location(),
      },
    });
    modal.present();
  }
}

function getLocation(obs: RegistrationViewModel): ImageLocation {
  return {
    latLng: L.latLng(obs.ObsLocation.Latitude, obs.ObsLocation.Longitude),
    geoHazard: obs.GeoHazardTID,
    startStopLocation: getStartStopLocation(obs),
    damageLocations: getDamagePositions(obs),
  };
}

function getStartStopLocation(obs: RegistrationViewModel): ImageLocationStartStop | undefined {
  if (obs.AvalancheObs) {
    return {
      ...obs2Latlng(obs.AvalancheObs),
      totalPolygon: extent2Polygon(obs.AvalancheObs.Extent, settings.map.extentColor),
      startPolygon: extent2Polygon(obs.AvalancheObs.StartExtent, settings.map.startExtentColor),
      endPolygon: extent2Polygon(obs.AvalancheObs.StopExtent, settings.map.endExtentColor),
    };
  }
  if (obs.LandSlideObs) {
    return {
      ...obs2Latlng(obs.LandSlideObs),
      totalPolygon: extent2Polygon(obs.LandSlideObs.Extent, settings.map.extentColor),
      startPolygon: extent2Polygon(obs.LandSlideObs.StartExtent, settings.map.startExtentColor),
      endPolygon: extent2Polygon(obs.LandSlideObs.StopExtent, settings.map.endExtentColor),
    };
  }
  if (obs.WaterLevel2) {
    return {
      totalPolygon: extent2Polygon(obs.WaterLevel2.Extent, settings.map.extentColor),
    };
  }
  return undefined;
}

function getDamagePositions(obs: RegistrationViewModel) {
  if (obs.DamageObs?.some((d) => d.DamagePosition)) {
    const positions = obs.DamageObs.map((d) => d.DamagePosition).filter((p) => p && p.Latitude && p.Longitude) as {
      Latitude: number;
      Longitude: number;
    }[];
    return positions.map((p) => L.latLng(p.Latitude, p.Longitude));
  }
  return undefined;
}

function obs2Latlng(obs: LandslideViewModel | AvalancheObsViewModel) {
  return {
    start: obs.StartLat && obs.StartLong ? L.latLng(obs.StartLat, obs.StartLong) : undefined,
    stop: obs.StopLat && obs.StopLong ? L.latLng(obs.StopLat, obs.StopLong) : undefined,
  };
}

function extent2Polygon(extent: number[][] | undefined, color: string) {
  return extent
    ? new L.Polygon(
        extent.map(([lng, lat]) => [lat, lng]),
        { color }
      )
    : undefined;
}
