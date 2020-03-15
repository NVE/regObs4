import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeakenediceLegendComponent } from './weakenedice-legend.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from '../../../../../../custom-translate.loader';

describe('WeakenediceLegendComponent', () => {
  let component: WeakenediceLegendComponent;
  let fixture: ComponentFixture<WeakenediceLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader
        }
      })],
      declarations: [WeakenediceLegendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeakenediceLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
