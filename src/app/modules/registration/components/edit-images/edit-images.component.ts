import { Component, OnInit, ChangeDetectionStrategy, inject, input, model } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import {
  ActionSheetController,
  InputCustomEvent,
  IonAccordion,
  IonAccordionGroup,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonProgressBar,
  Platform,
  ToastController,
} from '@ionic/angular/standalone';
import { Camera, EncodingType, GalleryImageOptions, GalleryPhotos, TakePhotoOptions } from '@capacitor/camera';
import { settings } from '../../../../../settings';
import {
  AttachmentType,
  AttachmentUploadEditModel,
  AttachmentUploadEditModelWithBlob,
  RegistrationTid,
} from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { LogLevel } from '../../../shared/services/logging/log-level.model';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { combineLatest, firstValueFrom, map, Observable } from 'rxjs';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { ALLOWED_ATTACHMENT_FILE_TYPES, DropZoneService } from './drop-zone.service';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { AddAttachmentState } from 'src/app/modules/common-registration/services/add-new-attachment/new-attachment.service';
import { NgClass, AsyncPipe } from '@angular/common';
import { RemoteImageComponent } from '../../../shared/components/remote-image/remote-image.component';
import { TextCommentComponent } from '../text-comment/text-comment.component';
import { BlobImageComponent } from '../blob-image/blob-image.component';
import { addIcons } from 'ionicons';
import { camera, close } from 'ionicons/icons';
import { SelectComponent } from '../../../shared/components/input/select/select.component';
import { SelectOption } from 'src/app/modules/shared/components/input/select/select-option.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { getRoundedDownOrientationValue } from 'src/app/utils/getRoundedDownOrientationValue';

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
    IonAccordion,
    IonAccordionGroup,
    IonFabButton,
    IonIcon,
    IonItem,
    IonInput,
    IonLabel,
    IonProgressBar,
    NgClass,
    NgxFileDropModule,
    RemoteImageComponent,
    TextCommentComponent,
    TranslatePipe,
    SelectComponent,
  ],
})
export class EditImagesComponent implements OnInit {
  newAttachmentService = inject(NewAttachmentService);
  private regobsAuthService = inject(RegobsAuthService);
  private translateService = inject(TranslateService);
  private platform = inject(Platform);
  private logger = inject(LoggingService);
  private toastController = inject(ToastController);
  private actionSheetController = inject(ActionSheetController);
  private dropZoneService = inject(DropZoneService);
  private userSettingService = inject(UserSettingService);

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
  readonly disabled = input(false);

  getRoundedDownOrientationValue = getRoundedDownOrientationValue;
  userSettings = toSignal(this.userSettingService.userSetting$);
  myPage = toSignal(this.regobsAuthService.myPageData$);
  selectedAspect = model<number | undefined>(undefined);

  aspectOptions: SelectOption[] = Object.entries(settings.orientation).map(([key, value]) => ({
    id: +key,
    text: this.translateService.instant(value),
  }));

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

  addNewAttachmentAspect(attachment: AttachmentUploadEditModel, aspect: string | number | boolean | undefined) {
    if (aspect == null || aspect == undefined) return;
    this.newAttachmentService.saveAttachmentMeta$(this.draftUuid(), { ...attachment, Aspect: +aspect });
  }

  updateExistingAttachmentAspect(
    attachment: RemoteOrLocalAttachmentEditModel,
    aspect: string | number | boolean | undefined
  ) {
    if (aspect == null || aspect == undefined) return;
    this.existingAttachments.update((attachments) =>
      (attachments || []).map((a) => (a.AttachmentId === attachment.AttachmentId ? { ...a, Aspect: +aspect } : a))
    );
  }

  addNewAttachmentPhotographer(attachment: AttachmentUploadEditModel, event: InputCustomEvent<FocusEvent>) {
    const photographer = event.target.value;
    if (photographer == null || photographer == undefined) return;
    this.newAttachmentService.saveAttachmentMeta$(this.draftUuid(), {
      ...attachment,
      Photographer: photographer as string,
    });
  }

  updateExistingAttachmentPhotographer(attachment: RemoteOrLocalAttachmentEditModel, event: InputCustomEvent) {
    const photographer = event.detail.value;
    if (photographer == null || photographer == undefined) return;
    this.existingAttachments.update((attachments) =>
      (attachments || []).map((a) =>
        a.AttachmentId === attachment.AttachmentId ? { ...a, Photographer: photographer } : a
      )
    );
  }

  addNewAttachmentCopyright(attachment: AttachmentUploadEditModel, event: InputCustomEvent<FocusEvent>) {
    const copyRight = event.target.value;
    if (copyRight == null || copyRight == undefined) return;
    this.newAttachmentService.saveAttachmentMeta$(this.draftUuid(), { ...attachment, Copyright: copyRight as string });
  }

  updateExistingAttachmentCopyright(attachment: RemoteOrLocalAttachmentEditModel, event: InputCustomEvent) {
    const copyRight = event.detail.value;
    if (copyRight == null || copyRight == undefined) return;
    this.existingAttachments.update((attachments) =>
      (attachments || []).map((a) => (a.AttachmentId === attachment.AttachmentId ? { ...a, Copyright: copyRight } : a))
    );
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
          handler: () => this.takePhoto(),
        },
        {
          text: translations['REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY'],
          handler: () => this.chooseFromGallery(),
        },
        {
          text: translations['DIALOGS.CANCEL'],
          role: 'cancel',
        },
      ],
    });
    actionSheet.present();
  }

  private getImageOptions(): TakePhotoOptions {
    return {
      quality: settings.images.quality,
      targetHeight: settings.images.size,
      targetWidth: settings.images.size,
      correctOrientation: true,
      encodingType: EncodingType.JPEG,

      // Lagrer appen alltid til bibliotek?
      // Etter test på iOS: Nei, appen spør faktisk om å få lov til å lagre bilder i biblioteket,
      // men kun om du ikke tidligere har lagt til bilder fra bibliotek.
      // Dette er en native dialog og ikke noe vi aktivt spør om.
      // Man får som sagt kun opp dialogen om man ikke har henta bilder fra biblioteket tidligere.
      // Dette er ganske komplisert.
      // Svarer man nei på dialogen lagres ikke bilder man tar via appen på telefonen,
      // heller ikke neste gang man tar et nytt bilde.
      // I innstillingene på telefonen kan man senere endre dette via "Tilgang til bildebiblioteket", der kan man velge
      // enten "Ingen" eller "Kun legge til bilder".
      // MEN! Hvis man senere velger å legge til bilder fra biblioteket på telefonen kan man velge å gi appen enten
      // begrenset eller full tilgang. Uansett hva man velger, vil appen likevel lagre
      // kamerabilder i bilioteket selv om man opprinnelig svarte nei. Dette kan være forvirrende for brukerne.
      // Bør vi heller ha et valg i innstillingene for dette, kan være irriterende at appen alltid lagrer bilder i
      // biblioteket?
      saveToGallery: true,
    };
  }

  private getChooseFromGalleryOptions(): GalleryImageOptions {
    return {
      quality: settings.images.quality,
      width: settings.images.size,
      height: settings.images.size,
      correctOrientation: true,
    };
  }

  /**
   * Hent bilder fra bilde-biblioteket på telefonen.
   *
   * Sjekker først om appen har tillatelse, og spør evt om tillatelse hvis dette mangler.
   *
   * På iOS kan tillatelse-dialogen og plukk-bilder dialogen være forvirrende. Man kan nemlig velge mellom
   * begrenset eller full tilgang til bildebiblioteket. Velger man begrenset (limited) får man opp en dialog der man
   * kan velge hvilke bilder appen skal ha tilgang til fra bildebiblioteket. Dette er altså ikke hvilket bilde man vil
   * legge til i observasjonen, men hvilke bilder appen skal ha tilgang til på et mer overordnet nivå.
   * Meningen med dette er at appen deretter skal kunne implementere en egen dialog der brukeren kan velge mellom det
   * begrensa utvalget bilder. Dette har ikke vi implementert. Derfor kan dette virke litt forvirrende, fordi man får
   * opp to dialoger der man må velge bilder rett etter hverandre. Men dette skal kun skje første gang man spør om lov
   * til å hente bilder fra bildebiblioteket, så det bør ikke være noe stort problem.
   */
  private async getAlbumImageUrls(): Promise<string[]> {
    let imageUrls: string[] = [];
    let galleryPhotos: GalleryPhotos;
    let permissionState = await Camera.checkPermissions();
    this.logger.debug('getAlbumImageUrls Camera.checkPermissions', DEBUG_TAG, { permissionState });
    if (!['granted', 'limited'].includes(permissionState?.photos)) {
      permissionState = await Camera.requestPermissions({ permissions: ['photos'] });
      this.logger.debug('getAlbumImageUrls Camera.requestPermissions', DEBUG_TAG, { permissionState });
    }
    if (['granted', 'limited'].includes(permissionState?.photos)) {
      this.logger.debug('getAlbumImageUrls pickImages', DEBUG_TAG);
      const options = this.getChooseFromGalleryOptions();
      galleryPhotos = await Camera.pickImages(options);
      this.logger.debug('getAlbumImageUrls pickImages result', DEBUG_TAG, { galleryPhotos });
    } else {
      this.showErrorToast('REGISTRATION.IMAGE_ERROR.ALBUM_READ_PERMISSION_MISSING');
      this.logger.log('Could not get permissions to read from library', null, LogLevel.Warning, DEBUG_TAG);
      return [];
    }
    if (galleryPhotos.photos.length > 0) {
      if (this.checkAndNotifyIfUnsupportedImageFormat(galleryPhotos.photos.map((photo) => photo.format))) {
        // TODO: photo.path kan være undefined, bør vi håndtere dette bedre?
        imageUrls = galleryPhotos.photos.map((photo) => photo.path).filter((path) => path != null);
      }
    }

    this.logger.debug('getAlbumImageUrls result', DEBUG_TAG, { imageUrls });
    return imageUrls;
  }

  // TODO: Bruker nyere API for å hente bilder fra album. Ikke tatt i bruk ennå fordi den ikke konverterer HEIC-bilder til JPEG
  // private async getAlbumImageUrlsV2(): Promise<string[]> {
  //   this.logger.debug('getAlbumImageUrls chooseFromGallery', DEBUG_TAG);
  //   const options = this.getChooseFromGalleryOptions();
  //   const result = await Camera.chooseFromGallery(options);
  //   this.logger.debug('getAlbumImageUrls chooseFromGallery result', DEBUG_TAG, { result });

  //   const imageUrls = result.results.filter((media) => media.uri != null).map((media) => media.uri as string);

  //   this.logger.debug('getAlbumImageUrls result', DEBUG_TAG, { imageUrls });
  //   return imageUrls;
  // }

  private async takePhotoAndReturnImageUrl(options: TakePhotoOptions): Promise<string[]> {
    let permissionState = await Camera.checkPermissions();
    this.logger.debug('takePhotoAndReturnImageUrl Camera.checkPermissions', DEBUG_TAG, { permissionState });
    if (permissionState?.camera !== 'granted') {
      permissionState = await Camera.requestPermissions({ permissions: ['camera'] });
      this.logger.debug('takePhotoAndReturnImageUrl Camera.requestPermissions', DEBUG_TAG, { permissionState });
    }
    if (permissionState?.camera === 'granted') {
      const photo = await Camera.takePhoto(options);
      this.logger.debug('takePhotoAndReturnImageUrl Camera.takePhoto', DEBUG_TAG, {
        options,
        permissionState,
        saved: photo.saved,
      });
      if (photo?.uri) {
        return [photo.uri];
      }
    } else {
      this.showErrorToast('REGISTRATION.IMAGE_ERROR.CAMERA_PERMISSION_MISSING');
    }
    return [];
  }

  private async takePhoto() {
    this.logger.debug('takePhoto', DEBUG_TAG);
    if (!this.platform.is('hybrid')) {
      //TODO: Gjøre som vi gjør på web for å hente bilde enten fra kamera eller album
      return true;
    }
    let imageUrls: string[] = [];
    try {
      imageUrls = await this.takePhotoAndReturnImageUrl(this.getImageOptions());
      for (const imageUrl of imageUrls) {
        this.logger.debug(`Got image url from camera plugin: ${imageUrl}`, DEBUG_TAG);
        await this.attachImageFileToDraft(imageUrl, MIME_TYPE);
      }
    } catch (err) {
      const hasMessage = err instanceof Error && err.message != null;
      if (!hasMessage || !ERRORS_TO_IGNORE.includes(err.message)) {
        this.logger.log('Unknown error when taking photo', err, LogLevel.Warning, DEBUG_TAG, imageUrls);
        this.showErrorToast('REGISTRATION.IMAGE_ERROR.UNKNOWN');
      }
    }
    this.logger.debug('takePhoto return', DEBUG_TAG, { nImages: imageUrls.length });
    return true;
  }

  private async chooseFromGallery() {
    this.logger.debug('chooseFromGallery', DEBUG_TAG);
    if (!this.platform.is('hybrid')) {
      //TODO: Gjøre som vi gjør på web for å hente bilde enten fra kamera eller album
      return true;
    }
    let imageUrls: string[] = [];
    try {
      imageUrls = await this.getAlbumImageUrls();
      for (const imageUrl of imageUrls) {
        this.logger.debug(`Got image url from camera plugin: ${imageUrl}`, DEBUG_TAG);
        await this.attachImageFileToDraft(imageUrl, MIME_TYPE);
      }
    } catch (err) {
      const hasMessage = err instanceof Error && err.message != null;
      if (!hasMessage || !ERRORS_TO_IGNORE.includes(err.message)) {
        this.logger.log('Unknown error when choosing from gallery', err, LogLevel.Warning, DEBUG_TAG, imageUrls);
        this.showErrorToast('REGISTRATION.IMAGE_ERROR.UNKNOWN');
      }
    }
    this.logger.debug('chooseFromGallery return', DEBUG_TAG, { nImages: imageUrls.length });
    return true;
  }

  private checkAndNotifyIfUnsupportedImageFormat(formats: string[]) {
    if (formats.some((f) => f !== 'jpeg')) {
      this.showErrorToast('REGISTRATION.INVALID_IMAGE');
      return false;
    }
    return true;
  }

  // TODO: Nyere og dummere måte å sjekke bildeformatet på, må kanskje bruke denne når vi bytter til å bruke Capacitor.pickImages.
  // private checkAndNotifyIfUnsupportedImageFormatV2(imageUrls: string[]) {
  //   for (const imageUrl of imageUrls) {
  //     if (!imageUrl.toLowerCase().endsWith('jpg') && !imageUrl.toLowerCase().endsWith('jpeg')) {
  //       this.showErrorToast('REGISTRATION.INVALID_IMAGE');
  //       return false;
  //     }
  //   }
  //   return true;
  // }

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
