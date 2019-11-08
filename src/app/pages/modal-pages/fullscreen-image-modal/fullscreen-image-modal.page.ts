import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { ModalController, Platform, IonSlides } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.page.html',
  styleUrls: ['./fullscreen-image-modal.page.scss'],
})
export class FullscreenImageModalPage implements OnInit, OnDestroy {

  @Input() imgSrc: string;
  @Input() header: string;
  @Input() description: string;

  constructor(
    private modalController: ModalController,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
  ) { }

  ngOnInit() {
    if (this.platform.isAndroidOrIos()) {
      this.screenOrientation.unlock();
    }
  }

  ngOnDestroy(): void {
    if (this.platform.isAndroidOrIos()) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
