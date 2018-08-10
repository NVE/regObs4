import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarsomPage } from './varsom.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FakeTranslateLoader } from '../mocks/translateLoader';

describe('VarsomPage', () => {
  let component: VarsomPage;
  let fixture: ComponentFixture<VarsomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VarsomPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader },
        }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarsomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
