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
import { IonFabButton, IonIcon, ModalController, IonChip } from '@ionic/angular/standalone';
import { AttachmentViewModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { SwiperContainer } from 'swiper/element';
import { addIcons } from 'ionicons';
import { close, downloadOutline, openOutline, eyeOutline } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { KeyValueComponent } from '../key-value/key-value.component';
import { settings } from 'src/settings';
import { getRoundedDownOrientationValue } from 'src/app/utils/getRoundedDownOrientationValue';
import { PlotService } from 'src/app/core/services/plot.service';
import { Router, RouterLink } from '@angular/router';
import { ObservationImageComponent } from './observation-image.component';

@Component({
  selector: 'app-observation-image-carousel',
  templateUrl: './observation-image-carousel.component.html',
  styleUrls: ['./observation-image-carousel.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonIcon,
    IonFabButton,
    TranslatePipe,
    DatePipe,
    KeyValueComponent,
    RouterLink,
    IonChip,
    ObservationImageComponent,
  ],
})
export class ObservationImageCarouselComponent {
  readonly swiper = viewChild<ElementRef<SwiperContainer>>('swiper');
  private modalController = inject(ModalController);
  private router = inject(Router);
  isImageListView = computed(() => this.router.url.includes('search/pictures'));
  attachments = input<(AttachmentViewModel & { Href?: string })[]>([]);
  plotService = inject(PlotService);

  registration = input<RegistrationViewModel>();
  attachmentIndex = model<number>(0);

  roundedDownOrientationValue = computed(() => {
    const aspectValue = this.currentAttachmentData().Aspect; //256
    if (!aspectValue) return '';
    const roundedDownOrientation = getRoundedDownOrientationValue(aspectValue);
    if (!roundedDownOrientation) return '';
    return settings.orientation[roundedDownOrientation];
  });

  currentAttachmentData = computed(() => this.attachments()?.[this.attachmentIndex()]);

  comment = computed(() => {
    // Prioriter kommentar fra bilde dersom det er lagt til
    if (this.currentAttachmentData().Comment) {
      return this.currentAttachmentData().Comment;
    }

    // Vis kommentar fra snøprofil-skjema dersom det finnes
    if (this.currentAttachmentData().Href) {
      return this.registration()?.SnowProfile2?.Comment;
    }

    return undefined;
  });

  constructor() {
    addIcons({ close, downloadOutline, openOutline, eyeOutline });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  setCurrentSlideIndex(e: Event) {
    const customEvent = e as CustomEvent;
    const activeIndex = customEvent.detail[0].activeIndex;
    this.attachmentIndex.set(activeIndex);
    this;
  }

  ngAfterViewInit() {
    this.swiper()?.nativeElement.swiper.slideTo(this.attachmentIndex());
  }
}
