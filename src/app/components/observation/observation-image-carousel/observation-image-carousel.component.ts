/** Viser bilde fra obskort i full skjerm */
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  input,
  linkedSignal,
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
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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
  attachments = input<(AttachmentViewModel & { Href?: string })[]>([]);
  settings = inject(UserSettingService);
  isDesktop = inject(BreakpointService).isDesktop;

  registration = input<RegistrationViewModel>();
  attachmentIndex = model<number>(0);

  private plotApi = toSignal(this.settings.appMode$.pipe(map((x) => settings.services.regObs.plotUrl[x])), {
    initialValue: settings.services.regObs.plotUrl.PROD,
  });

  private preferredProfileType = computed(() => {
    if (this.isDesktop()) {
      return 'SimpleProfile';
    }

    return 'MobileProfile';
  });

  snowProfileUrl = linkedSignal(() => {
    return `${this.plotApi()}/SnowProfile/svg/${this.registration()?.RegId}/${this.preferredProfileType()}?lastMod=${this.registration()?.DtChangeTime}`;
  });

  useFallbackSnowProfileImage(attachment: AttachmentViewModel) {
    this.snowProfileUrl.set(attachment.Url as string);
  }

  roundedDownOrientationValue = computed(() => {
    const aspectValue = this.currentAttachmentData().Aspect; //256
    if (!aspectValue) return '';
    const roundedDownOrientation = getRoundedDownOrientationValue(aspectValue);
    if (!roundedDownOrientation) return '';
    return settings.orientation[roundedDownOrientation];
  });

  currentAttachmentData = computed(() => this.attachments()?.[this.attachmentIndex()]);
  comment = computed(() => {
    if (this.currentAttachmentData().Comment) {
      return this.currentAttachmentData().Comment;
    }

    if (this.isAttachmentSnowProfile(this.currentAttachmentData())) {
      return this.registration()?.SnowProfile2?.Comment;
    }

    return undefined;
  });

  constructor() {
    addIcons({ close, downloadOutline, openOutline });
  }

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

  isAttachmentSnowProfile(attachment: AttachmentViewModel & { Href?: string }) {
    return !!attachment.Href;
  }
}
