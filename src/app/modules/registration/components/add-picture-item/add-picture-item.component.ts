import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { settings } from '../../../../../settings';
import { RegistrationTid } from '../../models/registrationTid.enum';
import { PictureRequestDto } from '../../../regobs-api/models';

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

  constructor(
    private translateService: TranslateService,
    private camera: Camera,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
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

  async getPicture(sourceType: number) {
    const options: CameraOptions = {
      quality: settings.images.quality,
      destinationType: this.camera.DestinationType.DATA_URL, // NOTE: Base64 encode. If API supports upload image blob later,
      // this should be changed to FILE_URL and uploaded separatly
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: settings.images.size,
      targetWidth: settings.images.size,
      correctOrientation: true,
      saveToPhotoAlbum: true,
    };
    if (this.platform.is('cordova')) {
      const imageUrl = await this.camera.getPicture(options);
      this.images.push({
        PictureImageBase64: imageUrl.slice(DATA_URL_TAG.length, imageUrl.length),
        RegistrationTID: this.registrationTid
      });
    } else {
      const dummyImage = await this.toDataURL('/assets/images/dummyregobsimage.jpeg');
      this.images.push({
        PictureImageBase64: dummyImage.slice(DATA_URL_TAG.length, dummyImage.length),
        RegistrationTID: this.registrationTid
      });
    }
    this.cdr.detectChanges();
    return true;
  }

  private toDataURL(url: string): Promise<string> {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(<string>reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.cdr.detectChanges();
  }
}
