import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {
  ActionSheetController,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonProgressBar,
  Platform,
  ToastController,
} from '@ionic/angular/standalone';
import {
  Camera,
  CameraResultType,
  CameraSource,
  GalleryImageOptions,
  GalleryPhotos,
  ImageOptions,
} from '@capacitor/camera';
import { settings } from '../../../../../settings';
import {
  AttachmentType,
  AttachmentUploadEditModel,
  AttachmentUploadEditModelWithBlob,
  RegistrationTid,
} from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { LogLevel } from '../../../shared/services/logging/log-level.model';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { combineLatest, firstValueFrom, map, Observable } from 'rxjs';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { ALLOWED_ATTACHMENT_FILE_TYPES, DropZoneService } from './drop-zone.service';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { AddAttachmentState } from 'src/app/modules/common-registration/services/add-new-attachment/new-attachment.service';
import { NgFor, NgIf, NgClass, AsyncPipe } from '@angular/common';
import { RemoteImageComponent } from '../../../shared/components/remote-image/remote-image.component';
import { TextCommentComponent } from '../text-comment/text-comment.component';
import { BlobImageComponent } from '../blob-image/blob-image.component';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

const DEBUG_TAG = 'AddPictureItemComponent';
const MIME_TYPE = 'image/jpeg';
const ERRORS_TO_IGNORE = [
  'No image picked',
  'No images picked',
  'No Image Selected',
  'No Images Selected',
  'User cancelled photos app',
  'User cancelled camera app',
];

interface NewAttachment extends AttachmentUploadEditModelWithBlob, AddAttachmentState {}

@Component({
  selector: 'app-edit-images',
  templateUrl: './edit-images.component.html',
  styleUrls: ['./edit-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    BlobImageComponent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonProgressBar,
    NgClass,
    NgFor,
    NgIf,
    NgxFileDropModule,
    RemoteImageComponent,
    TextCommentComponent,
    TranslateModule,
  ],
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

  newAttachments$: Observable<NewAttachment[]>;

  get filteredExistingImages(): RemoteOrLocalAttachmentEditModel[] {
    if (this.existingAttachments == null) {
      return [];
    }
    return this.existingAttachments.filter((a) =>
      this.registrationTid ? a.RegistrationTID === this.registrationTid : true
    );
  }

  constructor(
    public newAttachmentService: NewAttachmentService,
    private translateService: TranslateService,
    private platform: Platform,
    private file: File,
    private logger: LoggingService,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private dropZoneService: DropZoneService
  ) {
    addIcons({ close });
  }

  ngOnInit() {
    this.isHybrid = this.platform.is('hybrid');

    this.newAttachments$ = combineLatest([
      this.newAttachmentService.getAttachmentsWithBlob(this.draftUuid, {
        ref: this.ref,
        type: this.attachmentType,
        registrationTid: this.registrationTid,
      }),
      this.newAttachmentService.addNewAttachmentState,
    ]).pipe(
      map(([attachments, uploadState]) =>
        attachments.map((attachment) => {
          // Check if we have an upload state for this attachment
          const state = uploadState.find((s) => s.id === attachment.id) || {};
          return {
            ...attachment,
            ...state,
          } as NewAttachment;
        })
      )
    );
  }

  setNewAttachmentComment(attachment: AttachmentUploadEditModel, comment: AttachmentUploadEditModel['Comment']) {
    this.logger.debug('Updating new attachment comment', DEBUG_TAG, { comment });
    this.newAttachmentService.saveAttachmentMeta$(this.draftUuid, { ...attachment, Comment: comment });
  }

  async addClick() {
    if (this.onBeforeAdd !== undefined) {
      await Promise.resolve(this.onBeforeAdd());
    }
    const translations = await firstValueFrom(
      this.translateService.get([
        'REGISTRATION.GENERAL_COMMENT.ADD_PICTURE',
        'REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO',
        'REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY',
        'DIALOGS.CANCEL',
      ])
    );
    const actionSheet = await this.actionSheetController.create({
      header: translations['REGISTRATION.GENERAL_COMMENT.ADD_PICTURE'],
      buttons: [
        {
          text: translations['REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO'],
          handler: () => this.getImages(CameraSource.Camera),
        },
        {
          text: translations['REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY'],
          handler: () => this.getImages(CameraSource.Photos),
        },
        {
          text: translations['DIALOGS.CANCEL'],
          role: 'cancel',
        },
      ],
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
      saveToGallery: source === CameraSource.Camera,
    };
  }

  private async getAlbumImageUrls(options: GalleryImageOptions): Promise<string[]> {
    let imageUrls: string[] = [];
    let photos: GalleryPhotos;
    let permissionState = await Camera.checkPermissions();
    if (!['granted', 'limited'].includes(permissionState?.photos)) {
      permissionState = await Camera.requestPermissions({ permissions: ['photos'] });
    }
    if (['granted', 'limited'].includes(permissionState?.photos)) {
      photos = await Camera.pickImages(options);
    } else {
      this.showErrorToast('REGISTRATION.IMAGE_ERROR.ALBUM_READ_PERMISSION_MISSING');
    }
    if (photos?.photos?.length > 0) {
      if (this.checkAndNotifyIfUnsupportedImageFormat(photos.photos.map((photo) => photo.format))) {
        imageUrls = photos.photos.map((photo) => photo.path);
      }
    }
    return imageUrls;
  }

  private async takePhotoAndReturnImageUrl(options: ImageOptions): Promise<string[]> {
    let permissionState = await Camera.checkPermissions();
    if (permissionState?.camera !== 'granted') {
      permissionState = await Camera.requestPermissions({ permissions: ['camera'] });
    }
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
        await this.attachImageFileToDraft(imageUrl, MIME_TYPE);
      }
    } catch (err) {
      // we ignore errors we get if user cancels taking photo or gallery selection
      if (!ERRORS_TO_IGNORE.includes(err.message)) {
        this.logger.log('Unknown error when adding image', err, LogLevel.Warning, DEBUG_TAG, imageUrls);
        this.showErrorToast('REGISTRATION.IMAGE_ERROR.UNKNOWN');
      }
    }
    return true;
  }

  private checkAndNotifyIfUnsupportedImageFormat(formats: string[]) {
    formats.forEach((format) => {
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
        duration: 4000,
      });
      toast.present();
    });
  }

  async attachImageFileToDraft(fileUrl: string, mimeType: string) {
    await this.newAttachmentService.addAttachmentAsUrl(
      this.draftUuid,
      fileUrl,
      mimeType,
      this.geoHazard,
      this.registrationTid,
      this.attachmentType,
      this.ref
    );
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
    const existingAttachments = this.existingAttachments.filter((a) => a.AttachmentId !== image.AttachmentId);
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

  dropped(droppedFiles: NgxFileDropEntry[]) {
    for (const droppedFile of droppedFiles) {
      this.dropZoneService
        .getFile(droppedFile)
        .then((file) => this.attachImageToDraft(file, MIME_TYPE))
        .catch((err) => {
          this.logger.error(err, DEBUG_TAG, 'Could not add attachment');
          this.showErrorToast('Could not add image'); // TODO: Add better error message
        });
    }
  }
}
