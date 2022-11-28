import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RegobsAuthService } from '../../services/regobs-auth.service';

import { AuthCallbackPage } from './auth-callback.page';

describe('AuthCallbackPage', () => {
  let component: AuthCallbackPage;
  let fixture: ComponentFixture<AuthCallbackPage>;
  let regobsAuthService: jasmine.SpyObj<RegobsAuthService>;

  beforeEach(waitForAsync(() => {
    regobsAuthService = jasmine.createSpyObj(['authorizationCallback']);

    TestBed.configureTestingModule({
      declarations: [AuthCallbackPage],
      providers: [
        { provide: RegobsAuthService, useValue: regobsAuthService },
        { provide: Router, useValue: { url: '/testurl?abc=123' } },
      ],
      imports: [
        IonicModule
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

  it('should call the authorization callback when initialized', () => {
    expect(regobsAuthService.authorizationCallback).toHaveBeenCalledTimes(1);
    expect(regobsAuthService.authorizationCallback).toHaveBeenCalledWith(window.location.origin + '/testurl?abc=123');
  });
});
