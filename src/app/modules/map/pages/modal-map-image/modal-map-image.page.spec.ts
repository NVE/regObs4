import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMapImagePage } from './modal-map-image.page';

describe('ModalMapImagePage', () => {
  let component: ModalMapImagePage;
  let fixture: ComponentFixture<ModalMapImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMapImagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMapImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
