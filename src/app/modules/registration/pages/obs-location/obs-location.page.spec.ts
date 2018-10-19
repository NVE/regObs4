import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsLocationPage } from './obs-location.page';

describe('ObsLocationPage', () => {
  let component: ObsLocationPage;
  let fixture: ComponentFixture<ObsLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObsLocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObsLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
