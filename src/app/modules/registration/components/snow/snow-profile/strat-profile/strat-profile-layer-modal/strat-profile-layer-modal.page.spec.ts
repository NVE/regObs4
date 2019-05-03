import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StratProfileLayerModalPage } from './strat-profile-layer-modal.page';

describe('StratProfileLayerModalPage', () => {
  let component: StratProfileLayerModalPage;
  let fixture: ComponentFixture<StratProfileLayerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StratProfileLayerModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StratProfileLayerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
