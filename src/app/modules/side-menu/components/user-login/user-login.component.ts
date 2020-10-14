import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ionic-appauth';
import { Observable } from 'rxjs';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  $loggedInUser: Observable<LoggedInUser>;

  constructor(private loginService: LoginService, private authService: AuthService) { }

  ngOnInit() {
    this.$loggedInUser = this.loginService.loggedInUser$;
  }

  login() {
    this.authService.signIn();
  }

}
