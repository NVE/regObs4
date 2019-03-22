import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  NgZone,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { IonSlides } from '@ionic/angular';
import * as L from 'leaflet';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-img-swiper',
  templateUrl: './img-swiper.component.html',
  styleUrls: ['./img-swiper.component.scss']
})
export class ImgSwiperComponent implements OnInit, OnChanges {

  @Input() imgUrl: string[] = [];
  @Input() showLabels = true;
  @Input() imgComments: string[] = [];
  @Input() imgHeaders: string[] = [];
  @Output() imgClick: EventEmitter<{ index: number, imgUrl: string }> = new EventEmitter();
  @Input() location: { latLng: L.LatLng, geoHazard: GeoHazard };

  slideOptions = {
    autoplay: false,
    slidesPerView: 'auto',
  };

  comment: string;
  header: string;
  imageIndex: number;
  loadedWithMap: boolean;
  swiper: any;
  swiperLoaded = false;

  @ViewChild(IonSlides) slider: IonSlides;

  get totalImages() {
    return this.imgUrl.length;
  }

  get showSingleImage() {
    return this.totalImages === 1 && !this.location;
  }

  get showSingleMap() {
    return this.location && this.totalImages === 0;
  }

  get showSlider() {
    return !this.showSingleImage && !this.showSingleMap;
  }

  get show() {
    return this.location || this.totalImages > 0;
  }

  get showImageIndex() {
    return this.imageIndex !== undefined && this.totalImages > 1;
  }

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
  }

  slidesLoaded(el: any) {
    this.swiper = el.target.swiper;
    console.log('init slidesLoaded');
    this.init();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes && changes.imgUrl && !changes.imgUrl.firstChange) {
      if (this.slider) {
        await this.slider.update();
      }
      console.log('init from ngOnChanges', changes);
      this.init();
    }
  }

  private async init() {
    if (this.slider) {
      await this.slider.slideTo(0, 0);
    } else {
      console.log('init, but slider is not loaed...');
    }
    if (this.swiper && this.swiper.$wrapperEl && this.swiper.$wrapperEl[0]) {
      this.swiper.$wrapperEl[0].style.transform = 'translate3d(-60%, 0px, 0px)';
    } else {
      console.log('init, but swiper wrapper is not loaed...');
    }
    this.ngZone.run(() => {
      this.setImgHeaderAndComment(0);
      this.swiperLoaded = true;
    });
  }

  private resetImageHeaderAndComment() {
    this.comment = undefined;
    this.header = undefined;
    this.imageIndex = undefined;
  }

  private setImgHeaderAndComment(index: number) {
    this.resetImageHeaderAndComment();
    if (this.imgComments.length > index) {
      this.comment = this.imgComments[index];
    }
    if (this.imgHeaders.length > index) {
      this.header = this.imgHeaders[index];
    }
    this.imageIndex = (index + 1);
  }

  onImageClick(index: number, imgUrl: string) {
    this.imgClick.emit({ index, imgUrl });
  }

  async getSwiperIndex() {
    const index = await (this.slider ? this.slider.getActiveIndex() : Promise.resolve(0));
    const isEnd = await (this.slider ? this.slider.isEnd() : Promise.resolve(false));
    return isEnd ? (this.imgUrl.length - 1 + (this.location ? 1 : 0)) : index;
  }

  async onSlideTransitionEnd() {
    const index = await this.getSwiperIndex();
    this.ngZone.run(() => {
      if (this.location && index === 0) {
        this.resetImageHeaderAndComment();
      } else {
        this.setImgHeaderAndComment(index - (this.location ? 1 : 0));
      }
    });
  }

}
