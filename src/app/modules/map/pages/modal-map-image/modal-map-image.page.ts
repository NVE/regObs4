import { Component, Input } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-map-image',
  templateUrl: './modal-map-image.page.html',
  styleUrls: ['./modal-map-image.page.scss'],
})
export class ModalMapImagePage {
  @Input() location: { latLng: L.LatLng; geoHazard: GeoHazard };

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
