import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { IonSlides, ModalController, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { isAndroidOrIos } from '../../../core/helpers/ionic/platform-helper';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';

@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.page.html',
  styleUrls: ['./fullscreen-image-modal.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenImageModalPage implements OnInit, OnDestroy {
  @ViewChild(IonSlides) slider: IonSlides;

  @Input() imgIndex?: number;
  @Input() allImages?: AttachmentViewModel[];
  @Input() header: string;
  @Input() description: string;
  @Input() href?: string;
  activeImageIndex: number;
  isLastSlide = true;
  isFirstSlide = true;
  isDesktop = true;
  activeIndex: number;
  slideOptions;
  isHybrid: boolean;

  constructor(
    private modalController: ModalController,
    private cdr: ChangeDetectorRef,
    private screenOrientation: ScreenOrientation,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.isHybrid = true;

    if (this.allImages && this.imgIndex >= 0) {
      if (this.isHybrid) {
        this.isDesktop = false;
        this.screenOrientation.unlock();
        this.slideOptions = {
          initialSlide: this.imgIndex,
        };
      } else {
        this.activeIndex = this.imgIndex;
        this.checkIfLastOrFirstSlide();
      }
    }
  }

  private updateUi() {
    if (!this.cdr['destroyed']) {
      this.cdr.detectChanges();
    }
  }

  async onSlideTransitionEnd() {
    this.activeIndex = await this.slider.getActiveIndex();
    this.isFirstSlide = this.activeIndex === 0;
    this.isLastSlide = this.allImages.length === this.activeIndex + 1;
    this.updateUi();
  }

  next() {
    this.slider.slideNext();
    this.updateUi();
  }

  prev() {
    this.slider.slidePrev();
    this.updateUi();
  }

  checkIfLastOrFirstSlide() {
    this.isLastSlide = this.allImages.length === this.activeIndex + 1;
    this.isFirstSlide = this.activeIndex === 0;
  }

  nextSlide() {
    !this.isLastSlide && ++this.activeIndex;
    this.checkIfLastOrFirstSlide();
    this.updateUi();
  }

  prevSlide() {
    !this.isFirstSlide && --this.activeIndex;
    this.checkIfLastOrFirstSlide();
    this.updateUi();
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
