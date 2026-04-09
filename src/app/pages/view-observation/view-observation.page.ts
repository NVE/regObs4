import {
  IonToolbar,
  IonContent,
  IonCardHeader,
  IonBackButton,
  IonCardContent,
  IonIcon,
  IonCardTitle,
  IonTitle,
  IonCard,
  IonHeader,
  IonButton,
  IonButtons,
  IonChip,
  IonLabel,
} from '@ionic/angular/standalone';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  input,
  numberAttribute,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { PopupInfoService } from '../../core/services/popup-info/popup-info.service';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { takeUntil, map, catchError } from 'rxjs/operators';
import { Observable, Subject, merge } from 'rxjs';
import { AttachmentViewModel, RegistrationService, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { HeaderColorDirective } from '../../modules/shared/directives/header-color/header-color.directive';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  calendarNumberOutline,
  chatbubbleEllipses,
  locationOutline,
  openOutline,
  peopleCircleOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { KeyValueComponent } from '../../components/observation/key-value/key-value.component';
import { KeyValueGroupComponent } from '../../components/observation/key-value-group/key-value-group.component';
import { RegistrationHeaderComponent } from '../../components/observation/registration-header/registration-header.component';
import { RegistrationViewComponent } from '../../components/observation/registration-view/registration-view.component';
import { AttachmentGridComponent } from '../../components/observation/attachment-grid/attachment-grid.component';
import { injectImageCarousel } from 'src/app/components/observation/observation-image-carousel/inject-image-carousel';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { getSummaries, getSummaryHeader } from 'src/app/components/observation/summary/get-summary-input';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { SummaryComponent } from '../../components/observation/summary/summary.component';
import { getAttachmentsFromRegistrationViewModel } from 'src/app/modules/common-registration/registration.helpers';
import { AvalancheActivitesViewComponent } from '../../components/observation/registrations/avalanche-activity-view/avalanche-activities-view.component';
import { ObserverChipComponent } from 'src/app/components/observation/observer-chip/observer-chip.component';
import { GeohazardChipComponent } from 'src/app/components/observation/geohazard-chip/geohazard-chip.component';
import { IceThicknessViewComponent } from 'src/app/components/observation/registrations/ice-thickness-view/ice-thickness-view.component';
import { AvalancheProblemsViewComponent } from 'src/app/components/observation/registrations/avalanche-problem-view/avalanche-problems-view.component';
import { AvalancheEvaluationViewComponent } from 'src/app/components/observation/registrations/avalanche-evaluation-view/avalanche-evaluation-view.component';
import { ObservationActionsComponent } from 'src/app/components/observation/observation-actions/observation-actions.component';
import { ObservationLocationMapComponent } from 'src/app/components/observation/observation-location-map/observation-location-map.component';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { SnowProfileComponent } from 'src/app/components/snow-profile/snow-profile.component';
import { CarouselItems } from 'src/app/components/observation/observation-image-carousel/models';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';

const DEBUG_TAG = 'ViewObservationPage';

// Dette er strukturen for registreringstyper. Brukes til å hente ut navn på hvert skjema.
type RegistrationType = { Id: number; Name: string; SubTypes?: RegistrationType[] };
type RegistrationTypesV = { [geoHazardId: string]: RegistrationType[] };

@Component({
  selector: 'app-view-observation',
  templateUrl: './view-observation.page.html',
  styleUrl: './view-observation.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    AttachmentGridComponent,
    AvalancheActivitesViewComponent,
    AvalancheProblemsViewComponent,
    AvalancheEvaluationViewComponent,
    DatePipe,
    DecimalPipe,
    GeohazardChipComponent,
    HeaderColorDirective,
    IceThicknessViewComponent,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonTitle,
    IonToolbar,
    KeyValueComponent,
    KeyValueGroupComponent,
    ObservationActionsComponent,
    ObserverChipComponent,
    ObservationLocationMapComponent,
    RegistrationHeaderComponent,
    RegistrationViewComponent,
    TranslatePipe,
    SummaryComponent,
    SnowProfileComponent,
  ],
})
export class ViewObservationPage extends NgDestoryBase implements OnInit {
  private popupInfoService = inject(PopupInfoService);
  private userSettingService = inject(UserSettingService);
  private registrationService = inject(RegistrationService);
  private authService = inject(RegobsAuthService);
  private router = inject(Router);
  private imageCarousel = injectImageCarousel();
  private kdvService = inject(KdvService);
  private translateService = inject(TranslateService);
  private logger = inject(LoggingService);

  readonly regId = input.required({ transform: numberAttribute, alias: 'id' });

  readonly langKey = toSignal(this.userSettingService.language$, { initialValue: LangKey.nb });
  userCompetenceUrl = toSignal(this.userSettingService.userCompetenceUrl$, { initialValue: '' });

  /**
   * Evt. HTTP feilkode hvis API-kallet for å hente observasjonen feiler.
   * Setter denne til 204 som standard i tilfelle angitt regId ikke finnes i Regobs.
   * Når vi får 204 fra API'et vil ikke dette fanges opp som en feil ellers.
   * Se https://nveprojects.atlassian.net/browse/RO-2997
   */
  private httpErrorStatus = signal(204); // 204 = No Content, initial value

  registration = rxResource({
    params: () => ({ regId: this.regId(), langKey: this.langKey() }),
    stream: ({ params }) =>
      this.registrationService.RegistrationGet({ regId: params.regId, langKey: params.langKey }).pipe(
        catchError((err) => {
          this.logger.log('Feil ved henting av observasjon', err, LogLevel.Warning, DEBUG_TAG);
          if (err.status != undefined) {
            this.httpErrorStatus.set(err.status);
          }
          throw new Error('Feil ved henting av observasjon', { cause: err });
        })
      ),
  });

  private isKartLangKey = computed(() => {
    const lang = this.langKey();
    const isNorwegian = lang === LangKey.nb || lang === LangKey.nn;
    if (isNorwegian) {
      return 0;
    }
    return 1;
  });

  iskartUrl = computed(() => {
    if (!this.registration.hasValue()) {
      return undefined;
    }
    const reg = this.registration.value();
    if (!reg) {
      return undefined;
    }
    if (!(reg.GeoHazardTID === GeoHazard.Ice)) {
      return undefined;
    }
    const { Latitude, Longitude } = reg.ObsLocation;
    return `https://iskart.no?LAT=${Latitude};LON=${Longitude};ZOOM=15;LANGUAGE=${this.isKartLangKey()}`;
  });

  errorMesage = computed(() => {
    const status = this.httpErrorStatus();
    if (status === 204 || status === 400 || status === 404) {
      return this.translateService.instant('REGISTRATION.DETAILS.ERROR.NOT_FOUND');
    } else if (status === 410) {
      return this.translateService.instant('REGISTRATION.DETAILS.ERROR.GONE');
    } else {
      return this.translateService.instant(`REGISTRATION.DETAILS.ERROR.SERVER_ERROR`);
    }
  });

  unknownRegistrationAttachments = computed(
    () => this.registration.value()?.Attachments?.filter((a) => a.RegistrationTID == null) || []
  );

  geoHazardTid = computed(() => this.registration.value()?.GeoHazardTID as number | undefined);
  RegistrationTid = RegistrationTid;

  private _isLoggingIn = new Subject<boolean>();
  loggedInUserEmail = toSignal(
    this.authService.loggedInUser$.pipe(map((user) => (user.isLoggedIn ? user.email : null)))
  );
  isLoggingIn$ = merge(this._isLoggingIn, this.authService.isLoggingIn$);

  // Inneholder navn på hvert skjema for angitt språk
  private registrationTypesV = toSignal<RegistrationTypesV>(
    this.kdvService.getViewRepositoryByKeyObservable('RegistrationTypesV') as Observable<RegistrationTypesV>
  );

  snowProfile = viewChild(SnowProfileComponent);
  snowProfileLayerComments = computed(() => {
    const sp = this.snowProfile();
    if (!sp) return [];
    if (sp.showComments()) return []; // Ikke vis kommentarer hvis snøprofilkomponent selv viser det.
    return sp.comments();
  });

  constructor() {
    super();
    addIcons({
      calendarNumberOutline,
      locationOutline,
      personCircleOutline,
      peopleCircleOutline,
      chatbubbleEllipses,
      openOutline,
    });
  }

  goToMyPage() {
    // we need to store curLocation in case user logs out and login on the /login page
    // then we navigate based on prevUrl in localStorage otherwise back button will navigate to
    // authcalback site and hang the app
    const curLocation = this.router.url;
    localStorage.setItem('prevUrl', curLocation);

    this.router.navigateByUrl('/login');
  }

  async signIn() {
    this._isLoggingIn.next(true);
    await this.authService.signIn();
  }

  ngOnInit() {
    this.isLoggingIn$ = merge(this._isLoggingIn, this.authService.isLoggingIn$);

    this.popupInfoService.checkObservationInfoPopup().pipe(takeUntil(this.ngDestroy$)).subscribe();
  }

  snowProfileLayers = computed(() => {
    if (!this.registration.hasValue()) {
      return [];
    }
    return this.registration.value().SnowProfile2?.StratProfile?.Layers || [];
  });

  snowProfileHasLayers = computed(() => {
    if (!this.registration.hasValue()) {
      return false;
    }
    return !isEmpty(this.snowProfileLayers());
  });

  openSnowProfileCarousel($event: { index: number }, attachments: AttachmentViewModel[]) {
    if (!this.registration.hasValue()) {
      return;
    }

    if (!this.snowProfileHasLayers()) {
      return this.openImageCarousel($event, attachments);
    }

    const items: CarouselItems = [
      ...attachments.map((data) => ({ type: 'Attachment' as const, data })),
      { type: 'SnowProfile' },
    ];

    this.imageCarousel.open($event.index, items, this.registration.value());
  }

  openImageCarousel($event: { index: number }, attachments: AttachmentViewModel[]) {
    if (this.registration.hasValue()) {
      this.imageCarousel.open(
        $event.index,
        attachments.map((data) => ({ type: 'Attachment', data })),
        this.registration.value()
      );
    }
  }

  hasData(data: unknown, tid: RegistrationTid): boolean {
    return !isEmpty(data) || this.hasAttachments(tid);
  }

  private hasAttachments(tid: RegistrationTid): boolean {
    if (!this.registration.hasValue()) return false;
    return !isEmpty(this.getAttachments(this.registration.value(), tid));
  }

  getSummaries(registration: RegistrationViewModel, tid: RegistrationTid) {
    return getSummaries(registration, tid);
  }

  getAttachments(registration: RegistrationViewModel, tid: RegistrationTid) {
    return getAttachmentsFromRegistrationViewModel(registration, tid);
  }

  getSummaryHeader(registration: RegistrationViewModel, tid: RegistrationTid) {
    return getSummaryHeader(registration, tid);
  }

  // Finner navn på angitt skjema
  getRegistrationTypeName(geoHazardId: number | undefined, typeId: number): string {
    const unknownRegistrationType = 'Ukjent skjema';
    if (!geoHazardId || !typeId) return unknownRegistrationType;
    if (!this.registrationTypesV() == undefined) return unknownRegistrationType;
    const typesForHazard = this.registrationTypesV()?.[geoHazardId];
    if (!typesForHazard) return unknownRegistrationType;

    // Søk i toppnivå først
    const found = typesForHazard.find((type) => type.Id === typeId);
    if (found) {
      return found.Name;
    }
    // Søk i subtypes hvis ikke funnet på toppnivå
    for (const type of typesForHazard) {
      if (type.SubTypes && Array.isArray(type.SubTypes)) {
        const found = type.SubTypes.find((sub) => sub.Id === typeId);
        if (found) {
          return found.Name;
        }
      }
    }
    return unknownRegistrationType;
  }
}
