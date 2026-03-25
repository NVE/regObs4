import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { IonChip, IonIcon, IonLabel, ModalController } from '@ionic/angular/standalone';
import { AttachmentViewModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { addIcons } from 'ionicons';
import {
  calendarNumberOutline,
  chatbubbleEllipses,
  createOutline,
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
import { SnowProfileComponent } from '../../snow-profile/snow-profile.component';
import { CarouselItems } from '../observation-image-carousel/models';

const DEBUG_TAG = 'ObservationComponent';
const isVisibleInitialValue = CSS.supports('content-visibility: auto') ? false : true;

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
    SnowProfileComponent,
  ],
  templateUrl: './observation.component.html',
  styleUrl: './observation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    // Eventen trigges når browseren mener komponenten begynner å bli relevant for brukeren (skipped=false),
    // eller slutter å være relevant (skipped=true).
    // For å unngå å hente/rendre snøprofiler og bildekarusell for tidlig bruker vi denne eventen for å
    // kun rendre innholdet når det er relevant.
    // Dette er et alternativ til IntersectionObserver som vi brukte før.
    '(contentvisibilityautostatechange)': 'visibilityChange($event)',
  },
})
export class ObservationComponent {
  private logger = inject(LoggingService);
  private translateService = inject(TranslateService);
  private imageCarousel = injectImageCarousel();

  modalController = inject(ModalController);

  readonly registration = input.required<RegistrationViewModel>();
  hasSnowProfile = computed(() => {
    const snowProfileForm = this.registration().SnowProfile2;
    if (snowProfileForm == null) {
      return false;
    }
    return snowProfileForm.StratProfile?.Layers?.at(0) != null;
  });
  showChangedTime = computed(() => {
    const { DtChangeTime, DtRegTime } = this.registration();
    if (DtChangeTime == null) {
      return false;
    }
    if (DtChangeTime === DtRegTime) {
      return false;
    }
    return true;
  });
  attachments = computed(() =>
    getAllAttachmentsFromViewModel(this.registration()).filter((a) => a.IsSnowProfilePlot != true)
  );

  constructor() {
    addIcons({
      calendarNumberOutline,
      locationOutline,
      personCircleOutline,
      peopleCircleOutline,
      chatbubbleEllipses,
      createOutline,
    });
  }

  visibilityChange(event: Event) {
    const skipped = (event as ContentVisibilityAutoStateChangeEvent).skipped;
    if (skipped === false) {
      this.isVisible$.next(true);
    } else {
      this.isVisible$.next(false);
    }
  }

  // For å håndtere veldig kjapp scrolling oppover sluser vi eventene via en subject med en debounce
  // Da vil forhåpentligvis de bildekarusellene som bare scrolles superkjapt forbi ikke rendre swiper
  // i det hele tatt.
  // Etter å ha lagt til dette fikk jeg ikke lenger sporadiske kræsj ved superhurtig scrolling,
  // men bør sikkert testes mer.
  private isVisible$ = new Subject<boolean>();
  isVisible = toSignal(this.isVisible$.pipe(debounceTime(100)), { initialValue: isVisibleInitialValue });

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
    let items: CarouselItems = this.attachments()
      .filter((x) => !x.IsSnowProfilePlot) // Bruk ny snøprofil-komponent, ikke vis genererte bilder
      .map((data) => ({ type: 'Attachment', data }));
    if (this.hasSnowProfile()) {
      items = [{ type: 'SnowProfile' }, ...items];
    }

    await this.imageCarousel.open(index, items, this.registration());
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
