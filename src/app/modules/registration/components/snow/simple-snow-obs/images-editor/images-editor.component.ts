import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { ExistingOrNewAttachment } from 'src/app/modules/common-registration/registration.models';
import { EditImagesPage } from '../../../edit-images/edit-images.page';

/**
 * Show thumbnails of all images for given registration.
 * If you click the component, show a modal to add or edit images
 */
@Component({
  selector: 'app-images-editor',
  templateUrl: './images-editor.component.html',
  styleUrls: ['./images-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesEditorComponent {
   @Input() draft: RegistrationDraft;
   @Input() registrationTid: number;
   @Input() modalTitlePostfix: string; //used to build the title in the modal
   @Input() attachments: ExistingOrNewAttachment[]; //attachments for given draft registration
   @Input() readonly = false;

   constructor(
    private modalController: ModalController
   ) {
   }

   async showImagesEditorModal(): Promise<void> {
     const modal = await this.modalController.create({
       component: EditImagesPage,
       componentProps: {
         registrationTid: this.registrationTid,
         geoHazard: this.draft.registration.GeoHazardTID,
         draftUuid: this.draft.uuid,
         modalTitlePostfix: this.modalTitlePostfix,
         existingAttachments: this.draft.registration.Attachments //TODO: Må denne filtreres på riktig skjema?
       }
     });
     modal.present();
   }

}

