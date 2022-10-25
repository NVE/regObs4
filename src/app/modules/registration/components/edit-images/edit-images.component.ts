import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, GalleryImageOptions, GalleryPhotos, ImageOptions } from '@capacitor/camera';
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
const ERRORS_TO_IGNORE = [
  'No image picked',
  'No images picked',
  'No Image Selected',
  'No Images Selected',
  'User cancelled photos app',
  'User cancelled camera app'];

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
          handler: () => this.getImages(CameraSource.Camera)
        },
        {
          text: translations['REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY'],
          handler: () => this.getImages(CameraSource.Photos)
        },
        {
          text: translations['DIALOGS.CANCEL'],
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private getImageOptions(source: CameraSource): ImageOptions {
    return {
      quality: settings.images.quality,
      resultType: CameraResultType.Uri,
      source: source,
      height: settings.images.size,
      width: settings.images.size,
      correctOrientation: true,
      saveToGallery: source === CameraSource.Camera
    };
  }

  private async getAlbumImageUrls(options: GalleryImageOptions): Promise<string[]> {
    let imageUrls: string[] = [];
    let photos: GalleryPhotos;
    const permissionState = await Camera.checkPermissions();
    if (permissionState?.photos === 'limited') {
      photos = await Camera.getLimitedLibraryPhotos();
    } else if (permissionState?.photos === 'granted') {
      photos = await Camera.pickImages(options);
    } else {
      this.showErrorToast('REGISTRATION.IMAGE_ERROR.ALBUM_READ_PERMISSION_MISSING');
    }
    if (photos?.photos?.length > 0) {
      if (this.checkAndNotifyIfUnsupportedImageFormat(photos.photos.map(photo => photo.format))) {
        imageUrls = photos.photos.map(photo => photo.path);
      }
    }
    return imageUrls;
  }

  private async takePhotoAndReturnImageUrl(options: ImageOptions): Promise<string[]> {
    const permissionState = await Camera.checkPermissions();
    if (permissionState?.camera === 'granted') {
      const photo = await Camera.getPhoto(options);
      if (photo) {
        if (this.checkAndNotifyIfUnsupportedImageFormat([photo.format])) {
          return [photo.path];
        }
      }
    } else {
      this.showErrorToast('REGISTRATION.IMAGE_ERROR.CAMERA_PERMISSION_MISSING');
    }
    return [];
  }

  private async getImages(source: CameraSource) {
    if (!this.platform.is('hybrid')) {
      //TODO: Gjøre som vi gjør på web for å hente bilde enten fra kamera eller album
      return true;
    }
    let imageUrls: string[] = [];
    try {
      const options = this.getImageOptions(source);
      if (source === CameraSource.Photos) {
        imageUrls = await this.getAlbumImageUrls(options);
      } else {
        imageUrls = await this.takePhotoAndReturnImageUrl(options);
      }
      for (const imageUrl of imageUrls) {
        this.logger.debug(`Got image url from camera plugin: ${imageUrl}`, DEBUG_TAG);
        //TODO: Hvorfor leser vi bildet inn i et arraybuffer for seinere å lagre det på disken igjen?
        const arrayBuffer = await this.getArrayBuffer(imageUrl);
        await this.attachImageToDraft(new Blob([arrayBuffer]), MIME_TYPE);
      }
    } catch (err) {
      // we ignore errors we get if user cancels taking photo or gallery selection
      if (ERRORS_TO_IGNORE.indexOf(err.message) === -1) {
        this.logger.log('Unknown error when adding image', err, LogLevel.Warning, DEBUG_TAG, imageUrls);
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

  private checkAndNotifyIfUnsupportedImageFormat(formats: string[]) {
    formats.forEach(format => {
      if (!(format === 'jpeg')) {
        this.showErrorToast('REGISTRATION.INVALID_IMAGE');
        return false;
      }
    });
    return true;
  }

  private showErrorToast(messageKey: string) {
    this.translateService.get(messageKey).subscribe(async (translation) => {
      const toast = await this.toastController.create({
        message: translation,
        mode: 'md',
        duration: 4000
      });
      toast.present();
    });
  }

  async attachImageToDraft(data: Blob, mimeType: string) {
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
        this.attachImageToDraft(file, MIME_TYPE);
      } catch (err) {
        this.logger.error(err, 'Could not add attachment');
        this.showErrorToast('Could not add image');  // TODO: Add better error message
      }
    }
  }

}
