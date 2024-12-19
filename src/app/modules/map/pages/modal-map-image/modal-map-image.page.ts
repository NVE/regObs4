import { Component, Input, inject } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { IonContent, IonFabButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { MapImageComponent } from '../../../map-image/map-image.component';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-modal-map-image',
  templateUrl: './modal-map-image.page.html',
  styleUrls: ['./modal-map-image.page.scss'],
  imports: [IonContent, IonFabButton, IonIcon, MapImageComponent],
})
export class ModalMapImagePage {
  private modalController = inject(ModalController);

  @Input() location: { latLng: L.LatLng; geoHazard: GeoHazard };

  constructor() {
    addIcons({ close });
  }

  close() {
    this.modalController.dismiss();
  }
}
