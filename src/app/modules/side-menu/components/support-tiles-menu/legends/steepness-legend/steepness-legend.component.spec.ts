import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SteepnessLegendComponent } from './steepness-legend.component';
import { SteepnessCommonLegendComponent } from '../steepness-common-legend/steepness-common-legend.component';
import { provideTranslateService } from '@ngx-translate/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';

describe('SteepnessLegendComponent', () => {
  let component: SteepnessLegendComponent;
  let fixture: ComponentFixture<SteepnessLegendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SteepnessCommonLegendComponent, SteepnessLegendComponent],
      providers: [{ provide: LoggingService, useClass: TestLoggingService }, provideTranslateService()],
    }).compileComponents();
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
