import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowTempModalPage } from './snow-temp-modal.page';

describe('SnowTempModalPage', () => {
  let component: SnowTempModalPage;
  let fixture: ComponentFixture<SnowTempModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowTempModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowTempModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
