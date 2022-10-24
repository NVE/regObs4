import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { settings } from '../../../../../settings';
import { AttachmentType, AttachmentUploadEditModel, AttachmentUploadEditModelWithBlob, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { File } from '@ionic-native/file/ngx';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { LogLevel } from '../../../shared/services/logging/log-level.model';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { firstValueFrom, Observable } from 'rxjs';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import {
  ALLOWED_ATTACHMENT_FILE_TYPES,
  DropZoneService
} from './drop-zone.service';
import { NgxFileDropEntry } from 'ngx-file-drop';

const DEBUG_TAG = 'AddPictureItemComponent';
const MIME_TYPE = 'image/jpeg';

@Component({
  selector: 'app-edit-images',
  templateUrl: './edit-images.component.html',
  styleUrls: ['./edit-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditImagesComponent implements OnInit {
  @Input() draftUuid: string;
  @Input() existingAttachments: RemoteOrLocalAttachmentEditModel[];
  @Output() existingAttachmentsChange = new EventEmitter();
  @Input() registrationTid: RegistrationTid;
  @Input() geoHazard: GeoHazard;
  @Input() title = 'REGISTRATION.ADD_IMAGES';
  @Input() pictureCommentText = 'REGISTRATION.IMAGE_DESCRIPTION';
  @Input() pictureCommentPlaceholder = 'REGISTRATION.IMAGE_DESCRIPTION_PLACEHOLDER';
  @Input() icon = 'camera';
  @Input() showIcon = true;
  @Input() iconColor = 'dark';
  @Input() onBeforeAdd: () => Promise<void> | void;
  @Input() attachmentType: AttachmentType = 'Attachment';
  @Input() ref?: string;

  isHybrid: boolean;
  accept = ALLOWED_ATTACHMENT_FILE_TYPES;
  selectedFile: Blob = null;
  aboutToDrop = false;

  newAttachments$: Observable<AttachmentUploadEditModelWithBlob[]>;

  get filteredExistingImages(): RemoteOrLocalAttachmentEditModel[] {
    if (this.existingAttachments == null) {
      return [];
    }
    return this.existingAttachments
      .filter(a => this.registrationTid ? a.RegistrationTID === this.registrationTid : true);
  }

  constructor(
    private translateService: TranslateService,
    private platform: Platform,
    private file: File,
    private logger: LoggingService,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private newAttachmentService: NewAttachmentService,
    private dropZoneService: DropZoneService
  ) {}

  ngOnInit() {
    this.isHybrid = this.platform.is('hybrid');

    this.newAttachments$ = this.newAttachmentService.getAttachmentsWithBlob(
      this.draftUuid,
      { ref: this.ref, type: this.attachmentType, registrationTid: this.registrationTid }
    );
  }

  setNewAttachmentComment(attachment: AttachmentUploadEditModel, comment: AttachmentUploadEditModel['Comment']) {
    this.logger.debug('Updating new attachment comment', DEBUG_TAG, comment);
    this.newAttachmentService.saveAttachmentMeta$(this.draftUuid, { ...attachment, Comment: comment });
  }

  async addClick() {
    if (this.onBeforeAdd !== undefined) {
      await Promise.resolve(this.onBeforeAdd());
    }
    const translations = await firstValueFrom(this.translateService
      .get([
        'REGISTRATION.GENERAL_COMMENT.ADD_PICTURE',
        'REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO',
        'REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY',
        'DIALOGS.CANCEL'
      ]));
    const actionSheet = await this.actionSheetController.create({
      header: translations['REGISTRATION.GENERAL_COMMENT.ADD_PICTURE'],
      buttons: [
        {
          text: translations['REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO'],
          handler: () => this.getPicture(CameraSource.Camera)
        },
        {
          text: translations['REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY'],
          handler: () => this.getPicture(CameraSource.Photos)
        },
        {
          text: translations['DIALOGS.CANCEL'],
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  async getPicture(source: CameraSource) {
    if (!this.platform.is('hybrid')) {
      //TODO: Gjøre som vi gjør på web for å hente bilde enten fra kamera eller album
      return true;
    }
    try {
      const options: ImageOptions = {
        quality: settings.images.quality,
        resultType: CameraResultType.Uri,
        source: source,
        // encodingType: this.camera.EncodingType.JPEG,
        // mediaType: this.camera.MediaType.PICTURE,
        height: settings.images.size,
        width: settings.images.size,
        correctOrientation: true,
        saveToGallery: source === CameraSource.Camera
      };

      const photo = await Camera.getPhoto(options);
      const imageUrl = photo.path;
      if (photo && !(await this.validateImage(imageUrl))) {
        // TODO: Vis bedre feilmelding, f.eks. hvilke formater som støttes
        this.showErrorToast('REGISTRATION.INVALID_IMAGE');
        return true;
      }

      this.logger.debug(`Got image url from camera plugin: ${photo}`, DEBUG_TAG);
      const arrayBuffer = await this.getArrayBuffer(imageUrl);
      await this.addImage(new Blob([arrayBuffer]), MIME_TYPE);
    } catch (err) {
      if (err.message == 'User denied access to camera') {
        this.showErrorToast('REGISTRATION.IMAGE_ERROR.CAMERA_PERMISSION_MISSING');
      } else if (err.message == 'User denied access to photos') {
        this.showErrorToast('REGISTRATION.IMAGE_ERROR.ALBUM_READ_PERMISSION_MISSING');
      // we ignore errors we get if user cancels taking photo or gallery selection
      } else if (['No image picked', 'No Image Selected', 'User cancelled photos app'].indexOf(err.message) === -1) {
        this.logger.log('Unknown error when adding image', err, LogLevel.Warning, DEBUG_TAG);
        this.showErrorToast('REGISTRATION.IMAGE_ERROR.UNKNOWN');
      }
    }
    return true;
  }

  private async getArrayBuffer(fileUrl: string): Promise<ArrayBuffer> {
    const entry = await this.file.resolveLocalFilesystemUrl(fileUrl);
    if (!entry.isFile) {
      throw Error(`${fileUrl} is not a file!`);
    }
    const pathSplitted = entry.nativeURL.split('/');
    const filename = pathSplitted.pop();
    const directory = pathSplitted.join('/');
    const arrayBuffer = await this.file.readAsArrayBuffer(directory, filename);
    return arrayBuffer;
  }

  private async validateImage(src: string) {
    if (src) {
      const entry = await this.file.resolveLocalFilesystemUrl(src);
      return entry.name.endsWith('jpg') || entry.name.endsWith('jpeg');
    }
    return false;
  }

  showErrorToast(messageKey: string) {
    this.translateService.get(messageKey).subscribe(async (translation) => {
      const toast = await this.toastController.create({
        message: translation,
        mode: 'md',
        duration: 4000
      });
      toast.present();
    });
  }

  async addImage(data: Blob, mimeType: string) {
    await this.newAttachmentService.addAttachment(
      this.draftUuid,
      data,
      mimeType,
      this.geoHazard,
      this.registrationTid,
      this.attachmentType,
      this.ref
    );
  }

  removeNewImage(image: AttachmentUploadEditModel) {
    this.newAttachmentService.removeAttachment(this.draftUuid, image.id);
  }

  removeExistingImage(image: RemoteOrLocalAttachmentEditModel) {
    const existingAttachments = this.existingAttachments.filter(a => a.AttachmentId !== image.AttachmentId);
    if (existingAttachments.length !== this.existingAttachments.length) {
      this.existingAttachmentsChange.emit(existingAttachments);
    }
  }

  trackExisting(index: number, attachment: RemoteOrLocalAttachmentEditModel) {
    return attachment.AttachmentId;
  }

  trackNew(index: number, attachment: AttachmentUploadEditModelWithBlob) {
    return attachment.id;
  }

  async dropped(droppedFiles: NgxFileDropEntry[]): Promise<void> {
    for (const droppedFile of droppedFiles) {
      try {
        const file = await this.dropZoneService.getFile(droppedFile);
        this.addImage(file, MIME_TYPE);
      } catch (err) {
        this.logger.error(err, 'Could not add attachment');
        this.showErrorToast('Could not add image');  // TODO: Add better error message
      }
    }
  }

}
