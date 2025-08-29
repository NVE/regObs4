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
import { IonChip, IonIcon, IonLabel, ModalController, ToastController } from '@ionic/angular/standalone';
import {
  AttachmentViewModel,
  AvalancheObsViewModel,
  LandslideViewModel,
  RegistrationViewModel,
} from 'src/app/modules/common-regobs-api';
import { addIcons } from 'ionicons';
import {
  eyeOutline,
  calendarNumberOutline,
  chatbubbleEllipses,
  locationOutline,
  peopleCircleOutline,
  personCircleOutline,
  createOutline,
  shareSocial,
} from 'ionicons/icons';
import { Clipboard } from '@capacitor/clipboard';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { StaticMapImageComponent } from 'src/app/modules/static-map-image/static-map-image.component';
import { ImageLocation, ImageLocationStartStop } from '../../../core/models/image-location.model';
import L from 'leaflet';
import {
  getAllAttachmentsFromViewModel,
  getAttachmentsFromRegistrationViewModel,
} from 'src/app/modules/common-registration/registration.helpers';
import { debounceTime, firstValueFrom, Subject } from 'rxjs';
import { RouterLink } from '@angular/router';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { AnalyticService } from 'src/app/modules/analytics/services/analytic.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { settings } from 'src/settings';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { AppEventCategory } from 'src/app/modules/analytics/enums/app-event-category.enum';
import { AppEventAction } from 'src/app/modules/analytics/enums/app-event-action.enum';
import { ModalMapImagePage } from 'src/app/modules/map/pages/modal-map-image/modal-map-image.page';
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
import { RegistrationEditButtonComponent } from 'src/app/components/observation/registration-edit-button/registration-edit-button.component';

const DEBUG_TAG = 'ObservationComponent';

@Component({
  selector: 'app-observation',
  imports: [
    IonChip,
    IonIcon,
    IonLabel,
    DatePipe,
    TranslatePipe,
    RouterLink,
    StaticMapImageComponent,
    RegistrationHeaderComponent,
    SummaryComponent,
    ObserverChipComponent,
    IceThicknessViewComponent,
    AvalancheActivitesViewComponent,
    AvalancheProblemsViewComponent,
    AvalancheEvaluationViewComponent,
    RegistrationEditButtonComponent,
  ],
  templateUrl: './observation.component.html',
  styleUrl: './observation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ObservationComponent implements AfterViewInit, OnDestroy {
  private userSettingService = inject(UserSettingService);
  private analyticService = inject(AnalyticService);
  private logger = inject(LoggingService);
  private toastController = inject(ToastController);
  private translateService = inject(TranslateService);
  private elementRef = inject(ElementRef);
  private imageCarousel = injectImageCarousel();
  modalController = inject(ModalController);

  readonly registration = input.required<RegistrationViewModel>();
  savedTime = computed(() => this.registration().DtChangeTime || this.registration().DtRegTime);
  location = computed(() => getLocation(this.registration()));
  attachments = computed(() => getAllAttachmentsFromViewModel(this.registration()));

  private async canShareNative(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      return false;
    }
    const canShareResult = await Share.canShare();
    return canShareResult.value;
  }
  private userSettings = toSignal(this.userSettingService.userSetting$, { requireSync: true });
  private baseUrl = settings.services.regObs.webUrl[this.userSettings().appMode];
  private registrationUrl = computed(() => `${this.baseUrl}/Registration/${this.registration().RegId}`);
  private intersectionObserver?: IntersectionObserver;

  async share(): Promise<void> {
    const url = this.registrationUrl();
    this.analyticService.trackEvent(
      AppEventCategory.Observations,
      AppEventAction.Share,
      url,
      this.registration().RegId
    );
    if (await this.canShareNative()) {
      Share.share({
        url,
      });
    } else {
      Clipboard.write({ string: url });
      const toastText = await firstValueFrom(this.translateService.get('REGISTRATION.COPIED_TO_CLIPBOARD'));
      const toast = await this.toastController.create({
        message: toastText,
        mode: 'md',
        duration: 2000,
      });
      toast.present();
    }
  }

  async openMapModal() {
    const modal = await this.modalController.create({
      component: ModalMapImagePage,
      componentProps: {
        location: this.location(),
      },
    });
    modal.present();
  }

  constructor() {
    addIcons({
      calendarNumberOutline,
      createOutline,
      eyeOutline,
      locationOutline,
      personCircleOutline,
      peopleCircleOutline,
      chatbubbleEllipses,
      shareSocial,
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

export function getLocation(obs: RegistrationViewModel): ImageLocation {
  return {
    latLng: L.latLng(obs.ObsLocation.Latitude, obs.ObsLocation.Longitude),
    geoHazard: obs.GeoHazardTID,
    startStopLocation: getStartStopLocation(obs),
    damageLocations: getDamagePositions(obs),
  };
}

function getStartStopLocation(obs: RegistrationViewModel): ImageLocationStartStop | undefined {
  if (obs.AvalancheObs) {
    return {
      ...obs2Latlng(obs.AvalancheObs),
      totalPolygon: extent2Polygon(obs.AvalancheObs.Extent, settings.map.extentColor),
      startPolygon: extent2Polygon(obs.AvalancheObs.StartExtent, settings.map.startExtentColor),
      endPolygon: extent2Polygon(obs.AvalancheObs.StopExtent, settings.map.endExtentColor),
    };
  }
  if (obs.LandSlideObs) {
    return {
      ...obs2Latlng(obs.LandSlideObs),
      totalPolygon: extent2Polygon(obs.LandSlideObs.Extent, settings.map.extentColor),
      startPolygon: extent2Polygon(obs.LandSlideObs.StartExtent, settings.map.startExtentColor),
      endPolygon: extent2Polygon(obs.LandSlideObs.StopExtent, settings.map.endExtentColor),
    };
  }

  if (obs.WaterLevel2) {
    return {
      totalPolygon: extent2Polygon(obs.WaterLevel2.Extent, settings.map.extentColor),
    };
  }
  return undefined;
}

function getDamagePositions(obs: RegistrationViewModel) {
  if (obs.DamageObs?.some((d) => d.DamagePosition)) {
    const positions = obs.DamageObs.map((d) => d.DamagePosition).filter((p) => p && p.Latitude && p.Longitude) as {
      Latitude: number;
      Longitude: number;
    }[];
    return positions.map((p) => L.latLng(p.Latitude, p.Longitude));
  }
  return undefined;
}

function obs2Latlng(obs: LandslideViewModel | AvalancheObsViewModel) {
  return {
    start: obs.StartLat && obs.StartLong ? L.latLng(obs.StartLat, obs.StartLong) : undefined,
    stop: obs.StopLat && obs.StopLong ? L.latLng(obs.StopLat, obs.StopLong) : undefined,
  };
}

function extent2Polygon(extent: number[][] | undefined, color: string) {
  return extent
    ? new L.Polygon(
        extent.map(([lng, lat]) => [lat, lng]),
        { color }
      )
    : undefined;
}
