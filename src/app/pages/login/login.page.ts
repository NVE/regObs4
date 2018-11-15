import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { LoginService } from '../../core/services/login/login.service';
import { LoggedInUser } from '../../core/services/login/logged-in-user.model';
import { Subscription } from 'rxjs';
import { Input, NavController } from '@ionic/angular';
import { settings } from '../../../settings';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginform: FormGroup;
  loggedInUser: LoggedInUser;
  loading: boolean;
  @ViewChild('password') password: Input;
  forgotPasswordUrl: string;
  createUserUrl: string;
  showPassword = false;

  get loginFormUsername() {
    return this.loginform.get('username').value;
  }
  set loginFormUsername(val: string) {
    this.loginform.get('username').setValue(val);
  }
  get loginFormPassword() {
    return this.loginform.get('password').value;
  }

  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userSettingsService: UserSettingService,
    private navContoller: NavController,
    private ngZone: NgZone) { }

  async ngOnInit() {
    this.loginform = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.subscription = this.loginService.loggedInUser$.subscribe((loggedInUser) => {
      this.ngZone.run(() => {
        this.loggedInUser = loggedInUser;
      });
      setTimeout(() => {
        if (!this.loginFormUsername && !loggedInUser.isLoggedIn && loggedInUser.email) {
          this.loginFormUsername = loggedInUser.email; // Setting email to last logged in email for easy login
          if (this.password) {
            (<any>this.password).setFocus();
          }
        }
      }, 500);
    });
    const userSettings = await this.userSettingsService.getUserSettings();
    const baseUrl = settings.services.regObs.serviceUrl[userSettings.appMode];
    this.forgotPasswordUrl = `${baseUrl}${settings.services.regObs.passwordRecoveryUrl}`;
    this.createUserUrl = `${baseUrl}${settings.services.regObs.createUserUrl}`;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async login() {
    if (this.loginform.valid) {
      this.loading = true;
      await this.loginService.login(this.loginFormUsername, this.loginFormPassword);
      this.ngZone.run(() => {
        this.loading = false;
        this.navContoller.goBack();
      });
    }
  }

  togglePasswordShowHide() {
    this.showPassword = !this.showPassword;
  }

  isLoggedIn(loggedInUser: LoggedInUser) {
    return loggedInUser && loggedInUser.isLoggedIn;
  }

  async logout() {
    await this.loginService.logout();
  }

}
