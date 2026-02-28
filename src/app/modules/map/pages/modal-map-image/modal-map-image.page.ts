import { Component, inject, input , ChangeDetectionStrategy } from '@angular/core';
import { IonContent, IonFabButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { MapImageComponent } from '../../../map-image/map-image.component';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { ImageLocation } from '../../../../core/models/image-location.model';

@Component({
  selector: 'app-modal-map-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-map-image.page.html',
  styleUrls: ['./modal-map-image.page.scss'],
  imports: [IonContent, IonFabButton, IonIcon, MapImageComponent],
})
export class ModalMapImagePage {
  private modalController = inject(ModalController);

  readonly location = input.required<ImageLocation>();

  constructor() {
    addIcons({ close });
  }

  close() {
    this.modalController.dismiss();
  }
}
