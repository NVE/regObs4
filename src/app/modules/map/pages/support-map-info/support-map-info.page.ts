import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { HeaderColorDirective } from '../../../shared/directives/header-color/header-color.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-support-map-info',
  templateUrl: './support-map-info.page.html',
  styleUrls: ['./support-map-info.page.scss'],
  imports: [IonicModule, HeaderColorDirective, TranslateModule],
})
export class SupportMapInfoPage {
  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
