import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { settings } from '../../../../../settings';
import { RegistrationTid } from '../../models/registrationTid.enum';
import { PictureRequestDto } from '../../../regobs-api/models';
import { DataUrlHelper } from '../../../../core/helpers/data-url.helper';

const DATA_URL_TAG = 'data:image/jpeg;base64,';

@Component({
  selector: 'app-add-picture-item',
  templateUrl: './add-picture-item.component.html',
  styleUrls: ['./add-picture-item.component.scss']
})
export class AddPictureItemComponent implements OnInit {

  @Input() images: PictureRequestDto[];
  @Input() registrationTid: RegistrationTid;
  @Output() imagesChange = new EventEmitter();
  @Input() title = 'REGISTRATION.ADD_IMAGES';
  @Input() pictureCommentText = 'REGISTRATION.IMAGE_DESCRIPTION';
  @Input() showPictureCommentText = true;
  @Input() pictureCommentPlaceholder = 'REGISTRATION.IMAGE_DESCRIPTION_PLACEHOLDER';
  @Input() showPictureCommentPlaceholder = true;
  @Input() icon = 'camera';
  @Input() showIcon = true;
  @Input() iconColor = 'dark';

  get imagesForCurrentRegistrationTid() {
    return this.images ? this.images.filter((image) => image.RegistrationTID === this.registrationTid) : [];
  }

  constructor(
    private translateService: TranslateService,
    private camera: Camera,
    private platform: Platform,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async addClick() {
    const translations = await this.translateService.get(
      [
        'REGISTRATION.GENERAL_COMMENT.ADD_PICTURE',
        'REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO',
        'REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY',
        'DIALOGS.CANCEL'
      ]).toPromise();
    const actionSheet = await this.actionSheetController.create({
      header: translations['REGISTRATION.GENERAL_COMMENT.ADD_PICTURE'],
      buttons: [
        {
          text: translations['REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO'],
          handler: () => this.getPicture(this.camera.PictureSourceType.CAMERA),
        },
        {
          text: translations['REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY'],
          handler: () => this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY),
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
    if (!this.platform.is('cordova')) {
      await this.addDummyImage();
      return true;
    }
    const options: CameraOptions = {
      quality: settings.images.quality,
      destinationType: this.camera.DestinationType.DATA_URL,
      // NOTE: Base64 encode. If API supports upload image blob later,
      // this should be changed to FILE_URL and uploaded separatly
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: settings.images.size,
      targetWidth: settings.images.size,
      correctOrientation: true,
      saveToPhotoAlbum: sourceType === PictureSourceType.CAMERA,
    };
    const imageUrl = await this.camera.getPicture(options);
    this.addBase64Image(`${DATA_URL_TAG}${imageUrl}`);
    return true;
  }

  private async addDummyImage() {
    const dummyImage = await DataUrlHelper.getDataUrlFromSrcUrl('/assets/images/dummyregobsimage.jpeg');
    this.addBase64Image(dummyImage);
  }

  addBase64Image(dataUrl: string) {
    this.images.push({
      PictureImageBase64: dataUrl,
      RegistrationTID: this.registrationTid
    });
    this.imagesChange.emit(this.images);
  }

  removeImage(image: PictureRequestDto) {
    const index = this.images.indexOf(image);
    if (index >= 0) {
      this.images.splice(index, 1);
      this.imagesChange.emit(this.images);
    }
  }
}
