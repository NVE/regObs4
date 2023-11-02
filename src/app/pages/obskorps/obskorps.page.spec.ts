import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObskorpsPage } from './obskorps.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { LoggedInUser } from 'src/app/modules/login/models/logged-in-user.model';
import { MyPageData } from 'src/app/modules/common-regobs-api';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({ selector: 'app-header', template: '' })
class AppHeaderStubComponent {
  @Input() showFilterButton = true;
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
      declarations: [ObskorpsPage, AppHeaderStubComponent],
      imports: [HttpClientTestingModule, IonicModule],
      providers: [
        {
          provide: RegobsAuthService,
          useClass: AuthServiceStub,
        },
        { provide: UserSettingService, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(ObskorpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
