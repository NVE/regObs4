import { IonLabel } from '@ionic/angular/standalone';
import {
  Component,
  EventEmitter,
  Output,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  inject,
  input,
} from '@angular/core';
// import { IonSlides } from '@ionic/angular';
import { ImgSwiperSlide } from './img-swiper-slide';
import { Subject } from 'rxjs';
import { ImageLocation } from './image-location.model';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';
import { BreakpointService } from '../../core/services/breakpoint.service';
import { NgIf, NgClass } from '@angular/common';
import { RemoteImageComponent } from '../../modules/shared/components/remote-image/remote-image.component';
import { StaticMapImageComponent } from '../../modules/static-map-image/static-map-image.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-img-swiper',
  templateUrl: './img-swiper.component.html',
  styleUrls: ['./img-swiper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonLabel, NgClass, NgIf, RemoteImageComponent, StaticMapImageComponent, TranslatePipe],
})
export class ImgSwiperComponent implements OnChanges, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private breakpointService = inject(BreakpointService);

  readonly attachments = input<AttachmentViewModel[]>([]);
  readonly showLabels = input(true);
  readonly location = input<ImageLocation>();
  readonly withFallbackText = input(true);
  readonly small = input(false);
  @Output() locationClick: EventEmitter<ImageLocation> = new EventEmitter();
  @Output() imgClick: EventEmitter<{
    index: number;
    imgUrl: string;
  }> = new EventEmitter();
  isDesktop?: boolean;
  slideOptions?: any;

  ngOnInit() {
    this.breakpointService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
    this.slideOptions = {
      autoplay: false,
      slidesPerView: 'auto',
      zoom: false,
      breakpoints: {
        800: {
          slidesPerView: this.checkAmountOfPictures(),
          spaceBetween: 0,
        },
      },
      keyboard: {
        enabled: true,
      },
    };
  }

  moreThanFourPics = false;

  state: 'loading' | 'empty' | 'singleimage' | 'singlemap' | 'loading-swiper' | 'swiper-ready' = 'loading';
  slides: ImgSwiperSlide[] = [];
  activeIndex = 0;

  private ngDestroy$ = new Subject<void>();
  private touchStart$ = new Subject<void>();

  // @ViewChild(IonSlides) slider: IonSlides;

  get isEmpty() {
    return this.state === 'empty';
  }

  get isLoaded() {
    return this.state !== 'loading' && this.state !== 'loading-swiper';
  }

  get isSwiperLoaded() {
    return this.state === 'swiper-ready';
  }

  get isSwiper() {
    return this.state === 'swiper-ready' || this.state === 'loading-swiper';
  }

  get isSingleImage() {
    return this.state === 'singleimage';
  }

  get isSingleMap() {
    return this.state === 'singlemap';
  }

  get showLabel() {
    return (
      this.slides &&
      this.slides[this.activeIndex] &&
      (this.slides[this.activeIndex].header || this.slides[this.activeIndex].description)
    );
  }

  get shouldMoveMap() {
    const attachments = this.attachments();
    return this.location() && attachments && attachments.length > 0 && !this.isDesktop;
  }

  get imageLength() {
    const attachments = this.attachments();
    return attachments ? attachments.length : 0;
  }

  get imageIndex() {
    if (this.slides[this.activeIndex] && this.slides[this.activeIndex].type === 'image') {
      return this.getImageIndex(this.slides[this.activeIndex].img as AttachmentViewModel);
    }
    return 0;
  }

  get showIndex() {
    const attachments = this.attachments();
    if (attachments && attachments.length > 1) {
      return this.location() ? this.activeIndex > 0 : true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.cdr.detach();
  }

  checkAmountOfPictures(): number {
    const attachments = this.attachments();
    if (attachments.length === 3 && !this.location()) {
      this.moreThanFourPics = false;
      return 3;
    }
    if (attachments.length >= 3) {
      this.moreThanFourPics = true;
      return 3;
    }
    if (attachments.length === 2) {
      return 3;
    }
    if (attachments.length === 1) {
      return 2;
    }
    return 1;
  }

  slidesLoaded() {
    this.state = 'swiper-ready';
    this.updateUi();
  }

  ngOnChanges() {
    this.state = 'loading';
    this.updateUi();
    setTimeout(() => this.init(), 0);
  }

  private init() {
    this.slides = [];
    const location = this.location();
    if (location) {
      this.slides.push({
        type: 'location',
        img: location,
        header: 'REGISTRATION.OBS_LOCATION.TITLE',
      });
    }
    this.slides = [...this.getLocationSlides(), ...this.getImageSlides()];
    this.activeIndex = 0;
    this.state = this.calculateNewState();
    this.updateUi();
  }

  private updateUi() {
    // if (!this.cdr['destroyed']) {
    this.cdr.detectChanges();
    // }
  }

  private calculateNewState() {
    const location = this.location();
    const attachments = this.attachments();
    const attachmentsValue = this.attachments();
    if (location && (!attachments || attachmentsValue.length === 0)) {
      return 'singlemap';
    } else if (!location && attachmentsValue && attachmentsValue.length === 1) {
      return 'singleimage';
    } else if (!location && (!attachmentsValue || attachmentsValue.length === 0)) {
      return 'empty';
    } else {
      return 'loading-swiper';
    }
  }

  private getLocationSlides(): ImgSwiperSlide[] {
    const location = this.location();
    return location
      ? [
          {
            type: 'location',
            img: location,
            header: 'REGISTRATION.OBS_LOCATION.TITLE',
          },
        ]
      : [];
  }

  private getImageSlides(): ImgSwiperSlide[] {
    return (this.attachments() || []).map((img, index) => ({
      type: 'image',
      img,
      header: this.attachments()[index].RegistrationName,
      description: this.attachments()[index].Comment,
    }));
  }

  getImageIndex(img: AttachmentViewModel) {
    const attachments = this.attachments();
    if (attachments) {
      return attachments.indexOf(img);
    } else {
      return -1;
    }
  }

  onImageClick(img: AttachmentViewModel) {
    const index = this.getImageIndex(img);
    if (index >= 0 && img.Url) {
      this.imgClick.emit({ index, imgUrl: img.Url });
    }
  }

  onLocationClick() {
    this.locationClick.emit(this.location());
  }

  onSlideTouchStart() {
    this.touchStart$.next();
  }

  async getSwiperIndex() {
    // const index = await (this.slider ? this.slider.getActiveIndex() : 0);
    // const isEnd = await (this.slider ? this.slider.isEnd() : Promise.resolve(false));
    // return isEnd ? (this.slides ? this.slides.length - 1 : 0) : index;
    throw new Error('Not implemented after Ionic v7 upgrade');
  }

  async onSlideTransitionEnd() {
    // this.activeIndex = await this.getSwiperIndex();
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

  isPreviousImgAvailable(): boolean {
    if (this.location()) {
      return this.activeIndex >= 1;
    }
    return this.activeIndex >= 1;
  }

  isNextImgAvailable() {
    if (this.location()) {
      return this.activeIndex + 1 < this.attachments().length;
    }
    return this.activeIndex + 2 < this.attachments().length;
  }
}
