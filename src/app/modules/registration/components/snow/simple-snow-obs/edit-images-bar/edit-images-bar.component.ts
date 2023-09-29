import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import deepEqual from 'fast-deep-equal';
import { map, Observable, distinctUntilChanged, combineLatest } from 'rxjs';
import { attachmentsComparator } from 'src/app/core/helpers/attachment-comparator';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { getAllAttachmentsFromEditModel } from 'src/app/modules/common-registration/registration.helpers';
import {
  ExistingAttachmentType,
  ExistingOrNewAttachment,
  NewAttachmentType,
} from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { EditImagesPage } from '../../../edit-images/edit-images.page';

const DEBUG_TAG = 'EditImagesBarComponent';

/**
 * Compares two versions of a draft and returns true if existing (remote) attachments has changed
 */
function existingAttachmentsHasNotChanged(
  previous: RegistrationDraft,
  current: RegistrationDraft,
  registrationTid: number
) {
  const preExistingAttachments = getAllAttachmentsFromEditModel(previous.registration, registrationTid);
  const curExistingAttachments = getAllAttachmentsFromEditModel(current.registration, registrationTid);

  // Check if existing attachments has changed
  const changed = attachmentsComparator(preExistingAttachments, curExistingAttachments, 'AttachmentId');
  return changed;
}

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
    this.attachments$ = this.getNewAndExistingAttachmentsForDraft$(this.draft.uuid);
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
      this.logger.debug('Existing (remote) attachments changed, saving draft...', DEBUG_TAG, {
        changed: data.existingAttachments,
        original: this.draft.registration.Attachments,
      });
      this.draft.registration.Attachments = data.existingAttachments;
      this.draftRepository.save(this.draft);
    } else {
      this.logger.debug('Existing (remote) attachments not changed', DEBUG_TAG);
    }
  }

  /**
   * @returns an observable array of both new attachments and already uploaded attachments for given draft uuid
   */
  private getNewAndExistingAttachmentsForDraft$(uuid: string): Observable<ExistingOrNewAttachment[]> {
    const draft$ = this.draftRepository
      .getDraft$(uuid)
      .pipe(distinctUntilChanged((prev, curr) => existingAttachmentsHasNotChanged(prev, curr, this.registrationTid)));
    const newAttachments$ = this.newAttachmentService
      .getAttachments(uuid, { registrationTid: this.registrationTid })
      .pipe(distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'id')));
    return combineLatest([draft$, newAttachments$]).pipe(
      map(([draft, newAttachments]) => {
        const existingAttachments = getAllAttachmentsFromEditModel(draft.registration, this.registrationTid);
        return [
          ...existingAttachments.map((attachment) => ({ type: 'existing' as ExistingAttachmentType, attachment })),
          ...newAttachments.map((attachment) => ({ type: 'new' as NewAttachmentType, attachment })),
        ];
      })
    );
  }
}
