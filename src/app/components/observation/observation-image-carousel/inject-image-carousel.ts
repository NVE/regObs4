import { inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { ObservationImageCarouselComponent } from './observation-image-carousel.component';
import { CarouselItems } from './models';

export function injectImageCarousel() {
  const modalController = inject(ModalController);

  return {
    open: async (index: number, items: CarouselItems, registration: RegistrationViewModel) => {
      const modal = await modalController.create({
        component: ObservationImageCarouselComponent,
        cssClass: 'fullscreen-modal',
        componentProps: {
          index,
          items,
          registration,
        },
      });
      await modal.present();
    },
  };
}
