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
import { IonFabButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { AttachmentViewModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { SwiperContainer } from 'swiper/element';
import { addIcons } from 'ionicons';
import { close, downloadOutline, openOutline } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { KeyValueComponent } from '../key-value/key-value.component';
import { settings } from 'src/settings';
import { getRoundedDownOrientationValue } from 'src/app/utils/getRoundedDownOrientationValue';

@Component({
  selector: 'app-observation-image-carousel',
  templateUrl: './observation-image-carousel.component.html',
  styleUrls: ['./observation-image-carousel.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonIcon, IonFabButton, TranslatePipe, DatePipe, KeyValueComponent],
})
export class ObservationImageCarouselComponent {
  readonly swiper = viewChild<ElementRef<SwiperContainer>>('swiper');
  private modalController = inject(ModalController);
  attachmentIndex = model<number>(0);
  attachments = input<AttachmentViewModel[]>([]);
  registration = input<RegistrationViewModel>();
  constructor() {
    addIcons({ close, downloadOutline, openOutline });
  }

  roundedDownOrientationValue = computed(() => {
    const aspectValue = this.currentAttachmentData().Aspect; //256
    if (!aspectValue) return '';
    const roundedDownOrientation = getRoundedDownOrientationValue(aspectValue);
    if (!roundedDownOrientation) return '';
    return settings.orientation[roundedDownOrientation];
  });
  currentAttachmentData = computed(() => this.attachments()?.[this.attachmentIndex()]);

  closeModal() {
    this.modalController.dismiss();
  }

  setCurrentSlideIndex(e: Event) {
    const customEvent = e as CustomEvent;
    const activeIndex = customEvent.detail[0].activeIndex;
    this.attachmentIndex.set(activeIndex);
  }

  ngAfterViewInit() {
    this.swiper()?.nativeElement.swiper.slideTo(this.attachmentIndex());
  }
}
