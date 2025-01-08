import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  input,
  linkedSignal,
  computed,
} from '@angular/core';
import { IonFabButton, IonIcon, IonItem, ModalController, Platform } from '@ionic/angular/standalone';
import { AttachmentViewModel } from '../../../modules/common-regobs-api';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

type HrefType = { title: string; url: string };

@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.page.html',
  styleUrls: ['./fullscreen-image-modal.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonFabButton, IonIcon, IonItem, NgIf, TranslatePipe],
})
export class FullscreenImageModalPage {
  private modalController = inject(ModalController);
  private cdr = inject(ChangeDetectorRef);
  private platform = inject(Platform);
  private router = inject(Router);

  // @ViewChild(IonSlides) slider: IonSlides;

  imgIndex = input.required<number>();
  allImages = input.required<AttachmentViewModel[]>();
  href = input<HrefType>();

  activeImage = linkedSignal<AttachmentViewModel>(() => this.allImages()[this.imgIndex()]);
  isFirstSlide = computed(() => this.allImages()[0] === this.activeImage());
  isLastSlide = computed(() => this.allImages().at(-1) === this.activeImage());

  slideOptions = computed(() => ({ initialSlide: this.imgIndex() }));

  constructor() {
    addIcons({ close });
  }

  async onSlideTransitionEnd() {
    // this.activeImageIndex = await this.slider.getActiveIndex();
    // this.isFirstSlide = this.activeImageIndex === 0;
    // this.isLastSlide = this.allImages.length === this.activeImageIndex + 1;
    // this.updateUi();
    throw new Error('Not implemented after Ionic v7 upgrade');
  }

  next() {
    // this.slider.slideNext();
    // this.updateUi();
    throw new Error('Not implemented after Ionic v7 upgrade');
  }

  prev() {
    // this.slider.slidePrev();
    // this.updateUi();
    throw new Error('Not implemented after Ionic v7 upgrade');
  }

  nextSlide() {
    const images = this.allImages();
    const index = images.indexOf(this.activeImage());
    const newIndex = Math.min(images.length - 1, index + 1);
    this.activeImage.set(images[newIndex]);
  }

  prevSlide() {
    const images = this.allImages();
    const index = images.indexOf(this.activeImage());
    const newIndex = Math.max(0, index - 1);
    this.activeImage.set(images[newIndex]);
  }

  closeModal(): void {
    this.modalController.dismiss();
  }
}
