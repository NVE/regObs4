import { inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { AttachmentViewModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { ObservationImageCarouselComponent } from './observation-image-carousel.component';

export function injectImageCarousel() {
  const modalController = inject(ModalController);

  return {
    open: async (index: number, attachments: AttachmentViewModel[], registration: RegistrationViewModel) => {
      const modal = await modalController.create({
        component: ObservationImageCarouselComponent,
        cssClass: 'fullscreen-modal',
        componentProps: {
          attachmentIndex: index,
          attachments,
          registration,
        },
      });
      await modal.present();
    },
  };
}
