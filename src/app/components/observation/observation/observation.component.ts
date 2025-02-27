import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  signal,
  Signal,
} from '@angular/core';
import {
  AlertController,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonLabel,
  ToastController,
} from '@ionic/angular/standalone';
import { AttachmentViewModel, RegistrationService, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { addIcons } from 'ionicons';
import {
  calendarNumberOutline,
  chatbubbleEllipses,
  locationOutline,
  peopleCircleOutline,
  personCircleOutline,
  pencil,
  shareSocial,
} from 'ionicons/icons';
import { Clipboard } from '@capacitor/clipboard';
import { DatePipe } from '@angular/common';
import { getIconForGeohazards } from 'src/app/modules/shared/components/geo-icon/get-geo-icon';
import { GeoHelperService } from 'src/app/modules/shared/services/geo-helper/geo-helper.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { StaticMapImageComponent } from 'src/app/modules/static-map-image/static-map-image.component';
import { ImageLocation } from '../../img-swiper/image-location.model';
import L from 'leaflet';
import { getAllAttachmentsFromViewModel } from 'src/app/modules/common-registration/registration.helpers';
import { catchError, firstValueFrom, Observable, of, switchMap, timeout, TimeoutError } from 'rxjs';
import { Router } from '@angular/router';
import {
  ConfirmationModalService,
  PopupResponse,
} from 'src/app/core/services/confirmation-modal/confirmation-modal.service';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { AnalyticService } from 'src/app/modules/analytics/services/analytic.service';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { getObserverEditCheckObservable } from 'src/app/modules/registration/edit-registration-helper-functions';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { HttpErrorResponse } from '@angular/common/http';
import { settings } from 'src/settings';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { AppEventCategory } from 'src/app/modules/analytics/enums/app-event-category.enum';
import { AppEventAction } from 'src/app/modules/analytics/enums/app-event-action.enum';

const DEBUG_TAG = 'ObservationComponent';
const FETCH_OBS_TIMEOUT_MS = 5000;

@Component({
  selector: 'app-observation',
  imports: [
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonChip,
    IonIcon,
    IonLabel,
    DatePipe,
    TranslatePipe,
    StaticMapImageComponent,
  ],
  templateUrl: './observation.component.html',
  styleUrl: './observation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ObservationComponent {
  private userSettingService = inject(UserSettingService);
  private cdr = inject(ChangeDetectorRef);
  private analyticService = inject(AnalyticService);
  private regobsAuthService = inject(RegobsAuthService);
  private registrationService = inject(RegistrationService);
  private draftRepository = inject(DraftRepositoryService);
  private router = inject(Router);
  private logger = inject(LoggingService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private translateService = inject(TranslateService);
  private confirmationModalService = inject(ConfirmationModalService);

  readonly registration = input.required<RegistrationViewModel>();
  dateClicked = signal(false);
  savedTime = computed(() => this.registration().DtChangeTime || this.registration().DtRegTime);
  geoIcon = computed(() => getIconForGeohazards([this.registration().GeoHazardTID]));
  geoName = getNameForGeohazard(this.registration);
  location = computed(() => getLocation(this.registration()));
  attachments = computed(() => getAllAttachmentsFromViewModel(this.registration()));
  isLoadingObsForEdit = signal(false);

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

  userCanEdit = computed(async () => {
    const observer = await firstValueFrom(this.regobsAuthService.myPageData$);
    if (!observer) {
      return false;
    }
    const editMode = await firstValueFrom(getObserverEditCheckObservable(this.registration(), observer));
    return editMode === 'EDIT_OWN_REGISTRATION' || editMode === 'EDIT_AS_MODERATOR';
  });

  constructor() {
    addIcons({
      calendarNumberOutline,
      locationOutline,
      personCircleOutline,
      peopleCircleOutline,
      chatbubbleEllipses,
      pencil,
      shareSocial,
    });
  }

  private fetchRegistrationBeforeEdit(
    regId: RegistrationService.RegistrationGetParams['regId']
  ): Observable<RegistrationViewModel | null> {
    return this.userSettingService.language$.pipe(
      switchMap((langKey) => this.registrationService.RegistrationGet({ regId, langKey })),
      timeout(FETCH_OBS_TIMEOUT_MS),
      catchError((error) => {
        let msg: string;
        if (error instanceof TimeoutError) {
          msg = `Failed to fetch obs before edit after ${FETCH_OBS_TIMEOUT_MS}ms`;
        } else if (error instanceof HttpErrorResponse && error.status === 410) {
          msg = 'Obs was deleted from Regobs';
        } else {
          msg = 'An unknown error occured while fetching obs before edit';
        }
        this.logger.error(error, DEBUG_TAG, msg);
        return of(null);
      })
    );
  }

  async edit() {
    this.isLoadingObsForEdit.set(true);
    const uuid = this.registration().ExternalReferenceId;

    try {
      if (!uuid) {
        await this.notifyAboutMissingExternalReferenceId();
        return;
      }

      const draft = await this.draftRepository.load(uuid);
      if (!draft) {
        let registrationDataToEdit: RegistrationViewModel = this.registration();

        //we don't have a local working copy of this registration yet, so fetch it and save as draft
        const obs = this.registration();
        this.logger.debug(`Registration edit: Fetching from API. RegID = ${obs.RegId}, uuid = ${uuid}`, DEBUG_TAG);
        const registrationFromServer = await firstValueFrom(this.fetchRegistrationBeforeEdit(obs.RegId));
        if (registrationFromServer === null) {
          const continueEditing = await this.confirmEditDespiteNoFreshRegistrationFromServer();
          if (!continueEditing) {
            this.isLoadingObsForEdit.set(false);
            return;
          }
        } else {
          registrationDataToEdit = registrationFromServer;
        }

        await this.draftRepository.saveAsDraft(registrationDataToEdit); //save cached copy from card as draft
      } else {
        this.logger.debug(
          `Registration edit: Using local draft. RegID = ${this.registration().RegId}, uuid = ${uuid}`,
          DEBUG_TAG
        );
      }
    } finally {
      this.isLoadingObsForEdit.set(false);
      this.cdr.markForCheck();
    }
    this.router.navigate(['registration', 'edit', uuid]);
  }

  private async notifyAboutMissingExternalReferenceId() {
    // This alert is not translated and that is OK, this is a weird case that can only happen with registrations
    // submitted directly to the database, outside of the API
    const alert = await this.alertController.create({
      header: 'Missing ExternalReferenceId',
      message: 'Error: This observation is missing ExternalReferenceId and cannot be edited.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  private async confirmEditDespiteNoFreshRegistrationFromServer(): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>((resolve) => {
      resolveFunction = resolve;
    });

    await this.confirmationModalService.askForConfirmation({
      message: 'REGISTRATION.FETCH_FOR_EDIT_FAILED.MESSAGE',
      header: 'REGISTRATION.FETCH_FOR_EDIT_FAILED.HEADER',
      buttons: [
        {
          text: 'DIALOGS.CANCEL',
          handler: () => resolveFunction(false),
          role: PopupResponse.CANCEL,
        },
        {
          text: 'REGISTRATION.FETCH_FOR_EDIT_FAILED.CONFIRM_BUTTON',
          handler: () => resolveFunction(true),
          role: PopupResponse.CONFIRM,
        },
      ],
    });

    return promise;
  }

  //TODO: Midlertidig løsning for å åpne detaljert snøprofil og se større bilder direkte fra karusellen.
  //På sikt skal nok klikk på bildet i karusell ta deg via en modal før du går videre til detaljert profil
  imageClicked(attachment: AttachmentViewModel) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const url = (attachment as any).Href || attachment.Url;
    //kun snøprofil-bilder har href. Href er link til detaljert snøprofil. Andre biler åpnes i maks størrelse
    window.open(url, '_blank');
  }
}

function getNameForGeohazard(registration: Signal<RegistrationViewModel>) {
  const helper = inject(GeoHelperService);

  const nameResource = rxResource({
    request: () => [registration().GeoHazardTID],
    loader: ({ request: geohazards }) => helper.getName(geohazards),
  });

  return nameResource.value.asReadonly();
}

function getLocation(obs: RegistrationViewModel): ImageLocation {
  return {
    latLng: L.latLng(obs.ObsLocation.Latitude, obs.ObsLocation.Longitude),
    geoHazard: obs.GeoHazardTID,
    // startStopLocation: this.getStartStopLocation(obs),
    // damageLocations: this.getDamagePositions(obs),
  };
}
