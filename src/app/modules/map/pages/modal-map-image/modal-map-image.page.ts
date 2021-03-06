import { Component, OnInit, Input } from '@angular/core';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-map-image',
  templateUrl: './modal-map-image.page.html',
  styleUrls: ['./modal-map-image.page.scss']
})
export class ModalMapImagePage implements OnInit {
  @Input() location: { latLng: L.LatLng; geoHazard: GeoHazard };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }
}
