import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloodzonesLegendComponent } from './floodzones-legend.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from '../../../../../../custom-translate.loader';

describe('FloodzonesLegendComponent', () => {
  let component: FloodzonesLegendComponent;
  let fixture: ComponentFixture<FloodzonesLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader
        }
      })],
      declarations: [FloodzonesLegendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodzonesLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
