import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModalPage } from './login-modal.page';

describe('LoginModalPage', () => {
  let component: LoginModalPage;
  let fixture: ComponentFixture<LoginModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
