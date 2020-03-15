import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteepnessLegendComponent } from './steepness-legend.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { SteepnessCommonLegendComponent } from '../steepness-common-legend/steepness-common-legend.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from '../../../../../../custom-translate.loader';

describe('SteepnessLegendComponent', () => {
  let component: SteepnessLegendComponent;
  let fixture: ComponentFixture<SteepnessLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader
        }
      })],
      declarations: [SteepnessCommonLegendComponent, SteepnessLegendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteepnessLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
