import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { IonChip, IonIcon, IonLabel, ModalController } from '@ionic/angular/standalone';
import { AttachmentViewModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { addIcons } from 'ionicons';
import {
  calendarNumberOutline,
  chatbubbleEllipses,
  locationOutline,
  peopleCircleOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  getAllAttachmentsFromViewModel,
  getAttachmentsFromRegistrationViewModel,
} from 'src/app/modules/common-registration/registration.helpers';
import { debounceTime, Subject } from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { RegistrationHeaderComponent } from '../registration-header/registration-header.component';
import { injectImageCarousel } from '../observation-image-carousel/inject-image-carousel';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { getSummaries, getSummaryHeader } from '../summary/get-summary-input';
import { SummaryComponent } from '../summary/summary.component';
import { ObserverChipComponent } from '../observer-chip/observer-chip.component';
import { IceThicknessViewComponent } from '../registrations/ice-thickness-view/ice-thickness-view.component';
import { AvalancheProblemsViewComponent } from '../registrations/avalanche-problem-view/avalanche-problems-view.component';
import { AvalancheEvaluationViewComponent } from '../registrations/avalanche-evaluation-view/avalanche-evaluation-view.component';
import { AvalancheActivitesViewComponent } from '../registrations/avalanche-activity-view/avalanche-activities-view.component';
import { ObservationActionsComponent } from '../observation-actions/observation-actions.component';
import { ObservationLocationMapComponent } from '../observation-location-map/observation-location-map.component';
import { GeohazardChipComponent } from '../geohazard-chip/geohazard-chip.component';

const DEBUG_TAG = 'ObservationComponent';

@Component({
  selector: 'app-observation',
  imports: [
    IonChip,
    IonIcon,
    IonLabel,
    DatePipe,
    GeohazardChipComponent,
    TranslatePipe,
    RegistrationHeaderComponent,
    SummaryComponent,
    ObserverChipComponent,
    ObservationLocationMapComponent,
    IceThicknessViewComponent,
    AvalancheActivitesViewComponent,
    AvalancheProblemsViewComponent,
    AvalancheEvaluationViewComponent,
    ObservationActionsComponent,
  ],
  templateUrl: './observation.component.html',
  styleUrl: './observation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ObservationComponent implements AfterViewInit, OnDestroy {
  private logger = inject(LoggingService);
  private translateService = inject(TranslateService);
  private elementRef = inject(ElementRef);
  private imageCarousel = injectImageCarousel();
  private intersectionObserver?: IntersectionObserver;

  modalController = inject(ModalController);

  readonly registration = input.required<RegistrationViewModel>();
  savedTime = computed(() => this.registration().DtChangeTime || this.registration().DtRegTime);
  attachments = computed(() => getAllAttachmentsFromViewModel(this.registration()));

  constructor() {
    addIcons({
      calendarNumberOutline,
      locationOutline,
      personCircleOutline,
      peopleCircleOutline,
      chatbubbleEllipses,
    });
  }

  // For å håndtere veldig kjapp scrolling oppover sluser vi eventene via en subject med en debounce
  // Da vil forhåpentligvis de observasjonskortene som bare scrolles superkjapt forbi ikke rendre swiper
  // i det hele tatt.
  // Etter å ha lagt til dette fikk jeg ikke lenger sporadiske kræsj ved superhurtig scrolling,
  // men bør sikkert testes mer.
  private isVisible$ = new Subject<boolean>();
  isVisible = toSignal(this.isVisible$.pipe(debounceTime(100)), { initialValue: false });

  ngAfterViewInit(): void {
    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        this.isVisible$.next(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect(); // Vet ikke om denne er nødvendig
  }

  setFallbackImage(attachment: AttachmentViewModel) {
    if (!attachment.UrlFormats) {
      return;
    }

    // Raw bildene prosesseres ikke - har ikke vannmerke.
    // De bør derfor kunne hentes med en gang observasjonen har blitt sendt inn.
    // Prøv derfor først å hente de hvis Large har feila.
    if (attachment.UrlFormats.Large !== attachment.UrlFormats.Raw) {
      this.logger.log('Loading image failed, trying Raw', null, LogLevel.Warning, DEBUG_TAG, {
        id: attachment.AttachmentId,
        img: attachment.UrlFormats.Large,
        raw: attachment.UrlFormats.Raw,
      });
      attachment.UrlFormats.Large = attachment.UrlFormats.Raw;
    } else {
      this.logger.log('Loading image failed, setting fallback img', null, LogLevel.Error, DEBUG_TAG, {
        id: attachment.AttachmentId,
        img: attachment.UrlFormats.Large,
      });
      attachment.UrlFormats.Large = 'assets/images/broken-image-w-bg.svg';
      attachment.Alt = this.translateService.instant('REGISTRATION.COULD_NOT_DOWNLOAD_IMAGE');
    }
  }

  async openImageCarousel(index: number) {
    await this.imageCarousel.open(index, this.attachments(), this.registration());
  }

  hasData(data: unknown) {
    return !isEmpty(data);
  }

  RegistrationTid = RegistrationTid;

  getSummaries(registration: RegistrationViewModel, tid: RegistrationTid) {
    return getSummaries(registration, tid);
  }

  getAttachments(registration: RegistrationViewModel, tid: RegistrationTid) {
    return getAttachmentsFromRegistrationViewModel(registration, tid);
  }

  getSummaryHeader(registration: RegistrationViewModel, tid: RegistrationTid) {
    return getSummaryHeader(registration, tid);
  }
}
