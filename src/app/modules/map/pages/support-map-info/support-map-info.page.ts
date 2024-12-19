import { Component } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { HeaderColorDirective } from '../../../shared/directives/header-color/header-color.directive';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-support-map-info',
  templateUrl: './support-map-info.page.html',
  styleUrls: ['./support-map-info.page.scss'],
  imports: [HeaderColorDirective, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, TranslatePipe],
})
export class SupportMapInfoPage {
  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
