import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowFilterCriteriaComponent } from './show-filter-criteria.component';
import { provideTranslateService } from '@ngx-translate/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';

describe('ShowFilterCriteriaComponent', () => {
  let component: ShowFilterCriteriaComponent;
  let fixture: ComponentFixture<ShowFilterCriteriaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ShowFilterCriteriaComponent],
      providers: [{ provide: LoggingService, useClass: TestLoggingService }, provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowFilterCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
