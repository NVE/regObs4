import { Component, Input } from '@angular/core';
import { LoggingService } from '../../../services/logging/logging.service';
import { SearchRegistrationsWithAttachments } from 'src/app/modules/common-regobs-api/models/search-registrations-with-attachments';
import { ModalController } from '@ionic/angular';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';
import { FullscreenImageModalPage } from 'src/app/pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.page';
import { HasRegId } from 'src/app/modules/common-registration/registration.helpers';

@Component({
  selector: 'app-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss'],
})
export class ImagesGridComponent {
  @Input() attachments: SearchRegistrationsWithAttachments[];

  constructor(private logger: LoggingService, private modalController: ModalController) {}

  trackById(_, obs: HasRegId) {
    return obs ? obs.RegId : undefined;
  }

  async openImage(index: number, attachments: AttachmentViewModel[], regId: number): Promise<void> {
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      cssClass: 'modal-fullscreen',
      componentProps: {
        allImages: attachments,
        imgIndex: index,
        href: { title: 'REGISTRATION.GO_TO', url: `registration/${regId}` },
      },
    });
    modal.present();
  }
}
