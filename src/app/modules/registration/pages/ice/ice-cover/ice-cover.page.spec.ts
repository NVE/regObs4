import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceCoverPage } from './ice-cover.page';

describe('IceCoverPage', () => {
  let component: IceCoverPage;
  let fixture: ComponentFixture<IceCoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceCoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceCoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
