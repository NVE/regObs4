import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-picture-item',
  templateUrl: './add-picture-item.component.html',
  styleUrls: ['./add-picture-item.component.scss']
})
export class AddPictureItemComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private camera: Camera,
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
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 1800,
      targetWidth: 1800,
      correctOrientation: true,
      saveToPhotoAlbum: true,
    };
    const image = await this.camera.getPicture(options);
    return true;
  }
}
