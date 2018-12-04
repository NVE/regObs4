import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSwiperComponent } from './img-swiper.component';

describe('ImgSwiperComponent', () => {
  let component: ImgSwiperComponent;
  let fixture: ComponentFixture<ImgSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
