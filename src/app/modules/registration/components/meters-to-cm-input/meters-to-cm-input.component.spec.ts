import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetersToCmInputComponent, DEFAULT_PATTERN, DECIMAPL_PLACE_PATTERN } from './meters-to-cm-input.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FakeTranslateLoader } from '../../../../core/mocks/translateLoader';

describe('MetersToCmInputComponent', () => {
  let component: MetersToCmInputComponent;
  let fixture: ComponentFixture<MetersToCmInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetersToCmInputComponent],
      imports: [
        SharedModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader },
        })]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetersToCmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default pattern should be [0-9]*', () => {
    expect(component.pattern).toEqual(DEFAULT_PATTERN);
  });

  it('When decimal places is > 0, pattern should be [0-9]*', () => {
    component.decimalPlaces = 1;
    component.ngOnInit();
    expect(component.pattern).toEqual(DECIMAPL_PLACE_PATTERN);
  });

});
