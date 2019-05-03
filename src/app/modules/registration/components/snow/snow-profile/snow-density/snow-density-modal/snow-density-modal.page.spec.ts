import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowDensityModalPage } from './snow-density-modal.page';

describe('SnowDensityModalPage', () => {
  let component: SnowDensityModalPage;
  let fixture: ComponentFixture<SnowDensityModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowDensityModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowDensityModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
