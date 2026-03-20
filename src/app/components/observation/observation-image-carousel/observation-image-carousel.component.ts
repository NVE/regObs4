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
  ChangeDetectionStrategy,
} from '@angular/core';
import { IonFabButton, IonIcon, ModalController, IonChip } from '@ionic/angular/standalone';
import { AttachmentViewModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { SwiperContainer } from 'swiper/element';
import { addIcons } from 'ionicons';
import { close, downloadOutline, openOutline, eyeOutline } from 'ionicons/icons';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { KeyValueComponent } from '../key-value/key-value.component';
import { settings } from 'src/settings';
import { getRoundedDownOrientationValue } from 'src/app/utils/getRoundedDownOrientationValue';
import { Router, RouterLink } from '@angular/router';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { CarouselItems } from './models';
import { SnowProfileComponent } from '../../snow-profile/snow-profile.component';

const DEBUG_TAG = 'ImageCarousel';

@Component({
  selector: 'app-observation-image-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    SnowProfileComponent,
  ],
})
export class ObservationImageCarouselComponent {
  readonly swiper = viewChild<ElementRef<SwiperContainer>>('swiper');
  private modalController = inject(ModalController);
  private router = inject(Router);
  private logger = inject(LoggingService);
  translateService = inject(TranslateService);

  registration = input.required<RegistrationViewModel>();
  items = input<CarouselItems>([]);
  index = model<number>(0);

  private snowProfile = viewChild(SnowProfileComponent);
  layerComments = computed(() => this.snowProfile()?.comments());
  showsComments = computed(() => !!this.snowProfile()?.showComments());

  isImageListView = computed(() => this.router.url.includes('search/pictures'));
  roundedDownOrientationValue = computed(() => {
    const item = this.currentItem();
    if (item.type === 'SnowProfile') {
      return '';
    }
    const aspectValue = item.data.Aspect; //256
    if (!aspectValue) return '';
    const roundedDownOrientation = getRoundedDownOrientationValue(aspectValue);
    if (!roundedDownOrientation) return '';
    return settings.orientation[roundedDownOrientation];
  });

  currentItem = computed(() => this.items()[this.index()]);

  constructor() {
    addIcons({ close, downloadOutline, openOutline, eyeOutline });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  setCurrentSlideIndex(e: Event) {
    const customEvent = e as CustomEvent;
    const activeIndex = customEvent.detail[0].activeIndex;
    this.index.set(activeIndex);
  }

  ngAfterViewInit() {
    this.swiper()?.nativeElement.swiper.slideTo(this.index());
  }

  setFallbackImage(attachment: AttachmentViewModel) {
    // Raw bildene prosesseres ikke - har ikke vannmerke.
    // De bør derfor kunne hentes med en gang observasjonen har blitt sendt inn.
    // Prøv derfor først å hente de hvis Large har feila.
    if (attachment.UrlFormats && attachment.Url !== attachment.UrlFormats.Raw) {
      this.logger.log('Image loading failed. Will try Raw.', null, LogLevel.Warning, DEBUG_TAG, {
        id: attachment.AttachmentId,
        img: attachment.Url,
        raw: attachment.UrlFormats.Raw,
      });
      attachment.Url = attachment.UrlFormats.Raw;
      return;
    }

    this.logger.error(null, DEBUG_TAG, 'Image loading failed. Will set fallback', {
      id: attachment.AttachmentId,
      img: attachment.Url,
    });

    attachment.Url = 'assets/images/broken-image-w-bg.svg';
    attachment.Alt = this.translateService.instant('REGISTRATION.COULD_NOT_DOWNLOAD_IMAGE');
  }
}
