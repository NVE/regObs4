import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceThicknessPage } from './ice-thickness.page';

describe('IceThicknessPage', () => {
  let component: IceThicknessPage;
  let fixture: ComponentFixture<IceThicknessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceThicknessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceThicknessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
