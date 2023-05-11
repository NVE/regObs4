import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import deepEqual from 'fast-deep-equal';
import { Observable } from 'rxjs';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { ExistingOrNewAttachment } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { EditImagesPage } from '../../../edit-images/edit-images.page';
import { getNewAndExistingAttachmentsForDraft$ } from 'src/app/core/services/add-update-delete-registration/attachmentHelpers';

const DEBUG_TAG = 'EditImagesBarComponent';

/**
 * Show thumbnails of all images for given registration.
 * If you click the component, show a modal to add or edit images
 */
@Component({
  selector: 'app-edit-images-bar',
  templateUrl: './edit-images-bar.component.html',
  styleUrls: ['./edit-images-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditImagesBarComponent {
  @Input() draft: RegistrationDraft;
  @Input() registrationTid: number;
  @Input() modalTitlePostfix: string; //used to build the title in the modal
  @Input() readonly = false;

  attachments$: Observable<ExistingOrNewAttachment[]>;

  constructor(
    private modalController: ModalController,
    private draftRepository: DraftRepositoryService,
    private logger: LoggingService,
    private newAttachmentService: NewAttachmentService
  ) {}

  ngOnInit() {
    this.attachments$ = getNewAndExistingAttachmentsForDraft$(
      this.registrationTid,
      this.draftRepository.getDraft$(this.draft.uuid),
      this.newAttachmentService.getAttachments(this.draft.uuid, { registrationTid: this.registrationTid })
    );
  }

  async showEditImagesPage(): Promise<void> {
    const modal = await this.modalController.create({
      component: EditImagesPage,
      componentProps: {
        registrationTid: this.registrationTid,
        geoHazard: this.draft.registration.GeoHazardTID,
        draftUuid: this.draft.uuid,
        modalTitlePostfix: this.modalTitlePostfix,
        existingAttachments: this.draft.registration.Attachments,
      },
      cssClass: 'edit-images-page-modal',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data != null && !deepEqual(data.existingAttachments, this.draft.registration.Attachments)) {
      this.logger.debug(
        'Existing (remote) attachments changed, saving draft...',
        DEBUG_TAG,
        { changed: data.existingAttachments },
        { original: this.draft.registration.Attachments }
      );
      this.draft.registration.Attachments = data.existingAttachments;
      this.draftRepository.save(this.draft);
    } else {
      this.logger.debug('Existing (remote) attachments not changed', DEBUG_TAG);
    }
  }
}
