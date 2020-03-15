import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClayzonesLegendComponent } from './clayzones-legend.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from '../../../../../../custom-translate.loader';

describe('ClayzonesLegendComponent', () => {
  let component: ClayzonesLegendComponent;
  let fixture: ComponentFixture<ClayzonesLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader
        }
      })],
      declarations: [ClayzonesLegendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClayzonesLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
