import { ChangeDetectorRef, ChangeDetectionStrategy, Component, inject, input, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { RegistrationService, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { TranslatePipe } from '@ngx-translate/core';
import {} from '@angular/core';
import { catchError, firstValueFrom, Observable, of, switchMap, timeout, TimeoutError } from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';
import {
  ConfirmationModalService,
  PopupResponse,
} from 'src/app/core/services/confirmation-modal/confirmation-modal.service';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { canEditRegistration } from 'src/app/modules/registration/edit-registration-helper-functions';
import { createOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

const DEBUG_TAG = 'RegistrationEditButtonComponent';
const FETCH_OBS_TIMEOUT_MS = 5000;

@Component({
  selector: 'app-registration-edit-button',
  imports: [IonIcon, TranslatePipe, IonButton, IonSpinner],
  templateUrl: './registration-edit-button.component.html',
  styleUrl: './registration-edit-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Knapp for å redigere en observasjon.
 * Vil kun vises dersom brukeren har rettigheter til å redigere observasjonen.
 * Laster ned observasjonen på nytt før navigering til redigeringsskjerm for å sikre at man har siste versjon.
 */
export class RegistrationEditButtonComponent {
  readonly registration = input.required<RegistrationViewModel>();

  isLoadingObsForEdit = signal(false);

  private userSettingService = inject(UserSettingService);
  private registrationService = inject(RegistrationService);
  private logger = inject(LoggingService);
  private draftRepository = inject(DraftRepositoryService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private alertController = inject(AlertController);
  private confirmationModalService = inject(ConfirmationModalService);
  private regobsAuthService = inject(RegobsAuthService);
  private observer = toSignal(this.regobsAuthService.myPageData$);

  userCanEdit = computed(() => {
    return canEditRegistration(this.registration(), this.observer());
  });

  constructor() {
    addIcons({
      createOutline,
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
        let registrationDataToEdit = this.registration();

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
}
