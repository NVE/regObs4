import { Component, OnInit, ViewChild, Input, NgZone, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginform: FormGroup;
  @ViewChild('password', { static : true }) password: Input;
  @ViewChild('username', { static : true }) username: Input;
  forgotPasswordUrl: string;
  createUserUrl: string;
  showPassword = false;
  loading: boolean;

  get loginFormUsername() {
    return this.loginform.get('username').value;
  }
  set loginFormUsername(val: string) {
    this.loginform.get('username').setValue(val);
  }
  get loginFormPassword() {
    return this.loginform.get('password').value;
  }

  @Output() loginSuccess = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userSettingsService: UserSettingService,
    private ngZone: NgZone) {
  }

  async ngOnInit() {
    this.loginform = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    const userSettings = await this.userSettingsService.getUserSettings();
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (loggedInUser && loggedInUser.email) {
      this.loginFormUsername = loggedInUser.email;
      setTimeout(() => {
        (<any>this.password).setFocus();
      }, 500);
    } else {
      setTimeout(() => {
        (<any>this.username).setFocus();
      }, 500);
    }
    const baseUrl = settings.services.regObs.serviceUrl[userSettings.appMode];
    this.forgotPasswordUrl = `${baseUrl}${settings.services.regObs.passwordRecoveryUrl}`;
    this.createUserUrl = `${baseUrl}${settings.services.regObs.createUserUrl}`;
  }

  async login() {
    if (this.loginform.valid) {
      this.loading = true;
      const loggedIn = await this.loginService.login(this.loginFormUsername, this.loginFormPassword);
      this.ngZone.run(() => {
        this.loading = false;
        if (loggedIn) {
          this.loginSuccess.emit();
        }
      });
    }
  }

  togglePasswordShowHide() {
    this.showPassword = !this.showPassword;
  }

}
