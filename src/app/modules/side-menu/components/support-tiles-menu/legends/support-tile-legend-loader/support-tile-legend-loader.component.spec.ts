import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SupportTileLegendLoaderComponent } from './support-tile-legend-loader.component';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';

describe('SupportTileLegendLoaderComponent', () => {
  let component: SupportTileLegendLoaderComponent;
  let fixture: ComponentFixture<SupportTileLegendLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SupportTileLegendLoaderComponent],
      providers: [provideTranslateService(), provideTestLogger()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTileLegendLoaderComponent);
    fixture.componentRef.setInput('name', 'steepness');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
