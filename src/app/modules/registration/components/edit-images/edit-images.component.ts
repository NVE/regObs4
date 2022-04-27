import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { settings } from '../../../../../settings';
import { AttachmentType, AttachmentUploadEditModel, AttachmentUploadEditModelWithBlob, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { DataUrlHelper } from '../../../../core/helpers/data-url.helper';
import { File } from '@ionic-native/file/ngx';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { LogLevel } from '../../../shared/services/logging/log-level.model';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { combineLatest, concatMap, filter, firstValueFrom, interval, Observable, skip, startWith, takeUntil } from 'rxjs';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { NavigationStart, Router } from '@angular/router';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';

const DEBUG_TAG = 'AddPictureItemComponent';
const MIME_TYPE = 'image/jpeg';

@Component({
  selector: 'app-edit-images',
  templateUrl: './edit-images.component.html',
  styleUrls: ['./edit-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditImagesComponent extends NgDestoryBase implements OnInit {
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

  newAttachments$: Observable<AttachmentUploadEditModelWithBlob[]>;
  // On ios or android, metadata is saved to disk,
  // but that lags when we save to disk too often, so keep a memory cache here.
  // In the constructor there is a subscription that saves the cache to disk on an interval,
  // or when we navigate away from this page.
  newAttachmentMetadataCache = new Map<AttachmentUploadEditModel['id'], AttachmentUploadEditModel>();

  get filteredExistingImages(): RemoteOrLocalAttachmentEditModel[] {
    if (this.existingAttachments == null) {
      return [];
    }
    return this.existingAttachments
      .filter(a => this.registrationTid ? a.RegistrationTID === this.registrationTid : true);
  }

  constructor(
    private translateService: TranslateService,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private logger: LoggingService,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private newAttachmentService: NewAttachmentService,
    router: Router
  ) {
    super();

    // Save new attachment metadata every 5 seconds, when we navigate away, or when this component is destroyed
    combineLatest([
      router.events.pipe(filter(e => e instanceof NavigationStart), startWith(null)),
      interval(5000).pipe(startWith(null)),
    ]).pipe(
      skip(1),
      // Use concatmap to avoid paralell saving to disk. We want the current save operation to complete before a new
      // one starts. The save operation clears the cache, so if two save operations are initiated at the same time,
      // the first one will save and the last one will do nothing.
      concatMap(() => this.saveNewAttachmentMetadata()),
      takeUntil(this.ngDestroy$),
    ).subscribe();
  }

  ngOnInit() {
    this.newAttachments$ = this.newAttachmentService.getAttachmentsWithBlob(
      this.draftUuid,
      { ref: this.ref, type: this.attachmentType, registrationTid: this.registrationTid }
    );
  }

  private async saveNewAttachmentMetadata() {
    let i = 0;
    for (const metadata of this.newAttachmentMetadataCache.values()) {
      await firstValueFrom(this.newAttachmentService.saveAttachmentMeta$(this.draftUuid, metadata));
      i += 1;
    }

    if (i > 0) {
      this.logger.debug(`Saved metadata for ${i} attachments`, DEBUG_TAG);
    }
    this.newAttachmentMetadataCache.clear();
  }

  getNewAttachmentComment(attachment: AttachmentUploadEditModel): AttachmentUploadEditModel['Comment'] {
    if (this.newAttachmentMetadataCache.has(attachment.id)) {
      return this.newAttachmentMetadataCache.get(attachment.id).Comment;
    }
    return attachment.Comment;
  }

  setNewAttachmentComment(attachment: AttachmentUploadEditModel, comment: AttachmentUploadEditModel['Comment']) {
    this.newAttachmentMetadataCache.set(attachment.id, { ...attachment, Comment: comment });
  }

  async addClick() {
    if (this.onBeforeAdd !== undefined) {
      await Promise.resolve(this.onBeforeAdd());
    }
    const translations = await this.translateService
      .get([
        'REGISTRATION.GENERAL_COMMENT.ADD_PICTURE',
        'REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO',
        'REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY',
        'DIALOGS.CANCEL'
      ])
      .toPromise();
    const actionSheet = await this.actionSheetController.create({
      header: translations['REGISTRATION.GENERAL_COMMENT.ADD_PICTURE'],
      buttons: [
        {
          text: translations['REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO'],
          handler: () => this.getPicture(this.camera.PictureSourceType.CAMERA)
        },
        {
          text: translations['REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY'],
          handler: () => this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY)
        },
        {
          text: translations['DIALOGS.CANCEL'],
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  async getPicture(sourceType: PictureSourceType) {
    if (!this.platform.is('hybrid')) {
      await this.addDummyImage();
      return true;
    }
    try {
      const options: CameraOptions = {
        quality: settings.images.quality,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetHeight: settings.images.size,
        targetWidth: settings.images.size,
        correctOrientation: true,
        saveToPhotoAlbum: sourceType === PictureSourceType.CAMERA
        // NOTE: saveToPhotoAlbum=true causes a bug in latest cordova cameraplugin
      };
      const imageUrl = await this.camera.getPicture(options);
      if (!(await this.validateImage(imageUrl))) {
        this.showErrorToast('REGISTRATION.INVALID_IMAGE'); //TODO: Vis bedre feilmelding
        return true;
      }

      this.logger.debug(`Got image url from camera plugin: ${imageUrl}`, DEBUG_TAG);
      const arrayBuffer = await this.getArrayBuffer(imageUrl);
      await this.addImage(new Blob([arrayBuffer]), MIME_TYPE);
    } catch (err) {
      this.logger.log('User could not add image, most likely no access or invalid image', err, LogLevel.Warning, DEBUG_TAG);
      this.showErrorToast('Could not save image. Do you have enough space?'); //TODO: Vis bedre feilmelding og på flere språk
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
      return entry.name.endsWith('jpg');
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

  private async addDummyImage() {
    const dummyImage = await DataUrlHelper.getDataUrlFromSrcUrl('/assets/images/dummyregobsimage.jpeg');
    const blob = DataUrlHelper.convertDataURIToBinary(dummyImage);
    await this.addImage(new Blob([blob]), 'image/jpeg');
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
}
