import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowDensityLayerModalPage } from './snow-density-layer-modal.page';

describe('SnowDensityLayerModalPage', () => {
  let component: SnowDensityLayerModalPage;
  let fixture: ComponentFixture<SnowDensityLayerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowDensityLayerModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowDensityLayerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
