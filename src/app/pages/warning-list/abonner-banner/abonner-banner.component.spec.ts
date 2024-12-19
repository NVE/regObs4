import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbonnerBannerComponent } from './abonner-banner.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { provideTranslateService } from '@ngx-translate/core';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';

describe('AbonnerBannerComponent', () => {
  let component: AbonnerBannerComponent;
  let fixture: ComponentFixture<AbonnerBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AbonnerBannerComponent],
      providers: [
        InAppBrowser,
        SafariViewController,
        { provide: LoggingService, useClass: TestLoggingService },
        provideTranslateService(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
