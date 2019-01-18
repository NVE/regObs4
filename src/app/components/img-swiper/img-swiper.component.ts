import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  NgZone,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-img-swiper',
  templateUrl: './img-swiper.component.html',
  styleUrls: ['./img-swiper.component.scss']
})
export class ImgSwiperComponent implements OnInit, OnChanges {

  @Input() imgUrl: string[] = [];
  @Input() imgComments: string[] = [];
  @Input() imgHeaders: string[] = [];
  @Output() imgClick: EventEmitter<{ index: number, imgUrl: string }> = new EventEmitter();

  slideOptions = {
    autoplay: false,
    slidesPerView: 'auto',
    spaceBetween: 5,
  };

  comment: string;
  header: string;
  imageIndex: number;
  totalImages: number;

  @ViewChild(IonSlides) slider: IonSlides;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.setImgHeaderAndComment(0);
  }

  updateSlider() {
    if (this.slider) {
      this.slider.update();
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    setTimeout(() => {
      this.getImageIndex().then((index) => {
        this.setImgHeaderAndComment(index);
        this.updateSlider();
      });
    });
  }

  private setImgHeaderAndComment(index: number) {
    this.comment = undefined;
    this.header = undefined;
    if (this.imgComments.length > index) {
      this.comment = this.imgComments[index];
    }
    if (this.imgHeaders.length > index) {
      this.header = this.imgHeaders[index];
    }
    this.imageIndex = (index + 1);
    this.totalImages = this.imgUrl.length;
  }

  onImageClick(index: number, imgUrl: string) {
    this.imgClick.emit({ index, imgUrl });
  }

  async getImageIndex() {
    const index = await (this.slider ? this.slider.getActiveIndex() : Promise.resolve(0));
    const isEnd = await (this.slider ? this.slider.isEnd() : Promise.resolve(false));
    return isEnd ? (this.imgUrl.length - 1) : index;
  }

  async onSlideTransitionEnd() {
    const index = await this.getImageIndex();
    this.ngZone.run(() => {
      this.setImgHeaderAndComment(index);
    });
  }

}
