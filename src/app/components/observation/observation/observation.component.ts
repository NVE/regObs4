import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  signal,
  Signal,
} from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { addIcons } from 'ionicons';
import {
  calendarNumberOutline,
  chatbubbleEllipses,
  locationOutline,
  peopleCircleOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { DatePipe } from '@angular/common';
import { getIconForGeohazards } from 'src/app/modules/shared/components/geo-icon/get-geo-icon';
import { GeoHelperService } from 'src/app/modules/shared/services/geo-helper/geo-helper.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { StaticMapImageComponent } from 'src/app/modules/static-map-image/static-map-image.component';
import { ImageLocation } from '../../img-swiper/image-location.model';
import L from 'leaflet';
import { getAllAttachmentsFromViewModel } from 'src/app/modules/common-registration/registration.helpers';

@Component({
  selector: 'app-observation',
  imports: [
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonIcon,
    IonLabel,
    DatePipe,
    TranslatePipe,
    StaticMapImageComponent,
  ],
  templateUrl: './observation.component.html',
  styleUrl: './observation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ObservationComponent {
  registration = input.required<RegistrationViewModel>();
  dateClicked = signal(false);
  savedTime = computed(() => this.registration().DtChangeTime || this.registration().DtRegTime);
  geoIcon = computed(() => getIconForGeohazards([this.registration().GeoHazardTID]));
  geoName = getNameForGeohazard(this.registration);
  location = computed(() => getLocation(this.registration()));
  attachments = computed(() => getAllAttachmentsFromViewModel(this.registration()));

  constructor() {
    addIcons({
      calendarNumberOutline,
      locationOutline,
      personCircleOutline,
      peopleCircleOutline,
      chatbubbleEllipses,
    });
  }
}

function getNameForGeohazard(registration: Signal<RegistrationViewModel>) {
  const helper = inject(GeoHelperService);

  const nameResource = rxResource({
    request: () => [registration().GeoHazardTID],
    loader: ({ request: geohazards }) => helper.getName(geohazards),
  });

  return nameResource.value.asReadonly();
}

function getLocation(obs: RegistrationViewModel): ImageLocation {
  return {
    latLng: L.latLng(obs.ObsLocation.Latitude, obs.ObsLocation.Longitude),
    geoHazard: obs.GeoHazardTID,
    // startStopLocation: this.getStartStopLocation(obs),
    // damageLocations: this.getDamagePositions(obs),
  };
}
