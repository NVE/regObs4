import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import * as utils from '@nano-sql/core/lib/utilities';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { isAndroidOrIos } from '../../../core/helpers/ionic/platform-helper';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';

@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.page.html',
  styleUrls: ['./fullscreen-image-modal.page.scss'],
})
export class FullscreenImageModalPage implements OnInit, OnDestroy {
  @Input() imgSrc?: string;
  @Input() imgIndex?: number;
  @Input() allImages?: AttachmentViewModel[];
  @Input() header: string;
  @Input() description: string;
  @Input() href?: string;
  currentImage: string;
  currentImageIndex: number;
  isLast = true;
  isFirst = true;

  constructor(
    private modalController: ModalController,
    private screenOrientation: ScreenOrientation,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    if (isAndroidOrIos(this.platform)) {
      this.screenOrientation.unlock();
    }

    if (this.imgSrc) {
      this.currentImage = this.imgSrc;
    }

    if (this.allImages && this.imgIndex >= 0) {
      this.currentImageIndex = this.imgIndex;
      this.renderImage(this.currentImageIndex);
    }
  }

  private getImageUrl(
    attachment: AttachmentViewModel,
    size: 'Thumbnail' | 'Medium' | 'Large' | 'Original' | 'Raw' = 'Large'
  ): string {
    return attachment.UrlFormats[size] || attachment.Url;
  }

  checkImagePosition(index: number) {
    if (this.allImages.length === index + 1) {
      this.isLast = true;
    } else {
      this.isLast = false;
    }

    if (index === 0) {
      this.isFirst = true;
    } else {
      this.isFirst = false;
    }
  }

  renderImage2(index: number) {
    const img = this.allImages[index] as AttachmentViewModel & { Href: string };
    return `${this.getImageUrl(img, 'Original')}?r=${utils.uuid()}`;
  }

  renderImage(index: number) {
    this.checkImagePosition(index);
    const img = this.allImages[index] as AttachmentViewModel & { Href: string };
    this.currentImage = `${this.getImageUrl(img, 'Original')}?r=${utils.uuid()}`;
  }

  changeImage(next: boolean) {
    next ? this.currentImageIndex++ : this.currentImageIndex--;
    this.renderImage(this.currentImageIndex);
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
