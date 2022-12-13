import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';

/**
 * A modal popup/page containing the EditImagesComponent.
 * If existingAttachments is changed, they will be returned by onWillDismiss() on the modal object.
 */
@Component({
  templateUrl: './edit-images.page.html',
  styleUrls: ['./edit-images.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditImagesPage {
  @Input() draftUuid: string;
  @Input() existingAttachments: RemoteOrLocalAttachmentEditModel[];
  @Input() registrationTid: RegistrationTid;
  @Input() geoHazard: GeoHazard;
  @Input() modalTitlePostfix: string; //used to build the title in the modal

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss({ existingAttachments: this.existingAttachments });
  }
}
