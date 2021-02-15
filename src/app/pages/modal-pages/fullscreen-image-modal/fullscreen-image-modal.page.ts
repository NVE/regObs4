import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { isAndroidOrIos } from '../../../core/helpers/ionic/platform-helper';

@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.page.html',
  styleUrls: ['./fullscreen-image-modal.page.scss']
})
export class FullscreenImageModalPage implements OnInit, OnDestroy {
  @Input() imgSrc: string;
  @Input() header: string;
  @Input() description: string;

  constructor(
    private modalController: ModalController,
    private screenOrientation: ScreenOrientation,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    if (isAndroidOrIos(this.platform)) {
      this.screenOrientation.unlock();
    }
  }

  ngOnDestroy(): void {
    if (isAndroidOrIos(this.platform)) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  closeModal(): void {
    this.modalController.dismiss();
  }
}
