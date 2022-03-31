import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { settings } from '../../../../../settings';
import { AttachmentType, AttachmentUploadEditModel, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { DataUrlHelper } from '../../../../core/helpers/data-url.helper';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@ionic-native/file/ngx';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { LogLevel } from '../../../shared/services/logging/log-level.model';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';

const DEBUG_TAG = 'AddPictureItemComponent';
const MIME_TYPE = 'image/jpeg';

export interface AttachmentUploadEditModelWithBlob extends AttachmentUploadEditModel {
  blob: Blob;
}

// TODO: Add support for existing attachments
@Component({
  selector: 'app-add-picture-item',
  templateUrl: './add-picture-item.component.html',
  styleUrls: ['./add-picture-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPictureItemComponent extends NgDestoryBase implements OnInit {
  @Input() registrationId: string;
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

  attachments: AttachmentUploadEditModelWithBlob[];

  constructor(
    private translateService: TranslateService,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private logger: LoggingService,
    private webView: WebView,
    private toastController: ToastController,
    private domSanitizer: DomSanitizer,
    private actionSheetController: ActionSheetController,
    private newAttachmentService: NewAttachmentService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.newAttachmentService
      .getAttachments(this.registrationId)
      .pipe(
        map((attachments) =>
          attachments.filter((a) => a.RegistrationTID === this.registrationTid && a.type === this.attachmentType && a.ref === this.ref)
        ),
        switchMap((attachments) =>
          attachments.length === 0
            ? of([])
            : forkJoin([
              ...attachments.map((a) =>
                this.newAttachmentService.getBlob(this.registrationId, a.id).pipe(
                  take(1),
                  map((blob) => ({ ...a, blob })),
                  catchError((err) => {
                    this.logger.error(err, DEBUG_TAG, 'Could not get blob from attachment');
                    return of({ ...a, blob: undefined });
                  })
                )
              )
            ])
        ),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((result) => {
        this.attachments = result;
        this.cdr.detectChanges();
      });
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
      this.registrationId,
      data,
      mimeType,
      this.geoHazard,
      this.registrationTid,
      this.attachmentType,
      this.ref
    );
  }

  removeImage(image: AttachmentUploadEditModel) {
    this.newAttachmentService.removeAttachment(this.registrationId, image.id);
  }
}
