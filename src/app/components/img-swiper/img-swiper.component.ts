import { Component, OnInit, Input, EventEmitter, Output, ViewChild, NgZone } from '@angular/core';
import { Slides } from '@ionic/angular';

@Component({
  selector: 'app-img-swiper',
  templateUrl: './img-swiper.component.html',
  styleUrls: ['./img-swiper.component.scss']
})
export class ImgSwiperComponent implements OnInit {

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

  @ViewChild(Slides) slider: Slides;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.setImgHeaderAndComment(0);
  }

  updateSlider() {
    if (this.slider) {
      this.slider.update();
    }
  }

  private setImgHeaderAndComment(index: number) {
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
