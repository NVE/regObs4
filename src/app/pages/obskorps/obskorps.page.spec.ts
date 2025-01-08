import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObskorpsPage } from './obskorps.page';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { LoggedInUser } from 'src/app/modules/login/models/logged-in-user.model';
import { MyPageData } from 'src/app/modules/common-regobs-api';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { Component, NO_ERRORS_SCHEMA, input } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { provideTranslateService } from '@ngx-translate/core';
import { AppMode } from 'src/app/modules/common-core/models';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';

@Component({
  selector: 'app-header',
  template: '',
  imports: [],
})
class AppHeaderStubComponent {
  readonly showFilterButton = input(true);
}

class AuthServiceStub implements Pick<RegobsAuthService, 'loggedInUser$' | 'myPageData$'> {
  myPageData$: Observable<MyPageData> = of({});
  public loggedInUser$: Observable<LoggedInUser> = of({ isLoggedIn: false });
}

describe('ObskorpsPage', () => {
  let component: ObskorpsPage;
  let fixture: ComponentFixture<ObskorpsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ObskorpsPage, AppHeaderStubComponent],
      providers: [
        {
          provide: RegobsAuthService,
          useClass: AuthServiceStub,
        },
        { provide: UserSettingService, useValue: { appMode$: of(AppMode.Test) } },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: LoggingService, useClass: TestLoggingService },
        provideTranslateService(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(ObskorpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
