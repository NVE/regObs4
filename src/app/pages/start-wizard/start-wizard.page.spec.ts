import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartWizardPage } from './start-wizard.page';

describe('StartWizardPage', () => {
  let component: StartWizardPage;
  let fixture: ComponentFixture<StartWizardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartWizardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartWizardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
