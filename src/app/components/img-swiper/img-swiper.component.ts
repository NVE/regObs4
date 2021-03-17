import {
  Component,
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
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';
import { BreakpointService } from '../../core/services/breakpoint.service';

@Component({
  selector: 'app-img-swiper',
  templateUrl: './img-swiper.component.html',
  styleUrls: ['./img-swiper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgSwiperComponent implements OnChanges, OnDestroy {
  @Input() attachments: AttachmentViewModel[] = [];
  @Input() showLabels = true;
  @Input() location: ImageLocation;
  @Input() withFallbackText = true;
  @Input() small = false;
  @Output() locationClick: EventEmitter<ImageLocation> = new EventEmitter();
  @Output() imgClick: EventEmitter<{
    index: number;
    imgUrl: string;
  }> = new EventEmitter();
  isDesktop: boolean;
  slideOptions;

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
          spaceBetween: 0
        }
      },
      keyboard: {
        enabled: true
      }
    };
  }

  moreThanFourPics = false;

  swiper: any;
  state:
    | 'loading'
    | 'empty'
    | 'singleimage'
    | 'singlemap'
    | 'loading-swiper'
    | 'swiper-ready' = 'loading';
  slides: ImgSwiperSlide[];
  activeIndex = 0;

  private ngDestroy$ = new Subject<void>();
  private touchStart$ = new Subject<void>();

  @ViewChild(IonSlides) slider: IonSlides;

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
      (this.slides[this.activeIndex].header ||
        this.slides[this.activeIndex].description)
    );
  }

  get shouldMoveMap() {
    return this.location && this.attachments && this.attachments.length > 0 && !this.isDesktop;
  }

  get imageLength() {
    return this.attachments ? this.attachments.length : 0;
  }

  get imageIndex() {
    if (
      this.slides[this.activeIndex] &&
      this.slides[this.activeIndex].type === 'image'
    ) {
      return this.getImageIndex(this.slides[this.activeIndex].img as AttachmentViewModel);
    }
    return 0;
  }

  get showIndex() {
    if (this.attachments && this.attachments.length > 1) {
      return this.location ? this.activeIndex > 0 : true;
    }
    return false;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private breakpointService: BreakpointService
  ) {}

  ngOnDestroy(): void {
    this.cdr.detach();
  }

  checkAmountOfPictures(): number {
    if (this.attachments.length >= 3) {
      this.moreThanFourPics = true;
      return 3;
    }
    if (this.attachments.length === 1) {
      return 2;
    }
    return 1;
  }

  slidesLoaded(el: any) {
    this.swiper = el.target.swiper;
    // TODO: Dette (tror jeg) fører til at img-swiperen ikke fungerer
    // if (this.shouldMoveMap) {
    //   this.activeIndex = 1;
    //   interval(100)
    //     .pipe(takeUntil(race(this.ngDestroy$, this.touchStart$)))
    //     .subscribe(() => {
    //       this.moveMapInSwiperToLeftOutsideView();
    //     });
    // }
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
    this.slides = [...this.getLocationSlides(), ...this.getImageSlides()];
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
    if (this.location && (!this.attachments || this.attachments.length === 0)) {
      return 'singlemap';
    } else if (!this.location && this.attachments && this.attachments.length === 1) {
      return 'singleimage';
    } else if (!this.location && (!this.attachments || this.attachments.length === 0)) {
      return 'empty';
    } else {
      return 'loading-swiper';
    }
  }

  private getLocationSlides(): ImgSwiperSlide[] {
    return this.location
      ? [
        {
          type: 'location',
          img: this.location,
          header: 'REGISTRATION.OBS_LOCATION.TITLE'
        }
      ]
      : [];
  }

  private getImageSlides(): ImgSwiperSlide[] {
    return (this.attachments || []).map((img, index) => ({
      type: 'image',
      img,
      header: this.attachments[index].RegistrationName,
      description: this.attachments[index].Comment
    }));
  }

  private moveMapInSwiperToLeftOutsideView() {
    if (this.swiper && this.swiper.$wrapperEl && this.swiper.$wrapperEl[0]) {
      this.swiper.$wrapperEl[0].style.transform = 'translate3d(-60%, 0px, 0px)';
    }
  }

  getImageIndex(img: AttachmentViewModel) {
    if (this.attachments) {
      return this.attachments.indexOf(img);
    } else {
      return -1;
    }
  }

  onImageClick(img: AttachmentViewModel) {
    const index = this.getImageIndex(img);
    if (index >= 0) {
      this.imgClick.emit({ index, imgUrl: img.Url });
    }
  }

  onLocationClick() {
    this.locationClick.emit(this.location);
  }

  onSlideTouchStart() {
    this.touchStart$.next();
  }

  async getSwiperIndex() {
    const index = await (this.slider ? this.slider.getActiveIndex() : 0);
    const isEnd = await (this.slider
      ? this.slider.isEnd()
      : Promise.resolve(false));
    return isEnd ? (this.slides ? this.slides.length - 1 : 0) : index;
  }

  async onSlideTransitionEnd() {
    this.activeIndex = await this.getSwiperIndex();
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
}
