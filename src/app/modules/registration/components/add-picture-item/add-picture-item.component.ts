import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { settings } from '../../../../../settings';
import { RegistationTid } from '../../models/registrationTid.enum';
import { PictureRequestDto } from '../../../regobs-api/models';

@Component({
  selector: 'app-add-picture-item',
  templateUrl: './add-picture-item.component.html',
  styleUrls: ['./add-picture-item.component.scss']
})
export class AddPictureItemComponent implements OnInit {

  @Input() images: PictureRequestDto[];
  @Input() registrationTid: RegistationTid;

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

  async getPicture(sourceType: number) {
    const options: CameraOptions = {
      quality: settings.images.quality,
      destinationType: this.camera.DestinationType.FILE_URI,
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
      this.images.push({ PictureImageBase64: imageUrl, RegistrationTID: this.registrationTid });
    } else {
      this.images.push({ PictureImageBase64: '/assets/images/dummyregobsimage.jpg', RegistrationTID: this.registrationTid });
    }
    return true;
  }

  removeImage(image: any) {
    this.images = this.images.filter((x) => x !== image);
  }
}
