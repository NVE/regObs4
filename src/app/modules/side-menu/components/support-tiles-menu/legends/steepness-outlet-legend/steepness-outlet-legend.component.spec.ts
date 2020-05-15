import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteepnessOutletLegendComponent } from './steepness-outlet-legend.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { SteepnessCommonLegendComponent } from '../steepness-common-legend/steepness-common-legend.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from '../../../../../../custom-translate.loader';

describe('SteepnessOutletLegendComponent', () => {
  let component: SteepnessOutletLegendComponent;
  let fixture: ComponentFixture<SteepnessOutletLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader
        }
      })],
      declarations: [SteepnessCommonLegendComponent, SteepnessOutletLegendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteepnessOutletLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
