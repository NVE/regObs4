import { Component, OnInit, ViewChild, Input, NgZone, Output, EventEmitter, AfterViewChecked, AfterContentInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';
import { Observable, combineLatest } from 'rxjs';
import { UserSetting } from '../../../../core/models/user-settings.model';
import { withLatestFrom, take } from 'rxjs/operators';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { type } from 'os';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, AfterViewInit {

  loginform: FormGroup;
  @ViewChild('password', { static: false }) password: Input;
  @ViewChild('username', { static: false }) username: Input;
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
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setAutoFocus();
    }, 200);
  }

  ngOnInit() {
    this.getLoggedInUserAndUserSettingObservable().subscribe(([loggedInUser, userSettings]) => {
      this.init(loggedInUser, userSettings);
    });
  }

  private getLoggedInUserAndUserSettingObservable() {
    return combineLatest([this.loginService.loggedInUser$.pipe(take(1)), this.userSettingsService.userSetting$.pipe(take(1))]);
  }

  private init(loggedInUser: LoggedInUser, userSetting: UserSetting) {
    const baseUrl = settings.services.regObs.serviceUrl[userSetting.appMode];
    this.forgotPasswordUrl = `${baseUrl}${settings.services.regObs.passwordRecoveryUrl}`;
    this.createUserUrl = `${baseUrl}${settings.services.regObs.createUserUrl}`;

    this.createForm(loggedInUser);
  }

  private setAutoFocus() {
    const input = (this.loginFormUsername ? this.password : this.username) as any;
    if (input && typeof (input.setFocus) === 'function') {
      input.setFocus();
    }
  }

  private createForm(loggedInUser: LoggedInUser) {
    this.loginform = this.formBuilder.group({
      username: new FormControl(loggedInUser ? loggedInUser.email : '', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
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
