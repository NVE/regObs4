import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoSelectComponent } from './geo-select.component';

describe('AppModeSelectComponent', () => {
  let component: GeoSelectComponent;
  let fixture: ComponentFixture<GeoSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeoSelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
