import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-support-map-info',
  templateUrl: './support-map-info.page.html',
  styleUrls: ['./support-map-info.page.scss']
})
export class SupportMapInfoPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }
}
