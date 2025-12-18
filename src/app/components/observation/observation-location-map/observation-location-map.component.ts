import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { featureCollection, lineString, point, polygon } from '@turf/turf';
import { Feature, FeatureCollection, Geometry, Point } from 'geojson';
import L from 'leaflet';
import { GeoHazard } from 'src/app/modules/common-core/models';
import {
  AvalancheObsViewModel,
  DamageObsViewModel,
  LandslideViewModel,
  RegistrationViewModel,
} from 'src/app/modules/common-regobs-api';
import { RegobsGeoHazardMarker } from 'src/app/modules/map/core/classes/regobs-geohazard-marker';
import { ModalMapImagePage } from 'src/app/modules/map/pages/modal-map-image/modal-map-image.page';
import { StaticMapImageComponent } from 'src/app/modules/static-map-image/static-map-image.component';
import { settings } from 'src/settings';

export const START_ICON = '/assets/icon/map/GPS_start.svg';
export const END_ICON = '/assets/icon/map/GPS_stop.svg';
export const DAMAGE_ICON = '/assets/icon/map/damage-location.svg';

/**
 * Viser lokasjonen til observasjonen i et statisk kartbilde.
 * Når du trykker på kartet vises en modal med et interaktivt kart
 */
@Component({
  selector: 'app-observation-location-map',
  imports: [StaticMapImageComponent],
  template: `<app-static-map-image
    [featureCollection]="featureCollection()"
    [geoHazard]="registration().GeoHazardTID"
    (click)="openMapModal()"
  ></app-static-map-image>`,
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
  translations = inject(TranslateService);

  registration = input.required<RegistrationViewModel>();
  modalController = inject(ModalController);
  featureCollection = computed(() => getGeojson(this.registration()));

  async openMapModal() {
    const fc = this.featureCollection();
    const geojson = getGeojsonLayer(fc, this.registration(), this.translations);
    const modal = await this.modalController.create({
      component: ModalMapImagePage,
      componentProps: {
        geojson,
      },
    });
    modal.present();
  }
}

interface FeatureProperties {
  type:
    | 'ObsLocation'
    | 'AvalancheStart'
    | 'AvalancheStop'
    | 'AvalancheExtent'
    | 'AvalancheExtentStart'
    | 'AvalancheExtentStop'
    | 'AvalancheStartStopLine'
    | 'WaterLevelExtent'
    | 'DamagePos';
}

function getGeojson(obs: RegistrationViewModel): FeatureCollection<Geometry, FeatureProperties> {
  const features: Feature<Geometry, FeatureProperties>[] = [
    point([obs.ObsLocation.Longitude, obs.ObsLocation.Latitude], {
      type: 'ObsLocation',
    }),
  ];

  if (obs.AvalancheObs) {
    features.push(...getAvalancheFeatures(obs.AvalancheObs));
  }

  if (obs.LandSlideObs) {
    features.push(...getAvalancheFeatures(obs.LandSlideObs));
  }

  if (obs.WaterLevel2?.Extent) {
    features.push(
      polygon([obs.WaterLevel2.Extent], {
        type: 'WaterLevelExtent',
      })
    );
  }

  if (obs.DamageObs) {
    features.push(...getDamageFeatures(obs.DamageObs));
  }

  return featureCollection(features);
}

function getGeojsonLayer(
  fc: FeatureCollection<Geometry, FeatureProperties>,
  obs: RegistrationViewModel,
  translations: TranslateService
): L.GeoJSON {
  return L.geoJSON(fc, {
    pointToLayer: (point: Feature<Point, FeatureProperties>, latlng) => {
      if (point.properties.type === 'ObsLocation') {
        return L.marker(latlng, {
          icon: new RegobsGeoHazardMarker(obs.GeoHazardTID),
          interactive: false,
        });
      }

      if (point.properties.type === 'AvalancheStart') {
        return L.marker(latlng, {
          icon: createStartStopIcon(START_ICON),
          interactive: false,
        });
      }

      if (point.properties.type === 'AvalancheStop') {
        return L.marker(latlng, {
          icon: createStartStopIcon(END_ICON),
          interactive: false,
        });
      }

      if (point.properties.type === 'DamagePos') {
        return L.marker(latlng, {
          icon: createDamageIcon(),
          interactive: false,
        });
      }

      // Default
      return L.marker(latlng);
    },

    // Function for styling lines and polygons
    style: (feature) => {
      if (!feature) {
        return {};
      }

      if (feature.properties.type === 'AvalancheStartStopLine') {
        return {
          color: 'red',
          weight: 6,
          opacity: 0.9,
          interactive: false,
        };
      }

      if (feature.properties.type === 'AvalancheExtent') {
        return { color: settings.map.extentColor };
      }

      if (feature.properties.type === 'AvalancheExtentStart') {
        return { color: settings.map.startExtentColor };
      }

      if (feature.properties.type === 'AvalancheExtentStop') {
        return { color: settings.map.endExtentColor };
      }

      if (feature.properties.type === 'WaterLevelExtent') {
        return { color: settings.map.extentColor };
      }

      return {};
    },

    onEachFeature: (feature, layer) => {
      if (feature.properties.type === 'AvalancheExtent' && obs.GeoHazardTID === GeoHazard.Snow) {
        layer.bindTooltip(translations.instant('REGISTRATION.SNOW.AVALANCHE_OBS.AVALANCHE_AREA'));
      } else if (feature.properties.type === 'AvalancheExtent' && obs.GeoHazardTID === GeoHazard.Soil) {
        layer.bindTooltip(translations.instant('REGISTRATION.DIRT.LAND_SLIDE_OBS.AREA_TOTAL'));
      } else if (feature.properties.type === 'AvalancheExtent' && obs.GeoHazardTID === GeoHazard.Water) {
        layer.bindTooltip(translations.instant('REGISTRATION.WATER.WATER_LEVEL.FLOOD_AREA'));
      } else if (feature.properties.type === 'AvalancheExtentStart') {
        layer.bindTooltip(translations.instant('REGISTRATION.SNOW.AVALANCHE_OBS.AREA_START'));
      } else if (feature.properties.type === 'AvalancheExtentStop') {
        layer.bindTooltip(translations.instant('REGISTRATION.SNOW.AVALANCHE_OBS.AREA_END'));
      }
    },
  });
}

function getAvalancheFeatures(obs: AvalancheObsViewModel | LandslideViewModel) {
  const features: Feature<Geometry, FeatureProperties>[] = [];

  // Start
  let start: number[] | undefined;
  if (obs.StartLat && obs.StartLong) {
    start = [obs.StartLong, obs.StartLat];
    features.push(
      point(start, {
        type: 'AvalancheStart',
      })
    );
  }

  // Stop
  let stop: number[] | undefined;
  if (obs.StopLat && obs.StopLong) {
    stop = [obs.StopLong, obs.StopLat];
    features.push(
      point(stop, {
        type: 'AvalancheStop',
      })
    );
  }

  // Line from start to stop
  if (start && stop) {
    features.push(
      lineString([start, stop], {
        type: 'AvalancheStartStopLine',
      })
    );
  }

  // Polygons for avalanche
  if (obs.Extent) {
    features.push(
      polygon([obs.Extent], {
        type: 'AvalancheExtent',
      })
    );
  }
  if (obs.StartExtent) {
    features.push(
      polygon([obs.StartExtent], {
        type: 'AvalancheExtentStart',
      })
    );
  }
  if (obs.StopExtent) {
    features.push(
      polygon([obs.StopExtent], {
        type: 'AvalancheExtentStop',
      })
    );
  }

  return features;
}

function getDamageFeatures(obs: DamageObsViewModel[]) {
  const features: Feature<Geometry, FeatureProperties>[] = [];

  for (const dPos of obs.map((x) => x.DamagePosition)) {
    if (dPos?.Latitude && dPos?.Longitude) {
      features.push(
        point([dPos.Longitude, dPos.Latitude], {
          type: 'DamagePos',
        })
      );
    }
  }

  return features;
}

function createStartStopIcon(iconUrl: string) {
  return L.icon({
    iconUrl,
    iconSize: [27, 42],
    iconAnchor: [13.5, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
}

function createDamageIcon() {
  return L.icon({
    iconUrl: DAMAGE_ICON,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
}
