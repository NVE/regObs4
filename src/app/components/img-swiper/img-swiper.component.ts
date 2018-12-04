import { Component, OnInit, Input, EventEmitter, Output, ViewChild, NgZone, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Slides } from '@ionic/angular';

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

  hidden = true;

  comment: string;
  header: string;

  @ViewChild(Slides) slider: Slides;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.setImgHeaderAndComment(0);
  }

  updateSlider() {
    // NOTE: There is some display issues with the slider on dynamic images,
    // so have to hide and show it again to get correct display size of slides...
    this.ngZone.run(() => {
      this.hidden = true;
    });
    setTimeout(() => {
      this.ngZone.run(() => {
        this.hidden = false;
      });
      if (this.slider) {
        this.slider.update().then(() => this.cdr.detectChanges()).then(() => this.slider.update());
      }
    }, 200);
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    setTimeout(async () => {
      const index = await this.getImageIndex();
      this.ngZone.run(() => {
        this.setImgHeaderAndComment(index);
      });
    }, 50);
    this.updateSlider();
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
  }

  onImageClick(index: number, imgUrl: string) {
    this.imgClick.emit({ index, imgUrl });
  }

  async getImageIndex() {
    if (!this.slider) {
      return 0;
    }
    const index = await this.slider.getActiveIndex();
    const isEnd = await this.slider.isEnd();
    return isEnd ? (this.imgUrl.length - 1) : index;
  }

  async onSlideTransitionEnd() {
    const index = await this.getImageIndex();
    this.ngZone.run(() => {
      this.setImgHeaderAndComment(index);
    });
  }

}
