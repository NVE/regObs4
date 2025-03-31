/** Viser bilde fra obskort i full skjerm */
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { IonIcon, ModalController } from '@ionic/angular/standalone';
import { AttachmentViewModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { SwiperContainer } from 'swiper/element';
import { addIcons } from 'ionicons';
import { close, downloadOutline, openOutline } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { KeyValueComponent } from '../key-value/key-value.component';

@Component({
  selector: 'app-observation-image-carousel',
  templateUrl: './observation-image-carousel.component.html',
  styleUrls: ['./observation-image-carousel.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonIcon, TranslatePipe, DatePipe, KeyValueComponent],
})
export class ObservationImageCarouselComponent {
  readonly swiper = viewChild<ElementRef<SwiperContainer>>('swiper');
  private modalController = inject(ModalController);
  clickedAttachmentIndex = model<number>(0);
  allAttachments = input<AttachmentViewModel[]>([]);
  registration = input<RegistrationViewModel>();

  constructor() {
    addIcons({ close, downloadOutline, openOutline });
  }

  currentAttachmentData = computed(() => this.allAttachments()?.[this.clickedAttachmentIndex()]);

  closeModal() {
    this.modalController.dismiss();
  }

  onSlideChange(e: Event) {
    const customEvent = e as CustomEvent;
    const activeIndex = customEvent.detail[0].activeIndex;
    this.clickedAttachmentIndex.set(activeIndex);
  }

  ngAfterViewInit() {
    this.swiper()?.nativeElement.swiper.slideTo(this.clickedAttachmentIndex());
  }
}
