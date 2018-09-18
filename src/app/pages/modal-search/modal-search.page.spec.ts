import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearchPage } from './modal-search.page';

describe('ModalSearchPage', () => {
  let component: ModalSearchPage;
  let fixture: ComponentFixture<ModalSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
