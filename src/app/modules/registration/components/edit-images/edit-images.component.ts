import { Component, OnInit, ChangeDetectionStrategy, inject, input, model } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
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
import { camera, close } from 'ionicons/icons';

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
    TranslatePipe,
  ],
})
export class EditImagesComponent implements OnInit {
  newAttachmentService = inject(NewAttachmentService);
  private translateService = inject(TranslateService);
  private platform = inject(Platform);
  private file = inject(File);
  private logger = inject(LoggingService);
  private toastController = inject(ToastController);
  private actionSheetController = inject(ActionSheetController);
  private dropZoneService = inject(DropZoneService);

  readonly draftUuid = input.required<string>();
  readonly existingAttachments = model<RemoteOrLocalAttachmentEditModel[]>();
  readonly registrationTid = input.required<RegistrationTid>();
  readonly geoHazard = input.required<GeoHazard>();
  readonly title = input('REGISTRATION.ADD_IMAGES');
  readonly pictureCommentText = input('REGISTRATION.IMAGE_DESCRIPTION');
  readonly pictureCommentPlaceholder = input('REGISTRATION.IMAGE_DESCRIPTION_PLACEHOLDER');
  readonly icon = input('camera');
  readonly showIcon = input(true);
  readonly iconColor = input('dark');
  readonly onBeforeAdd = input<() => Promise<void> | void>();
  readonly attachmentType = input<AttachmentType>('Attachment');
  readonly ref = input<string>();

  isHybrid?: boolean;
  accept = ALLOWED_ATTACHMENT_FILE_TYPES;
  selectedFile?: Blob;
  aboutToDrop = false;

  newAttachments$?: Observable<NewAttachment[]>;

  get filteredExistingImages(): RemoteOrLocalAttachmentEditModel[] {
    const existingAttachments = this.existingAttachments();
    if (existingAttachments == null) {
      return [];
    }
    return existingAttachments.filter((a) => {
      const registrationTid = this.registrationTid();
      return registrationTid ? a.RegistrationTID === registrationTid : true;
    });
  }

  constructor() {
    addIcons({ close, camera });
  }

  ngOnInit() {
    this.isHybrid = this.platform.is('hybrid');

    this.newAttachments$ = combineLatest([
      this.newAttachmentService.getAttachmentsWithBlob(this.draftUuid(), {
        ref: this.ref(),
        type: this.attachmentType(),
        registrationTid: this.registrationTid(),
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
    this.newAttachmentService.saveAttachmentMeta$(this.draftUuid(), { ...attachment, Comment: comment });
  }

  async addClick() {
    const onBeforeAdd = this.onBeforeAdd();
    if (onBeforeAdd !== undefined) {
      await Promise.resolve(onBeforeAdd());
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
    let galleryPhotos: GalleryPhotos;
    let permissionState = await Camera.checkPermissions();
    if (!['granted', 'limited'].includes(permissionState?.photos)) {
      permissionState = await Camera.requestPermissions({ permissions: ['photos'] });
    }
    if (['granted', 'limited'].includes(permissionState?.photos)) {
      galleryPhotos = await Camera.pickImages(options);
    } else {
      this.showErrorToast('REGISTRATION.IMAGE_ERROR.ALBUM_READ_PERMISSION_MISSING');
      return [];
    }
    if (galleryPhotos.photos.length > 0) {
      if (this.checkAndNotifyIfUnsupportedImageFormat(galleryPhotos.photos.map((photo) => photo.format))) {
        // TODO: photo.path kan være undefined, bør vi håndtere dette bedre?
        imageUrls = galleryPhotos.photos.map((photo) => photo.path).filter((path) => path != null);
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
        if (photo.path && this.checkAndNotifyIfUnsupportedImageFormat([photo.format])) {
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
      const hasMessage = err instanceof Error && err.message != null;
      // we ignore errors we get if user cancels taking photo or gallery selection
      if (!hasMessage || !ERRORS_TO_IGNORE.includes(err.message)) {
        this.logger.log('Unknown error when adding image', err, LogLevel.Warning, DEBUG_TAG, imageUrls);
        this.showErrorToast('REGISTRATION.IMAGE_ERROR.UNKNOWN');
      }
    }
    return true;
  }

  private checkAndNotifyIfUnsupportedImageFormat(formats: string[]) {
    if (formats.some((f) => f !== 'jpeg')) {
      this.showErrorToast('REGISTRATION.INVALID_IMAGE');
      return false;
    }
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
      this.draftUuid(),
      fileUrl,
      mimeType,
      this.geoHazard(),
      this.registrationTid(),
      this.attachmentType(),
      this.ref()
    );
  }

  async attachImageToDraft(data: Blob, mimeType: string) {
    await this.newAttachmentService.addAttachment(
      this.draftUuid(),
      data,
      mimeType,
      this.geoHazard(),
      this.registrationTid(),
      this.attachmentType(),
      this.ref()
    );
  }

  removeNewImage(image: AttachmentUploadEditModel) {
    this.newAttachmentService.removeAttachment(this.draftUuid(), image.id);
  }

  removeExistingImage(image: RemoteOrLocalAttachmentEditModel) {
    this.existingAttachments.update((attachments) =>
      (attachments || []).filter((a) => a.AttachmentId !== image.AttachmentId)
    );
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
