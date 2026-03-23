import {
  IonToolbar,
  IonContent,
  IonBackButton,
  IonTitle,
  IonHeader,
  IonButtons,
  AlertController,
  NavController,
} from '@ionic/angular/standalone';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../base.page';
import { HeaderColorDirective } from '../../../shared/directives/header-color/header-color.directive';
import { RegistrationContentWrapperComponent } from '../../components/registration-content-wrapper/registration-content-wrapper.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ExistingOrNewAttachment } from 'src/app/modules/common-registration/registration.models';
import { trashOutline, moveOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AttachmentGridComponent } from 'src/app/components/observation/attachment-grid/attachment-grid.component';
import { getRegistrationsWithData } from 'src/app/modules/common-registration/registration.helpers';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

type RegistrationType = { Id: number; Name: string; SubTypes?: RegistrationType[] };
type RegistrationTypesV = { [geoHazardId: string]: RegistrationType[] };

@Component({
  selector: 'app-orphaned-attachments',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orphaned-attachments.page.html',
  styleUrls: ['./orphaned-attachments.page.scss'],
  imports: [
    AttachmentGridComponent,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RegistrationContentWrapperComponent,
    TranslatePipe,
  ],
})
export class OrphanedAttachmentsPage extends BasePage {
  private alertController = inject(AlertController);
  private translateService = inject(TranslateService);
  private kdvService = inject(KdvService);
  private navController = inject(NavController);

  override registrationTid = undefined;

  private registrationTypesV = toSignal<RegistrationTypesV>(
    this.kdvService.getViewRepositoryByKeyObservable('RegistrationTypesV') as Observable<RegistrationTypesV>
  );

  get orphanedAttachments(): RemoteOrLocalAttachmentEditModel[] {
    if (!this.draft?.registration?.Attachments) {
      return [];
    }
    return this.draft.registration.Attachments.filter((a) => a.RegistrationTID == null);
  }

  get geoHazard() {
    return this.draft?.registration?.GeoHazardTID;
  }

  constructor() {
    super();
    addIcons({ trashOutline, moveOutline });
  }

  onAttachmentClick(event: { index: number }) {
    const attachment = this.orphanedAttachments[event.index];
    if (attachment) {
      this.showAttachmentActions(attachment, event.index);
    }
  }

  private async showAttachmentActions(attachment: RemoteOrLocalAttachmentEditModel, index: number) {
    const availableForms = this.getAvailableRegistrationTypes();
    const totalCount = this.orphanedAttachments.length;
    const currentNumber = index + 1;

    const moveToPrefixText = this.translateService.instant('REGISTRATION.ORPHANED_ATTACHMENTS.MOVE_TO_PREFIX');

    const inputs = [
      ...availableForms.map((form) => ({
        type: 'radio' as const,
        label: `${moveToPrefixText} ${form.name}`,
        value: form.tid.toString(),
      })),
      {
        type: 'radio' as const,
        label: this.translateService.instant('REGISTRATION.ORPHANED_ATTACHMENTS.DELETE_OPTION'),
        value: 'DELETE',
        cssClass: 'alert-radio-destructive',
      },
    ];

    // Bygg tittel: "Bilde x av y" eller "Bilde x av y med kommentar: <kommentar>"
    let header: string;
    const imageNumberText = this.translateService.instant('REGISTRATION.ORPHANED_ATTACHMENTS.IMAGE_NUMBER', {
      current: currentNumber,
      total: totalCount,
    });

    if (attachment.Comment) {
      const withCommentText = this.translateService.instant('REGISTRATION.ORPHANED_ATTACHMENTS.WITH_COMMENT');
      header = `${imageNumberText} ${withCommentText}: ${attachment.Comment}`;
    } else {
      header = imageNumberText;
    }

    const alert = await this.alertController.create({
      header,
      message: this.translateService.instant('REGISTRATION.ORPHANED_ATTACHMENTS.CHOOSE_ACTION'),
      inputs,
      buttons: [
        {
          text: this.translateService.instant('DIALOGS.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translateService.instant('DIALOGS.OK'),
          handler: (selectedValue: string) => {
            if (selectedValue === 'DELETE') {
              this.confirmDeleteAttachment({ type: 'existing', attachment });
            } else if (selectedValue != null) {
              const tid = parseInt(selectedValue, 10);
              this.moveAttachmentToForm({ type: 'existing', attachment }, tid);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  private async confirmDeleteAttachment(attachment: ExistingOrNewAttachment) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('REGISTRATION.ORPHANED_ATTACHMENTS.DELETE_CONFIRM_TITLE'),
      message: this.translateService.instant('REGISTRATION.ORPHANED_ATTACHMENTS.DELETE_CONFIRM_MESSAGE'),
      buttons: [
        {
          text: this.translateService.instant('DIALOGS.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translateService.instant('DIALOGS.DELETE'),
          role: 'destructive',
          handler: () => {
            this.removeAttachment(attachment);
          },
        },
      ],
    });

    await alert.present();
  }

  private removeAttachment(attachment: ExistingOrNewAttachment) {
    if (!this.draft.registration.Attachments) {
      return;
    }

    const target = attachment.attachment;
    const index = this.draft.registration.Attachments.findIndex((a) => {
      if (a === target) {
        return true;
      }
      if (target.AttachmentId != null) {
        return a.AttachmentId === target.AttachmentId;
      }
      return false;
    });

    if (index > -1) {
      this.draft.registration.Attachments.splice(index, 1);
      this.save();
      this.cdr.markForCheck();
    }
  }

  override async reset(): Promise<boolean> {
    const pleaseReset = await this.basePageService.confirmDelete();
    if (pleaseReset) {
      this.removeAllAttachments();
      this.navController.navigateBack('registration/edit/' + this.draft.uuid);
    }
    return pleaseReset;
  }

  private removeAllAttachments() {
    if (!this.draft.registration.Attachments) {
      return;
    }

    const orphaned = new Set(this.orphanedAttachments);
    this.draft.registration.Attachments = this.draft.registration.Attachments.filter((a) => !orphaned.has(a));
    this.save();
  }

  private moveAttachmentToForm(attachment: ExistingOrNewAttachment, registrationTid: RegistrationTid) {
    if (!this.draft.registration.Attachments) {
      return;
    }

    const target = attachment.attachment;
    const index = this.draft.registration.Attachments.findIndex((a) => {
      if (a === target) {
        return true;
      }
      if (target.AttachmentId != null) {
        return a.AttachmentId === target.AttachmentId;
      }
      return false;
    });

    if (index > -1) {
      this.draft.registration.Attachments[index].RegistrationTID = registrationTid;
      this.save();
      this.cdr.markForCheck();
    }
  }

  // Hent alle skjema som har data i denne registreringen
  private getAvailableRegistrationTypes(): { tid: RegistrationTid; name: string }[] {
    const existingTids = getRegistrationsWithData(this.draft);
    const forms: { tid: RegistrationTid; name: string }[] = [];

    // Ta alltid med GeneralObservation
    forms.push({
      tid: RegistrationTid.GeneralObservation,
      name: this.getRegistrationTypeName(RegistrationTid.GeneralObservation),
    });

    // Legg til kun skjema som finnes i registreringen
    existingTids.forEach((tid) => {
      if (tid !== RegistrationTid.GeneralObservation) {
        forms.push({
          tid,
          name: this.getRegistrationTypeName(tid),
        });
      }
    });

    return forms;
  }

  private getRegistrationTypeName(tid: RegistrationTid): string {
    const geoHazardId = this.draft?.registration?.GeoHazardTID;
    const unknownRegistrationType = 'Ukjent skjema';
    if (!geoHazardId || !tid) return unknownRegistrationType;
    if (!this.registrationTypesV()) return unknownRegistrationType;
    const typesForHazard = this.registrationTypesV()?.[geoHazardId];
    if (!typesForHazard) return unknownRegistrationType;

    // Søk i toppnivå først
    const found = typesForHazard.find((type) => type.Id === tid);
    if (found) {
      return found.Name || unknownRegistrationType;
    }
    // Søk i subtypes hvis ikke funnet på toppnivå
    for (const type of typesForHazard) {
      if (type.SubTypes && Array.isArray(type.SubTypes)) {
        const found = type.SubTypes.find((sub) => sub.Id === tid);
        if (found) {
          return found.Name || unknownRegistrationType;
        }
      }
    }
    return unknownRegistrationType;
  }

  override async isEmpty(): Promise<boolean> {
    return this.orphanedAttachments.length === 0;
  }

  protected override async delete(): Promise<void> {
    if (await this.isEmpty()) {
      return;
    }
    this.removeAllAttachments();
    return;
  }
}
