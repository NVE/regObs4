import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteepnessCommonLegendComponent } from './steepness-common-legend.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from '../../../../../../custom-translate.loader';

describe('SteepnessCommonLegendComponent', () => {
  let component: SteepnessCommonLegendComponent;
  let fixture: ComponentFixture<SteepnessCommonLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader
        }
      })],
      declarations: [SteepnessCommonLegendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteepnessCommonLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
