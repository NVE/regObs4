import { Component, Input } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ModalController, IonicModule } from '@ionic/angular';
import { MapImageComponent } from '../../../map-image/map-image.component';

@Component({
  selector: 'app-modal-map-image',
  templateUrl: './modal-map-image.page.html',
  styleUrls: ['./modal-map-image.page.scss'],
  imports: [IonicModule, MapImageComponent],
})
export class ModalMapImagePage {
  @Input() location: { latLng: L.LatLng; geoHazard: GeoHazard };

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
