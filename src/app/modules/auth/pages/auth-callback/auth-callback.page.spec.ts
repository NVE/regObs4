import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { SharedModule } from '../../../shared/shared.module';
import { RegobsAuthService } from '../../services/regobs-auth.service';

import { AuthCallbackPage } from './auth-callback.page';

describe('AuthCallbackPage', () => {
  let component: AuthCallbackPage;
  let fixture: ComponentFixture<AuthCallbackPage>;
  let loggingSpy: jasmine.SpyObj<LoggingService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthCallbackPage],
      providers: [{ provide: LoggingService, useClass: loggingSpy }, SafariViewController, InAppBrowser, Location],
      imports: [SharedModule, HttpClientModule, TranslateModule.forRoot(), RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })]
    }).compileComponents();

    TestBed.inject(UserSettingService) as jasmine.SpyObj<UserSettingService>;
    loggingSpy = TestBed.inject(LoggingService) as jasmine.SpyObj<LoggingService>;
    TestBed.inject(RegobsAuthService) as jasmine.SpyObj<RegobsAuthService>;

    fixture = TestBed.createComponent(AuthCallbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
