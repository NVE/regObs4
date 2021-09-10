import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { TestLoggingService } from '../../../shared/services/logging/test-logging.service';
import { SharedModule } from '../../../shared/shared.module';
import { RegobsAuthService } from '../../services/regobs-auth.service';

import { AuthCallbackPage } from './auth-callback.page';

describe('AuthCallbackPage', () => {
  let component: AuthCallbackPage;
  let fixture: ComponentFixture<AuthCallbackPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthCallbackPage],
      providers: [
        { provide: LoggingService, useClass: TestLoggingService },
        SafariViewController,
        InAppBrowser,
        Location
      ],
      imports: [
        SharedModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCallbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
