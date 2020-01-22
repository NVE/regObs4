import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ImgSwiperSlide } from './img-swiper-slide';
import { Subject, interval, race } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImageLocation } from './image-location.model';

@Component({
  selector: 'app-img-swiper',
  templateUrl: './img-swiper.component.html',
  styleUrls: ['./img-swiper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ImgSwiperComponent implements OnInit, OnChanges, OnDestroy {


  @Input() imgUrl: string[] = [];
  @Input() showLabels = true;
  @Input() imgComments: string[] = [];
  @Input() imgHeaders: string[] = [];
  @Output() imgClick: EventEmitter<{ index: number, imgUrl: string }> = new EventEmitter();
  @Input() location: ImageLocation;
  @Output() locationClick: EventEmitter<ImageLocation> = new EventEmitter();

  slideOptions = {
    autoplay: false,
    slidesPerView: 'auto',
    zoom: false
  };

  swiper: any;
  state: 'loading' | 'empty' | 'singleimage' | 'singlemap' | 'loading-swiper' | 'swiper-ready' = 'loading';
  slides: ImgSwiperSlide[];
  activeIndex = 0;

  private ngDestroy$ = new Subject();
  private touchStart$ = new Subject();

  @ViewChild(IonSlides, { static: false }) slider: IonSlides;

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
    return this.slides && this.slides[this.activeIndex] &&
      (this.slides[this.activeIndex].header || this.slides[this.activeIndex].description);
  }

  get shouldMoveMap() {
    return this.location && this.imgUrl && this.imgUrl.length > 0;
  }

  get imageLength() {
    return this.imgUrl ? this.imgUrl.length : 0;
  }

  get imageIndex() {
    if (this.slides[this.activeIndex] && this.slides[this.activeIndex].type === 'image') {
      return this.getImageIndex(this.slides[this.activeIndex].img as string);
    }
    return 0;
  }

  get showIndex() {
    if (this.imgUrl && this.imgUrl.length > 1) {
      return this.location ? (this.activeIndex > 0) : true;
    }
    return false;
  }

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.cdr.detach();
  }

  slidesLoaded(el: any) {
    this.swiper = el.target.swiper;
    if (this.shouldMoveMap) {
      this.activeIndex = 1;
      interval(100).pipe(takeUntil(race(this.ngDestroy$, this.touchStart$))).subscribe(() => {
        this.moveMapInSwiperToLeftOutsideView();
      });
    }
    this.state = 'swiper-ready';
    this.updateUi();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.state = 'loading';
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = undefined;
    }
    this.updateUi();
    setTimeout(() => this.init(), 0);
  }

  private init() {
    this.slides = [];
    if (this.location) {
      this.slides.push({
        type: 'location',
        img: this.location,
        header: 'REGISTRATION.OBS_LOCATION.TITLE'
      });
    }
    this.slides = [
      ...this.getLocationSlides(),
      ...this.getImageSlides(),
    ];
    this.activeIndex = 0;
    this.state = this.calculateNewState();
    this.updateUi();
  }

  private updateUi() {
    if (!this.cdr['destroyed']) {
      this.cdr.detectChanges();
    }
  }

  private calculateNewState() {
    if (this.location && (!this.imgUrl || this.imgUrl.length === 0)) {
      return 'singlemap';
    } else if (!this.location && this.imgUrl && this.imgUrl.length === 1) {
      return 'singleimage';
    } else if (!this.location && (!this.imgUrl || this.imgUrl.length === 0)) {
      return 'empty';
    } else {
      return 'loading-swiper';
    }
  }

  private getLocationSlides(): ImgSwiperSlide[] {
    return this.location ? [{
      type: 'location',
      img: this.location,
      header: 'REGISTRATION.OBS_LOCATION.TITLE'
    }] : [];
  }

  private getImageSlides(): ImgSwiperSlide[] {
    return (this.imgUrl || []).map((img, index) => ({
      type: 'image',
      img,
      header: this.imgHeaders[index],
      description: this.imgComments[index],
    }));
  }

  private moveMapInSwiperToLeftOutsideView() {
    if (this.swiper && this.swiper.$wrapperEl && this.swiper.$wrapperEl[0]) {
      this.swiper.$wrapperEl[0].style.transform = 'translate3d(-60%, 0px, 0px)';
    }
  }

  getImageIndex(src: string) {
    return (this.imgUrl && this.imgUrl.length > 0) ? this.imgUrl.indexOf(src) : -1;
  }

  onImageClick(imgUrlSrc: string) {
    const index = this.getImageIndex(imgUrlSrc);
    if (index >= 0) {
      this.imgClick.emit({ index, imgUrl: imgUrlSrc });
    }
  }

  onLocationClick() {
    this.locationClick.emit(this.location);
  }

  onSlideTouchStart() {
    this.touchStart$.next();
  }

  async getSwiperIndex() {
    if (this.slider) {
      const index = await this.slider.getActiveIndex();
      const isEnd = await this.slider.isEnd();
      return isEnd ? (this.slides.length - 1) : index;
    }
    return 0;
  }

  async onSlideTransitionEnd() {
    this.activeIndex = await this.getSwiperIndex();
    this.updateUi();
  }
}
