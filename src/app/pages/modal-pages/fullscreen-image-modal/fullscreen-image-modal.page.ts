import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IonSlides, ModalController, Platform } from '@ionic/angular';
import { isAndroidOrIos } from '../../../core/helpers/ionic/platform-helper';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';
import { Router } from '@angular/router';

type HrefType = { title: string; url: string };

@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.page.html',
  styleUrls: ['./fullscreen-image-modal.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenImageModalPage implements OnInit {
  @ViewChild(IonSlides) slider: IonSlides;

  @Input() imgIndex: number;
  @Input() allImages: AttachmentViewModel[];
  @Input() href?: HrefType;
  isLastSlide = true;
  isFirstSlide = true;
  activeImageIndex: number;
  slideOptions;
  isHybrid: boolean;

  constructor(
    private modalController: ModalController,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isHybrid = isAndroidOrIos(this.platform);

    if (this.allImages && this.imgIndex >= 0) {
      this.activeImageIndex = this.imgIndex;
      this.checkIfLastOrFirstSlide();
      if (this.isHybrid) {
        this.slideOptions = {
          initialSlide: this.imgIndex,
        };
      }
    }
  }

  private updateUi() {
    if (!this.cdr['destroyed']) {
      this.cdr.detectChanges();
    }
  }

  async onSlideTransitionEnd() {
    this.activeImageIndex = await this.slider.getActiveIndex();
    this.isFirstSlide = this.activeImageIndex === 0;
    this.isLastSlide = this.allImages.length === this.activeImageIndex + 1;
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
    this.isLastSlide = this.allImages.length === this.activeImageIndex + 1;
    this.isFirstSlide = this.activeImageIndex === 0;
  }

  nextSlide() {
    !this.isLastSlide && ++this.activeImageIndex;
    this.checkIfLastOrFirstSlide();
    this.updateUi();
  }

  prevSlide() {
    !this.isFirstSlide && --this.activeImageIndex;
    this.checkIfLastOrFirstSlide();
    this.updateUi();
  }

  closeModal(): void {
    this.modalController.dismiss();
  }
}
